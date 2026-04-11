from whisper_stt import transcribe_urdu
from ollama_chat import ask_ollama

print("🎤 Speak in Urdu...")

user_text = transcribe_urdu()
print("\n📝 You said:", user_text)

print("\n🧠 Thinking...")
reply = ask_ollama(user_text)

print("\n🤖 Assistant (Urdu):\n", reply)
