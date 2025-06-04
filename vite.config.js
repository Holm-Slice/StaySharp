
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    host: "0.0.0.0", // listen on all addresses
    port: 5173,
    hmr: {
      port: 5173,
      host: ["localhost", "atxstaysharp.world"]
    },
    allowedHosts: [
      // add your exact Replit preview URL here:
      "d0751fc2-9db6-4baa-aebd-241cd1de6252-00-39sxc8r074dl3.spock.replit.dev",
      // you can also allow the entire subdomain pattern:
      ".spock.replit.dev",
      // deployment URL:
      "stay-sharp-holm-slice.replit.app",
      // custom domain:
      "atxstaysharp.world"
    ],
  },
});
