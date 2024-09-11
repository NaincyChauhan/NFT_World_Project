import axios from 'axios';
const config = require("../../config.json");

const GetMetadata = async (ipfsHash) => {
    const request = {
        method: 'get',
        url: `https://${config["pinata"]["gateway"]}/ipfs/${ipfsHash}?pinataGatewayToken=${config["pinata"]["gateway_key"]}`
    };

    const response = await axios(request);
    return response.data.data;
}

export default GetMetadata;