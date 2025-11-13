import { resolve } from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const root = resolve(__dirname, "src");

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
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
