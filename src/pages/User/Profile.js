import Footer from "../../components/Partials/Footer";
import Header from "../../components/Partials/Header";
import TabScript from "../../components/Partials/TabScript";
import { useSelector } from 'react-redux';
import { userNFTSelector } from "../../redux/selectors";
import NFTItem from "../../components/Partials/NFTItem";
const config = require("../../config.json");

const Profile = () => {
    const user_ = useSelector(state => state.provider.user);
    const userdata = useSelector(userNFTSelector);

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
                <section id="profile_banner" aria-label="section" className="text-light" 
                data-bgimage={"url("+(user_.profilebanner ? `${config["APPLICATION_URL"]}/storage/banners/${user_.profilebanner}` : "/images/author_single/author_banner.jpg")+") top"}
                >
                </section>
                {/* User Banner Section End */}

                <section aria-label="section">
                    <div className="container">
                        <div className="row">
                            {/* User Detail Section Start */}
                            <div className="col-md-12">
                                <div className="d_profile de-flex">
                                    <div className="de-flex-col">
                                        <div className="profile_avatar">
                                            <img src={user_ && user_.image ? `${config["APPLICATION_URL"]}/storage/profiles/${user_.image}` : "/images/author_single/author_thumbnail.jpg"} alt="" />
                                            <i className="fa fa-check"></i>
                                            <div className="profile_name">
                                                <h4>
                                                    {user_.name}
                                                    <span className="profile_username">{user_.username}</span>
                                                    <span id="wallet" className="profile_wallet">{user_.address}</span>
                                                    <button id="btn_copy" title="Copy Text">Copy</button>
                                                </h4>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* User Detail Section End */}

                            <div className="col-md-12">
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
                                                    userdata.owned.map((element, index) => (
                                                        <NFTItem key={index} index={index} data={element} type={"owned_"+index} handleItemClick={handleItemClick} />
                                                    ))
                                                }
                                            </div>
                                        </div>

                                        <div className="tab-2">
                                            <div className="row">
                                                {
                                                    userdata.created.map((element, index) => (
                                                        <NFTItem key={index} index={index} data={element} type={"created_"+index} handleItemClick={handleItemClick} />
                                                    ))
                                                }
                                            </div>
                                        </div>

                                        <div className="tab-2">
                                            <div className="row">
                                                {
                                                    userdata.onSale.map((element, index) => (
                                                        <NFTItem key={index} data={element} type={"onsale_"+index} handleItemClick={handleItemClick} />
                                                    ))
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
            <Footer />
            <TabScript />
        </div>
    );
}

export default Profile;