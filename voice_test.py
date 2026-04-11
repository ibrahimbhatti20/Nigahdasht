import whisper
import sounddevice as sd
from scipy.io.wavfile import write
import numpy as np
import os

# Load Whisper once
print("Loading Whisper model...")
whisper_model = whisper.load_model("base")

def record_and_transcribe(duration=5, fs=16000):
    """
    Records audio from microphone and returns transcribed text
    """

    filename = "temp_input.wav"

    print("🎤 Recording... Speak now")
    recording = sd.rec(
        int(duration * fs),
        samplerate=fs,
        channels=1,
        dtype=np.int16
    )
    sd.wait()

    write(filename, fs, recording)
    print("✅ Recording complete. Transcribing...")

    result = whisper_model.transcribe(
        filename,
        language="ur"
    )

    text = result.get("text", "").strip()

    # Optional cleanup
    if os.path.exists(filename):
        os.remove(filename)

    return text
