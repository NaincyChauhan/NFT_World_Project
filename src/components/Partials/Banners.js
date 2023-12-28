const Banners = () => {
    return (
        <div className="d-carousel">
            <div id="item-carousel-big" className="owl-carousel wow fadeIn">
                <div className="nft_pic">
                    <a href="item-details.html">
                        <span className="nft_pic_info">
                            <span className="nft_pic_title">Glass Cube</span>
                            <span className="nft_pic_by">Mamie Barnett</span>
                        </span>
                    </a>
                    <div className="nft_pic_wrap">
                        <img src="/images/carousel/crs-1.jpg" className="lazy img-fluid" alt="" />
                    </div>
                </div>

                <div className="nft_pic">
                    <a href="item-details.html">
                        <span className="nft_pic_info">
                            <span className="nft_pic_title">Purple Ocean</span>
                            <span className="nft_pic_by">Monica Lucas</span>
                        </span>
                    </a>
                    <div className="nft_pic_wrap">
                        <img src="/images/carousel/crs-2.jpg" className="lazy img-fluid" alt="" />
                    </div>
                </div>

                <div className="nft_pic">
                    <a href="item-details.html">
                        <span className="nft_pic_info">
                            <span className="nft_pic_title">Hot Lava</span>
                            <span className="nft_pic_by">Nicholas Daniels</span>
                        </span>
                    </a>
                    <div className="nft_pic_wrap">
                        <img src="/images/carousel/crs-3.jpg" className="lazy img-fluid" alt="" />
                    </div>
                </div>


                <div className="nft_pic">
                    <a href="item-details.html">
                        <span className="nft_pic_info">
                            <span className="nft_pic_title">Loop Donut</span>
                            <span className="nft_pic_by">Lori Hart</span>
                        </span>
                    </a>
                    <div className="nft_pic_wrap">
                        <img src="/images/items/anim-5.webp" className="lazy img-fluid" alt="" />
                    </div>
                </div>

                <div className="nft_pic">
                    <a href="item-details.html">
                        <span className="nft_pic_info">
                            <span className="nft_pic_title">I Believe I Can Fly</span>
                            <span className="nft_pic_by">Fred Ryan</span>
                        </span>
                    </a>
                    <div className="nft_pic_wrap">
                        <img src="/images/items/anim-8.webp" className="lazy img-fluid" alt="" />
                    </div>
                </div>
            </div>
            <div className="d-arrow-left"><i className="fa fa-angle-left"></i></div>
            <div className="d-arrow-right"><i className="fa fa-angle-right"></i></div>
        </div>
    );
}

export default Banners;