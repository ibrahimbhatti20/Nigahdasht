import subprocess
import json

def ask_ollama(prompt):
    process = subprocess.Popen(
        ["ollama", "run", "phi3:mini"],
        stdin=subprocess.PIPE,
        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE,
        text=True,
        encoding="utf-8"
    )

    full_prompt = f"""
You are a helpful health assistant.
Reply ONLY in clear, simple Urdu.
Question: {prompt}
"""

    output, error = process.communicate(full_prompt)

    return output.strip()

if __name__ == "__main__":
    q = input("Enter Urdu text: ")
    response = ask_ollama(q)
    print("\nLLM Response:\n", response)
