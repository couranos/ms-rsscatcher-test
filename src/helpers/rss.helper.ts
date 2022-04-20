import {config} from '../utils';
import {MainSet} from '../models';
import { AxiosCore, LoggerCore } from '../core';
let fs = require('fs');
let parser = require('xml2json');




export class RssHelper {
    static fetch(url: string) {
        return new Promise((resolve, reject) => {
            let axios = AxiosCore.connect(url)

            axios.get().then((response: any) => {
                let data = parser.toJson(response.data);
                data = JSON.parse(data);
                
                resolve(data)
            }).catch((error: any) => {
                console.log('rejected from catch::', error)
                if (error.response) {
                    console.log('RESPONSE...', error)
                    let data = error.response.data;
                    resolve({error: true, data:error.response, message: data})
                } else {
                    console.log('NO RESPONSE...', error)
                    resolve({error: true, data:error.response, message: 'Une erreur inconnue s\'est produite, réessayer plutard'})
                }
            })
        })
    }
}
