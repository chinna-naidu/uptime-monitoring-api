
const { ping } = require("../util/helper")

const userRoutes = require("./user")

const router = {
    'ping': ping,
    ...userRoutes
}

module.exports =
    router