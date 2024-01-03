const NFTItem = ({ data, type, handleItemClick }) => {
    return (
        <div key={type} className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12">
            <div className="nft__item style-2">
                <div className="nft__item_wrap">
                    <div id={`nft__item_extra_${type}`} className={`nft__item_extra`}>
                        <div className="nft__item_buttons">
                            <button><a href={`/nft/${data.name}/${data.itemId}`}>Buy Now</a></button>
                            <div className="nft__item_share">
                                <h4>Share</h4>
                                <a href={`https://www.facebook.com/sharer/sharer.php?u=/nft/${data.name}/${data.itemId}`} target="_blank"><i className="fa fa-facebook fa-lg"></i></a>
                                <a href={`https://twitter.com/intent/tweet?url=/nft/${data.name}/${data.itemId}`} target="_blan"><i className="fa fa-twitter fa-lg"></i></a>
                                <a href={`mailto:?subject=I wanted you to see this site&amp;body=/nft/${data.name}/${data.itemId}`}><i className="fa fa-envelope fa-lg"></i></a>
                            </div>
                        </div>
                    </div>
                    <a href={`/nft/${data.name}/${data.itemId}`}>
                        <img src={data.logo} className="lazy nft__item_preview" alt={data.name} />
                    </a>
                </div>
                <div className="nft__item_info">
                    <a href={`/nft/${data.name}/${data.itemId}`}>
                        <h4>{data.name}</h4>
                    </a>
                    <div className="nft__item_click" onClick={() => handleItemClick(type)}>
                        <span></span>
                    </div>
                    <div className="nft__item_price">
                        {data.price} ETH
                    </div>
                </div>
            </div>
        </div>
    );
}

export default NFTItem;