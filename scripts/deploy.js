const fs = require('fs');
const path = require('path');

async function main() {
    console.log("Deploying...");
    const NFT = await ethers.getContractFactory("NFTWorld");

    // Read Config File
    const filePath = path.join(__dirname, '../src/config.json');
    const jsonData = fs.readFileSync(filePath, 'utf-8');
    const data = JSON.parse(jsonData);
    const { chainId } = await ethers.provider.getNetwork();
    const nft = await NFT.deploy();
    // await nft.deploy();

    data[chainId].NFT.address = nft.target;
    console.log("NftWrod Has Been Deployed : ", nft.target);
    console.log("Deployment Completed.");
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
