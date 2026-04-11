import faiss
import pickle
import subprocess
import numpy as np
import sounddevice as sd
from scipy.io.wavfile import write
from sentence_transformers import SentenceTransformer
import torch
import tempfile
import os
from TTS.api import TTS


# ---------------- CONFIG ----------------
INDEX_PATH = "vector_store/health.index"
META_PATH = "vector_store/metadata.pkl"
EMBED_MODEL = "all-MiniLM-L6-v2"
OLLAMA_MODEL = "llama3.2:1b"
TOP_K = 5
RECORD_SECONDS = 5
SAMPLE_RATE = 16000
# ----------------------------------------

print("Loading models...")

# Embedding model
embedder = SentenceTransformer(EMBED_MODEL)

# Whisper STT
stt = pipeline(
    "automatic-speech-recognition",
    model="openai/whisper-small",
    device=0 if torch.cuda.is_available() else -1
)

# Urdu TTS
tts = TTS(
    model_name="tts_models/multilingual/multi-dataset/xtts_v2",
    progress_bar=False,
    gpu=torch.cuda.is_available()
)


# FAISS
index = faiss.read_index(INDEX_PATH)
with open(META_PATH, "rb") as f:
    metadata = pickle.load(f)

print("System ready.\n")

def record_audio():
    print("🎤 Speak now (Urdu)...")
    audio = sd.rec(
        int(RECORD_SECONDS * SAMPLE_RATE),
        samplerate=SAMPLE_RATE,
        channels=1,
        dtype="int16"
    )
    sd.wait()
    return audio

def rag_answer(question):
    vec = embedder.encode(question, normalize_embeddings=True)
    vec = np.array([vec]).astype("float32")

    D, I = index.search(vec, TOP_K)
    context = "\n".join(metadata[i][:300] for i in I[0] if i != -1)

    prompt = f"""
Answer ONLY using the context.
If not found, say:
Information not found in provided documents.

Context:
{context}

Question:
{question}

Answer:
""".strip()

    result = subprocess.run(
        ["ollama", "run", OLLAMA_MODEL],
        input=prompt.encode("utf-8"),
        stdout=subprocess.PIPE
    )

    return result.stdout.decode("utf-8", errors="ignore").strip()

def speak(text):
    print("🔊 Speaking...")
    with tempfile.NamedTemporaryFile(delete=False, suffix=".wav") as f:
        tts.tts_to_file(
            text=text,
            file_path=f.name,
            language="ur"
        )
        sd.play(*sd.read(f.name))
        sd.wait()
        os.unlink(f.name)


# ---------------- MAIN LOOP ----------------
while True:
    audio = record_audio()

    with tempfile.NamedTemporaryFile(delete=False, suffix=".wav") as f:
        write(f.name, SAMPLE_RATE, audio)
        audio_path = f.name

    result = stt(audio_path)
    os.unlink(audio_path)

    question = result["text"]
    print(f"\n📝 You said: {question}")

    answer = rag_answer(question)
    print(f"\n🧠 Answer: {answer}")

    speak(answer)
    print("\n" + "=" * 50 + "\n")
