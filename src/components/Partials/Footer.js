const Footer = () => {
    return <>
        {/* footer begin */}
        <a href="#" id="back-to-top"></a>
        <footer>
            <div className="container">
                <div className="row">
                    <div className="col-md-3 col-sm-6 col-xs-1">
                        <div className="widget">
                            <h5>Marketplace</h5>
                            <ul>
                                <li><a href="http://localhost:3000">All NFTs</a></li>
                                <li><a href="http://localhost:3000">Art</a></li>
                                <li><a href="http://localhost:3000">Music</a></li>
                                <li><a href="http://localhost:3000">Domain Names</a></li>
                                <li><a href="http://localhost:3000">Virtual World</a></li>
                                <li><a href="http://localhost:3000">Collectibles</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-md-3 col-sm-6 col-xs-1">
                        <div className="widget">
                            <h5>Resources</h5>
                            <ul>
                                <li><a href="http://localhost:3000">Help Center</a></li>
                                <li><a href="http://localhost:3000">Partners</a></li>
                                <li><a href="http://localhost:3000">Suggestions</a></li>
                                <li><a href="http://localhost:3000">Discord</a></li>
                                <li><a href="http://localhost:3000">Docs</a></li>
                                <li><a href="http://localhost:3000">Newsletter</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-md-3 col-sm-6 col-xs-1">
                        <div className="widget">
                            <h5>Community</h5>
                            <ul>
                                <li><a href="http://localhost:3000">Community</a></li>
                                <li><a href="http://localhost:3000">Documentation</a></li>
                                <li><a href="http://localhost:3000">Brand Assets</a></li>
                                <li><a href="http://localhost:3000">Blog</a></li>
                                <li><a href="http://localhost:3000">Forum</a></li>
                                <li><a href="http://localhost:3000">Mailing List</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="col-md-3 col-sm-6 col-xs-1">
                        <div className="widget">
                            <h5>Newsletter</h5>
                            <p>Signup for our newsletter to get the latest news in your inbox.</p>
                            <form action="https://gigaland.io/blank.php" className="row form-dark" id="form_subscribe" method="post" name="form_subscribe">
                                <div className="col text-center">
                                    <input className="form-control" id="txt_subscribe" name="txt_subscribe" placeholder="enter your email" type="text" /> <a href="http://localhost:3000" id="btn-subscribe"><i className="arrow_right bg-color-secondary"></i></a>
                                    <div className="clearfix"></div>
                                </div>
                            </form>
                            <div className="spacer-10"></div>
                            <small>Your email is safe with us. We don't spam.</small>
                        </div>
                    </div>
                </div>
            </div>
            <div className="subfooter">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="de-flex">
                                <div className="de-flex-col">
                                    <a href="index.html">
                                        <img alt="" className="f-logo" src="/images/logo-2-light.png" /><span className="copy">&copy; Copyright 2023 - Gigaland by Designesia</span>
                                    </a>
                                </div>
                                <div className="de-flex-col">
                                    <div className="social-icons">
                                        <a href="http://localhost:3000"><i className="fa fa-facebook fa-lg"></i></a>
                                        <a href="http://localhost:3000"><i className="fa fa-twitter fa-lg"></i></a>
                                        <a href="http://localhost:3000"><i className="fa fa-linkedin fa-lg"></i></a>
                                        <a href="http://localhost:3000"><i className="fa fa-pinterest fa-lg"></i></a>
                                        <a href="http://localhost:3000"><i className="fa fa-rss fa-lg"></i></a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
        {/* footer close */}
    </>;

}
export default Footer;
