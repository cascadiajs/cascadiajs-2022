function sortComp(a ,b) {
    if (a < b) return -1
    else if (b < a) return 1
    else return 0
}

function sortAsc(arr, prop) {
    return arr.sort(function(a, b) { return sortComp(a[prop], b[prop])})
}

function sortDesc(arr, prop) {
    return arr.sort(function(a, b) { return sortComp(b[prop], a[prop])})
}


module.exports = {
    sortAsc,
    sortDesc
}