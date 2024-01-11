import { useState, useEffect } from "react";
import Header from "../../components/Partials/Header";
import Footer from "../../components/Partials/Footer";
import { useSelector } from "react-redux";
import NFTItem from "../../components/Partials/NFTItem";

const Explore = () => {
    const [category, setCategory] = useState();
    const nfts = useSelector(state => state.NFTWorld.nftData);

    return (
        <div id='wrapper'>
            <Header />
            {/* explore content begin */}

            <div class="no-bottom no-top" id="content">
                <div id="top"></div>

                {/* Header Section egin */}
                <section id="subheader" class="jarallax text-light">
                    <img class="jarallax-img" src="/images/background/banner.jpg" alt="" />
                    <div class="center-y relative text-center">
                        <div class="container">
                            <div class="row">

                                <div class="col-md-12 text-center">
                                    <h1>Collection Explore</h1>
                                </div>
                                <div class="clearfix"></div>
                            </div>
                        </div>
                    </div>
                </section>
                {/* Header Section End */}


                {/* Main Section Begin */}
                <section aria-label="section">
                    <div class="container">
                        <div class="row wow fadeIn">
                            <div class="col-lg-12">
                                {/* Filter Section Begin */}
                                <div class="items_filter">
                                    <form action="https://gigaland.io/blank.php" class="row form-dark" id="form_quick_search" method="post" name="form_quick_search">
                                        <div class="col text-center">
                                            <input class="form-control" id="name_1" name="name_1" placeholder="search item here..." type="text" /> <a href="#" id="btn-submit"><i class="fa fa-search bg-color-secondary"></i></a>
                                            <div class="clearfix"></div>
                                        </div>
                                    </form>

                                    <div id="item_category" class="dropdown">
                                        <a href="#" class="btn-selector">All categories</a>
                                        <ul>
                                            <li class="active"><span>All categories</span></li>
                                            <li><span>Art</span></li>
                                            <li><span>Music</span></li>
                                            <li><span>Video</span></li>
                                        </ul>
                                    </div>

                                    <div id="buy_category" class="dropdown">
                                        <a href="#" class="btn-selector">Buy Now</a>
                                        <ul>
                                            <li class="active"><span>Buy Now</span></li>
                                        </ul>
                                    </div>

                                    <div id="items_type" class="dropdown">
                                        <a href="#" class="btn-selector">All Items</a>
                                        <ul>
                                            <li class="active"><span>All Items</span></li>
                                            <li><span>Single Items</span></li>
                                            <li><span>Bundles</span></li>
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

                            <div class="col-md-12 text-center">
                                <a href="#" id="loadmore" class="btn-main wow fadeInUp lead">Load more</a>
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