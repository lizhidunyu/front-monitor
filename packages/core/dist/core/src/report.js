"use strict";
/**
 * @description: 上报数据信息
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleReportData = exports.handleReportTime = exports.reportData = exports.lazyReport = void 0;
const utils_1 = require("../../utils");
const config_1 = require("./config");
const cache_data_1 = require("./cache-data");
// TODO:可以设置不同的类型，不同的类型对应不同的枚举info
// 1.缓存数据，延迟上报 | 数据量达到一定大小上报
let timer = null;
let cacheStore = new cache_data_1.CacheData();
const lazyReport = (type, data, timeout = 3000) => {
    cacheStore.addCache(type, data);
    clearTimeout(timer);
    const handleCacheData = () => {
        const cacheArr = cacheStore.getCache();
        if (cacheArr === null || cacheArr === void 0 ? void 0 : cacheArr.length) {
            for (let item of cacheArr) {
                const [type, data] = item;
                (0, exports.reportData)(type, data);
            }
            cacheStore.clearCache();
        }
    };
    timer = setTimeout(() => {
        handleCacheData();
    }, timeout);
    // 添加兜底方案，页面关闭之前上报
    window.addEventListener('beforeunload', function () {
        handleCacheData();
    });
};
exports.lazyReport = lazyReport;
// 2.上报数据
const reportData = (type, data) => {
    if (!config_1.config.url) {
        console.error('请设置上传 url 地址');
    }
    const reportParams = Object.assign(Object.assign({ id: (0, utils_1.generateUniqueId)(type, new Date().getTime()) }, config_1.config), { type,
        data, currentTime: new Date().getTime(), currentPage: window.location.href, ua: navigator.userAgent //ua信息
     });
    const reportParamsStr = JSON.stringify(reportParams);
    (0, exports.handleReportTime)(reportParamsStr, config_1.config.reportConfig);
};
exports.reportData = reportData;
// 2.上报时机
const handleReportTime = (data, reportConfig) => {
    const { isImmediate } = reportConfig;
    // 立即上报
    if (isImmediate) {
        (0, exports.handleReportData)(data, reportConfig);
        return;
    }
    else {
        //改写window.requestIdleCallback
        window.requestIdleCallback(() => {
            (0, exports.handleReportData)(data, reportConfig);
        }, { timeout: 3000 });
    }
};
exports.handleReportTime = handleReportTime;
// 3.上报方式，真正上报的地方
const handleReportData = (data, reportConfig) => {
    const { isImgReport } = reportConfig;
    // 图片上传
    if (isImgReport) {
        const img = new Image();
        img.src = `${config_1.config.url}?data=${encodeURIComponent(data)}`;
        return;
    }
    // window.navigator.sendBeacon
    if ((0, utils_1.isSupportSendBeacon)()) {
        console.log('config.url:', config_1.config.url, 'data:', data);
        window.navigator.sendBeacon(config_1.config.url, data);
    }
    else {
        // xhr
        const xhr = new XMLHttpRequest();
        utils_1.originalOpen.call(xhr, 'post', config_1.config.url, true);
        utils_1.originalSend.call(xhr, data);
    }
};
exports.handleReportData = handleReportData;