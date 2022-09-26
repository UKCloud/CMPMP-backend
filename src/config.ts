import * as dotenv from "dotenv";
dotenv.config();

export const config = {
    host: process.env.SESSION_HOST,
    port: Number(process.env.SESSION_PORT) || 9000,
    user: process.env.SESSION_USER,
    password: process.env.SESSION_PASSWORD,
    database: process.env.SESSION_DATABASE,
    secret: String(process.env.SESSION_SECRET),
    nodeEnv: process.env.NODE_ENV,
    logoutRedirectURI: String(process.env.LOGOUT_REDIRECT_URI),
    keycloakRealm: String(process.env.KEYCLOAK_REALM),
    clientId: String(process.env.CLIENT_ID),
    clientSecret: String(process.env.CLIENT_SECRET),
    redirectURI: String(process.env.REDIRECT_URI),
    cmpmpFrontEnd: String(process.env.CMPMP_FRONTEND),
    dbEngine: String(process.env.DB_ENGINE || "sqlite"),
    dbStorage: String(process.env.DB_STORAGE || "db.sqlite"),
}
