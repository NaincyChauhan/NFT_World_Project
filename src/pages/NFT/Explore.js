import { useState, useEffect } from "react";
import Header from "../../components/Partials/Header";
import Footer from "../../components/Partials/Footer";
// import "../../assets/css/Header.css";
import { useDispatch, useSelector } from "react-redux";
import NFTItem from "../../components/Partials/NFTItem";
import { getNFTByPagination } from "../../redux/intercations";

const Explore = () => {
    const dispatch = useDispatch();
    const [category, setCategory] = useState();
    const nftworld = useSelector(state => state.NFTWorld.nftWorld);
    const [pagination, setPagination] = useState(1);
    const nfts = useSelector(state => state.NFTWorld.nftData);
    const pageNumber = useSelector(state => state.NFTWorld.pageNumber);

    const handleItemClick = (index) => {
        const extraElement = document.getElementById(`nft__item_extra_${index}`);
        if (extraElement) {
            extraElement.classList.toggle("nft-extra-block");
        }
    };

    const loadMoreNFT = async () => {
        const nftData_ = await getNFTByPagination(nftworld, pageNumber+1, 12);
        dispatch({ type: "UPDATE_NFT_DATA", nftData: nftData_,pageNumber: pageNumber+1 });
        console.log("this is the page of number is here",pageNumber);
        setPagination(pagination + 1);
        if (nftData_.length < 1) {
            document.getElementById('loadNFTBox').classList.add('n-d-none');
        }
        console.log("load nft data is here", nftData_);
        console.log("Debugging 343434",nfts);
    }
    return (
        <div id='wrapper'>
            <Header />
            {/* explore content begin */}

            <div className="no-bottom no-top" id="content">
                <div id="top"></div>

                {/* Header Section egin */}
                <section id="subheader" className="jarallax text-light">
                    <img className="jarallax-img" src="/images/background/banner.jpg" alt="" />
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
                </section>
                {/* Header Section End */}


                {/* Main Section Begin */}
                <section aria-label="section">
                    <div className="container">
                        <div className="row wow fadeIn">
                            {/* Filter Section Begin */}
                            {/* <div className="col-lg-12">
                                <div className="items_filter">
                                    <div id="item_category" className="dropdown">
                                        <a href="#" className="btn-selector">All categories</a>
                                        <ul>
                                            <li onClick={() => changeCategory(0)} className="active"><span>All categories</span></li>
                                            <li onClick={() => changeCategory(1)}><span>Art</span></li>
                                            <li onClick={() => changeCategory(2)}><span>Music</span></li>
                                            <li onClick={() => changeCategory(3)}><span>Video</span></li>
                                        </ul>
                                    </div>

                                    <div id="buy_category" className="dropdown">
                                        <a href="#" className="btn-selector">Buy Now</a>
                                        <ul>
                                            <li className="active"><span>Buy Now</span></li>
                                        </ul>
                                    </div>

                                    <div id="items_type" className="dropdown">
                                        <a href="#" className="btn-selector">All Items</a>
                                        <ul>
                                            <li className="active"><span>All Items</span></li>
                                        </ul>
                                    </div>

                                </div>
                            </div> */}
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