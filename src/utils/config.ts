var pjson = require('../../package.json');
import dotenv from 'dotenv';
dotenv.config();

export const config = {
    server: {
        env: process.env.APP_ENV,
        port: process.env.SERVER_PORT,
        apiPath: process.env.API_PATH,
    },
    mongo:{
        uri: process.env.DB_URI,
        name: process.env.DB_NAME,
    },
    jwt:{
        secret: process.env.JWT_SECRET,
        public: process.env.JWT_PUBLIC
    },
    paths: {
        logger: process.env.LOGGER_PATH
    },
    package: pjson
};
