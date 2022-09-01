import * as dotenv from "dotenv";
dotenv.config();

export const config = {
    host: process.env.SESSION_HOST,
    port: process.env.SESSION_PORT || 3000,
    user: process.env.SESSION_USER,
    password: process.env.SESSION_PASSWORD,
    database: process.env.SESSION_DATABASE,
    secret: process.env.SESSION_SECRET,
    nodeEnv: process.env.NODE_ENV
}
