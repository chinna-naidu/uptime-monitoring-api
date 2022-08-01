/*
 core depencies
*/
const fs = require("fs")
const path = require("path")

// constants
// eslint-disable-next-line no-undef
const DATA_DIR = path.join(process.cwd(), '.data')

/**
 * to create a directory with a file created from the data
 * @param {string} dir 
 * @param {string} file 
 * @param {any} data 
 * @returns {Promise<string>}
 */
async function create(dir, file, data) {
    // generating the directory path
    const dirpath = path.join(DATA_DIR, dir)
    // checking if the directory path exists
    if (!fs.existsSync(dirpath)) {
        fs.mkdirSync(dirpath)
    }
    // generating the file path
    const filepath = path.join(DATA_DIR, dir, `${file}.json`)
    // writing a promsie wrapper to handle the callbacks
    return new Promise((resolve, reject) => {
        // opening the file
        fs.open(filepath, 'wx', (err, fd) => {
            if (err) {
                return reject('File Already Exists!!')
            }
            // writint the contents to the file
            fs.writeFile(fd, JSON.stringify(data), (err) => {
                if (err) {
                    return reject('Error while writing the file.')
                }
                // closing the file
                fs.close(fd, (err) => {
                    if (err) {
                        return reject('Error While Closing the file.')
                    }
                    resolve(filepath)
                })
            })
        })
    })
}


/**
 * to read data from a file in directory
 * @param {string} dir 
 * @param {string} file 
 * @returns {Promise<any>}
 */
async function read(dir, file) {
    const filepath = path.join(DATA_DIR, dir, `${file}.json`)
    return new Promise((resolve, reject) => {
        fs.readFile(filepath, (err, data) => {
            if (err) {
                return reject('Error while reading file!!')
            }
            resolve(JSON.parse(data.toString('utf-8')))
        })
    })
}

/**
 * to update a contents a file based on file path
 * @param {string} dir 
 * @param {string} file 
 * @param {any} data 
 * @returns {Promise<string>}
 */
async function update(dir, file, data) {
    // generating the file path
    const filepath = path.join(DATA_DIR, dir, `${file}.json`)
    // writing a promsie wrapper to handle the callbacks
    return new Promise((resolve, reject) => {
        // opening the file
        fs.open(filepath, 'r+', (err, fd) => {
            if (err) {
                return reject('File Doesn\'t Exists!!')
            }
            // writint the contents to the file
            fs.writeFile(fd, JSON.stringify(data), (err) => {
                if (err) {
                    return reject('Error while writing the file.')
                }
                // closing the file
                fs.close(fd, (err) => {
                    if (err) {
                        return reject('Error While Closing the file.')
                    }
                    resolve(filepath)
                })
            })
        })
    })
}


/**
 * to delete a file from directory
 * @param {string} dir 
 * @param {string} file 
 * @returns {Promise<any>}
 */
async function deleteFile(dir, file) {
    const filepath = path.join(DATA_DIR, dir, `${file}.json`)
    return new Promise((resolve, reject) => {
        fs.unlink(filepath, (err) => {
            if (err) {
                return reject('Error while deleting file!!')
            }
            resolve('File Deleted Successfully.')
        })
    })
}


module.exports = {
    create,
    read,
    update,
    delete: deleteFile
}