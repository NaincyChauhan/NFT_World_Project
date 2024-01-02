const { expect } = require("chai");
// const { ethers } = require("hardhat");

describe('NFT PORFOLIO', () => {
    let manager, add1, add2, add3;
    let nft;

    const tokens = (n) => {
        return ethers.parseEther(n.toString());
    }

    const formatEther = (n) => {
        return ethers.formatEther(n)
    }

    beforeEach(async function () {
        [manager, add1, add2, add3] = await ethers.getSigners();
        const NFT = await ethers.getContractFactory("NFTWorld");
        nft = await NFT.deploy();
        // await nft.deployed();
    });

    describe("Deployment", function () {
        it("Should Return Correct Symbol and name of NFT", async function () {
            expect(await nft.name()).to.equal("NFTWorld");
            expect(await nft.symbol()).to.equal("NFTW");
        });

        it("Should compare corrent menager account and feePercent", async function () {
            expect(await nft.feePercent()).to.equal(2);
            expect(await nft.manager()).to.equal(manager.address);
        });
    });

    describe('NFT Minting', () => {
        let transcation,result;
        describe('Success', () => {
            beforeEach(async () => {
                transcation = await nft.connect(manager).createNFT(0, "Image URL", 1, false);
                result = await transcation.wait();
            });
            
            // it("Should Track The CreateNFT Event: ", async () => {
            //     result.logs.forEach(event => {
            //         if (event.transactionHash == result.hash) {
            //             console.log("Data",event.args[1],event.args[0]);
            //         }
            //     });
            // });

            it("Should Return New NFT Data", async () => {
                let NFTData = await nft.nfts(1);
                expect(NFTData[0]).to.equal(1);
                expect(Number(NFTData[1])).to.equal(0);
                expect(NFTData[2]).to.equal("Image URL");
                expect(NFTData[3]).to.equal(manager.address);
                expect(Number(NFTData[4])).to.equal(1);
                expect(NFTData[5]).to.equal(false);
            });
            
            // it("Should Return User NFTs && and Check User OwnerShip", async () => {
            //     transcation = await nft.connect(manager).createNFT(0, "Image URL 2 ", 1, false);
            //     result = await transcation.wait();
            //     const NFTs = await nft.getUserNFTs(manager.address);
            //     // console.log("Manager NFTs", NFTs, manager.address);
            //     for (let index = 0; index < NFTs.length; index++) {
            //         const nftId = NFTs[index];
            //         let _nft_ = await nft.nfts(nftId);
            //         expect(_nft_.creator).to.equal(manager.address);
            //         expect(await nft.ownerOf(nftId)).to.equal(manager.address);
            //     }
            // });
        });

        describe('Failure', () => {  
            it("Should Fail when Price is low", async () => {
                await expect(nft.connect(manager).createNFT(0,"Image URi2", 0,true))
                .to.be.revertedWith("Price Must be greater then 0")
            });
            it("Should Fail when give wrong media type", async () => {
                await expect(nft.connect(manager).createNFT(3,"Image URi2", 3,true))
                .to.be.revertedWith("Invalid Media Type")
            });
        });
    });

    describe('Create Collection', () => {  
        let create_collection, collection_result;
        let collection_id;
        beforeEach( async () => {
            transcation = await nft.connect(manager).createNFT(0,"Image URl 2", 2, false);
            result = await transcation.wait();
            create_collection = await nft.connect(manager).createCollection("HashUri","name");
            collection_result = await create_collection.wait();
        });
        
        describe('Success', async () => {  
            it("Should Track The NFTCollectionAdded Event: ", async () => {
                const collection_event = collection_result.logs[0] ;
                console.log("this is new collection data",collection_result);
                console.log("this is new collection data22",collection_result.logs[0]);
                if (collection_event.transactionHash == collection_result.hash) {
                    expect(collection_event.args[0]).to.equal(manager.address);
                    expect(collection_event.args[1]).to.equal(1);
                    collection_id = collection_event.args[1];
                }
            });

            it("Should Add New Item in Collection",  async () => {
                create_collection = await nft.connect(manager).addToCollection(Number(collection_id),1);
                collection_result = await create_collection.wait();
            })
            
        });
        
        describe('Failure', () => { 
            it("Should Fail When Pass Wrong NFTId", async () => {
                await expect(nft.connect(manager).addToCollection(1,4))
                .to.revertedWith("NFT with this ID does not exist");
            });

            it("Should fail when NFT added by wrong owner", async () => {
                await expect(nft.connect(add1).addToCollection(1,1))
                .to.revertedWith("Only owner can perform this action");
            });

            it("Should fail when pass wrong collection id", async () => {
                await expect(nft.connect(add1).addToCollection(2,1))
                .to.revertedWith("Collection does not exist");
            });
        });
    });

    describe('List NFT', () => {  
        let transcation,result,nftData;
        beforeEach( async () => {
            transcation = await nft.connect(manager).createNFT(0,"Image URI",1,false);
            result = await transcation.wait();            
        });

        describe('Success', () => {  
            it("Should List NFT for sale ", async () => {
                transcation = await nft.connect(manager).editNFTSale(1,true);
                result = await transcation.wait();
                nftData = await nft.nfts(1);
                expect(nftData[5]).to.equal(true);
            });

            it("Should Change The NFT Price ", async () => {
                transcation = await nft.connect(manager).editNFTPrice(1,4);
                result = await transcation.wait();
                nftData = await nft.nfts(1);
                expect(Number(nftData[4])).to.equal(4);
            });
        });

        describe('Failure', () => {  
            it("Should fail when pass worng NFT id", async () => {
                await expect(nft.connect(manager).editNFTSale(2,true))
                .to.revertedWith("NFT with this ID does not exist");
            });

            it("Should fail when edit wrong owner ", async () => {
                await expect(nft.connect(add1).editNFTPrice(1,2))
                .to.revertedWith("Caller does not own this NFT");
            });

            it("should fail when price is not greater then 0 ", async () => {
                await expect(nft.connect(manager).editNFTPrice(1,0))
                .to.revertedWith("Price must be greater then 0");
            });
        });
    });

    describe('Buy NFT', () => {  
        let transcation,result,nftData;
        let beforBuyNFTManager, afterSellNFTManager, beforeBuyNFTAdd1, afterBuyNFTAdd1;
        beforeEach(async() => {
            transcation = await nft.connect(manager).createNFT(0,"Image URi",2,true);
            result = await transcation.wait();

            beforBuyNFTManager = await ethers.provider.getBalance(manager.address);
            beforeBuyNFTAdd1 = await ethers.provider.getBalance(add1.address);

            transcation = await nft.connect(add1).buyNFT(1,{value:tokens(2)});
            result = await transcation.wait();
            nftData = await nft.nfts(1);

            afterBuyNFTAdd1 = await ethers.provider.getBalance(add1.address);
            afterSellNFTManager = await ethers.provider.getBalance(manager.address);
        });

        describe('Success', () => { 
            it("Should change the ownership of NFT ", async () => {
                expect(await nft.ownerOf(1)).to.equal(add1.address);
            });

            it("Should Update NFT Balance", async () => {
                expect(await nft.balanceOf(manager.address)).to.equal(0);
                expect(await nft.balanceOf(add1.address)).to.equal(1);
            });

            it("Should Calculate right balance", async () => {
                let nft_price = Number(nftData[4]);
                let marketPlaceFee = (nft_price * 2)/100;
                expect(parseInt(formatEther(afterSellNFTManager))).to.equal(parseInt(Number(formatEther(beforBuyNFTManager)) + Number(formatEther(tokens(nft_price-marketPlaceFee)))));
                expect(parseInt(formatEther(afterBuyNFTAdd1))).to.equal(parseInt(formatEther(beforeBuyNFTAdd1)- formatEther(tokens(2))));
            });

            it("Should set NFT sale false ", async () => {
                expect(nftData[5]).to.equal(false);
            });

            it("Should Track The NFTSold Event ", async () => {
                const buyEvent = result.logs;
                buyEvent.forEach(event => {
                    if(event.fragment.name === "NFTSold"){
                        const eventData = event.args;
                        expect(eventData[0]).to.equal(1);
                        expect(eventData[1]).to.equal(manager.address);
                        expect(eventData[2]).to.equal(add1.address);
                        expect(Number(eventData[3])).to.equal(2);
                    }
                });
            });
        });

        describe('Failure', () => {  
            it("Should return because nft not on sale ", async () => {
                await expect(nft.connect(add2).buyNFT(1))
                .to.revertedWith("NFT is not listed for sale");
            });

            it("Should return because owner can not buy own nft", async () => {
                transcation = await nft.connect(add1).editNFTSale(1,true);
                result = await transcation.wait();
                await expect(nft.connect(add1).buyNFT(1))
                .to.revertedWith("Caller already owns this NFT");
            });

            it("Should return when nft is not exists", async () => {
                await expect(nft.connect(manager).buyNFT(3))
                .to.revertedWith("NFT with this ID does not exist");
            });

            it("Should return when price is less then nft price", async () => {
                const new_nft = await nft.connect(add2).createNFT(0, "Image URi", 3, false);
                const new_nft_result = await new_nft.wait();
                let new_nft_id;

                const nftEvent =  new_nft_result.logs;
                nftEvent.forEach(event => {
                    if(event.fragment.name === "NFTCreated"){
                        const eventData = event.args;
                        new_nft_id = eventData[0];
                    }
                });

                transcation = await nft.connect(add2).editNFTSale(new_nft_id,true);
                result = await transcation.wait();
                await expect(nft.connect(add1).buyNFT(new_nft_id,{value:tokens(1)}))
                .to.revertedWith("Insufficient funds to purchase NFT");

                transcation = await nft.connect(add1).editNFTSale(1,true);
                result = await transcation.wait();
                await expect(nft.connect(manager).buyNFT(1,{value:tokens(1)}))
                .to.revertedWith("Insufficient funds to purchase NFT");
            });
        });
    });
});