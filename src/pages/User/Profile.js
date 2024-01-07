import { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import { GetUserNFTs } from "../../redux/intercations";
import ProfileC from "../../components/Partials/ProfileC";

const Profile = () => {
    const [nfts, setNfts] = useState();
    const user = useSelector(state => state.provider.user);
    const collection = useSelector(state => state.NFTWorld.userCollections);
    const nftworld = useSelector(state => state.NFTWorld.nftWorld);
    const account = useSelector(state => state.provider.account);
    const [loading, setLoading] = useState(false);

    const fetchData = async () => {
        if (Object.keys(nftworld).length) {
            try {
                const data = await GetUserNFTs(account, nftworld);
                setNfts(data);
            } catch (error) {
                console.log("Something went wrong!");
            }
            setLoading(false);
        }
    }
    useEffect(() => {
        setLoading(true);
        fetchData();
    }, [account, nftworld])


    return (
        <>
            {
                nfts ? (
                    <ProfileC user={user} nfts={nfts} collection={collection} />
                ) : (
                    loading ? (
                        <>Loading</>
                    ) : (
                        <>Something Went Wrong</>
                    )
                )
            }
        </>
    );
}

export default Profile;