import {cdg, Define} from '../utils'
import mysql from 'mysql'
import {LoggerCore} from '../core';
import {locale} from '../data';

let config: any = {
    connectionLimit: 10,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASS,
    database: process.env.MYSQL_DATABASE,
    host: process.env.MYSQL_HOST
};

export class MysqlHelper {
    static init(): Promise < object > {
        return new Promise<any>((resolve, reject) => {
            let pool: any = mysql.createPool(config);

            resolve(pool);
        }).catch(
            (err : any) => {
                LoggerCore.log({type: 'error', content: err, location: 'MysqlHelper', method: 'init'})
                return({error: true, data: err, message: locale.fr.system.errorTryCatchMessage})
            }
        )
    }
    static query(query : string): Promise < object > {
        return new Promise<any>((resolve, reject) => {
            this.init().then((pool : any) => {
                if (!pool) {
                    reject(pool)
                } else {
                    pool.query(query, function (error: any, results: any, fields: any) {
                        // console.log('azerty', error)
                        if (error) 
                            reject(error);
                        
                        resolve(results)
                    });
                }
            })
        }).catch(
            (err : any) => {
                LoggerCore.log({type: 'error', content: JSON.stringify(err), location: 'MysqlHelper', method: 'query'})
                return({error: true, data: err, message: locale.fr.system.errorTryCatchMessage})
            }
        )
    }
}
