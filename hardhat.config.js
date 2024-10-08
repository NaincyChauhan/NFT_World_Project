require("@nomicfoundation/hardhat-toolbox");
// require("@nomiclabs/hardhat-ethers");
require("dotenv").config();
const privateKeys = process.env.PRIVATE_KEYS || "";

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
    solidity: "0.8.18",
    networks: {
        hardhat: {
            chainId: 31337,
        },
        // sepolia: {
        //     url: `https://eth-sepolia.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`,
        //     accounts: privateKeys.split(','),
        // }
    },
    paths: {
        artifacts: "./src/contract/artifacts",
    }
};
