let fs = require("fs");
import path from "path";
import {cdg, config} from "../utils";

const levels = ['info', 'debug', 'warn', 'error'];

export class LoggerCore {
    static type: string;
    static content: string;
    static location: string;
    static method: string;

    static log (payload: {type: string, content: string, location: string, method: string}) {
        this.type = payload.type
        this.content = payload.content
        this.location = payload.location
        this.method = payload.method

        if(cdg.inArray(this.type, levels)) {
            LoggerCore.createLog();
        } else {
            payload.type = 'error'
            LoggerCore.createLog();
        }
    }
    static createLog() {
        try {
            let root:any;
            let currentDate: any = new Date().toISOString()

            if(cdg.string.is_empty(this.location)) {
                root = `${config.paths.logger}mixed`
            } else {
                root = `${config.paths.logger}${this.location}`
            }
            root = path.join(cdg.root() + root);

            if (!fs.existsSync(root)){
                console.log('Générating log directory...', currentDate)
                fs.mkdirSync(root, { recursive: true, mask: 0o777 });
                console.log('Done!', new Date().toISOString())
            }
            let filename = cdg.dateOnlyFormat(currentDate);
            const logStream = fs.createWriteStream(root + '/' + filename + '.log', {
                flags: 'a',
                mode: 0o777,
            });
            if(this.type !== 'info') {
                logStream.write(`[${this.type}]::${currentDate}::${this.location}::${this.method}::${this.content.replace('\n', '')}\n`);
            }
            
            console.log('\nNEW LOG ->', currentDate)
            console.log(this.content.replace('\n', ''))
        } catch (error) {
            console.log('ERREUR::', error)
        }
    }
};
