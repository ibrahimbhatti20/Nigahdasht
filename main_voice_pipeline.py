from stt_input import record_and_transcribe
from rag_query import answer_query

print("🎙️ Urdu Voice Health Assistant Ready\n")

while True:
    choice = input("Press ENTER to speak or type 'exit': ").strip().lower()

    if choice == "exit":
        print("Exiting...")
        break

    # 🎤 STEP 1: Speech → Text
    print("\n🎤 Speak now...\n")
    user_query = record_and_transcribe()

    if not user_query:
        print("❌ No speech detected.\n")
        continue

    print("📝 You said:")
    print(user_query)

    # 📚 STEP 2: RAG
    print("\n📚 Generating answer...\n")
    answer = answer_query(user_query)

    # 🧾 STEP 3: Output
    print("\n✅ FINAL ANSWER:\n")
    print(answer)

    print("\n" + "="*60 + "\n")