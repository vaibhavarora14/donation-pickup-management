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
        accent: {
          DEFAULT: "var(--color-accent)",
          hover: "var(--color-accent-hover)",
        },
        // Text colors
        heading: "var(--color-text-heading)",
        body: "var(--color-text-body)",
        muted: "var(--color-text-muted)",
        // Background colors
        "bg-dark": "var(--color-bg-dark)",
        "bg-light": "var(--color-bg-light)",
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
