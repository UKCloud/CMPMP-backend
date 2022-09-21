import "passport";
declare global {
    namespace Express {
        interface User {
            access_token: string
            id_token: string
        }
    }
}