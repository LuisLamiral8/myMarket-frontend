const ENV = {
  dev: {
    apiUrl: "http://localhost:8080/",
  },
  test: {
    apiUrl: "http://localhost:8080/",
  },
  prod: {
    apiUrl: "http://localhost:8080/",
  },
};
export function getEnvVars() {
  //   const env = process.env.ENV; // Cambia esto para usar process.env.ENV

  //   if (env === "PROD") {
  //     return ENV.PROD;
  //   } else if (env === "TEST") {
  //     return ENV.TEST;
  //   } else {
  //     return ENV.DEV;
  //   }
  return ENV.dev.apiUrl;
}
