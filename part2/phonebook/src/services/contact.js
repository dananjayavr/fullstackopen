import axios from 'axios'

const baseUrl = '/api/persons'

const create = (newObject) => {
    const request = axios.post(baseUrl, newObject)
    return request.then(response => response.data)
}

const deleteContact = (id) => {
    const request = axios.delete(`${baseUrl}/${id}`)
    return request.then(response => response.data)
}

const updateNumber = (id, updatedObject) => {
    const request = axios.put(`${baseUrl}/${id}`,updatedObject)
    return request.then(response => response.data)
}

export default { create, deleteContact, updateNumber }