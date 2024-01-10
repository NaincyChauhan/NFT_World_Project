import { useState, useEffect } from "react";
import Header from "../../components/Partials/Header";
import Footer from "../../components/Partials/Footer";
// import "../../assets/css/Header.css";
import { useSelector } from "react-redux";
import NFTItem from "../../components/Partials/NFTItem";

const Explore = () => {
    const [category, setCategory] = useState();
    const [pagination, setPagination] = useState(1);
    const nfts = useSelector(state => state.NFTWorld.nftData);

    const handleItemClick = (index) => {
        const extraElement = document.getElementById(`nft__item_extra_${index}`);
        if (extraElement) {
            extraElement.classList.toggle("nft-extra-block");
        }
    };

    const changeCategory = (category_) => {
        setCategory(category_)
    }

    const getNFTData = () => {
        
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
                            <div className="col-lg-12">
                                {/* Filter Section Begin */}
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
                                {/* Filter Section End */}
                            </div>
                            {/* NFTs Section Begin */}
                            {nfts && nfts.map((element, index) => (
                                <NFTItem key={index} data={element} type={"all" + index} handleItemClick={handleItemClick} />
                            ))}

                            {/* NFTs Section End */}

                            <div className="col-md-12 text-center">
                                <a onClick={() => setPagination(pagination+1)} id="loadmore" className="btn-main wow fadeInUp lead">Load more</a>
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