/*
 core depencies
*/
const http = require("http")
const url = require("url")

/*
utility functions
*/
const { parseBody, log, NotFoundHandler } = require("./util/helper")
// const data = require("./lib/data")

/*
route handlers 
*/

const router = require("./routes/index")

// create the server listening at port 3000
// eslint-disable-next-line no-undef
const PORT = process.env.PORT || 3000


const server = http.createServer(async (req, res) => {
    try {
        // parsing url from the request
        const requestUrl = url.parse(req.url, true)
        // getting request method
        const method = req.method.toLowerCase()
        // getting query params from parsed request url
        const query = requestUrl.query
        // getting request path from parsed request url
        const path = requestUrl.pathname.replace(/^\/+|\/+$/g, '')
        // getting headers from the request
        const headers = req.headers
        // getting parsed body from the request
        const body = await parseBody(req)

        const data = {
            method,
            query,
            path,
            body,
            headers
        }

        // logging request data to console
        log(data)

        // getting handler based on the path of request
        const handler = typeof (router[path]) !== 'undefined' ? router[path] : NotFoundHandler

        // executing the handler and handling the callback
        handler(data, (status, payload) => {
            const encodedPayload = JSON.stringify(payload)
            res.setHeader('Content-Type', 'application/json')
            res.writeHead(status)
            res.end(encodedPayload)
        })

    } catch (error) {
        console.log(error)
        res.writeHead(500)
        res.end('Internal server error')
    }
})

server.listen(PORT, () => {
    console.log('listening at http://localhost:3000')
})

// data.create('users', 'user01', { name: 'chinna', age: 20, email: 'chinna@gmail.com' })
//     .then((path) => console.log(path))
//     .catch(err => console.log(err))

// data.update('users', 'user01', { name: 'chinna', age: 30, email: 'chinna@gmail.com' })
//     .then((data) => console.log(data))
//     .catch(err => console.log(err))

// data.read('users', 'user01')
//     .then((data) => console.log(data))
//     .catch(err => console.log(err))

// data.delete('users', 'user01')
//     .then((data) => console.log(data))
//     .catch(err => console.log(err))

