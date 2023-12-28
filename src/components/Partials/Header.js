import { useDispatch, useSelector } from 'react-redux';
import { loadAccount, removeToken } from '../../redux/intercations';
import { Link } from "react-router-dom";
import $ from "jquery";
const config = require("../../config.json");

const Header = () => {
    const defaulChainId = "0x7a69"; // Hardhat ChainId
    const dispatch = useDispatch();
    const provider = useSelector(state => state.provider.connection);
    const account = useSelector(state => state.provider.account);
    const balance = useSelector(state => state.provider.balance);
    const chainId = useSelector(state => state.provider.chainId);
    const token = useSelector(state => state.provider.token);
    const connecting = useSelector(state => state.provider.connecting);
    const user = useSelector(state => state.provider.user);

    // Connect To Metamask
    const connectWallet = async () => {
        const m_c = document.getElementById('m-c');
        const balance = await loadAccount(provider, dispatch);
        if (balance) {
            m_c.innerHTML = "(Connected)";
        }
    }

    const changeNetwork = async () => {
        try {
            try {
                const customChainId = defaulChainId; // Replace with your custom chain ID
                await window.ethereum.request({
                    method: 'wallet_switchEthereumChain',
                    params: [{ chainId: customChainId }],
                });

            } catch (error) {
                const customNetworkConfig = {
                    chainId: defaulChainId, // Replace with your custom chain ID
                    chainName: config['DEFAULT_NETWORK']['name'], // Replace with the name of your custom network
                    nativeCurrency: {
                        name: config['DEFAULT_NETWORK']['symbol_name'],
                        symbol: config['DEFAULT_NETWORK']['symbol'], // Replace with the symbol of your custom currency
                        decimals: Number(config['DEFAULT_NETWORK']['decimals']),
                    },
                    rpcUrls: [config['DEFAULT_NETWORK']['rpc_urls']] // Replace with your custom network URL
                    // blockExplorerUrls: [config['DEFAULT_NETWORK']['block_Explore_Urls']], // Replace with your custom explorer URL
                };
                await window.ethereum.request({
                    method: 'wallet_addEthereumChain',
                    params: [customNetworkConfig], // Switch to Hardhat
                    // params: [{ chainId: defaulChainId }], // Switch to Hardhat
                });
            }
        } catch (error) {
            console.error('Failed to switch network', error);
        }
    }

    const profileMenu = () => {
        const dropdownMenu = document.getElementById("de-submenu-profile");
        dropdownMenu.classList.toggle("open");
    }

    const copyText = () => {
        var $copyText = $('#wallet').text();
        var button = $('#btn_copy');
        navigator.clipboard.writeText($copyText).then(function () {
            var originalText = button.text();
            button.html('Copied!');
            button.addClass('clicked');
            setTimeout(function () {
                button.html(originalText);
                button.removeClass('clicked');
            }, 750);
        }, function () {
            button.html('Error');
        });
    }

    const logout = () => {
        if (token) {
            removeToken(dispatch);
            document.getElementById('m-c').innerHTML = "";
        }
    }

    return <>
        {/* <!-- header begin --> */}
        <header className="header-light scroll-light">
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <div className="de-flex sm-pt10">
                            <div className="de-flex-col">
                                <div className="de-flex-col">
                                    {/* <!-- logo begin --> */}
                                    <div id="logo">
                                        <a href="https://testing.site">
                                            <img alt="" className="logo-2" src="/images/logo-2.png" />
                                        </a>
                                    </div>
                                    {/* <!-- logo close --> */}
                                </div>
                                <div className="de-flex-col">
                                    <input id="quick_search" className="xs-hide style-2" name="quick_search" placeholder="search item here..." type="text" />
                                </div>
                            </div>
                            <div className="de-flex-col header-col-mid">
                                {/* <!-- mainmenu begin --> */}
                                <ul id="mainmenu">
                                    <li className="has-no-child">
                                        <a href="https://testing.site">Home<span></span></a>
                                    </li>
                                    <li className="has-no-child">
                                        <a href="explore.html">Create<span></span></a>
                                    </li>
                                    <li>
                                        <a href="https://testing.site">Pages<span></span></a>
                                        <ul>
                                            <li><a href="author.html">Author</a></li>
                                            <li><a href="profile.html">Profile</a></li>
                                            <li><a href="wallet.html">Wallet</a></li>
                                            <li><a href="create-options.html">Create</a></li>
                                            <li><a href="news.html">News</a></li>
                                            <li><a href="gallery.html">Gallery</a></li>
                                            <li><a href="login.html">Login</a></li>
                                            <li><a href="login-2.html">Login 2</a></li>
                                            <li><a href="register.html">Register</a></li>
                                            <li><a href="contact.html">Contact Us</a></li>
                                        </ul>
                                    </li>
                                    <li>
                                        <a href="https://testing.site">Stats<span></span></a>
                                        <ul>
                                            <li><a href="activity.html">Activity</a></li>
                                            <li><a href="rankings.html">Rankings</a></li>
                                        </ul>
                                    </li>
                                    <li>
                                        <a href="https://testing.site">Profile<span></span></a>
                                        <ul>
                                            <li><a href="icons-elegant.html">Profile Page</a></li>
                                            <li><a href="icons-etline.html">My NFTs</a></li>
                                            <li><a href="icons-font-awesome.html">Create NFT</a></li>
                                            <li><a href="accordion.html">Create Collection</a></li>
                                            <li><a href="alerts.html">Sold NFT</a></li>
                                            <li><a href="counters.html">Dashboard</a></li>
                                        </ul>
                                    </li>
                                </ul>
                                <div className="menu_side_area">
                                    <div className="de-login-menu">
                                        {chainId && config[chainId] ? (
                                            token && account ? (
                                                <>
                                                    <span id="de-click-menu-profile" className="de-menu-profile">
                                                        <a type='button' onClick={profileMenu}>
                                                            <img src={user && user.image ? `${config["APPLICATION_URL"]}/storage/profiles/${user.image}` : "/images/author_single/author_thumbnail.jpg"} className="img-fluid" alt="" />
                                                        </a>
                                                    </span>

                                                    <div id="de-submenu-profile" className="de-submenu">
                                                        <div className="d-name">
                                                            <h4>{user.name ? `${user.name.slice(0, 20)}. ` : "Not Set"}</h4>
                                                            <Link to="/edit-profile">Set display name</Link>
                                                        </div>
                                                        <div className="spacer-10"></div>
                                                        <div className="d-balance">
                                                            <h4>Balance</h4>
                                                            {balance ? Number(balance).toFixed(4) : 0} ETH
                                                        </div>
                                                        <div className="spacer-10"></div>
                                                        <div className="d-wallet">
                                                            <h4>My Wallet</h4>
                                                            <span id="wallet" className="d-wallet-address">{account}</span>
                                                            <button id="btn_copy" onClick={copyText} title="Copy Text">Copy</button>
                                                        </div>

                                                        <div className="d-line"></div>

                                                        <ul className="de-submenu-profile">
                                                            <Link to="/profile"><i className="fa fa-user"></i> My profile</Link>
                                                            <Link to="/edit-profile"><i className="fa fa-pencil"></i> Edit profile</Link>
                                                            <li><a href="#" onClick={() => logout()}><i className="fa fa-sign-out"></i> Sign out</a></li>
                                                        </ul>
                                                    </div>
                                                </>
                                            ) : (
                                                connecting ? (
                                                    <a className="btn-main btn-wallet" role="button">
                                                        <i className="icon_wallet_alt"></i><span>Connecting To Wallet</span>
                                                    </a>
                                                ) : (
                                                    <a className="btn-main btn-wallet" data-bs-toggle="modal" data-bs-target="#connectwalletModal" role="button">
                                                        <i className="icon_wallet_alt"></i><span>Connect Wallet</span>
                                                    </a>
                                                )
                                            )
                                        ) : (
                                            <a className="btn-main btn-wallet" onClick={changeNetwork} role="button"><i className="icon_wallet_alt"></i><span>Change Network</span></a>
                                        )}
                                        <span id="menu-btn"></span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
        {/* <!-- Modal --> */}
        <div className="modal fade" id="connectwalletModal" data-bs-backdrop="static" data-bs-keyboard="false"
            tabIndex="-1" aria-labelledby="connectwalletModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="connectwalletModalLabel">Connect Wallet</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <ul className="list-group">
                            <a data-bs-dismiss="modal" onClick={connectWallet} role="button" >
                                <li className="list-group-item d-flex align-items-center">
                                    <img src="/images/wallet/1.png" alt="Metamask 1" className="ml-3 space-right" width="30" height="30" />
                                    <span className="ml-1">Connect Metamask <span id="m-c" className="text-primary"></span></span>
                                </li>
                            </a>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        {/* <!-- header close --> */}
    </>;

}
export default Header;
