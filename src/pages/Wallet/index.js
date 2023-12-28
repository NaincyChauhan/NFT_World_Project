import Header from '../../components/Partials/Header';
import Footer from '../../components/Partials/Footer';
import { useSelector, useDispatch } from 'react-redux';
import { loadAccount } from '../../redux/intercations';

const Wallet = () => {
    const dispatch = useDispatch();
    const provider = useSelector(state => state.provider.connection);
    const nftWorld = useSelector(state => state.NFTWorld.nftWorld);
    console.log("THIs is Importteant ogs",provider);
    console.log("THIs is Importteant Contract logs",nftWorld);
    const connectMetaMask = () => {
        // loadAccount(provider,dispatch)
    }
    return (
        <div id="wrapper">
            <Header />
            <div className="no-bottom no-top" id="content">
                <div id="top"></div>
                <section id="subheader" className="text-light" data-bgimage="url(/images/background/subheader.jpg) top">
                    <div className="center-y relative text-center">
                        <div className="container">
                            <div className="row">

                                <div className="col-md-12 text-center">
                                    <h1>Wallet</h1>
                                </div>
                                <div className="clearfix"></div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* section begin  */}
                <section aria-label="section">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-3 mb30">
                                <a className="box-url"onClick={connectMetaMask} role="button">
                                    <span className="box-url-label">Most Popular</span>
                                    <img src="/images/wallet/1.png" alt="" className="mb20" />
                                        <h4>Metamask</h4>
                                        <p>Start exploring blockchain applications in seconds.  Trusted by over 1 million users worldwide.</p>
                                </a>
                            </div>
                        </div>
                    </div>
                </section>
                {/* section end  */}
            </div>
            <Footer />
        </div>
    );
}

export default Wallet;