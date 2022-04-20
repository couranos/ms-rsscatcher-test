import jwt from 'jsonwebtoken';
import {config, cdg, Define} from '../../utils';
export class JwtMiddleware {
    static checkToken(req: any, res: any, next: any) {
        const authHeader = req.headers.authorization;

        if (authHeader) {
            const token = authHeader.split(' ')[1];

            jwt.verify(token, config.jwt.secret!, (err: any, user: any) => {
                if (err) {
                    const errName = err.name;
                    let errLabel: string;
                    if(errName === 'TokenExpiredError') {
                        errLabel = 'Votre session a expiré'
                    } else if(errName === 'JsonWebTokenError') {
                        errLabel = 'Signature du token invalide'
                    } else {
                        errLabel = err
                    }
                    return cdg.api(res, new Promise((resolve)=>{
                        resolve({
                            status: Define.apiAuthorisationErrorCode,
                            message: errLabel,
                            data: errLabel
                        });
                    }));
                }

                req.user = user;
                next();
            });
        } else {
            return cdg.api(res, new Promise((resolve)=>{
                resolve({
                    status: Define.apiAuthorisationErrorCode,
                    message: 'Accès non autorisée',
                    data: ''
                });
            }));
        }
    }
    static generateAccessToken(data: {}){
        // generate an access token - exp: Math.floor(Date.now() / 1000) + (60 * 60)
        const accessToken = jwt.sign(data, config.jwt.secret!, { expiresIn: '1440m' });
        
        return {
            accessToken: accessToken
        };
    }
}