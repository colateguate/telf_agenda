import axios from 'axios'

const baseUrl = 'http://localhost:3001/api/persons'

const getAll = () => {
    const response = axios
        .get(baseUrl)
        .then(response => response.data)
        .catch(error => console.log(error))
    return response
}

const create = (newObject) => {
    const response = axios
        .post(baseUrl, newObject)
        .then(response => response.data)
    return response
}

const update = (id, newObject) => {
    const response = axios
        .put(`${baseUrl}/${id}`, newObject)
        .then(response => response.data)
        .catch(error => {
            console.log(error)
            
            return Promise.reject(error) 
        })
    return response
}

const remove = (id) => {
    const response = axios
        .delete(`${baseUrl}/${id}`)
        .then(response => response.data)
    return response
}

export default { getAll, create, update, remove }