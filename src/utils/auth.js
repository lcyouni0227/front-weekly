const TokenKey = 'token'

export function getToken() {
    return sessionStorage.getItem(TokenKey)
}

export function setToken(toKen) {
    return sessionStorage.setItem(TokenKey, toKen);
}

export function removeToken() {
    return sessionStorage.removeItem(TokenKey);
}

