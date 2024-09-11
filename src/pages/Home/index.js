import Banners from '../../components/Partials/Banners';
import Footer from '../../components/Partials/Footer';
import Header from '../../components/Partials/Header';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import NFTItem from '../../components/Partials/NFTItem';
import Collection from '../../components/Partials/Collection';

const Home = () => {
    const loading = useSelector(state => state.NFTWorld.loading);
    const nftData = useSelector(state => state.NFTWorld.nftData);
    const collections = useSelector(state => state.NFTWorld.allCollections);

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

                <section id="section-collections" className="pt30 pb30">
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
                                    <>
                                        {nftData.map((element, index) => {
                                            return (
                                                (element.forSale === true && index < 12) ? (
                                                    <NFTItem key={index} data={element} type={"NFT_" + index} handleItemClick={handleItemClick} />)
                                                    : ("")
                                            );
                                        })}

                                        < div className="col-md-12 text-center">
                                            <Link to="/explore" id="loadNFT" className="btn-main wow fadeInUp lead">Explore</Link>
                                        </div>
                                    </>
                                )
                            ) : (
                                <div className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12">
                                    <h4>Loding Please Wait</h4>
                                </div>
                            )}

                        </div>

                        <div className="spacer-single"></div>

                        {/* Collection Section Start */}
                        <section id="section-nfts" className='pb30'>
                            <div className="container">
                                <div className="row">
                                    <div className="col-lg-12">
                                        <div className="text-center">
                                            <h2>Hot Collections</h2>
                                            <div className="small-border bg-color-2"></div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row wow fadeIn">
                                    {
                                        collections && collections.map((data, index) => (
                                            <Collection key={index} data={data} />
                                        ))
                                    }
                                </div>
                            </div>
                        </section>
                        {/* Collection Section Start */}
                    </div>
                </section>
            </div >
            <Footer />
        </div >
    );
}

export default Home;