import { useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { ethers } from 'ethers';
import Footer from "../../components/Partials/Footer";
import Header from "../../components/Partials/Header";
import { errorsHTMLMessage } from '../../components/Partials/Alert';
const config = require("../../config.json");

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const account = useSelector(state => state.provider.account);

    // Login With Email and Password
    // const handleLogin = async (e) => {
    //     e.preventDefault();
    //     try {
    //         const response = await axios.post('http://127.0.0.1:8000/api/login', { email, password });
    //         const { user, token } = response.data;
    //         console.log("This is User : ", user);
    //         console.log("token is Here: ", token);

    //         const response2 = await axios.get('http://127.0.0.1:8000/api/user', {
    //             headers: {
    //                 Authorization: `Bearer ${token}`,
    //             },
    //         });
    //         console.log("This is Authrize User Data", response2.data);
    //     } catch (error) {
    //         // Handle login errors (e.g., show error messages to the user)
    //     }
    // };

    const Login = async () => {
        // Call your Laravel API endpoint for user login
        try {
            console.log("function is comming isere", account);
            const uniqueIdentifier = ethers.keccak256(account);
            const response = await fetch(`${config["APPLICATION_URL"]}/api/nftworld`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    // wallet_address: address,
                    wallet_address:account
                }),
            });
            const data = await response.json();
            console.log('User login successful:', data);
        } catch (error) {
            errorsHTMLMessage(error);
        }
    };

    return (
        <div className="wrapper">
            <Header />
            <div className="no-bottom no-top" id="content">
                <div id="top"></div>
                <section style={{paddingTop:100}}>
                    <button type='button' onClick={Login}>Authenticate</button>
                </section>
            </div>
            <Footer />
        </div>

        // <>
        //     <form onSubmit={handleLogin}>
        //         <input
        //             type="email"
        //             placeholder="Email"
        //             value={email}
        //             onChange={(e) => setEmail(e.target.value)}
        //         />
        //         <input
        //             type="password"
        //             placeholder="Password"
        //             value={password}
        //             onChange={(e) => setPassword(e.target.value)}
        //         />
        //         <button type="submit">Login</button>
        //     </form>

        //     <button type='button' onClick={Login}>Authenticate</button>
        // </>
    );
};

export default Login;
