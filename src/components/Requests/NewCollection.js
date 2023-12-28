import axios from 'axios';
const config = require("../../config.json");

const NewCollection = async (collection_id, owner_address, _data, metadata, token) => {
    const data = { ..._data };
    data['metadata'] = metadata;
    data['collection_id'] = collection_id;
    data['owner_address'] = owner_address;
    
    try {
        const formData = new FormData();
        for (const key in data) {
            formData.append(key, data[key]);
        }
        const response = await axios.post(`${config["APPLICATION_URL"]}/api/create/collection`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${token}`,
            },
        });
        if (parseInt(response.data.status) === 1) {
            return [1, response.data.message];
        } else {
            return [0, response.data.message];
        }
    } catch (error) {
        const msg = error.response?.data?.message;
        const errors = error.response?.data?.errors;
        let errorHTML = msg ? `${msg}<br>` : '';
        if (errors) {
            errorHTML += '<ul>';
            for (const key in errors) {
                if (errors.hasOwnProperty(key)) {
                    errorHTML += `<li>${errors[key]}</li>`;
                }
            }
            errorHTML += '</ul>';
        }
        return [2, errorHTML];
    }

}

export default NewCollection;