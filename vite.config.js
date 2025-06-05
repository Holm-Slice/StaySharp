
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    host: "0.0.0.0",
    port: 5173,
    hmr: {
      port: 5173,
      host: "0.0.0.0"
    },
    allowedHosts: [
      "d0751fc2-9db6-4baa-aebd-241cd1de6252-00-39sxc8r074dl3.spock.replit.dev",
      ".spock.replit.dev",
      "stay-sharp-holm-slice.replit.app",
      "atxstaysharp.world"
    ]
  },
});
