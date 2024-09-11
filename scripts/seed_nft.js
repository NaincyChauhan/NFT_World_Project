const config = require("../src/config.json");

async function main() {
    const accounts = await ethers.getSigners();
    const account1 = accounts[0];
    const account2 = accounts[1];
    // GEt Network
    const { chainId} = await ethers.provider.getNetwork();
    const nftworld = await ethers.getContractAt("NFTWorld",config[chainId].NFT.address);

    const _metadata = "QmVHVYYgDhmKNkkcusyRoBfREnzM1DySouKv6PQWGMSotG";
    for (let index = 1; index < 30; index++) {
        const createCollection = await nftworld.connect(account1).createCollection(_metadata,"Collection "+index);
        await createCollection.wait();    
    }

    const _nft_metadata = "QmdNDhJK8zhv8fF97BDXYXwC5hbzfvHG9MY2xxqxRHM8M6";
    for(let index = 1; index < 31; index++){
        let mediaType = 1;
        if (index > 10) {
            mediaType = 2;
        }
        if (index > 20) {
            mediaType = 3;
        }
        console.log("this is the mediaType of the data", mediaType);
        const createNFT = await nftworld.connect(account1).makeCollectionNFT(mediaType,_nft_metadata,index,true,1);
        await createNFT.wait();    
    }
}

main()

// QmPXc6mSEkHxX7xhNDzxDtZT5fmFo6cgwxPTKWLqh8nsHZ --> Collection Metadata has