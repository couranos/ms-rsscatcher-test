import express from 'express';
import helmet from 'helmet';
import {cdg, config, Define} from './utils';
import {Mongoose} from './models/db';
import {setRoutes} from './routes/route.decorators';
import cors from 'cors';
import './routes';

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static('data/uploads'));

// Router before
app.use((err : any, req : any, res : any, next : any) => {
    if (err && err.status === 400 && 'body' in err) {
        return cdg.api(res, new Promise((resolve) => {
            resolve({
                status: Define.badRequestErrorCode,
                message: 'Votre requête contient une ou plusieurs erreurs',
                data: [err.type]
            });
        }));
    }

    next();
});
// Router while
setRoutes(app);

// Router - after - 404 not found error handler
app.use((err : any, res : any) => {
    return cdg.api(res, new Promise((resolve) => {
        resolve({status: Define.notfoundErrorCode, message: 'Route introuvable ou inexistante', data: []});
    }));
});
// End Router

// Default port set to 3000
let port = config.server.port || 3000;

app.listen(port, () => {
    cdg.konsole("Serveur connecté! :: port " + port);
    // Connection to mongodb database
    const uriDb = config.mongo.uri ! + config.mongo.name ! + '?authSource=admin';
    const db = new Mongoose(uriDb, 'MongoDB connecté!');
    db.connect((Q : any) => {
        if (Q.status === 0) {
            cdg.konsole(Q.data);
        } else {
            cdg.konsole(Q.data, 1);
        }
    });
}).on('error', (err: any) => {
    console.log('ERROR::', err.code);
    if(err.code === 'EADDRINUSE') {
        cdg.konsole(`Port ${port} est déjà utilisé`, 1);
    } else {
        cdg.konsole(err, 1);
    }
});

export default app
