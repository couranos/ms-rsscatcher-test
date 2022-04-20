import {Model} from 'mongoose';
import { LoggerCore } from '../../core';
import { locale } from '../../data';
import {cdg, Define} from '../../utils';

export class MongoDbSet {
    static defaultModel : typeof Model

    /* ------------------------------------
    | ENREGISTRER UN DOCUMENT
     ----------------------------------- */
    static save(data : Object) {
        return new Promise((resolve, reject) => {
            const Q = new this.defaultModel(data);

            Q.save().then((doc : any) => {
                if (!doc) {
                    reject(doc);
                } else {
                    resolve(doc)
                }
            })
        }).catch((e : any) => {
            LoggerCore.log({type: 'error', content: e, location: 'MongoDbSet', method: 'save'});
            return {error: true, data: e, message: locale.fr.system.errorTryCatchMessage};
        });
    }

    /* ------------------------------------
    | MODIFIER UN DOCUMENT
     ----------------------------------- */
    static update(key : object, data : object) {
        return new Promise((resolve, reject) => {
            this.defaultModel.updateOne(key, data, {
                upsert: false
            }, (err:any, doc:any) => {
                if (err) {
                    reject(err)
                } else {
                    resolve(doc);
                }
            });
        }).catch((e : any) => {
            LoggerCore.log({type: 'error', content: e, location: 'MongoDbSet', method: 'update'});
            return {error: true, data: e, message: locale.fr.system.errorTryCatchMessage};
        });
    }

    /* ------------------------------------
    | SUPPRIMER UN DOCUMENT
     ----------------------------------- */
    static remove(params : any) {
        return new Promise((resolve, reject) => {
            this.defaultModel.deleteOne(params).then((doc : any) => {
                if (!doc) {
                    reject(doc);
                } else {
                    resolve(doc)
                }
            })
        }).catch((e : any) => {
            LoggerCore.log({type: 'error', content: e, location: 'MongoDbSet', method: 'remove'});
            return {error: true, data: e, message: locale.fr.system.errorTryCatchMessage};
        });
    }

    /* ------------------------------------
    | SELECTIONE DES DOCUMENTS
     ----------------------------------- */
    static select(query : {
        params?: any,
        excludes?: any,
        sort?: any
    }) {
        return new Promise(async (resolve, reject) => {
            query.params = (cdg.string.is_empty(query.params) ? {} : query.params);
            query.excludes = (cdg.string.is_empty(query.excludes) ? {} : query.excludes);
            query.sort = (cdg.object.is_empty(query.sort) ? {
                createdAt: '-1'
            } : query.sort);

            let doc = await this.defaultModel.find(query.params, query.excludes, query.sort).lean()

            if (!doc) {
                reject(doc);
            } else {
                resolve(doc)
            }
        }).catch((e : any) => {
            LoggerCore.log({type: 'error', content: e, location: 'MongoDbSet', method: 'select'});
            return {error: true, data: e, message: locale.fr.system.errorTryCatchMessage};
        });
    }

    /* ------------------------------------
    | SELECTIONE UN DOCUMENT
     ----------------------------------- */
    static selectOne(params : Object) {
        return new Promise((resolve, reject) => {
            this.defaultModel.findOne(params, (err:any, doc: any) => {
                if(err) {
                    reject(err)
                } else {
                    resolve(doc);
                }
            }).lean()
        }).catch((e : any) => {
            LoggerCore.log({type: 'error', content: e, location: 'MongoDbSet', method: 'selectOne'});
            return {error: true, data: e, message: locale.fr.system.errorTryCatchMessage};
        });
    }

    /* ------------------------------------
    | SELECTIONE LE DERNIER DOCUMENT ENREGISTRE
     ----------------------------------- */
    static selectLastOne(sort : any = {
        'createdAt': -1
    }) {
        return new Promise((resolve, reject) => {
            this.defaultModel.findOne({}, {}, {
                sort: sort
            }, function (err:any, doc: any) {
                if(err) {
                    reject(err)
                } else {
                    resolve(doc);
                }
            })
        }).catch((e : any) => {
            LoggerCore.log({type: 'error', content: e, location: 'MongoDbSet', method: 'selectLastOne'});
            return {error: true, data: e, message: locale.fr.system.errorTryCatchMessage};
        });
    }

    /* ------------------------------------
    | VERIFIE L'EXISTANCE D'UN DOCUMENT ENREGISTRE
     ----------------------------------- */
    static exist(params : Object) {
        return new Promise(async (resolve) => {
            let Q = await this.defaultModel.findOne(params).select("-__v").lean();
            if (Q == null) {
                resolve(false);
            } else {
                resolve(true);
            }
        }).catch((e : any) => {
            LoggerCore.log({type: 'error', content: e, location: 'MongoDbSet', method: 'exist'});
            return {error: true, data: e, message: locale.fr.system.errorTryCatchMessage};
        });
    }

    /* ------------------------------------
    | SUPPRIME UN DOCUMENT ENREGISTRE AVEC ERREUR SURVENUE
     ----------------------------------- */
    static rollbackSave(params : any) {
        return new Promise((resolve, reject) => {
            this.remove(params).then((remove : any) => {
                if (remove.error) {
                    reject(remove);
                } else {
                    resolve(true)
                }
            })
        }).catch((e : any) => {
            LoggerCore.log({type: 'error', content: e, location: 'MongoDbSet', method: 'rollbackSave'});
            return {error: true, data: e, message: locale.fr.system.errorTryCatchMessage};
        });
    }

    /* ------------------------------------
    | VERIFIE SI UN DOCUMENT POSSEDE UN CLE UNIQ
     ----------------------------------- */
    static async ownData(params : object) {
        let Q = await this.defaultModel.findOne(params);
        return !! Q;
    }
}
