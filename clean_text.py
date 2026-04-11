import os
import re

IN_DIR = "data/extracted"
OUT_DIR = "data/cleaned"
os.makedirs(OUT_DIR, exist_ok=True)

def clean_text(text):
    text = re.sub(r"\s+", " ", text)
    text = re.sub(r"-\s+", "", text)   # fix broken words
    return text.strip()

for root, _, files in os.walk(IN_DIR):
    for file in files:
        if file.endswith(".txt"):
            in_path = os.path.join(root, file)
            topic = os.path.basename(root)

            topic_dir = os.path.join(OUT_DIR, topic)
            os.makedirs(topic_dir, exist_ok=True)

            out_path = os.path.join(topic_dir, file)

            with open(in_path, "r", encoding="utf-8") as f:
                text = f.read()

            cleaned = clean_text(text)

            with open(out_path, "w", encoding="utf-8") as f:
                f.write(cleaned)

            print(f"Cleaned: {out_path}")
