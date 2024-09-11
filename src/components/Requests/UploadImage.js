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
                Authorization: `Bearer ${config["pinata"]["jwt_token"]}`,
                "Content-Type": "multipart/form-data",
            }
        })
        return resFile.data.IpfsHash;
    } catch (error) {
        console.log("ipfs uri upload error11: ", error)
        return 0;
    }
}

export default UploadImage;