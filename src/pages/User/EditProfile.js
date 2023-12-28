import Header from "../../components/Partials/Header";
import Footer from "../../components/Partials/Footer";
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import "../../assets/css/profile.css";
import TabScript from "../../components/Partials/TabScript";
import { ajaxMessage, errorsHTMLMessage } from "../../components/Partials/Alert";
const config = require("../../config.json");

const EditProfile = () => {
    const dispatch = useDispatch();
    const token = useSelector(state => state.provider.token);
    const user = useSelector(state => state.provider.user);
    const initialValues = {
        name: user && user.name ? user.name : '',
        username: user && user.username ? user.username : '',
        email: user && user.email ? user.email : '',
        bio: user && user.bio ? user.bio : '',
        profile_image: "",
        banner_image: "",
        your_site: user && user.your_site ? user.your_site : '',
        twitter_username: user && user.twitter_username ? user.twitter_username : '',
        instagram_username: user && user.instagram_username ? user.instagram_username : '',
        item_sold: user && user.item_sold ? true : false,
        price_change: user && user.price_change ? true : false,
        successfully_purchase: user && user.successfully_purchase ? true : false,
    };

    const validationSchema = Yup.object({
        name: Yup.string().required('Oops.! The Name field is required.'),
        username: Yup.string().required('Oops.! The Username field is required.'),
        email: Yup.string().required('Oops.! The Email field is required.'),
        bio: Yup.string().required('Oops.! The Bio field is required.'),
    });

    const onSubmit = async (values, { setSubmitting, formReset }) => {
        try {
            setSubmitting(true);
            const formData = new FormData();
            for (const key in values) {
                formData.append(key, values[key]);
            }
            const response = await axios.post(`${config["APPLICATION_URL"]}/api/update/profile`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${token}`,
                },
            });
            if (parseInt(response.data.status) === 1) {
                dispatch({ type: "AUTH_DATA_LOADED", "user": JSON.stringify(response.data.user) });
                ajaxMessage(1, response.data.message);
            } else {
                ajaxMessage(0, response.data.message);
            }
        } catch (error) {
            const msg = error.response?.data?.message;
            const errors = error.response?.data?.errors;
            let errorHTML = msg ? `${msg}<br>` : '';
            if (errors) {
                errorHTML += '<ul>';
                for (const key in errors) {
                    if (errors.hasOwnProperty(key)) {
                        errorHTML += `<li>${errors[key]}</li>`;
                    }
                }
                errorHTML += '</ul>';
            }
            errorsHTMLMessage(errorHTML);
        } finally {
            setSubmitting(false);
        }
    };

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit,
    });

    return (
        <div className="wrapper">
            <Header />
            {/* <!-- content begin --> */}
            <div className="no-bottom no-top" id="content">
                <div id="top"></div>

                {/* <!-- section begin --> */}
                <section id="section-main" aria-label="section">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-8 offset-lg-2">
                                <form id="form-create-item" className="form-border" onSubmit={formik.handleSubmit} encType="multipart/form-data">
                                    <div className="de_tab tab_simple">
                                        <ul className="de_nav">
                                            <li className="active"><span><i className="fa fa-user"></i>Profile</span></li>
                                            <li><span><i className="fa fa-exclamation-circle"></i>Notifications</span></li>
                                        </ul>

                                        <div className="de_tab_content">
                                            <div className="tab-1">
                                                <div className="row wow fadeIn">
                                                    <div className="col-lg-8 mb-sm-20">
                                                        <div className="field-set">
                                                            <h5>Name</h5>
                                                            <input type="text"
                                                                name="name"
                                                                id="name"
                                                                className={"form-control"}
                                                                placeholder="Enter Name"
                                                                value={formik.values.name}
                                                                onChange={formik.handleChange}
                                                                onBlur={formik.handleBlur} />
                                                            {formik.touched.name && formik.errors.name ? (
                                                                <div className="invalid-feedback">{formik.errors.name}</div>
                                                            ) : null}
                                                            <div className="spacer-20"></div>

                                                            <h5>Username</h5>
                                                            <input type="text"
                                                                name="username"
                                                                id="username"
                                                                className="form-control"
                                                                placeholder="Enter username"
                                                                value={formik.values.username}
                                                                onChange={formik.handleChange}
                                                                onBlur={formik.handleBlur} />
                                                            {formik.touched.username && formik.errors.username ? (
                                                                <div className="invalid-feedback">{formik.errors.username}</div>
                                                            ) : null}
                                                            <div className="spacer-20"></div>

                                                            <h5>Email Address*</h5>
                                                            <input type="text"
                                                                name="email"
                                                                id="email"
                                                                className="form-control"
                                                                placeholder="Enter email"
                                                                value={formik.values.email}
                                                                onChange={formik.handleChange}
                                                                onBlur={formik.handleBlur} />
                                                            {formik.touched.email && formik.errors.email ? (
                                                                <div className="invalid-feedback">{formik.errors.email}</div>
                                                            ) : null}
                                                            <div className="spacer-20"></div>

                                                            <h5>Bio</h5>
                                                            <textarea name="bio"
                                                                id="bio"
                                                                className="form-control"
                                                                placeholder="Tell the world who you are!"
                                                                value={formik.values.bio}
                                                                onChange={formik.handleChange}
                                                                onBlur={formik.handleBlur} ></textarea>
                                                            {formik.touched.bio && formik.errors.bio ? (
                                                                <div className="invalid-feedback">{formik.errors.bio}</div>
                                                            ) : null}
                                                            <div className="spacer-20"></div>

                                                            <h5><i className="fa fa-link"></i> Your site</h5>
                                                            <input type="text"
                                                                name="your_site"
                                                                id="your_site"
                                                                className="form-control"
                                                                placeholder="Enter Website URL"
                                                                value={formik.values.your_site}
                                                                onChange={formik.handleChange}
                                                                onBlur={formik.handleBlur} />
                                                            {formik.touched.your_site && formik.errors.your_site ? (
                                                                <div className="invalid-feedback">{formik.errors.your_site}</div>
                                                            ) : null}
                                                            <div className="spacer-20"></div>

                                                            <h5><i className="fa fa-twitter"></i> Twitter username</h5>
                                                            <input type="text"
                                                                name="twitter_username"
                                                                id="twitter_username"
                                                                className="form-control"
                                                                placeholder="Enter Twitter Username"
                                                                value={formik.values.twitter_username}
                                                                onChange={formik.handleChange}
                                                                onBlur={formik.handleBlur} />
                                                            {formik.touched.twitter_username && formik.errors.twitter_username ? (
                                                                <div className="invalid-feedback">{formik.errors.twitter_username}</div>
                                                            ) : null}
                                                            <div className="spacer-20"></div>

                                                            <h5><i className="fa fa-instagram"></i> Instagram username</h5>
                                                            <input type="text"
                                                                name="instagram_username"
                                                                id="instagram_username"
                                                                className="form-control"
                                                                placeholder="Enter Instagram username"
                                                                value={formik.values.instagram_username}
                                                                onChange={formik.handleChange}
                                                                onBlur={formik.handleBlur} />
                                                            {formik.touched.instagram_username && formik.errors.instagram_username ? (
                                                                <div className="invalid-feedback">{formik.errors.instagram_username}</div>
                                                            ) : null}

                                                        </div>
                                                    </div>

                                                    <div id="sidebar" className="col-lg-4">
                                                        <h5>Profile image <i className="fa fa-info-circle id-color-2" data-bs-toggle="tooltip" data-bs-placement="top" title="Recommend 400 x 400. Max size: 50MB. Click the image to upload."></i></h5>

                                                        <img src={user && user.image ? `${config["APPLICATION_URL"]}/storage/profiles/${user.image}` : "/images/author_single/author_thumbnail.jpg"} id="click_profile_img" className="d-profile-img-edit img-fluid" alt={formik.values.profile_image} />
                                                        <input type="file" id="upload_profile_img" name="profile_image" onChange={(event) => formik.setFieldValue("profile_image", event.target.files[0])} onBlur={formik.handleBlur} />
                                                        <div className="spacer-30"></div>

                                                        <h5>Profile banner <i className="fa fa-info-circle id-color-2" data-bs-toggle="tooltip" data-bs-placement="top" title="Recommend 1500 x 500. Max size: 50MB. Click the image to upload."></i></h5>
                                                        <img src={user && user.profilebanner ? `${config["APPLICATION_URL"]}/storage/banners/${user.profilebanner}` : "/images/author_single/author_banner.jpg"} id="click_banner_img" className="d-banner-img-edit img-fluid" alt="" />
                                                        <input type="file" id="upload_banner_img" name="banner_image" onChange={(event) => formik.setFieldValue("banner_image", event.target.files[0])} onBlur={formik.handleBlur} />

                                                    </div>
                                                </div>
                                            </div>

                                            <div className="tab-2">
                                                <div className="row wow fadeIn" >
                                                    <div className="col-md-6 mb-sm-20">
                                                        <div className="switch-with-title s2">
                                                            <h5>Item Sold</h5>
                                                            <div className="de-switch">
                                                                <input type="checkbox"
                                                                    id="notif-item-sold"
                                                                    name="item_sold"
                                                                    className="checkbox"
                                                                    checked={formik.values.item_sold}
                                                                    onChange={formik.handleChange}
                                                                    onBlur={formik.handleBlur} />
                                                                <label htmlFor="notif-item-sold"></label>
                                                            </div>
                                                            <div className="clearfix"></div>
                                                            <p className="p-info">When someone purhased your item.</p>
                                                        </div>
                                                        {formik.touched.item_sold && formik.errors.item_sold ? (
                                                            <div className="invalid-feedback">{formik.errors.item_sold}</div>
                                                        ) : null}

                                                        <div className="spacer-20"></div>

                                                        <div className="switch-with-title s2">
                                                            <h5>Price Change</h5>
                                                            <div className="de-switch">
                                                                <input type="checkbox"
                                                                    id="notif-price-change"
                                                                    name="price_change"
                                                                    className="checkbox"
                                                                    checked={formik.values.price_change}
                                                                    onChange={formik.handleChange}
                                                                    onBlur={formik.handleBlur} />
                                                                <label htmlFor="notif-price-change"></label>
                                                            </div>
                                                            <div className="clearfix"></div>
                                                            <p className="p-info">When an item you made an offer on changes in price.</p>
                                                        </div>
                                                        {formik.touched.price_change && formik.errors.price_change ? (
                                                            <div className="invalid-feedback">{formik.errors.price_change}</div>
                                                        ) : null}

                                                    </div>

                                                    <div className="col-md-6">
                                                        <div className="switch-with-title s2">
                                                            <h5>Successful Purchase</h5>
                                                            <div className="de-switch">
                                                                <input type="checkbox"
                                                                    id="notif-successful-purchase"
                                                                    checked={formik.values.successfully_purchase}
                                                                    onChange={formik.handleChange}
                                                                    onBlur={formik.handleBlur}
                                                                    name="successfully_purchase"
                                                                    className="checkbox"
                                                                />
                                                                <label htmlFor="notif-successful-purchase"></label>
                                                            </div>
                                                            <div className="clearfix"></div>
                                                            <p className="p-info">When you successfully buy an item{formik.values.successfully_purchase}.</p>
                                                        </div>
                                                        {formik.touched.successfully_purchase && formik.errors.successfully_purchase ? (
                                                            <div className="invalid-feedback">{formik.errors.successfully_purchase}</div>
                                                        ) : null}

                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="spacer-30"></div>
                                    <button type="submit" disabled={formik.isSubmitting} id="submit" className="btn-main" >{formik.isSubmitting ? 'Updating' : 'Update profile'}</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
            {/* <!-- content close --> */}
            <Footer />
            <TabScript />
        </div>
    );
}

export default EditProfile;