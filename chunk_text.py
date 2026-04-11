import os

IN_DIR = "data/cleaned"
OUT_DIR = "data/chunks"
os.makedirs(OUT_DIR, exist_ok=True)

CHUNK_SIZE = 400
OVERLAP = 50

def chunk_words(words):
    chunks = []
    start = 0
    while start < len(words):
        end = start + CHUNK_SIZE
        chunks.append(" ".join(words[start:end]))
        start += CHUNK_SIZE - OVERLAP
    return chunks

for root, _, files in os.walk(IN_DIR):
    topic = os.path.basename(root)
    for file in files:
        if file.endswith(".txt"):
            with open(os.path.join(root, file), "r", encoding="utf-8") as f:
                words = f.read().split()

            chunks = chunk_words(words)
            base = file.replace(".txt", "")

            for i, chunk in enumerate(chunks):
                out_name = f"{topic}_{base}_chunk_{i}.txt"
                with open(os.path.join(OUT_DIR, out_name), "w", encoding="utf-8") as f:
                    f.write(chunk)

            print(f"{file}: {len(chunks)} chunks")
