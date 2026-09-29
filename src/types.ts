export interface WordTiming {
  text: string;
  start: number;
  end: number;
  duration: number;
}

export interface SceneConfig {
  id: string;
  scene: number;
  name: string;
  topic: string;
  text: string;
  fallbackDuration: number;
}

export interface SceneProps {
  id: string;
  scene: number;
  name: string;
  topic: string;
  text: string;
  durationInFrames: number;
  audioDuration: number;
  words: WordTiming[];
}

export interface HandiDemoProps extends Record<string, unknown> {
  scenes: SceneProps[];
}
