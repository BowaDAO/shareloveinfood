import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {},
      colors: {
        secondary: "#033021",
        misc: "#DCE93A",
        modalblack: "rgba(0, 0, 0, 0.5)",
      },
    },
  },
  plugins: [],
};
export default config;
