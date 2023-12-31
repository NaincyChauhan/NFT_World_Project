import { useState } from "react";
import Footer from "../../components/Partials/Footer";
import Header from "../../components/Partials/Header";
import TabScript from "../../components/Partials/TabScript";
import { useDispatch, useSelector } from 'react-redux';

const Profile = () => { 
    const [nftExtraVisibility, setNftExtraVisibility] = useState({});   
    const name_ = useSelector(state => state.provider.user);

    const toggleNftItemExtra = (index) => {
        setNftExtraVisibility({
            ...nftExtraVisibility,
            [index]: !nftExtraVisibility[index] || false,
        });
    };

    console.log("Hello This is user data", name_.username);
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
                                    {/* <div className="profile_follow de-flex">
                                        <div className="de-flex-col">
                                            <div className="profile_follower">500 followers</div>
                                        </div>
                                        <div className="de-flex-col">
                                            <a href="#" className="btn-main">Follow</a>
                                        </div>
                                    </div> */}
                                </div>
                            </div>

                            <div className="col-md-12">
                                <div className="de_tab tab_simple">

                                    <ul className="de_nav">
                                        <li className="active"><span>On Sale</span></li>
                                        <li><span>Created</span></li>
                                        <li><span>Liked</span></li>
                                    </ul>

                                    <div className="de_tab_content">

                                        <div className="tab-1">
                                            <div className="row">
                                                {/* <!-- nft item begin --> */}
                                                <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12">
                                                    <div className="nft__item">
                                                        <div className="de_countdown" data-year="2023" data-month="8" data-day="16" data-hour="8"></div>
                                                        <div className="author_list_pp">
                                                            <a href="author.html">
                                                                <img className="lazy" src="/images/author/author-1.jpg" alt="" />
                                                                    <i className="fa fa-check"></i>
                                                            </a>
                                                        </div>
                                                        <div className="nft__item_wrap">
                                                            <div className="nft__item_extra">
                                                                <div className="nft__item_buttons">
                                                                    <button >Buy Now</button>
                                                                    <div className="nft__item_share">
                                                                        <h4>Share</h4>
                                                                        <a><i className="fa fa-facebook fa-lg"></i></a>
                                                                        <a><i className="fa fa-twitter fa-lg"></i></a>
                                                                        <a><i className="fa fa-envelope fa-lg"></i></a>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <a href="item-details.html">
                                                                <img src="/images/author_single/porto-1.jpg" className="" alt="" />
                                                            </a>
                                                        </div>
                                                        <div className="nft__item_info">
                                                            <a href="item-details.html">
                                                                <h4>Pinky Ocean</h4>
                                                            </a>
                                                            <div className="nft__item_click">
                                                                <span></span>
                                                            </div>
                                                            <div className="nft__item_price">
                                                                0.08 ETH<span>1/20</span>
                                                            </div>
                                                            <div className="nft__item_action">
                                                                <a href="#">Place a bid</a>
                                                            </div>
                                                            <div className="nft__item_like">
                                                                <i className="fa fa-heart"></i><span>50</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="tab-2">
                                            <div className="row">
                                                {/* <!-- nft item begin --> */}
                                                <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12">
                                                    <div className="nft__item">
                                                        <div className="de_countdown" data-year="2023" data-month="8" data-day="14" data-hour="8"></div>
                                                        <div className="author_list_pp">
                                                            <a href="author.html">
                                                                <img className="lazy" src="/images/author/author-1.jpg" alt="" />
                                                                    <i className="fa fa-check"></i>
                                                            </a>
                                                        </div>
                                                        <div className="nft__item_wrap">
                                                            <div className="nft__item_extra">
                                                                <div className="nft__item_buttons">
                                                                    <button >Buy Now</button>
                                                                    <div className="nft__item_share">
                                                                        <h4>Share</h4>
                                                                        <a><i className="fa fa-facebook fa-lg"></i></a>
                                                                        <a><i className="fa fa-twitter fa-lg"></i></a>
                                                                        <a><i className="fa fa-envelope fa-lg"></i></a>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <a href="item-details.html">
                                                                <img src="/images/author_single/porto-3.jpg" className="" alt="" />
                                                            </a>
                                                        </div>
                                                        <div className="nft__item_info">
                                                            <a href="item-details.html">
                                                                <h4>Three Donuts</h4>
                                                            </a>
                                                            <div className="nft__item_click">
                                                                <span></span>
                                                            </div>
                                                            <div className="nft__item_price">
                                                                0.05 ETH<span>1/11</span>
                                                            </div>
                                                            <div className="nft__item_action">
                                                                <a href="#">Place a bid</a>
                                                            </div>
                                                            <div className="nft__item_like">
                                                                <i className="fa fa-heart"></i><span>97</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="tab-3">
                                            <div className="row">
                                                {/* <!-- nft item begin --> */}
                                                <div className="col-lg-3 col-md-6">
                                                    <div className="nft__item">
                                                        <div className="author_list_pp">
                                                            <a href="author.html">
                                                                <img className="lazy" src="/images/author/author-1.jpg" alt="" />
                                                                    <i className="fa fa-check"></i>
                                                            </a>
                                                        </div>
                                                        <div className="nft__item_wrap">
                                                            <a href="item-details.html">
                                                                <img src="/images/items/anim-4.webp" className="" alt="" />
                                                            </a>
                                                        </div>
                                                        <div className="nft__item_info">
                                                            <a href="item-details.html">
                                                                <h4>The Truth</h4>
                                                            </a>
                                                            <div className="nft__item_click">
                                                                <span></span>
                                                            </div>
                                                            <div className="nft__item_price">
                                                                0.06 ETH<span>1/20</span>
                                                            </div>
                                                            <div className="nft__item_action">
                                                                <a href="#">Place a bid</a>
                                                            </div>
                                                            <div className="nft__item_like">
                                                                <i className="fa fa-heart"></i><span>26</span>
                                                            </div>
                                                        </div>
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
            {/* <!-- content close --> */}
            <Footer />
            <TabScript />
        </div>
    );
}

export default Profile;