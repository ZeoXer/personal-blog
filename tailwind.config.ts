import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      animation: {
        "move-from-bottom": "moveFromBottom 0.8s ease-in-out",
      },
    },
    keyframes: {
      moveFromBottom: {
        from: {
          transform: "translateY(80%)",
          opacity: "0",
        },
        to: {
          transform: "translateY(0)",
          opacity: "1",
        },
      },
    },
  },
  plugins: [],
};
export default config;
