module.exports = {
  
  // -------------------- URLs --------------------
  urls: {
    BASE_URL: "https://practicetestautomation.com",
    LOGIN: "https://practicetestautomation.com/practice-test-login/",
    EXCEPTIONS: "https://practicetestautomation.com/practice-test-exceptions/",
    TABLE: "https://practicetestautomation.com/practice-test-table/"
  },

  // -------------------- Credentials --------------------
  credentials: {
    validUser: {
      username: "student",
      password: "Password123"
    },
    invalidUser: {
      username: "incorrectUser",
      password: "Password123"
    },
    invalidPassword: {
      username: "student",
      password: "incorrectPassword"
    }
  }

};
