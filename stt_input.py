import sounddevice as sd
import soundfile as sf
import torch
import pyttsx3

# -------- TTS SETUP --------
tts_engine = pyttsx3.init()

# Try to slow it slightly (more understandable)
tts_engine.setProperty('rate', 150)

# Volume (0.0 to 1.0)
tts_engine.setProperty('volume', 1.0)


from transformers import WhisperProcessor, WhisperForConditionalGeneration

from rag_query import answer_query   # 🔹 THIS is the connection

# ---------------- CONFIG ----------------
MODEL_NAME = "openai/whisper-small"
SAMPLE_RATE = 16000
RECORD_SECONDS = 5
AUDIO_FILE = "input.wav"
# ----------------------------------------


def record_and_transcribe():
    print("🎤 Speak now...")

    audio = sd.rec(
        int(RECORD_SECONDS * SAMPLE_RATE),
        samplerate=SAMPLE_RATE,
        channels=1,
        dtype="float32"
    )
    sd.wait()

    sf.write(AUDIO_FILE, audio, SAMPLE_RATE)

    speech, _ = sf.read(AUDIO_FILE)

    inputs = processor(
        speech,
        sampling_rate=SAMPLE_RATE,
        return_tensors="pt"
    )

    with torch.no_grad():
        predicted_ids = model.generate(
            inputs.input_features,
            language="ur",
            task="transcribe"
        )

    text = processor.batch_decode(
        predicted_ids,
        skip_special_tokens=True
    )[0]

    return text.strip()


def speak(text):
    if not text.strip():
        return
    tts_engine.say(text)
    tts_engine.runAndWait()


# -------- Load Whisper ONCE --------
print("Loading Whisper model...")
processor = WhisperProcessor.from_pretrained(MODEL_NAME)
model = WhisperForConditionalGeneration.from_pretrained(MODEL_NAME)
model.eval()

print("\n🎙️ Voice → RAG system ready.\n")


# ============== MAIN LOOP ==============
while True:
    try:
        user_query = record_and_transcribe()
    except KeyboardInterrupt:
        print("\nExiting.")
        break

    if not user_query:
        print("❌ No speech detected.\n")
        continue

    print("\n📝 TRANSCRIBED TEXT:")
    print(user_query)

    print("\n📚 Generating RAG answer...\n")
    final_answer = answer_query(user_query)

    print("\n✅ FINAL ANSWER:\n")
    print(final_answer)
    print("\n" + "=" * 60 + "\n")

    print("🔊 Speaking answer...\n")
    speak(final_answer)


    choice = input("Press Enter to ask again, or type Q to quit: ").strip().lower()
    if choice == "q":
        print("👋 Exiting voice assistant.")
        break

