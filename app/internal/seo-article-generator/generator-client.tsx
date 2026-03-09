"use client";

import { useCallback, useRef, useState } from "react";

type KeywordRow = {
  _id: number;
  [key: string]: string | number;
};

type ResultRecord = {
  text: string;
  status: "done" | "error";
  error?: string;
};

type BulkProgress = {
  current: number;
  total: number;
  slug: string;
};

function splitRow(row: string, delimiter: string) {
  const values: string[] = [];
  let current = "";
  let inQuotes = false;

  for (let index = 0; index < row.length; index += 1) {
    const character = row[index];
    const nextCharacter = row[index + 1];

    if (character === '"') {
      if (inQuotes && nextCharacter === '"') {
        current += '"';
        index += 1;
      } else {
        inQuotes = !inQuotes;
      }
      continue;
    }

    if (character === delimiter && !inQuotes) {
      values.push(current.trim());
      current = "";
      continue;
    }

    current += character;
  }

  values.push(current.trim());
  return values;
}

function detectDelimiter(headerLine: string) {
  return headerLine.includes("\t") ? "\t" : ",";
}

function parseSpreadsheetText(text: string) {
  const lines = text
    .replace(/^\uFEFF/, "")
    .split(/\r?\n/)
    .filter((line) => line.trim().length > 0);

  if (!lines.length) {
    return [];
  }

  const delimiter = detectDelimiter(lines[0]);
  const headers = splitRow(lines[0], delimiter).map((header) => header.trim());

  return lines
    .slice(1)
    .map((line, rowIndex) => {
      const columns = splitRow(line, delimiter);
      const row: KeywordRow = { _id: rowIndex };

      headers.forEach((header, columnIndex) => {
        row[header] = columns[columnIndex] ?? "";
      });

      return row;
    })
    .filter(
      (row) =>
        String(row["Primary Keyword"] ?? "").trim() ||
        String(row["Slug"] ?? "").trim(),
    );
}

export default function SeoArticleGeneratorClient() {
  const [rows, setRows] = useState<KeywordRow[]>([]);
  const [results, setResults] = useState<Record<number, ResultRecord>>({});
  const [generating, setGenerating] = useState<Record<number, boolean>>({});
  const [bulkRunning, setBulkRunning] = useState(false);
  const [bulkProgress, setBulkProgress] = useState<BulkProgress | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const [generatorSecret, setGeneratorSecret] = useState("");
  const fileRef = useRef<HTMLInputElement | null>(null);
  const abortRef = useRef(false);

  const handleFile = useCallback((file: File) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = parseSpreadsheetText(String(event.target?.result ?? ""));
        setRows(parsed);
        setResults({});
        setBulkProgress(null);
      } catch {
        alert(
          "Could not parse file. Please export your spreadsheet as CSV or TSV.",
        );
      }
    };
    reader.readAsText(file);
  }, []);

  const onDrop = useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();
      setDragOver(false);
      const file = event.dataTransfer.files[0];
      if (file) {
        handleFile(file);
      }
    },
    [handleFile],
  );

  const generateOne = useCallback(
    async (row: KeywordRow) => {
      const response = await fetch("/api/seo-article-generator", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(generatorSecret.trim()
            ? { "x-seo-generator-secret": generatorSecret.trim() }
            : {}),
        },
        body: JSON.stringify({
          primaryKeyword: row["Primary Keyword"],
          slug: row["Slug"],
          secondaryKeywords: row["Secondary Keywords"],
          yearGroup: row["Year Group"],
          subject: row["Subject / Issue"],
          modifier: row["Pupil Type / Modifier"] || "General",
        }),
      });

      const data = (await response.json()) as { text?: string; error?: string };
      if (!response.ok || !data.text) {
        throw new Error(data.error || "API error");
      }

      return data.text;
    },
    [generatorSecret],
  );

  const handleSingle = useCallback(
    async (row: KeywordRow) => {
      setGenerating((current) => ({ ...current, [row._id]: true }));
      try {
        const text = await generateOne(row);
        setResults((current) => ({
          ...current,
          [row._id]: { text, status: "done" },
        }));
      } catch (error) {
        setResults((current) => ({
          ...current,
          [row._id]: {
            text: "",
            status: "error",
            error: error instanceof Error ? error.message : "Unknown error",
          },
        }));
      } finally {
        setGenerating((current) => ({ ...current, [row._id]: false }));
      }
    },
    [generateOne],
  );

  const handleBulk = useCallback(async () => {
    if (!rows.length) {
      return;
    }

    setBulkRunning(true);
    abortRef.current = false;

    const pending = rows.filter((row) => results[row._id]?.status !== "done");

    for (let index = 0; index < pending.length; index += 1) {
      if (abortRef.current) {
        break;
      }

      const row = pending[index];
      setBulkProgress({
        current: index + 1,
        total: pending.length,
        slug: String(row["Slug"] || row["Primary Keyword"] || ""),
      });
      setGenerating((current) => ({ ...current, [row._id]: true }));

      try {
        const text = await generateOne(row);
        setResults((current) => ({
          ...current,
          [row._id]: { text, status: "done" },
        }));
      } catch (error) {
        setResults((current) => ({
          ...current,
          [row._id]: {
            text: "",
            status: "error",
            error: error instanceof Error ? error.message : "Unknown error",
          },
        }));
      } finally {
        setGenerating((current) => ({ ...current, [row._id]: false }));
      }

      if (index < pending.length - 1) {
        await new Promise((resolve) => setTimeout(resolve, 800));
      }
    }

    setBulkRunning(false);
    setBulkProgress(null);
  }, [generateOne, results, rows]);

  const downloadAll = useCallback(() => {
    const completedRows = rows.filter(
      (row) => results[row._id]?.status === "done",
    );
    if (!completedRows.length) {
      return;
    }

    const content = completedRows
      .map((row) => {
        const slug = String(row["Slug"] || row["Primary Keyword"] || "");
        return `\n${"=".repeat(60)}\nSLUG: ${slug}\n${"=".repeat(60)}\n\n${results[row._id]?.text ?? ""}\n`;
      })
      .join("\n");

    const blob = new Blob([content], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "zazadraft-articles.txt";
    anchor.click();
    URL.revokeObjectURL(url);
  }, [results, rows]);

  const downloadOne = useCallback(
    (row: KeywordRow) => {
      const text = results[row._id]?.text;
      if (!text) {
        return;
      }

      const slug = String(row["Slug"] || row["Primary Keyword"] || "").replace(
        /\//g,
        "_",
      );
      const blob = new Blob([text], { type: "text/plain" });
      const url = URL.createObjectURL(blob);
      const anchor = document.createElement("a");
      anchor.href = url;
      anchor.download = `${slug}.txt`;
      anchor.click();
      URL.revokeObjectURL(url);
    },
    [results],
  );

  const doneCount = Object.values(results).filter(
    (result) => result.status === "done",
  ).length;
  const errorCount = Object.values(results).filter(
    (result) => result.status === "error",
  ).length;

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0f1117",
        fontFamily: "'Georgia', 'Times New Roman', serif",
        color: "#e8e4dc",
        padding: "0",
      }}
    >
      <div
        style={{
          background: "linear-gradient(135deg, #1a1f2e 0%, #0f1117 100%)",
          borderBottom: "1px solid #2a2f3e",
          padding: "32px 40px 28px",
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "16px",
        }}
      >
        <div>
          <div
            style={{
              fontSize: "11px",
              letterSpacing: "4px",
              color: "#6b7fa3",
              textTransform: "uppercase",
              fontFamily: "monospace",
              marginBottom: "8px",
            }}
          >
            Zaza Draft
          </div>
          <h1
            style={{
              margin: 0,
              fontSize: "26px",
              fontWeight: "400",
              color: "#e8e4dc",
              letterSpacing: "-0.5px",
            }}
          >
            SEO Article Generator
          </h1>
          <p
            style={{
              margin: "6px 0 0",
              fontSize: "13px",
              color: "#6b7fa3",
              fontFamily: "monospace",
            }}
          >
            Upload your keyword sheet and generate article drafts at scale
          </p>
        </div>
        {doneCount > 0 ? (
          <button
            onClick={downloadAll}
            style={{
              background: "#4a9eff",
              color: "#fff",
              border: "none",
              borderRadius: "6px",
              padding: "10px 20px",
              fontSize: "13px",
              fontFamily: "monospace",
              cursor: "pointer",
              letterSpacing: "0.5px",
            }}
          >
            Download All ({doneCount})
          </button>
        ) : null}
      </div>

      <div style={{ padding: "32px 40px", maxWidth: "1100px" }}>
        <div
          style={{
            background: "#13161f",
            border: "1px solid #2a2f3e",
            borderRadius: "10px",
            padding: "18px 20px",
            marginBottom: "24px",
          }}
        >
          <label
            htmlFor="generator-secret"
            style={{
              display: "block",
              fontSize: "11px",
              fontFamily: "monospace",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "#6b7fa3",
              marginBottom: "8px",
            }}
          >
            Generator Secret
          </label>
          <input
            id="generator-secret"
            type="password"
            value={generatorSecret}
            onChange={(event) => setGeneratorSecret(event.target.value)}
            placeholder="Required on deployed environments"
            style={{
              width: "100%",
              maxWidth: "360px",
              background: "#0f1117",
              color: "#e8e4dc",
              border: "1px solid #2a2f3e",
              borderRadius: "6px",
              padding: "10px 12px",
              fontSize: "13px",
              fontFamily: "monospace",
            }}
          />
          <p
            style={{
              margin: "8px 0 0",
              fontSize: "12px",
              color: "#6b7fa3",
              fontFamily: "monospace",
            }}
          >
            Uses the server-side Anthropic key. Localhost works without a
            secret, deployed use should set{" "}
            <code>SEO_ARTICLE_GENERATOR_SECRET</code>.
          </p>
        </div>

        {rows.length === 0 ? (
          <div
            onDragOver={(event) => {
              event.preventDefault();
              setDragOver(true);
            }}
            onDragLeave={() => setDragOver(false)}
            onDrop={onDrop}
            onClick={() => fileRef.current?.click()}
            style={{
              border: `2px dashed ${dragOver ? "#4a9eff" : "#2a3550"}`,
              borderRadius: "12px",
              padding: "60px 40px",
              textAlign: "center",
              cursor: "pointer",
              background: dragOver ? "#1a2235" : "#13161f",
              transition: "all 0.2s",
              marginBottom: "32px",
            }}
          >
            <div style={{ fontSize: "36px", marginBottom: "16px" }}>📄</div>
            <p
              style={{ margin: "0 0 8px", fontSize: "16px", color: "#c8c4bc" }}
            >
              Drop your CSV or TSV file here or click to browse
            </p>
            <p
              style={{
                margin: 0,
                fontSize: "12px",
                color: "#4a5568",
                fontFamily: "monospace",
              }}
            >
              Supports the keyword tracker export format you shared
            </p>
            <input
              ref={fileRef}
              type="file"
              accept=".csv,.tsv,.txt"
              style={{ display: "none" }}
              onChange={(event) => {
                const file = event.target.files?.[0];
                if (file) {
                  handleFile(file);
                }
              }}
            />
          </div>
        ) : null}

        {rows.length > 0 ? (
          <div
            style={{
              background: "#13161f",
              border: "1px solid #2a2f3e",
              borderRadius: "10px",
              padding: "20px 24px",
              marginBottom: "24px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: "16px",
            }}
          >
            <div style={{ fontFamily: "monospace", fontSize: "13px" }}>
              <span style={{ color: "#6b7fa3" }}>
                {rows.length} keywords loaded ·{" "}
              </span>
              <span style={{ color: "#4ade80" }}>{doneCount} done</span>
              {errorCount > 0 ? (
                <span style={{ color: "#f87171" }}> · {errorCount} errors</span>
              ) : null}
              {bulkProgress ? (
                <span style={{ color: "#fbbf24" }}>
                  {" "}
                  · Generating {bulkProgress.current}/{bulkProgress.total}:{" "}
                  {bulkProgress.slug}
                </span>
              ) : null}
            </div>
            <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
              <button
                onClick={() => {
                  setRows([]);
                  setResults({});
                  setBulkProgress(null);
                }}
                style={{
                  background: "transparent",
                  color: "#6b7fa3",
                  border: "1px solid #2a2f3e",
                  borderRadius: "6px",
                  padding: "8px 14px",
                  fontSize: "12px",
                  fontFamily: "monospace",
                  cursor: "pointer",
                }}
              >
                Clear
              </button>
              {bulkRunning ? (
                <button
                  onClick={() => {
                    abortRef.current = true;
                    setBulkRunning(false);
                  }}
                  style={{
                    background: "#7f1d1d",
                    color: "#fca5a5",
                    border: "none",
                    borderRadius: "6px",
                    padding: "8px 16px",
                    fontSize: "12px",
                    fontFamily: "monospace",
                    cursor: "pointer",
                  }}
                >
                  Stop
                </button>
              ) : (
                <button
                  onClick={handleBulk}
                  disabled={doneCount === rows.length}
                  style={{
                    background:
                      doneCount === rows.length ? "#1a2235" : "#1d4ed8",
                    color: doneCount === rows.length ? "#3a4560" : "#bfdbfe",
                    border: "none",
                    borderRadius: "6px",
                    padding: "8px 18px",
                    fontSize: "12px",
                    fontFamily: "monospace",
                    cursor:
                      doneCount === rows.length ? "not-allowed" : "pointer",
                    letterSpacing: "0.3px",
                  }}
                >
                  Generate All
                </button>
              )}
            </div>
          </div>
        ) : null}

        {bulkProgress ? (
          <div style={{ marginBottom: "20px" }}>
            <div
              style={{
                background: "#1a1f2e",
                borderRadius: "4px",
                height: "4px",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  background: "linear-gradient(90deg, #4a9eff, #a78bfa)",
                  width: `${(bulkProgress.current / bulkProgress.total) * 100}%`,
                  height: "100%",
                  transition: "width 0.4s ease",
                  borderRadius: "4px",
                }}
              />
            </div>
          </div>
        ) : null}

        {rows.length > 0 ? (
          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            {rows.map((row) => {
              const result = results[row._id];
              const isGenerating = generating[row._id];
              const isDone = result?.status === "done";
              const isError = result?.status === "error";

              return (
                <div
                  key={row._id}
                  style={{
                    background: isDone
                      ? "#0d1f14"
                      : isError
                        ? "#1f0d0d"
                        : "#13161f",
                    border: `1px solid ${isDone ? "#1a3a25" : isError ? "#3a1a1a" : "#2a2f3e"}`,
                    borderRadius: "8px",
                    padding: "14px 18px",
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "16px",
                    transition: "background 0.3s",
                  }}
                >
                  <div
                    style={{
                      width: "8px",
                      height: "8px",
                      borderRadius: "50%",
                      marginTop: "5px",
                      flexShrink: 0,
                      background: isGenerating
                        ? "#fbbf24"
                        : isDone
                          ? "#4ade80"
                          : isError
                            ? "#f87171"
                            : "#2a3550",
                      boxShadow: isGenerating
                        ? "0 0 8px #fbbf24"
                        : isDone
                          ? "0 0 6px #4ade8044"
                          : "none",
                      animation: isGenerating ? "pulse 1s infinite" : "none",
                    }}
                  />

                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div
                      style={{
                        fontFamily: "monospace",
                        fontSize: "12px",
                        color: "#6b7fa3",
                        marginBottom: "3px",
                      }}
                    >
                      {String(row["Slug"] || "")}
                    </div>
                    <div
                      style={{
                        fontSize: "14px",
                        color: "#c8c4bc",
                        lineHeight: 1.4,
                      }}
                    >
                      {String(row["Primary Keyword"] || "")}
                    </div>
                    <div
                      style={{
                        display: "flex",
                        gap: "8px",
                        marginTop: "6px",
                        flexWrap: "wrap",
                      }}
                    >
                      {row["Year Group"] ? (
                        <span
                          style={{
                            fontSize: "10px",
                            fontFamily: "monospace",
                            color: "#4a5568",
                            background: "#1a1f2e",
                            padding: "2px 7px",
                            borderRadius: "3px",
                          }}
                        >
                          {String(row["Year Group"])}
                        </span>
                      ) : null}
                      {row["Subject / Issue"] ? (
                        <span
                          style={{
                            fontSize: "10px",
                            fontFamily: "monospace",
                            color: "#4a5568",
                            background: "#1a1f2e",
                            padding: "2px 7px",
                            borderRadius: "3px",
                          }}
                        >
                          {String(row["Subject / Issue"])}
                        </span>
                      ) : null}
                      {row["Pupil Type / Modifier"] &&
                      String(row["Pupil Type / Modifier"]) !== "General" ? (
                        <span
                          style={{
                            fontSize: "10px",
                            fontFamily: "monospace",
                            color: "#7c6ba0",
                            background: "#1a1f2e",
                            padding: "2px 7px",
                            borderRadius: "3px",
                          }}
                        >
                          {String(row["Pupil Type / Modifier"])}
                        </span>
                      ) : null}
                    </div>

                    {isDone ? (
                      <div
                        style={{
                          marginTop: "12px",
                          background: "#0a0f0a",
                          border: "1px solid #1a3a25",
                          borderRadius: "6px",
                          padding: "12px 14px",
                          fontSize: "12px",
                          fontFamily: "monospace",
                          color: "#6b9e6b",
                          lineHeight: 1.6,
                          whiteSpace: "pre-wrap",
                          maxHeight: "180px",
                          overflow: "auto",
                        }}
                      >
                        {result.text.slice(0, 400)}...
                      </div>
                    ) : null}

                    {isError ? (
                      <div
                        style={{
                          marginTop: "8px",
                          fontSize: "12px",
                          fontFamily: "monospace",
                          color: "#f87171",
                        }}
                      >
                        Error: {result.error}
                      </div>
                    ) : null}
                  </div>

                  <div style={{ display: "flex", gap: "6px", flexShrink: 0 }}>
                    {isDone ? (
                      <button
                        onClick={() => downloadOne(row)}
                        style={{
                          background: "transparent",
                          color: "#4ade80",
                          border: "1px solid #1a3a25",
                          borderRadius: "5px",
                          padding: "5px 10px",
                          fontSize: "11px",
                          fontFamily: "monospace",
                          cursor: "pointer",
                        }}
                      >
                        ↓
                      </button>
                    ) : null}
                    <button
                      onClick={() => handleSingle(row)}
                      disabled={Boolean(isGenerating) || bulkRunning}
                      style={{
                        background: "transparent",
                        color: isGenerating ? "#fbbf24" : "#6b7fa3",
                        border: `1px solid ${isGenerating ? "#3a3020" : "#2a2f3e"}`,
                        borderRadius: "5px",
                        padding: "5px 10px",
                        fontSize: "11px",
                        fontFamily: "monospace",
                        cursor:
                          isGenerating || bulkRunning
                            ? "not-allowed"
                            : "pointer",
                      }}
                    >
                      {isGenerating ? "..." : isDone ? "↺" : "▶"}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : null}
      </div>

      <style>{`
        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.4; } }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #0f1117; }
        ::-webkit-scrollbar-thumb { background: #2a3550; border-radius: 2px; }
      `}</style>
    </div>
  );
}
