import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { 
    checkTokenExpiration, 
    loadProvider, 
    loadAccount,
    loadNetwork,
    loadMarketplace,
    subscribeToEvents,
    AllNFTs,
    allCollection,
    userCollections,
} from './redux/intercations';
import AppRouter from './pages/Router/index.js';
// import { getUserNFTs } from './redux/selectors.js';
const config = require("./config.json");

function App() {
    const dispatch = useDispatch();
    const loadBlockchainData = async () => {
        try {
            
            checkTokenExpiration();
            // Connect To Metamask
            const provider = loadProvider(dispatch);
            // Reload page when network changes
            window.ethereum.on("chainChanged", (chainId) => {
                // window.location.reload();
                console.log("Deubbing34343434");
            });
    
            // Fetch Current Metamask Account
            window.ethereum.on("accountsChanged", async () => {
                const user = await loadAccount(provider, dispatch);
                if (user === true) {
                    window.location.reload();
                }
            });
    
            // Fetch Current Network ChainId
            const chainId = await loadNetwork(provider, dispatch);
            if (config[chainId]) {
                const nftWorld = await loadMarketplace(config[chainId].NFT.address, provider, dispatch);
                subscribeToEvents(nftWorld, dispatch);
                allCollection(dispatch,nftWorld);
                userCollections(nftWorld,provider,dispatch )
                AllNFTs(dispatch, nftWorld, 1, 12)
            } else {
                console.log("Wrong NETWORK, plase select eth mainnet");
            }
        } catch (error) {
            console.log("RPC URL not found.");
        }

    }

    useEffect(() => {
        loadBlockchainData();
    }, []);

    return <AppRouter />
}

export default App;
