import express, {Router} from 'express';
import {routeDecorator} from './route.decorators';
import {cdg, config} from '../utils';
import {MainController} from '../http/controllers';

const Controller = new MainController()
const route = Router();

route.get('/container', (req : any, res : any) => {
    let Q = new Promise(async (resolve, reject) => {
        resolve({status: 201, message: 'Service is Up', data: `version: ${config.package.version}`});
    })
    return cdg.api(res, Q);
});

route.post('/import', async (req : any, res : any) => {
    let siteRssUrl: any = req.query.siteRssUrl;

    let Q = Controller.import(siteRssUrl)

    return cdg.api(res, Q);
});
route.get('/articles', async (req : any, res : any) => {
    let Q = Controller.select()

    return cdg.api(res, Q);
});


export class MainRoute {
    @routeDecorator(route)
    static router : any;
    constructor() {}
}
