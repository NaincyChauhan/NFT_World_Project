import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Home from '../Home';
import EditProfile from '../User/EditProfile';
import Wallet from '../Wallet';
import Add from '../Collection/Add';
import Profile from '../User/Profile';
import Create from '../NFT';
import Details from '../NFT/Details';
import CollectionDetail from '../Collection/CollectionDetail';
import UserProfile from '../User/UserProfile';
import Explore from '../NFT/Explore';
import CollectionExplore from '../Collection/CollectionExplore';
const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route exact path="/" element={<Home />} />
                <Route exact path="/profile" element={<Profile />} />
                <Route exact path="/user/:address" element={<UserProfile />} />
                <Route exact path="/edit-profile" element={<EditProfile />} />
                <Route exact path="/wallet" element={<Wallet />} />
                <Route exact path="/createcollection" element={<Add />} />
                <Route exact path="/create" element={<Create />} />
                <Route exact path='/explore' element={<Explore />} />
                <Route exact path='/collections' element={<CollectionExplore />} />
                <Route exact path='/nft/:nft_hash/:nft_id' element={<Details />} />
                <Route exact path='/collection/:collection_hash/:collection_id' element={<CollectionDetail />} />
            </Routes>
        </BrowserRouter>
    );
}

export default AppRouter;