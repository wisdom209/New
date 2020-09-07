export default {
    mongoDbUrl : process.env.mongoDbUrl || "mongodb://localhost/amaze",
    jwtSecret : process.env.jwtSecret || "somethingSecret"
}