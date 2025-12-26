/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "var(--color-primary)",
          hover: "var(--color-primary-hover)",
        },
        secondary: {
          DEFAULT: "var(--color-secondary)",
          hover: "var(--color-secondary-hover)",
        },
        title: "var(--color-title)",
        paragraph: "var(--color-paragraph)",
        "call-to-action": "var(--color-call-to-action)",
        main: "var(--color-main)",
        "misc-keyboard": "var(--color-misc-keyboard)",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
      borderRadius: {
        DEFAULT: "16px",
      },
      spacing: {
        15: "60px",
      },
    },
  },
  plugins: [],
};
