import whisper
import sounddevice as sd
import soundfile as sf
import numpy as np

MODEL_NAME = "base"  # good balance for Urdu
SAMPLE_RATE = 16000
DURATION = 6  # seconds

print("Loading Whisper model...")
model = whisper.load_model(MODEL_NAME)

def record_audio():
    print("Recording... Speak now (Urdu).")
    audio = sd.rec(
        int(DURATION * SAMPLE_RATE),
        samplerate=SAMPLE_RATE,
        channels=1,
        dtype=np.float32
    )
    sd.wait()
    sf.write("input.wav", audio, SAMPLE_RATE)
    print("Recording saved.")

def transcribe_urdu():
    record_audio()
    result = model.transcribe("input.wav", language="ur")
    return result["text"]

if __name__ == "__main__":
    text = transcribe_urdu()
    print("Detected text:", text)
