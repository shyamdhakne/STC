from pathlib import Path
import re

root = Path(__file__).resolve().parent
html = (root / "index.html").read_text(encoding="utf-8")
css = (root / "css" / "style.css").read_text(encoding="utf-8")
refs = set(re.findall(r'(?:src|href|poster)="([^"]+)"', html))
refs |= set(re.findall(r'url\("([^"]+)"\)', css))
missing = []
for ref in sorted(refs):
    if ref.startswith(("http", "tel:", "mailto:", "#", "./")):
        continue
    path = (root / "css" / ref).resolve() if ref.startswith("../") else (root / ref).resolve()
    if not path.exists():
        missing.append(ref)
print("missing", missing)
print("refs checked", len(refs))
for p in sorted(root.rglob("*")):
    if p.is_file():
        print(f"{p.relative_to(root)} {p.stat().st_size}")
