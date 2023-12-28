import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { 
    checkTokenExpiration, 
    loadProvider, 
    loadAccount,
    loadNetwork,
    loadMarketplace,
    subscribeToEvents,
    getCollection,
    LoadUserNFT,
    AllNFTs,
    allCollection
} from './redux/intercations';
import AppRouter from './pages/Router/index.js';
const config = require("./config.json");

function App() {
    const dispatch = useDispatch();
    const loadBlockchainData = async () => {
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
            await loadAccount(provider, dispatch);
            window.location.reload();
        });

        // Fetch Current Network ChainId
        const chainId = await loadNetwork(provider, dispatch);
        if (config[chainId]) {
            const nftWorld = await loadMarketplace(config[chainId].NFT.address, provider, dispatch);
            subscribeToEvents(nftWorld, dispatch);
            getCollection(provider, dispatch, nftWorld)
            allCollection(dispatch,nftWorld);
            LoadUserNFT(provider, dispatch, nftWorld)
            AllNFTs(dispatch, nftWorld)
        } else {
            console.log("Wrong NETWORK, plase select eth mainnet");
        }

    }

    useEffect(() => {
        loadBlockchainData();
    }, []);

    return <AppRouter />
}

export default App;
