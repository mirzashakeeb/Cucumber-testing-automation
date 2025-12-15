module.exports = {
  timeout: 15000,
  browser: process.env.BROWSER || "chromium",
  env: process.env.ENV || "dev"
};
