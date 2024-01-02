import { useState } from "react";
import Footer from "../../components/Partials/Footer";
import Header from "../../components/Partials/Header";
import TabScript from "../../components/Partials/TabScript";
import { useSelector } from 'react-redux';
import { userNFTSelector } from "../../redux/selectors";

const Profile = () => {
    const name_ = useSelector(state => state.provider.user);
    const userdata = useSelector(userNFTSelector);

    const handleItemClick = (index) => {
        const extraElement = document.getElementById(`nft__item_extra_${index}`);
        if (extraElement) {
            extraElement.classList.toggle("nft-extra-block");
        }
    };    

    return (
        <div className="wrapper">
            <Header />
            {/* <!-- content begin --> */}
            <div className="no-bottom no-top" id="content">
                <div id="top"></div>
                {/* <!-- section begin --> */}
                <section id="profile_banner" aria-label="section" className="text-light" data-bgimage="url(/images/author_single/author_banner.jpg) top">
                </section>
                {/* <!-- section close --> */}

                <section aria-label="section">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12">
                                <div className="d_profile de-flex">
                                    <div className="de-flex-col">
                                        <div className="profile_avatar">
                                            <img src="/images/author_single/author_thumbnail.jpg" alt="" />
                                            <i className="fa fa-check"></i>
                                            <div className="profile_name">
                                                <h4>
                                                    {name_.name}
                                                    <span className="profile_username">{name_.username}</span>
                                                    <span id="wallet" className="profile_wallet">{name_.address}</span>
                                                    <button id="btn_copy" title="Copy Text">Copy</button>
                                                </h4>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-md-12">
                                <div className="de_tab tab_simple">
                                    <ul className="de_nav">
                                        <li className="active"><span>On Sale</span></li>
                                        <li><span>Created</span></li>
                                    </ul>

                                    <div className="de_tab_content">
                                        <div className="tab-1">
                                            <div className="row">
                                                {
                                                    userdata.owned.map((element, index) => {
                                                        return (<div key={index} className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12">
                                                            <div className="nft__item style-2">
                                                                <div className="nft__item_wrap">
                                                                    <div id={`nft__item_extra_owned_${index}`} className={`nft__item_extra`}>
                                                                        <div className="nft__item_buttons">
                                                                            <button><a href={`/nft/${element.name}/${element.itemId}`}>Buy Now</a></button>
                                                                            <div className="nft__item_share">
                                                                                <h4>Share</h4>
                                                                                <a href={`https://www.facebook.com/sharer/sharer.php?u=/nft/${element.name}/${element.itemId}`} target="_blank"><i className="fa fa-facebook fa-lg"></i></a>
                                                                                <a href={`https://twitter.com/intent/tweet?url=/nft/${element.name}/${element.itemId}`} target="_blan"><i className="fa fa-twitter fa-lg"></i></a>
                                                                                <a href={`mailto:?subject=I wanted you to see this site&amp;body=/nft/${element.name}/${element.itemId}`}><i className="fa fa-envelope fa-lg"></i></a>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <a href={`/nft/${element.name}/${element.itemId}`}>
                                                                        <img src={element.logo} className="lazy nft__item_preview" alt={element.name} />
                                                                    </a>
                                                                </div>
                                                                <div className="nft__item_info">
                                                                    <a href={`/nft/${element.name}/${element.itemId}`}>
                                                                        <h4>{element.name}</h4>
                                                                    </a>
                                                                    <div className="nft__item_click" onClick={() => handleItemClick("owned_"+index)}>
                                                                        <span></span>
                                                                    </div>
                                                                    <div className="nft__item_price">
                                                                        {element.price} ETH
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>)
                                                    })
                                                }
                                            </div>
                                        </div>

                                        <div className="tab-2">
                                            <div className="row">
                                                {/* <!-- nft item begin --> */}
                                                {
                                                    userdata.created.map((element, index) => {
                                                        return (<div key={index} className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12">
                                                            <div className="nft__item style-2">
                                                                <div className="nft__item_wrap">
                                                                    <div id={`nft__item_extra_created_${index}`} className={`nft__item_extra`}>
                                                                        <div className="nft__item_buttons">
                                                                            <button><a href={`/nft/${element.name}/${element.itemId}`}>Buy Now</a></button>
                                                                            <div className="nft__item_share">
                                                                                <h4>Share</h4>
                                                                                <a href={`https://www.facebook.com/sharer/sharer.php?u=/nft/${element.name}/${element.itemId}`} target="_blank"><i className="fa fa-facebook fa-lg"></i></a>
                                                                                <a href={`https://twitter.com/intent/tweet?url=/nft/${element.name}/${element.itemId}`} target="_blan"><i className="fa fa-twitter fa-lg"></i></a>
                                                                                <a href={`mailto:?subject=I wanted you to see this site&amp;body=/nft/${element.name}/${element.itemId}`}><i className="fa fa-envelope fa-lg"></i></a>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <a href={`/nft/${element.name}/${element.itemId}`}>
                                                                        <img src={element.logo} className="lazy nft__item_preview" alt={element.name} />
                                                                    </a>
                                                                </div>
                                                                <div className="nft__item_info">
                                                                    <a href={`/nft/${element.name}/${element.itemId}`}>
                                                                        <h4>{element.name}</h4>
                                                                    </a>
                                                                    <div className="nft__item_click" onClick={() => handleItemClick("created_"+index)}>
                                                                        <span></span>
                                                                    </div>
                                                                    <div className="nft__item_price">
                                                                        {element.price} ETH
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>)
                                                    })
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
            {/* <!-- content close --> */}
            <Footer />
            <TabScript />
        </div>
    );
}

export default Profile;