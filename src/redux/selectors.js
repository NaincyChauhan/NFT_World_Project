import { get } from "lodash";
import getUserDetail from "../components/Requests/GetUserDetail";

const account = state => get(state, "provider.account");
const events = state => get(state, "NFTWorld.events");
const userCollectionsIds = state => get(state, "NFTWorld.collections.ids", []);
const userCollections = state => get(state, "NFTWorld.collections.collections", []);


export const getUserCollection = state => {
    const ids = userCollectionsIds(state);
    const collections = userCollections(state);
    const filteredCollections = collections.filter(collection => ids.includes(collection.collection_id));
    console.log(filteredCollections);
}


const nftData = state => get(state,"NFTWorld.nftData", []);
export const NftByItemId =  (itemId) => (state) => {
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