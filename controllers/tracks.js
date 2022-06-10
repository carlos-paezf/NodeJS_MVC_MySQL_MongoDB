/**
 * Get all items
 * @param {*} req 
 * @param {*} res 
 */
const getItems = (req, res) => {
    const data = ['Hola', 'mundo', '2']
    return res.send({ data })
}

/**
 * Get an Item by ID
 * @param {*} req 
 * @param {*} res 
 */
const getItem = (req, res) => {

}

/**
 * Create a new Item
 * @param {*} req 
 * @param {*} res 
 */
const createItem = (req, res) => {

}

/**
 * Update an Item by ID
 * @param {*} req 
 * @param {*} res 
 */
const updateItem = (req, res) => {

}

/**
 * Delete an Item by ID
 * @param {*} req 
 * @param {*} res 
 */
const deleteItem = (req, res) => {

}

module.exports = {
    getItems,
    getItem,
    createItem,
    updateItem,
    deleteItem,
}