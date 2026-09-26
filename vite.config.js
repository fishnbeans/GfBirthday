import { defineConfig } from "vite";

export default defineConfig({
  base: process.env.BASE_PATH || (process.env.VERCEL ? "/" : "/GfBirthday/"),
  build: {
    rollupOptions: {
      input: "index.html",
    },
  },
});
