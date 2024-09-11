import { useState, useEffect } from "react";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { useParams } from 'react-router-dom';
import Footer from "../../components/Partials/Footer";
import Header from "../../components/Partials/Header";
import TabScript from "../../components/Partials/TabScript";
import { getCollectionDetail } from "../../redux/intercations";
import NFTItem from "../../components/Partials/NFTItem";
const config = require("../../config.json");

const CollectionDetail = () => {
    const { owner_hash, collection_id } = useParams();
    const [collection, setCollection] = useState();
    const [loading, setLoading] = useState(true);
    const nftworld = useSelector(state => state.NFTWorld.nftWorld);

    const getData = async () => {
        if (Object.keys(nftworld).length) {
            try {
                const collection = await getCollectionDetail(collection_id, nftworld);
                setCollection(collection);
            } catch (error) {
                console.error("Something Getting Wrong with Fetching Data!");
            }
            setLoading(false);
        }
    };

    const handleItemClick = (index) => {
        const extraElement = document.getElementById(`nft__item_extra_${index}`);
        if (extraElement) {
            extraElement.classList.toggle("nft-extra-block");
        }
    };

    useEffect(() => {
        getData();
    }, [owner_hash, collection_id, nftworld]);
    return (
        <div className="wrapper">
            {/* Header */}
            <Header />
            {/* Collection Content Start */}
            {
                collection ? (
                    <>
                        <div className="no-bottom no-top" id="content">
                            <div id="top"></div>

                            {/* Banner Section Start */}
                            <section id="profile_banner" aria-label="section" className="text-light" style={{ 
                            backgroundImage: `url(https://${config["pinata"]["gateway"]}/ipfs/${collection.data.info.banner}?pinataGatewayToken=${config["pinata"]["gateway_key"]})`,
                            backgroundRepeat: "no-repeat", backgroundSize: "cover" }} data-bgimage="url(/images/background/banner.jpg) top">
                            </section>
                            {/* Banner Section End */}

                            {/* Content Start */}
                            <section aria-label="section" className="d_coll no-top">
                                <div className="container">
                                    <div className="row">
                                        <div className="col-md-12">
                                            <div className="d_profile">
                                                <div className="profile_avatar">
                                                    <div className="d_profile_img">
                                                        <img src={`https://${config["pinata"]["gateway"]}/ipfs/${collection.data.info.logo}?pinataGatewayToken=${config["pinata"]["gateway_key"]}`} alt="" />
                                                        <i className="fa fa-check"></i>
                                                    </div>

                                                    <div className="profile_name">
                                                        <h4>
                                                            {collection.name}
                                                            <div className="clearfix"></div>
                                                            <span id="wallet" className="profile_wallet">{collection.owner}</span>
                                                            <button id="btn_copy" title="Copy Text">Copy</button>
                                                        </h4>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {
                                            collection.items.length > 0 ? (
                                                <div className="col-md-12">
                                                    <div className="de_tab tab_simple">
                                                        <ul className="de_nav">
                                                            <li className="active"><span>On Sale</span></li>
                                                            <li><span>Owned</span></li>
                                                            <li><span>Details</span></li>
                                                        </ul>

                                                        <div className="de_tab_content">
                                                            <div className="tab-1">
                                                                <div className="row">
                                                                    {/* nft item begin */}
                                                                    {
                                                                        collection.items.map((element, index) => {
                                                                            if (element.forSale) {
                                                                                return (<NFTItem key={index} data={element} type={"forSale" + index} handleItemClick={handleItemClick} />);
                                                                            }
                                                                        })
                                                                    }
                                                                </div>
                                                            </div>

                                                            <div className="tab-2">
                                                                <div className="row">
                                                                    {/* nft item begin */}
                                                                    {
                                                                        collection.items.map((element, index) => {
                                                                            if (!element.forSale) {
                                                                                return (<NFTItem key={index} data={element} type={"owned" + index} handleItemClick={handleItemClick} />);
                                                                            }
                                                                        })
                                                                    }
                                                                </div>
                                                            </div>
                                                            <div className="tab-3">
                                                                <div className="row">
                                                                    <div className="mb-3">
                                                                        <h6 className="desc-tag">Category : <span>{collection.data.info.category}</span></h6>
                                                                    </div>

                                                                    <div>
                                                                        <h6>Descripation:</h6>
                                                                        <p>{collection.data.info.descripation}</p>
                                                                    </div>

                                                                    <div className="mb-3">
                                                                        <h6>Information Links:</h6>
                                                                        <div className="de-flex">                                                                            
                                                                            <div className="de-flex-col">
                                                                                <div className="social-icons">
                                                                                    <a target="_blank" rel="noreferrer" href={collection.data.links.twitter}><i className="fa fa-twitter fa-lg"></i></a>
                                                                                    <a target="_blank" rel="noreferrer" href={collection.data.links.youtube}><i className="fa fa-youtube fa-lg"></i></a>
                                                                                    <a target="_blank" rel="noreferrer" href={collection.data.links.discard}><i className="fa fa-slideshare fa-lg"></i></a>
                                                                                    <a target="_blank" rel="noreferrer" href={collection.data.links.telegram}><i className="fa fa-telegram fa-lg"></i></a>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>

                                                                    <div className="mb-3">
                                                                        <h6>Share Via:</h6>
                                                                        <div className="de-flex" id="social-icons">                                                                            
                                                                            <div className="de-flex-col">
                                                                                <div className="social-icons">
                                                                                    <a target="_blank" rel="noreferrer" href={`https://twitter.com/intent/tweet?url=${config["MAIN_URL"]}/collection/${collection.name}/${collection.id}`}><i className="fa fa-twitter fa-lg share-l"></i></a>
                                                                                    <a target="_blank" rel="noreferrer" href={`https://www.facebook.com/sharer/sharer.php?u=${config["MAIN_URL"]}/collection/${collection.name}/${collection.id}`}><i className="fa fa-facebook fa-lg share-l"></i></a>
                                                                                    <a target="_blank" rel="noreferrer" href={`https://www.linkedin.com/shareArticle?url=${config["MAIN_URL"]}/collection/${collection.name}/${collection.id}`}><i className="fa fa-linkedin fa-lg share-l"></i></a>
                                                                                    <a target="_blank" rel="noreferrer" href={`https://wa.me/?text=${config["MAIN_URL"]}/collection/${collection.name}/${collection.id}`}><i className="fa fa-whatsapp fa-lg share-l"></i></a>
                                                                                    <a target="_blank" rel="noreferrer" href={`mailto:?subject=I wanted you to see this site&amp;body=${config["MAIN_URL"]}/collection/${collection.name}/${collection.id}`}><i className="fa fa-envelope fa-lg share-l"></i></a>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ) : (
                                                <> Items does not exists </>
                                            )
                                        }
                                    </div>
                                </div>
                            </section>
                            {/* Content End */}
                        </div>
                        <TabScript />
                    </>
                ) : (
                    loading ? (
                        <>Loading Please Wait</>
                    ) : (
                        <> Opps! Data Not Found.</>
                    )
                )
            }
            {/* Collection Content End */}
            <Footer />
        </div>
    );
}

export default CollectionDetail;