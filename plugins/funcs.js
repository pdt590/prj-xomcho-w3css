
export function uuid(title, length) {
    let uuid = "";
    let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"

    for (let i = 0; i < length; i++){
        uuid += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    
    return title.replace(/\s+/g, '-').toLowerCase() + '-' + uuid
}

export function uiid(length) {
    let uiid = "";
    let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"

    for (let i = 0; i < length; i++){
        uiid += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    
    return uiid
}

export function getKey(object, value) {
    return Object.keys(object).find(key => object[key] === value)
}

export function genUrl(title, key) {
    return title.replace(/\s+/g, '-').toLowerCase() + '-' + key.substring(0, 5)
}

export function deepCopy(arg) {
    return JSON.parse(JSON.stringify(arg))
}