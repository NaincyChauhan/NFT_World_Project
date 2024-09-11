import axios from 'axios';
const config = require("../../config.json");

export const UploadMetadata = async (_metadata) => {    
    try {        
        var request = {
            method: 'post',
            url: 'https://api.pinata.cloud/pinning/pinJSONToIPFS',
            headers: {
                Authorization: `Bearer ${config["pinata"]["jwt_token"]}`,
                "Content-Type": "application/json",
            },
            data: _metadata
        };    
        const res = await axios(request);
        return res.data.IpfsHash;
    } catch (error) {
        return 0;
    }

}