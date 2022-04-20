import { validationResult } from 'express-validator';
import { cdg, Define } from '../../utils';

export class ValidatorMiddleware{

    static validate(req: any, res: any, next: any) {
        const errors:any = validationResult(req);
        if (!errors.isEmpty()) {
            return cdg.api(res, new Promise(resolve =>{
                resolve({
                    status: Define.clientErrorCode,
                    message: errors.errors[0].msg,
                    data: errors,
                });
            }));
        } else {
            next();
        }
    }
    
}