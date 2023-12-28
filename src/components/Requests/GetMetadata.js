import axios from 'axios';

const GetMetadata = async (ipfsHash) => {
    const request = {
        method: 'get',
        url: `https://ipfs.io/ipfs/${ipfsHash}`
    };

    const response = await axios(request);
    return response.data.data;
}

export default GetMetadata;