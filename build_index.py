import os
import pickle
import faiss
from sentence_transformers import SentenceTransformer

CHUNKS_DIR = "data/chunks"
VECTOR_DIR = "vector_store"
os.makedirs(VECTOR_DIR, exist_ok=True)

model = SentenceTransformer("all-MiniLM-L6-v2")

texts = []

for file in os.listdir(CHUNKS_DIR):
    if file.endswith(".txt"):
        with open(os.path.join(CHUNKS_DIR, file), "r", encoding="utf-8") as f:
            text = f.read().strip()
            if len(text) > 50:  # skip junk chunks
                texts.append(text)

print(f"Loaded {len(texts)} chunks")

embeddings = model.encode(texts, show_progress_bar=True)

index = faiss.IndexFlatL2(embeddings.shape[1])
index.add(embeddings)

faiss.write_index(index, os.path.join(VECTOR_DIR, "health.index"))

with open(os.path.join(VECTOR_DIR, "metadata.pkl"), "wb") as f:
    pickle.dump(texts, f)

print("Vector store rebuilt successfully.")
