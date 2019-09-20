module.exports = {
  apps: [
    {
      name: "App",
      script: "app.js",
      instances: "max",
      exec_mode: "cluster",
      autorestart: true,
      watch: true,
      ignore_watch: ["public/*", "upload/*"],
      env: {
        NODE_ENV: "development"
      },
      env_production: {
        NODE_ENV: "production"
      }
    }
  ]
};
