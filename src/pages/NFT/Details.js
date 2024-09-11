import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import Header from '../../components/Partials/Header';
import TabScript from '../../components/Partials/TabScript';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { getCollectionByNFTId, getNFTById, buyNow, editNFTPrice, editNFTSale } from '../../redux/intercations';
import { ajaxMessage, errorsHTMLMessage } from '../../components/Partials/Alert';
const config = require("../../config.json");

const Details = () => {
    const { nft_hash, nft_id } = useParams();
    const nftworld = useSelector(state => state.NFTWorld.nftWorld);
    const provider = useSelector(state => state.provider.connection);
    const balance = useSelector(state => state.provider.balance);
    const account = useSelector(state => state.provider.account);
    const [nftDetail, setNftDetail] = useState();
    const [ethPrice, setEthPrice] = useState(0);
    const [collection, setCollection] = useState();
    const [loading, setLoading] = useState(false)
    const [contentLoading, setContentLoading] = useState(false);

    const validationSchema = Yup.object({
        price: Yup.string().required('Oops.! The Price field is required.')
    });

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
        setContentLoading(true);
        if (Object.keys(nftworld).length) {
            const nft_data_ = await getNFTById(nft_id, nftworld)
            setNftDetail(nft_data_);
            const collection = await getCollectionByNFTId(nft_id, nftworld);
            setCollection(collection);
        }
        setContentLoading(true);
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

    const onSubmit = async (values, { setSubmitting, formReset }) => {
        setSubmitting(true);
        
        // Edit NFT PRICE
        const response = await editNFTPrice(nftDetail.itemId,values['price'], provider, nftworld);
        if (response.status === 1) {
            ajaxMessage(1, "NFT Price Edited Successfully.")    
            window.location.reload();        
        }else{
            ajaxMessage(0, "Something Went Wrong.") 
        }
        // formReset(true)
        setSubmitting(false);
    };

    
    const onSubmitSale = async (values, { setSubmitting, formReset }) => {
        setSubmitting(true);
        
        // Edit NFT PRICE
        const response = await editNFTSale(nftDetail.itemId,values['sale'], provider, nftworld);
        if (response.status === 1) {
            ajaxMessage(1, "NFT Sale Type Changed Successfully.")    
            window.location.reload();        
        }else{
            ajaxMessage(0, "Something Went Wrong.") 
        }
        // formReset(true)
        setSubmitting(false);
    };

    const formik = useFormik({
        initialValues: {
            price: nftDetail ? nftDetail.price : 55
        },
        enableReinitialize: true,
        validationSchema,
        onSubmit,
    });

    const formikSale = useFormik({
        initialValues: {
            sale: nftDetail ? nftDetail.forSale : ''
        },
        enableReinitialize: true,
        validationSchema : Yup.object({
            sale: Yup.string().required('Oops.! The this field is required.')
        }),
        onSubmit: onSubmitSale,
    });


    return (
        <>
            {nftDetail ? (
                <>
                    <div id='wrapper'>
                        <Header />
                        <div className="no-bottom no-top" id="content">
                            <div id="top"></div>
                            <section id="nft-item-details" aria-label="section" className="sm-mt-0">
                                <div className="container">
                                    <div className="row g-5">
                                        <div className="col-md-6 text-center">
                                            <div className="nft-image-wrapper">
                                                <img src={nftDetail.logo} style={{ maxWidth: "534px" }} className="image-autosize img-fluid img-rounded mb-sm-30 nft_image" alt="NFT Details" />
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
                                                                <Link to={nftDetail.creator === account ? "/profile" : `/user/${nftDetail.creator}`}>
                                                                    <img className="lazy" src={nftDetail.creatordetail.image ? `${config["APPLICATION_URL"]}/storage/profiles/${nftDetail.creatordetail.image}` : "/images/author/author-1.jpg"} alt="" />
                                                                    <i className="fa fa-check"></i>
                                                                </Link>
                                                            </div>
                                                            <div className="author_list_info">
                                                                <Link to={nftDetail.creator === account ? "/profile" : `/user/${nftDetail.creator}`}>{nftDetail.creatordetail.name ? nftDetail.creatordetail.name : "Unknown"}</Link>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    {collection && (
                                                        <div>
                                                            <h6>Collection</h6>
                                                            <div className="item_author">
                                                                <div className="author_list_pp">
                                                                    <Link to={`/collection/${collection.owner}/${collection.id}`}>
                                                                        <img className="lazy" src={`https://${config["pinata"]["gateway"]}/ipfs/${collection.data.info.logo}?pinataGatewayToken=${config["pinata"]["gateway_key"]}`} alt="" />
                                                                        <i className="fa fa-check"></i>
                                                                    </Link>
                                                                </div>
                                                                <div className="author_list_info">
                                                                    <Link to={`/collection/${collection.owner}/${collection.id}`}>{collection.name}</Link>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>

                                                <div className="spacer-40"></div>

                                                <div className="de_tab tab_simple">
                                                    <ul className="de_nav">
                                                        <li className="active"><span>Details</span></li>
                                                        {
                                                            nftDetail.owner === account && (
                                                                <>
                                                                    <li><span>Edit Price</span></li>
                                                                    <li><span>ForSale</span></li>
                                                                </>
                                                            )
                                                        }
                                                    </ul>

                                                    <div className="de_tab_content">
                                                        <div className="tab-1">
                                                            <h6>Owner</h6>
                                                            <div className="item_author">
                                                                <div className="author_list_pp">
                                                                    <Link to={nftDetail.owner === account ? "/profile" : `/user/${nftDetail.owner}`}>
                                                                        <img className="lazy" src={nftDetail.ownerdetail.image ? `${config["APPLICATION_URL"]}/storage/profiles/${nftDetail.ownerdetail.image}` : "/images/author/author-1.jpg"} alt="" />
                                                                        <i className="fa fa-check"></i>
                                                                    </Link>
                                                                </div>
                                                                <div className="author_list_info">
                                                                    <Link to={nftDetail.owner === account ? "/profile" : `/user/${nftDetail.owner}`}>{nftDetail.ownerdetail.name ? nftDetail.ownerdetail.name : "Unknown"}</Link>
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

                                                        {
                                                            nftDetail.owner === account && (
                                                                <>
                                                                    <div className="tab-2">
                                                                        <div>
                                                                            <form id="form-edit-item-price" className="form-border nft-forms" onSubmit={formik.handleSubmit}>
                                                                                <div className="row wow fadeIn">
                                                                                    <div className="col-lg-7">
                                                                                        <div className="field-set">
                                                                                            <h5>Price</h5>
                                                                                            <input type="number"
                                                                                                name="price"
                                                                                                id="price"
                                                                                                className={"form-control"}
                                                                                                placeholder="In ETH"
                                                                                                value={formik.values.price}
                                                                                                onChange={formik.handleChange}
                                                                                                onBlur={formik.handleBlur}
                                                                                            />
                                                                                            {formik.touched.price && formik.errors.price ? (
                                                                                                <div className="invalid-feedback">{formik.errors.price}</div>
                                                                                            ) : null}
                                                                                            <div className="spacer-single"></div>

                                                                                            <button disabled={formik.isSubmitting} type="submit" id="submit" className="btn-main" value="Create Item">
                                                                                                {formik.isSubmitting ? 'Editing...' : 'Edit Price'}
                                                                                            </button>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </form>
                                                                        </div>
                                                                        <div className="spacer-30"></div>
                                                                    </div>

                                                                    <div className="tab-3">
                                                                        <h6>Edit Sale Type</h6>
                                                                        <div>
                                                                            <form onSubmit={formikSale.handleSubmit} id="form-edit-item-sale" className="form-border nft-forms">
                                                                                <div className="row wow fadeIn">
                                                                                    <div className="col-lg-7">
                                                                                        <div className="field-set">                                                                               
                                                                                            <h5>For Sale</h5>
                                                                                            <select 
                                                                                                name="sale" 
                                                                                                className="form-select fullwidth" 
                                                                                                aria-label="Default select example"
                                                                                                value={formikSale.values.sale}
                                                                                                onChange={formikSale.handleChange}
                                                                                                onBlur={formikSale.handleBlur}
                                                                                            >
                                                                                                <option value={true}>True</option>
                                                                                                <option value={false}>False</option>
                                                                                            </select>
                                                                                            {formikSale.touched.sale && formikSale.errors.sale ? (
                                                                                                <div className="invalid-feedback">{formikSale.errors.sale}</div>
                                                                                            ) : null}

                                                                                            <button disabled={formikSale.isSubmitting} type="submit" id="submit" className="btn-main" value="Edit Sale">
                                                                                                {formikSale.isSubmitting ? 'Changing...' : 'Change Type'}
                                                                                            </button>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </form>
                                                                        </div>
                                                                        <div className="spacer-30"></div>
                                                                    </div>
                                                                </>
                                                            )
                                                        }
                                                        
                                                    </div>
                                                    <div className="spacer-10"></div>
                                                    <h6>Price</h6>
                                                    <div className="nft-item-price"><img src="/images/misc/ethereum.svg" alt="" /><span>{nftDetail.price}</span>(${convertEthToUsd(nftDetail.price)})</div>

                                                    {nftDetail.forSale && (
                                                        <a href="#" className="btn-main btn-lg" data-bs-toggle="modal" data-bs-target="#buy_now">
                                                            Buy Now
                                                        </a>)
                                                    }

                                                    <div className="mt-3">
                                                        <h6>Share Via:</h6>
                                                        <div className="de-flex" id="social-icons">
                                                            <div className="de-flex-col">
                                                                <div className="social-icons">
                                                                    <a target="_blank" rel="noreferrer" href={`https://twitter.com/intent/tweet?url=${config["MAIN_URL"]}/collection/${nftDetail.name}/${nftDetail.itemId}`}><i className="fa fa-twitter fa-lg share-l"></i></a>
                                                                    <a target="_blank" rel="noreferrer" href={`https://www.facebook.com/sharer/sharer.php?u=${config["MAIN_URL"]}/collection/${nftDetail.name}/${nftDetail.itemId}`}><i className="fa fa-facebook fa-lg share-l"></i></a>
                                                                    <a target="_blank" rel="noreferrer" href={`https://www.linkedin.com/shareArticle?url=${config["MAIN_URL"]}/collection/${nftDetail.name}/${nftDetail.itemId}`}><i className="fa fa-linkedin fa-lg share-l"></i></a>
                                                                    <a target="_blank" rel="noreferrer" href={`https://wa.me/?text=${config["MAIN_URL"]}/collection/${nftDetail.name}/${nftDetail.itemId}`}><i className="fa fa-whatsapp fa-lg share-l"></i></a>
                                                                    <a target="_blank" rel="noreferrer" href={`mailto:?subject=I wanted you to see this site&amp;body=${config["MAIN_URL"]}/collection/${nftDetail.name}/${nftDetail.itemId}`}><i className="fa fa-envelope fa-lg share-l"></i></a>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
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
                    </div>
                    <TabScript />
                </>
            ) : (
                contentLoading ? (
                    <> Loading </>
                ) : (
                    <> Something Went Wrong </>
                )
            )}
        </>
    );
}

export default Details;