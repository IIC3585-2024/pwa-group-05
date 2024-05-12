import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";
import { viteStaticCopy } from "vite-plugin-static-copy";
import path from "path";

export default defineConfig({
  plugins: [
    // https://stackoverflow.com/questions/72658907/how-do-i-copy-a-static-folder-to-both-dev-and-build-in-vite
    viteStaticCopy({
      targets: [
        {
          src: path.resolve(__dirname, "./icons") + "/[!.]*",
          dest: path.resolve(__dirname, "dist/assets/icons"),
        },
      ],
    }),
    VitePWA({
      filename: "serviceWorker.js",
      strategies: "injectManifest",
      injectRegister: false,
      manifest: false,
      injectManifest: {
        injectionPoint: undefined,
      },
      build: {
        rollupOptions: {
          output: {
            assetFileNames: 'assets/[name].[ext]',
          },
        },
        assetsInclude: ['**/*.png', '**/*.svg', '**/*.jpg', '**/*.jpeg', '**/*.gif'],
      },
    }),
  ],
});
