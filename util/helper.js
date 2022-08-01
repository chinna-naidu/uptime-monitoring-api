const { StringDecoder } = require("string_decoder")

/**
 * a function to parse the request body
 * @param {import('http').IncomingMessage} req 
 * @returns {Promise<any>}
 */
function parseBody(req) {
    const decoder = new StringDecoder('utf-8')
    let buffer = ''
    return new Promise((resolve, reject) => {
        req.on('data', (data) => {
            buffer += decoder.write(data)
        })

        req.on('error', (error) => {
            reject(error)
        })

        req.on('end', () => {
            buffer += decoder.end()
            let parsedBuffer = {}
            try {
                parsedBuffer = buffer ? JSON.parse(buffer) : {}
            } catch (err) {
                console.log(err)
            }
            resolve(parsedBuffer)
        })
    })
}


/**
 *  a utiltiy function for logging request details
 * @param {import('../index').RequestData} data 
 */
function log(data) {
    const date = new Date()
    const datetime = `${date.toLocaleDateString(Intl.DateTimeFormat)}:${date.toLocaleTimeString(Intl.DateTimeFormat)}`
    console.log(`[${datetime}] ${data.method.toUpperCase()} /${data.path} query:${JSON.stringify(data.query)} body:${JSON.stringify(data.body)}`)
}

/**
 * 
 * @param {import('../index').RequestData} data 
 * @param {import('../index').ReplyCb} reply 
 */
function NotFoundHandler(data, reply) {
    reply(404, { message: "Route Not Found" })
}


/**
 * 
 * @param {import('../index').RequestData} data 
 * @param {import('../index').ReplyCb} reply 
 */
function ping(data, reply) {
    // console.log(data.headers)
    reply(200, { message: 'server is running successfully.' })
}



module.exports = {
    parseBody,
    log,
    NotFoundHandler,
    ping
}