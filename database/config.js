const {connect, connection} = require('mongoose');

const dbConnection = async () => {
    try {
        await connect(process.env.MONGODB_CNN);
        console.log(`DB online conectada: ${connection.name}`);
    } catch (error) {
        console.log(error);
        throw new Error('Error a la hora de iniciar la base de datos');
    }
};

module.exports = {
    dbConnection
}