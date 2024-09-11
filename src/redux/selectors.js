import { get } from "lodash";
import { createSelector } from "reselect";
import getUserDetail from "../components/Requests/GetUserDetail";

const account = state => get(state, "provider.account");
const userCollectionsIds = state => get(state, "NFTWorld.collections.ids", []);
const userCollections = state => get(state, "NFTWorld.collections.collections", []);
const collectionData = state => get(state, "NFTWorld.allCollections", []);
const nftData = state => get(state, "NFTWorld.nftData", []);


export const getUserCollection = state => {
    const ids = userCollectionsIds(state);
    const collections = userCollections(state);
    const filteredCollections = collections.filter(collection => ids.includes(collection.collection_id));
    console.log(filteredCollections);
}


export const NftByItemId = (itemId) => (state) => {
    const nftData_ = nftData(state);
    const item = nftData_.find(async (item) => {
        if (Number(item.itemId) === Number(itemId)) {
            const response = await getUserDetail(item.seller);
            if (response.status === 1) {
                item['sellerdetail'] = response.data;
            }
            return true; // Return true to include the item in the result
        }
    });
    return item;
}

export const userNFTSelector = createSelector([account, nftData],
    (account_, nftData_) => {
        const userNFTs = nftData_.filter(
            item => item.owner === account_ || item.creator === account_
        );
        const result = {
            owned: userNFTs.filter(item => item.owner === account_),
            created: userNFTs.filter(item => item.creator === account_),
            onSale: userNFTs.filter(item => item.forSale === true),
        };
        return result;
    }
);

export const userCollectionSelector = createSelector([account, collectionData],
    (account_, collectionData_) => {
        const userCollections = collectionData_.filter(
            item => item.owner === account_
        );
        return userCollections;
    }
);

export const filterNFTs = (nfts_data, buyNow, category) => {
    if (buyNow) {
        nfts_data = nfts_data.filter(
            item => item.forSale === true
        );
    }

    if (category > 0 && category < 4) {
        console.log("category",category);
        nfts_data = nfts_data.filter(
            item => item.MediaType === Number(category)
        )
    }

    return nfts_data;
};