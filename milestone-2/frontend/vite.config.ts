import { resolve } from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

const root = resolve(__dirname, "src");

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  resolve: {
    alias: {
      "@/components": resolve(root, "components"),
      "@/types": resolve(root, "types"),
      "@/constants": resolve(root, "constants"),
      "@/hooks": resolve(root, "hooks"),
      "@/assets": resolve(root, "assets"),
      "@/utils": resolve(root, "utils"),
    },
  },
});
