import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    host: "0.0.0.0", // listen on all addresses
    port: 5173,
    hmr: {
      port: 5173,
      host: "localhost",
    },
    allowedHosts: [
      // add your exact Replit preview URL here:
      "stay-sharp-holm-slice.replit.app",
      // you can also allow the entire subdomain pattern:
      ".spock.replit.dev",
      // deployment URL:
      "stay-sharp-holm-slice.replit.app",
    ],
  },
});
