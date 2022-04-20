import { locale } from '../data';
import {cdg, Define} from '../utils';

export class CategoryCore {
    payloads: Array<any> = [];
    constructor(payloads?: any) {
        this.payloads = payloads
    }
    load(){
        return this.payloads;
    }
    exist(category: string){
        return new Promise((resolve, reject) => {
            if(cdg.string.is_empty(category)) resolve(false);

            let Q:any = this.load();
            let categoryKeys:any = [];

            for (let x in Q) {
                let item:any = Q[x];

                categoryKeys.push(item.key)
            }

            resolve((!!cdg.inArray(category, categoryKeys)));
        }).catch((e) => {
            return cdg.errorObjectParser(e, locale.fr.system.errorTryCatchMessage)
        })
    }
    buildName(categoryKey: string) {
        return new Promise((resolve, reject) => {
            if(cdg.string.is_empty(categoryKey)) resolve('');
            let Q:any = this.load();

            let categoryName = '';
            Q.forEach(function(item:any) {
                if(item.key === categoryKey) {
                    categoryName = item.text;
                }
            });
            resolve(categoryName);
        }).catch((e) => {
            return cdg.errorObjectParser(e, locale.fr.system.errorTryCatchMessage)
        })
    }
}
