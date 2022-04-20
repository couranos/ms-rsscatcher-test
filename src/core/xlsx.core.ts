import xlsx from 'node-xlsx';
import {cdg} from '../utils';

export class XlsxCore {
    static parse(payload: string) {
        return new Promise((resolve, reject) => {
            const workSheetsFromFile = xlsx.parse(payload);

            resolve(workSheetsFromFile)
        }).catch((e) => {
            cdg.konsole(e, 1)
            return {error: true, data: 'Unable to parse received payload'}
        })
    }
}
