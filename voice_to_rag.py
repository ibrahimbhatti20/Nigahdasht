from stt_input import record_audio, transcribe_audio
from rag_query import answer_query   # we’ll refactor slightly
from rag_query import clean_transcription

def main():
    audio_path = record_audio()
    raw_text = transcribe_audio(audio_path)

    if not raw_text:
        print("No speech detected.")
        return

    query = clean_transcription(raw_text)

    print(f"🔎 Final query sent to RAG: {query}\n")
    answer_query(query)


if __name__ == "__main__":
    main()
