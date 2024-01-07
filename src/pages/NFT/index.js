import { useState } from 'react';
import Footer from "../../components/Partials/Footer";
import Header from "../../components/Partials/Header";
import NFTData from "../../components/Partials/NFTData";
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { ajaxMessage, errorsHTMLMessage } from "../../components/Partials/Alert";
import UploadImage from "../../components/Requests/UploadImage";
import { UploadMetadata } from '../../components/Requests/UploadMetadata';
import { createNFT } from '../../redux/intercations';
import { userCollectionSelector } from '../../redux/selectors';

const Create = () => {
    const dispatch = useDispatch();
    const collections = useSelector(state => state.NFTWorld.userCollections);
    // const collections = useSelector(userCollectionSelector);
    console.log("this is the all user collections is ehre", collections);
    const nftworld = useSelector(state => state.NFTWorld.nftWorld);
    const provider = useSelector(state => state.provider.connection);
    const [NFTData_, setNFTData_] = useState([]);

    const initialValues = {
        logo: '',
        title: '',
        price: '',
        collection: '',
        desc: '',
        type: '',
    };

    const validationSchema = Yup.object({
        title: Yup.string().required('Oops.! The Title field is required.'),
        logo: Yup.string().required('Oops.! The Logo field is required.'),
        price: Yup.string().required('Oops.! The Price field is required.'),
        collection: Yup.string().required('Oops.! The Collection field is required.'),
        desc: Yup.string().required('Oops.! The Descripation field is required.'),
        type: Yup.string().required('Oops.! The Type field is required.'),
    });

    const onSubmit = async (values, { setSubmitting, formReset }) => {
        setSubmitting(true);
        // upload nft logo
        const logo = await UploadImage(values['title'], values['desc'], values['logo'], values['price']);
        if (logo === 0) {
            errorsHTMLMessage("Something Went Wrong to upload logo in blockchain");
            return false;
        }

        // const logo = "lgog121212";
        const _keys = {};
        NFTData_.map((data) => {
            _keys[data.key] = data.value;
        });
        // Upload Metadata
        const metadata = UploadMetadata(JSON.stringify({
            "data": {
                "info": {
                    "name": values.title,
                    "descripation": values.desc,
                    "logo": logo,
                    "price": values.price,
                },
                "keys": _keys
            },
        }));
        // const metadata = "metadata is here111";
        if (metadata !== 0) {
            const response = await createNFT(metadata, provider, dispatch, nftworld, values.type, values.price, true, values.collection)
            if (response.status === 1) {
                ajaxMessage(1, "New NFT Created Successfully.");
            } else {
                errorsHTMLMessage(response.error);
            }
        } else {
            errorsHTMLMessage("Something Went Wrong with upload Metadata in Blockchain.");
        }
        setSubmitting(false);
    };

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit,
    });

    return (
        <div className="wrapper">
            <Header />
            <div className="no-bottom no-top" id="content">
                <div id="top"></div>
                {/* <!-- section begin --> */}
                <section aria-label="section">
                    <div className="container">
                        <div className="row wow fadeIn">
                            <div className="col-lg-7 offset-lg-1">
                                <form id="form-create-item" className="form-border" method="post" onSubmit={formik.handleSubmit} encType="multipart/form-data">
                                    <div className="field-set">
                                        <h5>Upload file</h5>

                                        <div className="d-create-file">
                                            <p id="file_name">PNG, JPG, GIF, WEBP or MP4. Max 200mb.</p>
                                            <input type="button" id="get_file" className="btn-main" value="Browse" />
                                            <input
                                                type="file"
                                                id="upload_file"
                                                name="logo"
                                                onBlur={formik.handleBlur}
                                                onChange={(event) => formik.setFieldValue("logo", event.target.files[0])}
                                            />
                                        </div>
                                        {formik.touched.logo && formik.errors.logo ? (
                                            <div className='invalid-feedback'>{formik.errors.logo}</div>
                                        ) : null}

                                        <div className="spacer-40"></div>

                                        <h5>Select method</h5>
                                        <div className="de_tab tab_methods">
                                            <ul className="de_nav">
                                                <li className="active"><span><i className="fa fa-tag"></i>Fixed price</span>
                                                </li>
                                            </ul>

                                            <div className="de_tab_content">
                                                <div id="tab_opt_1">
                                                    <h5>Price</h5>
                                                    <input type="number"
                                                        name="price"
                                                        id="item_price"
                                                        className="form-control"
                                                        placeholder="enter price for one item (ETH)"
                                                        onChange={formik.handleChange}
                                                        onBlur={formik.handleBlur}
                                                    />
                                                </div>
                                            </div>
                                            {formik.touched.price && formik.errors.price ? (
                                                <div className="invalid-feedback">{formik.errors.price}</div>
                                            ) : null}
                                        </div>
                                        <div className="spacer-20"></div>

                                        {!collections || collections.length === 0 ? (
                                            <h5>Please Create a collection</h5>
                                        ) : (
                                            <>
                                                <h5>Choose collection</h5>
                                                <p className="p-info">This is the collection where your item will appear.</p>
                                                <div className='mb20'></div>
                                                <select onChange={formik.handleChange} onBlur={formik.handleBlur} name="collection" className="form-select fullwidth" aria-label="Default select example">
                                                    <option>Select Collection</option>
                                                    {
                                                        collections.map((_coll) => (
                                                            <option key={_coll.id} value={_coll.id}>{_coll.name}</option>
                                                        ))
                                                    }
                                                </select>
                                                {formik.touched.collection && formik.errors.collection ? (
                                                    <div className="invalid-feedback">{formik.errors.collection}</div>
                                                ) : null}
                                                <div className="spacer-20"></div>
                                            </>
                                        )}

                                        <h5>Choose Type</h5>
                                        <p className="p-info">This is the type where your item will appear.</p>
                                        <div className='mb20'></div>
                                        <select onChange={formik.handleChange} onBlur={formik.handleBlur} name="type" className="form-select fullwidth" aria-label="Default select example">
                                            <option key={0} value={0}>Art</option>
                                            <option key={1} value={1}>Video</option>
                                            <option key={2} value={2}>Music</option>
                                        </select>
                                        {formik.touched.type && formik.errors.type ? (
                                            <div className="invalid-feedback">{formik.errors.type}</div>
                                        ) : null}
                                        <div className="spacer-20"></div>

                                        <h5>Title</h5>
                                        <input type="text"
                                            name="title"
                                            id="item_title"
                                            className="form-control"
                                            placeholder="e.g. 'Crypto Funk"
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                        />
                                        {formik.touched.title && formik.errors.title ? (
                                            <div className="invalid-feedback">{formik.errors.title}</div>
                                        ) : null}

                                        <div className="spacer-20"></div>

                                        <h5>Description</h5>
                                        <textarea data-autoresize
                                            name="desc"
                                            id="item_desc"
                                            className="form-control"
                                            placeholder="e.g. 'This is very limited item'"
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                        >
                                        </textarea>
                                        {formik.touched.desc && formik.errors.desc ? (
                                            <div className="invalid-feedback">{formik.errors.desc}</div>
                                        ) : null}
                                        <div className="spacer-20"></div>

                                        <NFTData setNFTData={setNFTData_} />

                                        <div className="spacer-single"></div>

                                        <button disabled={formik.isSubmitting} type="submit" id="submit" className="btn-main" value="Create Item">
                                            {formik.isSubmitting ? 'Creating...' : 'Create NFT'}
                                        </button>
                                        <div className="spacer-single"></div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </section >

            </div >
            <Footer />
        </div >
    );
}

export default Create;