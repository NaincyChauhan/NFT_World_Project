import Banners from '../../components/Partials/Banners';
import Footer from '../../components/Partials/Footer';
import Header from '../../components/Partials/Header';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import NFTItem from '../../components/Partials/NFTItem';

const Home = () => {
    const loading = useSelector(state => state.NFTWorld.loading);
    const nftData = useSelector(state => state.NFTWorld.nftData);
    const collection = useSelector(state => state.NFTWorld.allCollections);

    const handleItemClick = (index) => {
        const extraElement = document.getElementById(`nft__item_extra_${index}`);
        if (extraElement) {
            extraElement.classList.toggle("nft-extra-block");
        }
    };

    return (
        <div id='wrapper'>
            <Header />
            <div className="no-bottom no-top" id="content">
                <div id="top"></div>
                <section id="section-hero" className="no-bottom" aria-label="section">
                    <Banners />
                </section>

                <section id="section-collections" className="pt30">
                    <div className="container">
                        <div className="spacer-single"></div>
                        <div className="row wow fadeIn">
                            <div className="col-lg-12">
                                <h2 className="style-2">New Items</h2>
                            </div>

                            {!loading ? (
                                !nftData || nftData.length === 0 ? (
                                    <div className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12">
                                        <h4>Oops Data not found</h4>
                                    </div>
                                ) : (
                                    nftData.map((element, index) => {
                                        return (
                                            element.forSale === true ? (
                                                <NFTItem key={index} data={element} type={"NFT_"+index} handleItemClick={handleItemClick}  />)
                                                : ("")
                                        );
                                    })
                                )
                            ) : (
                                <div className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12">
                                    <h4>Loding Please Wait</h4>
                                </div>
                            )}

                        </div>

                        <div className="spacer-single"></div>

                        {/* {!collection || collection.length === 0 ? (
                            <h4>No Data Found</h4>
                        ) : (
                            <>
                                <div className="row">
                                    <div className="col-lg-12">
                                        <h2 className="style-2">Hot Collections</h2>
                                    </div>
                                    <div id="collection-carousel-alt" className="owl-carousel wow fadeIn">
                                        {
                                            nftData.map((element, index) => (
                                                <div className="nft_coll style-2" key={index}>
                                                    <div className="nft_wrap">
                                                        <a href="collection.html"><img src="/images/collections/coll-1.jpg" className="lazy img-fluid" alt="" /></a>
                                                    </div>
                                                    <div className="nft_coll_pp">
                                                        <a href="collection.html"><img className="lazy pp-coll" src="/images/author/author-1.jpg" alt="" /></a>
                                                        <i className="fa fa-check"></i>
                                                    </div>
                                                    <div className="nft_coll_info">
                                                        <a href="collection.html"><h4>Abstraction</h4></a>
                                                        <span>ERC-192</span>
                                                    </div>
                                                </div>
                                            ))
                                        }
                                    </div>
                                </div>
                            </>
                        )} */}

                        <>
                            <div className="row">
                                <div className="col-lg-12">
                                    <h2 className="style-2">Hot Collections</h2>
                                </div>
                                <div id="collection-carousel-alt" className="owl-carousel wow fadeIn">
                                    <div className="nft_coll style-2">
                                        <div className="nft_wrap">
                                            <a href="collection.html"><img src="/images/collections/coll-1.jpg" className="lazy img-fluid" alt="" /></a>
                                        </div>
                                        <div className="nft_coll_pp">
                                            <a href="collection.html"><img className="lazy pp-coll" src="/images/author/author-1.jpg" alt="" /></a>
                                            <i className="fa fa-check"></i>
                                        </div>
                                        <div className="nft_coll_info">
                                            <a href="collection.html"><h4>Abstraction</h4></a>
                                            <span>ERC-192</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>

                        <div className="spacer-single"></div>

                        <div className="row">
                            <div className="col-lg-12">
                                <h2 className="style-2">Top Sellers</h2>
                            </div>
                            <div className="col-md-12 wow fadeIn">
                                <ol className="author_list">
                                    <li>
                                        <div className="author_list_pp">
                                            <a href="author.html">
                                                <img className="lazy" src="/images/author/author-1.jpg" alt="" />
                                                <i className="fa fa-check"></i>
                                            </a>
                                        </div>
                                        <div className="author_list_info">
                                            <a href="author.html">Monica Lucas</a>
                                            <span>3.2 ETH</span>
                                        </div>
                                    </li>
                                </ol>
                            </div>
                        </div>
                    </div>
                </section>

            </div>
            <Footer />
        </div>
    );
}

export default Home;