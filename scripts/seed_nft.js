const config = require("../src/config.json");

async function main() {
    const accounts = await ethers.getSigners();
    const account1 = accounts[0];
    const account2 = accounts[1];
    // GEt Network
    const { chainId} = await ethers.provider.getNetwork();
    const nftworld = await ethers.getContractAt("NFTWorld",config[chainId].NFT.address);
    console.log("nftworld address",config[chainId].NFT.address,chainId);
    console.log("contract is here",nftworld);

    const _metadata = "QmVHVYYgDhmKNkkcusyRoBfREnzM1DySouKv6PQWGMSotG";
    for (let index = 1; index < 5; index++) {
        const createCollection = await nftworld.connect(account1).createCollection(_metadata,"Collection "+index);
        const result = await createCollection.wait();    
        console.log("new NFT Created successfully",result, index)    
    }

    const _nft_metadata = "QmdNDhJK8zhv8fF97BDXYXwC5hbzfvHG9MY2xxqxRHM8M6";
    for(let index = 1; index < 5; index++){
        const createNFT = await nftworld.connect(account1).makeCollectionNFT(1,_nft_metadata,index,true,index);
        await createNFT.wait();    
    }

    // Buy NFT
    // const nft_id = "";
    // const buyNFT = await nftworld.connect(account)

}

main()

// QmPXc6mSEkHxX7xhNDzxDtZT5fmFo6cgwxPTKWLqh8nsHZ --> Collection Metadata has