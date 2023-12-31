import * as dotenv from 'dotenv'
dotenv.config()

import { cleanEnv, str, } from "envalid";

const env = cleanEnv(process.env, {
    // ACCESS_SECRET_TOKEN: str(),
    // REFRESH_SECRET_TOKEN: str(),
    // PASSWORD_RESET_TOKEN: str(),
    PASSWORD: str(),
    EMAIL: str(),
    DB_PASSWORD: str(),
    DB_NAME: str(),
    SECRET: str(),
    DB_URL: str()
});

export default env

