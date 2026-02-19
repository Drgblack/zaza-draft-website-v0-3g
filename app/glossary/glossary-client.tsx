"use client";

import { useLanguage } from "@/lib/i18n/language-context";
import { useState } from "react";
import { Search, BookOpen } from "lucide-react";

interface BilingualGlossaryTerm {
  id: string;
  term: { en: string; de: string };
  definition: { en: string; de: string };
  example: { en: string; de: string };
  category: { en: string; de: string };
  relatedTerms?: string[];
}

const glossaryTerms: BilingualGlossaryTerm[] = [
  {
    id: "artificial-intelligence",
    term: {
      en: "Artificial Intelligence (AI)",
      de: "Künstliche Intelligenz (KI)",
    },
    definition: {
      en: "Computer systems designed to perform tasks that typically require human intelligence, such as learning, problem-solving, pattern recognition, and decision-making.",
      de: "Computersysteme, die dafür entwickelt wurden, Aufgaben auszuführen, die normalerweise menschliche Intelligenz erfordern, wie Lernen, Problemlösung, Mustererkennung und Entscheidungsfindung.",
    },
    example: {
      en: "When Zaza Draft suggests improvements to your parent email, it's using AI to understand context and generate helpful recommendations.",
      de: "Wenn Zaza Draft Verbesserungen für Ihre Eltern-E-Mail vorschlägt, nutzt es KI, um den Kontext zu verstehen und hilfreiche Empfehlungen zu generieren.",
    },
    category: { en: "AI Fundamentals", de: "KI-Grundlagen" },
    relatedTerms: ["Machine Learning", "Deep Learning", "Neural Network"],
  },
  {
    id: "machine-learning",
    term: { en: "Machine Learning", de: "Maschinelles Lernen" },
    definition: {
      en: "A subset of AI where computers learn from data and improve their performance over time without being explicitly programmed for every scenario.",
      de: "Ein Teilbereich der KI, bei dem Computer aus Daten lernen und ihre Leistung im Laufe der Zeit verbessern, ohne für jedes Szenario explizit programmiert zu werden.",
    },
    example: {
      en: "As you use Zaza Draft more, it learns your writing style and provides increasingly personalized suggestions.",
      de: "Je mehr Sie Zaza Draft nutzen, desto besser lernt es Ihren Schreibstil und bietet zunehmend personalisierte Vorschläge.",
    },
    category: { en: "AI Fundamentals", de: "KI-Grundlagen" },
    relatedTerms: ["Artificial Intelligence (AI)", "Training Data", "Model"],
  },
  {
    id: "deep-learning",
    term: { en: "Deep Learning", de: "Deep Learning" },
    definition: {
      en: "An advanced form of machine learning that uses neural networks with multiple layers to process complex patterns in large amounts of data.",
      de: "Eine fortgeschrittene Form des maschinellen Lernens, die neuronale Netze mit mehreren Schichten verwendet, um komplexe Muster in großen Datenmengen zu verarbeiten.",
    },
    example: {
      en: "Deep learning enables AI to understand the nuanced difference between 'The student needs support' and 'The student is excelling' in your report cards.",
      de: "Deep Learning ermöglicht es KI, den nuancierten Unterschied zwischen 'Der Schüler benötigt Unterstützung' und 'Der Schüler zeichnet sich aus' in Ihren Zeugnissen zu verstehen.",
    },
    category: { en: "AI Fundamentals", de: "KI-Grundlagen" },
    relatedTerms: [
      "Neural Network",
      "Machine Learning",
      "Artificial Intelligence (AI)",
    ],
  },
  {
    id: "algorithm",
    term: { en: "Algorithm", de: "Algorithmus" },
    definition: {
      en: "A set of step-by-step instructions that tells a computer how to solve a problem or complete a task.",
      de: "Eine Reihe von schrittweisen Anweisungen, die einem Computer sagen, wie er ein Problem lösen oder eine Aufgabe erledigen soll.",
    },
    example: {
      en: "The algorithm in Zaza Draft analyzes your draft email and suggests ways to make it clearer and more professional.",
      de: "Der Algorithmus in Zaza Draft analysiert Ihren E-Mail-Entwurf und schlägt Möglichkeiten vor, ihn klarer und professioneller zu gestalten.",
    },
    category: { en: "AI Fundamentals", de: "KI-Grundlagen" },
    relatedTerms: ["Model", "Training", "Machine Learning"],
  },
  {
    id: "training-data",
    term: { en: "Training Data", de: "Trainingsdaten" },
    definition: {
      en: "The information used to teach an AI system how to perform tasks. The AI learns patterns from this data to make predictions or decisions.",
      de: "Die Informationen, die verwendet werden, um einem KI-System beizubringen, wie es Aufgaben ausführt. Die KI lernt Muster aus diesen Daten, um Vorhersagen zu treffen oder Entscheidungen zu fällen.",
    },
    example: {
      en: "AI writing tools are trained on millions of examples of good writing, which helps them suggest improvements to your drafts.",
      de: "KI-Schreibwerkzeuge werden an Millionen von Beispielen guten Schreibens trainiert, was ihnen hilft, Verbesserungen für Ihre Entwürfe vorzuschlagen.",
    },
    category: { en: "Machine Learning", de: "Maschinelles Lernen" },
    relatedTerms: ["Machine Learning", "Model", "Dataset"],
  },
  {
    id: "model",
    term: { en: "Model", de: "Modell" },
    definition: {
      en: "The result of training an AI system on data. It's like a trained brain that can make predictions or generate content based on what it learned.",
      de: "Das Ergebnis des Trainings eines KI-Systems mit Daten. Es ist wie ein trainiertes Gehirn, das Vorhersagen treffen oder Inhalte basierend auf dem Gelernten generieren kann.",
    },
    example: {
      en: "GPT-4 is a language model that powers many AI writing tools, including features in Zaza Draft.",
      de: "GPT-4 ist ein Sprachmodell, das viele KI-Schreibwerkzeuge antreibt, einschließlich Funktionen in Zaza Draft.",
    },
    category: { en: "Machine Learning", de: "Maschinelles Lernen" },
    relatedTerms: ["Training Data", "Neural Network", "Large Language Model"],
  },
  {
    id: "neural-network",
    term: { en: "Neural Network", de: "Neuronales Netz" },
    definition: {
      en: "A computer system inspired by the human brain, made up of interconnected nodes (like neurons) that process information in layers.",
      de: "Ein vom menschlichen Gehirn inspiriertes Computersystem, das aus miteinander verbundenen Knoten (wie Neuronen) besteht, die Informationen in Schichten verarbeiten.",
    },
    example: {
      en: "Neural networks help AI understand that 'The student is struggling' and 'The learner needs support' convey similar meanings.",
      de: "Neuronale Netze helfen KI zu verstehen, dass 'Der Schüler hat Schwierigkeiten' und 'Der Lernende braucht Unterstützung' ähnliche Bedeutungen vermitteln.",
    },
    category: { en: "Machine Learning", de: "Maschinelles Lernen" },
    relatedTerms: ["Deep Learning", "Artificial Intelligence (AI)", "Model"],
  },
  {
    id: "natural-language-processing",
    term: {
      en: "Natural Language Processing (NLP)",
      de: "Natürliche Sprachverarbeitung (NLP)",
    },
    definition: {
      en: "The branch of AI that helps computers understand, interpret, and generate human language in a way that is meaningful and useful.",
      de: "Der Zweig der KI, der Computern hilft, menschliche Sprache auf sinnvolle und nützliche Weise zu verstehen, zu interpretieren und zu generieren.",
    },
    example: {
      en: "NLP enables Zaza Draft to understand your writing intent and suggest contextually appropriate improvements.",
      de: "NLP ermöglicht es Zaza Draft, Ihre Schreibabsicht zu verstehen und kontextgerechte Verbesserungen vorzuschlagen.",
    },
    category: {
      en: "Natural Language Processing",
      de: "Natürliche Sprachverarbeitung",
    },
    relatedTerms: [
      "Large Language Model",
      "Tokenization",
      "Sentiment Analysis",
    ],
  },
  {
    id: "tokenization",
    term: { en: "Tokenization", de: "Tokenisierung" },
    definition: {
      en: "The process of breaking down text into smaller pieces (tokens) like words or phrases that AI can process and understand.",
      de: "Der Prozess, Text in kleinere Teile (Tokens) wie Wörter oder Phrasen zu zerlegen, die KI verarbeiten und verstehen kann.",
    },
    example: {
      en: "When you type 'The student is making progress,' the AI breaks it into tokens to analyze each word's meaning and context.",
      de: "Wenn Sie 'Der Schüler macht Fortschritte' eingeben, zerlegt die KI es in Tokens, um die Bedeutung und den Kontext jedes Wortes zu analysieren.",
    },
    category: {
      en: "Natural Language Processing",
      de: "Natürliche Sprachverarbeitung",
    },
    relatedTerms: ["Natural Language Processing (NLP)", "Large Language Model"],
  },
  {
    id: "sentiment-analysis",
    term: { en: "Sentiment Analysis", de: "Sentimentanalyse" },
    definition: {
      en: "AI's ability to detect emotions and attitudes in text, determining whether writing is positive, negative, or neutral.",
      de: "Die Fähigkeit der KI, Emotionen und Einstellungen in Texten zu erkennen und festzustellen, ob ein Text positiv, negativ oder neutral ist.",
    },
    example: {
      en: "Sentiment analysis helps ensure your parent emails strike the right tone-supportive rather than critical.",
      de: "Sentimentanalyse hilft sicherzustellen, dass Ihre Eltern-E-Mails den richtigen Ton treffen-unterstützend statt kritisch.",
    },
    category: {
      en: "Natural Language Processing",
      de: "Natürliche Sprachverarbeitung",
    },
    relatedTerms: ["Natural Language Processing (NLP)", "Tone"],
  },
  {
    id: "generative-ai",
    term: { en: "Generative AI", de: "Generative KI" },
    definition: {
      en: "AI systems that can create new content-text, images, code, or other media-based on patterns learned from training data.",
      de: "KI-Systeme, die neue Inhalte erstellen können-Text, Bilder, Code oder andere Medien-basierend auf Mustern, die aus Trainingsdaten gelernt wurden.",
    },
    example: {
      en: "When Zaza Draft helps you write a parent email from scratch, it's using generative AI to create original, contextually appropriate text.",
      de: "Wenn Zaza Draft Ihnen hilft, eine Eltern-E-Mail von Grund auf zu schreiben, verwendet es generative KI, um originalen, kontextgerechten Text zu erstellen.",
    },
    category: { en: "Generative AI", de: "Generative KI" },
    relatedTerms: ["Large Language Model", "Prompt", "ChatGPT"],
  },
  {
    id: "large-language-model",
    term: { en: "Large Language Model (LLM)", de: "Großes Sprachmodell (LLM)" },
    definition: {
      en: "A type of AI trained on vast amounts of text data that can understand and generate human-like language.",
      de: "Eine Art von KI, die auf riesigen Mengen an Textdaten trainiert wurde und menschenähnliche Sprache verstehen und generieren kann.",
    },
    example: {
      en: "ChatGPT, Claude, and the AI behind Zaza Draft are all large language models trained to assist with writing tasks.",
      de: "ChatGPT, Claude und die KI hinter Zaza Draft sind alles große Sprachmodelle, die trainiert wurden, um bei Schreibaufgaben zu helfen.",
    },
    category: { en: "Generative AI", de: "Generative KI" },
    relatedTerms: ["Generative AI", "GPT", "Model"],
  },
  {
    id: "gpt",
    term: {
      en: "GPT (Generative Pre-trained Transformer)",
      de: "GPT (Generative Pre-trained Transformer)",
    },
    definition: {
      en: "A specific type of large language model developed by OpenAI that's particularly good at understanding context and generating coherent text.",
      de: "Ein spezifischer Typ großer Sprachmodelle, entwickelt von OpenAI, der besonders gut darin ist, Kontext zu verstehen und kohärenten Text zu generieren.",
    },
    example: {
      en: "GPT-4 powers many AI writing assistants and can help draft everything from lesson plans to parent communications.",
      de: "GPT-4 treibt viele KI-Schreibassistenten an und kann beim Entwerfen von allem helfen, von Unterrichtsplänen bis zu Elternkommunikationen.",
    },
    category: { en: "Generative AI", de: "Generative KI" },
    relatedTerms: ["Large Language Model", "Transformer", "ChatGPT"],
  },
  {
    id: "chatgpt",
    term: { en: "ChatGPT", de: "ChatGPT" },
    definition: {
      en: "A conversational AI tool developed by OpenAI that uses GPT models to have natural conversations and assist with various tasks.",
      de: "Ein konversationelles KI-Tool, entwickelt von OpenAI, das GPT-Modelle verwendet, um natürliche Gespräche zu führen und bei verschiedenen Aufgaben zu helfen.",
    },
    example: {
      en: "Many teachers use ChatGPT to brainstorm lesson ideas, but Zaza Draft is specifically designed for education writing tasks.",
      de: "Viele Lehrkräfte nutzen ChatGPT zum Brainstorming von Unterrichtsideen, aber Zaza Draft ist speziell für Bildungsschreibaufgaben konzipiert.",
    },
    category: { en: "Generative AI", de: "Generative KI" },
    relatedTerms: ["GPT", "Large Language Model", "Conversational AI"],
  },
  {
    id: "prompt",
    term: { en: "Prompt", de: "Prompt" },
    definition: {
      en: "The instruction or question you give to an AI system to tell it what you want it to do or create.",
      de: "Die Anweisung oder Frage, die Sie einem KI-System geben, um ihm mitzuteilen, was Sie tun oder erstellen möchten.",
    },
    example: {
      en: "Instead of just typing 'write email,' a better prompt is 'Write a supportive email to parents about their child's reading progress.'",
      de: "Anstatt nur 'E-Mail schreiben' einzugeben, ist ein besserer Prompt 'Schreibe eine unterstützende E-Mail an Eltern über die Lesefortschritte ihres Kindes.'",
    },
    category: { en: "Prompt Engineering", de: "Prompt-Engineering" },
    relatedTerms: ["Prompt Engineering", "Context", "Few-Shot Learning"],
  },
  {
    id: "prompt-engineering",
    term: { en: "Prompt Engineering", de: "Prompt-Engineering" },
    definition: {
      en: "The skill of crafting effective instructions for AI to get the best possible results. It's like learning how to ask the right questions.",
      de: "Die Fähigkeit, effektive Anweisungen für KI zu erstellen, um die bestmöglichen Ergebnisse zu erzielen. Es ist wie zu lernen, die richtigen Fragen zu stellen.",
    },
    example: {
      en: "Good prompt engineering: 'Write a 3-sentence positive email to parents highlighting their child's improvement in math, maintaining a warm tone.'",
      de: "Gutes Prompt-Engineering: 'Schreibe eine 3-Sätze positive E-Mail an Eltern, die die Verbesserung ihres Kindes in Mathematik hervorhebt, mit warmem Ton.'",
    },
    category: { en: "Prompt Engineering", de: "Prompt-Engineering" },
    relatedTerms: ["Prompt", "Context", "Zero-Shot Learning"],
  },
  {
    id: "context",
    term: { en: "Context", de: "Kontext" },
    definition: {
      en: "The background information you provide to AI to help it understand your specific situation and generate more relevant responses.",
      de: "Die Hintergrundinformationen, die Sie der KI bereitstellen, um ihr zu helfen, Ihre spezifische Situation zu verstehen und relevantere Antworten zu generieren.",
    },
    example: {
      en: "Providing context like 'This is for a 3rd-grade student who recently improved in reading' helps AI write more appropriate content.",
      de: "Kontext wie 'Dies ist für einen Drittklässler, der sich kürzlich im Lesen verbessert hat' hilft der KI, angemesseneren Inhalt zu schreiben.",
    },
    category: { en: "Prompt Engineering", de: "Prompt-Engineering" },
    relatedTerms: ["Prompt", "Prompt Engineering", "Few-Shot Learning"],
  },
  {
    id: "few-shot-learning",
    term: { en: "Few-Shot Learning", de: "Few-Shot Learning" },
    definition: {
      en: "Giving AI a few examples of what you want before asking it to create something similar.",
      de: "Der KI einige Beispiele dessen zu geben, was Sie möchten, bevor Sie sie bitten, etwas Ähnliches zu erstellen.",
    },
    example: {
      en: "Showing AI 2-3 examples of your preferred email style helps it match your voice when drafting new messages.",
      de: "Der KI 2-3 Beispiele Ihres bevorzugten E-Mail-Stils zu zeigen, hilft ihr, Ihre Stimme beim Verfassen neuer Nachrichten anzupassen.",
    },
    category: { en: "Prompt Engineering", de: "Prompt-Engineering" },
    relatedTerms: ["Prompt", "Context", "Zero-Shot Learning"],
  },
  {
    id: "ai-bias",
    term: { en: "AI Bias", de: "KI-Bias" },
    definition: {
      en: "When AI systems produce unfair or prejudiced results because of biases in their training data or design.",
      de: "Wenn KI-Systeme unfaire oder voreingenommene Ergebnisse liefern aufgrund von Verzerrungen in ihren Trainingsdaten oder ihrem Design.",
    },
    example: {
      en: "An AI might suggest different language for students based on their names, reflecting bias in its training data. Always review AI suggestions critically.",
      de: "Eine KI könnte unterschiedliche Formulierungen für Schüler basierend auf ihren Namen vorschlagen, was Bias in den Trainingsdaten widerspiegelt. Überprüfen Sie KI-Vorschläge immer kritisch.",
    },
    category: { en: "AI Ethics & Safety", de: "KI-Ethik & Sicherheit" },
    relatedTerms: ["Training Data", "Fairness", "Ethical AI"],
  },
  {
    id: "hallucination",
    term: { en: "Hallucination", de: "Halluzination" },
    definition: {
      en: "When AI generates information that sounds plausible but is actually incorrect or made up.",
      de: "Wenn KI Informationen generiert, die plausibel klingen, aber tatsächlich inkorrekt oder erfunden sind.",
    },
    example: {
      en: "AI might confidently state a student's test score or create a fake research citation. Always verify factual claims from AI.",
      de: "KI könnte selbstbewusst ein Testergebnis eines Schülers angeben oder ein gefälschtes Forschungszitat erstellen. Überprüfen Sie immer faktische Aussagen von KI.",
    },
    category: { en: "AI Ethics & Safety", de: "KI-Ethik & Sicherheit" },
    relatedTerms: ["Accuracy", "Verification", "Generative AI"],
  },
  {
    id: "ethical-ai",
    term: { en: "Ethical AI", de: "Ethische KI" },
    definition: {
      en: "The practice of developing and using AI in ways that are fair, transparent, accountable, and respect human rights and privacy.",
      de: "Die Praxis, KI auf faire, transparente, verantwortungsvolle Weise zu entwickeln und zu nutzen, die Menschenrechte und Privatsphäre respektiert.",
    },
    example: {
      en: "Using AI to help draft parent emails is ethical; using it to make high-stakes decisions about students without human oversight is not.",
      de: "KI zum Entwurf von Eltern-E-Mails zu verwenden ist ethisch; sie für wichtige Entscheidungen über Schüler ohne menschliche Aufsicht zu verwenden ist es nicht.",
    },
    category: { en: "AI Ethics & Safety", de: "KI-Ethik & Sicherheit" },
    relatedTerms: ["AI Bias", "Transparency", "Responsible AI"],
  },
  {
    id: "ferpa",
    term: { en: "FERPA Compliance", de: "FERPA-Konformität" },
    definition: {
      en: "Following the Family Educational Rights and Privacy Act, which protects student education records and personal information.",
      de: "Einhaltung des Family Educational Rights and Privacy Act, der Schülerbildungsunterlagen und persönliche Informationen schützt.",
    },
    example: {
      en: "When using AI tools, never input student names, IDs, or other personally identifiable information unless the tool is FERPA-ready.",
      de: "Bei der Verwendung von KI-Tools geben Sie niemals Schuelernamen, IDs oder andere personenbezogene Informationen ein, es sei denn, das Tool ist FERPA-ready.",
    },
    category: { en: "Data & Privacy", de: "Daten & Datenschutz" },
    relatedTerms: ["Student Privacy", "Data Security", "PII"],
  },
  {
    id: "pii",
    term: {
      en: "PII (Personally Identifiable Information)",
      de: "PII (Personenbezogene Daten)",
    },
    definition: {
      en: "Any information that can be used to identify a specific individual, such as names, addresses, or student ID numbers.",
      de: "Alle Informationen, die verwendet werden können, um eine bestimmte Person zu identifizieren, wie Namen, Adressen oder Schüler-ID-Nummern.",
    },
    example: {
      en: "Instead of 'Sarah Johnson in 3rd grade,' use 'a 3rd-grade student' when working with AI to protect privacy.",
      de: "Verwenden Sie 'ein Drittklässler' anstelle von 'Sarah Johnson in der 3. Klasse', wenn Sie mit KI arbeiten, um die Privatsphäre zu schützen.",
    },
    category: { en: "Data & Privacy", de: "Daten & Datenschutz" },
    relatedTerms: ["FERPA Compliance", "Student Privacy", "Data Security"],
  },
  {
    id: "data-security",
    term: { en: "Data Security", de: "Datensicherheit" },
    definition: {
      en: "Protecting information from unauthorized access, use, or theft through encryption and secure storage practices.",
      de: "Schutz von Informationen vor unbefugtem Zugriff, Nutzung oder Diebstahl durch Verschlüsselung und sichere Speicherpraktiken.",
    },
    example: {
      en: "Zaza Draft uses enterprise-grade encryption to ensure your drafts and student information remain secure.",
      de: "Zaza Draft verwendet unternehmensweite Verschlüsselung, um sicherzustellen, dass Ihre Entwürfe und Schülerinformationen sicher bleiben.",
    },
    category: { en: "Data & Privacy", de: "Daten & Datenschutz" },
    relatedTerms: ["Encryption", "FERPA Compliance", "Student Privacy"],
  },
  {
    id: "ai-writing-assistant",
    term: { en: "AI Writing Assistant", de: "KI-Schreibassistent" },
    definition: {
      en: "Software that uses AI to help improve writing through suggestions, corrections, and content generation.",
      de: "Software, die KI verwendet, um das Schreiben durch Vorschläge, Korrekturen und Inhaltserstellung zu verbessern.",
    },
    example: {
      en: "Zaza Draft is an AI writing assistant specifically designed for teachers' communication needs.",
      de: "Zaza Draft ist ein KI-Schreibassistent, der speziell für die Kommunikationsbedürfnisse von Lehrkräften entwickelt wurde.",
    },
    category: { en: "AI Tools & Platforms", de: "KI-Tools & Plattformen" },
    relatedTerms: [
      "Generative AI",
      "Natural Language Processing (NLP)",
      "Grammarly",
    ],
  },
  {
    id: "api",
    term: {
      en: "API (Application Programming Interface)",
      de: "API (Programmierschnittstelle)",
    },
    definition: {
      en: "A way for different software applications to communicate and share data with each other.",
      de: "Eine Möglichkeit für verschiedene Softwareanwendungen, miteinander zu kommunizieren und Daten auszutauschen.",
    },
    example: {
      en: "Zaza Draft uses APIs to connect with your school's systems and integrate AI capabilities into your workflow.",
      de: "Zaza Draft verwendet APIs, um sich mit den Systemen Ihrer Schule zu verbinden und KI-Funktionen in Ihren Arbeitsablauf zu integrieren.",
    },
    category: { en: "AI Tools & Platforms", de: "KI-Tools & Plattformen" },
    relatedTerms: ["Integration", "Cloud Computing"],
  },
  {
    id: "adaptive-learning",
    term: { en: "Adaptive Learning", de: "Adaptives Lernen" },
    definition: {
      en: "Educational technology that adjusts content and pacing based on individual student performance and needs.",
      de: "Bildungstechnologie, die Inhalte und Tempo basierend auf individueller Schülerleistung und Bedürfnissen anpasst.",
    },
    example: {
      en: "AI-powered reading programs that automatically adjust difficulty based on student responses use adaptive learning.",
      de: "KI-gestützte Leseprogramme, die die Schwierigkeit basierend auf Schülerantworten automatisch anpassen, nutzen adaptives Lernen.",
    },
    category: {
      en: "Educational AI Applications",
      de: "Pädagogische KI-Anwendungen",
    },
    relatedTerms: ["Personalization", "Differentiation", "Machine Learning"],
  },
  {
    id: "automated-grading",
    term: { en: "Automated Grading", de: "Automatisierte Bewertung" },
    definition: {
      en: "Using AI to evaluate and score student work, particularly for objective assessments and writing assignments.",
      de: "Verwendung von KI zur Bewertung und Benotung von Schülerarbeiten, insbesondere für objektive Bewertungen und Schreibaufgaben.",
    },
    example: {
      en: "AI can provide instant feedback on grammar and structure in student essays, but teachers should review subjective elements like creativity.",
      de: "KI kann sofortiges Feedback zu Grammatik und Struktur in Schüleraufsätzen geben, aber Lehrkräfte sollten subjektive Elemente wie Kreativität überprüfen.",
    },
    category: {
      en: "Educational AI Applications",
      de: "Pädagogische KI-Anwendungen",
    },
    relatedTerms: [
      "Assessment",
      "Feedback",
      "Natural Language Processing (NLP)",
    ],
  },
  {
    id: "change-management",
    term: { en: "Change Management", de: "Change Management" },
    definition: {
      en: "The process of helping people and organizations transition to new tools, processes, or ways of working.",
      de: "Der Prozess, Menschen und Organisationen beim Übergang zu neuen Tools, Prozessen oder Arbeitsweisen zu helfen.",
    },
    example: {
      en: "Successfully implementing AI in your classroom requires change management: training, support, and gradual adoption.",
      de: "Die erfolgreiche Implementierung von KI in Ihrem Klassenzimmer erfordert Change Management: Schulung, Unterstützung und schrittweise Einführung.",
    },
    category: { en: "AI Implementation", de: "KI-Implementierung" },
    relatedTerms: ["Professional Development", "Adoption", "Training"],
  },
  {
    id: "pilot-program",
    term: { en: "Pilot Program", de: "Pilotprogramm" },
    definition: {
      en: "A small-scale test of a new tool or approach before rolling it out to everyone.",
      de: "Ein kleiner Test eines neuen Tools oder Ansatzes, bevor es für alle eingeführt wird.",
    },
    example: {
      en: "Start with a pilot program: have 5 teachers try Zaza Draft for one month before introducing it to the whole school.",
      de: "Beginnen Sie mit einem Pilotprogramm: Lassen Sie 5 Lehrkräfte Zaza Draft einen Monat lang testen, bevor Sie es der gesamten Schule vorstellen.",
    },
    category: { en: "AI Implementation", de: "KI-Implementierung" },
    relatedTerms: ["Change Management", "Adoption", "Evaluation"],
  },
  {
    id: "agi",
    term: {
      en: "AGI (Artificial General Intelligence)",
      de: "AGI (Allgemeine Künstliche Intelligenz)",
    },
    definition: {
      en: "Hypothetical AI that can understand, learn, and apply knowledge across any domain, like human intelligence. This doesn't exist yet.",
      de: "Hypothetische KI, die Wissen in jedem Bereich verstehen, lernen und anwenden kann, wie menschliche Intelligenz. Dies existiert noch nicht.",
    },
    example: {
      en: "Current AI tools like Zaza Draft are 'narrow AI'-excellent at specific tasks but not capable of general human-like reasoning.",
      de: "Aktuelle KI-Tools wie Zaza Draft sind 'enge KI'-hervorragend in spezifischen Aufgaben, aber nicht zu allgemeinem menschenähnlichem Denken fähig.",
    },
    category: { en: "Future of AI", de: "Zukunft der KI" },
    relatedTerms: ["Artificial Intelligence (AI)", "Narrow AI"],
  },
  {
    id: "multimodal-ai",
    term: { en: "Multimodal AI", de: "Multimodale KI" },
    definition: {
      en: "AI systems that can process and generate multiple types of content-text, images, audio, and video-simultaneously.",
      de: "KI-Systeme, die mehrere Arten von Inhalten-Text, Bilder, Audio und Video-gleichzeitig verarbeiten und generieren können.",
    },
    example: {
      en: "Future versions of AI writing tools might analyze student work samples, hear your voice notes, and generate comprehensive reports.",
      de: "Zukünftige Versionen von KI-Schreibtools könnten Schülerarbeitsproben analysieren, Ihre Sprachnotizen hören und umfassende Berichte generieren.",
    },
    category: { en: "Future of AI", de: "Zukunft der KI" },
    relatedTerms: ["Generative AI", "Large Language Model"],
  },
];

const categories = {
  en: [
    "All Categories",
    "AI Fundamentals",
    "Machine Learning",
    "Natural Language Processing",
    "Generative AI",
    "AI Models & Architectures",
    "Prompt Engineering",
    "AI Ethics & Safety",
    "Data & Privacy",
    "AI Tools & Platforms",
    "Educational AI Applications",
    "AI Implementation",
    "Future of AI",
  ],
  de: [
    "Alle Kategorien",
    "KI-Grundlagen",
    "Maschinelles Lernen",
    "Natürliche Sprachverarbeitung",
    "Generative KI",
    "KI-Modelle & Architekturen",
    "Prompt-Engineering",
    "KI-Ethik & Sicherheit",
    "Daten & Datenschutz",
    "KI-Tools & Plattformen",
    "Pädagogische KI-Anwendungen",
    "KI-Implementierung",
    "Zukunft der KI",
  ],
};

export default function GlossaryClient() {
  const { language } = useLanguage();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [expandedTerms, setExpandedTerms] = useState<Set<string>>(new Set());

  const toggleTerm = (termId: string) => {
    const newExpanded = new Set(expandedTerms);
    if (newExpanded.has(termId)) {
      newExpanded.delete(termId);
    } else {
      newExpanded.add(termId);
    }
    setExpandedTerms(newExpanded);
  };

  const filteredTerms = glossaryTerms.filter((term) => {
    const categoryMatch =
      selectedCategory === "All Categories" ||
      selectedCategory === "Alle Kategorien" ||
      term.category.en === selectedCategory ||
      term.category.de === selectedCategory;

    if (!categoryMatch) return false;

    if (!searchQuery) return true;

    const query = searchQuery.toLowerCase();
    const lang = language === "de" ? "de" : "en";

    return (
      term.term[lang].toLowerCase().includes(query) ||
      term.definition[lang].toLowerCase().includes(query) ||
      term.category[lang].toLowerCase().includes(query)
    );
  });

  const currentCategories = language === "de" ? categories.de : categories.en;
  const lang = language === "de" ? "de" : "en";

  return (
    <div className="min-h-screen bg-[#0F172A]">
      <section className="py-20 px-4 sm:px-6 lg:px-8 border-b border-white/10">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#A78BFA]/10 border border-[#A78BFA]/20 mb-6">
            <BookOpen className="w-4 h-4 text-[#A78BFA]" />
            <span className="text-sm font-medium text-[#A78BFA]">
              AI Knowledge Base
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
            {language === "de"
              ? "KI-Glossar für Lehrkräfte"
              : "AI Glossary for Educators"}
          </h1>

          <p className="text-xl text-gray-300 leading-relaxed">
            {language === "de"
              ? "Wesentliche KI-Begriffe in verständlicher Sprache für Lehrkräfte erklärt"
              : "Essential AI terms explained in plain language for teachers"}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-12 max-w-3xl mx-auto">
          <div className="text-center p-6 rounded-xl bg-white/5 border border-white/10">
            <div className="text-3xl font-bold text-[#A78BFA] mb-2">
              {glossaryTerms.length}+
            </div>
            <div className="text-sm text-gray-400">
              {language === "de" ? "Begriffe insgesamt" : "Total Terms"}
            </div>
          </div>
          <div className="text-center p-6 rounded-xl bg-white/5 border border-white/10">
            <div className="text-3xl font-bold text-[#A78BFA] mb-2">12</div>
            <div className="text-sm text-gray-400">
              {language === "de" ? "Kategorien" : "Categories"}
            </div>
          </div>
          <div className="text-center p-6 rounded-xl bg-white/5 border border-white/10">
            <div className="text-3xl font-bold text-[#A78BFA] mb-2">100%</div>
            <div className="text-sm text-gray-400">
              {language === "de" ? "Themenabdeckung" : "Topic Coverage"}
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 px-4 sm:px-6 lg:px-8 border-b border-white/10">
        <div className="max-w-7xl mx-auto">
          <div className="relative max-w-2xl mx-auto mb-8">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder={
                language === "de"
                  ? "Nach einem Begriff suchen..."
                  : "Search for a term..."
              }
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-6 text-lg bg-white/5 border border-white/10 text-white placeholder:text-gray-500 focus:border-[#A78BFA] focus:ring-[#A78BFA] rounded-lg"
            />
          </div>

          <div className="flex items-center gap-3 overflow-x-auto pb-2">
            {currentCategories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full whitespace-nowrap transition-all ${
                  selectedCategory === category
                    ? "bg-[#A78BFA] text-white"
                    : "bg-white/5 text-gray-300 hover:bg-white/10 border border-white/10"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          {filteredTerms.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-xl text-gray-400">
                {language === "de"
                  ? "Keine Begriffe gefunden"
                  : "No terms found"}
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              <p className="text-gray-400 mb-6">
                {language === "de" ? "Zeige" : "Showing"} {filteredTerms.length}{" "}
                {language === "de" ? "Begriffe" : "terms"}
              </p>
              {filteredTerms.map((term) => {
                const isExpanded = expandedTerms.has(term.id);
                return (
                  <div
                    key={term.id}
                    className="rounded-xl bg-white/5 border border-white/10 overflow-hidden hover:border-[#A78BFA]/30 transition-all"
                  >
                    <button
                      onClick={() => toggleTerm(term.id)}
                      className="w-full px-6 py-4 flex items-start justify-between gap-4 text-left hover:bg-white/5 transition-colors"
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-xl font-semibold text-white">
                            {term.term[lang]}
                          </h3>
                          <span className="px-2 py-1 rounded-full bg-[#A78BFA]/10 border border-[#A78BFA]/20 text-xs text-[#A78BFA]">
                            {term.category[lang]}
                          </span>
                        </div>
                        {!isExpanded && (
                          <p className="text-gray-400 line-clamp-2">
                            {term.definition[lang]}
                          </p>
                        )}
                      </div>
                      <span className="text-gray-400 text-sm">
                        {isExpanded ? "âˆ’" : "+"}
                      </span>
                    </button>

                    {isExpanded && (
                      <div className="px-6 pb-6 space-y-4">
                        <div>
                          <h4 className="text-sm font-semibold text-gray-400 mb-2">
                            {language === "de" ? "Definition" : "Definition"}
                          </h4>
                          <p className="text-gray-300 leading-relaxed">
                            {term.definition[lang]}
                          </p>
                        </div>

                        <div className="p-4 rounded-lg bg-[#A78BFA]/5 border border-[#A78BFA]/20">
                          <h4 className="text-sm font-semibold text-[#A78BFA] mb-2">
                            {language === "de" ? "Beispiel" : "Example"}
                          </h4>
                          <p className="text-gray-300 leading-relaxed">
                            {term.example[lang]}
                          </p>
                        </div>

                        {term.relatedTerms && term.relatedTerms.length > 0 && (
                          <div>
                            <h4 className="text-sm font-semibold text-gray-400 mb-2">
                              {language === "de"
                                ? "Verwandte Begriffe"
                                : "Related Terms"}
                            </h4>
                            <div className="flex flex-wrap gap-2">
                              {term.relatedTerms.map((relatedTerm) => (
                                <span
                                  key={relatedTerm}
                                  className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-sm text-gray-300"
                                >
                                  {relatedTerm}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8 border-t border-white/10 bg-[#0B1220]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            {language === "de"
              ? "Bereit, Ihr KI-Wissen anzuwenden?"
              : "Ready to Put AI Knowledge into Practice?"}
          </h2>
          <p className="text-xl text-gray-300 mb-8 leading-relaxed">
            {language === "de"
              ? "Jetzt, da Sie die Terminologie verstehen, sehen Sie, wie Zaza Draft diese KI-Konzepte in die Praxis umsetzt."
              : "Now that you understand the terminology, see how Zaza Draft puts these AI concepts into practice."}
          </p>
          <button className="px-8 py-4 bg-[#A78BFA] hover:bg-[#8B5CF6] text-white text-lg rounded-lg transition-colors">
            {language === "de" ? "Kostenlos loslegen" : "Start Free Trial"}
          </button>
        </div>
      </section>
    </div>
  );
}
