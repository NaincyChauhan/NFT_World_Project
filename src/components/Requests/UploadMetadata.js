import axios from 'axios';
const config = require("../../config.json");

export const UploadMetadata = async (_metadata) => {
    try {        
        var request = {
            method: 'post',
            url: 'https://api.pinata.cloud/pinning/pinJSONToIPFS',
            headers: {
                pinata_api_key: config["pinata"]["pinata_api_key"],
                pinata_secret_api_key:  config["pinata"]["pinata_secret_api_key"],
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