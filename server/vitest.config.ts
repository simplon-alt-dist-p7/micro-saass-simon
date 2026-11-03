import { defineConfig } from "vitest/config";

export default defineConfig({
    test: {
        globalSetup: "./tests/setup/global-setup.ts",
        setupFiles: ["./tests/setup/vitest-setup.ts"],
        fileParallelism: false,
    },
});
