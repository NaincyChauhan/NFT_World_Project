import Footer from "./Footer";
import Header from "./Header";
import TabScript from "./TabScript";
import NFTItem from "./NFTItem";
import Collection from "./Collection";
const config = require("../../config.json");

const ProfileC = ({user,nfts,collection}) => {
    const handleItemClick = (index) => {
        const extraElement = document.getElementById(`nft__item_extra_${index}`);
        if (extraElement) {
            extraElement.classList.toggle("nft-extra-block");
        }
    };

    return (
        <div className="wrapper">
            {/* Header */}
            <Header />
            {/* Content Start */}
            <div className="no-bottom no-top" id="content">
                {/* User Banner Section Start */}
                <div id="top"></div>
                {
                    user.profilebanner ? (
                        <section id="profile_banner" aria-label="section" className="text-light"
                            style={{ backgroundImage: `url(${config["APPLICATION_URL"]}/storage/banners/${user.profilebanner})`, backgroundRepeat: "no-repeat", backgroundSize: "cover" }}
                            data-bgimage="url(/images/author_single/author_banner.jpg) top">
                        </section>
                    ) :(
                        <section id="profile_banner" aria-label="section" className="text-light"
                        style={{ 
                            backgroundImage: `url(/images/author_single/author_banner.jpg)`,
                            backgroundRepeat: "no-repeat", backgroundSize: "cover" }}
                            data-bgimage="url(/images/author_single/author_banner.jpg) top">
                        </section>
                    )
                }
                {/* User Banner Section End */}

                <section aria-label="section">
                    <div className="container">
                        <div className="row">
                            {/* User Detail Section Start */}
                            {
                                user && (
                                    <div className="col-md-12">
                                        <div className="d_profile de-flex">
                                            <div className="de-flex-col">
                                                <div className="profile_avatar">
                                                    <img src={user.image ? `${config["APPLICATION_URL"]}/storage/profiles/${user.image}` : "/images/author_single/author_thumbnail.jpg"} alt="" />
                                                    <i className="fa fa-check"></i>
                                                    <div className="profile_name">
                                                        <h4>
                                                            {user.name}
                                                            <span className="profile_username">{user.username}</span>
                                                            <span id="wallet" className="profile_wallet">{user.address}</span>
                                                            <button id="btn_copy" title="Copy Text">Copy</button>
                                                        </h4>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            }
                            {/* User Detail Section End */}

                            {/* User NFTs Section Start */}
                            {
                                nfts && (
                                    <>
                                        <div className="col-md-12 mb-4">
                                            <div className="de_tab tab_simple">
                                                <ul className="de_nav">
                                                    <li className="active"><span>Owned</span></li>
                                                    <li><span>Created</span></li>
                                                    <li><span>On Sale</span></li>
                                                </ul>

                                                <div className="de_tab_content">
                                                    <div className="tab-1">
                                                        <div className="row">
                                                            {
                                                                nfts.owned.map((element, index) => (
                                                                    <NFTItem key={index} index={index} data={element} type={"owned_" + index} handleItemClick={handleItemClick} />
                                                                ))
                                                            }
                                                        </div>
                                                    </div>

                                                    <div className="tab-2">
                                                        <div className="row">
                                                            {
                                                                nfts.created.map((element, index) => (
                                                                    <NFTItem key={index} index={index} data={element} type={"created_" + index} handleItemClick={handleItemClick} />
                                                                ))
                                                            }
                                                        </div>
                                                    </div>

                                                    <div className="tab-3">
                                                        <div className="row">
                                                            {
                                                                nfts.onSale.map((element, index) => (
                                                                    <NFTItem key={index} data={element} type={"onsale_" + index} handleItemClick={handleItemClick} />
                                                                ))
                                                            }
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <TabScript />
                                    </>
                                )
                            }
                            {/* User NFTs Section End */}

                            {/* User Collection Section Start */}
                            <section id="section-nfts" style={{ backgroundColor: "#F7F4FD",paddingBottom:"30px",paddingTop:"30px"}} data-bgcolor="#F7F4FD">
                                <div className="container">
                                    <div className="row">
                                        <div className="col-lg-12">
                                            <div className="text-center">
                                                <h2>Collections</h2>
                                                <div className="small-border bg-color-2"></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row wow fadeIn">
                                        {
                                            collection && collection.map((data, index) => (
                                                <Collection key={index} data={data} />
                                            ))
                                        }
                                    </div>
                                </div>
                            </section>
                            {/* User Collection Section Start */}
                        </div>
                    </div>
                </section>
            </div>
            <Footer />
        </div>
    );
}

export default ProfileC;