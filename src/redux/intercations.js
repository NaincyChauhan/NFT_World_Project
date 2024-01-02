import { ethers } from 'ethers';
import NFTWorld from '../contract/artifacts/contracts/NFTWorld.sol/NFTWorld.json';
import Login from '../components/Requests/Login';
import GetMetadata from '../components/Requests/GetMetadata';
import getUserDetail from '../components/Requests/GetUserDetail';

// // actions/reducer1Actions.js
export const incrementCounter1 = (dispatch) => {
    dispatch({ type: 'INCREMENT' });
};

export const decrementCounter1 = (dispatch) => {
    dispatch({ type: 'DECREMENT' });
};


// *********************************************************************
export const checkTokenExpiration = () => {
    const expirationTime = localStorage.getItem('auth_token_expiration');
    if (!expirationTime) return null;

    const currentTime = Date.now();
    if (currentTime >= expirationTime) {
        // Token has expired, clear it from local storage
        // localStorage.removeItem('connection');
        localStorage.removeItem('account');
        localStorage.removeItem('balance');
        // localStorage.removeItem('chainId');
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        localStorage.removeItem('auth_token_expiration');
        return null;
    }
    return localStorage.getItem('token');
};

// Load Provider
export const loadProvider = (dispatch) => {
    const connection = new ethers.BrowserProvider(window.ethereum);
    dispatch({ type: "PROVIDER_LOADED", connection });
    return connection;
}

// Load Account Detail
export const loadAccount = async (provider, dispatch) => {
    try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        const account = ethers.getAddress(accounts[0]);
        dispatch({ type: "ACCOUNT_LOADED", account, "connecting": false });
        let balance = await provider.getBalance(account);
        balance = ethers.formatEther(balance);
        dispatch({ type: "BALANCE_LOADED", balance });
        balance && Login(account, dispatch);
        return balance;
    } catch (error) {
        if (error.code === -32002) {
            dispatch({ type: "ACCOUNT_LOADED", "account": "", "connecting": true });
            console.warn("Another request is processing. Please wait.");
            // You can retry the request after a short delay or inform the user accordingly.
        } else {
            console.error("Error requesting accounts:", error);
            // Handle other error cases
        }
    }
}

export const removeToken = (dispatch) => {
    localStorage.removeItem('balance');
    // localStorage.removeItem('chainId');
    localStorage.removeItem('token');
    localStorage.removeItem('account');
    localStorage.removeItem('user');
    localStorage.removeItem('auth_token_expiration');
    dispatch({ type: "AUTH_TOKEN_LOADED", "token": "", "user": "" });
}

// Load NetWork Detail
export const loadNetwork = async (provider, dispatch) => {
    const { chainId } = await provider.getNetwork();
    dispatch({ type: "NETWORK_LOADED", chainId: Number(chainId) });
    return chainId;
}

// Load NFTWorld Contract Detail
export const loadMarketplace = async (address, provider, dispatch) => {
    let nftWorld;
    nftWorld = new ethers.Contract(address, NFTWorld.abi, provider);
    dispatch({ type: "NFTWORLD_LOADED", nftWorld });
    return nftWorld;
}

// SubscribeAllEvents
export const subscribeToEvents = (nftWorld, dispatch) => {
    nftWorld.on("NewCollectionCreated", (creator, collectionId, event) => {
        console.log("Create Collection Event run successfully", event);
        // dispatch({ type: "NEW_COLLECTION_SUCCESS", event });
    });

    nftWorld.on(nftWorld.filters.NewCollectionCreated, (creator, collectionId, event) => {
        console.log("There should be a error that event not found");
    })

    nftWorld.on("NFTCreated", (id, creator, event) => {
        console.log("Create nft Event run successfully", event);
        // dispatch({ type: "NEW_COLLECTION_SUCCESS", event });
    });
}

export const createcollection = async (metadata, name, provider, dispatch, nftworld) => {
    dispatch({ type: "NEW_COLLECTION_REQUEST" });
    try {
        const signer = await provider.getSigner();
        const transcation = await nftworld.connect(signer).createCollection(metadata, name);
        const collection_result = await transcation.wait();
        const _event = collection_result.logs[0];
        if (_event.args[0] && _event.args[1]) {
            try {
                dispatch({ type: "NEW_COLLECTION_SUCCESS", event: _event, collection_id: Number(_event.args[1]) });
                return { "status": 1, "collectionId": _event.args[1], "creator": _event.args[0] };
            } catch (error) {
                return { "status": 0, "message": error };
            }
        }
        return { "status": 0, "message": "Something Went Wrong" };
    } catch (error) {
        dispatch({ type: "NEW_COLLECTION_FAIL" });
        return { "status": 0, "message": error };
    }
}

export const getCollection = async (provider, dispatch, nftworld) => {
    try {
        const signer = await provider.getSigner();
        const transcation = await nftworld.getUserCollection(signer);
        const convertedArray = transcation.map(item => Number(item));
        dispatch({ type: "COLLECTIONS_LOADED", ids: convertedArray });

        // Get All Collections
        const userCollectionsData = [];
        for (const collectionId of convertedArray) {
            const collectionData = await nftworld.getCollection(collectionId);
            const collectionObject = {
                id: Number(collectionData[0]),
                owner: collectionData[1],
                ids: collectionData[2].map(id => Number(id)),
                metadata: collectionData[3],
                name: collectionData[4]
            };
            userCollectionsData.push(collectionObject);
        }
        dispatch({ type: "UPDATED_COLLECTION_DATA", collections: userCollectionsData });
    } catch (error) {
        console.error('Error:', error);
    }
}

export const updateCollectionData = async (dispatch, collectionId, nftworld) => {
    const collectionData = await nftworld.userCollection(collectionId);
    const metadata = await GetMetadata(collectionData[3]);
    const collectionObject = {
        id: Number(collectionData[0]),
        owner: collectionData[1],
        ids: collectionData[2],
        name: collectionData[4],
        data: metadata,
    };
    dispatch({ type: "NEW_COLLECTION_DATA", data: collectionObject });
}

export const createNFT = async (metadata, provider, dispatch, nftworld, type, price, forSale, collection_id) => {
    dispatch({ type: "NFT_CREATE_REQUEST" })
    try {
        const signer = await provider.getSigner();
        const transcation = await nftworld.connect(signer).makeCollectionNFT(
            Number(type), metadata, price, forSale, collection_id
        );
        const result = await transcation.wait();
        const _event = result.logs[0];
        if (_event.args.length > 0) {
            try {
                dispatch({ type: "NFT_CREATED_SUCCESS", event: _event });
                return { "status": 1 };
            } catch (error) {
                return { "status": 0, "message": error };
            }
        }
        return { "status": 0, "message": "Something Went Wrong" };
    } catch (error) {
        if (error.message.indexOf("revert") >= 0) {
            return { "status": 0, "error": error.reason };
        } else {
            console.log("Error:", error);
            return { "status": 0, "error": "An error occurred" };
        }
    }
}

export const NFTCreateSingle = async (metadata, provider, dispatch, nftworld, type, price, forSale) => {
    dispatch({ type: "NFT_CREATE_REQUEST" })
    try {
        const signer = await provider.getSigner();
        const transcation = await nftworld.connect(signer).createNFT(
            Number(type), metadata, price, forSale
        );
        const result = await transcation.wait();
        const _event = result.logs[0];
        if (_event.args.length > 0) {
            try {
                dispatch({ type: "NFT_CREATED_SUCCESS", event: _event });
                return { "status": 1 };
            } catch (error) {
                return { "status": 0, "message": error };
            }
        }
        return { "status": 0, "message": "Something Went Wrong" };
    } catch (error) {
        if (error.message.indexOf("revert") >= 0) {
            const errorMessage = error.data.message;
            console.log("Revert error:", errorMessage, error.data);
            return { "status": 0, "error": "errorMessage,error.datadfads" };
        } else {
            console.log("Error:", error);
            return { "status": 0, "error": "An error occurred" };
        }
    }
}

export const AllNFTs = async (dispatch, nftworld) => {
    dispatch({ type: "UPDATE_LOADING", loading: true });
    const itemCount = await nftworld.tokenCount();
    let items = [];
    for (let i = 1; i <= itemCount; i++) {
        const item = await nftworld.nfts(i);
        const metadata = await GetMetadata(item.mediaURI);

        // Add Item IN Items List
        items.push({
            itemId: Number(item.id),
            MediaType: Number(item.mediaType),
            creator: item.creator,
            owner: item.owner,
            name: metadata.info.name,
            forSale: item.forSale,
            logo: "https://ipfs.io/ipfs/" + metadata.info.logo,
            descripation: metadata.info.descripation,
            price: Number(item.price),
            data: metadata.keys
        })
    }
    dispatch({ type: "NFT_DATA", nftData: items })
    dispatch({ type: "UPDATE_LOADING", loading: false });
}

export const allCollection = async (dispatch, nftworld) => {
    const collectionCount = await nftworld.collectionCount();
    let items = [];
    for (let i = 1; i <= collectionCount; i++) {
        const item = await nftworld.collections(i);
        const metadata = await GetMetadata(item.metadataURI);

        // Add Item IN Items List
        items.push({
            id: Number(item.id),
            owner: item.owner,
            ids: item.nftIds,
            name: item.name,
            data: metadata,
        })
    }
    dispatch({ type: "LOAD_ALL_COLLECTIONS", collectionData: items })
}

export const getCollectionByNFTId = async (nftId, nftworld) => {
    const collection = await nftworld.getCollectionByNFTId(Number(nftId));
    const metadata = await GetMetadata(collection[3]);
    return {
        id: collection[0],
        owner: collection[1],
        ids: collection[2],
        name: collection[4],
        data: metadata,
    };
}

export const getNFTById = async (nftId, nftworld) => {
    const nft_ = await nftworld.nfts(nftId);
    const owner_ = await nftworld.ownerOf(nftId)
    const metadata = await GetMetadata(nft_[2])
    const item = {};
    item['itemId'] = Number(nft_.id);
    item['MediaType'] = Number(nft_.mediaType);
    item['creator'] = nft_.creator;
    item['name'] = metadata.info.name;
    item['logo'] = "https://ipfs.io/ipfs/" + metadata.info.logo;
    item['descripation'] = metadata.info.descripation;
    item['price'] = Number(nft_.price)
    item['forSale'] = nft_.forSale
    item['data'] = metadata.keys;
    item['owner'] = owner_;
    item['ownerdetail'] = {};
    item['creatordetail'] = {};
    const response = await getUserDetail(nft_[3]);
    if (response.status === 1) {
        item['creatordetail'] = response.data;
    }
    const response1 = await getUserDetail(owner_);
    if (response1.status === 1) {
        item['ownerdetail'] = response1.data;
    }
    return item;
}

const tokens = (n) => {
    return ethers.parseEther(n.toString());
}

export const buyNow = async (nftId,value, nftworld,provider) => {
    try {        
        const signer = await provider.getSigner();
        const transaction = await nftworld.connect(signer).buyNFT(nftId,{value:tokens(value)});
        await transaction.wait();
        return { "status": 1};
    } catch (error) {
        if (error.message.indexOf("revert") >= 0) {
            return { "status": 0, "error": error.reason };
        } else {
            console.log("Error:", error);
            return { "status": 0, "error": "An error occurred" };
        }
    }
}