import { SceneConfig } from "./types";

export const COLORS = {
  bg: "#F5F6F8",
  textPrimary: "#1B2540",
  textSecondary: "#4A5568",
  textMuted: "#718096",
  accentOrange: "#F28C28",
  accentBlue: "#1F4E9E",
  accentBlueLight: "rgba(31, 78, 158, 0.08)",
  accentOrangeLight: "rgba(242, 140, 40, 0.12)",
  cardBg: "#FFFFFF",
  cardBorder: "rgba(27, 37, 64, 0.08)",
  cardShadow: "0 24px 48px -12px rgba(27, 37, 64, 0.08), 0 4px 16px rgba(27, 37, 64, 0.04)",
  cardShadowHover: "0 30px 60px -15px rgba(27, 37, 64, 0.12)",
};

export const FPS = 30;
export const WIDTH = 1920;
export const HEIGHT = 1080;
export const TRANSITION_FRAMES = 15;
export const SCENE_PADDING_SECONDS = 0.6;

export const DEFAULT_SCENES_CONFIG: SceneConfig[] = [
  {
    id: "scene1",
    scene: 1,
    name: "TITLE",
    topic: "INTRODUCING",
    text: "The Thought-Controlled Bionic Hand is an open-source robotic hand, built for machine learning and prosthetics research.",
    fallbackDuration: 6.4,
  },
  {
    id: "scene2",
    scene: 2,
    name: "CAD OVERVIEW",
    topic: "CAD OVERVIEW",
    text: "Here is the complete CAD assembly. It has five digits driven by six servo motors, with a thumb that rotates independently, and every part is designed to be three D printed.",
    fallbackDuration: 12.8,
  },
  {
    id: "scene3",
    scene: 3,
    name: "FINGER",
    topic: "MECHANICS",
    text: "Each finger is built from proximal, intermediate and distal sections, joined by pivot hinges and held together with small M2 screws.",
    fallbackDuration: 9.6,
  },
  {
    id: "scene4",
    scene: 4,
    name: "THUMB",
    topic: "KINEMATICS",
    text: "The thumb has its own servo and a geared rotator, letting it swing across the palm for pinch, tripod and column grips.",
    fallbackDuration: 8.0,
  },
  {
    id: "scene5",
    scene: 5,
    name: "ACTUATION",
    topic: "ACTUATION",
    text: "Each digit is pulled by a zip-tie tendon wound on a servo spool, and aluminium covers on the servos act as heat sinks.",
    fallbackDuration: 8.4,
  },
  {
    id: "scene6",
    scene: 6,
    name: "SENSING",
    topic: "SENSORS",
    text: "Potentiometers in the joints measure finger position, and a force-sensitive resistor in every fingertip measures grip force, giving researchers rich sensor data.",
    fallbackDuration: 10.6,
  },
  {
    id: "scene7",
    scene: 7,
    name: "PALM",
    topic: "VISION & GRIP",
    text: "A camera in the palm captures what the hand sees, and rubber grip pads improve friction when holding objects.",
    fallbackDuration: 7.2,
  },
  {
    id: "scene8",
    scene: 8,
    name: "OUTRO",
    topic: "PROJECT OVERVIEW",
    text: "By combining intelligent actuation, multi-modal sensory feedback, and palm vision, our bionic hand delivers an affordable, responsive platform for next-generation prosthetics.",
    fallbackDuration: 12.5,
  },
];
