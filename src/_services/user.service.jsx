import Axios from './caller.service'

/**
 * Récupératoin de la liste des utilisateurs
 * @returns {Promise}
 */
let getAllUsers = () => {
    return Axios.get('/api/users')
}

/**
 * Récupération d'un utilisateur
 * @param {number} uid 
 * @returns {Promise}
 */
let getUser = (uid) => {
    return Axios.get('/api/users/'+uid)
}

/**
 * Ajout d'un utilisateur
 * @param {number} user 
 * @returns {Promise}
 */
let addUser = (user) => {
    return Axios.post('/api/users', user)
}

/**
 * Mise à jour d'un utilisateur
 * @param {number} user 
 * @returns {Promise}
 */
let updateUser = (user) => {
    console.log('updateUser', user)
    return Axios.put('/api/users/'+user.id, user)
}

/**
 * Suppression d'un utilsateur
 * @param {number} uid 
 * @returns {Promise}
 */
let deleteUser = (uid) => {
    return Axios.delete('/api/users/'+uid)
}

// Décaraltion des esrvices pour import
export const userService = {
    getAllUsers, getUser, addUser, updateUser, deleteUser
}