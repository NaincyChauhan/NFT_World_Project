import { useState } from "react";
import Header from "../../components/Partials/Header";
import Footer from "../../components/Partials/Footer";
import { useDispatch, useSelector } from "react-redux";
import Collection from "../../components/Partials/Collection";
import { getCollectionByPagination } from "../../redux/intercations";

const CollectionExplore = () => {
    const dispatch = useDispatch();
    const nftworld = useSelector(state => state.NFTWorld.nftWorld);
    const collections = useSelector(state => state.NFTWorld.allCollections);
    const pageNumber = useSelector(state => state.NFTWorld.collectionPageNumber);

    const loadMoreCollection = async () => {
        const collectionData_ = await getCollectionByPagination(nftworld, pageNumber + 1, 12);
        dispatch({ type: "UPDATE_COLLECTION_DATA", collectionData: collectionData_, pageNumber: pageNumber + 1 });
        if (collectionData_.length < 1) {
            document.getElementById('loadNFTBox').classList.add('n-d-none');
        }
    }

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
                                    <h1>Explore Collections</h1>
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

                            {/* Collection Section Begin */}
                            {
                                collections && collections.map((data, index) => (
                                    <Collection key={index} data={data} />
                                ))
                            }

                            {/* Collection Section End */}

                            <div className="col-md-12 text-center" id="loadNFTBox">
                                <a onClick={loadMoreCollection} id="loadNFT" className="btn-main wow fadeInUp lead">Load more</a>
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

export default CollectionExplore;