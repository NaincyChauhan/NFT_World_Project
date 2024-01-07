import { Link } from "react-router-dom";

const Collection = ({ data }) => {
    return (
        <div className="d-item col-lg-3 col-md-6 col-sm-6 col-xs-12">
            <div className="nft__item">
                <div className="author_list_pp">
                    <Link to={`/collection/${data.owner}/${data.id}`} data-bs-toggle="tooltip" data-bs-placement="top" title={data.name}>
                        <img className="lazy" src={"https://ipfs.io/ipfs/" + data.data.info.logo} alt="" />
                        <i className="fa fa-check"></i>
                    </Link>
                </div>
                <div className="nft__item_wrap">
                    <Link to={`/collection/${data.owner}/${data.id}`}>
                        <div className="d-placeholder"></div>
                        <img src={"https://ipfs.io/ipfs/" + data.data.info.banner} className="lazy nft__item_preview" alt="" />
                    </Link>
                </div>
                <div className="nft__item_info">
                    <Link to={`/collection/${data.owner}/${data.id}`}>
                        <h4>{data.name}</h4>
                    </Link>
                    <div className="nft__item_price">
                        {data.data.info.descripation.substring(0, 30)}...
                    </div>
                    <div className="nft__item_action">
                        <span>Total Items</span> <a href="#">{data.ids.length}</a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Collection;