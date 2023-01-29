import axios from 'axios'

interface IHttp {
    get<T>(url: string, params?: unknown): Promise<T>,
    post<T>(url: string, params?: unknown): Promise<T>,
}

interface IResp {
    code: number,
    data: any,
    msg: string
}

const instance = axios.create({
    baseURL: 'http://localhost:3000/',
    headers: {},
    timeout: 5000,
})


// 请求拦截器
instance.interceptors.request.use((config) => {
    // 有token的话携带上
    if (localStorage.getItem('token')&&localStorage.getItem('user_id')){
        if (!config.data){
            config.data={}
        }
        config.data.token=localStorage.getItem('token')
        config.data.user_id=localStorage.getItem('user_id')
    }
    return config;
}, (err) => {
    return Promise.reject(err);
});

// 响应拦截器
instance.interceptors.response.use((response) => {

    return response.data;
}, (err) => {
    return Promise.reject(err);
});


const http: IHttp = {
    get(url, params) {
        return new Promise<any>((resolve, reject) => {
            instance.get(url, { params }).then(res => {
                resolve(res.data);
            }).catch(err => {
                reject(err);
            });
        });
    },
    post(url: string, params) {
        return new Promise<any>((resolve, reject) => {
            instance.post(url, params).then((res) => {
                resolve(res.data);
            }).catch((err) => {
                reject(err);
            })
        })
    }
}

export default http;