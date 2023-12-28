import axios from 'axios';
const config = require("../../config.json");

const UploadImage = async (_name,_desc,image,_price="0") => {
    try {
        const formData = new FormData();
        formData.append('file', image);
        const metadata = JSON.stringify({name: _name, desc: _desc,price:_price});
        formData.append('pinataMetadata', metadata);

        const resFile = await axios({
            method: "post",
            url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
            data: formData,
            maxContentLength: 'Infinity',
            headers: {
                pinata_api_key: config["pinata"]["pinata_api_key"],
                pinata_secret_api_key:  config["pinata"]["pinata_secret_api_key"],
                "Content-Type": "multipart/form-data",
            }
        })
        return resFile.data.IpfsHash;
    } catch (error) {
        console.log("ipfs uri upload error11: ", error,config["pinata"]["pinata_api_key"],config["pinata"]["pinata_secret_api_key"])
        return 0;
    }
}

export default UploadImage;