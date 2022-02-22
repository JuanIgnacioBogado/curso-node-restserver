const {OAuth2Client} = require('google-auth-library');

const clientID = process.env.GOOGLE_CLIENT_ID;
const client = new OAuth2Client(clientID);

async function googleVerify(token = '') {
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: clientID,
        // Specify the CLIENT_ID of the app that accesses the backend
        // Or, if multiple clients access the backend:
        //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
    });
    const {name, picture, email} = ticket.getPayload();

    return {
        nombre: name,
        img: picture,
        correo: email
    }
};

module.exports = {
    googleVerify
}