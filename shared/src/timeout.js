const timeoutsIdNameMap = {};

export default class Timeout {

    static Set(name, callback, delay) {
        if (timeoutsIdNameMap.hasOwnProperty(name)) {
            clearTimeout(timeoutsIdNameMap[name]);
        }

        timeoutsIdNameMap[name] = setTimeout(callback, delay);
    }

    static Clear(name) {
        if (timeoutsIdNameMap.hasOwnProperty(name)) {
            clearTimeout(timeoutsIdNameMap[name]);
            delete timeoutsIdNameMap[name];
        }
    }

}
