import Axios from './caller.service'

/**
 * Récupératoin de la liste des utilisateurs
 * @returns {Promise}
 */
let getAllResources = () => {
    return Axios.get('/api/resources')
}

/**
 * Récupération d'un utilisateur
 * @param {number} uid 
 * @returns {Promise}
 */
let getResource = (uid) => {
    return Axios.get('/api/resources/'+uid)
}

/**
 * Ajout d'un utilisateur
 * @param {number} resource 
 * @returns {Promise}
 */
let addResource = (resource) => {
    return Axios.post('/api/resources', resource)
}

/**
 * Mise à jour d'un utilisateur
 * @param {number} resource 
 * @returns {Promise}
 */
let updateResource = (resource) => {
    console.log('updateResource', resource)
    return Axios.put('/api/resources/'+resource.id, resource)
}

/**
 * Suppression d'un utilsateur
 * @param {number} uid 
 * @returns {Promise}
 */
let deleteResource = (uid) => {
    return Axios.delete('/api/resources/'+uid)
}

// Décaraltion des esrvices pour import
export const resourceService = {
    getAllResources, getResource, addResource, updateResource, deleteResource
    
}