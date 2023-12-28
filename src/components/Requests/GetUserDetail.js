import axios from 'axios';
const config = require("../../config.json");

const getUserDetail = async (address) => {
    const request = {
        method: 'get',
        url: `${config["APPLICATION_URL"]}/api/user/${address}`
    };

    try {
        const response = await axios(request);
        if (response.data.status === 1) {            
            return {status : 1, data:response.data.user};        
        }else{
            return {status:0, message:response.message};
        }
    } catch (error) {
        
    }
}

export default getUserDetail;