import axios from 'axios';
import {Message, Loading} from "element-ui";
import qs from 'qs';
import {baseUrl, timeout, httpCode} from './../config/config'
import router from "../router";


let loadingInstance = null;
const http = axios.create({
    baseURL: baseUrl,
    timeout: timeout,
});

function startLoading(text = '') { //使用Element loading-start 方法
    loadingInstance = Loading.service({
        lock: true,
        text: text,
        background: 'rgba(255, 255, 255, 0.5)'
    })
}

function endLoading() { //使用Element loading-close 方法
    if (loadingInstance) {
        loadingInstance.close()
    }
}

/**
 *
 * 请求发出后检查返回的状态码,统一捕获正确和错误的状态码，正确就直接返回response,错误就自定义一个返回对象
 * @param {object} response 响应对象
 * @param isSubmit 是否是提交接口
 * @return {object} 响应正常就返回响应数据否则返回错误信息
 */
function checkStatus(response, isSubmit) {

    // 如果状态码正常就直接返回数据,这里的状态码是htttp响应状态码有400，500等，不是后端自定义的状态码
    if (response && ((response.status === 200 || response.status === 304 || response.status === 400))) {
        return checkCode(response.data, isSubmit); // 直接返回http response响应的data,此data会后端返回的数据数据对象，包含后端自定义的code,message,data属性
    } else {
        let error = response;
        if (error && error.response) {
            switch (error.response.status) {
                case 400:
                    error.message = '请求错误(400)';
                    break;
                case 401:
                    error.message = '未授权，请重新登录(401)';
                    break;
                case 403:
                    error.message = '拒绝访问(403)';
                    break;
                case 404:
                    error.message = '请求出错(404)';
                    break;
                case 408:
                    error.message = '请求超时(408)';
                    break;
                case 500:
                    error.message = '服务器错误(500)';
                    break;
                case 501:
                    error.message = '服务未实现(501)';
                    break;
                case 502:
                    error.message = '网络错误(502)';
                    break;
                case 503:
                    error.message = '服务不可用(503)';
                    break;
                case 504:
                    error.message = '网络超时(504)';
                    break;
                case 505:
                    error.message = 'HTTP版本不受支持(505)';
                    break;
                default:
                    error.message = `连接出错(${error.response.status})!`;
            }
        } else {
            error.message = '连接服务器失败!'
        }
        Message({
            showClose: true,
            type: 'error',
            message: error.message
        });
        endLoading();
    }
}

/**
 * 检查完状态码后需要检查后如果成功了就需要检查后端的状态码处理网络正常时后台语言返回的响应
 * @param {object} res 是后台返回的对象或者自定义的网络异常对象，不是http 响应对象
 * @return {object} 返回后台传过来的数据对象，包含code,message,data等属性，
 **/
function checkCode(res, isSubmit) {
    let code = res.code;
    if (isSubmit) {
        if (httpCode instanceof Array) {
            for (let i = 0; i < httpCode.length; i++) {
                if (httpCode[i] == code) {
                    Message(httpCode[i].info);
                    if (httpCode[i].path) {
                        router.push({
                            path: httpCode[i].path
                        })
                    }
                    break;
                }
            }
        }
    }
    endLoading();
    return res;
}

/**
 * axios请求拦截器
 * @param {object} config axios请求配置对象
 * @return {object} 请求成功或失败时返回的配置对象或者promise error对象
 **/
http.interceptors.request.use(config => {

    return config;
}, error => {

    endLoading()
    return Promise.reject(error);
});
/**
 * axios 响应拦截器
 * @param {object} response 从服务端响应的数据对象或者error对象
 * @return {object} 响应成功或失败时返回的响应对象或者promise error对象
 **/
http.interceptors.response.use(config => {

    return config;
}, error => {


    endLoading();
    return Promise.resolve(error)
});
export default {
    /**
     *
     * @param url 地址
     * @param data 数据
     * @param isLoading 是否需要动画,false不需要
     * @param isSubmit 是否是提交接口
     * @returns {Promise<AxiosResponse<any>>}
     */
    post(url, data = {}, isLoading = true, isSubmit = false) {
        if (isLoading) {
            startLoading();
        }
        return http({
                method: 'post',
                url,
                data: qs.stringify(data),
                headers: {
                    'X-Requested-With': 'XMLHttpRequest',
                    "Content-Type": "application/x-www-form-urlencoded; charset=utf-8;"
                }
            }
        ).then(res => {
            return checkStatus(res, isSubmit);
        })

    },
    /**
     *
     * @param url 地址
     * @param params 数据
     * @param isLoading 是否需要动画,false不需要
     * @param isSubmit 是否是提交接口
     * @returns {Promise<AxiosResponse<any>>}
     */
    get(url, params = {}, isLoading = true, isSubmit = true) {
        if (isLoading) {
            startLoading();
        }
        return http({
                method: 'get',
                params,
                url,
                headers: {
                    'X-Requested-With': 'XMLHttpRequest'
                }
            }
        ).then(res => {
            return checkStatus(res, isSubmit);
        })

    },
    /**
     *
     * @param url
     * @param data
     * @param isLoading
     * @returns {Promise<AxiosResponse<any>>}
     */
    fileUpload(url, data = {}, isLoading, isSubmit = false) {
        if (isLoading) {
            startLoading();
        }
        return axios({
            method: 'post',
            url: url,
            data,
            headers: {
                'Content-Type': 'multipart/form-data;'
            },
        }).then((res) => {
            return checkStatus(res, isSubmit)
        })
    },

    /**
     *
     * @param url
     * @param data
     * @param isLoading
     * @returns {Promise<AxiosResponse<any>>}
     */
    fileDown(url, data = {}, isLoading, isSubmit = false) {
        if (isLoading) {
            startLoading();
        }
        return axios({
            method: 'get',
            url: url,
            params: data,
            headers: {
                'Content-Type': 'application/x-download;charset=UTF-8'
            },
            responseType: 'blob',
        }).then((res) => {
            return res
        })
    },
    Axios: axios

}


