import {Define, cdg} from './../../utils'
import {MainSet} from '../../models';
import {CategoryPayload} from '../../data/payloads';
import {CategoryCore, LoggerCore} from '../../core';
import {MainInterface} from '../../models/interface';
import {locale} from '../../data';
import {MysqlHelper, RssHelper} from '../../helpers';

let Category = new CategoryCore(CategoryPayload.category)
let Subcategory = new CategoryCore(CategoryPayload.subcategory)

export class MainController {
    constructor() {}

    test(payload : {
        action: string
    }) {
        return new Promise(async (resolve, reject) => {
            switch (payload.action) {
                case 'logger':
                    let q = await LoggerCore.log({type: 'error', content: 'lorem ipsum dolor', location: 'ma_fontion', method: 'test'})
                    resolve({status: 200, message: 'ok', data: q})
                    break;
                default:

            }
        })
    }

    import (payload : string) {
        return new Promise(async (resolve, reject) => {
            if(cdg.string.is_empty(payload)) {
                resolve({status: Define.clientErrorCode, message: locale.fr.controller.urlRequired, data: {payload}})
            } else {
                RssHelper.fetch(payload).then((Q : any) => {
                    if (Q.hasOwnProperty('error')) {
                        reject(Q)
                    } else {
                        let rss: any = Q.rss;
                        let channel: any = rss.channel;
                        let items: any = channel.item;
    
                        this.saveData(channel)
    
                        resolve({status: Define.clientSuccessCode, message: locale.fr.controller.successImport, data: items})
                    }
                });
            }
        }).catch((err) => {
            LoggerCore.log({type: 'error', content: err, location: 'MainController', method: 'import'});
            return({status: Define.systemErrorCode, message: err.message, data: err})
        })

    }
    select() {
        return new Promise(async (resolve, reject) => {
            let Q: any = await MysqlHelper.query(`SELECT * FROM articles`);

            let global: any = []
            if (Q) {
                for (let x in Q) {
                    let item = Q[x]

                    global.push(item)
                }
                resolve({status: Define.clientSuccessCode, message: 'ok', data: global})
            } else {
                reject(Q)
            }
        }).catch((err) => {
            console.error('SELECT CAUGHT')
            LoggerCore.log({type: 'error', content: err, location: 'MainController', method: 'select'});
            return({status: Define.systemErrorCode, message: locale.fr.system.errorTryCatchMessage, data: err})
        })
    }


    saveData(payload : any) {
        let data = JSON.stringify(payload);
        let items = payload.item;

        return new Promise(async (resolve, reject) => {
            MysqlHelper.query(`INSERT INTO imports (rawContent) VALUE('${data}')`).then(async (Q : any) => {
                if (Q.hasOwnProperty('error')) 
                    reject(Q);
                

                for (let x in items) {
                    let item: any = items[x];

                    let isItem: any = await this.isItem(item.link)

                    if (isItem === false) {
                        MysqlHelper.query(`INSERT INTO articles (title, description, externalId, publicationDate, link, mainPicture) VALUES ('${
                            item.title
                        }','${
                            item.description
                        }','${
                            item.guid.$t
                        }','${
                            item.pubDate
                        }','${
                            item.link
                        }','${
                            item["media:content"].url
                        }')`)
                    } else {
                        MysqlHelper.query(`UPDATE articles SET title = '${item.title}', description = '${item.description}', externalId = '${item.guid.$t}', publicationDate = '${item.pubDate}', link = '${item["media:content"].url}', mainPicture = '${item.link}' WHERE externalId = '${item.guid.$t}'`)
                    }
                }

                resolve(Q);
            })
        }).catch((err) => {
            LoggerCore.log({type: 'error', content: err, location: 'MainController', method: 'save'});
            return({status: Define.systemErrorCode, message: err.message, data: err})
        })

    }

    isItem(payload : any) {

        return new Promise(async (resolve, reject) => {
            MysqlHelper.query(`SELECT * FROM articles WHERE externalId = '${payload}'`).then((Q : any) => {
                if (Q.hasOwnProperty('error')) 
                    reject(Q);
                

                if (Q.length > 0) {
                    resolve(true)
                } else {
                    resolve(false);
                }
            })
        }).catch((err) => {
            LoggerCore.log({type: 'error', content: err, location: 'MainController', method: 'isItem'});
            return({status: Define.systemErrorCode, message: err.message, data: err})
        })

    }
    isChannel(payload : any) {

        return new Promise(async (resolve, reject) => {
            MysqlHelper.query(`SELECT * FROM imports WHERE rawContent = '${payload}'`).then((Q : any) => {
                if (Q.hasOwnProperty('error')) 
                    reject(Q);
                

                if (Q.length > 0) {
                    resolve(true)
                } else {
                    resolve(false);
                }
            })
        }).catch((err) => {
            LoggerCore.log({type: 'error', content: err, location: 'MainController', method: 'isItem'});
            return({status: Define.systemErrorCode, message: err.message, data: err})
        })

    }
}
