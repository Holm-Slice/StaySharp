import lineClamp from "@tailwindcss/line-clamp";

export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        pale_orange: "#ffd9a6",
        light_orange: "#fbb03b",
        orange: "#f7931e",
        ss_purple: "#453393",
        ss_light_purple: "#7a5cff",
        ss_pale_purple: "#695d9e",
        ss_teal: "#73CAB3",
        ss_pink: "#d19ac5",
      },
      keyframes: {
        underline: {
          "0%": { width: "0%" },
          "100%": { width: "100%" },
        },
      },
      animation: {
        underline: "underline 1s ease-in-out forwards",
      },
    },
  },
  plugins: [lineClamp],
};
