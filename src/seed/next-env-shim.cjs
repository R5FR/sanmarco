/**
 * Shim for @next/env — provides loadEnvConfig as a no-op
 * when running outside of Next.js context (e.g., seed scripts).
 * Env variables are loaded via dotenv or --env-file instead.
 */
module.exports = {
  loadEnvConfig: function () {
    return { loadedEnvFiles: [] }
  },
}
