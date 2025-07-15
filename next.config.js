// next.config.js
module.exports = {
    webpack(config) {
      // Habilita WASM asíncrono (necesario para onnxruntime-web)
      config.experiments = {
        ...config.experiments,
        asyncWebAssembly: true,
      }
      return config
    },
  }
  