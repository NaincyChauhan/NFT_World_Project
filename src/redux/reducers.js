const initialState = {
    connection: localStorage.getItem('connection') || null,
    account: localStorage.getItem('account') || null,
    balance: localStorage.getItem('balance') || null,
    chainId: localStorage.getItem('chainId') || null,
    token: localStorage.getItem('token') || null,
    user: JSON.parse(localStorage.getItem('user')) || null,
    connecting: false,
};
export const provider = (state = initialState, action) => {
    switch (action.type) {
        case "PROVIDER_LOADED":
            localStorage.setItem('connection', action.connection);
            return {
                ...state,
                connection: action.connection,
            }
        case "ACCOUNT_LOADED":
            localStorage.setItem('account', action.account);
            return {
                ...state,
                account: action.account,
                connecting: action.connecting
            }
        case "BALANCE_LOADED":
            localStorage.setItem('balance', action.balance);
            return {
                ...state,
                balance: action.balance
            }
        case "NETWORK_LOADED":
            localStorage.setItem('chainId', action.chainId);
            return {
                ...state,
                chainId: action.chainId
            }
        case "AUTH_TOKEN_LOADED":
            const expirationTime = Date.now() + 24 * 60 * 60 * 1000;
            localStorage.setItem('auth_token_expiration', expirationTime);
            localStorage.setItem('token', action.token);
            return {
                ...state,
                token: action.token,
            }
        case "AUTH_DATA_LOADED":
            localStorage.setItem('user', action.user);
            return {
                ...state,
                user: JSON.parse(action.user),
            }
        default:
            return state;
    }
}

const DefaultState = {
    loaded: false,
    nftWorld: {},
    transaction: {
        isSuccessful: false
    },
    events: [],
    userCollections: [],
    allCollections : [],
    nftData:[],
    userNFTS:[],
    loading:false,
    pageNumber:1
}
export const NFTWorld = (state = DefaultState, action) => {
    switch (action.type) {
        case "NFTWORLD_LOADED":
            return {
                ...state,
                nftWorld: action.nftWorld,
            }
        case "NFT_CREATE_REQUEST":
            return {
                ...state,
                transaction: {
                    transactionType: "NFT Created",
                    isPending: true,
                    isSuccessful: false
                },
                mintingInProgress: true,
            }
        case "NFT_CREATED_SUCCESS":
            return {
                ...state,
                transaction: {
                    transactionType: "NFT Created",
                    isPending: false,
                    isSuccessful: true
                },
                mintingInProgress: false,
                events: [action.event, ...state.events]
            }
        case "NFT_CREATED_FAIL":
            return {
                ...state,
                transaction: {
                    transactionType: "NFT Created",
                    isPending: false,
                    isSuccessful: false,
                    isError: true
                },
            }
        case "NEW_COLLECTION_REQUEST":
            return {
                ...state,
                transaction: {
                    transactionType: "Collection Created",
                    isPending: true,
                    isSuccessful: false,
                },
            }
        case "NEW_COLLECTION_SUCCESS":
            return {
                ...state,
                transaction: {
                    transactionType: "Collection Created",
                    isPending: false,
                    isSuccessful: true,
                },
                events: [action.event, ...state.events],
            }
        case "LOAD_USER_COLLECTIONS":
            return {
                ...state,
                userCollections:action.collections,
            }
        case "NEW_COLLECTION_DATA":
            return {
                ...state,
                // allCollections:[...state.allCollections, action.collectionData],
            }
        case "NEW_COLLECTION_FAIL":
            return {
                ...state,
                transaction: {
                    transactionType: "Collection Created",
                    isPending: false,
                    isSuccessful: false,
                    isError: true,
                },
            }
        case "NFT_DATA":
            return {
                ...state,
                nftData: action.nftData
            }
        case "UPDATE_NFT_DATA":
            console.log("this is the reducer data ishere", action.nftData, "and page number",action.pageNumber);
            return {
                ...state,
                nftData: [...state.nftData, ...action.nftData],
                pageNumber: action.pageNumber
            }
        case "UPDATE_LOADING":
            return {
                ...state,
                loading: action.loading
            }
        case "USER_NFT_DATA":
            return {
                ...state,
                userNFTS: action.nftData
            }
        case "LOAD_ALL_COLLECTIONS":
            return {
                ...state,
                allCollections:action.collectionData
            }
        default:
            return state;
    }
}