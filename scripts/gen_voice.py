import asyncio
import json
import os
import sys
import edge_tts

VOICE_PRIMARY = "en-IN-NeerjaNeural"
VOICE_FALLBACK = "en-US-AriaNeural"
RATE = "-5%"

SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
PROJECT_ROOT = os.path.dirname(SCRIPT_DIR)
NARRATION_PATH = os.path.join(SCRIPT_DIR, "narration.json")
OUTPUT_DIR = os.path.join(PROJECT_ROOT, "public", "voice")


async def generate_scene_voice(item, voice_to_use):
    scene_id = item.get("id") or f"scene{item.get('scene')}"
    text = item["text"]
    audio_path = os.path.join(OUTPUT_DIR, f"{scene_id}.mp3")
    json_path = os.path.join(OUTPUT_DIR, f"{scene_id}.json")

    print(f"Generating voice for {scene_id} using {voice_to_use}...")
    communicate = edge_tts.Communicate(text, voice_to_use, rate=RATE, boundary="WordBoundary")

    words = []
    audio_data = bytearray()

    async for chunk in communicate.stream():
        if chunk["type"] == "audio":
            audio_data.extend(chunk["data"])
        elif chunk["type"] == "WordBoundary":
            start_sec = chunk["offset"] / 1e7
            dur_sec = chunk["duration"] / 1e7
            words.append({
                "text": chunk["text"],
                "start": round(start_sec, 4),
                "end": round(start_sec + dur_sec, 4),
                "duration": round(dur_sec, 4)
            })

    with open(audio_path, "wb") as f:
        f.write(audio_data)

    metadata = {
        "id": scene_id,
        "scene": item.get("scene"),
        "text": text,
        "voice": voice_to_use,
        "rate": RATE,
        "words": words,
        "total_words": len(words),
    }

    with open(json_path, "w", encoding="utf-8") as f:
        json.dump(metadata, f, indent=2, ensure_ascii=False)

    print(f"  [OK] Saved {audio_path} ({len(audio_data)} bytes, {len(words)} words)")


async def main():
    os.makedirs(OUTPUT_DIR, exist_ok=True)

    if not os.path.exists(NARRATION_PATH):
        print(f"Error: {NARRATION_PATH} not found!")
        sys.exit(1)

    with open(NARRATION_PATH, "r", encoding="utf-8") as f:
        narration_data = json.load(f)

    # Test primary voice availability
    voice_to_use = VOICE_PRIMARY
    try:
        test_comm = edge_tts.Communicate("Test", voice_to_use)
        async for _ in test_comm.stream():
            break
    except Exception as e:
        print(f"Warning: Primary voice {VOICE_PRIMARY} failed ({e}), falling back to {VOICE_FALLBACK}")
        voice_to_use = VOICE_FALLBACK

    print(f"Using voice: {voice_to_use}, rate: {RATE}")
    for item in narration_data:
        await generate_scene_voice(item, voice_to_use)

    print("All voiceover files generated successfully!")


if __name__ == "__main__":
    asyncio.run(main())
