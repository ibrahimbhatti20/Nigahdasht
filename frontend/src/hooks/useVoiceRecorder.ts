import { useCallback, useEffect, useRef, useState } from "react";

export interface VoiceRecorderState {
  isRecording: boolean;
  isSupported: boolean;
  error: string | null;
}

export interface VoiceRecorderApi extends VoiceRecorderState {
  /** Start recording. Resolves once the mic stream is live. */
  start: () => Promise<void>;
  /** Stop recording and return the recorded audio Blob. */
  stop: () => Promise<Blob | null>;
  /** Cancel an in-flight recording without producing a Blob. */
  cancel: () => void;
}

/**
 * Wraps `MediaRecorder` to capture short voice queries from the browser.
 *
 * The Blob it produces will eventually be POSTed to the Python `/api/stt`
 * endpoint (Whisper). For now `lib/api.transcribeAudio` returns mocked text.
 */
export function useVoiceRecorder(): VoiceRecorderApi {
  const [isRecording, setIsRecording] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const recorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const streamRef = useRef<MediaStream | null>(null);
  const stopResolverRef = useRef<((b: Blob | null) => void) | null>(null);

  const isSupported =
    typeof window !== "undefined" &&
    typeof navigator !== "undefined" &&
    !!navigator.mediaDevices &&
    typeof window.MediaRecorder !== "undefined";

  const cleanup = useCallback(() => {
    streamRef.current?.getTracks().forEach((t) => t.stop());
    streamRef.current = null;
    recorderRef.current = null;
    chunksRef.current = [];
    setIsRecording(false);
  }, []);

  const start = useCallback(async () => {
    if (!isSupported) {
      setError("Voice recording is not supported in this browser.");
      return;
    }
    setError(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      const mr = new MediaRecorder(stream);
      chunksRef.current = [];
      mr.ondataavailable = (e) => {
        if (e.data && e.data.size > 0) chunksRef.current.push(e.data);
      };
      mr.onstop = () => {
        const blob = new Blob(chunksRef.current, {
          type: mr.mimeType || "audio/webm",
        });
        const resolver = stopResolverRef.current;
        cleanup();
        resolver?.(blob);
        stopResolverRef.current = null;
      };
      recorderRef.current = mr;
      mr.start();
      setIsRecording(true);
    } catch (err) {
      const msg =
        err instanceof Error
          ? err.message
          : "Could not access microphone.";
      setError(msg);
      cleanup();
    }
  }, [cleanup, isSupported]);

  const stop = useCallback((): Promise<Blob | null> => {
    return new Promise((resolve) => {
      const mr = recorderRef.current;
      if (!mr || mr.state === "inactive") {
        resolve(null);
        return;
      }
      stopResolverRef.current = resolve;
      mr.stop();
    });
  }, []);

  const cancel = useCallback(() => {
    const mr = recorderRef.current;
    if (mr && mr.state !== "inactive") {
      stopResolverRef.current = () => {};
      mr.stop();
    }
    cleanup();
  }, [cleanup]);

  // Best-effort cleanup on unmount
  useEffect(() => {
    return () => cleanup();
  }, [cleanup]);

  return { isRecording, isSupported, error, start, stop, cancel };
}
