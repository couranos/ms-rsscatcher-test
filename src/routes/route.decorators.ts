import {config} from '../utils';
export const routesRegister = new Array<any>();
export const routeDecorator = (router: any)  => {
    return (target: any, property: string) => {
            target[property] = router;
            routesRegister.push(router);
    }
};

export function setRoutes(app: any) {
    let path = config.server.apiPath
    
    app.use(path, routesRegister);
};