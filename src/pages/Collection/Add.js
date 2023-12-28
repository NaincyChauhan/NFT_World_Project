import Footer from "../../components/Partials/Footer";
import Header from "../../components/Partials/Header";
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { ajaxMessage, errorsHTMLMessage } from "../../components/Partials/Alert";
import UploadImage from "../../components/Requests/UploadImage";
import { UploadMetadata } from "../../components/Requests/UploadMetadata";
import NewCollection from "../../components/Requests/NewCollection";
import { createcollection, updateCollectionData } from "../../redux/intercations";

const Add = () => {
    const dispatch = useDispatch();
    const provider = useSelector(state => state.provider.connection);
    const nftworld = useSelector(state => state.NFTWorld.nftWorld);
    const token = useSelector(state => state.provider.token);

    const initialValues = {
        name: '',
        logo: '',
        banner: '',
        desc: '',
        category: '',
        youtube: '',
        twitter: '',
        telegram: '',
        discard: '',
    };

    const validationSchema = Yup.object({
        name: Yup.string().required('Oops.! The Name field is required.'),
        logo: Yup.string().required('Oops.! The Logo field is required.'),
        banner: Yup.string().required('Oops.! The Banner field is required.'),
        desc: Yup.string().required('Oops.! The Descripation field is required.'),
        category: Yup.string().required('Oops.! The Category field is required.'),
    });

    const onSubmit = async (values, { setSubmitting, formReset }) => {
        setSubmitting(true);
        // Upload Logo 
        const logo = await UploadImage(values['name'], values['desc'], values['logo'])
        if (logo === 0) {
            errorsHTMLMessage("Something Went Wrong to upload logo in blockchain");
            return false;
        }
        values['logo'] = logo;
        const banner = await UploadImage(values['name'], values['desc'], values['banner'])
        if (banner === 0) {
            errorsHTMLMessage("Something Went Wrong to upload banner in blockchain");
            return false;
        }
        values['banner'] = banner;

        // Upload Metadata
        const metadata = await UploadMetadata(JSON.stringify({
            "data": {
                "info": {
                    "name": values['name'],
                    "category": values.category,
                    "descripation": values['desc'],
                    "logo": logo,
                    "banner": banner,
                },
                "links": {
                    "youtube": values.youtube,
                    "twitter": values.twitter,
                    "telegram": values.telegram,
                    "discard": values.discard,
                }
            },
        }));
        // const metadata = "metadata is here";
        values['logo'] = logo;
        values['banner'] = banner;
        // Set New Collection Data in redux
        await new Promise((resolve) => setTimeout(resolve, 0));

        // Create New Collection                
        if (metadata !== 0) {
            const response = await createcollection(metadata,values['name'], provider, dispatch, nftworld);
            if (response.status === 1) {
                ajaxMessage(1, "New Collection Created Successfully.")
                try {
                    await updateCollectionData(dispatch,response.collectionId,nftworld)
                } catch (error) {
                    console.log("There is Error when getting collection Data",error);
                }
                await NewCollection(response.collectionId, response.creator, values, metadata, token)                
            }
        } else {
            errorsHTMLMessage("Something Went Wrong with upload Metadata in Blockchain.");
        }
        // formReset(true)
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
                        <form id="form-create-item" className="form-border" method="post" onSubmit={formik.handleSubmit} encType="multipart/form-data">
                            <div className="row wow fadeIn">
                                <div className="col-lg-7 offset-lg-1">
                                    <div className="field-set">
                                        <h5> Upload Logo</h5>
                                        <div className="d-create-file">
                                            <p id="file_name">PNG, JPG, GIF, WEBP or MP4. Max 200mb.</p>
                                            <input type="button" id="get_file" className="btn-main" value="Logo" />
                                            <input type="file"
                                                name="logo"
                                                onChange={(event) => formik.setFieldValue("logo", event.target.files[0])}
                                                onBlur={formik.handleBlur}
                                                id="upload_file"
                                            />
                                        </div>
                                        {formik.touched.logo && formik.errors.logo ? (
                                            <div className="invalid-feedback">{formik.errors.logo}</div>
                                        ) : null}
                                        <div className="spacer-40"></div>

                                        <h5> Banner Logo</h5>
                                        <div className="d-create-file">
                                            <p id="banner_name">PNG, JPG, GIF, WEBP or MP4. Max 200mb.</p>
                                            <input type="button" id="get_banner" className="btn-main" value="Banner" />
                                            <input type="file"
                                                name="banner"
                                                onChange={(event) => formik.setFieldValue("banner", event.target.files[0])}
                                                onBlur={formik.handleBlur}
                                                id="upload_banner" />
                                        </div>
                                        {formik.touched.banner && formik.errors.banner ? (
                                            <div className="invalid-feedback">{formik.errors.banner}</div>
                                        ) : null}
                                        <div className="spacer-40"></div>

                                        <h5>Name</h5>
                                        <input type="text"
                                            name="name"
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            id="name"
                                            className="form-control"
                                            placeholder="e.g. 'Crypto Funk"
                                        />
                                        {formik.touched.name && formik.errors.name ? (
                                            <div className="invalid-feedback">{formik.errors.name}</div>
                                        ) : null}
                                        <div className="spacer-20"></div>

                                        <h5>Description</h5>
                                        <textarea data-autoresize
                                            name="desc"
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            id="desc"
                                            className="form-control"
                                            placeholder="e.g. 'This is very limited item'"></textarea>
                                        {formik.touched.desc && formik.errors.desc ? (
                                            <div className="invalid-feedback">{formik.errors.desc}</div>
                                        ) : null}
                                        <div className="spacer-20"></div>

                                        <h5>Choose Category</h5>
                                        <p className="p-info">This is the category where your item will appear.</p>
                                        <select onChange={formik.handleChange} onBlur={formik.handleBlur} name="category" className="form-select fullwidth mb20" aria-label="Default select example">
                                            <option value="music">Music</option>
                                            <option value="art">Art</option>
                                            <option value="education">Education</option>
                                        </select>
                                        {formik.touched.category && formik.errors.category ? (
                                            <div className="invalid-feedback">{formik.errors.category}</div>
                                        ) : null}
                                        <div className="spacer-single"></div>

                                        <button disabled={formik.isSubmitting} type="submit" id="submit" className="btn-main" value="Create Item">
                                            {formik.isSubmitting ? 'Creating...' : 'Create Collection'}
                                        </button>
                                        <div className="spacer-single"></div>
                                    </div>

                                </div>
                                <div className="col-lg-3 col-sm-6 col-xs-12">
                                    <div className="field-set">
                                        <h5>Youtube Link</h5>
                                        <input type="text"
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            name="youtube"
                                            id="youtube"
                                            className="form-control"
                                            placeholder="e.g. 'Crypto Funk"
                                        />
                                        {formik.touched.youtube && formik.errors.youtube ? (
                                            <div className="invalid-feedback">{formik.errors.youtube}</div>
                                        ) : null}
                                        <div className="spacer-20"></div>

                                        <h5>Twitter Link</h5>
                                        <input type="text"
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            name="twitter"
                                            id="twitter"
                                            className="form-control"
                                            placeholder="e.g. https://twitter.com/@username"
                                        />
                                        {formik.touched.twitter && formik.errors.twitter ? (
                                            <div className="invalid-feedback">{formik.errors.twitter}</div>
                                        ) : null}
                                        <div className="spacer-20"></div>

                                        <h5>Discard Link</h5>
                                        <input type="text"
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            name="discard"
                                            id="discard"
                                            className="form-control"
                                            placeholder="e.g. https://discord.gg/abcsdf"
                                        />
                                        {formik.touched.discard && formik.errors.discard ? (
                                            <div className="invalid-feedback">{formik.errors.discard}</div>
                                        ) : null}
                                        <div className="spacer-20"></div>

                                        <h5>Telegram</h5>
                                        <input type="text"
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            name="telegram"
                                            id="telegram"
                                            className="form-control"
                                            placeholder="e.g. https://t.me/abcsdf"
                                        />
                                        {formik.touched.telegram && formik.errors.telegram ? (
                                            <div className="invalid-feedback">{formik.errors.telegram}</div>
                                        ) : null}
                                        <div className="spacer-20"></div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </section>
            </div>
            <Footer />
        </div>
    );
}

export default Add;