import { useState, useEffect } from "react";
import Header from "../../components/Partials/Header";
import Footer from "../../components/Partials/Footer";
import { useDispatch, useSelector } from "react-redux";
import NFTItem from "../../components/Partials/NFTItem";
import { getNFTByPagination } from "../../redux/intercations";
import { filterNFTs } from "../../redux/selectors";

const Explore = () => {
    const dispatch = useDispatch();
    const [nfts, setNfts] = useState([]);
    const [category, setCategory] = useState(0);
    const [buyNow, setBuyNow] = useState(false);
    const nftworld = useSelector(state => state.NFTWorld.nftWorld);
    const [pagination, setPagination] = useState(1);
    const nfts_state = useSelector(state => state.NFTWorld.nftData);
    const pageNumber = useSelector(state => state.NFTWorld.pageNumber);

    // const nfts = useSelector(state => filterNFTs(state, buyNow, category));

    const handleItemClick = (index) => {
        const extraElement = document.getElementById(`nft__item_extra_${index}`);
        if (extraElement) {
            extraElement.classList.toggle("nft-extra-block");
        }
    };

    const changeCategory = (_category) => {
        console.log("category is here",_category);
        setCategory(_category);
    }

    const changeStatus = (_status) => {
        console.log("this is the status function");
        setBuyNow(_status)
    }

    const loadMoreNFT = async () => {
        const nftData_ = await getNFTByPagination(nftworld, pageNumber + 1, 12);
        dispatch({ type: "UPDATE_NFT_DATA", nftData: nftData_, pageNumber: pageNumber + 1 });
        setPagination(pagination + 1);
        if (nftData_.length < 1) {
            document.getElementById('loadNFTBox').classList.add('n-d-none');
        }
    }

    useEffect(() => {
        const _data = nfts_state;
        const _nfts_ = filterNFTs(_data, buyNow, category);
        setNfts(_nfts_);
        if (nfts_state.length > 0) {
        }
    }, [buyNow, category, nfts_state])

    return (
        <div id='wrapper'>
            <Header />
            {/* explore content begin */}

            <div className="no-bottom no-top" id="content">
                <div id="top"></div>

                {/* Header Section egin */}
                <section id="subheader" className="jarallax text-light">
                    <div className="center-y relative text-center">
                        <div className="container">
                            <div className="row">

                                <div className="col-md-12 text-center">
                                    <h1>Explore</h1>
                                </div>
                                <div className="clearfix"></div>
                            </div>
                        </div>
                    </div>
                    <div className="jarallax-container-0">

                        <img className="jarallax-img" src="/images/background/banner.jpg" alt="" />
                    </div>
                </section>
                {/* Header Section End */}


                {/* Main Section Begin */}
                <section aria-label="section">
                    <div className="container">
                        <div className="row wow fadeIn">
                            {/* Filter Section Begin */}
                            <div className="col-lg-12">
                                <div className="items_filter">
                                    <div id="item_category" className="dropdown">                                      
                                        <select onChange={(e) => changeCategory(e.target.value)} className="form-select fullwidth">
                                            <option defaultValue={0} key="0" value="0">All categories</option>
                                            <option key="1" value="1">Art</option>
                                            <option key="2" value="2">Music</option>
                                            <option key="3" value="3">Video</option>                                            
                                        </select>
                                    </div>

                                    <div id="buy_category" className="dropdown">
                                        <select onChange={(e) => changeStatus(e.target.value)} className="form-select fullwidth">
                                            <option defaultValue={0} key="0" value={true}>All NFT</option>
                                            <option key="1" value={true}>Buy Now</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            {/* Filter Section End */}

                            {/* NFTs Section Begin */}
                            <div id="NFTItems" className="row">
                                {nfts && nfts.map((element, index) => (
                                    <NFTItem key={index} data={element} type={"all" + index} handleItemClick={handleItemClick} />
                                ))}
                            </div>

                            {/* NFTs Section End */}

                            <div className="col-md-12 text-center" id="loadNFTBox">
                                <a onClick={loadMoreNFT} id="loadNFT" className="btn-main wow fadeInUp lead">Load more</a>
                            </div>
                        </div>
                    </div>
                </section>
                {/* Main Section End */}

            </div>
            {/* explore content close */}
            <Footer />
        </div>
    )
}

export default Explore;