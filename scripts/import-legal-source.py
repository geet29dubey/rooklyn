"""Convert the supplied Word HTML policies into clean, structured JSON.

Usage: python scripts/import-legal-source.py NOTICE.htm COOKIES.htm PRIVACY.htm
"""

import json
import re
import sys
from pathlib import Path

from lxml import html


def clean(value: str) -> str:
    return re.sub(r"\s+", " ", value.replace("\xa0", " ")).strip()


def extract(path: Path):
    document = html.fromstring(path.read_bytes().decode("cp1252"))
    body = document.find("body")
    blocks = []
    for element in body.iter():
        if element.tag == "h1" and clean(element.text_content()).startswith("Anexo:"):
            break
        if element.tag in {"p", "h1", "h2", "h3"}:
            if element.xpath("ancestor::table"):
                continue
            value = clean(element.text_content())
            if not value:
                continue
            if re.match(r"^[·•]\s*", value):
                blocks.append({"type": "listItem", "text": re.sub(r"^[·•]\s*", "", value)})
            else:
                blocks.append({"type": element.tag, "text": value})
        elif element.tag == "table" and not element.xpath("ancestor::table"):
            rows = []
            for row in element.xpath(".//tr"):
                cells = [clean(cell.text_content()) for cell in row.xpath("./th|./td")]
                if any(cells):
                    rows.append(cells)
            if rows:
                blocks.append({"type": "table", "rows": rows})

    # The supplied cookie document has a one-character NIF typo. The user
    # confirmed Z0680759X as the correct identifier.
    for block in blocks:
        if "text" in block:
            block["text"] = block["text"].replace("Z0680759Z", "Z0680759X")
        if "rows" in block:
            block["rows"] = [
                [cell.replace("Z0680759Z", "Z0680759X") for cell in row]
                for row in block["rows"]
            ]
    return blocks


def main():
    if len(sys.argv) != 4:
        raise SystemExit(__doc__)
    source = {
        "notice": Path(sys.argv[1]),
        "cookies": Path(sys.argv[2]),
        "privacy": Path(sys.argv[3]),
    }
    destination = Path(__file__).resolve().parents[1] / "lib" / "legal" / "es.json"
    destination.parent.mkdir(parents=True, exist_ok=True)
    destination.write_text(
        json.dumps({key: extract(path) for key, path in source.items()}, ensure_ascii=False, indent=2)
        + "\n",
        encoding="utf-8",
    )
    print(f"Wrote {destination}")


if __name__ == "__main__":
    main()
