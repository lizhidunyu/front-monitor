"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CacheData = void 0;
class CacheData {
    constructor() {
        this.cacheStore = new Map();
    }
    addCache(type, data) {
        this.cacheStore.set(type, this.cacheStore.get(type) ? [...this.cacheStore.get(type), data] : [data]);
    }
    getCache() {
        const cacheArr = [];
        for (const [key, value] of this.cacheStore) {
            for (const item of value) {
                cacheArr.push([key, item]);
            }
        }
        return cacheArr;
    }
    length() {
        var _a;
        return (_a = this.getCache()) === null || _a === void 0 ? void 0 : _a.length;
    }
    clearCache() {
        this.cacheStore = new Map();
    }
}
exports.CacheData = CacheData;
