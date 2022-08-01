const data = require("../lib/data")


/**
 * 
 * @param {import('../index').RequestData} data 
 * @param {import('../index').ReplyCb} reply 
 */
function user(data, reply) {

    if (data.method === 'get') {
        getUser(data, reply)
    }

    if (data.method === 'post') {
        createUser(data, reply)
    }

    if (data.method === 'put') {
        updateUser(data, reply)
    }

    if (data.method === 'delete') {
        deleteUser(data, reply)
    }
}


/**
 * 
 * @param {import('../index').RequestData} data 
 * @param {import('../index').ReplyCb} reply 
 */
function createUser(data, reply) {
    reply(200, {})
}


/**
 * 
 * @param {import('../index').RequestData} data 
 * @param {import('../index').ReplyCb} reply 
 */
function getUser(data, reply) {
    reply(200, {})
}


/**
 * 
 * @param {import('../index').RequestData} data 
 * @param {import('../index').ReplyCb} reply 
 */
function updateUser(data, reply) {
    reply(200, {})
}



/**
 * 
 * @param {import('../index').RequestData} data 
 * @param {import('../index').ReplyCb} reply 
 */
function deleteUser(data, reply) {
    reply(200, {})
}

module.exports = {
    user
}