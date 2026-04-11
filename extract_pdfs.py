import fitz  # PyMuPDF
import os

RAW_DIR = "data/raw"
OUT_DIR = "data/extracted"
os.makedirs(OUT_DIR, exist_ok=True)

def extract_pdf(pdf_path):
    doc = fitz.open(pdf_path)
    text = ""
    for page in doc:
        text += page.get_text()
    return text

for root, _, files in os.walk(RAW_DIR):
    for file in files:
        if file.endswith(".pdf"):
            pdf_path = os.path.join(root, file)
            topic = os.path.basename(root)

            topic_dir = os.path.join(OUT_DIR, topic)
            os.makedirs(topic_dir, exist_ok=True)

            out_file = file.replace(".pdf", ".txt")
            out_path = os.path.join(topic_dir, out_file)

            text = extract_pdf(pdf_path)

            with open(out_path, "w", encoding="utf-8") as f:
                f.write(text)

            print(f"Extracted: {out_path}")
