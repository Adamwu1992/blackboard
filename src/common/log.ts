function log(thisArg?: any, ...argArray: any[]) {
    if (DEBUG) {
        console.log.apply(console, arguments)
    }
}