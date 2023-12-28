import axios from 'axios';
const config = require("../../config.json");

const UserCollectionData = async (signer) => {    
    try {
        const formData = new FormData();
        formData.append("address", signer);        
        const response = await axios.post(`${config["APPLICATION_URL"]}/api/get/collections/${signer}`, {
            headers: {
                'Content-Type': 'multipart/form-data',
                // Authorization: `Bearer ${token}`,
            },
        });
        if (parseInt(response.data.status) === 1) {
            return [1, response.data.data, response.data.message];
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

export default UserCollectionData;