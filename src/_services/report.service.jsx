import Axios from './caller.service'
import FileSaver from 'file-saver';

/**
 * Récupératoin de la liste des rapports
 * @returns {Promise}
 */
let getAllReports = () => {
    return Axios.get('/api/reports')
}

/**
 * Récupération d'un rapport
 * @param {number} uid 
 * @returns {Promise}
 */
let getReport = (uid) => {
    return Axios.get('/api/reports/'+uid)
}

/**
 * Ajout d'un rapport
 * @param {number} report
 * @returns {Promise}
 */
let addReport = (report) => {
    return Axios.post('/api/reports', report)
}

/**
 * Mise à jour d'un rapport
 * @param {number} report 
 * @returns {Promise}
 */
let updateReport = (report) => {
    console.log('updateReport', report)
    return Axios.put('/api/reports/'+report.id, report)
}

/**
 * Suppression d'un rapport
 * @param {number} uid 
 * @returns {Promise}
 */
let deleteReport = (uid) => {
    return Axios.delete('/api/reports/'+uid)
}
/**
 * Downloading a report
 * @param {string} docUrl 
 * @param {string} docOriginalname 
 * @returns {Promise}
 */
let downloadReport = (docUrl, docOriginalname) => {
    return  Axios.get(docUrl, { responseType: 'blob' }).then((res) => {
        FileSaver.saveAs(res.data, docOriginalname);
      }).catch((err) => {console.error('can not download file', err)})
}

// Décaraltion des services pour import
export const reportService = {
    getAllReports, getReport, addReport, updateReport, deleteReport, downloadReport
    
}