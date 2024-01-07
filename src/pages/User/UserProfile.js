import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from "react";
import { getUserData } from "../../redux/intercations";
import ProfileC from "../../components/Partials/ProfileC";

const UserProfile = () => {
    const { address } = useParams();
    const [loading, setLoading] = useState(false);
    const [userdata, setUserdata] = useState();
    const nftworld = useSelector(state => state.NFTWorld.nftWorld);

    const loadData = async () => {
        if (Object.keys(nftworld).length) {
            try {
                const data = await getUserData(address, nftworld);
                setUserdata(data);
            } catch (error) {
                console.warn("Something Went Wrong.");
            }
            setLoading(false);
        }
    }

    useEffect(() => {
        setLoading(true);
        loadData();
    }, [address, nftworld]);

    return (
        <>
            {
                userdata ? (
                    <ProfileC user={userdata.user.data} nfts={userdata.nfts} collection={userdata.collections} />
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

export default UserProfile;