export function objectPropsAsString(object) {
    let ret = "{"
    for (let prop in object) {
        ret += (prop + "=" + object[prop] + ",")
    }

    ret += "}"
    return ret;
}

// Borrowed from next
export function isNotFoundError(error) {
    if (typeof error !== "object" || error === null || !("digest" in error)) {
        return false;
    }
    return error.digest === "NEXT_NOT_FOUND";
}
