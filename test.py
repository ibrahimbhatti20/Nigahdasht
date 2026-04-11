for i, text in enumerate(metadata):
    if "malnutrition" in text.lower():
        print("FOUND in chunk", i)
        print(text[:400])
        break
