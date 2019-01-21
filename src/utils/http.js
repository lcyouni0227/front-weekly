import axios from 'axios';
import {Message, Loading} from "element-ui";
import {baseUrl, timeout} from './../config/config'
import router from "../router";

let loadingInstance = null;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8;';
const http = axios.create({
    baseURL: baseUrl,
    timeout: timeout,
    crossDomain: true,  //设置cross跨域
    withCredentials: true   //设置cross跨域 并设置访问权限 允许跨域携带cookie信息
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
function checkStatus(res, isMessage) {
    // 如果状态码正常就直接返回数据,这里的状态码是htttp响应状态码有400，500等，不是后端自定义的状态码
    if (res && ((res.status === 200 || res.status === 304 || res.status === 400))) {
        return checkCode(res.data, isMessage); // 直接返回http response响应的data,此data会后端返回的数据数据对象，包含后端自定义的code,message,data属性
    } else {
        if (res && res.status) {
            switch (res.status) {
                case 400:
                    res.message = '请求错误(400)';
                    break;
                case 401:
                    res.message = '未授权，请重新登录(401)';
                    break;
                case 403:
                    res.message = '拒绝访问(403)';
                    break;
                case 404:
                    res.message = '请求出错(404)';
                    break;
                case 408:
                    res.message = '请求超时(408)';
                    break;
                case 500:
                    res.message = '服务器错误(500)';
                    break;
                case 501:
                    res.message = '服务未实现(501)';
                    break;
                case 502:
                    res.message = '网络错误(502)';
                    break;
                case 503:
                    res.message = '服务不可用(503)';
                    break;
                case 504:
                    res.message = '网络超时(504)';
                    break;
                case 505:
                    res.message = 'HTTP版本不受支持(505)';
                    break;
                default:
                    res.message = `连接出错(${res.status})!`;
            }
        } else {
            res.message = '连接服务器失败!'
        }
        Message({
            showClose: true,
            type: 'error',
            message: res.message
        });
    }
}

/**
 * 检查完状态码后需要检查后如果成功了就需要检查后端的状态码处理网络正常时后台语言返回的响应
 * @param {object} res 是后台返回的对象或者自定义的网络异常对象，不是http 响应对象
 * @return {object} 返回后台传过来的数据对象，包含code,message,data等属性，
 **/
function checkCode(res, isMessage) {
    if (!isMessage) {
        return res
    }
    let message = "";
    let infotype = 'error';
    switch (res.code) {
        case 1:
            message = "恭喜你，操作成功";
            infotype = "success";
            break;
        case 0:
            message = "执行失败";
            break;
        case -1:
            message = "系统异常";
            break;
        case -2:
            message = "未登陆";
            router.push({
                path: "/login"
            });
            break;
        case -3:
            message = "权限不足";
            break;
        default:
            message = "网络异常";
            break;
    }
    if (message != '') {
        Message({
            showClose: true,
            message: message,
            type: infotype
        });
    }
    return res;
}

export default {
    /**
     *
     * @param url 地址
     * @param data 数据
     * @param isLoading 是否需要动画,false不需要
     * @returns {Promise<AxiosResponse<any>>}
     */
    post(url, params = {}, isLoading = true, isMessage = true) {
        if (isLoading) {
            startLoading();
        }
        return http({
                method: 'post',
                url,
                params
            }
        ).then(res => {
            endLoading();
            return checkStatus(res, isMessage);
        }).catch(() => {
            endLoading();
            Message({
                showClose: true,
                message: '网络异常',
                type: 'error'
            });
        })
    },
    /**
     *
     * @param url 地址
     * @param params 数据
     * @param isLoading 是否需要动画,false不需要
     * @param isMessage 是否是提交接口
     * @returns {Promise<AxiosResponse<any>>}
     */
    get(url, params = {}, isLoading = true, isMessage = true) {
        if (isLoading) {
            startLoading();
        }
        return http({
                method: 'get',
                params,
                url
            }
        ).then(res => {
            endLoading();
            return checkStatus(res, isMessage);
        }).catch(() => {
            endLoading();
            Message({
                showClose: true,
                message: '网络异常',
                type: 'error'
            });
        })
    },
    /**
     *
     * @param url
     * @param data
     * @param isLoading
     * @returns {Promise<AxiosResponse<any>>}
     */
    fileUpload(url, params = {}, isLoading = true, isMessage = true) {
        if (isLoading) {
            startLoading();
        }
        return axios({
            method: 'post',
            url: url,
            params,
            headers: {
                'Content-Type': 'multipart/form-data;'
            },
        }).then((res) => {
            endLoading();
            return checkStatus(res, isMessage)
        }).catch(() => {
            endLoading();
            Message({
                showClose: true,
                message: '网络异常',
                type: 'error'
            });
        })
    },

    /**
     *
     * @param url
     * @param data
     * @param isLoading
     * @returns {Promise<AxiosResponse<any>>}
     */
    fileDown(url, params = {}, isLoading = true, isMessage = true) {
        if (isLoading) {
            startLoading();
        }
        return axios({
            method: 'post',
            url: url,
            params,
            headers: {
                'Content-Type': 'application/x-download;charset=UTF-8'
            },
            responseType: 'blob',
        }).then((res) => {
            endLoading();
            return res
        }).catch(() => {
            endLoading();
            Message({
                showClose: true,
                message: '网络异常',
                type: 'error'
            });
        })
    },
    Axios: axios
}
