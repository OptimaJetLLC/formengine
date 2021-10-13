import _ from "lodash";

const treeSearch = (data: any, value: any, key: any = 'key', sub: any = 'children', tempObj: any = {}) => {
    if (value && data) {
        data.find((node: any) => {
            if (node[key] == value) {
                tempObj.found = node;
                return node;
            }
            return treeSearch(node[sub], value, key, sub, tempObj);
        });
        if (tempObj.found) {
            return tempObj.found;
        }
    }
    return undefined;
};

const treeMap = (data: any, mapFunction: Function, sub: any = 'children', tempObj: any = {}) => {
    if (mapFunction && data) {
        data?.children?.map((node: any) => {
            mapFunction(node);
            return treeSearch(node[sub], mapFunction, sub, tempObj);
        });
        if (tempObj.found) {
            return tempObj.found;
        }
    }
};

export {treeSearch, treeMap};