import axios from 'axios'

const baseUrl = '/api/persons'

const createEntry = person => {
    const request = axios.post(baseUrl, person);
    console.log(request);
    return request.then(response => response.data);
}

const getAll = () => {
    const request = axios.get(baseUrl);
    return request.then(response => response.data);
}

const deleteEntry = (id) => {
    const deleteUrl = baseUrl + `/${id}`;
    console.log(deleteUrl);

    const request = axios.delete(deleteUrl);
    return request.then(response => response.data);
}

const updateEntry = (id, newValue) => {
    const putUrl = baseUrl + `/${id}`;
    const request = axios.put(putUrl, newValue);
    console.log(request, putUrl);
    
    return request.then(response => {
        console.log("Response.data", response.data);
        return response.data;
    });
}

export default { createEntry, getAll, deleteEntry, updateEntry } 