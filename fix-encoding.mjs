import { promises as fs } from 'fs';
import path from 'path';

const exts = new Set(['.ts', '.tsx', '.json', '.md', '.mdx']);
const bad = /Ã¼|Ã¶|Ã¤|ÃŸ|Ã„|Ã–|Ãœ|LehrkrÃ¤|SchÃ¼|fÃ¼r/; // common mojibake patterns

async function walk(dir) {
  for (const dirent of await fs.readdir(dir, { withFileTypes: true })) {
    const p = path.join(dir, dirent.name);
    if (dirent.isDirectory()) { await walk(p); continue; }
    if (!exts.has(path.extname(dirent.name))) continue;

    let s = await fs.readFile(p, 'utf8');
    if (!bad.test(s)) continue; // skip clean files

    const fixed = Buffer.from(s, 'latin1').toString('utf8');
    if (fixed !== s) {
      await fs.writeFile(p, fixed, { encoding: 'utf8' });
      console.log('fixed', p);
    }
  }
}

walk(process.cwd()).catch(e => { console.error(e); process.exit(1); });
