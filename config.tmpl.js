module.exports = {
  API: "http://localhost:3000/api",
  AUTH: "http://localhost:3000/auth",
  port: 3000,
  
  database: {
    host: "localhost",
    user: "postgres",
    password: "",
    database: "galaxygame",
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000
  },

  mailer: {
    
  },
  queueInterval: 300000 // 60000 = 1 minute 
};