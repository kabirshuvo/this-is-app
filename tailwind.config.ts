import type { Config } from "tailwindcss";

/** @type {Config} */
const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/[locale]/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        tjblue: {
          "50": "#e6f2f7",
          "100": "#cce5ef",
          "200": "#99cbe0",
          "300": "#66b1d0",
          "400": "#3397c1",
          "500": "#005286",
          "600": "#00476e",
          "700": "#003b57",
          "800": "#002f3f",
          "900": "#002428",
          "950": "#001a1a",
        },
        tjgreen: {
          "50": "#e6f7ec",
          "100": "#cceee0",
          "200": "#99ddc1",
          "300": "#66cda2",
          "400": "#33bc83",
          "500": "#41B549",
          "600": "#33913a",
          "700": "#267d2b",
          "800": "#007A24",
          "900": "#0d540e",
          "950": "#073a09",
        },
        tjyellow: {
          "50": "#ffffe6",
          "100": "#ffffcc",
          "200": "#ffff99",
          "300": "#ffff66",
          "400": "#ffff33",
          "500": "#FFFF1A",
          "600": "#cccc14",
          "700": "#99990f",
          "800": "#66660a",
          "900": "#333305",
          "950": "#191902",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
