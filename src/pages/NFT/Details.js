import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../../components/Partials/Header';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { getCollectionByNFTId, getNFTById, buyNow } from '../../redux/intercations';
import { ajaxMessage, errorsHTMLMessage } from '../../components/Partials/Alert';
const config = require("../../config.json");

const Details = () => {
    const { nft_hash, nft_id } = useParams();
    const nftworld = useSelector(state => state.NFTWorld.nftWorld);
    const provider = useSelector(state => state.provider.connection);
    const balance = useSelector(state => state.provider.balance);
    const [nftDetail, setNftDetail] = useState();
    const [ethPrice, setEthPrice] = useState(0);
    const [collection, setCollection] = useState();
    const [loading, setLoading] = useState(false)

    const getEtherPrice = () => {
        axios
            .get('https://api.coingecko.com/api/v3/simple/price', {
                params: {
                    ids: 'ethereum',
                    vs_currencies: 'usd',
                },
            })
            .then((response) => {
                const priceInUSD = response.data.ethereum.usd;
                setEthPrice(priceInUSD);
            })
            .catch((error) => {
                console.error('Error fetching Ether price:', error);
            });
    }

    const getData = async () => {
        if (Object.keys(nftworld).length) {
            const nft_data_ = await getNFTById(nft_id, nftworld)
            setNftDetail(nft_data_);
            const collection = await getCollectionByNFTId(nft_id, nftworld);
            console.log("Collection Data REturned Successfully", collection);
            setCollection(collection);
        }
    }

    // Buy now
    const buyNow_ = async () => {
        setLoading(true);
        const result = await buyNow(nft_id, nftDetail.price, nftworld, provider);
        if (result.status === 1) {
            ajaxMessage(1, `${nftDetail.name} #${nftDetail.itemId} Bought Successfully`);
            window.location.reload();
        } else {
            errorsHTMLMessage(result.error);
        }
        setLoading(false);
    }

    useEffect(() => {
        getEtherPrice();
        getData()
    }, [nft_hash, nft_id, nftworld]);

    const convertEthToUsd = (ethToUsdPrice) => {
        return ethPrice * ethToUsdPrice;
    };

    return (
        <>
            {nftDetail ? (
                <div id='wrapper'>
                    <Header />
                    <div className="no-bottom no-top" id="content">
                        <div id="top"></div>
                        <section id="nft-item-details" aria-label="section" className="sm-mt-0">
                            <div className="container">
                                <div className="row g-5">
                                    <div className="col-md-6 text-center">
                                        <div className="nft-image-wrapper">
                                            <img src={nftDetail.logo} className="image-autosize img-fluid img-rounded mb-sm-30 nft_image" alt="NFT Details" />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="item_info">
                                            <h2>{nftDetail.name} #{nftDetail.itemId}</h2>
                                            <div className="item_info_counts">
                                                <div className="item_info_type"><i className="fa fa-image"></i>{nftDetail.MediaType === 0 ? "Art" : nftDetail.MediaType === 1 ? "Video" : "Music"}</div>
                                            </div>
                                            <p>{nftDetail.descripation}</p>

                                            <div className="d-flex flex-row">
                                                <div className="mr40">
                                                    <h6>Creator</h6>
                                                    <div className="item_author">
                                                        <div className="author_list_pp">
                                                            <a href="/autherprofile">
                                                                <img className="lazy" src={nftDetail.creatordetail.image ? `${config["APPLICATION_URL"]}/storage/profiles/${nftDetail.creatordetail.image}` : "/images/author/author-1.jpg"} alt="" />
                                                                <i className="fa fa-check"></i>
                                                            </a>
                                                        </div>
                                                        <div className="author_list_info">
                                                            <a href="/autherprofile">{nftDetail.creatordetail.name ? nftDetail.creatordetail.name : "Unknown"}</a>
                                                        </div>
                                                    </div>
                                                </div>

                                                {collection && (
                                                    <div>
                                                        <h6>Collection</h6>
                                                        <div className="item_author">
                                                            <div className="author_list_pp">
                                                                <a href="/collection-detail">
                                                                    <img className="lazy" src={`https://ipfs.io/ipfs/${collection.data.info.logo}`} alt="" />
                                                                    <i className="fa fa-check"></i>
                                                                </a>
                                                            </div>
                                                            <div className="author_list_info">
                                                                <a href="/collection-detail">{collection.name}</a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>

                                            <div className="spacer-40"></div>

                                            <div className="de_tab tab_simple">
                                                <ul className="de_nav">
                                                    <li className="active"><span>Details</span></li>
                                                </ul>

                                                <div className="de_tab_content">
                                                    <div className="tab-1">
                                                        <h6>Owner</h6>
                                                        <div className="item_author">
                                                            <div className="author_list_pp">
                                                                <a href="/autherprofile">
                                                                    <img className="lazy" src={nftDetail.ownerdetail.image ? `${config["APPLICATION_URL"]}/storage/profiles/${nftDetail.ownerdetail.image}` : "/images/author/author-1.jpg"} alt="" />
                                                                    <i className="fa fa-check"></i>
                                                                </a>
                                                            </div>
                                                            <div className="author_list_info">
                                                                <a href="/autherprofile">{nftDetail.ownerdetail.name ? nftDetail.ownerdetail.name : "Unknown"}</a>
                                                            </div>
                                                        </div>

                                                        <div className="spacer-40"></div>
                                                        <h6>Properties</h6>
                                                        <div className="row gx-2">
                                                            {nftDetail.data &&
                                                                Object.keys(nftDetail.data).map((key, index) => {
                                                                    return (
                                                                        <div className="col-lg-4 col-md-6 col-sm-6" key={index}>
                                                                            <a href="#" className="nft_attr">
                                                                                <h5>{key}</h5>
                                                                                <h4>{nftDetail.data[key]}</h4>
                                                                            </a>
                                                                        </div>
                                                                    );
                                                                })}
                                                        </div>
                                                        <div className="spacer-30"></div>
                                                    </div>
                                                </div>
                                                <div className="spacer-10"></div>
                                                <h6>Price</h6>
                                                <div className="nft-item-price"><img src="/images/misc/ethereum.svg" alt="" /><span>{nftDetail.price}</span>(${convertEthToUsd(nftDetail.price)})</div>

                                                {nftDetail.forSale && (
                                                    <a href="#" className="btn-main btn-lg" data-bs-toggle="modal" data-bs-target="#buy_now">
                                                        Buy Now
                                                    </a>)
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>

                    {nftDetail.forSale && (
                        <div className="modal fade" id="buy_now" tabindex="-1" aria-labelledby="buy_now" aria-hidden="true">
                            <div className="modal-dialog modal-dialog-centered de-modal">
                                <div className="modal-content">
                                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                    <div className="modal-body">
                                        <div className="p-3 form-border">
                                            <h3>Checkout</h3>
                                            You are about to purchase a <b>{nftDetail.name} #{nftDetail.itemId}</b>
                                            {nftDetail.creatordetail.name && (
                                                <> from <b>{`${nftDetail.creatordetail.name}`} </b></>
                                            )}
                                            <div className="spacer-single"></div>
                                            <div className="de-flex">
                                                <div>Your balance</div>
                                                <div><b>{Number(balance).toFixed(4)} ETH</b></div>
                                            </div>
                                            <div className="de-flex">
                                                <div>You will pay</div>
                                                <div><b>{nftDetail.price} ETH</b></div>
                                            </div>
                                            <div className="spacer-single"></div>
                                            {loading ? (
                                                <a className="btn-main btn-fullwidth">Processing...</a>
                                            ) : (
                                                <a onClick={buyNow_} className="btn-main btn-fullwidth">Pay Now</a>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>)
                    }
                    <a href="#" id="back-to-top"></a>
                </div>
            ) : (
                "404 Error is here"
            )}
        </>
    );
}

export default Details;