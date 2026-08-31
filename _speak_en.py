"""Regenerate English narration MP3s from i18n.js (EN UI labels)."""
from pathlib import Path
import asyncio
import re
import shutil
import edge_tts

ROOT = Path(__file__).resolve().parent
VOICE = "en-US-JennyNeural"
MEDIA = ROOT / "media"
COPY = Path(r"C:\Users\ian\Documents\pedrosoft\turistapornatureza\public\guia-tpn\media")

# (guide key, folder, first narration index for step 1)
LAYOUT = [
    ("cadastro", "cadastro", 1),
    ("taxa", "taxa", 4),
    ("reembolso", "reembolso", 1),
    ("titularidade", "titularidade", 1),
    ("isencao", "isencao", 1),
    ("importar", "importar", 1),
    ("comprovante", "comprovante", 1),
]


def strip_html(s: str) -> str:
    return re.sub(r"<[^>]+>", "", s)


def extract_en_block(src: str, key: str):
    m = re.search(rf"    {key}: \{{", src)
    if not m:
        raise SystemExit(f"guide not found: {key}")
    start = m.start()
    nxt = re.search(r"\n    [a-z]+: \{", src[m.end():])
    end = m.end() + nxt.start() if nxt else len(src)
    return src[start:end]


def extract_ens(block: str, field: str):
    return re.findall(rf"{field}: \{{[^{{}}]*?\ben: \"((?:\\.|[^\"\\])*)\"", block, re.S)


def jobs_from_i18n():
    src = (ROOT / "i18n.js").read_text(encoding="utf-8")
    jobs = []
    for key, folder, first in LAYOUT:
        block = extract_en_block(src, key)
        steps = extract_ens(block, "narrate")
        done = extract_ens(block, "doneNarrate")
        if not steps:
            raise SystemExit(f"no narrate.en in {key}")
        if not done:
            raise SystemExit(f"no doneNarrate.en in {key}")
        for i, text in enumerate(steps):
            jobs.append((folder, first + i, strip_html(text)))
        jobs.append((folder, first + len(steps), strip_html(done[0])))
    return jobs


async def speak(text, dest: Path):
    dest.parent.mkdir(parents=True, exist_ok=True)
    tmp = dest.with_suffix(".tmp.mp3")
    await edge_tts.Communicate(text, VOICE).save(str(tmp))
    tmp.replace(dest)
    copy = COPY / dest.relative_to(MEDIA)
    copy.parent.mkdir(parents=True, exist_ok=True)
    shutil.copy2(dest, copy)
    print(f"  {dest.relative_to(MEDIA)}  ({len(text)} chars)")


async def main():
    jobs = jobs_from_i18n()
    print(f"{len(jobs)} English clips")
    for folder, n, text in jobs:
        print(f"[{folder} {n:02d}] {text[:90]}...")
        await speak(text, MEDIA / folder / f"narracao-{n:02d}.en.mp3")


if __name__ == "__main__":
    asyncio.run(main())
