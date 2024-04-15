const dev = {
    SERVER_PORT: process.env.PORT,
    MONGODB_URI: process.env.MONGODB_URI,
    // RP_APIKEY_PUBLIC: process.env.RP_APIKEY_PUBLIC,
    // RP_APIKEY_PRIVATE: process.env.RP_APIKEY_PRIVATE,
    JWT_SECRET: process.env.JWT_SEC
  }
  
  const staging = {
    // SERVER_PORT: process.env.SERVER_STAGING_PORT,
    // MONGODB_URI: process.env.MONGODB_STAGING_URI,
    // RP_APIKEY_PUBLIC: process.env.RP_APIKEY_PUBLIC,
    // RP_APIKEY_PRIVATE: process.env.RP_APIKEY_PRIVATE,
    // JWT_SECRET: process.env.JWT_STAGING_SECRET
  }
  module.exports = function () {
    switch (process.env.NODE_ENV) {
      case 'development':
        return dev
      case 'staging':
        return staging
      default:
        return dev // Default to development settings
    }
  }
  