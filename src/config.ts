import * as dotenv from "dotenv";
dotenv.config();

export const config = {
    port: Number(process.env.SESSION_PORT) || 9000,
    secret: String(process.env.SESSION_SECRET),
    nodeEnv: process.env.NODE_ENV,
    logoutRedirectURI: String(process.env.LOGOUT_REDIRECT_URI),
    keycloakRealm: String(process.env.KEYCLOAK_REALM),
    clientId: String(process.env.CLIENT_ID),
    clientSecret: String(process.env.CLIENT_SECRET),
    redirectURI: String(process.env.REDIRECT_URI),
    cmpmpFrontEnd: String(process.env.CMPMP_FRONTEND),
}
