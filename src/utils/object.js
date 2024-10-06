export function objectPropsAsString(object) {
    let ret = "{"
    for (let prop in object) {
        ret += (prop + "=" + object[prop] + ",")
    }

    ret += "}"
    return ret;
}
