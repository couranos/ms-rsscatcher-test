const axios = require('axios').default;

export class AxiosCore {
    static connect(baseURL: string){
        const axiosIns = axios.create({
            baseURL: baseURL,
            timeout: 10000 * 3,
            // headers: {'X-Custom-Header': 'foobar'}
        });

        return axiosIns
    }
}
