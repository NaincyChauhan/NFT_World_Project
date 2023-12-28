const config = require("../../config.json");
const Login = async (address, dispatch) => {
    try {
        // const uniqueIdentifier = ethers.keccak256(address);
        const response = await fetch(`${config["APPLICATION_URL"]}/api/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                // uniqueIdentifier: uniqueIdentifier,
                wallet_address: address
            }),
        });
        const data = await response.json();
        dispatch({ type: "AUTH_TOKEN_LOADED", "token": data.token });
        dispatch({ type: "AUTH_DATA_LOADED", "user": JSON.stringify(data.user) });
    } catch (error) {
        console.error('Error logging in:', error);
    }
};

export default Login;