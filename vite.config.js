import { defineConfig } from "vite";

export default defineConfig({
  build: {
    rollupOptions: {
      input: "Happy Birthday Website.html",
    base: process.env.BASE_PATH || "/GfBirthday",
    },
  },
});
