/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 65);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function some(value) {
    return value !== undefined;
}
exports.some = some;
function none(value) {
    return value === undefined;
}
exports.none = none;
function serializeMaybe(value) {
    if (some(value)) {
        return value;
    }
    else {
        return null;
    }
}
exports.serializeMaybe = serializeMaybe;
function deserializeMaybe(value) {
    if (value === null) {
        return undefined;
    }
    else {
        return value;
    }
}
exports.deserializeMaybe = deserializeMaybe;
function isEqual(a, b) {
    return a === b;
}
exports.isEqual = isEqual;
var MaybeCompareOptions;
(function (MaybeCompareOptions) {
    MaybeCompareOptions[MaybeCompareOptions["none"] = 0] = "none";
    MaybeCompareOptions[MaybeCompareOptions["compareUndefined"] = 1] = "compareUndefined";
})(MaybeCompareOptions = exports.MaybeCompareOptions || (exports.MaybeCompareOptions = {}));
function maybeCompare(a, b, compare = isEqual, options = MaybeCompareOptions.none) {
    if (some(a) && some(b)) {
        return compare(a, b);
    }
    if (options & MaybeCompareOptions.compareUndefined) {
        return none(a) && none(b);
    }
    return false;
}
exports.maybeCompare = maybeCompare;


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const date_utils_1 = __webpack_require__(40);
const string_utils_1 = __webpack_require__(3);
class ConsoleLogSink {
    constructor() { }
    log(message) {
        console.log(message);
    }
    logError(message) {
        console.error(message);
    }
}
exports.ConsoleLogSink = ConsoleLogSink;
class Logger {
    constructor() {
        this.sinks = [];
        this.addSink(new ConsoleLogSink());
    }
    addSink(sink) {
        this.sinks.push(sink);
    }
    formatMessage(message) {
        return `${date_utils_1.currentDateTimeString()}: ${message}`;
    }
    log(message) {
        const formattedMessage = this.formatMessage(message);
        for (const sink of this.sinks) {
            sink.log(formattedMessage);
        }
    }
    logError(error) {
        const message = errorToString(error);
        const formattedMessage = this.formatMessage(message);
        for (const sink of this.sinks) {
            sink.logError(formattedMessage);
        }
    }
}
exports.logger = new Logger();
function errorToString(error) {
    return string_utils_1.toString({ name: error.name, message: error.message });
}
exports.errorToString = errorToString;
function log(message) {
    exports.logger.log(message);
}
exports.log = log;
function logError(error) {
    exports.logger.logError(error);
}
exports.logError = logError;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const number_utils_1 = __webpack_require__(10);
const array_utils_1 = __webpack_require__(8);
var MessageType;
(function (MessageType) {
    MessageType[MessageType["handshakeV1"] = 0] = "handshakeV1";
    MessageType[MessageType["launchBrowserRequestV1"] = 1] = "launchBrowserRequestV1";
    MessageType[MessageType["launchBrowserResponseV1"] = 2] = "launchBrowserResponseV1";
    MessageType[MessageType["pageEventV1"] = 3] = "pageEventV1";
    MessageType[MessageType["configRequestV1"] = 4] = "configRequestV1";
    MessageType[MessageType["configChangedV1"] = 5] = "configChangedV1";
    MessageType[MessageType["trustUrlV1"] = 6] = "trustUrlV1";
    MessageType[MessageType["downloadCompleteV1"] = 7] = "downloadCompleteV1";
    MessageType[MessageType["logMessageV1"] = 8] = "logMessageV1";
    MessageType[MessageType["addUserTrustedOriginV1"] = 9] = "addUserTrustedOriginV1";
    MessageType[MessageType["addUserUntrustedOriginV1"] = 10] = "addUserUntrustedOriginV1";
    MessageType[MessageType["helperErrorV1"] = 11] = "helperErrorV1";
    MessageType[MessageType["dormantStateChangedV1"] = 12] = "dormantStateChangedV1";
    MessageType[MessageType["extensionReadyV1"] = 13] = "extensionReadyV1";
    MessageType[MessageType["externalAppLinkRequestV1"] = 14] = "externalAppLinkRequestV1";
    MessageType[MessageType["externalAppLinkResponseV1"] = 15] = "externalAppLinkResponseV1";
    MessageType[MessageType["isFileURLTrustedRequestV1"] = 16] = "isFileURLTrustedRequestV1";
    MessageType[MessageType["isFileURLTrustedResponseV1"] = 17] = "isFileURLTrustedResponseV1";
    MessageType[MessageType["blockedFileRequestV1"] = 18] = "blockedFileRequestV1";
    MessageType[MessageType["blockedFileResponseV1"] = 19] = "blockedFileResponseV1";
    MessageType[MessageType["popupDataRequestV1"] = 20] = "popupDataRequestV1";
    MessageType[MessageType["popupDataResponseV1"] = 21] = "popupDataResponseV1";
    MessageType[MessageType["clearRememberedDecisionsV1"] = 22] = "clearRememberedDecisionsV1";
    MessageType[MessageType["blockedPageStringsRequestV1"] = 23] = "blockedPageStringsRequestV1";
    MessageType[MessageType["blockedPageStringsResponseV1"] = 24] = "blockedPageStringsResponseV1";
    MessageType[MessageType["heartbeatV1"] = 25] = "heartbeatV1";
    MessageType[MessageType["enabledFeaturesRequestV2"] = 26] = "enabledFeaturesRequestV2";
    MessageType[MessageType["enabledFeaturesResponseV2"] = 27] = "enabledFeaturesResponseV2";
    MessageType[MessageType["clearRememberedOriginV3"] = 28] = "clearRememberedOriginV3";
    MessageType[MessageType["optionsDataRequestV3"] = 29] = "optionsDataRequestV3";
    MessageType[MessageType["optionsDataResponseV3"] = 30] = "optionsDataResponseV3";
    MessageType[MessageType["configChangedV3"] = 31] = "configChangedV3";
    MessageType[MessageType["reputationChangedV3"] = 32] = "reputationChangedV3";
    MessageType[MessageType["configChangedV4"] = 33] = "configChangedV4";
    MessageType[MessageType["blockedPageDataRequestV4"] = 34] = "blockedPageDataRequestV4";
    MessageType[MessageType["blockedPageDataResponseV4"] = 35] = "blockedPageDataResponseV4";
    MessageType[MessageType["configChangedV5"] = 36] = "configChangedV5";
    MessageType[MessageType["popupDataResponseV5"] = 37] = "popupDataResponseV5";
    MessageType[MessageType["blockedPageDataResponseV6"] = 38] = "blockedPageDataResponseV6";
    MessageType[MessageType["trustUrlV6"] = 39] = "trustUrlV6";
    MessageType[MessageType["configChangedV7"] = 40] = "configChangedV7";
    MessageType[MessageType["trustUrlV8"] = 41] = "trustUrlV8";
    MessageType[MessageType["dontAskAgainV8"] = 42] = "dontAskAgainV8";
    MessageType[MessageType["configChangedV8"] = 43] = "configChangedV8";
    MessageType[MessageType["popupDataResponseV9"] = 44] = "popupDataResponseV9";
    MessageType[MessageType["dontAskAgainV9"] = 45] = "dontAskAgainV9";
    MessageType[MessageType["configChangedV9"] = 46] = "configChangedV9";
    MessageType[MessageType["stopHelperV10"] = 47] = "stopHelperV10";
    MessageType[MessageType["edgeAckV10"] = 48] = "edgeAckV10";
    MessageType[MessageType["endOfStreamV10"] = 49] = "endOfStreamV10";
    MessageType[MessageType["heartbeatV10"] = 50] = "heartbeatV10";
    MessageType[MessageType["popupDataResponseV11"] = 51] = "popupDataResponseV11";
    MessageType[MessageType["configChangedV11"] = 52] = "configChangedV11";
    MessageType[MessageType["configChangedV12"] = 53] = "configChangedV12";
    MessageType[MessageType["minMessageType"] = 0] = "minMessageType";
    MessageType[MessageType["maxMessageType"] = 53] = "maxMessageType";
})(MessageType = exports.MessageType || (exports.MessageType = {}));
function isMessageType(type) {
    return number_utils_1.isInRange(type, MessageType.minMessageType, MessageType.maxMessageType);
}
exports.isMessageType = isMessageType;
function isFrequentlySentMessageType(type) {
    const frequentlySentMessageTypes = [
        MessageType.logMessageV1,
        MessageType.pageEventV1,
        MessageType.heartbeatV1,
        MessageType.edgeAckV10
    ];
    return array_utils_1.has(frequentlySentMessageTypes, type);
}
exports.isFrequentlySentMessageType = isFrequentlySentMessageType;
function isEdgeAckWorkaround(type) {
    return type === MessageType.edgeAckV10;
}
exports.isEdgeAckWorkaround = isEdgeAckWorkaround;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const murmur_hash_1 = __webpack_require__(11);
const hash_map_1 = __webpack_require__(16);
const url_utils_1 = __webpack_require__(4);
var StringCompareOptions;
(function (StringCompareOptions) {
    StringCompareOptions[StringCompareOptions["CaseSensitive"] = 0] = "CaseSensitive";
    StringCompareOptions[StringCompareOptions["LowerCase"] = 1] = "LowerCase";
    StringCompareOptions[StringCompareOptions["LocaleLowerCase"] = 2] = "LocaleLowerCase";
})(StringCompareOptions = exports.StringCompareOptions || (exports.StringCompareOptions = {}));
function compareStrings(a, b, options = StringCompareOptions.CaseSensitive) {
    switch (options) {
        case StringCompareOptions.CaseSensitive:
            return a === b;
        case StringCompareOptions.LowerCase:
            return a.toLowerCase() === b.toLowerCase();
        case StringCompareOptions.LocaleLowerCase:
            return a.toLocaleLowerCase() === b.toLocaleLowerCase();
        default:
            throw new Error('stringCompare');
    }
}
exports.compareStrings = compareStrings;
function hashString(value) {
    let hash = 0;
    hash = murmur_hash_1.murmurHash(value, hash);
    return hash;
}
exports.hashString = hashString;
function makeStringHashSet() {
    return new hash_map_1.HashSet(hashString, compareStrings);
}
exports.makeStringHashSet = makeStringHashSet;
function makeStringHashMap() {
    return new hash_map_1.HashMap(hashString, compareStrings);
}
exports.makeStringHashMap = makeStringHashMap;
function line(value) {
    return `${value}\n`;
}
function surround(value, typeName, openTag, closeTag, indentLevel) {
    const indent = makeIndent(indentLevel - 1);
    if (value) {
        return `${line(`${typeName}${openTag}`)}${value}${indent(closeTag)}`;
    }
    else {
        return `${typeName}${openTag}${closeTag}`;
    }
}
function makeKeyValuePrinter(toString, indent) {
    return (key, value) => {
        return line(indent(`${toString(key)}: ${toString(value)},`));
    };
}
function mapToString(map, seenObjects, indentLevel) {
    const indent = makeIndent(indentLevel);
    function toString(value) {
        return toStringRecursive(value, seenObjects, indentLevel);
    }
    const printKeyValue = makeKeyValuePrinter(toString, indent);
    let result = "";
    map.forEach((value, key) => {
        result += printKeyValue(key, value);
    });
    return surround(result, "Map", "{", "}", indentLevel);
}
function makeValuePrinter(toString, indent) {
    return (value) => {
        return line(indent(`${toString(value)},`));
    };
}
function setToString(set, seenObjects, indentLevel) {
    const indent = makeIndent(indentLevel);
    function toString(value) {
        return toStringRecursive(value, seenObjects, indentLevel);
    }
    const printValue = makeValuePrinter(toString, indent);
    let result = "";
    set.forEach((key) => {
        result += printValue(key);
    });
    return surround(result, "Set", "{", "}", indentLevel);
}
function arrayToString(array, seenObjects, indentLevel) {
    const indent = makeIndent(indentLevel);
    function toString(value) {
        return toStringRecursive(value, seenObjects, indentLevel);
    }
    const printValue = makeValuePrinter(toString, indent);
    let result = "";
    array.forEach((value) => {
        result += printValue(value);
    });
    return surround(result, "Array", "[", "]", indentLevel);
}
function objectToString(value, seenObjects, indentLevel) {
    const indent = makeIndent(indentLevel);
    function toString(value) {
        return toStringRecursive(value, seenObjects, indentLevel);
    }
    const printKeyValue = makeKeyValuePrinter(toString, indent);
    let result = "";
    for (const propertyName of Object.getOwnPropertyNames(value)) {
        const property = value[propertyName];
        if (!isFunction(property)) {
            result += printKeyValue(propertyName, property);
        }
    }
    return surround(result, typeName(value), "{", "}", indentLevel);
}
const defaultToStringFunction = (() => {
    const emptyObject = {};
    return emptyObject.toString;
})();
function defaultToString(value) {
    return defaultToStringFunction.call(value);
}
function hasCustomToString(value) {
    return value.toString !== defaultToStringFunction;
}
function isFunction(value) {
    return value instanceof Function;
}
function makeIndentation(indentLevel) {
    if (indentLevel <= 0) {
        return "";
    }
    const tab = "\t";
    let indentation = "";
    for (let level = 0; level < indentLevel; level += 1) {
        indentation += tab;
    }
    return indentation;
}
function makeIndent(indentLevel) {
    const indentation = makeIndentation(indentLevel);
    return (value) => {
        return `${indentation}${value}`;
    };
}
function typeOf(value) {
    return value.constructor;
}
function typeName(value) {
    return typeOf(value).name;
}
function toStringRecursive(value, seenObjects, indentLevel) {
    function didSee(value) {
        return seenObjects.has(value);
    }
    function seeObject(value) {
        seenObjects.add(value);
        return seenObjects;
    }
    const nextIndentLevel = indentLevel + 1;
    if (value === undefined) {
        return "undefined";
    }
    else if (value === null) {
        return "null";
    }
    else if (typeof value === "boolean") {
        return value.toString();
    }
    else if (typeof value === "number") {
        return value.toString();
    }
    else if (typeof value === "string") {
        return value;
    }
    else if (value instanceof Array) {
        return arrayToString(value, seeObject(value), nextIndentLevel);
    }
    else if (value instanceof Map) {
        return mapToString(value, seeObject(value), nextIndentLevel);
    }
    else if (value instanceof Set) {
        return setToString(value, seeObject(value), nextIndentLevel);
    }
    else if (value instanceof URL) {
        return url_utils_1.URLToString(value);
    }
    else if (isFunction(value)) {
        return typeName(value);
    }
    else if (didSee(value)) {
        return typeName(value);
    }
    else if (hasCustomToString(value)) {
        return value.toString();
    }
    else {
        return objectToString(value, seeObject(value), nextIndentLevel);
    }
}
function toString(value, initialIndentLevel = 0) {
    const seenObjects = new Set();
    const indentLevel = initialIndentLevel;
    return toStringRecursive(value, seenObjects, indentLevel);
}
exports.toString = toString;
function safeToString(value) {
    if (value === undefined) {
        return "undefined";
    }
    else if (value === null) {
        return "null";
    }
    else {
        return value.toString();
    }
}
exports.safeToString = safeToString;
function isString(value) {
    return typeof value === 'string';
}
exports.isString = isString;
function isEmptyString(value) {
    return value.length === 0;
}
exports.isEmptyString = isEmptyString;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const string_utils_1 = __webpack_require__(3);
const murmur_hash_1 = __webpack_require__(11);
const hash_map_1 = __webpack_require__(16);
const origin_1 = __webpack_require__(9);
var UrlCompareOptions;
(function (UrlCompareOptions) {
    UrlCompareOptions[UrlCompareOptions["Default"] = 0] = "Default";
    UrlCompareOptions[UrlCompareOptions["IgnoreSearchParams"] = 1] = "IgnoreSearchParams";
})(UrlCompareOptions = exports.UrlCompareOptions || (exports.UrlCompareOptions = {}));
var UrlComponent;
(function (UrlComponent) {
    UrlComponent[UrlComponent["Protocol"] = 1] = "Protocol";
    UrlComponent[UrlComponent["Username"] = 2] = "Username";
    UrlComponent[UrlComponent["Password"] = 4] = "Password";
    UrlComponent[UrlComponent["Host"] = 8] = "Host";
    UrlComponent[UrlComponent["Port"] = 16] = "Port";
    UrlComponent[UrlComponent["Pathname"] = 32] = "Pathname";
    UrlComponent[UrlComponent["Search"] = 64] = "Search";
    UrlComponent[UrlComponent["All"] = 127] = "All";
})(UrlComponent || (UrlComponent = {}));
function compareUrlComponents(a, b, components) {
    function compare(component) {
        return (components & component) !== 0;
    }
    if (compare(UrlComponent.Protocol) && a.protocol !== b.protocol) {
        return false;
    }
    if (compare(UrlComponent.Username) && a.username !== b.username) {
        return false;
    }
    if (compare(UrlComponent.Password) && a.password !== b.password) {
        return false;
    }
    if (compare(UrlComponent.Host) && a.host !== b.host) {
        return false;
    }
    if (compare(UrlComponent.Port) && a.port !== b.port) {
        return false;
    }
    if (compare(UrlComponent.Pathname) && a.pathname !== b.pathname) {
        return false;
    }
    if (compare(UrlComponent.Search) && a.search !== b.search) {
        return false;
    }
    return true;
}
function removeComponent(components, component) {
    return components & (~component);
}
function isSameUrl(a, b, options = UrlCompareOptions.Default) {
    switch (options) {
        case UrlCompareOptions.Default:
            return compareUrlComponents(a, b, UrlComponent.All);
        case UrlCompareOptions.IgnoreSearchParams:
            return compareUrlComponents(a, b, removeComponent(UrlComponent.All, UrlComponent.Search));
        default:
            throw new Error(`isSameUrl: invalid options: ${options}`);
    }
}
exports.isSameUrl = isSameUrl;
function isURL(value) {
    return value instanceof URL;
}
exports.isURL = isURL;
function parseUrl(spec) {
    try {
        return new URL(spec);
    }
    catch (e) {
        return undefined;
    }
}
exports.parseUrl = parseUrl;
function maybeParseUrl(spec) {
    const url = parseUrl(spec);
    if (url === undefined) {
        return spec;
    }
    else {
        return url;
    }
}
exports.maybeParseUrl = maybeParseUrl;
function parseURLIfNecessary(urlOrSpec) {
    if (isURL(urlOrSpec)) {
        return urlOrSpec;
    }
    else {
        return parseUrl(urlOrSpec);
    }
}
exports.parseURLIfNecessary = parseURLIfNecessary;
function isSameUrlOrSpec(a, b, options = UrlCompareOptions.Default) {
    if ((a instanceof URL) && (b instanceof URL)) {
        return isSameUrl(a, b);
    }
    else if ((typeof a === "string") && (typeof b === "string")) {
        return a === b;
    }
    else {
        return undefined;
    }
}
exports.isSameUrlOrSpec = isSameUrlOrSpec;
function isFileUrl(url) {
    return string_utils_1.compareStrings(url.protocol, origin_1.Scheme.FILE);
}
exports.isFileUrl = isFileUrl;
function isExtensionUrl(url) {
    const extensionSchemes = [
        origin_1.Scheme.CHROME_EXTENSION,
        origin_1.Scheme.FIREFOX_EXTENSION,
        origin_1.Scheme.EDGE_EXTENSION
    ];
    return extensionSchemes.some((extensionScheme) => string_utils_1.compareStrings(url.protocol, extensionScheme));
}
exports.isExtensionUrl = isExtensionUrl;
function isBrowserUrl(url) {
    return string_utils_1.compareStrings(url.protocol, origin_1.Scheme.CHROME);
}
exports.isBrowserUrl = isBrowserUrl;
function URLToString(url) {
    if (url === undefined) {
        return "";
    }
    if (url instanceof URL) {
        return url.toString();
    }
    else {
        return url;
    }
}
exports.URLToString = URLToString;
function safeEncodeURI(uri) {
    if (uri === undefined) {
        return "";
    }
    return encodeURI(uri);
}
exports.safeEncodeURI = safeEncodeURI;
function safeEncodeURIComponent(component) {
    if (component === undefined) {
        return "";
    }
    return encodeURIComponent(component);
}
exports.safeEncodeURIComponent = safeEncodeURIComponent;
function hashUrlComponents(url, components, seed) {
    function compare(component) {
        return (components & component) !== 0;
    }
    let hash = seed;
    if (compare(UrlComponent.Protocol)) {
        hash = murmur_hash_1.murmurHash(url.protocol, hash);
    }
    if (compare(UrlComponent.Username)) {
        hash = murmur_hash_1.murmurHash(url.username, hash);
    }
    if (compare(UrlComponent.Password)) {
        hash = murmur_hash_1.murmurHash(url.password, hash);
    }
    if (compare(UrlComponent.Host)) {
        hash = murmur_hash_1.murmurHash(url.host, hash);
    }
    if (compare(UrlComponent.Port)) {
        hash = murmur_hash_1.murmurHash(url.port, hash);
    }
    if (compare(UrlComponent.Pathname)) {
        hash = murmur_hash_1.murmurHash(url.pathname, hash);
    }
    if (compare(UrlComponent.Search)) {
        hash = murmur_hash_1.murmurHash(url.search, hash);
    }
    return hash;
}
function hashUrl(url, options = UrlCompareOptions.Default, seed = 0) {
    switch (options) {
        case UrlCompareOptions.Default:
            return hashUrlComponents(url, UrlComponent.All, seed);
        case UrlCompareOptions.IgnoreSearchParams:
            return hashUrlComponents(url, removeComponent(UrlComponent.All, UrlComponent.Search), seed);
        default:
            throw new Error(`hashUrl: invalid options: ${options}`);
    }
}
exports.hashUrl = hashUrl;
function makeUrlHashMap(options = UrlCompareOptions.Default) {
    return new hash_map_1.HashMap((url) => hashUrl(url, options), (a, b) => isSameUrl(a, b, options));
}
exports.makeUrlHashMap = makeUrlHashMap;
function makeUrlHashSet(options = UrlCompareOptions.Default) {
    return new hash_map_1.HashSet((url) => hashUrl(url, options), (a, b) => isSameUrl(a, b, options));
}
exports.makeUrlHashSet = makeUrlHashSet;


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const message_types_1 = __webpack_require__(2);
const string_utils_1 = __webpack_require__(3);
const type_utils_1 = __webpack_require__(86);
function isSerializedIsEnabledDataV1(value) {
    return type_utils_1.isObject(value) &&
        type_utils_1.isBoolean(value.chrome) &&
        type_utils_1.isBoolean(value.firefox) &&
        type_utils_1.isBoolean(value.edge);
}
exports.isSerializedIsEnabledDataV1 = isSerializedIsEnabledDataV1;
function isSerializedIsEnabledDataV12(value) {
    return type_utils_1.isObject(value) &&
        type_utils_1.isBoolean(value.chrome) &&
        type_utils_1.isBoolean(value.firefox) &&
        type_utils_1.isBoolean(value.edge) &&
        type_utils_1.isBoolean(value.edgeChromium);
}
exports.isSerializedIsEnabledDataV12 = isSerializedIsEnabledDataV12;
function isSerializedPhishingNavSeqData(value) {
    return type_utils_1.isObject(value) &&
        type_utils_1.isNumber(value.version) &&
        type_utils_1.isNumber(value.builtinRulesPrecedence) &&
        type_utils_1.isArray(value.seqs);
}
exports.isSerializedPhishingNavSeqData = isSerializedPhishingNavSeqData;
function isSerializedNewTabPageUrlsV7(value) {
    return type_utils_1.isObject(value) &&
        type_utils_1.isArray(value.chrome) &&
        type_utils_1.isArray(value.firefox) &&
        type_utils_1.isArray(value.edge);
}
exports.isSerializedNewTabPageUrlsV7 = isSerializedNewTabPageUrlsV7;
function isSerializedNewTabPageUrlsV12(value) {
    return type_utils_1.isObject(value) &&
        type_utils_1.isArray(value.chrome) &&
        type_utils_1.isArray(value.firefox) &&
        type_utils_1.isArray(value.edge) &&
        type_utils_1.isArray(value.edgeChromium);
}
exports.isSerializedNewTabPageUrlsV12 = isSerializedNewTabPageUrlsV12;
function isTabMessage(message) {
    return message.tabId !== undefined;
}
exports.isTabMessage = isTabMessage;
function IsIdMessage(message) {
    return message.id !== undefined;
}
exports.IsIdMessage = IsIdMessage;
class LaunchBrowserRequestV1 {
    constructor(urlSpec, id) {
        this.urlSpec = urlSpec;
        this.id = id;
    }
}
exports.LaunchBrowserRequestV1 = LaunchBrowserRequestV1;
class LaunchBrowserResponseV1 {
    constructor(urlSpec, id, didLaunch) {
        this.urlSpec = urlSpec;
        this.id = id;
        this.didLaunch = didLaunch;
    }
}
exports.LaunchBrowserResponseV1 = LaunchBrowserResponseV1;
class HandshakeV1 {
    constructor(versions) {
        this.versions = versions;
    }
}
exports.HandshakeV1 = HandshakeV1;
class ConfigRequestV1 {
    constructor(phishingSourceSitesVersion, phishingNavigationSequencesVersion, browserInfo) {
        this.phishingSourceSitesVersion = phishingSourceSitesVersion;
        this.phishingNavigationSequencesVersion = phishingNavigationSequencesVersion;
        this.browserInfo = browserInfo;
    }
}
exports.ConfigRequestV1 = ConfigRequestV1;
class ExtensibleConfigChangedV1 {
    constructor(isEnabled, blockedPageStrings, phishingSourceSites, phishingNavigationSequences, trustedSites, untrustedSites, userTrustedOrigins, userUntrustedOrigins, openPhishingLinksInSecureBrowser) {
        this.isEnabled = isEnabled;
        this.blockedPageStrings = blockedPageStrings;
        this.phishingSourceSites = phishingSourceSites;
        this.phishingNavigationSequences = phishingNavigationSequences;
        this.trustedSites = trustedSites;
        this.untrustedSites = untrustedSites;
        this.userTrustedOrigins = userTrustedOrigins;
        this.userUntrustedOrigins = userUntrustedOrigins;
        this.openPhishingLinksInSecureBrowser = openPhishingLinksInSecureBrowser;
    }
}
exports.ExtensibleConfigChangedV1 = ExtensibleConfigChangedV1;
class ReputationChangedV3 {
    constructor(index, total, reputableSites) {
        this.index = index;
        this.total = total;
        this.reputableSites = reputableSites;
    }
}
exports.ReputationChangedV3 = ReputationChangedV3;
class TrustUrlV1 {
    constructor(navigateToUrlSpec, blockedUrlSpec, trustUrl, rememberDecision) {
        this.navigateToUrlSpec = navigateToUrlSpec;
        this.blockedUrlSpec = blockedUrlSpec;
        this.trustUrl = trustUrl;
        this.rememberDecision = rememberDecision;
    }
}
exports.TrustUrlV1 = TrustUrlV1;
class DownloadCompleteV1 {
    constructor(urlSpec, fileSpec) {
        this.urlSpec = urlSpec;
        this.fileSpec = fileSpec;
    }
}
exports.DownloadCompleteV1 = DownloadCompleteV1;
var LogLevel;
(function (LogLevel) {
    LogLevel[LogLevel["Info"] = 0] = "Info";
    LogLevel[LogLevel["Error"] = 1] = "Error";
})(LogLevel = exports.LogLevel || (exports.LogLevel = {}));
class LogMessageV1 {
    constructor(level, message) {
        this.level = level;
        this.message = message;
    }
}
exports.LogMessageV1 = LogMessageV1;
class HelperErrorV1 {
    constructor(errorType, errorMessage) {
        this.errorType = errorType;
        this.errorMessage = errorMessage;
    }
}
exports.HelperErrorV1 = HelperErrorV1;
class DormantStateChangedV1 {
    constructor(isDormant) {
        this.isDormant = isDormant;
    }
}
exports.DormantStateChangedV1 = DormantStateChangedV1;
class ExtensionReadyV1 {
    constructor(tabId) {
        this.tabId = tabId;
    }
}
exports.ExtensionReadyV1 = ExtensionReadyV1;
class ExternalAppLinkRequestV1 {
    constructor(linkSpec, externalAppName) {
        this.linkSpec = linkSpec;
        this.externalAppName = externalAppName;
    }
}
exports.ExternalAppLinkRequestV1 = ExternalAppLinkRequestV1;
class ExternalAppLinkResponseV1 {
    constructor(navigateToSpec) {
        this.navigateToSpec = navigateToSpec;
    }
}
exports.ExternalAppLinkResponseV1 = ExternalAppLinkResponseV1;
class AddUserTrustedOriginV1 {
    constructor(origin) {
        this.origin = origin;
    }
}
exports.AddUserTrustedOriginV1 = AddUserTrustedOriginV1;
class AddUserUntrustedOriginV1 {
    constructor(origin) {
        this.origin = origin;
    }
}
exports.AddUserUntrustedOriginV1 = AddUserUntrustedOriginV1;
class IsFileURLTrustedRequestV1 {
    constructor(id, fileUrlSpec) {
        this.id = id;
        this.fileUrlSpec = fileUrlSpec;
    }
}
exports.IsFileURLTrustedRequestV1 = IsFileURLTrustedRequestV1;
class IsFileURLTrustedResponseV1 {
    constructor(id, fileUrlSpec, isTrusted) {
        this.id = id;
        this.fileUrlSpec = fileUrlSpec;
        this.isTrusted = isTrusted;
    }
}
exports.IsFileURLTrustedResponseV1 = IsFileURLTrustedResponseV1;
class BlockedFileRequestV1 {
    constructor(fileUrlSpec) {
        this.fileUrlSpec = fileUrlSpec;
    }
}
exports.BlockedFileRequestV1 = BlockedFileRequestV1;
class BlockedFileResponseV1 {
    constructor(fileUrlSpec, isTrusted) {
        this.fileUrlSpec = fileUrlSpec;
        this.isTrusted = isTrusted;
    }
}
exports.BlockedFileResponseV1 = BlockedFileResponseV1;
class PopupDataRequestV1 {
    constructor() { }
}
exports.PopupDataRequestV1 = PopupDataRequestV1;
class PopupDataResponseV1 {
    constructor(popupMessage, openPhishingLinksInSecureBrowser) {
        this.popupMessage = popupMessage;
        this.openPhishingLinksInSecureBrowser = openPhishingLinksInSecureBrowser;
    }
}
exports.PopupDataResponseV1 = PopupDataResponseV1;
class ClearRememberedDecisionsV1 {
    constructor() { }
}
exports.ClearRememberedDecisionsV1 = ClearRememberedDecisionsV1;
class BlockedPageStringsRequestV1 {
    constructor(contentType) {
        this.contentType = contentType;
    }
}
exports.BlockedPageStringsRequestV1 = BlockedPageStringsRequestV1;
class BlockedPageStringsResponseV1 {
    constructor(title, question) {
        this.title = title;
        this.question = question;
    }
}
exports.BlockedPageStringsResponseV1 = BlockedPageStringsResponseV1;
class HeartbeatV1 {
    constructor() { }
}
exports.HeartbeatV1 = HeartbeatV1;
class EnabledFeaturesRequestV2 {
    constructor(id, respondImmediately) {
        this.id = id;
        this.respondImmediately = respondImmediately;
    }
}
exports.EnabledFeaturesRequestV2 = EnabledFeaturesRequestV2;
class EnabledFeaturesResponseV2 {
    constructor(id, linkProtection, fileURLProtection, pdfProtection, downloadProtection) {
        this.id = id;
        this.linkProtection = linkProtection;
        this.fileURLProtection = fileURLProtection;
        this.pdfProtection = pdfProtection;
        this.downloadProtection = downloadProtection;
    }
}
exports.EnabledFeaturesResponseV2 = EnabledFeaturesResponseV2;
var RememberedOriginTypes;
(function (RememberedOriginTypes) {
    RememberedOriginTypes[RememberedOriginTypes["Trusted"] = 0] = "Trusted";
    RememberedOriginTypes[RememberedOriginTypes["Untrusted"] = 1] = "Untrusted";
})(RememberedOriginTypes = exports.RememberedOriginTypes || (exports.RememberedOriginTypes = {}));
class ClearRememberedOriginV3 {
    constructor(origin, type) {
        this.origin = origin;
        this.type = type;
    }
}
exports.ClearRememberedOriginV3 = ClearRememberedOriginV3;
class OptionsDataRequestV3 {
    constructor() { }
}
exports.OptionsDataRequestV3 = OptionsDataRequestV3;
class OptionsDataResponseV3 {
    constructor(supportStatus, openPhishingLinksInSecureBrowser, userTrustedOrigins, userUntrustedOrigins) {
        this.supportStatus = supportStatus;
        this.openPhishingLinksInSecureBrowser = openPhishingLinksInSecureBrowser;
        this.userTrustedOrigins = userTrustedOrigins;
        this.userUntrustedOrigins = userUntrustedOrigins;
    }
}
exports.OptionsDataResponseV3 = OptionsDataResponseV3;
class ExtensibleConfigChangedV3 extends ExtensibleConfigChangedV1 {
    constructor(isEnabled, blockedPageStrings, phishingSourceSites, phishingNavigationSequences, trustedSites, untrustedSites, userTrustedOrigins, userUntrustedOrigins, openPhishingLinksInSecureBrowser, prioritiseTrustedSites) {
        super(isEnabled, blockedPageStrings, phishingSourceSites, phishingNavigationSequences, trustedSites, untrustedSites, userTrustedOrigins, userUntrustedOrigins, openPhishingLinksInSecureBrowser);
        this.prioritiseTrustedSites = prioritiseTrustedSites;
    }
}
exports.ExtensibleConfigChangedV3 = ExtensibleConfigChangedV3;
class ExtensibleConfigChangedV4 extends ExtensibleConfigChangedV3 {
    constructor(isEnabled, blockedPageStrings, phishingSourceSites, phishingNavigationSequences, trustedSites, untrustedSites, userTrustedOrigins, userUntrustedOrigins, openPhishingLinksInSecureBrowser, prioritiseTrustedSites, promptForUncategorized) {
        super(isEnabled, blockedPageStrings, phishingSourceSites, phishingNavigationSequences, trustedSites, untrustedSites, userTrustedOrigins, userUntrustedOrigins, openPhishingLinksInSecureBrowser, prioritiseTrustedSites);
        this.promptForUncategorized = promptForUncategorized;
    }
}
exports.ExtensibleConfigChangedV4 = ExtensibleConfigChangedV4;
class BlockedPageDataRequestV4 {
    constructor(contentType) {
        this.contentType = contentType;
    }
}
exports.BlockedPageDataRequestV4 = BlockedPageDataRequestV4;
class BlockedPageDataResponseV4 {
    constructor(title, question, rememberDecisionsDefault) {
        this.title = title;
        this.question = question;
        this.rememberDecisionsDefault = rememberDecisionsDefault;
    }
}
exports.BlockedPageDataResponseV4 = BlockedPageDataResponseV4;
class ExtensibleConfigChangedV5 extends ExtensibleConfigChangedV4 {
    constructor(isEnabled, blockedPageStrings, phishingSourceSites, phishingNavigationSequences, trustedSites, untrustedSites, userTrustedOrigins, userUntrustedOrigins, openPhishingLinksInSecureBrowser, prioritiseTrustedSites, promptForUncategorized, isEnterpriseProduct) {
        super(isEnabled, blockedPageStrings, phishingSourceSites, phishingNavigationSequences, trustedSites, untrustedSites, userTrustedOrigins, userUntrustedOrigins, openPhishingLinksInSecureBrowser, prioritiseTrustedSites, promptForUncategorized);
        this.isEnterpriseProduct = isEnterpriseProduct;
    }
}
exports.ExtensibleConfigChangedV5 = ExtensibleConfigChangedV5;
class PopupDataResponseV5 extends PopupDataResponseV1 {
    constructor(popupMessage, openPhishingLinksInSecureBrowser, isEnterpriseProduct) {
        super(popupMessage, openPhishingLinksInSecureBrowser);
        this.isEnterpriseProduct = isEnterpriseProduct;
    }
}
exports.PopupDataResponseV5 = PopupDataResponseV5;
class BlockedPageDataResponseV6 extends BlockedPageDataResponseV4 {
    constructor(title, question, openedSecureExplanation, rememberDecisionsDefault) {
        super(title, question, rememberDecisionsDefault);
        this.openedSecureExplanation = openedSecureExplanation;
    }
}
exports.BlockedPageDataResponseV6 = BlockedPageDataResponseV6;
class TrustUrlV6 extends TrustUrlV1 {
    constructor(navigateToUrlSpec, blockedUrlSpec, trustUrl, rememberDecision, contentType) {
        super(navigateToUrlSpec, blockedUrlSpec, trustUrl, rememberDecision);
        this.contentType = contentType;
    }
}
exports.TrustUrlV6 = TrustUrlV6;
class ExtensibleConfigChangedV7 extends ExtensibleConfigChangedV5 {
    constructor(isEnabled, blockedPageStrings, phishingSourceSites, phishingNavigationSequences, trustedSites, untrustedSites, userTrustedOrigins, userUntrustedOrigins, openPhishingLinksInSecureBrowser, prioritiseTrustedSites, promptForUncategorized, isEnterpriseProduct, newTabPageUrls) {
        super(isEnabled, blockedPageStrings, phishingSourceSites, phishingNavigationSequences, trustedSites, untrustedSites, userTrustedOrigins, userUntrustedOrigins, openPhishingLinksInSecureBrowser, prioritiseTrustedSites, promptForUncategorized, isEnterpriseProduct);
        this.newTabPageUrls = newTabPageUrls;
    }
}
exports.ExtensibleConfigChangedV7 = ExtensibleConfigChangedV7;
class TrustUrlV8 extends TrustUrlV6 {
    constructor(navigateToUrlSpec, blockedUrlSpec, trustUrl, rememberDecision, dontAskAgain, contentType) {
        super(navigateToUrlSpec, blockedUrlSpec, trustUrl, rememberDecision, contentType);
        this.dontAskAgain = dontAskAgain;
    }
}
exports.TrustUrlV8 = TrustUrlV8;
class DontAskAgainV8 {
    constructor() { }
}
exports.DontAskAgainV8 = DontAskAgainV8;
class ExtensibleConfigChangedV8 extends ExtensibleConfigChangedV7 {
    constructor(isEnabled, phishingSourceSites, phishingNavigationSequences, trustedSites, untrustedSites, userTrustedOrigins, userUntrustedOrigins, openPhishingLinksInSecureBrowser, prioritiseTrustedSites, promptForUncategorized, isEnterpriseProduct, isConsumerProduct, newTabPageUrls, blockedPageLearnMoreURL) {
        super(isEnabled, {}, phishingSourceSites, phishingNavigationSequences, trustedSites, untrustedSites, userTrustedOrigins, userUntrustedOrigins, openPhishingLinksInSecureBrowser, prioritiseTrustedSites, promptForUncategorized, isEnterpriseProduct, newTabPageUrls);
        this.isConsumerProduct = isConsumerProduct;
        this.blockedPageLearnMoreURL = blockedPageLearnMoreURL;
    }
}
exports.ExtensibleConfigChangedV8 = ExtensibleConfigChangedV8;
class PopupDataResponseV9 extends PopupDataResponseV5 {
    constructor(popupMessage, openPhishingLinksInSecureBrowser, isEnterpriseProduct, dontAskAgain) {
        super(popupMessage, openPhishingLinksInSecureBrowser, isEnterpriseProduct);
        this.dontAskAgain = dontAskAgain;
    }
}
exports.PopupDataResponseV9 = PopupDataResponseV9;
class DontAskAgainV9 extends DontAskAgainV8 {
    constructor(dontAskAgain) {
        super();
        this.dontAskAgain = dontAskAgain;
    }
}
exports.DontAskAgainV9 = DontAskAgainV9;
class ExtensibleConfigChangedV9 extends ExtensibleConfigChangedV8 {
    constructor(isEnabled, phishingSourceSites, phishingNavigationSequences, trustedSites, untrustedSites, userTrustedOrigins, userUntrustedOrigins, openPhishingLinksInSecureBrowser, prioritiseTrustedSites, promptForUncategorized, isEnterpriseProduct, isConsumerProduct, newTabPageUrls, blockedPageLearnMoreURL, dontAskAgain) {
        super(isEnabled, phishingSourceSites, phishingNavigationSequences, trustedSites, untrustedSites, userTrustedOrigins, userUntrustedOrigins, openPhishingLinksInSecureBrowser, prioritiseTrustedSites, promptForUncategorized, isEnterpriseProduct, isConsumerProduct, newTabPageUrls, blockedPageLearnMoreURL);
        this.dontAskAgain = dontAskAgain;
    }
}
exports.ExtensibleConfigChangedV9 = ExtensibleConfigChangedV9;
class StopHelperV10 {
    constructor() { }
}
exports.StopHelperV10 = StopHelperV10;
class EdgeAckV10 {
    constructor() { }
}
exports.EdgeAckV10 = EdgeAckV10;
class EndOfStreamV10 {
    constructor() { }
}
exports.EndOfStreamV10 = EndOfStreamV10;
class HeartbeatV10 extends HeartbeatV1 {
    constructor(id) {
        super();
        this.id = id;
    }
}
exports.HeartbeatV10 = HeartbeatV10;
class PopupDataResponseV11 {
    constructor(popupMessage, showClearRememberedDecisionsInfo, isEnterpriseProduct, helpLinkURL) {
        this.popupMessage = popupMessage;
        this.showClearRememberedDecisionsInfo = showClearRememberedDecisionsInfo;
        this.isEnterpriseProduct = isEnterpriseProduct;
        this.helpLinkURL = helpLinkURL;
    }
}
exports.PopupDataResponseV11 = PopupDataResponseV11;
var ProductStatuses;
(function (ProductStatuses) {
    ProductStatuses[ProductStatuses["Enabled"] = 0] = "Enabled";
    ProductStatuses[ProductStatuses["Disabled"] = 1] = "Disabled";
    ProductStatuses[ProductStatuses["InitRequired"] = 2] = "InitRequired";
    ProductStatuses[ProductStatuses["Unlicensed"] = 3] = "Unlicensed";
    ProductStatuses[ProductStatuses["Unknown"] = 4] = "Unknown";
})(ProductStatuses = exports.ProductStatuses || (exports.ProductStatuses = {}));
class ExtensibleConfigChangedV11 extends ExtensibleConfigChangedV9 {
    constructor(isEnabled, phishingSourceSites, phishingNavigationSequences, trustedSites, untrustedSites, userTrustedOrigins, userUntrustedOrigins, openPhishingLinksInSecureBrowser, prioritiseTrustedSites, promptForUncategorized, isEnterpriseProduct, isConsumerProduct, newTabPageUrls, blockedPageLearnMoreURL, dontAskAgain, secureBrowserRedirectTrustedSites, productStatus) {
        super(isEnabled, phishingSourceSites, phishingNavigationSequences, trustedSites, untrustedSites, userTrustedOrigins, userUntrustedOrigins, openPhishingLinksInSecureBrowser, prioritiseTrustedSites, promptForUncategorized, isEnterpriseProduct, isConsumerProduct, newTabPageUrls, blockedPageLearnMoreURL, dontAskAgain);
        this.secureBrowserRedirectTrustedSites = secureBrowserRedirectTrustedSites;
        this.productStatus = productStatus;
    }
}
exports.ExtensibleConfigChangedV11 = ExtensibleConfigChangedV11;
class ExtensibleConfigChangedV12 extends ExtensibleConfigChangedV11 {
}
exports.ExtensibleConfigChangedV12 = ExtensibleConfigChangedV12;
class Message {
    constructor(type, payload) {
        this.type = type;
        this.payload = payload;
    }
}
exports.Message = Message;
function messageToString(message) {
    if (message.type === message_types_1.MessageType.reputationChangedV3) {
        const payload = message.payload;
        let str = `Object{\n\t` +
            `type: ${message_types_1.MessageType.reputationChangedV3},\n\t` +
            `payload: Object{\n\t\t\t` +
            `index: ${payload.index},\n\t\t\t` +
            `total: ${payload.total},\n\t\t\t` +
            `reputableSite: [ `;
        for (const entry of payload.reputableSites) {
            str += `[${entry[0]},${entry[1]}], `;
        }
        str += "],\n\t},\n}";
        return str;
    }
    else {
        return string_utils_1.toString(message);
    }
}
exports.messageToString = messageToString;


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const origin_1 = __webpack_require__(9);
const maybe_1 = __webpack_require__(0);
const url_utils_1 = __webpack_require__(4);
const user_agent_parser_1 = __webpack_require__(89);
const string_utils_1 = __webpack_require__(3);
const array_utils_1 = __webpack_require__(8);
var Browser;
(function (Browser) {
    Browser[Browser["chrome"] = 0] = "chrome";
    Browser[Browser["firefox"] = 1] = "firefox";
    Browser[Browser["edge"] = 2] = "edge";
    Browser[Browser["edgeChromium"] = 3] = "edgeChromium";
})(Browser = exports.Browser || (exports.Browser = {}));
const browserSchemeMap = new Map([
    [origin_1.Scheme.CHROME_EXTENSION, Browser.chrome],
    [origin_1.Scheme.FIREFOX_EXTENSION, Browser.firefox],
    [origin_1.Scheme.EDGE_EXTENSION, Browser.edge]
]);
function getCurrentBrowser() {
    const manifestURL = url_utils_1.parseUrl(chrome.runtime.getURL("manifest.json"));
    if (maybe_1.none(manifestURL)) {
        return undefined;
    }
    for (const scheme of browserSchemeMap.keys()) {
        if (scheme === manifestURL.protocol) {
            const browser = browserSchemeMap.get(scheme);
            if (browser === Browser.chrome) {
                const products = user_agent_parser_1.parseUserAgent(window.navigator.userAgent);
                if (maybe_1.some(products) && products.some((product) => product.name === "Edg")) {
                    return Browser.edgeChromium;
                }
                else {
                    return Browser.chrome;
                }
            }
            return browser;
        }
    }
    return undefined;
}
exports.getCurrentBrowser = getCurrentBrowser;
function getCurrentBrowserInfo() {
    const manifestURL = url_utils_1.parseUrl(chrome.runtime.getURL("manifest.json"));
    const currentBrowser = getCurrentBrowser();
    if (maybe_1.none(manifestURL) || maybe_1.none(currentBrowser)) {
        return { browser: "unknown", urlHostname: "" };
    }
    return { browser: Browser[currentBrowser], urlHostname: manifestURL.hostname };
}
exports.getCurrentBrowserInfo = getCurrentBrowserInfo;
function is32bitFirefox() {
    const userAgent = window.navigator.userAgent;
    return userAgent.search(/WOW64/) !== -1;
}
exports.is32bitFirefox = is32bitFirefox;
function findUserAgent() {
    return window.navigator.userAgent;
}
function findEdgeMajorVersion() {
    const userAgent = findUserAgent();
    if (maybe_1.none(userAgent)) {
        return undefined;
    }
    const products = user_agent_parser_1.parseUserAgent(userAgent);
    if (maybe_1.none(products)) {
        return undefined;
    }
    const edgeProduct = array_utils_1.findUnique(products, (product) => string_utils_1.compareStrings(product.name, "Edge"));
    if (maybe_1.none(edgeProduct)) {
        return undefined;
    }
    const edgeProductVerisonStr = edgeProduct.version;
    if (maybe_1.none(edgeProductVerisonStr)) {
        return undefined;
    }
    const edgeProductVersion = user_agent_parser_1.parseProductVersion(edgeProductVerisonStr);
    const edgeMajorVersion = array_utils_1.maybeFirst(edgeProductVersion);
    return edgeMajorVersion;
}
exports.findEdgeMajorVersion = findEdgeMajorVersion;
function browserToString(browser) {
    if (maybe_1.none(browser)) {
        return "";
    }
    return Browser[browser];
}
exports.browserToString = browserToString;
function browserToDisplayString(browser) {
    switch (browser) {
        case Browser.chrome:
            return "Google Chrome";
        case Browser.firefox:
            return "Mozilla Firefox";
        case Browser.edge:
            return "Microsoft Edge";
        case Browser.edgeChromium:
            return "Microsoft Edge";
    }
}
exports.browserToDisplayString = browserToDisplayString;


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var ConfigKey;
(function (ConfigKey) {
    ConfigKey[ConfigKey["isEnabled"] = 0] = "isEnabled";
    ConfigKey[ConfigKey["trustedUrls"] = 1] = "trustedUrls";
    ConfigKey[ConfigKey["untrustedUrls"] = 2] = "untrustedUrls";
    ConfigKey[ConfigKey["phishingSourceSites"] = 3] = "phishingSourceSites";
    ConfigKey[ConfigKey["phishingNavigationSequences"] = 4] = "phishingNavigationSequences";
    ConfigKey[ConfigKey["userTrustedOrigins"] = 5] = "userTrustedOrigins";
    ConfigKey[ConfigKey["userUntrustedOrigins"] = 6] = "userUntrustedOrigins";
    ConfigKey[ConfigKey["openPhishingLinksInSecureBrowser"] = 7] = "openPhishingLinksInSecureBrowser";
    ConfigKey[ConfigKey["prioritiseTrustedSites"] = 8] = "prioritiseTrustedSites";
    ConfigKey[ConfigKey["promptForUncategorized"] = 9] = "promptForUncategorized";
    ConfigKey[ConfigKey["reputableUrls"] = 10] = "reputableUrls";
    ConfigKey[ConfigKey["isEnterpriseProduct"] = 11] = "isEnterpriseProduct";
    ConfigKey[ConfigKey["isConsumerProduct"] = 12] = "isConsumerProduct";
    ConfigKey[ConfigKey["newTabPageUrls"] = 13] = "newTabPageUrls";
    ConfigKey[ConfigKey["blockedPageLearnMoreURL"] = 14] = "blockedPageLearnMoreURL";
    ConfigKey[ConfigKey["dontAskAgain"] = 15] = "dontAskAgain";
    ConfigKey[ConfigKey["secureBrowserRedirectTrustedSites"] = 16] = "secureBrowserRedirectTrustedSites";
    ConfigKey[ConfigKey["productStatus"] = 17] = "productStatus";
})(ConfigKey = exports.ConfigKey || (exports.ConfigKey = {}));


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const maybe_1 = __webpack_require__(0);
function isEmpty(array) {
    return array.length === 0;
}
exports.isEmpty = isEmpty;
function first(array) {
    return array[0];
}
exports.first = first;
function second(array) {
    return array[1];
}
exports.second = second;
function last(array) {
    return array[array.length - 1];
}
exports.last = last;
function rest(array) {
    return array.slice(1);
}
exports.rest = rest;
function contains(array, element) {
    return array.indexOf(element) !== -1;
}
exports.contains = contains;
function copyArray(array) {
    const identity = (value) => {
        return value;
    };
    return array.map(identity);
}
exports.copyArray = copyArray;
function isArray(value) {
    return value instanceof Array;
}
exports.isArray = isArray;
function newArray(length, value) {
    const array = new Array();
    for (let index = 0; index < length; index += 1) {
        array.push(value);
    }
    return array;
}
exports.newArray = newArray;
function findIndex(array, value) {
    const notFound = -1;
    const index = array.indexOf(value);
    if (index === notFound) {
        return undefined;
    }
    return index;
}
exports.findIndex = findIndex;
function findAllIndices(array, predicate) {
    const results = new Array();
    array.forEach((element, index) => {
        if (predicate(element)) {
            results.push(index);
        }
    });
    return results;
}
exports.findAllIndices = findAllIndices;
function compareArrays(a, b, compare = maybe_1.isEqual) {
    if (a.length !== b.length) {
        return false;
    }
    const length = a.length;
    for (let i = 0; i < length; i += 1) {
        if (!compare(a[i], b[i])) {
            return false;
        }
    }
    return true;
}
exports.compareArrays = compareArrays;
function has(array, value) {
    return maybe_1.some(findIndex(array, value));
}
exports.has = has;
function findUnique(array, predicate) {
    const matchingElements = array.filter(predicate);
    if (matchingElements.length !== 1) {
        return undefined;
    }
    return first(matchingElements);
}
exports.findUnique = findUnique;
function maybeFirst(array) {
    if (maybe_1.none(array)) {
        return undefined;
    }
    return first(array);
}
exports.maybeFirst = maybeFirst;


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const maybe_1 = __webpack_require__(0);
const murmur_hash_1 = __webpack_require__(11);
const url_utils_1 = __webpack_require__(4);
const hash_map_1 = __webpack_require__(16);
const log_1 = __webpack_require__(1);
const qlobber_1 = __webpack_require__(66);
const exclusionPrefix = "^";
const wildcardSpecRegex = new RegExp("^(([^:/?#]+):)?(//([^/?#]*))?([^?#]*)(\\?([^#]*))?(#(.*))?");
var WildcardSpecGroup;
(function (WildcardSpecGroup) {
    WildcardSpecGroup[WildcardSpecGroup["Scheme"] = 1] = "Scheme";
    WildcardSpecGroup[WildcardSpecGroup["HostAndPort"] = 4] = "HostAndPort";
})(WildcardSpecGroup || (WildcardSpecGroup = {}));
class OriginParseOptions {
    constructor(options) {
        this.allowNonWebSafeSchemes = false;
        this.allowFileScheme = false;
        this.allowChromeScheme = false;
        this.allowEdgeScheme = false;
        this.allowAboutScheme = false;
        this.allowChromeExtensionScheme = false;
        this.allowFirefoxExtensionScheme = false;
        this.allowEdgeExtensionScheme = false;
        this.allowWildcards = false;
        this.allowMissingWildcardScheme = false;
        this.allowTrailingWildcards = false;
        Object.assign(this, options);
    }
}
exports.OriginParseOptions = OriginParseOptions;
class OriginHashOptions {
    constructor(options) {
        this.seed = 0;
        this.ignoreHttpHttpsDifference = false;
        this.ignorePort = false;
        Object.assign(this, options);
    }
}
exports.OriginHashOptions = OriginHashOptions;
var Scheme;
(function (Scheme) {
    Scheme["HTTP"] = "http:";
    Scheme["HTTPS"] = "https:";
    Scheme["FTP"] = "ftp:";
    Scheme["FTPS"] = "ftps:";
    Scheme["WS"] = "ws:";
    Scheme["WSS"] = "wss:";
    Scheme["FILE"] = "file:";
    Scheme["CHROME"] = "chrome:";
    Scheme["EDGE"] = "edge:";
    Scheme["ABOUT"] = "about:";
    Scheme["JAVASCRIPT"] = "javascript:";
    Scheme["CHROME_EXTENSION"] = "chrome-extension:";
    Scheme["FIREFOX_EXTENSION"] = "moz-extension:";
    Scheme["EDGE_EXTENSION"] = "ms-browser-extension:";
    Scheme["WILDCARD_ONE"] = "+:";
    Scheme["WILDCARD_SOME"] = "*:";
})(Scheme = exports.Scheme || (exports.Scheme = {}));
const matcherOptions = {
    separator: ".",
    wildcard_one: Scheme.WILDCARD_ONE[0],
    wildcard_some: Scheme.WILDCARD_SOME[0],
    cache_adds: false
};
const trailingWildcards = [
    matcherOptions.separator + matcherOptions.wildcard_one,
    matcherOptions.separator + matcherOptions.wildcard_some
];
function isWebSafeScheme(scheme) {
    switch (scheme) {
        case Scheme.HTTP:
            return true;
        case Scheme.HTTPS:
            return true;
        default:
            return false;
    }
}
const standardPorts = new Map([
    [Scheme.HTTP, 80], [Scheme.HTTPS, 443]
]);
class Origin {
    constructor(scheme, host, port) {
        this.scheme = scheme;
        this.host = host;
        this.port = port;
    }
    toString() {
        if (this.port === undefined) {
            return `${this.scheme}//${this.host}`;
        }
        else {
            return `${this.scheme}//${this.host}:${this.port}`;
        }
    }
    toDisplayString() {
        return this.host;
    }
}
exports.Origin = Origin;
function isSameOrigin(a, b, options = new OriginHashOptions()) {
    if (maybe_1.none(a) || maybe_1.none(b)) {
        return false;
    }
    let schemeA = a.scheme;
    let schemeB = b.scheme;
    if (options.ignoreHttpHttpsDifference) {
        if (schemeA === Scheme.HTTP) {
            schemeA = Scheme.HTTPS;
        }
        if (schemeB === Scheme.HTTP) {
            schemeB = Scheme.HTTPS;
        }
    }
    if (schemeA !== schemeB) {
        return false;
    }
    if (a.host !== b.host) {
        return false;
    }
    if (options.ignorePort) {
        return true;
    }
    if (a.port === undefined && b.port !== undefined) {
        return false;
    }
    if (a.port !== undefined && b.port === undefined) {
        return false;
    }
    if (a.port === undefined && b.port === undefined) {
        return true;
    }
    return a.port === b.port;
}
exports.isSameOrigin = isSameOrigin;
function hashOrigin(origin, options = new OriginHashOptions()) {
    let hash = options.seed;
    let scheme = origin.scheme;
    if (options.ignoreHttpHttpsDifference && (scheme === Scheme.HTTP)) {
        scheme = Scheme.HTTPS;
    }
    hash = murmur_hash_1.murmurHash(scheme, hash);
    hash = murmur_hash_1.murmurHash(origin.host, hash);
    if (!options.ignorePort && (origin.port !== undefined)) {
        hash = murmur_hash_1.murmurHash(origin.port, hash);
    }
    return hash;
}
exports.hashOrigin = hashOrigin;
function parseScheme(protocol, options) {
    let scheme = undefined;
    switch (protocol.toLowerCase()) {
        case Scheme.HTTP:
            scheme = Scheme.HTTP;
            break;
        case Scheme.HTTPS:
            scheme = Scheme.HTTPS;
            break;
        case Scheme.FILE:
            if (options.allowFileScheme) {
                scheme = Scheme.FILE;
            }
            break;
        case Scheme.CHROME:
            if (options.allowChromeScheme) {
                scheme = Scheme.CHROME;
            }
            break;
        case Scheme.EDGE:
            if (options.allowEdgeScheme) {
                scheme = Scheme.EDGE;
            }
            break;
        case Scheme.ABOUT:
            if (options.allowAboutScheme) {
                scheme = Scheme.ABOUT;
            }
            break;
        case Scheme.CHROME_EXTENSION:
            if (options.allowChromeExtensionScheme) {
                scheme = Scheme.CHROME_EXTENSION;
            }
            break;
        case Scheme.FIREFOX_EXTENSION:
            if (options.allowFirefoxExtensionScheme) {
                scheme = Scheme.FIREFOX_EXTENSION;
            }
            break;
        case Scheme.EDGE_EXTENSION:
            if (options.allowEdgeExtensionScheme) {
                scheme = Scheme.EDGE_EXTENSION;
            }
            break;
        case Scheme.WILDCARD_ONE:
            if (options.allowWildcards) {
                scheme = Scheme.WILDCARD_ONE;
                break;
            }
            return undefined;
        case Scheme.WILDCARD_SOME:
            if (options.allowWildcards) {
                scheme = Scheme.WILDCARD_SOME;
                break;
            }
            return undefined;
        default:
            return undefined;
    }
    if (isWebSafeScheme(scheme)) {
        return scheme;
    }
    if (((scheme === Scheme.WILDCARD_ONE) ||
        (scheme === Scheme.WILDCARD_SOME)) &&
        options.allowWildcards) {
        return scheme;
    }
    else if ((scheme === Scheme.FILE) &&
        options.allowFileScheme) {
        return scheme;
    }
    else if ((scheme === Scheme.CHROME_EXTENSION) &&
        options.allowChromeExtensionScheme) {
        return scheme;
    }
    else if ((scheme === Scheme.FIREFOX_EXTENSION) &&
        options.allowFirefoxExtensionScheme) {
        return scheme;
    }
    else if ((scheme === Scheme.EDGE_EXTENSION) &&
        options.allowEdgeExtensionScheme) {
        return scheme;
    }
    else if ((scheme === Scheme.CHROME) &&
        options.allowChromeScheme) {
        return scheme;
    }
    else if ((scheme === Scheme.EDGE) &&
        options.allowEdgeScheme) {
        return scheme;
    }
    else if ((scheme === Scheme.ABOUT) &&
        options.allowAboutScheme) {
        return scheme;
    }
    else if (options.allowNonWebSafeSchemes) {
        return scheme;
    }
    else {
        return undefined;
    }
}
function isEmpty(value) {
    return value.length === 0;
}
function isInRange(value, min, max) {
    return (value >= min) && (value <= max);
}
function parsePort(portString, scheme) {
    const minPort = 0;
    const maxPort = (2 << 16) - 1;
    if (isEmpty(portString)) {
        return standardPorts.get(scheme);
    }
    const radix = 10;
    const port = parseInt(portString, radix);
    if (!isInRange(port, minPort, maxPort)) {
        throw new Error(`Invalid port ${port}`);
    }
    return port;
}
function parseOrigin(urlOrSpec, options = new OriginParseOptions()) {
    if (urlOrSpec instanceof URL) {
        return parseOriginFromURL(urlOrSpec, options);
    }
    else {
        return parseOriginFromSpec(urlOrSpec, options);
    }
}
exports.parseOrigin = parseOrigin;
function parseOriginFromURL(url, options) {
    const scheme = parseScheme(url.protocol, options);
    if (scheme === undefined) {
        return undefined;
    }
    try {
        const port = parsePort(url.port, scheme);
        return new Origin(scheme, url.hostname, port);
    }
    catch (e) {
        return undefined;
    }
}
function parseOriginFromSpec(spec, options) {
    if (options.allowWildcards) {
        if (!spec.includes("://") && options.allowMissingWildcardScheme) {
            spec = Scheme.WILDCARD_ONE + "//" + spec;
        }
        const match = wildcardSpecRegex.exec(spec);
        if (match === null) {
            return undefined;
        }
        const maybeScheme = match[WildcardSpecGroup.Scheme];
        if (maybeScheme === undefined) {
            return undefined;
        }
        const scheme = parseScheme(maybeScheme, options);
        if (scheme === undefined) {
            return undefined;
        }
        const maybeHostAndPort = match[WildcardSpecGroup.HostAndPort];
        if (maybeHostAndPort === undefined) {
            return undefined;
        }
        const hostAndPort = maybeHostAndPort.split(':');
        const host = hostAndPort[0];
        if (isEmpty(host)) {
            return undefined;
        }
        const port = parsePort(hostAndPort.length > 1 ? hostAndPort[1] : '', scheme);
        if (!options.allowTrailingWildcards) {
            if (trailingWildcards.some(trailingWildcard => host.length >= trailingWildcard.length && host.endsWith(trailingWildcard))) {
                log_1.logError(new Error(`Rule URL hostname ends in trailing wildcard: ${spec}`));
                return undefined;
            }
        }
        return new Origin(scheme, host, port);
    }
    const url = url_utils_1.parseUrl(spec);
    if (url === undefined) {
        return undefined;
    }
    return parseOriginFromURL(url, options);
}
function makeOriginSet(options = new OriginHashOptions()) {
    return new hash_map_1.HashSet((origin) => hashOrigin(origin, options), (a, b) => isSameOrigin(a, b, options));
}
exports.makeOriginSet = makeOriginSet;
function parseOriginSet(specList, setOptions = new OriginHashOptions(), options = new OriginParseOptions()) {
    const specSet = makeOriginSet(setOptions);
    for (const spec of specList) {
        const origin = parseOrigin(spec, options);
        if (origin !== undefined) {
            specSet.add(origin);
        }
    }
    return specSet;
}
exports.parseOriginSet = parseOriginSet;
function topicForOrigin(origin) {
    let scheme = origin.scheme;
    if (scheme === Scheme.WILDCARD_SOME) {
        scheme = Scheme.WILDCARD_ONE;
    }
    return scheme.slice(0, -1) + matcherOptions.separator + origin.host;
}
class OriginMatcher {
    constructor() {
        this.matcher = new qlobber_1.QlobberTrue(matcherOptions);
        this.exclude_matcher = new qlobber_1.QlobberTrue(matcherOptions);
    }
    add(origin) {
        const topic = topicForOrigin(origin);
        this.matcher.add(topic);
        return this;
    }
    exclude(origin) {
        const topic = topicForOrigin(origin);
        this.exclude_matcher.add(topic);
        return this;
    }
    has(origin) {
        const topic = topicForOrigin(origin);
        return this.matcher.test(topic) && !this.exclude_matcher.test(topic);
    }
}
exports.OriginMatcher = OriginMatcher;
function parseOriginMatcher(specList, options = new OriginParseOptions()) {
    if (specList.length > 0) {
        log_1.log(`making matcher from ${specList.length} entries`);
    }
    const matcher = new OriginMatcher();
    for (const spec of specList) {
        if (spec.startsWith(exclusionPrefix)) {
            const origin = parseOrigin(spec.substr(exclusionPrefix.length), options);
            if (origin !== undefined) {
                matcher.exclude(origin);
            }
        }
        else {
            const origin = parseOrigin(spec, options);
            if (origin !== undefined) {
                matcher.add(origin);
            }
        }
    }
    if (specList.length > 0) {
        log_1.log('finished making matcher');
    }
    return matcher;
}
exports.parseOriginMatcher = parseOriginMatcher;
class OriginExpiryMatcher {
    constructor() {
        this.matcher = new qlobber_1.Qlobber(matcherOptions);
    }
    add(origin, expiry) {
        const topic = topicForOrigin(origin);
        this.matcher.add(topic, expiry);
        return this;
    }
    has(origin) {
        const topic = topicForOrigin(origin);
        const expiries = this.matcher.match(topic);
        const now = Date.now() / 1000;
        for (const expiry of expiries) {
            if (expiry > now) {
                return true;
            }
        }
        return false;
    }
}
exports.OriginExpiryMatcher = OriginExpiryMatcher;
function parseOriginExpiryMatcher(specList, options = new OriginParseOptions()) {
    if (specList.length > 0) {
        log_1.log(`making expiry matcher from ${specList.length} entries`);
    }
    const matcher = new OriginExpiryMatcher();
    const now = Date.now() / 1000;
    for (const [spec, expiry] of specList) {
        if (expiry > now) {
            const origin = parseOrigin(spec, options);
            if (origin !== undefined) {
                matcher.add(origin, expiry);
            }
        }
    }
    if (specList.length > 0) {
        log_1.log('finished making expiry matcher');
    }
    return matcher;
}
exports.parseOriginExpiryMatcher = parseOriginExpiryMatcher;
class OriginGrouper {
    constructor() {
        this.grouper = new qlobber_1.Qlobber(matcherOptions);
    }
    addFromSpecList(specList, group, options = new OriginParseOptions()) {
        for (const spec of specList) {
            this.addFromSpec(spec, group, options);
        }
        return this;
    }
    addFromSpec(spec, group, options = new OriginParseOptions()) {
        const origin = parseOrigin(spec, options);
        if (maybe_1.some(origin)) {
            this.add(origin, group);
        }
        return this;
    }
    add(origin, group) {
        const topic = topicForOrigin(origin);
        this.grouper.add(topic, group);
        return this;
    }
    match(origin) {
        const topic = topicForOrigin(origin);
        return this.grouper.match(topic);
    }
}
exports.OriginGrouper = OriginGrouper;


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function isInRange(value, min, max) {
    return (value >= min) && (value <= max);
}
exports.isInRange = isInRange;
function isNumber(value) {
    return typeof value === "number";
}
exports.isNumber = isNumber;
function parseNumber(value) {
    try {
        const base = 10;
        return parseInt(value, base);
    }
    catch (e) {
        return undefined;
    }
}
exports.parseNumber = parseNumber;


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function murmurHashString(key, seed) {
    let len = key.length * 2;
    const m = 0xc6a4a793;
    const r = 16;
    let h = seed ^ (len * m);
    for (let i = 0; (i < key.length) && (len >= 4); i += 2) {
        const data = (key.charCodeAt(i) + (key.charCodeAt(i + 1) << 16));
        const k = data;
        h += k;
        h *= m;
        h ^= (h >> 16);
        len -= 4;
    }
    if (len === 2) {
        let data = key.charCodeAt(key.length - 1);
        h += data;
        h *= m;
        h ^= (h >> r);
    }
    h *= m;
    h ^= (h >> 10);
    h *= m;
    h ^= (h >> 17);
    return h;
}
function murmurHashNumber(key, seed) {
    let len = 4;
    const m = 0xc6a4a793;
    const r = 16;
    let h = seed ^ (len * m);
    const data = key & 0xffffffff;
    const k = data;
    h += k;
    h *= m;
    h ^= (h >> 16);
    h *= m;
    h ^= (h >> 10);
    h *= m;
    h ^= (h >> 17);
    return h;
}
function murmurHash(key, seed) {
    if (typeof key === 'string') {
        return murmurHashString(key, seed);
    }
    else if (typeof key === 'boolean') {
        return murmurHashNumber(key ? 1 : 0, seed);
    }
    else {
        return murmurHashNumber(key, seed);
    }
}
exports.murmurHash = murmurHash;


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.hostConstants = {
    hostHelperId: "com.bromium.hosthelper",
    blockedPage: "blocked-page.html",
    externalAppLinkPage: "external-app-link-page-v1.html",
    holdingPage: "holding-page.html",
    edgeExternalAppLinkQueryKey: "d1b30e68-83be-4b6e-9c2a-c1c4ca502e8b",
    edgeExternalAppLinkQueryValue: "0",
    blockedFilePage: "blocked-file-page.html",
    pageTrackerPortName: "com.bromium.page.tracker",
    externalAppLinkPagePortName: "com.bromium.external.app.link.page",
    blockedPagePortName: "com.bromium.blocked.page",
    blockedFilePagePortName: "com.bromium.blocked.file.page",
    popupPortName: "com.bromium.popup",
    optionsPortName: "com.bromium.options",
    maxAgePageEvent: 1000,
    postponementTimeout: 5000
};


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function makePromise(factory) {
    return new Promise((resolve, reject) => {
        resolve(factory());
    });
}
exports.makePromise = makePromise;
function makePromiseAsync(factory) {
    return new Promise((resolve, reject) => {
        factory(resolve);
    });
}
exports.makePromiseAsync = makePromiseAsync;


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const string_utils_1 = __webpack_require__(3);
const range_1 = __webpack_require__(98);
const message_types_1 = __webpack_require__(2);
const maybe_1 = __webpack_require__(0);
const errors_1 = __webpack_require__(21);
var ProtocolVersion;
(function (ProtocolVersion) {
    ProtocolVersion["v1"] = "tag:bromium.com,2018-02:protocols:google-chrome-extension:initial";
    ProtocolVersion["v2"] = "tag:bromium.com,2018-06:protocols:google-chrome-extension:v2";
    ProtocolVersion["v3"] = "tag:bromium.com,2018-07:protocols:google-chrome-extension:v3";
    ProtocolVersion["v4"] = "tag:bromium.com,2018-08:protocols:google-chrome-extension:v4";
    ProtocolVersion["v5"] = "tag:bromium.com,2018-11:protocols:google-chrome-extension:v5";
    ProtocolVersion["v6"] = "tag:bromium.com,2018-12:protocols:google-chrome-extension:v6";
    ProtocolVersion["v7"] = "tag:bromium.com,2019-01:protocols:google-chrome-extension:v7";
    ProtocolVersion["v8"] = "tag:bromium.com,2019-06:protocols:google-chrome-extension:v8";
    ProtocolVersion["v9"] = "tag:bromium.com,2019-07:protocols:google-chrome-extension:v9";
    ProtocolVersion["v10"] = "tag:bromium.com,2019-09:protocols:google-chrome-extension:v10";
    ProtocolVersion["v11"] = "tag:bromium.com,2019-10:protocols:google-chrome-extension:v11";
    ProtocolVersion["v12"] = "tag:bromium.com,2019-11:protocols:google-chrome-extension:v12";
})(ProtocolVersion = exports.ProtocolVersion || (exports.ProtocolVersion = {}));
exports.supportedProtocolVersions = [
    ProtocolVersion.v12,
    ProtocolVersion.v11,
    ProtocolVersion.v10,
    ProtocolVersion.v9,
    ProtocolVersion.v8,
    ProtocolVersion.v7,
    ProtocolVersion.v6,
    ProtocolVersion.v5,
    ProtocolVersion.v4,
    ProtocolVersion.v3,
    ProtocolVersion.v2,
    ProtocolVersion.v1
];
const supportedMessageTypes = (() => {
    const supportedMessageRanges = string_utils_1.makeStringHashMap();
    supportedMessageRanges.putMany([
        [ProtocolVersion.v1, new range_1.Range(message_types_1.MessageType.handshakeV1, message_types_1.MessageType.heartbeatV1)],
        [ProtocolVersion.v2, new range_1.Range(message_types_1.MessageType.handshakeV1, message_types_1.MessageType.enabledFeaturesResponseV2)],
        [ProtocolVersion.v3, new range_1.Range(message_types_1.MessageType.handshakeV1, message_types_1.MessageType.reputationChangedV3)],
        [ProtocolVersion.v4, new range_1.Range(message_types_1.MessageType.handshakeV1, message_types_1.MessageType.blockedPageDataResponseV4)],
        [ProtocolVersion.v5, new range_1.Range(message_types_1.MessageType.handshakeV1, message_types_1.MessageType.popupDataResponseV5)],
        [ProtocolVersion.v6, new range_1.Range(message_types_1.MessageType.handshakeV1, message_types_1.MessageType.trustUrlV6)],
        [ProtocolVersion.v7, new range_1.Range(message_types_1.MessageType.handshakeV1, message_types_1.MessageType.configChangedV7)],
        [ProtocolVersion.v8, new range_1.Range(message_types_1.MessageType.handshakeV1, message_types_1.MessageType.configChangedV8)],
        [ProtocolVersion.v9, new range_1.Range(message_types_1.MessageType.handshakeV1, message_types_1.MessageType.configChangedV9)],
        [ProtocolVersion.v10, new range_1.Range(message_types_1.MessageType.handshakeV1, message_types_1.MessageType.heartbeatV10)],
        [ProtocolVersion.v11, new range_1.Range(message_types_1.MessageType.handshakeV1, message_types_1.MessageType.configChangedV11)],
        [ProtocolVersion.v12, new range_1.Range(message_types_1.MessageType.handshakeV1, message_types_1.MessageType.configChangedV12)],
    ]);
    return supportedMessageRanges;
})();
function isMessageTypeSupported(messageType, protocolVersion) {
    const range = supportedMessageTypes.get(protocolVersion);
    if (maybe_1.none(range)) {
        return false;
    }
    return range.contains(messageType);
}
exports.isMessageTypeSupported = isMessageTypeSupported;
var VersionSupportStatus;
(function (VersionSupportStatus) {
    VersionSupportStatus[VersionSupportStatus["notHandshaken"] = 0] = "notHandshaken";
    VersionSupportStatus[VersionSupportStatus["supported"] = 1] = "supported";
    VersionSupportStatus[VersionSupportStatus["unsupported"] = 2] = "unsupported";
})(VersionSupportStatus = exports.VersionSupportStatus || (exports.VersionSupportStatus = {}));
const supportedErrors = (() => {
    const supportedErrors = string_utils_1.makeStringHashMap();
    supportedErrors.putMany([
        [ProtocolVersion.v1, new range_1.Range(errors_1.ChragError.notEnabled, errors_1.ChragError.recoveredFromError)],
        [ProtocolVersion.v2, new range_1.Range(errors_1.ChragError.notEnabled, errors_1.ChragError.recoveredFromError)],
        [ProtocolVersion.v3, new range_1.Range(errors_1.ChragError.notEnabled, errors_1.ChragError.recoveredFromError)],
        [ProtocolVersion.v4, new range_1.Range(errors_1.ChragError.notEnabled, errors_1.ChragError.recoveredFromError)],
        [ProtocolVersion.v5, new range_1.Range(errors_1.ChragError.notEnabled, errors_1.ChragError.recoveredFromError)],
        [ProtocolVersion.v6, new range_1.Range(errors_1.ChragError.notEnabled, errors_1.ChragError.recoveredFromError)],
        [ProtocolVersion.v7, new range_1.Range(errors_1.ChragError.notEnabled, errors_1.ChragError.is32bitFirefox)],
        [ProtocolVersion.v8, new range_1.Range(errors_1.ChragError.notEnabled, errors_1.ChragError.is32bitFirefox)],
        [ProtocolVersion.v9, new range_1.Range(errors_1.ChragError.notEnabled, errors_1.ChragError.is32bitFirefox)],
        [ProtocolVersion.v10, new range_1.Range(errors_1.ChragError.notEnabled, errors_1.ChragError.helperUnresponsive)],
        [ProtocolVersion.v11, new range_1.Range(errors_1.ChragError.notEnabled, errors_1.ChragError.helperUnresponsive)],
        [ProtocolVersion.v12, new range_1.Range(errors_1.ChragError.notEnabled, errors_1.ChragError.helperUnresponsive)],
    ]);
    return supportedErrors;
})();
function isErrorSupported(error, protocolVersion) {
    const range = supportedErrors.get(protocolVersion);
    if (maybe_1.none(range)) {
        return false;
    }
    return range.contains(error);
}
exports.isErrorSupported = isErrorSupported;
function shouldLogMessage(protocolVersion) {
    return !isMessageTypeSupported(message_types_1.MessageType.stopHelperV10, protocolVersion);
}
exports.shouldLogMessage = shouldLogMessage;
var HelpPageVersion;
(function (HelpPageVersion) {
    HelpPageVersion["v415"] = "v4.1.5";
    HelpPageVersion["v4181"] = "v4.1.8.1";
    HelpPageVersion["maxHelpPageVersion"] = "v4.1.8.1";
})(HelpPageVersion || (HelpPageVersion = {}));
;
const supportedHelpPageVersions = (() => {
    const supportedHelpPageVersions = string_utils_1.makeStringHashMap();
    supportedHelpPageVersions.putMany([
        [ProtocolVersion.v1, HelpPageVersion.v415],
        [ProtocolVersion.v2, HelpPageVersion.v415],
        [ProtocolVersion.v3, HelpPageVersion.v415],
        [ProtocolVersion.v4, HelpPageVersion.v415],
        [ProtocolVersion.v5, HelpPageVersion.v415],
        [ProtocolVersion.v6, HelpPageVersion.v415],
        [ProtocolVersion.v7, HelpPageVersion.v415],
        [ProtocolVersion.v8, HelpPageVersion.v415],
        [ProtocolVersion.v9, HelpPageVersion.v415],
        [ProtocolVersion.v10, HelpPageVersion.v415],
        [ProtocolVersion.v11, HelpPageVersion.v4181],
        [ProtocolVersion.v12, HelpPageVersion.v4181],
    ]);
    return supportedHelpPageVersions;
})();
function getHelpPageVersion(protocolVersion) {
    if (maybe_1.some(protocolVersion)) {
        const supportedVersion = supportedHelpPageVersions.get(protocolVersion);
        if (maybe_1.some(supportedVersion)) {
            return supportedVersion;
        }
    }
    return HelpPageVersion.maxHelpPageVersion;
}
exports.getHelpPageVersion = getHelpPageVersion;


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

// a duplex stream is just a stream that is both readable and writable.
// Since JS doesn't have multiple prototypal inheritance, this class
// prototypally inherits from Readable, and then parasitically from
// Writable.



/*<replacement>*/

var processNextTick = __webpack_require__(26);
/*</replacement>*/

/*<replacement>*/
var objectKeys = Object.keys || function (obj) {
  var keys = [];
  for (var key in obj) {
    keys.push(key);
  }return keys;
};
/*</replacement>*/

module.exports = Duplex;

/*<replacement>*/
var util = __webpack_require__(23);
util.inherits = __webpack_require__(18);
/*</replacement>*/

var Readable = __webpack_require__(41);
var Writable = __webpack_require__(34);

util.inherits(Duplex, Readable);

var keys = objectKeys(Writable.prototype);
for (var v = 0; v < keys.length; v++) {
  var method = keys[v];
  if (!Duplex.prototype[method]) Duplex.prototype[method] = Writable.prototype[method];
}

function Duplex(options) {
  if (!(this instanceof Duplex)) return new Duplex(options);

  Readable.call(this, options);
  Writable.call(this, options);

  if (options && options.readable === false) this.readable = false;

  if (options && options.writable === false) this.writable = false;

  this.allowHalfOpen = true;
  if (options && options.allowHalfOpen === false) this.allowHalfOpen = false;

  this.once('end', onend);
}

// the no-half-open enforcer
function onend() {
  // if we allow half-open state, or if the writable side ended,
  // then we're ok.
  if (this.allowHalfOpen || this._writableState.ended) return;

  // no more data can be written.
  // But allow more writes to happen in this tick.
  processNextTick(onEndNT, this);
}

function onEndNT(self) {
  self.end();
}

Object.defineProperty(Duplex.prototype, 'destroyed', {
  get: function () {
    if (this._readableState === undefined || this._writableState === undefined) {
      return false;
    }
    return this._readableState.destroyed && this._writableState.destroyed;
  },
  set: function (value) {
    // we ignore the value if the stream
    // has not been initialized yet
    if (this._readableState === undefined || this._writableState === undefined) {
      return;
    }

    // backward compatibility, the user is explicitly
    // managing destroyed
    this._readableState.destroyed = value;
    this._writableState.destroyed = value;
  }
});

Duplex.prototype._destroy = function (err, cb) {
  this.push(null);
  this.end();

  processNextTick(cb, err);
};

function forEach(xs, f) {
  for (var i = 0, l = xs.length; i < l; i++) {
    f(xs[i], i);
  }
}

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function isPowerOf2(value) {
    const mask = value - 1;
    return (value & mask) === 0;
}
function mod(n, d) {
    return n & (d - 1);
}
var TryPutStatus;
(function (TryPutStatus) {
    TryPutStatus[TryPutStatus["ValueInserted"] = 0] = "ValueInserted";
    TryPutStatus[TryPutStatus["ValueUpdated"] = 1] = "ValueUpdated";
    TryPutStatus[TryPutStatus["Failure"] = 2] = "Failure";
})(TryPutStatus || (TryPutStatus = {}));
function convertToArray(elements, selector) {
    const filteredElements = elements.filter((element) => {
        return element !== undefined && element !== null;
    });
    const mappedElements = filteredElements.map(selector);
    return mappedElements;
}
class HashMap {
    constructor(hash, compare, initialCapacity = 0, fillFactor = 0.75) {
        this.hash = hash;
        this.compare = compare;
        this.fillFactor = fillFactor;
        this.size = 0;
        this.elements = [];
        if (initialCapacity !== 0) {
            this.resize(initialCapacity);
        }
    }
    shouldResize(size) {
        if (this.elements.length === 0) {
            return true;
        }
        return (size / this.elements.length) >= this.fillFactor;
    }
    findNextCapacity() {
        if (this.elements.length === 0) {
            return 2;
        }
        return this.elements.length * 2;
    }
    findIndex(hash, elements = this.elements) {
        const index = mod(hash, elements.length);
        if (index < 0) {
            throw new Error(`HashMap.findIndex: index < 0: ${index} < 0`);
        }
        if (index >= elements.length) {
            throw new Error(`HashMap.findIndex: index >= elements.length: ${index} >= ${elements.length}`);
        }
        return index;
    }
    compareKeys(ha, ka, hb, kb) {
        return (ha === hb) && this.compare(ka, kb);
    }
    tryPut(hash, key, value, start, end, elements = this.elements) {
        for (let i = start; i < end; i += 1) {
            const element = elements[i];
            if (element !== undefined && element !== null) {
                const [currentHash, currentKey, currentValue] = element;
                if (this.compareKeys(hash, key, currentHash, currentKey)) {
                    elements[i] = [hash, key, value];
                    return TryPutStatus.ValueUpdated;
                }
            }
            else {
                elements[i] = [hash, key, value];
                return TryPutStatus.ValueInserted;
            }
        }
        return TryPutStatus.Failure;
    }
    resize(capacity) {
        if (capacity <= this.elements.length) {
            throw new Error(`HashMap.resize: capacity <= this.elements.length: ${capacity} <= ${this.elements.length}`);
        }
        if (capacity <= this.size) {
            throw new Error(`HashMap.resize: capacity <= this.size: ${capacity} <= ${this.size}`);
        }
        if (!isPowerOf2(capacity)) {
            throw new Error(`HashMap.resize: !isPowerOf2(${capacity})`);
        }
        const elements = new Array(capacity);
        for (let element of this.elements) {
            if (element !== undefined && element !== null) {
                const [hash, key, value] = element;
                const index = this.findIndex(hash, elements);
                if (this.tryPut(hash, key, value, index, elements.length, elements) !== TryPutStatus.Failure) {
                    continue;
                }
                if (this.tryPut(hash, key, value, 0, index, elements) !== TryPutStatus.Failure) {
                    continue;
                }
                throw new Error(`HashMap.resize: !tryPut`);
            }
        }
        this.elements = elements;
    }
    has(key) {
        return this.get(key) !== undefined;
    }
    isHole(element) {
        return element === undefined;
    }
    tryGet(hash, key, start, end) {
        const foundHole = true;
        for (let i = start; i < end; i += 1) {
            const element = this.elements[i];
            if (element !== undefined && element !== null) {
                const [currentHash, currentKey, currentValue] = element;
                if (this.compareKeys(hash, key, currentHash, currentKey)) {
                    return [!foundHole, currentValue];
                }
            }
            else if (this.isHole(element)) {
                return [foundHole, undefined];
            }
        }
        return [!foundHole, undefined];
    }
    get(key) {
        if (this.size === 0) {
            return undefined;
        }
        const hash = this.hash(key);
        const index = this.findIndex(hash);
        let [foundHole, value] = this.tryGet(hash, key, index, this.elements.length);
        if (value) {
            return value;
        }
        if (foundHole) {
            return undefined;
        }
        [foundHole, value] = this.tryGet(hash, key, 0, index);
        return value;
    }
    put(key, value) {
        if (this.shouldResize(this.size + 1)) {
            this.resize(this.findNextCapacity());
        }
        const hash = this.hash(key);
        const index = this.findIndex(hash);
        switch (this.tryPut(hash, key, value, index, this.elements.length)) {
            case TryPutStatus.ValueInserted:
                this.size += 1;
                return;
            case TryPutStatus.ValueUpdated:
                return;
        }
        switch (this.tryPut(hash, key, value, 0, index)) {
            case TryPutStatus.ValueInserted:
                this.size += 1;
                return;
            case TryPutStatus.ValueUpdated:
                return;
        }
        throw new Error('HashMap.put: !tryPut');
    }
    putMany(keyValues) {
        for (const [key, value] of keyValues) {
            this.put(key, value);
        }
    }
    tryRemove(hash, key, start, end) {
        const foundHole = true;
        const removed = true;
        for (let i = start; i < end; i += 1) {
            const element = this.elements[i];
            if (element !== undefined && element !== null) {
                const [currentHash, currentKey, currentValue] = element;
                if (this.compareKeys(hash, key, currentHash, currentKey)) {
                    this.elements[i] = null;
                    return [!foundHole, removed];
                }
            }
            else if (this.isHole(element)) {
                return [foundHole, !removed];
            }
        }
        return [!foundHole, !removed];
    }
    remove(key) {
        if (this.isEmpty()) {
            return false;
        }
        const hash = this.hash(key);
        const index = this.findIndex(hash);
        let [foundHole, removed] = this.tryRemove(hash, key, index, this.elements.length);
        if (removed) {
            this.size -= 1;
            return true;
        }
        if (foundHole) {
            return false;
        }
        [foundHole, removed] = this.tryRemove(hash, key, 0, index);
        if (removed) {
            this.size -= 1;
        }
        return removed;
    }
    isEmpty() {
        return this.size === 0;
    }
    toArray() {
        const selectKeyValue = ([hash, key, value]) => {
            return [key, value];
        };
        return convertToArray(this.elements, selectKeyValue);
    }
    *[Symbol.iterator]() {
        for (const element of this.elements) {
            if (element !== undefined && element !== null) {
                const [hash, key, value] = element;
                yield [key, value];
            }
        }
    }
}
exports.HashMap = HashMap;
class HashSet {
    constructor(hash, compare, initialCapacity = 0, fillFactor = 0.75) {
        this.map = new HashMap(hash, compare, initialCapacity, fillFactor);
    }
    get size() {
        return this.map.size;
    }
    addMany(keys) {
        let nKeysAdded = 0;
        for (const key of keys) {
            if (this.add(key)) {
                nKeysAdded += 1;
            }
        }
        return nKeysAdded;
    }
    add(key) {
        const sizeBefore = this.map.size;
        this.map.put(key, key);
        const sizeAfter = this.map.size;
        return (sizeAfter - sizeBefore) === 1;
    }
    has(key) {
        return this.map.has(key);
    }
    remove(key) {
        return this.map.remove(key);
    }
    isEmpty() {
        return this.map.isEmpty();
    }
    toArray() {
        const selectKey = ([hash, key, value]) => {
            return key;
        };
        return convertToArray(this.map.elements, selectKey);
    }
    *[Symbol.iterator]() {
        for (const element of this.map.elements) {
            if (element !== undefined && element !== null) {
                const [hash, key, value] = element;
                yield key;
            }
        }
    }
}
exports.HashSet = HashSet;
function defaultHash(instance) {
    return instance.hash();
}
function defaultCompare(a, b) {
    return a.compare(b);
}
function makeDefaultHashMap() {
    return new HashMap(defaultHash, defaultCompare);
}
exports.makeDefaultHashMap = makeDefaultHashMap;
function makeDefaultHashSet() {
    return new HashSet(defaultHash, defaultCompare);
}
exports.makeDefaultHashSet = makeDefaultHashSet;


/***/ }),
/* 17 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 18 */
/***/ (function(module, exports) {

if (typeof Object.create === 'function') {
  // implementation from standard node.js 'util' module
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor
    ctor.prototype = Object.create(superCtor.prototype, {
      constructor: {
        value: ctor,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
  };
} else {
  // old school shim for old browsers
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor
    var TempCtor = function () {}
    TempCtor.prototype = superCtor.prototype
    ctor.prototype = new TempCtor()
    ctor.prototype.constructor = ctor
  }
}


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const hash_map_1 = __webpack_require__(16);
const murmur_hash_1 = __webpack_require__(11);
class IdGenerator {
    constructor() {
        this.nextId = 0;
    }
    generateId() {
        const id = this.nextId;
        this.nextId += 1;
        return id;
    }
}
exports.IdGenerator = IdGenerator;
function hashId(id, seed = 0) {
    return murmur_hash_1.murmurHash(id, seed);
}
exports.hashId = hashId;
function isSameId(a, b) {
    return a === b;
}
exports.isSameId = isSameId;
function makeIdHashSet() {
    return new hash_map_1.HashSet(hashId, isSameId);
}
exports.makeIdHashSet = makeIdHashSet;
function makeIdHashMap() {
    return new hash_map_1.HashMap(hashId, isSameId);
}
exports.makeIdHashMap = makeIdHashMap;


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const once_1 = __webpack_require__(30);
class EventDispatcher {
    constructor() {
        this.eventHandlers = new Array();
        this.oneShotEventHandlers = new Array();
    }
    registerEventHandler(eventHandler) {
        this.eventHandlers.push(eventHandler);
    }
    registerOneShotEventHandler(eventHandler) {
        this.oneShotEventHandlers.push(eventHandler);
    }
    dispatchEvent(event) {
        for (const handleEvent of this.eventHandlers) {
            handleEvent(event);
        }
        for (const handleEvent of this.oneShotEventHandlers) {
            handleEvent(event);
        }
        this.oneShotEventHandlers = [];
    }
}
exports.EventDispatcher = EventDispatcher;
class ConditionDispatcher {
    constructor() {
        this.setCondition = once_1.doOnce(() => { this.setConditionImpl(); });
        this.condition = false;
        this.conditionHandlers = new Array();
    }
    registerConditionListener(conditionHandler) {
        if (this.condition) {
            conditionHandler();
        }
        else {
            this.conditionHandlers.push(conditionHandler);
        }
    }
    setConditionImpl() {
        this.condition = true;
        for (const handleCondition of this.conditionHandlers) {
            handleCondition();
        }
        this.conditionHandlers = [];
    }
}
exports.ConditionDispatcher = ConditionDispatcher;


/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const number_utils_1 = __webpack_require__(10);
var ChragError;
(function (ChragError) {
    ChragError[ChragError["notEnabled"] = 0] = "notEnabled";
    ChragError[ChragError["helperPortError"] = 1] = "helperPortError";
    ChragError[ChragError["launchBrowserFailed"] = 2] = "launchBrowserFailed";
    ChragError[ChragError["trustDownloadFailed"] = 3] = "trustDownloadFailed";
    ChragError[ChragError["handshakeError"] = 4] = "handshakeError";
    ChragError[ChragError["unknownError"] = 5] = "unknownError";
    ChragError[ChragError["recoveredFromError"] = 6] = "recoveredFromError";
    ChragError[ChragError["is32bitFirefox"] = 7] = "is32bitFirefox";
    ChragError[ChragError["helperUnresponsive"] = 8] = "helperUnresponsive";
})(ChragError = exports.ChragError || (exports.ChragError = {}));
var ChragErrorLimits;
(function (ChragErrorLimits) {
    ChragErrorLimits[ChragErrorLimits["min"] = 0] = "min";
    ChragErrorLimits[ChragErrorLimits["max"] = 8] = "max";
})(ChragErrorLimits || (ChragErrorLimits = {}));
function isChragError(type) {
    return number_utils_1.isInRange(type, ChragErrorLimits.min, ChragErrorLimits.max);
}
exports.isChragError = isChragError;
function isError(value) {
    return value instanceof Error;
}
exports.isError = isError;


/***/ }),
/* 22 */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(Buffer) {// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

// NOTE: These type checking functions intentionally don't use `instanceof`
// because it is fragile and can be easily faked with `Object.create()`.

function isArray(arg) {
  if (Array.isArray) {
    return Array.isArray(arg);
  }
  return objectToString(arg) === '[object Array]';
}
exports.isArray = isArray;

function isBoolean(arg) {
  return typeof arg === 'boolean';
}
exports.isBoolean = isBoolean;

function isNull(arg) {
  return arg === null;
}
exports.isNull = isNull;

function isNullOrUndefined(arg) {
  return arg == null;
}
exports.isNullOrUndefined = isNullOrUndefined;

function isNumber(arg) {
  return typeof arg === 'number';
}
exports.isNumber = isNumber;

function isString(arg) {
  return typeof arg === 'string';
}
exports.isString = isString;

function isSymbol(arg) {
  return typeof arg === 'symbol';
}
exports.isSymbol = isSymbol;

function isUndefined(arg) {
  return arg === void 0;
}
exports.isUndefined = isUndefined;

function isRegExp(re) {
  return objectToString(re) === '[object RegExp]';
}
exports.isRegExp = isRegExp;

function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}
exports.isObject = isObject;

function isDate(d) {
  return objectToString(d) === '[object Date]';
}
exports.isDate = isDate;

function isError(e) {
  return (objectToString(e) === '[object Error]' || e instanceof Error);
}
exports.isError = isError;

function isFunction(arg) {
  return typeof arg === 'function';
}
exports.isFunction = isFunction;

function isPrimitive(arg) {
  return arg === null ||
         typeof arg === 'boolean' ||
         typeof arg === 'number' ||
         typeof arg === 'string' ||
         typeof arg === 'symbol' ||  // ES6 symbol
         typeof arg === 'undefined';
}
exports.isPrimitive = isPrimitive;

exports.isBuffer = Buffer.isBuffer;

function objectToString(o) {
  return Object.prototype.toString.call(o);
}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(43).Buffer))

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const message_port_channel_1 = __webpack_require__(58);
const message_types_1 = __webpack_require__(2);
const messages_1 = __webpack_require__(5);
const log_1 = __webpack_require__(1);
const message_router_1 = __webpack_require__(54);
const on_configured_1 = __webpack_require__(61);
var ConnectionState;
(function (ConnectionState) {
    ConnectionState[ConnectionState["disconnected"] = 0] = "disconnected";
    ConnectionState[ConnectionState["connecting"] = 1] = "connecting";
    ConnectionState[ConnectionState["connected"] = 2] = "connected";
})(ConnectionState || (ConnectionState = {}));
class PagePortController {
    constructor(tabId, port, onConnect, onDisconnect, onConfigured = new on_configured_1.DummyOnConfigured()) {
        this.tabId = tabId;
        this.port = port;
        this.onConnect = onConnect;
        this.onDisconnect = onDisconnect;
        this.onConfigured = onConfigured;
        this.messageRouter = new message_router_1.GenericMessageRouter();
        this.connectionState = ConnectionState.disconnected;
        this.pageChannel = new message_port_channel_1.GenericMessagePortChannel(port, (port) => { this.onPageConnected(port); }, (port) => { this.onPageDisconnected(port); }, this.messageRouter, message_port_channel_1.Negotiation.None);
    }
    registerMessageHandler(type, handler) {
        this.messageRouter.registerMessageHandler(type, handler);
    }
    connect() {
        if (this.connectionState === ConnectionState.disconnected) {
            this.connectionState = ConnectionState.connecting;
            this.pageChannel.connect();
        }
    }
    sendMessage(type, payload) {
        const messageSender = this.pageChannel.messageSender;
        messageSender.sendMessage(type, payload);
    }
    sendExtensionReady() {
        this.sendMessage(message_types_1.MessageType.extensionReadyV1, new messages_1.ExtensionReadyV1(this.tabId));
    }
    onPageConnected(port) {
        log_1.log(`PagePortController.onPageConnected: tabId: ${this.tabId}`);
        this.connectionState = ConnectionState.connected;
        this.onConfigured.registerListener(() => {
            if (this.connectionState === ConnectionState.connected) {
                this.sendExtensionReady();
                this.onConnect(port);
            }
        });
    }
    onPageDisconnected(port) {
        log_1.log(`PagePortController.onPageDisconnected: tabId: ${this.tabId}`);
        this.connectionState = ConnectionState.disconnected;
        this.onDisconnect(port);
    }
}
exports.PagePortController = PagePortController;


/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const messages_1 = __webpack_require__(5);
const chrome_new_tab_urls_1 = __webpack_require__(87);
class Config {
    constructor() {
        this.trustedUrls = [];
        this.untrustedUrls = [];
        this.userTrustedOrigins = [];
        this.userUntrustedOrigins = [];
        this.reputableSites = {
            index: 0,
            total: 0,
            reputableSites: []
        };
        this.isEnabled = {
            chrome: true,
            firefox: true,
            edge: true,
            edgeChromium: true
        };
        this.openPhishingLinksInSecureBrowser = false;
        this.prioritiseTrustedSites = false;
        this.promptForUncategorized = false;
        this.isEnterpriseProduct = false;
        this.isConsumerProduct = false;
        this.dontAskAgain = false;
        this.secureBrowserRedirectTrustedSites = false;
        this.productStatus = messages_1.ProductStatuses.Enabled;
        this.phishingSourceSites = undefined;
        this.phishingNavigationSequences = undefined;
        this.newTabPageUrls = {
            chrome: chrome_new_tab_urls_1.chromeNewTabPageUrls,
            firefox: [],
            edge: [],
            edgeChromium: []
        };
    }
    static phishingSourceSitesVersion() {
        return 1;
    }
    static phishingNavigationSequencesVersion() {
        return 1;
    }
}
exports.Config = Config;
function loadConfig() {
    return new Config();
}
exports.loadConfig = loadConfig;


/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

if (!process.version ||
    process.version.indexOf('v0.') === 0 ||
    process.version.indexOf('v1.') === 0 && process.version.indexOf('v1.8.') !== 0) {
  module.exports = nextTick;
} else {
  module.exports = process.nextTick;
}

function nextTick(fn, arg1, arg2, arg3) {
  if (typeof fn !== 'function') {
    throw new TypeError('"callback" argument must be a function');
  }
  var len = arguments.length;
  var args, i;
  switch (len) {
  case 0:
  case 1:
    return process.nextTick(fn);
  case 2:
    return process.nextTick(function afterTickOne() {
      fn.call(null, arg1);
    });
  case 3:
    return process.nextTick(function afterTickTwo() {
      fn.call(null, arg1, arg2);
    });
  case 4:
    return process.nextTick(function afterTickThree() {
      fn.call(null, arg1, arg2, arg3);
    });
  default:
    args = new Array(len - 1);
    i = 0;
    while (i < args.length) {
      args[i++] = arguments[i];
    }
    return process.nextTick(function afterTick() {
      fn.apply(null, args);
    });
  }
}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(22)))

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

/* eslint-disable node/no-deprecated-api */
var buffer = __webpack_require__(43)
var Buffer = buffer.Buffer

// alternative to using Object.keys for old browsers
function copyProps (src, dst) {
  for (var key in src) {
    dst[key] = src[key]
  }
}
if (Buffer.from && Buffer.alloc && Buffer.allocUnsafe && Buffer.allocUnsafeSlow) {
  module.exports = buffer
} else {
  // Copy properties from require('buffer')
  copyProps(buffer, exports)
  exports.Buffer = SafeBuffer
}

function SafeBuffer (arg, encodingOrOffset, length) {
  return Buffer(arg, encodingOrOffset, length)
}

// Copy static methods from Buffer
copyProps(Buffer, SafeBuffer)

SafeBuffer.from = function (arg, encodingOrOffset, length) {
  if (typeof arg === 'number') {
    throw new TypeError('Argument must not be a number')
  }
  return Buffer(arg, encodingOrOffset, length)
}

SafeBuffer.alloc = function (size, fill, encoding) {
  if (typeof size !== 'number') {
    throw new TypeError('Argument must be a number')
  }
  var buf = Buffer(size)
  if (fill !== undefined) {
    if (typeof encoding === 'string') {
      buf.fill(fill, encoding)
    } else {
      buf.fill(fill)
    }
  } else {
    buf.fill(0)
  }
  return buf
}

SafeBuffer.allocUnsafe = function (size) {
  if (typeof size !== 'number') {
    throw new TypeError('Argument must be a number')
  }
  return Buffer(size)
}

SafeBuffer.allocUnsafeSlow = function (size) {
  if (typeof size !== 'number') {
    throw new TypeError('Argument must be a number')
  }
  return buffer.SlowBuffer(size)
}


/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const origin_1 = __webpack_require__(9);
const log_1 = __webpack_require__(1);
const maybe_1 = __webpack_require__(0);
const port_utils_1 = __webpack_require__(29);
const browser_1 = __webpack_require__(6);
const extensionUrlOriginParseOptions = new origin_1.OriginParseOptions({
    allowChromeExtensionScheme: true,
    allowFirefoxExtensionScheme: true,
    allowEdgeExtensionScheme: true
});
const ownOrigin = origin_1.parseOrigin(chrome.runtime.getURL("manifest.json"), extensionUrlOriginParseOptions);
function isOwnExtensionUrl(url) {
    return origin_1.isSameOrigin(ownOrigin, origin_1.parseOrigin(url, extensionUrlOriginParseOptions));
}
function removeUrlFromHistory(browser, url) {
    if (maybe_1.some(browser) && browser !== browser_1.Browser.edge) {
        log_1.log(`Removing history entry for "${url}"`);
        chrome.history.deleteUrl({ url: url });
    }
}
exports.removeUrlFromHistory = removeUrlFromHistory;
function removeExtensionPageFromHistoryAfterClosing(browser, port) {
    const pageUrl = port_utils_1.readPortPageUrl(port);
    if (maybe_1.some(pageUrl) && isOwnExtensionUrl(pageUrl)) {
        removeUrlFromHistory(browser, pageUrl.toString());
    }
}
exports.removeExtensionPageFromHistoryAfterClosing = removeExtensionPageFromHistoryAfterClosing;


/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const maybe_1 = __webpack_require__(0);
const tab_utils_1 = __webpack_require__(48);
const url_utils_1 = __webpack_require__(4);
const string_utils_1 = __webpack_require__(3);
function readPortTabId(port) {
    const sender = port.sender;
    if (maybe_1.none(sender)) {
        return undefined;
    }
    const tab = sender.tab;
    if (maybe_1.none(tab)) {
        return undefined;
    }
    const tabId = tab.id;
    if (maybe_1.none(tabId)) {
        return undefined;
    }
    if (!tab_utils_1.isValidTabId(tabId)) {
        return undefined;
    }
    return tabId;
}
exports.readPortTabId = readPortTabId;
function readPortPageUrl(port) {
    const sender = port.sender;
    if (maybe_1.none(sender)) {
        return;
    }
    const urlSpec = sender.url;
    if (maybe_1.none(urlSpec)) {
        return;
    }
    const url = url_utils_1.parseUrl(urlSpec);
    return url;
}
exports.readPortPageUrl = readPortPageUrl;
function readPortTabUrl(port) {
    const sender = port.sender;
    if (maybe_1.none(sender)) {
        return undefined;
    }
    const tab = sender.tab;
    if (maybe_1.none(tab)) {
        return undefined;
    }
    const urlSpec = tab.url;
    if (maybe_1.none(urlSpec)) {
        return undefined;
    }
    const url = url_utils_1.parseUrl(urlSpec);
    return url;
}
exports.readPortTabUrl = readPortTabUrl;
function readPortFrameId(port) {
    const sender = port.sender;
    if (maybe_1.none(sender)) {
        return undefined;
    }
    return sender.frameId;
}
exports.readPortFrameId = readPortFrameId;
function portToString(port) {
    if (port === undefined) {
        return "undefined";
    }
    return string_utils_1.toString({
        name: port.name,
        tabId: readPortTabId(port),
        frameId: readPortFrameId(port),
        pageUrl: readPortPageUrl(port)
    });
}
exports.portToString = portToString;


/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function doOnce(action) {
    let done = false;
    return () => {
        if (!done) {
            done = true;
            action();
        }
    };
}
exports.doOnce = doOnce;


/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const array_utils_1 = __webpack_require__(8);
var I18nMessages;
(function (I18nMessages) {
    I18nMessages["name"] = "extName";
    I18nMessages["locale"] = "locale";
    I18nMessages["productName"] = "productName";
    I18nMessages["blockedLinkPageTitle"] = "blockedLinkPageTitle";
    I18nMessages["blockedLinkPageOpenedSecureExplanation"] = "blockedLinkPageOpenedSecureExplanation";
    I18nMessages["blockedPDFPageTitle"] = "blockedPDFPageTitle";
    I18nMessages["blockedPDFPageOpenedSecureExplanation"] = "blockedPDFPageOpenedSecureExplanation";
    I18nMessages["blockedPageHelpLink"] = "blockedPageHelpLink";
    I18nMessages["blockedPageWarningTooltip"] = "blockedPageWarningTooltip";
    I18nMessages["blockedPageBrowserExplanation"] = "blockedPageSecureBrowserExplanation";
    I18nMessages["blockedPageSBXOpenedSecureExplanation"] = "blockedPageSBXOpenedSecureExplanation";
    I18nMessages["trustUrlButton"] = "blockedPageContinue";
    I18nMessages["trustUrlButtonWithSubstitution"] = "blockedPageContinueV2";
    I18nMessages["untrustUrlButton"] = "blockedPageSecure";
    I18nMessages["untrustUrlButtonWithSubstitution"] = "blockedPageSecureV2";
    I18nMessages["dontAskAgainText"] = "blockedPageDontAskAgain";
    I18nMessages["rememberTrustDecisionText"] = "blockedPageRemember";
    I18nMessages["openLinkInSecureBrowser"] = "contextMenuOpenSecure";
    I18nMessages["popupNoError"] = "popupNoError";
    I18nMessages["popupSBXDisabled"] = "popupSBXDisabled";
    I18nMessages["popupGenericError"] = "popupGenericError";
    I18nMessages["popupMissingHelper"] = "popupMissingHelper";
    I18nMessages["popupIs32bitFirefox"] = "popupIs32bitFirefox";
    I18nMessages["popupDontAskAgain"] = "popupDontAskAgain";
    I18nMessages["popupInitRequired"] = "popupInitRequired";
    I18nMessages["popupProductDisabled"] = "popupProductDisabled";
    I18nMessages["popupUnlicensed"] = "popupUnlicensed";
    I18nMessages["popupUnconfigured"] = "popupUnconfigured";
    I18nMessages["popupClearRememberedDecisionsText"] = "popupClearRememberedDecisionsText";
    I18nMessages["popupClearRememberedDecisionsButton"] = "popupClearRememberedDecisionsButton";
    I18nMessages["openOptionsPageText"] = "popupOpenOptionsPageText";
    I18nMessages["openOptionsPageButton"] = "popupOpenOptionsPageButton";
    I18nMessages["helpLinkText"] = "popupHelpLinkText";
    I18nMessages["helpLinkFile"] = "popupHelpLinkFile";
    I18nMessages["clearAllRememberedDecisionsButton"] = "optionsClearAllRememberedDecisionButton";
    I18nMessages["clearRememberedDecisionButton"] = "optionsClearRememberedDecisionsButton";
    I18nMessages["trustedOriginsTitle"] = "optionsTrustedOriginsTitle";
    I18nMessages["untrustedOriginsTitle"] = "optionsUntrustedOriginsTitle";
    I18nMessages["optionsNoRememberedDecisions"] = "optionsNoRememberedDecisions";
    I18nMessages["optionsPromptDisabled"] = "optionsPromptDisabled";
})(I18nMessages = exports.I18nMessages || (exports.I18nMessages = {}));
function getI18n(i18nMessage, ...subsitutions) {
    if (array_utils_1.isEmpty(subsitutions)) {
        return chrome.i18n.getMessage(i18nMessage);
    }
    else {
        return chrome.i18n.getMessage(i18nMessage, subsitutions);
    }
}
exports.getI18n = getI18n;
function isPopupError(i18nMessage) {
    return (i18nMessage === I18nMessages.popupGenericError ||
        i18nMessage === I18nMessages.popupMissingHelper ||
        i18nMessage === I18nMessages.popupIs32bitFirefox);
}
exports.isPopupError = isPopupError;
var PopupType;
(function (PopupType) {
    PopupType[PopupType["clearRememberedDecisions"] = 0] = "clearRememberedDecisions";
    PopupType[PopupType["optionsPage"] = 1] = "optionsPage";
})(PopupType = exports.PopupType || (exports.PopupType = {}));
exports.popupType = PopupType.clearRememberedDecisions;


/***/ }),
/* 32 */
/***/ (function(module, exports) {

// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

function EventEmitter() {
  this._events = this._events || {};
  this._maxListeners = this._maxListeners || undefined;
}
module.exports = EventEmitter;

// Backwards-compat with node 0.10.x
EventEmitter.EventEmitter = EventEmitter;

EventEmitter.prototype._events = undefined;
EventEmitter.prototype._maxListeners = undefined;

// By default EventEmitters will print a warning if more than 10 listeners are
// added to it. This is a useful default which helps finding memory leaks.
EventEmitter.defaultMaxListeners = 10;

// Obviously not all Emitters should be limited to 10. This function allows
// that to be increased. Set to zero for unlimited.
EventEmitter.prototype.setMaxListeners = function(n) {
  if (!isNumber(n) || n < 0 || isNaN(n))
    throw TypeError('n must be a positive number');
  this._maxListeners = n;
  return this;
};

EventEmitter.prototype.emit = function(type) {
  var er, handler, len, args, i, listeners;

  if (!this._events)
    this._events = {};

  // If there is no 'error' event listener then throw.
  if (type === 'error') {
    if (!this._events.error ||
        (isObject(this._events.error) && !this._events.error.length)) {
      er = arguments[1];
      if (er instanceof Error) {
        throw er; // Unhandled 'error' event
      } else {
        // At least give some kind of context to the user
        var err = new Error('Uncaught, unspecified "error" event. (' + er + ')');
        err.context = er;
        throw err;
      }
    }
  }

  handler = this._events[type];

  if (isUndefined(handler))
    return false;

  if (isFunction(handler)) {
    switch (arguments.length) {
      // fast cases
      case 1:
        handler.call(this);
        break;
      case 2:
        handler.call(this, arguments[1]);
        break;
      case 3:
        handler.call(this, arguments[1], arguments[2]);
        break;
      // slower
      default:
        args = Array.prototype.slice.call(arguments, 1);
        handler.apply(this, args);
    }
  } else if (isObject(handler)) {
    args = Array.prototype.slice.call(arguments, 1);
    listeners = handler.slice();
    len = listeners.length;
    for (i = 0; i < len; i++)
      listeners[i].apply(this, args);
  }

  return true;
};

EventEmitter.prototype.addListener = function(type, listener) {
  var m;

  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  if (!this._events)
    this._events = {};

  // To avoid recursion in the case that type === "newListener"! Before
  // adding it to the listeners, first emit "newListener".
  if (this._events.newListener)
    this.emit('newListener', type,
              isFunction(listener.listener) ?
              listener.listener : listener);

  if (!this._events[type])
    // Optimize the case of one listener. Don't need the extra array object.
    this._events[type] = listener;
  else if (isObject(this._events[type]))
    // If we've already got an array, just append.
    this._events[type].push(listener);
  else
    // Adding the second element, need to change to array.
    this._events[type] = [this._events[type], listener];

  // Check for listener leak
  if (isObject(this._events[type]) && !this._events[type].warned) {
    if (!isUndefined(this._maxListeners)) {
      m = this._maxListeners;
    } else {
      m = EventEmitter.defaultMaxListeners;
    }

    if (m && m > 0 && this._events[type].length > m) {
      this._events[type].warned = true;
      console.error('(node) warning: possible EventEmitter memory ' +
                    'leak detected. %d listeners added. ' +
                    'Use emitter.setMaxListeners() to increase limit.',
                    this._events[type].length);
      if (typeof console.trace === 'function') {
        // not supported in IE 10
        console.trace();
      }
    }
  }

  return this;
};

EventEmitter.prototype.on = EventEmitter.prototype.addListener;

EventEmitter.prototype.once = function(type, listener) {
  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  var fired = false;

  function g() {
    this.removeListener(type, g);

    if (!fired) {
      fired = true;
      listener.apply(this, arguments);
    }
  }

  g.listener = listener;
  this.on(type, g);

  return this;
};

// emits a 'removeListener' event iff the listener was removed
EventEmitter.prototype.removeListener = function(type, listener) {
  var list, position, length, i;

  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  if (!this._events || !this._events[type])
    return this;

  list = this._events[type];
  length = list.length;
  position = -1;

  if (list === listener ||
      (isFunction(list.listener) && list.listener === listener)) {
    delete this._events[type];
    if (this._events.removeListener)
      this.emit('removeListener', type, listener);

  } else if (isObject(list)) {
    for (i = length; i-- > 0;) {
      if (list[i] === listener ||
          (list[i].listener && list[i].listener === listener)) {
        position = i;
        break;
      }
    }

    if (position < 0)
      return this;

    if (list.length === 1) {
      list.length = 0;
      delete this._events[type];
    } else {
      list.splice(position, 1);
    }

    if (this._events.removeListener)
      this.emit('removeListener', type, listener);
  }

  return this;
};

EventEmitter.prototype.removeAllListeners = function(type) {
  var key, listeners;

  if (!this._events)
    return this;

  // not listening for removeListener, no need to emit
  if (!this._events.removeListener) {
    if (arguments.length === 0)
      this._events = {};
    else if (this._events[type])
      delete this._events[type];
    return this;
  }

  // emit removeListener for all listeners on all events
  if (arguments.length === 0) {
    for (key in this._events) {
      if (key === 'removeListener') continue;
      this.removeAllListeners(key);
    }
    this.removeAllListeners('removeListener');
    this._events = {};
    return this;
  }

  listeners = this._events[type];

  if (isFunction(listeners)) {
    this.removeListener(type, listeners);
  } else if (listeners) {
    // LIFO order
    while (listeners.length)
      this.removeListener(type, listeners[listeners.length - 1]);
  }
  delete this._events[type];

  return this;
};

EventEmitter.prototype.listeners = function(type) {
  var ret;
  if (!this._events || !this._events[type])
    ret = [];
  else if (isFunction(this._events[type]))
    ret = [this._events[type]];
  else
    ret = this._events[type].slice();
  return ret;
};

EventEmitter.prototype.listenerCount = function(type) {
  if (this._events) {
    var evlistener = this._events[type];

    if (isFunction(evlistener))
      return 1;
    else if (evlistener)
      return evlistener.length;
  }
  return 0;
};

EventEmitter.listenerCount = function(emitter, type) {
  return emitter.listenerCount(type);
};

function isFunction(arg) {
  return typeof arg === 'function';
}

function isNumber(arg) {
  return typeof arg === 'number';
}

function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}

function isUndefined(arg) {
  return arg === void 0;
}


/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(41);
exports.Stream = exports;
exports.Readable = exports;
exports.Writable = __webpack_require__(34);
exports.Duplex = __webpack_require__(15);
exports.Transform = __webpack_require__(46);
exports.PassThrough = __webpack_require__(81);


/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process, setImmediate, global) {// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

// A bit simpler than readable streams.
// Implement an async ._write(chunk, encoding, cb), and it'll handle all
// the drain event emission and buffering.



/*<replacement>*/

var processNextTick = __webpack_require__(26);
/*</replacement>*/

module.exports = Writable;

/* <replacement> */
function WriteReq(chunk, encoding, cb) {
  this.chunk = chunk;
  this.encoding = encoding;
  this.callback = cb;
  this.next = null;
}

// It seems a linked list but it is not
// there will be only 2 of these for each stream
function CorkedRequest(state) {
  var _this = this;

  this.next = null;
  this.entry = null;
  this.finish = function () {
    onCorkedFinish(_this, state);
  };
}
/* </replacement> */

/*<replacement>*/
var asyncWrite = !process.browser && ['v0.10', 'v0.9.'].indexOf(process.version.slice(0, 5)) > -1 ? setImmediate : processNextTick;
/*</replacement>*/

/*<replacement>*/
var Duplex;
/*</replacement>*/

Writable.WritableState = WritableState;

/*<replacement>*/
var util = __webpack_require__(23);
util.inherits = __webpack_require__(18);
/*</replacement>*/

/*<replacement>*/
var internalUtil = {
  deprecate: __webpack_require__(80)
};
/*</replacement>*/

/*<replacement>*/
var Stream = __webpack_require__(42);
/*</replacement>*/

/*<replacement>*/
var Buffer = __webpack_require__(27).Buffer;
var OurUint8Array = global.Uint8Array || function () {};
function _uint8ArrayToBuffer(chunk) {
  return Buffer.from(chunk);
}
function _isUint8Array(obj) {
  return Buffer.isBuffer(obj) || obj instanceof OurUint8Array;
}
/*</replacement>*/

var destroyImpl = __webpack_require__(44);

util.inherits(Writable, Stream);

function nop() {}

function WritableState(options, stream) {
  Duplex = Duplex || __webpack_require__(15);

  options = options || {};

  // object stream flag to indicate whether or not this stream
  // contains buffers or objects.
  this.objectMode = !!options.objectMode;

  if (stream instanceof Duplex) this.objectMode = this.objectMode || !!options.writableObjectMode;

  // the point at which write() starts returning false
  // Note: 0 is a valid value, means that we always return false if
  // the entire buffer is not flushed immediately on write()
  var hwm = options.highWaterMark;
  var defaultHwm = this.objectMode ? 16 : 16 * 1024;
  this.highWaterMark = hwm || hwm === 0 ? hwm : defaultHwm;

  // cast to ints.
  this.highWaterMark = Math.floor(this.highWaterMark);

  // if _final has been called
  this.finalCalled = false;

  // drain event flag.
  this.needDrain = false;
  // at the start of calling end()
  this.ending = false;
  // when end() has been called, and returned
  this.ended = false;
  // when 'finish' is emitted
  this.finished = false;

  // has it been destroyed
  this.destroyed = false;

  // should we decode strings into buffers before passing to _write?
  // this is here so that some node-core streams can optimize string
  // handling at a lower level.
  var noDecode = options.decodeStrings === false;
  this.decodeStrings = !noDecode;

  // Crypto is kind of old and crusty.  Historically, its default string
  // encoding is 'binary' so we have to make this configurable.
  // Everything else in the universe uses 'utf8', though.
  this.defaultEncoding = options.defaultEncoding || 'utf8';

  // not an actual buffer we keep track of, but a measurement
  // of how much we're waiting to get pushed to some underlying
  // socket or file.
  this.length = 0;

  // a flag to see when we're in the middle of a write.
  this.writing = false;

  // when true all writes will be buffered until .uncork() call
  this.corked = 0;

  // a flag to be able to tell if the onwrite cb is called immediately,
  // or on a later tick.  We set this to true at first, because any
  // actions that shouldn't happen until "later" should generally also
  // not happen before the first write call.
  this.sync = true;

  // a flag to know if we're processing previously buffered items, which
  // may call the _write() callback in the same tick, so that we don't
  // end up in an overlapped onwrite situation.
  this.bufferProcessing = false;

  // the callback that's passed to _write(chunk,cb)
  this.onwrite = function (er) {
    onwrite(stream, er);
  };

  // the callback that the user supplies to write(chunk,encoding,cb)
  this.writecb = null;

  // the amount that is being written when _write is called.
  this.writelen = 0;

  this.bufferedRequest = null;
  this.lastBufferedRequest = null;

  // number of pending user-supplied write callbacks
  // this must be 0 before 'finish' can be emitted
  this.pendingcb = 0;

  // emit prefinish if the only thing we're waiting for is _write cbs
  // This is relevant for synchronous Transform streams
  this.prefinished = false;

  // True if the error was already emitted and should not be thrown again
  this.errorEmitted = false;

  // count buffered requests
  this.bufferedRequestCount = 0;

  // allocate the first CorkedRequest, there is always
  // one allocated and free to use, and we maintain at most two
  this.corkedRequestsFree = new CorkedRequest(this);
}

WritableState.prototype.getBuffer = function getBuffer() {
  var current = this.bufferedRequest;
  var out = [];
  while (current) {
    out.push(current);
    current = current.next;
  }
  return out;
};

(function () {
  try {
    Object.defineProperty(WritableState.prototype, 'buffer', {
      get: internalUtil.deprecate(function () {
        return this.getBuffer();
      }, '_writableState.buffer is deprecated. Use _writableState.getBuffer ' + 'instead.', 'DEP0003')
    });
  } catch (_) {}
})();

// Test _writableState for inheritance to account for Duplex streams,
// whose prototype chain only points to Readable.
var realHasInstance;
if (typeof Symbol === 'function' && Symbol.hasInstance && typeof Function.prototype[Symbol.hasInstance] === 'function') {
  realHasInstance = Function.prototype[Symbol.hasInstance];
  Object.defineProperty(Writable, Symbol.hasInstance, {
    value: function (object) {
      if (realHasInstance.call(this, object)) return true;

      return object && object._writableState instanceof WritableState;
    }
  });
} else {
  realHasInstance = function (object) {
    return object instanceof this;
  };
}

function Writable(options) {
  Duplex = Duplex || __webpack_require__(15);

  // Writable ctor is applied to Duplexes, too.
  // `realHasInstance` is necessary because using plain `instanceof`
  // would return false, as no `_writableState` property is attached.

  // Trying to use the custom `instanceof` for Writable here will also break the
  // Node.js LazyTransform implementation, which has a non-trivial getter for
  // `_writableState` that would lead to infinite recursion.
  if (!realHasInstance.call(Writable, this) && !(this instanceof Duplex)) {
    return new Writable(options);
  }

  this._writableState = new WritableState(options, this);

  // legacy.
  this.writable = true;

  if (options) {
    if (typeof options.write === 'function') this._write = options.write;

    if (typeof options.writev === 'function') this._writev = options.writev;

    if (typeof options.destroy === 'function') this._destroy = options.destroy;

    if (typeof options.final === 'function') this._final = options.final;
  }

  Stream.call(this);
}

// Otherwise people can pipe Writable streams, which is just wrong.
Writable.prototype.pipe = function () {
  this.emit('error', new Error('Cannot pipe, not readable'));
};

function writeAfterEnd(stream, cb) {
  var er = new Error('write after end');
  // TODO: defer error events consistently everywhere, not just the cb
  stream.emit('error', er);
  processNextTick(cb, er);
}

// Checks that a user-supplied chunk is valid, especially for the particular
// mode the stream is in. Currently this means that `null` is never accepted
// and undefined/non-string values are only allowed in object mode.
function validChunk(stream, state, chunk, cb) {
  var valid = true;
  var er = false;

  if (chunk === null) {
    er = new TypeError('May not write null values to stream');
  } else if (typeof chunk !== 'string' && chunk !== undefined && !state.objectMode) {
    er = new TypeError('Invalid non-string/buffer chunk');
  }
  if (er) {
    stream.emit('error', er);
    processNextTick(cb, er);
    valid = false;
  }
  return valid;
}

Writable.prototype.write = function (chunk, encoding, cb) {
  var state = this._writableState;
  var ret = false;
  var isBuf = _isUint8Array(chunk) && !state.objectMode;

  if (isBuf && !Buffer.isBuffer(chunk)) {
    chunk = _uint8ArrayToBuffer(chunk);
  }

  if (typeof encoding === 'function') {
    cb = encoding;
    encoding = null;
  }

  if (isBuf) encoding = 'buffer';else if (!encoding) encoding = state.defaultEncoding;

  if (typeof cb !== 'function') cb = nop;

  if (state.ended) writeAfterEnd(this, cb);else if (isBuf || validChunk(this, state, chunk, cb)) {
    state.pendingcb++;
    ret = writeOrBuffer(this, state, isBuf, chunk, encoding, cb);
  }

  return ret;
};

Writable.prototype.cork = function () {
  var state = this._writableState;

  state.corked++;
};

Writable.prototype.uncork = function () {
  var state = this._writableState;

  if (state.corked) {
    state.corked--;

    if (!state.writing && !state.corked && !state.finished && !state.bufferProcessing && state.bufferedRequest) clearBuffer(this, state);
  }
};

Writable.prototype.setDefaultEncoding = function setDefaultEncoding(encoding) {
  // node::ParseEncoding() requires lower case.
  if (typeof encoding === 'string') encoding = encoding.toLowerCase();
  if (!(['hex', 'utf8', 'utf-8', 'ascii', 'binary', 'base64', 'ucs2', 'ucs-2', 'utf16le', 'utf-16le', 'raw'].indexOf((encoding + '').toLowerCase()) > -1)) throw new TypeError('Unknown encoding: ' + encoding);
  this._writableState.defaultEncoding = encoding;
  return this;
};

function decodeChunk(state, chunk, encoding) {
  if (!state.objectMode && state.decodeStrings !== false && typeof chunk === 'string') {
    chunk = Buffer.from(chunk, encoding);
  }
  return chunk;
}

// if we're already writing something, then just put this
// in the queue, and wait our turn.  Otherwise, call _write
// If we return false, then we need a drain event, so set that flag.
function writeOrBuffer(stream, state, isBuf, chunk, encoding, cb) {
  if (!isBuf) {
    var newChunk = decodeChunk(state, chunk, encoding);
    if (chunk !== newChunk) {
      isBuf = true;
      encoding = 'buffer';
      chunk = newChunk;
    }
  }
  var len = state.objectMode ? 1 : chunk.length;

  state.length += len;

  var ret = state.length < state.highWaterMark;
  // we must ensure that previous needDrain will not be reset to false.
  if (!ret) state.needDrain = true;

  if (state.writing || state.corked) {
    var last = state.lastBufferedRequest;
    state.lastBufferedRequest = {
      chunk: chunk,
      encoding: encoding,
      isBuf: isBuf,
      callback: cb,
      next: null
    };
    if (last) {
      last.next = state.lastBufferedRequest;
    } else {
      state.bufferedRequest = state.lastBufferedRequest;
    }
    state.bufferedRequestCount += 1;
  } else {
    doWrite(stream, state, false, len, chunk, encoding, cb);
  }

  return ret;
}

function doWrite(stream, state, writev, len, chunk, encoding, cb) {
  state.writelen = len;
  state.writecb = cb;
  state.writing = true;
  state.sync = true;
  if (writev) stream._writev(chunk, state.onwrite);else stream._write(chunk, encoding, state.onwrite);
  state.sync = false;
}

function onwriteError(stream, state, sync, er, cb) {
  --state.pendingcb;

  if (sync) {
    // defer the callback if we are being called synchronously
    // to avoid piling up things on the stack
    processNextTick(cb, er);
    // this can emit finish, and it will always happen
    // after error
    processNextTick(finishMaybe, stream, state);
    stream._writableState.errorEmitted = true;
    stream.emit('error', er);
  } else {
    // the caller expect this to happen before if
    // it is async
    cb(er);
    stream._writableState.errorEmitted = true;
    stream.emit('error', er);
    // this can emit finish, but finish must
    // always follow error
    finishMaybe(stream, state);
  }
}

function onwriteStateUpdate(state) {
  state.writing = false;
  state.writecb = null;
  state.length -= state.writelen;
  state.writelen = 0;
}

function onwrite(stream, er) {
  var state = stream._writableState;
  var sync = state.sync;
  var cb = state.writecb;

  onwriteStateUpdate(state);

  if (er) onwriteError(stream, state, sync, er, cb);else {
    // Check if we're actually ready to finish, but don't emit yet
    var finished = needFinish(state);

    if (!finished && !state.corked && !state.bufferProcessing && state.bufferedRequest) {
      clearBuffer(stream, state);
    }

    if (sync) {
      /*<replacement>*/
      asyncWrite(afterWrite, stream, state, finished, cb);
      /*</replacement>*/
    } else {
      afterWrite(stream, state, finished, cb);
    }
  }
}

function afterWrite(stream, state, finished, cb) {
  if (!finished) onwriteDrain(stream, state);
  state.pendingcb--;
  cb();
  finishMaybe(stream, state);
}

// Must force callback to be called on nextTick, so that we don't
// emit 'drain' before the write() consumer gets the 'false' return
// value, and has a chance to attach a 'drain' listener.
function onwriteDrain(stream, state) {
  if (state.length === 0 && state.needDrain) {
    state.needDrain = false;
    stream.emit('drain');
  }
}

// if there's something in the buffer waiting, then process it
function clearBuffer(stream, state) {
  state.bufferProcessing = true;
  var entry = state.bufferedRequest;

  if (stream._writev && entry && entry.next) {
    // Fast case, write everything using _writev()
    var l = state.bufferedRequestCount;
    var buffer = new Array(l);
    var holder = state.corkedRequestsFree;
    holder.entry = entry;

    var count = 0;
    var allBuffers = true;
    while (entry) {
      buffer[count] = entry;
      if (!entry.isBuf) allBuffers = false;
      entry = entry.next;
      count += 1;
    }
    buffer.allBuffers = allBuffers;

    doWrite(stream, state, true, state.length, buffer, '', holder.finish);

    // doWrite is almost always async, defer these to save a bit of time
    // as the hot path ends with doWrite
    state.pendingcb++;
    state.lastBufferedRequest = null;
    if (holder.next) {
      state.corkedRequestsFree = holder.next;
      holder.next = null;
    } else {
      state.corkedRequestsFree = new CorkedRequest(state);
    }
  } else {
    // Slow case, write chunks one-by-one
    while (entry) {
      var chunk = entry.chunk;
      var encoding = entry.encoding;
      var cb = entry.callback;
      var len = state.objectMode ? 1 : chunk.length;

      doWrite(stream, state, false, len, chunk, encoding, cb);
      entry = entry.next;
      // if we didn't call the onwrite immediately, then
      // it means that we need to wait until it does.
      // also, that means that the chunk and cb are currently
      // being processed, so move the buffer counter past them.
      if (state.writing) {
        break;
      }
    }

    if (entry === null) state.lastBufferedRequest = null;
  }

  state.bufferedRequestCount = 0;
  state.bufferedRequest = entry;
  state.bufferProcessing = false;
}

Writable.prototype._write = function (chunk, encoding, cb) {
  cb(new Error('_write() is not implemented'));
};

Writable.prototype._writev = null;

Writable.prototype.end = function (chunk, encoding, cb) {
  var state = this._writableState;

  if (typeof chunk === 'function') {
    cb = chunk;
    chunk = null;
    encoding = null;
  } else if (typeof encoding === 'function') {
    cb = encoding;
    encoding = null;
  }

  if (chunk !== null && chunk !== undefined) this.write(chunk, encoding);

  // .end() fully uncorks
  if (state.corked) {
    state.corked = 1;
    this.uncork();
  }

  // ignore unnecessary end() calls.
  if (!state.ending && !state.finished) endWritable(this, state, cb);
};

function needFinish(state) {
  return state.ending && state.length === 0 && state.bufferedRequest === null && !state.finished && !state.writing;
}
function callFinal(stream, state) {
  stream._final(function (err) {
    state.pendingcb--;
    if (err) {
      stream.emit('error', err);
    }
    state.prefinished = true;
    stream.emit('prefinish');
    finishMaybe(stream, state);
  });
}
function prefinish(stream, state) {
  if (!state.prefinished && !state.finalCalled) {
    if (typeof stream._final === 'function') {
      state.pendingcb++;
      state.finalCalled = true;
      processNextTick(callFinal, stream, state);
    } else {
      state.prefinished = true;
      stream.emit('prefinish');
    }
  }
}

function finishMaybe(stream, state) {
  var need = needFinish(state);
  if (need) {
    prefinish(stream, state);
    if (state.pendingcb === 0) {
      state.finished = true;
      stream.emit('finish');
    }
  }
  return need;
}

function endWritable(stream, state, cb) {
  state.ending = true;
  finishMaybe(stream, state);
  if (cb) {
    if (state.finished) processNextTick(cb);else stream.once('finish', cb);
  }
  state.ended = true;
  stream.writable = false;
}

function onCorkedFinish(corkReq, state, err) {
  var entry = corkReq.entry;
  corkReq.entry = null;
  while (entry) {
    var cb = entry.callback;
    state.pendingcb--;
    cb(err);
    entry = entry.next;
  }
  if (state.corkedRequestsFree) {
    state.corkedRequestsFree.next = corkReq;
  } else {
    state.corkedRequestsFree = corkReq;
  }
}

Object.defineProperty(Writable.prototype, 'destroyed', {
  get: function () {
    if (this._writableState === undefined) {
      return false;
    }
    return this._writableState.destroyed;
  },
  set: function (value) {
    // we ignore the value if the stream
    // has not been initialized yet
    if (!this._writableState) {
      return;
    }

    // backward compatibility, the user is explicitly
    // managing destroyed
    this._writableState.destroyed = value;
  }
});

Writable.prototype.destroy = destroyImpl.destroy;
Writable.prototype._undestroy = destroyImpl.undestroy;
Writable.prototype._destroy = function (err, cb) {
  this.end();
  cb(err);
};
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(22), __webpack_require__(78).setImmediate, __webpack_require__(17)))

/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const maybe_1 = __webpack_require__(0);
function first(elements) {
    for (const element of elements) {
        return element;
    }
    return undefined;
}
exports.first = first;
function last(elements) {
    let lastElement = undefined;
    for (const element of elements) {
        lastElement = element;
    }
    return lastElement;
}
exports.last = last;
function count(elements) {
    let count = 0;
    for (const element of elements) {
        count += 1;
    }
    return count;
}
exports.count = count;
function toArray(elements) {
    let array = [];
    for (const element of elements) {
        array.push(element);
    }
    return array;
}
exports.toArray = toArray;
function* filter(elements, predicate) {
    for (const element of elements) {
        if (predicate(element)) {
            yield element;
        }
    }
}
exports.filter = filter;
function* map(elements, transform) {
    for (const element of elements) {
        yield transform(element);
    }
}
exports.map = map;
function isEmpty(elements) {
    for (const element of elements) {
        return false;
    }
    return true;
}
exports.isEmpty = isEmpty;
function has(elements, predicate) {
    return !isEmpty(filter(elements, predicate));
}
exports.has = has;
function isEqual(a, b) {
    return a === b;
}
exports.isEqual = isEqual;
function contains(elements, value, compare = isEqual) {
    for (const element of elements) {
        if (compare(element, value)) {
            return true;
        }
    }
    return false;
}
exports.contains = contains;
function* intersect(as, bs, compare = isEqual) {
    for (const a of as) {
        if (contains(bs, a, compare)) {
            yield a;
        }
    }
}
exports.intersect = intersect;
function* setDifference(as, bs, compare = isEqual) {
    for (const a of as) {
        if (!contains(bs, a, compare)) {
            yield a;
        }
    }
}
exports.setDifference = setDifference;
function max(elements, choose) {
    let chosen = undefined;
    for (const element of elements) {
        if (maybe_1.some(chosen)) {
            chosen = choose(chosen, element);
        }
        else {
            chosen = element;
        }
    }
    return chosen;
}
exports.max = max;


/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const murmur_hash_1 = __webpack_require__(11);
const origin_1 = __webpack_require__(9);
const maybe_1 = __webpack_require__(0);
const log_1 = __webpack_require__(1);
const string_utils_1 = __webpack_require__(3);
const array_utils_1 = __webpack_require__(8);
const number_utils_1 = __webpack_require__(10);
const unused_1 = __webpack_require__(93);
const content_type_1 = __webpack_require__(37);
var NavType;
(function (NavType) {
    NavType[NavType["noType"] = 0] = "noType";
    NavType[NavType["navigation"] = 1] = "navigation";
    NavType[NavType["redirect"] = 2] = "redirect";
    NavType[NavType["parentTab"] = 4] = "parentTab";
    NavType[NavType["contentType"] = 8] = "contentType";
    NavType[NavType["navOrRedirect"] = 3] = "navOrRedirect";
})(NavType = exports.NavType || (exports.NavType = {}));
var UrlCategory;
(function (UrlCategory) {
    UrlCategory[UrlCategory["uncategorizedUrl"] = 1] = "uncategorizedUrl";
    UrlCategory[UrlCategory["trustedUrl"] = 2] = "trustedUrl";
    UrlCategory[UrlCategory["untrustedUrl"] = 4] = "untrustedUrl";
    UrlCategory[UrlCategory["phishingSourceSiteUrl"] = 8] = "phishingSourceSiteUrl";
    UrlCategory[UrlCategory["webMailSiteUrl"] = 16] = "webMailSiteUrl";
    UrlCategory[UrlCategory["authSiteUrl"] = 32] = "authSiteUrl";
    UrlCategory[UrlCategory["siteRequiresAuthUrl"] = 64] = "siteRequiresAuthUrl";
    UrlCategory[UrlCategory["externalAppLink"] = 128] = "externalAppLink";
    UrlCategory[UrlCategory["anyUrl"] = 255] = "anyUrl";
})(UrlCategory = exports.UrlCategory || (exports.UrlCategory = {}));
function notUrlCategory(category) {
    return (~category) & UrlCategory.anyUrl;
}
function* orUrlCategories(mask) {
    const categories = [
        UrlCategory.uncategorizedUrl,
        UrlCategory.trustedUrl,
        UrlCategory.untrustedUrl,
        UrlCategory.phishingSourceSiteUrl,
        UrlCategory.webMailSiteUrl
    ];
    for (const category of categories) {
        if ((mask & category) !== 0x0) {
            yield category;
        }
    }
}
var NavModifer;
(function (NavModifer) {
    NavModifer[NavModifer["noModifier"] = 0] = "noModifier";
    NavModifer[NavModifer["repeated"] = 1] = "repeated";
    NavModifer[NavModifer["not"] = 2] = "not";
    NavModifer[NavModifer["or"] = 4] = "or";
})(NavModifer = exports.NavModifer || (exports.NavModifer = {}));
function categorizeUrl(isTrustedUrl, isUntrustedUrl, isPhishingSourceSite, isWebMailSite, isExternalAppLink) {
    if (isPhishingSourceSite) {
        return UrlCategory.phishingSourceSiteUrl;
    }
    else if (isWebMailSite) {
        return UrlCategory.webMailSiteUrl;
    }
    else if (isExternalAppLink) {
        return UrlCategory.externalAppLink;
    }
    else if (isTrustedUrl) {
        return UrlCategory.trustedUrl;
    }
    else if (isUntrustedUrl) {
        return UrlCategory.untrustedUrl;
    }
    else {
        return UrlCategory.uncategorizedUrl;
    }
}
exports.categorizeUrl = categorizeUrl;
class NavPattern {
    constructor(modifiers, type, id) {
        this.modifiers = modifiers;
        this.type = type;
        this.id = id;
    }
    hasModifier(modifier) {
        return (this.modifiers & modifier) !== NavModifer.noModifier;
    }
    get hasRepeatedModifier() {
        return this.hasModifier(NavModifer.repeated);
    }
    get hasNotModifer() {
        return this.hasModifier(NavModifer.not);
    }
    get hasOrModifier() {
        return this.hasModifier(NavModifer.or);
    }
    *buildNavigations() {
        return;
    }
    get asBackReference() {
        return undefined;
    }
    get asContentType() {
        return undefined;
    }
    *navTypes() {
        const navTypes = [
            NavType.navigation,
            NavType.redirect,
            NavType.parentTab
        ];
        const mask = this.type;
        for (const navType of navTypes) {
            if ((mask & navType) !== 0x0) {
                yield navType;
            }
        }
    }
}
exports.NavPattern = NavPattern;
class OriginNavPattern extends NavPattern {
    constructor(modifiers, type, origin, id) {
        super(modifiers, type, id);
        this.origin = origin;
    }
    *buildNavigations() {
        for (const navType of this.navTypes()) {
            yield new OriginNav(navType, this.origin);
        }
    }
}
exports.OriginNavPattern = OriginNavPattern;
class CategorizedNavPattern extends NavPattern {
    constructor(modifiers, type, category, id) {
        super(modifiers, type, id);
        this.category = category;
    }
    *buildNavigations() {
        for (const navType of this.navTypes()) {
            if (this.hasNotModifer) {
                for (const category of orUrlCategories(notUrlCategory(this.category))) {
                    yield new CategorizedNav(navType, category);
                }
            }
            else if (this.hasOrModifier) {
                for (const category of orUrlCategories(this.category)) {
                    yield new CategorizedNav(navType, category);
                }
            }
            else if (this.category === UrlCategory.anyUrl) {
                for (const category of orUrlCategories(this.category)) {
                    yield new CategorizedNav(navType, category);
                }
            }
            else {
                yield new CategorizedNav(navType, this.category);
            }
        }
    }
}
exports.CategorizedNavPattern = CategorizedNavPattern;
class GroupNavPattern extends NavPattern {
    constructor(modifiers, type, groupName, id) {
        super(modifiers, type, id);
        this.groupName = groupName;
    }
    *buildNavigations() {
        for (const navType of this.navTypes()) {
            yield new GroupNav(navType, this.groupName);
        }
    }
}
exports.GroupNavPattern = GroupNavPattern;
class BackRefNavPattern extends NavPattern {
    constructor(modifiers, type, backRef, id) {
        super(modifiers, type, id);
        this.modifiers = modifiers;
        this.type = type;
        this.backRef = backRef;
    }
    get asBackReference() {
        return this;
    }
}
exports.BackRefNavPattern = BackRefNavPattern;
class ContentTypeNavPattern extends NavPattern {
    constructor(contentType, id) {
        super(NavModifer.noModifier, NavType.noType, id);
        this.contentType = contentType;
    }
    get asContentType() {
        return this;
    }
}
exports.ContentTypeNavPattern = ContentTypeNavPattern;
class OriginNav {
    constructor(type, origin) {
        this.type = type;
        this.origin = origin;
    }
    hashWithSeed(seed) {
        let hash = seed;
        hash = murmur_hash_1.murmurHash(this.type, hash);
        hash = origin_1.hashOrigin(this.origin, new origin_1.OriginHashOptions({ seed: hash }));
        return hash;
    }
    hash() {
        const seed = 0;
        return this.hashWithSeed(seed);
    }
    compare(other) {
        return (this.type === other.type) && origin_1.isSameOrigin(this.origin, other.origin);
    }
}
exports.OriginNav = OriginNav;
class CategorizedNav {
    constructor(type, category) {
        this.type = type;
        this.category = category;
    }
    hashWithSeed(seed) {
        let hash = seed;
        hash = murmur_hash_1.murmurHash(this.type, hash);
        hash = murmur_hash_1.murmurHash(this.category, hash);
        return hash;
    }
    hash() {
        const seed = 0;
        return this.hashWithSeed(seed);
    }
    compare(other) {
        return (this.type === other.type) && (this.category === other.category);
    }
}
exports.CategorizedNav = CategorizedNav;
class GroupNav {
    constructor(type, groupName) {
        this.type = type;
        this.groupName = groupName;
    }
    hashWithSeed(seed) {
        let hash = seed;
        hash = murmur_hash_1.murmurHash(this.type, hash);
        hash = murmur_hash_1.murmurHash(this.groupName, hash);
        return hash;
    }
    hash() {
        const seed = 0;
        return this.hashWithSeed(seed);
    }
    compare(other) {
        return (this.type === other.type) &&
            string_utils_1.compareStrings(this.groupName, other.groupName);
    }
}
exports.GroupNav = GroupNav;
function makeOriginNav(type, url) {
    if (maybe_1.none(url)) {
        return undefined;
    }
    const origin = origin_1.parseOrigin(url);
    if (maybe_1.none(origin)) {
        return undefined;
    }
    return new OriginNav(type, origin);
}
exports.makeOriginNav = makeOriginNav;
function isOriginNav(navigation) {
    return navigation instanceof OriginNav;
}
exports.isOriginNav = isOriginNav;
function isCategorizedNav(navigation) {
    return navigation instanceof CategorizedNav;
}
exports.isCategorizedNav = isCategorizedNav;
function isGroupNav(navigation) {
    return navigation instanceof GroupNav;
}
exports.isGroupNav = isGroupNav;
function hashNavigation(navigation) {
    return navigation.hash();
}
exports.hashNavigation = hashNavigation;
function isSameNavigation(a, b) {
    if (isOriginNav(a) && isOriginNav(b)) {
        return a.compare(b);
    }
    else if (isCategorizedNav(a) && isCategorizedNav(b)) {
        return a.compare(b);
    }
    else if (isGroupNav(a) && isGroupNav(b)) {
        return a.compare(b);
    }
    else {
        return false;
    }
}
exports.isSameNavigation = isSameNavigation;
var NavTypeKey;
(function (NavTypeKey) {
    NavTypeKey["navigation"] = "navigateTo";
    NavTypeKey["redirect"] = "redirectTo";
    NavTypeKey["parentTab"] = "parentTab";
    NavTypeKey["contentType"] = "contentType";
    NavTypeKey["navOrRedirect"] = "navOrRedirectTo";
})(NavTypeKey = exports.NavTypeKey || (exports.NavTypeKey = {}));
var UrlCategoryKey;
(function (UrlCategoryKey) {
    UrlCategoryKey["anyUrl"] = "<anyUrl>";
    UrlCategoryKey["uncategorizedUrl"] = "<uncategorizedUrl>";
    UrlCategoryKey["trustedUrl"] = "<trustedUrl>";
    UrlCategoryKey["untrustedUrl"] = "<untrustedUrl>";
    UrlCategoryKey["phishingSourceSiteUrl"] = "<phishingSourceSiteUrl>";
    UrlCategoryKey["webMailSiteUrl"] = "<webMailSiteUrl>";
    UrlCategoryKey["authSiteUrl"] = "<authSiteUrl>";
    UrlCategoryKey["siteRequiresAuthUrl"] = "<siteRequiresAuthUrl>";
    UrlCategoryKey["externalAppLink"] = "<externalAppLink>";
})(UrlCategoryKey = exports.UrlCategoryKey || (exports.UrlCategoryKey = {}));
var NavModiferKey;
(function (NavModiferKey) {
    NavModiferKey["repeated"] = "repeat";
    NavModiferKey["not"] = "not";
    NavModiferKey["or"] = "or";
})(NavModiferKey = exports.NavModiferKey || (exports.NavModiferKey = {}));
function urlCategoryToString(urlCategory) {
    switch (urlCategory) {
        case UrlCategory.anyUrl:
            return UrlCategoryKey.anyUrl;
        case UrlCategory.uncategorizedUrl:
            return UrlCategoryKey.uncategorizedUrl;
        case UrlCategory.trustedUrl:
            return UrlCategoryKey.trustedUrl;
        case UrlCategory.untrustedUrl:
            return UrlCategoryKey.untrustedUrl;
        case UrlCategory.phishingSourceSiteUrl:
            return UrlCategoryKey.phishingSourceSiteUrl;
        case UrlCategory.webMailSiteUrl:
            return UrlCategoryKey.webMailSiteUrl;
        case UrlCategory.authSiteUrl:
            return UrlCategoryKey.authSiteUrl;
        case UrlCategory.siteRequiresAuthUrl:
            return UrlCategoryKey.siteRequiresAuthUrl;
        case UrlCategory.externalAppLink:
            return UrlCategoryKey.externalAppLink;
        default:
            return `<Invalid UrlCategory: ${urlCategory}>`;
    }
}
exports.urlCategoryToString = urlCategoryToString;
function parseNavType(navTypeKey) {
    switch (navTypeKey) {
        case NavTypeKey.navigation:
            return NavType.navigation;
        case NavTypeKey.redirect:
            return NavType.redirect;
        case NavTypeKey.parentTab:
            return NavType.parentTab;
        case NavTypeKey.contentType:
            return NavType.contentType;
        case NavTypeKey.navOrRedirect:
            return NavType.navOrRedirect;
        default:
            return undefined;
    }
}
function parseUrlCategory(urlCategoryKey) {
    switch (urlCategoryKey) {
        case UrlCategoryKey.anyUrl:
            return UrlCategory.anyUrl;
        case UrlCategoryKey.uncategorizedUrl:
            return UrlCategory.uncategorizedUrl;
        case UrlCategoryKey.trustedUrl:
            return UrlCategory.trustedUrl;
        case UrlCategoryKey.untrustedUrl:
            return UrlCategory.untrustedUrl;
        case UrlCategoryKey.phishingSourceSiteUrl:
            return UrlCategory.phishingSourceSiteUrl;
        case UrlCategoryKey.webMailSiteUrl:
            return UrlCategory.webMailSiteUrl;
        case UrlCategoryKey.authSiteUrl:
            return UrlCategory.authSiteUrl;
        case UrlCategoryKey.siteRequiresAuthUrl:
            return UrlCategory.siteRequiresAuthUrl;
        case UrlCategoryKey.externalAppLink:
            return UrlCategory.externalAppLink;
        default:
            return undefined;
    }
}
function parseNavModiferKey(navModifierKey) {
    switch (navModifierKey) {
        case NavModiferKey.repeated:
            return NavModifer.repeated;
        case NavModiferKey.not:
            return NavModifer.not;
        case NavModiferKey.or:
            return NavModifer.or;
        default:
            return undefined;
    }
}
var HttpHeaderType;
(function (HttpHeaderType) {
    HttpHeaderType[HttpHeaderType["contentType"] = 1] = "contentType";
})(HttpHeaderType = exports.HttpHeaderType || (exports.HttpHeaderType = {}));
var HttpHeaderTypeKey;
(function (HttpHeaderTypeKey) {
    HttpHeaderTypeKey["contentType"] = "Content-Type";
})(HttpHeaderTypeKey = exports.HttpHeaderTypeKey || (exports.HttpHeaderTypeKey = {}));
function parseHeaderType(headerKey) {
    switch (headerKey.toLowerCase()) {
        case HttpHeaderTypeKey.contentType.toLowerCase():
            return HttpHeaderType.contentType;
        default:
            return undefined;
    }
}
exports.parseHeaderType = parseHeaderType;
function headerTypeToString(header) {
    switch (header) {
        case HttpHeaderType.contentType:
            return HttpHeaderTypeKey.contentType;
        default:
            return `Unknown Header: ${header}`;
    }
}
exports.headerTypeToString = headerTypeToString;
function parseGroupName(groupName) {
    const groupNamePrefix = "$";
    if (groupName.startsWith(groupNamePrefix)) {
        return groupName;
    }
    else {
        return undefined;
    }
}
exports.parseGroupName = parseGroupName;
var LexedNavTokenType;
(function (LexedNavTokenType) {
    LexedNavTokenType[LexedNavTokenType["navModifier"] = 0] = "navModifier";
    LexedNavTokenType[LexedNavTokenType["navType"] = 1] = "navType";
    LexedNavTokenType[LexedNavTokenType["urlCategory"] = 2] = "urlCategory";
    LexedNavTokenType[LexedNavTokenType["origin"] = 3] = "origin";
    LexedNavTokenType[LexedNavTokenType["backRef"] = 4] = "backRef";
    LexedNavTokenType[LexedNavTokenType["urlCategoryArray"] = 5] = "urlCategoryArray";
    LexedNavTokenType[LexedNavTokenType["headerType"] = 6] = "headerType";
    LexedNavTokenType[LexedNavTokenType["contentType"] = 7] = "contentType";
    LexedNavTokenType[LexedNavTokenType["groupName"] = 8] = "groupName";
})(LexedNavTokenType || (LexedNavTokenType = {}));
function lexStringToken(token) {
    const modifier = parseNavModiferKey(token);
    if (maybe_1.some(modifier)) {
        return [LexedNavTokenType.navModifier, modifier];
    }
    const type = parseNavType(token);
    if (maybe_1.some(type)) {
        return [LexedNavTokenType.navType, type];
    }
    const category = parseUrlCategory(token);
    if (maybe_1.some(category)) {
        return [LexedNavTokenType.urlCategory, category];
    }
    const origin = origin_1.parseOrigin(token);
    if (maybe_1.some(origin)) {
        return [LexedNavTokenType.origin, origin];
    }
    const header = parseHeaderType(token);
    if (maybe_1.some(header)) {
        return [LexedNavTokenType.headerType, header];
    }
    const contentType = content_type_1.parseContentType(token);
    if (maybe_1.some(contentType)) {
        return [LexedNavTokenType.contentType, contentType];
    }
    const groupName = parseGroupName(token);
    if (maybe_1.some(groupName)) {
        return [LexedNavTokenType.groupName, groupName];
    }
    return undefined;
}
function lexNavigation(tokens, lexedTokens) {
    if (array_utils_1.isEmpty(tokens)) {
        return true;
    }
    const [token, remainingTokens] = [array_utils_1.first(tokens), array_utils_1.rest(tokens)];
    const oldLength = lexedTokens.length;
    if (string_utils_1.isString(token)) {
        const lexedToken = lexStringToken(token);
        if (maybe_1.some(lexedToken)) {
            lexedTokens.push(lexedToken);
        }
    }
    if (number_utils_1.isNumber(token)) {
        const backRef = token;
        lexedTokens.push([LexedNavTokenType.backRef, backRef]);
    }
    if (array_utils_1.isArray(token)) {
        const subTokens = token;
        const urlCategories = subTokens.map((subToken) => {
            if (string_utils_1.isString(subToken)) {
                return parseUrlCategory(subToken);
            }
            return undefined;
        }).filter(maybe_1.some);
        const didLexSubTokens = (urlCategories.length === subTokens.length);
        if (!didLexSubTokens) {
            return false;
        }
        lexedTokens.push([LexedNavTokenType.urlCategoryArray, urlCategories]);
    }
    const newLength = lexedTokens.length;
    const didLexToken = (newLength > oldLength);
    if (didLexToken) {
        return lexNavigation(remainingTokens, lexedTokens);
    }
    else {
        return false;
    }
}
var NavNodeType;
(function (NavNodeType) {
    NavNodeType[NavNodeType["repeatedNav"] = 0] = "repeatedNav";
    NavNodeType[NavNodeType["typedNav"] = 1] = "typedNav";
    NavNodeType[NavNodeType["originNav"] = 2] = "originNav";
    NavNodeType[NavNodeType["categorizedNav"] = 3] = "categorizedNav";
    NavNodeType[NavNodeType["backRef"] = 4] = "backRef";
    NavNodeType[NavNodeType["notNav"] = 5] = "notNav";
    NavNodeType[NavNodeType["orNav"] = 6] = "orNav";
    NavNodeType[NavNodeType["contentTypeNav"] = 7] = "contentTypeNav";
    NavNodeType[NavNodeType["groupNameNav"] = 8] = "groupNameNav";
})(NavNodeType || (NavNodeType = {}));
class NavNode {
    constructor(type) {
        this.type = type;
    }
    visit(visitor) {
        unused_1.unused(visitor);
    }
}
class RepeatedNavNode extends NavNode {
    constructor(child) {
        super(NavNodeType.repeatedNav);
        this.child = child;
    }
    visit(visitor) {
        visitor.visitRepeatedNav(this);
        this.child.visit(visitor);
    }
}
class TypedNavNode extends NavNode {
    constructor(navType, child) {
        super(NavNodeType.repeatedNav);
        this.navType = navType;
        this.child = child;
    }
    visit(visitor) {
        visitor.visitTypedNav(this);
        this.child.visit(visitor);
    }
}
class OriginNavNode extends NavNode {
    constructor(origin) {
        super(NavNodeType.originNav);
        this.origin = origin;
    }
    visit(visitor) {
        visitor.visitOriginNav(this);
    }
}
class CategorizedNavNode extends NavNode {
    constructor(category) {
        super(NavNodeType.categorizedNav);
        this.category = category;
    }
    visit(visitor) {
        visitor.visitCategorizedNav(this);
    }
}
class NotNavNode extends NavNode {
    constructor(child) {
        super(NavNodeType.notNav);
        this.child = child;
    }
    visit(visitor) {
        visitor.visitNotNav(this);
        this.child.visit(visitor);
    }
}
class OrNavNode extends NavNode {
    constructor(categories) {
        super(NavNodeType.orNav);
        this.categories = categories;
    }
    visit(visitor) {
        visitor.visitOrNav(this);
    }
}
class BackRefNavNode extends NavNode {
    constructor(backRef) {
        super(NavNodeType.backRef);
        this.backRef = backRef;
    }
    visit(visitor) {
        visitor.visitBackRefNav(this);
    }
}
class ContentTypeNavNode extends NavNode {
    constructor(contentType) {
        super(NavNodeType.contentTypeNav);
        this.contentType = contentType;
    }
    visit(visitor) {
        visitor.visitContentTypeNav(this);
    }
}
class GroupNameNavNode extends NavNode {
    constructor(groupName) {
        super(NavNodeType.groupNameNav);
        this.groupName = groupName;
    }
    visit(visitor) {
        visitor.visitGroupNameNav(this);
    }
}
function parseNavNode(tokens) {
    if (array_utils_1.isEmpty(tokens)) {
        return undefined;
    }
    const [[tokenType, token], remainingTokens] = [array_utils_1.first(tokens), array_utils_1.rest(tokens)];
    switch (tokenType) {
        case LexedNavTokenType.navModifier: {
            const modifier = token;
            switch (modifier) {
                case NavModifer.repeated: {
                    const childNode = parseNavNode(remainingTokens);
                    if (maybe_1.none(childNode)) {
                        return undefined;
                    }
                    return new RepeatedNavNode(childNode);
                }
                case NavModifer.not: {
                    if (array_utils_1.isEmpty(remainingTokens)) {
                        return undefined;
                    }
                    const childNode = parseNavNode(remainingTokens);
                    if (maybe_1.none(childNode)) {
                        return undefined;
                    }
                    return new NotNavNode(childNode);
                }
                case NavModifer.or: {
                    if (array_utils_1.isEmpty(remainingTokens)) {
                        return undefined;
                    }
                    const [nextTokenType, nextToken] = array_utils_1.first(remainingTokens);
                    if (nextTokenType !== LexedNavTokenType.urlCategoryArray) {
                        return undefined;
                    }
                    if (!array_utils_1.isArray(nextToken)) {
                        return undefined;
                    }
                    const categories = nextToken;
                    if (!array_utils_1.isEmpty(array_utils_1.rest(remainingTokens))) {
                        return undefined;
                    }
                    return new OrNavNode(categories);
                }
                default: {
                    return undefined;
                }
            }
        }
        case LexedNavTokenType.navType: {
            const navType = token;
            const childNode = parseNavNode(remainingTokens);
            if (maybe_1.none(childNode)) {
                return undefined;
            }
            return new TypedNavNode(navType, childNode);
        }
        case LexedNavTokenType.urlCategory: {
            const category = token;
            if (!array_utils_1.isEmpty(remainingTokens)) {
                return undefined;
            }
            return new CategorizedNavNode(category);
        }
        case LexedNavTokenType.origin: {
            const origin = token;
            if (!array_utils_1.isEmpty(remainingTokens)) {
                return undefined;
            }
            return new OriginNavNode(origin);
        }
        case LexedNavTokenType.backRef: {
            const backRef = token;
            if (!array_utils_1.isEmpty(remainingTokens)) {
                return undefined;
            }
            return new BackRefNavNode(backRef);
        }
        case LexedNavTokenType.headerType: {
            if (array_utils_1.isEmpty(remainingTokens)) {
                return undefined;
            }
            const [nextTokenType, nextToken] = array_utils_1.first(remainingTokens);
            if (nextTokenType !== LexedNavTokenType.contentType) {
                return undefined;
            }
            if (!array_utils_1.isEmpty(array_utils_1.rest(remainingTokens))) {
                return undefined;
            }
            const contentType = nextToken;
            return new ContentTypeNavNode(contentType);
        }
        case LexedNavTokenType.groupName: {
            const groupName = token;
            if (!array_utils_1.isEmpty(remainingTokens)) {
                return undefined;
            }
            return new GroupNameNavNode(groupName);
        }
        default: {
            return undefined;
        }
    }
}
var NavNodeVisitorState;
(function (NavNodeVisitorState) {
    NavNodeVisitorState[NavNodeVisitorState["visitedNoNode"] = 0] = "visitedNoNode";
    NavNodeVisitorState[NavNodeVisitorState["visitedRepeatedNode"] = 1] = "visitedRepeatedNode";
    NavNodeVisitorState[NavNodeVisitorState["visitiedTypedNode"] = 2] = "visitiedTypedNode";
    NavNodeVisitorState[NavNodeVisitorState["visitedNotNode"] = 3] = "visitedNotNode";
    NavNodeVisitorState[NavNodeVisitorState["visitedTerminalNode"] = 4] = "visitedTerminalNode";
    NavNodeVisitorState[NavNodeVisitorState["error"] = 5] = "error";
})(NavNodeVisitorState || (NavNodeVisitorState = {}));
class NavNodeVisitor {
    constructor(id) {
        this.id = id;
        this.state = NavNodeVisitorState.visitedNoNode;
        this.modifiers = NavModifer.noModifier;
        this.navType = undefined;
        this.navPattern = undefined;
    }
    visitRepeatedNav(node) {
        switch (this.state) {
            case NavNodeVisitorState.visitedNoNode: {
                this.state = NavNodeVisitorState.visitedRepeatedNode;
                this.modifiers |= NavModifer.repeated;
                break;
            }
            default: {
                this.state = NavNodeVisitorState.error;
                break;
            }
        }
    }
    visitTypedNav(node) {
        const onVisited = () => {
            this.state = NavNodeVisitorState.visitiedTypedNode;
            this.navType = node.navType;
        };
        switch (this.state) {
            case NavNodeVisitorState.visitedNoNode: {
                onVisited();
                break;
            }
            case NavNodeVisitorState.visitedRepeatedNode: {
                onVisited();
                break;
            }
            default: {
                this.state = NavNodeVisitorState.error;
                break;
            }
        }
    }
    visitOriginNav(node) {
        switch (this.state) {
            case NavNodeVisitorState.visitiedTypedNode: {
                this.state = NavNodeVisitorState.visitedTerminalNode;
                this.navPattern = new OriginNavPattern(this.modifiers, this.navType, node.origin, this.id);
                break;
            }
            default: {
                this.state = NavNodeVisitorState.error;
                break;
            }
        }
    }
    visitCategorizedNav(node) {
        const onVisited = () => {
            this.state = NavNodeVisitorState.visitedTerminalNode;
            this.navPattern = new CategorizedNavPattern(this.modifiers, this.navType, node.category, this.id);
        };
        switch (this.state) {
            case NavNodeVisitorState.visitiedTypedNode: {
                onVisited();
                break;
            }
            case NavNodeVisitorState.visitedNotNode: {
                onVisited();
                break;
            }
            default: {
                this.state = NavNodeVisitorState.error;
                break;
            }
        }
    }
    visitBackRefNav(node) {
        const onVisited = () => {
            this.state = NavNodeVisitorState.visitedTerminalNode;
            this.navPattern = new BackRefNavPattern(this.modifiers, this.navType, node.backRef, this.id);
        };
        switch (this.state) {
            case NavNodeVisitorState.visitiedTypedNode: {
                onVisited();
                break;
            }
            case NavNodeVisitorState.visitedNotNode: {
                onVisited();
                break;
            }
            default: {
                this.state = NavNodeVisitorState.error;
                break;
            }
        }
    }
    visitNotNav(node) {
        switch (this.state) {
            case NavNodeVisitorState.visitiedTypedNode: {
                this.state = NavNodeVisitorState.visitedNotNode;
                this.modifiers |= NavModifer.not;
                break;
            }
            default: {
                this.state = NavNodeVisitorState.error;
                break;
            }
        }
    }
    visitOrNav(node) {
        switch (this.state) {
            case NavNodeVisitorState.visitiedTypedNode: {
                this.state = NavNodeVisitorState.visitedTerminalNode;
                this.modifiers |= NavModifer.or;
                let categories = UrlCategory.uncategorizedUrl;
                for (const category of node.categories) {
                    categories |= category;
                }
                this.navPattern = new CategorizedNavPattern(this.modifiers, this.navType, categories, this.id);
                break;
            }
            default: {
                this.state = NavNodeVisitorState.error;
                break;
            }
        }
    }
    visitContentTypeNav(node) {
        switch (this.state) {
            case NavNodeVisitorState.visitedNoNode: {
                this.state = NavNodeVisitorState.visitedTerminalNode;
                this.navPattern = new ContentTypeNavPattern(node.contentType, this.id);
                break;
            }
            default: {
                this.state = NavNodeVisitorState.error;
                break;
            }
        }
    }
    visitGroupNameNav(node) {
        switch (this.state) {
            case NavNodeVisitorState.visitiedTypedNode: {
                this.state = NavNodeVisitorState.visitedTerminalNode;
                this.navPattern = new GroupNavPattern(this.modifiers, this.navType, node.groupName, this.id);
                break;
            }
            default: {
                this.state = NavNodeVisitorState.error;
                break;
            }
        }
    }
    visit(node) {
        node.visit(this);
        if (this.state === NavNodeVisitorState.error) {
            return undefined;
        }
        if (this.state !== NavNodeVisitorState.visitedTerminalNode) {
            return undefined;
        }
        return this.navPattern;
    }
}
function parseNavigation(tokens, index) {
    if (array_utils_1.isEmpty(tokens)) {
        return undefined;
    }
    const lexedTokens = [];
    if (!lexNavigation(tokens, lexedTokens)) {
        return undefined;
    }
    const node = parseNavNode(lexedTokens);
    if (maybe_1.none(node)) {
        return undefined;
    }
    const id = index + 1;
    const visitor = new NavNodeVisitor(id);
    const navigation = visitor.visit(node);
    return navigation;
}
function parseNavSequence(serializedNavSequence) {
    const parsedNavSequence = serializedNavSequence.map(parseNavigation);
    if (parsedNavSequence.some(maybe_1.none)) {
        return undefined;
    }
    const navSequence = parsedNavSequence.filter(maybe_1.some);
    return navSequence;
}
exports.parseNavSequence = parseNavSequence;
function parseNavMetadata(serializedNavMetadata) {
    if (maybe_1.none(serializedNavMetadata.precedence)) {
        return undefined;
    }
    if (maybe_1.none(serializedNavMetadata.allow) && maybe_1.none(serializedNavMetadata.block)) {
        return undefined;
    }
    if (maybe_1.none(serializedNavMetadata.navigateTo)) {
        return undefined;
    }
    return serializedNavMetadata;
}
exports.parseNavMetadata = parseNavMetadata;
function parseNavSeqData(serializedNavSeqData) {
    const parsedNavSequence = parseNavSequence(serializedNavSeqData.seq);
    if (maybe_1.none(parsedNavSequence)) {
        return undefined;
    }
    const parsedNavMetadata = parseNavMetadata(serializedNavSeqData.metadata);
    if (maybe_1.none(parsedNavMetadata)) {
        return undefined;
    }
    return [parsedNavSequence, parsedNavMetadata];
}
exports.parseNavSeqData = parseNavSeqData;
function checkVersion(serializedPhishingNavSeqData, expectedVersion) {
    const isValidVersion = (serializedPhishingNavSeqData.version === expectedVersion);
    if (!isValidVersion) {
        log_1.logError(new Error(`SerializedPhishingNavSeqData version check failed. ${string_utils_1.toString({
            version: serializedPhishingNavSeqData.version,
            expectedVersion: expectedVersion
        })}`));
    }
    return isValidVersion;
}
exports.checkVersion = checkVersion;
function isValidSerializedPhishingNavSeqData(serializedPhishingNavSeqData) {
    if (maybe_1.none(serializedPhishingNavSeqData.version)) {
        return false;
    }
    if (maybe_1.none(serializedPhishingNavSeqData.builtinRulesPrecedence)) {
        return false;
    }
    if (maybe_1.none(serializedPhishingNavSeqData.seqs)) {
        return false;
    }
    return true;
}
exports.isValidSerializedPhishingNavSeqData = isValidSerializedPhishingNavSeqData;


/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const maybe_1 = __webpack_require__(0);
var ContentType;
(function (ContentType) {
    ContentType[ContentType["pdf"] = 1] = "pdf";
})(ContentType = exports.ContentType || (exports.ContentType = {}));
var ContentTypeKey;
(function (ContentTypeKey) {
    ContentTypeKey["pdf"] = "application/pdf";
})(ContentTypeKey || (ContentTypeKey = {}));
function parseContentType(contentTypeKey) {
    const contentTypeKeyLower = contentTypeKey.toLowerCase();
    if (contentTypeKeyLower.startsWith(ContentTypeKey.pdf.toLowerCase())) {
        return ContentType.pdf;
    }
    else {
        return undefined;
    }
}
exports.parseContentType = parseContentType;
function parseRawContentType(rawContentType) {
    return maybe_1.some(rawContentType) ? parseContentType(rawContentType) : undefined;
}
exports.parseRawContentType = parseRawContentType;
function contentTypeToString(contentType) {
    switch (contentType) {
        case ContentType.pdf:
            return ContentTypeKey.pdf;
        default:
            return `Unknown ContentType: ${contentType}`;
    }
}
exports.contentTypeToString = contentTypeToString;


/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var ConnectionState;
(function (ConnectionState) {
    ConnectionState[ConnectionState["Connecting"] = 0] = "Connecting";
    ConnectionState[ConnectionState["Handshaking"] = 1] = "Handshaking";
    ConnectionState[ConnectionState["Connected"] = 2] = "Connected";
    ConnectionState[ConnectionState["Disconnecting"] = 3] = "Disconnecting";
    ConnectionState[ConnectionState["Disconnected"] = 4] = "Disconnected";
})(ConnectionState = exports.ConnectionState || (exports.ConnectionState = {}));
class ConnectionStateChangedEvent {
    constructor(oldState, newState) {
        this.oldState = oldState;
        this.newState = newState;
    }
}
exports.ConnectionStateChangedEvent = ConnectionStateChangedEvent;


/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const maybe_1 = __webpack_require__(0);
const promise_utils_1 = __webpack_require__(13);
const port_utils_1 = __webpack_require__(29);
const string_utils_1 = __webpack_require__(3);
const browser_1 = __webpack_require__(6);
class PagePortResolver {
    constructor(portName, onUnresolvedPortConnected, isPageURL, checkPageURL = true) {
        this.portName = portName;
        this.onUnresolvedPortConnected = onUnresolvedPortConnected;
        this.isPageURL = isPageURL;
        this.checkPageURL = checkPageURL;
        this.resolvers = new Map();
        chrome.runtime.onConnect.addListener(this.onPortConnected.bind(this));
    }
    onPortConnected(port) {
        if (!string_utils_1.compareStrings(port.name, this.portName)) {
            return;
        }
        if (this.checkPageURL) {
            const url = port_utils_1.readPortPageUrl(port);
            if (maybe_1.none(url)) {
                return;
            }
            if (!this.isPageURL(url)) {
                return;
            }
        }
        const tabId = port_utils_1.readPortTabId(port);
        if (maybe_1.none(tabId)) {
            return;
        }
        const resolve = this.resolvers.get(tabId);
        if (maybe_1.none(resolve)) {
            this.onUnresolvedPortConnected(tabId, port);
            return;
        }
        this.resolvers.delete(tabId);
        resolve(port);
    }
    resolvePort(tabId) {
        return promise_utils_1.makePromiseAsync((resolve) => {
            this.resolvers.set(tabId, resolve);
        });
    }
}
exports.PagePortResolver = PagePortResolver;
function getBrowserSpecificExtensionPagePortResolver(browser, portName, onUnresolvedPortConnected, isPageURL) {
    if (browser === browser_1.Browser.edge || maybe_1.none(browser)) {
        return new PagePortResolver(portName, onUnresolvedPortConnected, (url) => { return false; }, false);
    }
    else {
        return new PagePortResolver(portName, onUnresolvedPortConnected, isPageURL);
    }
}
exports.getBrowserSpecificExtensionPagePortResolver = getBrowserSpecificExtensionPagePortResolver;


/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function currentDateTimeString() {
    return new Date().toISOString();
}
exports.currentDateTimeString = currentDateTimeString;


/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global, process) {// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.



/*<replacement>*/

var processNextTick = __webpack_require__(26);
/*</replacement>*/

module.exports = Readable;

/*<replacement>*/
var isArray = __webpack_require__(72);
/*</replacement>*/

/*<replacement>*/
var Duplex;
/*</replacement>*/

Readable.ReadableState = ReadableState;

/*<replacement>*/
var EE = __webpack_require__(32).EventEmitter;

var EElistenerCount = function (emitter, type) {
  return emitter.listeners(type).length;
};
/*</replacement>*/

/*<replacement>*/
var Stream = __webpack_require__(42);
/*</replacement>*/

// TODO(bmeurer): Change this back to const once hole checks are
// properly optimized away early in Ignition+TurboFan.
/*<replacement>*/
var Buffer = __webpack_require__(27).Buffer;
var OurUint8Array = global.Uint8Array || function () {};
function _uint8ArrayToBuffer(chunk) {
  return Buffer.from(chunk);
}
function _isUint8Array(obj) {
  return Buffer.isBuffer(obj) || obj instanceof OurUint8Array;
}
/*</replacement>*/

/*<replacement>*/
var util = __webpack_require__(23);
util.inherits = __webpack_require__(18);
/*</replacement>*/

/*<replacement>*/
var debugUtil = __webpack_require__(76);
var debug = void 0;
if (debugUtil && debugUtil.debuglog) {
  debug = debugUtil.debuglog('stream');
} else {
  debug = function () {};
}
/*</replacement>*/

var BufferList = __webpack_require__(77);
var destroyImpl = __webpack_require__(44);
var StringDecoder;

util.inherits(Readable, Stream);

var kProxyEvents = ['error', 'close', 'destroy', 'pause', 'resume'];

function prependListener(emitter, event, fn) {
  // Sadly this is not cacheable as some libraries bundle their own
  // event emitter implementation with them.
  if (typeof emitter.prependListener === 'function') {
    return emitter.prependListener(event, fn);
  } else {
    // This is a hack to make sure that our error handler is attached before any
    // userland ones.  NEVER DO THIS. This is here only because this code needs
    // to continue to work with older versions of Node.js that do not include
    // the prependListener() method. The goal is to eventually remove this hack.
    if (!emitter._events || !emitter._events[event]) emitter.on(event, fn);else if (isArray(emitter._events[event])) emitter._events[event].unshift(fn);else emitter._events[event] = [fn, emitter._events[event]];
  }
}

function ReadableState(options, stream) {
  Duplex = Duplex || __webpack_require__(15);

  options = options || {};

  // object stream flag. Used to make read(n) ignore n and to
  // make all the buffer merging and length checks go away
  this.objectMode = !!options.objectMode;

  if (stream instanceof Duplex) this.objectMode = this.objectMode || !!options.readableObjectMode;

  // the point at which it stops calling _read() to fill the buffer
  // Note: 0 is a valid value, means "don't call _read preemptively ever"
  var hwm = options.highWaterMark;
  var defaultHwm = this.objectMode ? 16 : 16 * 1024;
  this.highWaterMark = hwm || hwm === 0 ? hwm : defaultHwm;

  // cast to ints.
  this.highWaterMark = Math.floor(this.highWaterMark);

  // A linked list is used to store data chunks instead of an array because the
  // linked list can remove elements from the beginning faster than
  // array.shift()
  this.buffer = new BufferList();
  this.length = 0;
  this.pipes = null;
  this.pipesCount = 0;
  this.flowing = null;
  this.ended = false;
  this.endEmitted = false;
  this.reading = false;

  // a flag to be able to tell if the event 'readable'/'data' is emitted
  // immediately, or on a later tick.  We set this to true at first, because
  // any actions that shouldn't happen until "later" should generally also
  // not happen before the first read call.
  this.sync = true;

  // whenever we return null, then we set a flag to say
  // that we're awaiting a 'readable' event emission.
  this.needReadable = false;
  this.emittedReadable = false;
  this.readableListening = false;
  this.resumeScheduled = false;

  // has it been destroyed
  this.destroyed = false;

  // Crypto is kind of old and crusty.  Historically, its default string
  // encoding is 'binary' so we have to make this configurable.
  // Everything else in the universe uses 'utf8', though.
  this.defaultEncoding = options.defaultEncoding || 'utf8';

  // the number of writers that are awaiting a drain event in .pipe()s
  this.awaitDrain = 0;

  // if true, a maybeReadMore has been scheduled
  this.readingMore = false;

  this.decoder = null;
  this.encoding = null;
  if (options.encoding) {
    if (!StringDecoder) StringDecoder = __webpack_require__(45).StringDecoder;
    this.decoder = new StringDecoder(options.encoding);
    this.encoding = options.encoding;
  }
}

function Readable(options) {
  Duplex = Duplex || __webpack_require__(15);

  if (!(this instanceof Readable)) return new Readable(options);

  this._readableState = new ReadableState(options, this);

  // legacy
  this.readable = true;

  if (options) {
    if (typeof options.read === 'function') this._read = options.read;

    if (typeof options.destroy === 'function') this._destroy = options.destroy;
  }

  Stream.call(this);
}

Object.defineProperty(Readable.prototype, 'destroyed', {
  get: function () {
    if (this._readableState === undefined) {
      return false;
    }
    return this._readableState.destroyed;
  },
  set: function (value) {
    // we ignore the value if the stream
    // has not been initialized yet
    if (!this._readableState) {
      return;
    }

    // backward compatibility, the user is explicitly
    // managing destroyed
    this._readableState.destroyed = value;
  }
});

Readable.prototype.destroy = destroyImpl.destroy;
Readable.prototype._undestroy = destroyImpl.undestroy;
Readable.prototype._destroy = function (err, cb) {
  this.push(null);
  cb(err);
};

// Manually shove something into the read() buffer.
// This returns true if the highWaterMark has not been hit yet,
// similar to how Writable.write() returns true if you should
// write() some more.
Readable.prototype.push = function (chunk, encoding) {
  var state = this._readableState;
  var skipChunkCheck;

  if (!state.objectMode) {
    if (typeof chunk === 'string') {
      encoding = encoding || state.defaultEncoding;
      if (encoding !== state.encoding) {
        chunk = Buffer.from(chunk, encoding);
        encoding = '';
      }
      skipChunkCheck = true;
    }
  } else {
    skipChunkCheck = true;
  }

  return readableAddChunk(this, chunk, encoding, false, skipChunkCheck);
};

// Unshift should *always* be something directly out of read()
Readable.prototype.unshift = function (chunk) {
  return readableAddChunk(this, chunk, null, true, false);
};

function readableAddChunk(stream, chunk, encoding, addToFront, skipChunkCheck) {
  var state = stream._readableState;
  if (chunk === null) {
    state.reading = false;
    onEofChunk(stream, state);
  } else {
    var er;
    if (!skipChunkCheck) er = chunkInvalid(state, chunk);
    if (er) {
      stream.emit('error', er);
    } else if (state.objectMode || chunk && chunk.length > 0) {
      if (typeof chunk !== 'string' && !state.objectMode && Object.getPrototypeOf(chunk) !== Buffer.prototype) {
        chunk = _uint8ArrayToBuffer(chunk);
      }

      if (addToFront) {
        if (state.endEmitted) stream.emit('error', new Error('stream.unshift() after end event'));else addChunk(stream, state, chunk, true);
      } else if (state.ended) {
        stream.emit('error', new Error('stream.push() after EOF'));
      } else {
        state.reading = false;
        if (state.decoder && !encoding) {
          chunk = state.decoder.write(chunk);
          if (state.objectMode || chunk.length !== 0) addChunk(stream, state, chunk, false);else maybeReadMore(stream, state);
        } else {
          addChunk(stream, state, chunk, false);
        }
      }
    } else if (!addToFront) {
      state.reading = false;
    }
  }

  return needMoreData(state);
}

function addChunk(stream, state, chunk, addToFront) {
  if (state.flowing && state.length === 0 && !state.sync) {
    stream.emit('data', chunk);
    stream.read(0);
  } else {
    // update the buffer info.
    state.length += state.objectMode ? 1 : chunk.length;
    if (addToFront) state.buffer.unshift(chunk);else state.buffer.push(chunk);

    if (state.needReadable) emitReadable(stream);
  }
  maybeReadMore(stream, state);
}

function chunkInvalid(state, chunk) {
  var er;
  if (!_isUint8Array(chunk) && typeof chunk !== 'string' && chunk !== undefined && !state.objectMode) {
    er = new TypeError('Invalid non-string/buffer chunk');
  }
  return er;
}

// if it's past the high water mark, we can push in some more.
// Also, if we have no data yet, we can stand some
// more bytes.  This is to work around cases where hwm=0,
// such as the repl.  Also, if the push() triggered a
// readable event, and the user called read(largeNumber) such that
// needReadable was set, then we ought to push more, so that another
// 'readable' event will be triggered.
function needMoreData(state) {
  return !state.ended && (state.needReadable || state.length < state.highWaterMark || state.length === 0);
}

Readable.prototype.isPaused = function () {
  return this._readableState.flowing === false;
};

// backwards compatibility.
Readable.prototype.setEncoding = function (enc) {
  if (!StringDecoder) StringDecoder = __webpack_require__(45).StringDecoder;
  this._readableState.decoder = new StringDecoder(enc);
  this._readableState.encoding = enc;
  return this;
};

// Don't raise the hwm > 8MB
var MAX_HWM = 0x800000;
function computeNewHighWaterMark(n) {
  if (n >= MAX_HWM) {
    n = MAX_HWM;
  } else {
    // Get the next highest power of 2 to prevent increasing hwm excessively in
    // tiny amounts
    n--;
    n |= n >>> 1;
    n |= n >>> 2;
    n |= n >>> 4;
    n |= n >>> 8;
    n |= n >>> 16;
    n++;
  }
  return n;
}

// This function is designed to be inlinable, so please take care when making
// changes to the function body.
function howMuchToRead(n, state) {
  if (n <= 0 || state.length === 0 && state.ended) return 0;
  if (state.objectMode) return 1;
  if (n !== n) {
    // Only flow one buffer at a time
    if (state.flowing && state.length) return state.buffer.head.data.length;else return state.length;
  }
  // If we're asking for more than the current hwm, then raise the hwm.
  if (n > state.highWaterMark) state.highWaterMark = computeNewHighWaterMark(n);
  if (n <= state.length) return n;
  // Don't have enough
  if (!state.ended) {
    state.needReadable = true;
    return 0;
  }
  return state.length;
}

// you can override either this method, or the async _read(n) below.
Readable.prototype.read = function (n) {
  debug('read', n);
  n = parseInt(n, 10);
  var state = this._readableState;
  var nOrig = n;

  if (n !== 0) state.emittedReadable = false;

  // if we're doing read(0) to trigger a readable event, but we
  // already have a bunch of data in the buffer, then just trigger
  // the 'readable' event and move on.
  if (n === 0 && state.needReadable && (state.length >= state.highWaterMark || state.ended)) {
    debug('read: emitReadable', state.length, state.ended);
    if (state.length === 0 && state.ended) endReadable(this);else emitReadable(this);
    return null;
  }

  n = howMuchToRead(n, state);

  // if we've ended, and we're now clear, then finish it up.
  if (n === 0 && state.ended) {
    if (state.length === 0) endReadable(this);
    return null;
  }

  // All the actual chunk generation logic needs to be
  // *below* the call to _read.  The reason is that in certain
  // synthetic stream cases, such as passthrough streams, _read
  // may be a completely synchronous operation which may change
  // the state of the read buffer, providing enough data when
  // before there was *not* enough.
  //
  // So, the steps are:
  // 1. Figure out what the state of things will be after we do
  // a read from the buffer.
  //
  // 2. If that resulting state will trigger a _read, then call _read.
  // Note that this may be asynchronous, or synchronous.  Yes, it is
  // deeply ugly to write APIs this way, but that still doesn't mean
  // that the Readable class should behave improperly, as streams are
  // designed to be sync/async agnostic.
  // Take note if the _read call is sync or async (ie, if the read call
  // has returned yet), so that we know whether or not it's safe to emit
  // 'readable' etc.
  //
  // 3. Actually pull the requested chunks out of the buffer and return.

  // if we need a readable event, then we need to do some reading.
  var doRead = state.needReadable;
  debug('need readable', doRead);

  // if we currently have less than the highWaterMark, then also read some
  if (state.length === 0 || state.length - n < state.highWaterMark) {
    doRead = true;
    debug('length less than watermark', doRead);
  }

  // however, if we've ended, then there's no point, and if we're already
  // reading, then it's unnecessary.
  if (state.ended || state.reading) {
    doRead = false;
    debug('reading or ended', doRead);
  } else if (doRead) {
    debug('do read');
    state.reading = true;
    state.sync = true;
    // if the length is currently zero, then we *need* a readable event.
    if (state.length === 0) state.needReadable = true;
    // call internal read method
    this._read(state.highWaterMark);
    state.sync = false;
    // If _read pushed data synchronously, then `reading` will be false,
    // and we need to re-evaluate how much data we can return to the user.
    if (!state.reading) n = howMuchToRead(nOrig, state);
  }

  var ret;
  if (n > 0) ret = fromList(n, state);else ret = null;

  if (ret === null) {
    state.needReadable = true;
    n = 0;
  } else {
    state.length -= n;
  }

  if (state.length === 0) {
    // If we have nothing in the buffer, then we want to know
    // as soon as we *do* get something into the buffer.
    if (!state.ended) state.needReadable = true;

    // If we tried to read() past the EOF, then emit end on the next tick.
    if (nOrig !== n && state.ended) endReadable(this);
  }

  if (ret !== null) this.emit('data', ret);

  return ret;
};

function onEofChunk(stream, state) {
  if (state.ended) return;
  if (state.decoder) {
    var chunk = state.decoder.end();
    if (chunk && chunk.length) {
      state.buffer.push(chunk);
      state.length += state.objectMode ? 1 : chunk.length;
    }
  }
  state.ended = true;

  // emit 'readable' now to make sure it gets picked up.
  emitReadable(stream);
}

// Don't emit readable right away in sync mode, because this can trigger
// another read() call => stack overflow.  This way, it might trigger
// a nextTick recursion warning, but that's not so bad.
function emitReadable(stream) {
  var state = stream._readableState;
  state.needReadable = false;
  if (!state.emittedReadable) {
    debug('emitReadable', state.flowing);
    state.emittedReadable = true;
    if (state.sync) processNextTick(emitReadable_, stream);else emitReadable_(stream);
  }
}

function emitReadable_(stream) {
  debug('emit readable');
  stream.emit('readable');
  flow(stream);
}

// at this point, the user has presumably seen the 'readable' event,
// and called read() to consume some data.  that may have triggered
// in turn another _read(n) call, in which case reading = true if
// it's in progress.
// However, if we're not ended, or reading, and the length < hwm,
// then go ahead and try to read some more preemptively.
function maybeReadMore(stream, state) {
  if (!state.readingMore) {
    state.readingMore = true;
    processNextTick(maybeReadMore_, stream, state);
  }
}

function maybeReadMore_(stream, state) {
  var len = state.length;
  while (!state.reading && !state.flowing && !state.ended && state.length < state.highWaterMark) {
    debug('maybeReadMore read 0');
    stream.read(0);
    if (len === state.length)
      // didn't get any data, stop spinning.
      break;else len = state.length;
  }
  state.readingMore = false;
}

// abstract method.  to be overridden in specific implementation classes.
// call cb(er, data) where data is <= n in length.
// for virtual (non-string, non-buffer) streams, "length" is somewhat
// arbitrary, and perhaps not very meaningful.
Readable.prototype._read = function (n) {
  this.emit('error', new Error('_read() is not implemented'));
};

Readable.prototype.pipe = function (dest, pipeOpts) {
  var src = this;
  var state = this._readableState;

  switch (state.pipesCount) {
    case 0:
      state.pipes = dest;
      break;
    case 1:
      state.pipes = [state.pipes, dest];
      break;
    default:
      state.pipes.push(dest);
      break;
  }
  state.pipesCount += 1;
  debug('pipe count=%d opts=%j', state.pipesCount, pipeOpts);

  var doEnd = (!pipeOpts || pipeOpts.end !== false) && dest !== process.stdout && dest !== process.stderr;

  var endFn = doEnd ? onend : unpipe;
  if (state.endEmitted) processNextTick(endFn);else src.once('end', endFn);

  dest.on('unpipe', onunpipe);
  function onunpipe(readable, unpipeInfo) {
    debug('onunpipe');
    if (readable === src) {
      if (unpipeInfo && unpipeInfo.hasUnpiped === false) {
        unpipeInfo.hasUnpiped = true;
        cleanup();
      }
    }
  }

  function onend() {
    debug('onend');
    dest.end();
  }

  // when the dest drains, it reduces the awaitDrain counter
  // on the source.  This would be more elegant with a .once()
  // handler in flow(), but adding and removing repeatedly is
  // too slow.
  var ondrain = pipeOnDrain(src);
  dest.on('drain', ondrain);

  var cleanedUp = false;
  function cleanup() {
    debug('cleanup');
    // cleanup event handlers once the pipe is broken
    dest.removeListener('close', onclose);
    dest.removeListener('finish', onfinish);
    dest.removeListener('drain', ondrain);
    dest.removeListener('error', onerror);
    dest.removeListener('unpipe', onunpipe);
    src.removeListener('end', onend);
    src.removeListener('end', unpipe);
    src.removeListener('data', ondata);

    cleanedUp = true;

    // if the reader is waiting for a drain event from this
    // specific writer, then it would cause it to never start
    // flowing again.
    // So, if this is awaiting a drain, then we just call it now.
    // If we don't know, then assume that we are waiting for one.
    if (state.awaitDrain && (!dest._writableState || dest._writableState.needDrain)) ondrain();
  }

  // If the user pushes more data while we're writing to dest then we'll end up
  // in ondata again. However, we only want to increase awaitDrain once because
  // dest will only emit one 'drain' event for the multiple writes.
  // => Introduce a guard on increasing awaitDrain.
  var increasedAwaitDrain = false;
  src.on('data', ondata);
  function ondata(chunk) {
    debug('ondata');
    increasedAwaitDrain = false;
    var ret = dest.write(chunk);
    if (false === ret && !increasedAwaitDrain) {
      // If the user unpiped during `dest.write()`, it is possible
      // to get stuck in a permanently paused state if that write
      // also returned false.
      // => Check whether `dest` is still a piping destination.
      if ((state.pipesCount === 1 && state.pipes === dest || state.pipesCount > 1 && indexOf(state.pipes, dest) !== -1) && !cleanedUp) {
        debug('false write response, pause', src._readableState.awaitDrain);
        src._readableState.awaitDrain++;
        increasedAwaitDrain = true;
      }
      src.pause();
    }
  }

  // if the dest has an error, then stop piping into it.
  // however, don't suppress the throwing behavior for this.
  function onerror(er) {
    debug('onerror', er);
    unpipe();
    dest.removeListener('error', onerror);
    if (EElistenerCount(dest, 'error') === 0) dest.emit('error', er);
  }

  // Make sure our error handler is attached before userland ones.
  prependListener(dest, 'error', onerror);

  // Both close and finish should trigger unpipe, but only once.
  function onclose() {
    dest.removeListener('finish', onfinish);
    unpipe();
  }
  dest.once('close', onclose);
  function onfinish() {
    debug('onfinish');
    dest.removeListener('close', onclose);
    unpipe();
  }
  dest.once('finish', onfinish);

  function unpipe() {
    debug('unpipe');
    src.unpipe(dest);
  }

  // tell the dest that it's being piped to
  dest.emit('pipe', src);

  // start the flow if it hasn't been started already.
  if (!state.flowing) {
    debug('pipe resume');
    src.resume();
  }

  return dest;
};

function pipeOnDrain(src) {
  return function () {
    var state = src._readableState;
    debug('pipeOnDrain', state.awaitDrain);
    if (state.awaitDrain) state.awaitDrain--;
    if (state.awaitDrain === 0 && EElistenerCount(src, 'data')) {
      state.flowing = true;
      flow(src);
    }
  };
}

Readable.prototype.unpipe = function (dest) {
  var state = this._readableState;
  var unpipeInfo = { hasUnpiped: false };

  // if we're not piping anywhere, then do nothing.
  if (state.pipesCount === 0) return this;

  // just one destination.  most common case.
  if (state.pipesCount === 1) {
    // passed in one, but it's not the right one.
    if (dest && dest !== state.pipes) return this;

    if (!dest) dest = state.pipes;

    // got a match.
    state.pipes = null;
    state.pipesCount = 0;
    state.flowing = false;
    if (dest) dest.emit('unpipe', this, unpipeInfo);
    return this;
  }

  // slow case. multiple pipe destinations.

  if (!dest) {
    // remove all.
    var dests = state.pipes;
    var len = state.pipesCount;
    state.pipes = null;
    state.pipesCount = 0;
    state.flowing = false;

    for (var i = 0; i < len; i++) {
      dests[i].emit('unpipe', this, unpipeInfo);
    }return this;
  }

  // try to find the right one.
  var index = indexOf(state.pipes, dest);
  if (index === -1) return this;

  state.pipes.splice(index, 1);
  state.pipesCount -= 1;
  if (state.pipesCount === 1) state.pipes = state.pipes[0];

  dest.emit('unpipe', this, unpipeInfo);

  return this;
};

// set up data events if they are asked for
// Ensure readable listeners eventually get something
Readable.prototype.on = function (ev, fn) {
  var res = Stream.prototype.on.call(this, ev, fn);

  if (ev === 'data') {
    // Start flowing on next tick if stream isn't explicitly paused
    if (this._readableState.flowing !== false) this.resume();
  } else if (ev === 'readable') {
    var state = this._readableState;
    if (!state.endEmitted && !state.readableListening) {
      state.readableListening = state.needReadable = true;
      state.emittedReadable = false;
      if (!state.reading) {
        processNextTick(nReadingNextTick, this);
      } else if (state.length) {
        emitReadable(this);
      }
    }
  }

  return res;
};
Readable.prototype.addListener = Readable.prototype.on;

function nReadingNextTick(self) {
  debug('readable nexttick read 0');
  self.read(0);
}

// pause() and resume() are remnants of the legacy readable stream API
// If the user uses them, then switch into old mode.
Readable.prototype.resume = function () {
  var state = this._readableState;
  if (!state.flowing) {
    debug('resume');
    state.flowing = true;
    resume(this, state);
  }
  return this;
};

function resume(stream, state) {
  if (!state.resumeScheduled) {
    state.resumeScheduled = true;
    processNextTick(resume_, stream, state);
  }
}

function resume_(stream, state) {
  if (!state.reading) {
    debug('resume read 0');
    stream.read(0);
  }

  state.resumeScheduled = false;
  state.awaitDrain = 0;
  stream.emit('resume');
  flow(stream);
  if (state.flowing && !state.reading) stream.read(0);
}

Readable.prototype.pause = function () {
  debug('call pause flowing=%j', this._readableState.flowing);
  if (false !== this._readableState.flowing) {
    debug('pause');
    this._readableState.flowing = false;
    this.emit('pause');
  }
  return this;
};

function flow(stream) {
  var state = stream._readableState;
  debug('flow', state.flowing);
  while (state.flowing && stream.read() !== null) {}
}

// wrap an old-style stream as the async data source.
// This is *not* part of the readable stream interface.
// It is an ugly unfortunate mess of history.
Readable.prototype.wrap = function (stream) {
  var state = this._readableState;
  var paused = false;

  var self = this;
  stream.on('end', function () {
    debug('wrapped end');
    if (state.decoder && !state.ended) {
      var chunk = state.decoder.end();
      if (chunk && chunk.length) self.push(chunk);
    }

    self.push(null);
  });

  stream.on('data', function (chunk) {
    debug('wrapped data');
    if (state.decoder) chunk = state.decoder.write(chunk);

    // don't skip over falsy values in objectMode
    if (state.objectMode && (chunk === null || chunk === undefined)) return;else if (!state.objectMode && (!chunk || !chunk.length)) return;

    var ret = self.push(chunk);
    if (!ret) {
      paused = true;
      stream.pause();
    }
  });

  // proxy all the other methods.
  // important when wrapping filters and duplexes.
  for (var i in stream) {
    if (this[i] === undefined && typeof stream[i] === 'function') {
      this[i] = function (method) {
        return function () {
          return stream[method].apply(stream, arguments);
        };
      }(i);
    }
  }

  // proxy certain important events.
  for (var n = 0; n < kProxyEvents.length; n++) {
    stream.on(kProxyEvents[n], self.emit.bind(self, kProxyEvents[n]));
  }

  // when we try to consume some more bytes, simply unpause the
  // underlying stream.
  self._read = function (n) {
    debug('wrapped _read', n);
    if (paused) {
      paused = false;
      stream.resume();
    }
  };

  return self;
};

// exposed for testing purposes only.
Readable._fromList = fromList;

// Pluck off n bytes from an array of buffers.
// Length is the combined lengths of all the buffers in the list.
// This function is designed to be inlinable, so please take care when making
// changes to the function body.
function fromList(n, state) {
  // nothing buffered
  if (state.length === 0) return null;

  var ret;
  if (state.objectMode) ret = state.buffer.shift();else if (!n || n >= state.length) {
    // read it all, truncate the list
    if (state.decoder) ret = state.buffer.join('');else if (state.buffer.length === 1) ret = state.buffer.head.data;else ret = state.buffer.concat(state.length);
    state.buffer.clear();
  } else {
    // read part of list
    ret = fromListPartial(n, state.buffer, state.decoder);
  }

  return ret;
}

// Extracts only enough buffered data to satisfy the amount requested.
// This function is designed to be inlinable, so please take care when making
// changes to the function body.
function fromListPartial(n, list, hasStrings) {
  var ret;
  if (n < list.head.data.length) {
    // slice is the same for buffers and strings
    ret = list.head.data.slice(0, n);
    list.head.data = list.head.data.slice(n);
  } else if (n === list.head.data.length) {
    // first chunk is a perfect match
    ret = list.shift();
  } else {
    // result spans more than one buffer
    ret = hasStrings ? copyFromBufferString(n, list) : copyFromBuffer(n, list);
  }
  return ret;
}

// Copies a specified amount of characters from the list of buffered data
// chunks.
// This function is designed to be inlinable, so please take care when making
// changes to the function body.
function copyFromBufferString(n, list) {
  var p = list.head;
  var c = 1;
  var ret = p.data;
  n -= ret.length;
  while (p = p.next) {
    var str = p.data;
    var nb = n > str.length ? str.length : n;
    if (nb === str.length) ret += str;else ret += str.slice(0, n);
    n -= nb;
    if (n === 0) {
      if (nb === str.length) {
        ++c;
        if (p.next) list.head = p.next;else list.head = list.tail = null;
      } else {
        list.head = p;
        p.data = str.slice(nb);
      }
      break;
    }
    ++c;
  }
  list.length -= c;
  return ret;
}

// Copies a specified amount of bytes from the list of buffered data chunks.
// This function is designed to be inlinable, so please take care when making
// changes to the function body.
function copyFromBuffer(n, list) {
  var ret = Buffer.allocUnsafe(n);
  var p = list.head;
  var c = 1;
  p.data.copy(ret);
  n -= p.data.length;
  while (p = p.next) {
    var buf = p.data;
    var nb = n > buf.length ? buf.length : n;
    buf.copy(ret, ret.length - n, 0, nb);
    n -= nb;
    if (n === 0) {
      if (nb === buf.length) {
        ++c;
        if (p.next) list.head = p.next;else list.head = list.tail = null;
      } else {
        list.head = p;
        p.data = buf.slice(nb);
      }
      break;
    }
    ++c;
  }
  list.length -= c;
  return ret;
}

function endReadable(stream) {
  var state = stream._readableState;

  // If we get here before consuming all the bytes, then that is a
  // bug in node.  Should never happen.
  if (state.length > 0) throw new Error('"endReadable()" called on non-empty stream');

  if (!state.endEmitted) {
    state.ended = true;
    processNextTick(endReadableNT, state, stream);
  }
}

function endReadableNT(state, stream) {
  // Check that we didn't get one last unshift.
  if (!state.endEmitted && state.length === 0) {
    state.endEmitted = true;
    stream.readable = false;
    stream.emit('end');
  }
}

function forEach(xs, f) {
  for (var i = 0, l = xs.length; i < l; i++) {
    f(xs[i], i);
  }
}

function indexOf(xs, x) {
  for (var i = 0, l = xs.length; i < l; i++) {
    if (xs[i] === x) return i;
  }
  return -1;
}
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(17), __webpack_require__(22)))

/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(32).EventEmitter;


/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
 * @license  MIT
 */
/* eslint-disable no-proto */



var base64 = __webpack_require__(73)
var ieee754 = __webpack_require__(74)
var isArray = __webpack_require__(75)

exports.Buffer = Buffer
exports.SlowBuffer = SlowBuffer
exports.INSPECT_MAX_BYTES = 50

/**
 * If `Buffer.TYPED_ARRAY_SUPPORT`:
 *   === true    Use Uint8Array implementation (fastest)
 *   === false   Use Object implementation (most compatible, even IE6)
 *
 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
 * Opera 11.6+, iOS 4.2+.
 *
 * Due to various browser bugs, sometimes the Object implementation will be used even
 * when the browser supports typed arrays.
 *
 * Note:
 *
 *   - Firefox 4-29 lacks support for adding new properties to `Uint8Array` instances,
 *     See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438.
 *
 *   - Chrome 9-10 is missing the `TypedArray.prototype.subarray` function.
 *
 *   - IE10 has a broken `TypedArray.prototype.subarray` function which returns arrays of
 *     incorrect length in some situations.

 * We detect these buggy browsers and set `Buffer.TYPED_ARRAY_SUPPORT` to `false` so they
 * get the Object implementation, which is slower but behaves correctly.
 */
Buffer.TYPED_ARRAY_SUPPORT = global.TYPED_ARRAY_SUPPORT !== undefined
  ? global.TYPED_ARRAY_SUPPORT
  : typedArraySupport()

/*
 * Export kMaxLength after typed array support is determined.
 */
exports.kMaxLength = kMaxLength()

function typedArraySupport () {
  try {
    var arr = new Uint8Array(1)
    arr.__proto__ = {__proto__: Uint8Array.prototype, foo: function () { return 42 }}
    return arr.foo() === 42 && // typed array instances can be augmented
        typeof arr.subarray === 'function' && // chrome 9-10 lack `subarray`
        arr.subarray(1, 1).byteLength === 0 // ie10 has broken `subarray`
  } catch (e) {
    return false
  }
}

function kMaxLength () {
  return Buffer.TYPED_ARRAY_SUPPORT
    ? 0x7fffffff
    : 0x3fffffff
}

function createBuffer (that, length) {
  if (kMaxLength() < length) {
    throw new RangeError('Invalid typed array length')
  }
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    that = new Uint8Array(length)
    that.__proto__ = Buffer.prototype
  } else {
    // Fallback: Return an object instance of the Buffer class
    if (that === null) {
      that = new Buffer(length)
    }
    that.length = length
  }

  return that
}

/**
 * The Buffer constructor returns instances of `Uint8Array` that have their
 * prototype changed to `Buffer.prototype`. Furthermore, `Buffer` is a subclass of
 * `Uint8Array`, so the returned instances will have all the node `Buffer` methods
 * and the `Uint8Array` methods. Square bracket notation works as expected -- it
 * returns a single octet.
 *
 * The `Uint8Array` prototype remains unmodified.
 */

function Buffer (arg, encodingOrOffset, length) {
  if (!Buffer.TYPED_ARRAY_SUPPORT && !(this instanceof Buffer)) {
    return new Buffer(arg, encodingOrOffset, length)
  }

  // Common case.
  if (typeof arg === 'number') {
    if (typeof encodingOrOffset === 'string') {
      throw new Error(
        'If encoding is specified then the first argument must be a string'
      )
    }
    return allocUnsafe(this, arg)
  }
  return from(this, arg, encodingOrOffset, length)
}

Buffer.poolSize = 8192 // not used by this implementation

// TODO: Legacy, not needed anymore. Remove in next major version.
Buffer._augment = function (arr) {
  arr.__proto__ = Buffer.prototype
  return arr
}

function from (that, value, encodingOrOffset, length) {
  if (typeof value === 'number') {
    throw new TypeError('"value" argument must not be a number')
  }

  if (typeof ArrayBuffer !== 'undefined' && value instanceof ArrayBuffer) {
    return fromArrayBuffer(that, value, encodingOrOffset, length)
  }

  if (typeof value === 'string') {
    return fromString(that, value, encodingOrOffset)
  }

  return fromObject(that, value)
}

/**
 * Functionally equivalent to Buffer(arg, encoding) but throws a TypeError
 * if value is a number.
 * Buffer.from(str[, encoding])
 * Buffer.from(array)
 * Buffer.from(buffer)
 * Buffer.from(arrayBuffer[, byteOffset[, length]])
 **/
Buffer.from = function (value, encodingOrOffset, length) {
  return from(null, value, encodingOrOffset, length)
}

if (Buffer.TYPED_ARRAY_SUPPORT) {
  Buffer.prototype.__proto__ = Uint8Array.prototype
  Buffer.__proto__ = Uint8Array
  if (typeof Symbol !== 'undefined' && Symbol.species &&
      Buffer[Symbol.species] === Buffer) {
    // Fix subarray() in ES2016. See: https://github.com/feross/buffer/pull/97
    Object.defineProperty(Buffer, Symbol.species, {
      value: null,
      configurable: true
    })
  }
}

function assertSize (size) {
  if (typeof size !== 'number') {
    throw new TypeError('"size" argument must be a number')
  } else if (size < 0) {
    throw new RangeError('"size" argument must not be negative')
  }
}

function alloc (that, size, fill, encoding) {
  assertSize(size)
  if (size <= 0) {
    return createBuffer(that, size)
  }
  if (fill !== undefined) {
    // Only pay attention to encoding if it's a string. This
    // prevents accidentally sending in a number that would
    // be interpretted as a start offset.
    return typeof encoding === 'string'
      ? createBuffer(that, size).fill(fill, encoding)
      : createBuffer(that, size).fill(fill)
  }
  return createBuffer(that, size)
}

/**
 * Creates a new filled Buffer instance.
 * alloc(size[, fill[, encoding]])
 **/
Buffer.alloc = function (size, fill, encoding) {
  return alloc(null, size, fill, encoding)
}

function allocUnsafe (that, size) {
  assertSize(size)
  that = createBuffer(that, size < 0 ? 0 : checked(size) | 0)
  if (!Buffer.TYPED_ARRAY_SUPPORT) {
    for (var i = 0; i < size; ++i) {
      that[i] = 0
    }
  }
  return that
}

/**
 * Equivalent to Buffer(num), by default creates a non-zero-filled Buffer instance.
 * */
Buffer.allocUnsafe = function (size) {
  return allocUnsafe(null, size)
}
/**
 * Equivalent to SlowBuffer(num), by default creates a non-zero-filled Buffer instance.
 */
Buffer.allocUnsafeSlow = function (size) {
  return allocUnsafe(null, size)
}

function fromString (that, string, encoding) {
  if (typeof encoding !== 'string' || encoding === '') {
    encoding = 'utf8'
  }

  if (!Buffer.isEncoding(encoding)) {
    throw new TypeError('"encoding" must be a valid string encoding')
  }

  var length = byteLength(string, encoding) | 0
  that = createBuffer(that, length)

  var actual = that.write(string, encoding)

  if (actual !== length) {
    // Writing a hex string, for example, that contains invalid characters will
    // cause everything after the first invalid character to be ignored. (e.g.
    // 'abxxcd' will be treated as 'ab')
    that = that.slice(0, actual)
  }

  return that
}

function fromArrayLike (that, array) {
  var length = array.length < 0 ? 0 : checked(array.length) | 0
  that = createBuffer(that, length)
  for (var i = 0; i < length; i += 1) {
    that[i] = array[i] & 255
  }
  return that
}

function fromArrayBuffer (that, array, byteOffset, length) {
  array.byteLength // this throws if `array` is not a valid ArrayBuffer

  if (byteOffset < 0 || array.byteLength < byteOffset) {
    throw new RangeError('\'offset\' is out of bounds')
  }

  if (array.byteLength < byteOffset + (length || 0)) {
    throw new RangeError('\'length\' is out of bounds')
  }

  if (byteOffset === undefined && length === undefined) {
    array = new Uint8Array(array)
  } else if (length === undefined) {
    array = new Uint8Array(array, byteOffset)
  } else {
    array = new Uint8Array(array, byteOffset, length)
  }

  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    that = array
    that.__proto__ = Buffer.prototype
  } else {
    // Fallback: Return an object instance of the Buffer class
    that = fromArrayLike(that, array)
  }
  return that
}

function fromObject (that, obj) {
  if (Buffer.isBuffer(obj)) {
    var len = checked(obj.length) | 0
    that = createBuffer(that, len)

    if (that.length === 0) {
      return that
    }

    obj.copy(that, 0, 0, len)
    return that
  }

  if (obj) {
    if ((typeof ArrayBuffer !== 'undefined' &&
        obj.buffer instanceof ArrayBuffer) || 'length' in obj) {
      if (typeof obj.length !== 'number' || isnan(obj.length)) {
        return createBuffer(that, 0)
      }
      return fromArrayLike(that, obj)
    }

    if (obj.type === 'Buffer' && isArray(obj.data)) {
      return fromArrayLike(that, obj.data)
    }
  }

  throw new TypeError('First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.')
}

function checked (length) {
  // Note: cannot use `length < kMaxLength()` here because that fails when
  // length is NaN (which is otherwise coerced to zero.)
  if (length >= kMaxLength()) {
    throw new RangeError('Attempt to allocate Buffer larger than maximum ' +
                         'size: 0x' + kMaxLength().toString(16) + ' bytes')
  }
  return length | 0
}

function SlowBuffer (length) {
  if (+length != length) { // eslint-disable-line eqeqeq
    length = 0
  }
  return Buffer.alloc(+length)
}

Buffer.isBuffer = function isBuffer (b) {
  return !!(b != null && b._isBuffer)
}

Buffer.compare = function compare (a, b) {
  if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
    throw new TypeError('Arguments must be Buffers')
  }

  if (a === b) return 0

  var x = a.length
  var y = b.length

  for (var i = 0, len = Math.min(x, y); i < len; ++i) {
    if (a[i] !== b[i]) {
      x = a[i]
      y = b[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

Buffer.isEncoding = function isEncoding (encoding) {
  switch (String(encoding).toLowerCase()) {
    case 'hex':
    case 'utf8':
    case 'utf-8':
    case 'ascii':
    case 'latin1':
    case 'binary':
    case 'base64':
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      return true
    default:
      return false
  }
}

Buffer.concat = function concat (list, length) {
  if (!isArray(list)) {
    throw new TypeError('"list" argument must be an Array of Buffers')
  }

  if (list.length === 0) {
    return Buffer.alloc(0)
  }

  var i
  if (length === undefined) {
    length = 0
    for (i = 0; i < list.length; ++i) {
      length += list[i].length
    }
  }

  var buffer = Buffer.allocUnsafe(length)
  var pos = 0
  for (i = 0; i < list.length; ++i) {
    var buf = list[i]
    if (!Buffer.isBuffer(buf)) {
      throw new TypeError('"list" argument must be an Array of Buffers')
    }
    buf.copy(buffer, pos)
    pos += buf.length
  }
  return buffer
}

function byteLength (string, encoding) {
  if (Buffer.isBuffer(string)) {
    return string.length
  }
  if (typeof ArrayBuffer !== 'undefined' && typeof ArrayBuffer.isView === 'function' &&
      (ArrayBuffer.isView(string) || string instanceof ArrayBuffer)) {
    return string.byteLength
  }
  if (typeof string !== 'string') {
    string = '' + string
  }

  var len = string.length
  if (len === 0) return 0

  // Use a for loop to avoid recursion
  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'ascii':
      case 'latin1':
      case 'binary':
        return len
      case 'utf8':
      case 'utf-8':
      case undefined:
        return utf8ToBytes(string).length
      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return len * 2
      case 'hex':
        return len >>> 1
      case 'base64':
        return base64ToBytes(string).length
      default:
        if (loweredCase) return utf8ToBytes(string).length // assume utf8
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}
Buffer.byteLength = byteLength

function slowToString (encoding, start, end) {
  var loweredCase = false

  // No need to verify that "this.length <= MAX_UINT32" since it's a read-only
  // property of a typed array.

  // This behaves neither like String nor Uint8Array in that we set start/end
  // to their upper/lower bounds if the value passed is out of range.
  // undefined is handled specially as per ECMA-262 6th Edition,
  // Section 13.3.3.7 Runtime Semantics: KeyedBindingInitialization.
  if (start === undefined || start < 0) {
    start = 0
  }
  // Return early if start > this.length. Done here to prevent potential uint32
  // coercion fail below.
  if (start > this.length) {
    return ''
  }

  if (end === undefined || end > this.length) {
    end = this.length
  }

  if (end <= 0) {
    return ''
  }

  // Force coersion to uint32. This will also coerce falsey/NaN values to 0.
  end >>>= 0
  start >>>= 0

  if (end <= start) {
    return ''
  }

  if (!encoding) encoding = 'utf8'

  while (true) {
    switch (encoding) {
      case 'hex':
        return hexSlice(this, start, end)

      case 'utf8':
      case 'utf-8':
        return utf8Slice(this, start, end)

      case 'ascii':
        return asciiSlice(this, start, end)

      case 'latin1':
      case 'binary':
        return latin1Slice(this, start, end)

      case 'base64':
        return base64Slice(this, start, end)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return utf16leSlice(this, start, end)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = (encoding + '').toLowerCase()
        loweredCase = true
    }
  }
}

// The property is used by `Buffer.isBuffer` and `is-buffer` (in Safari 5-7) to detect
// Buffer instances.
Buffer.prototype._isBuffer = true

function swap (b, n, m) {
  var i = b[n]
  b[n] = b[m]
  b[m] = i
}

Buffer.prototype.swap16 = function swap16 () {
  var len = this.length
  if (len % 2 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 16-bits')
  }
  for (var i = 0; i < len; i += 2) {
    swap(this, i, i + 1)
  }
  return this
}

Buffer.prototype.swap32 = function swap32 () {
  var len = this.length
  if (len % 4 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 32-bits')
  }
  for (var i = 0; i < len; i += 4) {
    swap(this, i, i + 3)
    swap(this, i + 1, i + 2)
  }
  return this
}

Buffer.prototype.swap64 = function swap64 () {
  var len = this.length
  if (len % 8 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 64-bits')
  }
  for (var i = 0; i < len; i += 8) {
    swap(this, i, i + 7)
    swap(this, i + 1, i + 6)
    swap(this, i + 2, i + 5)
    swap(this, i + 3, i + 4)
  }
  return this
}

Buffer.prototype.toString = function toString () {
  var length = this.length | 0
  if (length === 0) return ''
  if (arguments.length === 0) return utf8Slice(this, 0, length)
  return slowToString.apply(this, arguments)
}

Buffer.prototype.equals = function equals (b) {
  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
  if (this === b) return true
  return Buffer.compare(this, b) === 0
}

Buffer.prototype.inspect = function inspect () {
  var str = ''
  var max = exports.INSPECT_MAX_BYTES
  if (this.length > 0) {
    str = this.toString('hex', 0, max).match(/.{2}/g).join(' ')
    if (this.length > max) str += ' ... '
  }
  return '<Buffer ' + str + '>'
}

Buffer.prototype.compare = function compare (target, start, end, thisStart, thisEnd) {
  if (!Buffer.isBuffer(target)) {
    throw new TypeError('Argument must be a Buffer')
  }

  if (start === undefined) {
    start = 0
  }
  if (end === undefined) {
    end = target ? target.length : 0
  }
  if (thisStart === undefined) {
    thisStart = 0
  }
  if (thisEnd === undefined) {
    thisEnd = this.length
  }

  if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
    throw new RangeError('out of range index')
  }

  if (thisStart >= thisEnd && start >= end) {
    return 0
  }
  if (thisStart >= thisEnd) {
    return -1
  }
  if (start >= end) {
    return 1
  }

  start >>>= 0
  end >>>= 0
  thisStart >>>= 0
  thisEnd >>>= 0

  if (this === target) return 0

  var x = thisEnd - thisStart
  var y = end - start
  var len = Math.min(x, y)

  var thisCopy = this.slice(thisStart, thisEnd)
  var targetCopy = target.slice(start, end)

  for (var i = 0; i < len; ++i) {
    if (thisCopy[i] !== targetCopy[i]) {
      x = thisCopy[i]
      y = targetCopy[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

// Finds either the first index of `val` in `buffer` at offset >= `byteOffset`,
// OR the last index of `val` in `buffer` at offset <= `byteOffset`.
//
// Arguments:
// - buffer - a Buffer to search
// - val - a string, Buffer, or number
// - byteOffset - an index into `buffer`; will be clamped to an int32
// - encoding - an optional encoding, relevant is val is a string
// - dir - true for indexOf, false for lastIndexOf
function bidirectionalIndexOf (buffer, val, byteOffset, encoding, dir) {
  // Empty buffer means no match
  if (buffer.length === 0) return -1

  // Normalize byteOffset
  if (typeof byteOffset === 'string') {
    encoding = byteOffset
    byteOffset = 0
  } else if (byteOffset > 0x7fffffff) {
    byteOffset = 0x7fffffff
  } else if (byteOffset < -0x80000000) {
    byteOffset = -0x80000000
  }
  byteOffset = +byteOffset  // Coerce to Number.
  if (isNaN(byteOffset)) {
    // byteOffset: it it's undefined, null, NaN, "foo", etc, search whole buffer
    byteOffset = dir ? 0 : (buffer.length - 1)
  }

  // Normalize byteOffset: negative offsets start from the end of the buffer
  if (byteOffset < 0) byteOffset = buffer.length + byteOffset
  if (byteOffset >= buffer.length) {
    if (dir) return -1
    else byteOffset = buffer.length - 1
  } else if (byteOffset < 0) {
    if (dir) byteOffset = 0
    else return -1
  }

  // Normalize val
  if (typeof val === 'string') {
    val = Buffer.from(val, encoding)
  }

  // Finally, search either indexOf (if dir is true) or lastIndexOf
  if (Buffer.isBuffer(val)) {
    // Special case: looking for empty string/buffer always fails
    if (val.length === 0) {
      return -1
    }
    return arrayIndexOf(buffer, val, byteOffset, encoding, dir)
  } else if (typeof val === 'number') {
    val = val & 0xFF // Search for a byte value [0-255]
    if (Buffer.TYPED_ARRAY_SUPPORT &&
        typeof Uint8Array.prototype.indexOf === 'function') {
      if (dir) {
        return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset)
      } else {
        return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset)
      }
    }
    return arrayIndexOf(buffer, [ val ], byteOffset, encoding, dir)
  }

  throw new TypeError('val must be string, number or Buffer')
}

function arrayIndexOf (arr, val, byteOffset, encoding, dir) {
  var indexSize = 1
  var arrLength = arr.length
  var valLength = val.length

  if (encoding !== undefined) {
    encoding = String(encoding).toLowerCase()
    if (encoding === 'ucs2' || encoding === 'ucs-2' ||
        encoding === 'utf16le' || encoding === 'utf-16le') {
      if (arr.length < 2 || val.length < 2) {
        return -1
      }
      indexSize = 2
      arrLength /= 2
      valLength /= 2
      byteOffset /= 2
    }
  }

  function read (buf, i) {
    if (indexSize === 1) {
      return buf[i]
    } else {
      return buf.readUInt16BE(i * indexSize)
    }
  }

  var i
  if (dir) {
    var foundIndex = -1
    for (i = byteOffset; i < arrLength; i++) {
      if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
        if (foundIndex === -1) foundIndex = i
        if (i - foundIndex + 1 === valLength) return foundIndex * indexSize
      } else {
        if (foundIndex !== -1) i -= i - foundIndex
        foundIndex = -1
      }
    }
  } else {
    if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength
    for (i = byteOffset; i >= 0; i--) {
      var found = true
      for (var j = 0; j < valLength; j++) {
        if (read(arr, i + j) !== read(val, j)) {
          found = false
          break
        }
      }
      if (found) return i
    }
  }

  return -1
}

Buffer.prototype.includes = function includes (val, byteOffset, encoding) {
  return this.indexOf(val, byteOffset, encoding) !== -1
}

Buffer.prototype.indexOf = function indexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, true)
}

Buffer.prototype.lastIndexOf = function lastIndexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, false)
}

function hexWrite (buf, string, offset, length) {
  offset = Number(offset) || 0
  var remaining = buf.length - offset
  if (!length) {
    length = remaining
  } else {
    length = Number(length)
    if (length > remaining) {
      length = remaining
    }
  }

  // must be an even number of digits
  var strLen = string.length
  if (strLen % 2 !== 0) throw new TypeError('Invalid hex string')

  if (length > strLen / 2) {
    length = strLen / 2
  }
  for (var i = 0; i < length; ++i) {
    var parsed = parseInt(string.substr(i * 2, 2), 16)
    if (isNaN(parsed)) return i
    buf[offset + i] = parsed
  }
  return i
}

function utf8Write (buf, string, offset, length) {
  return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length)
}

function asciiWrite (buf, string, offset, length) {
  return blitBuffer(asciiToBytes(string), buf, offset, length)
}

function latin1Write (buf, string, offset, length) {
  return asciiWrite(buf, string, offset, length)
}

function base64Write (buf, string, offset, length) {
  return blitBuffer(base64ToBytes(string), buf, offset, length)
}

function ucs2Write (buf, string, offset, length) {
  return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length)
}

Buffer.prototype.write = function write (string, offset, length, encoding) {
  // Buffer#write(string)
  if (offset === undefined) {
    encoding = 'utf8'
    length = this.length
    offset = 0
  // Buffer#write(string, encoding)
  } else if (length === undefined && typeof offset === 'string') {
    encoding = offset
    length = this.length
    offset = 0
  // Buffer#write(string, offset[, length][, encoding])
  } else if (isFinite(offset)) {
    offset = offset | 0
    if (isFinite(length)) {
      length = length | 0
      if (encoding === undefined) encoding = 'utf8'
    } else {
      encoding = length
      length = undefined
    }
  // legacy write(string, encoding, offset, length) - remove in v0.13
  } else {
    throw new Error(
      'Buffer.write(string, encoding, offset[, length]) is no longer supported'
    )
  }

  var remaining = this.length - offset
  if (length === undefined || length > remaining) length = remaining

  if ((string.length > 0 && (length < 0 || offset < 0)) || offset > this.length) {
    throw new RangeError('Attempt to write outside buffer bounds')
  }

  if (!encoding) encoding = 'utf8'

  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'hex':
        return hexWrite(this, string, offset, length)

      case 'utf8':
      case 'utf-8':
        return utf8Write(this, string, offset, length)

      case 'ascii':
        return asciiWrite(this, string, offset, length)

      case 'latin1':
      case 'binary':
        return latin1Write(this, string, offset, length)

      case 'base64':
        // Warning: maxLength not taken into account in base64Write
        return base64Write(this, string, offset, length)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return ucs2Write(this, string, offset, length)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}

Buffer.prototype.toJSON = function toJSON () {
  return {
    type: 'Buffer',
    data: Array.prototype.slice.call(this._arr || this, 0)
  }
}

function base64Slice (buf, start, end) {
  if (start === 0 && end === buf.length) {
    return base64.fromByteArray(buf)
  } else {
    return base64.fromByteArray(buf.slice(start, end))
  }
}

function utf8Slice (buf, start, end) {
  end = Math.min(buf.length, end)
  var res = []

  var i = start
  while (i < end) {
    var firstByte = buf[i]
    var codePoint = null
    var bytesPerSequence = (firstByte > 0xEF) ? 4
      : (firstByte > 0xDF) ? 3
      : (firstByte > 0xBF) ? 2
      : 1

    if (i + bytesPerSequence <= end) {
      var secondByte, thirdByte, fourthByte, tempCodePoint

      switch (bytesPerSequence) {
        case 1:
          if (firstByte < 0x80) {
            codePoint = firstByte
          }
          break
        case 2:
          secondByte = buf[i + 1]
          if ((secondByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0x1F) << 0x6 | (secondByte & 0x3F)
            if (tempCodePoint > 0x7F) {
              codePoint = tempCodePoint
            }
          }
          break
        case 3:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | (thirdByte & 0x3F)
            if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {
              codePoint = tempCodePoint
            }
          }
          break
        case 4:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          fourthByte = buf[i + 3]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | (fourthByte & 0x3F)
            if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {
              codePoint = tempCodePoint
            }
          }
      }
    }

    if (codePoint === null) {
      // we did not generate a valid codePoint so insert a
      // replacement char (U+FFFD) and advance only 1 byte
      codePoint = 0xFFFD
      bytesPerSequence = 1
    } else if (codePoint > 0xFFFF) {
      // encode to utf16 (surrogate pair dance)
      codePoint -= 0x10000
      res.push(codePoint >>> 10 & 0x3FF | 0xD800)
      codePoint = 0xDC00 | codePoint & 0x3FF
    }

    res.push(codePoint)
    i += bytesPerSequence
  }

  return decodeCodePointsArray(res)
}

// Based on http://stackoverflow.com/a/22747272/680742, the browser with
// the lowest limit is Chrome, with 0x10000 args.
// We go 1 magnitude less, for safety
var MAX_ARGUMENTS_LENGTH = 0x1000

function decodeCodePointsArray (codePoints) {
  var len = codePoints.length
  if (len <= MAX_ARGUMENTS_LENGTH) {
    return String.fromCharCode.apply(String, codePoints) // avoid extra slice()
  }

  // Decode in chunks to avoid "call stack size exceeded".
  var res = ''
  var i = 0
  while (i < len) {
    res += String.fromCharCode.apply(
      String,
      codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
    )
  }
  return res
}

function asciiSlice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i] & 0x7F)
  }
  return ret
}

function latin1Slice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i])
  }
  return ret
}

function hexSlice (buf, start, end) {
  var len = buf.length

  if (!start || start < 0) start = 0
  if (!end || end < 0 || end > len) end = len

  var out = ''
  for (var i = start; i < end; ++i) {
    out += toHex(buf[i])
  }
  return out
}

function utf16leSlice (buf, start, end) {
  var bytes = buf.slice(start, end)
  var res = ''
  for (var i = 0; i < bytes.length; i += 2) {
    res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256)
  }
  return res
}

Buffer.prototype.slice = function slice (start, end) {
  var len = this.length
  start = ~~start
  end = end === undefined ? len : ~~end

  if (start < 0) {
    start += len
    if (start < 0) start = 0
  } else if (start > len) {
    start = len
  }

  if (end < 0) {
    end += len
    if (end < 0) end = 0
  } else if (end > len) {
    end = len
  }

  if (end < start) end = start

  var newBuf
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    newBuf = this.subarray(start, end)
    newBuf.__proto__ = Buffer.prototype
  } else {
    var sliceLen = end - start
    newBuf = new Buffer(sliceLen, undefined)
    for (var i = 0; i < sliceLen; ++i) {
      newBuf[i] = this[i + start]
    }
  }

  return newBuf
}

/*
 * Need to make sure that buffer isn't trying to write out of bounds.
 */
function checkOffset (offset, ext, length) {
  if ((offset % 1) !== 0 || offset < 0) throw new RangeError('offset is not uint')
  if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length')
}

Buffer.prototype.readUIntLE = function readUIntLE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }

  return val
}

Buffer.prototype.readUIntBE = function readUIntBE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    checkOffset(offset, byteLength, this.length)
  }

  var val = this[offset + --byteLength]
  var mul = 1
  while (byteLength > 0 && (mul *= 0x100)) {
    val += this[offset + --byteLength] * mul
  }

  return val
}

Buffer.prototype.readUInt8 = function readUInt8 (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length)
  return this[offset]
}

Buffer.prototype.readUInt16LE = function readUInt16LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  return this[offset] | (this[offset + 1] << 8)
}

Buffer.prototype.readUInt16BE = function readUInt16BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  return (this[offset] << 8) | this[offset + 1]
}

Buffer.prototype.readUInt32LE = function readUInt32LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return ((this[offset]) |
      (this[offset + 1] << 8) |
      (this[offset + 2] << 16)) +
      (this[offset + 3] * 0x1000000)
}

Buffer.prototype.readUInt32BE = function readUInt32BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] * 0x1000000) +
    ((this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    this[offset + 3])
}

Buffer.prototype.readIntLE = function readIntLE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readIntBE = function readIntBE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var i = byteLength
  var mul = 1
  var val = this[offset + --i]
  while (i > 0 && (mul *= 0x100)) {
    val += this[offset + --i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readInt8 = function readInt8 (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length)
  if (!(this[offset] & 0x80)) return (this[offset])
  return ((0xff - this[offset] + 1) * -1)
}

Buffer.prototype.readInt16LE = function readInt16LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset] | (this[offset + 1] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt16BE = function readInt16BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset + 1] | (this[offset] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt32LE = function readInt32LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset]) |
    (this[offset + 1] << 8) |
    (this[offset + 2] << 16) |
    (this[offset + 3] << 24)
}

Buffer.prototype.readInt32BE = function readInt32BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] << 24) |
    (this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    (this[offset + 3])
}

Buffer.prototype.readFloatLE = function readFloatLE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, true, 23, 4)
}

Buffer.prototype.readFloatBE = function readFloatBE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, false, 23, 4)
}

Buffer.prototype.readDoubleLE = function readDoubleLE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, true, 52, 8)
}

Buffer.prototype.readDoubleBE = function readDoubleBE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, false, 52, 8)
}

function checkInt (buf, value, offset, ext, max, min) {
  if (!Buffer.isBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance')
  if (value > max || value < min) throw new RangeError('"value" argument is out of bounds')
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
}

Buffer.prototype.writeUIntLE = function writeUIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var mul = 1
  var i = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUIntBE = function writeUIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var i = byteLength - 1
  var mul = 1
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUInt8 = function writeUInt8 (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0)
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
  this[offset] = (value & 0xff)
  return offset + 1
}

function objectWriteUInt16 (buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffff + value + 1
  for (var i = 0, j = Math.min(buf.length - offset, 2); i < j; ++i) {
    buf[offset + i] = (value & (0xff << (8 * (littleEndian ? i : 1 - i)))) >>>
      (littleEndian ? i : 1 - i) * 8
  }
}

Buffer.prototype.writeUInt16LE = function writeUInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
  } else {
    objectWriteUInt16(this, value, offset, true)
  }
  return offset + 2
}

Buffer.prototype.writeUInt16BE = function writeUInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 8)
    this[offset + 1] = (value & 0xff)
  } else {
    objectWriteUInt16(this, value, offset, false)
  }
  return offset + 2
}

function objectWriteUInt32 (buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffffffff + value + 1
  for (var i = 0, j = Math.min(buf.length - offset, 4); i < j; ++i) {
    buf[offset + i] = (value >>> (littleEndian ? i : 3 - i) * 8) & 0xff
  }
}

Buffer.prototype.writeUInt32LE = function writeUInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset + 3] = (value >>> 24)
    this[offset + 2] = (value >>> 16)
    this[offset + 1] = (value >>> 8)
    this[offset] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, true)
  }
  return offset + 4
}

Buffer.prototype.writeUInt32BE = function writeUInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 24)
    this[offset + 1] = (value >>> 16)
    this[offset + 2] = (value >>> 8)
    this[offset + 3] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, false)
  }
  return offset + 4
}

Buffer.prototype.writeIntLE = function writeIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = 0
  var mul = 1
  var sub = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeIntBE = function writeIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = byteLength - 1
  var mul = 1
  var sub = 0
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeInt8 = function writeInt8 (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80)
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
  if (value < 0) value = 0xff + value + 1
  this[offset] = (value & 0xff)
  return offset + 1
}

Buffer.prototype.writeInt16LE = function writeInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
  } else {
    objectWriteUInt16(this, value, offset, true)
  }
  return offset + 2
}

Buffer.prototype.writeInt16BE = function writeInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 8)
    this[offset + 1] = (value & 0xff)
  } else {
    objectWriteUInt16(this, value, offset, false)
  }
  return offset + 2
}

Buffer.prototype.writeInt32LE = function writeInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
    this[offset + 2] = (value >>> 16)
    this[offset + 3] = (value >>> 24)
  } else {
    objectWriteUInt32(this, value, offset, true)
  }
  return offset + 4
}

Buffer.prototype.writeInt32BE = function writeInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (value < 0) value = 0xffffffff + value + 1
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 24)
    this[offset + 1] = (value >>> 16)
    this[offset + 2] = (value >>> 8)
    this[offset + 3] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, false)
  }
  return offset + 4
}

function checkIEEE754 (buf, value, offset, ext, max, min) {
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
  if (offset < 0) throw new RangeError('Index out of range')
}

function writeFloat (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -3.4028234663852886e+38)
  }
  ieee754.write(buf, value, offset, littleEndian, 23, 4)
  return offset + 4
}

Buffer.prototype.writeFloatLE = function writeFloatLE (value, offset, noAssert) {
  return writeFloat(this, value, offset, true, noAssert)
}

Buffer.prototype.writeFloatBE = function writeFloatBE (value, offset, noAssert) {
  return writeFloat(this, value, offset, false, noAssert)
}

function writeDouble (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -1.7976931348623157E+308)
  }
  ieee754.write(buf, value, offset, littleEndian, 52, 8)
  return offset + 8
}

Buffer.prototype.writeDoubleLE = function writeDoubleLE (value, offset, noAssert) {
  return writeDouble(this, value, offset, true, noAssert)
}

Buffer.prototype.writeDoubleBE = function writeDoubleBE (value, offset, noAssert) {
  return writeDouble(this, value, offset, false, noAssert)
}

// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
Buffer.prototype.copy = function copy (target, targetStart, start, end) {
  if (!start) start = 0
  if (!end && end !== 0) end = this.length
  if (targetStart >= target.length) targetStart = target.length
  if (!targetStart) targetStart = 0
  if (end > 0 && end < start) end = start

  // Copy 0 bytes; we're done
  if (end === start) return 0
  if (target.length === 0 || this.length === 0) return 0

  // Fatal error conditions
  if (targetStart < 0) {
    throw new RangeError('targetStart out of bounds')
  }
  if (start < 0 || start >= this.length) throw new RangeError('sourceStart out of bounds')
  if (end < 0) throw new RangeError('sourceEnd out of bounds')

  // Are we oob?
  if (end > this.length) end = this.length
  if (target.length - targetStart < end - start) {
    end = target.length - targetStart + start
  }

  var len = end - start
  var i

  if (this === target && start < targetStart && targetStart < end) {
    // descending copy from end
    for (i = len - 1; i >= 0; --i) {
      target[i + targetStart] = this[i + start]
    }
  } else if (len < 1000 || !Buffer.TYPED_ARRAY_SUPPORT) {
    // ascending copy from start
    for (i = 0; i < len; ++i) {
      target[i + targetStart] = this[i + start]
    }
  } else {
    Uint8Array.prototype.set.call(
      target,
      this.subarray(start, start + len),
      targetStart
    )
  }

  return len
}

// Usage:
//    buffer.fill(number[, offset[, end]])
//    buffer.fill(buffer[, offset[, end]])
//    buffer.fill(string[, offset[, end]][, encoding])
Buffer.prototype.fill = function fill (val, start, end, encoding) {
  // Handle string cases:
  if (typeof val === 'string') {
    if (typeof start === 'string') {
      encoding = start
      start = 0
      end = this.length
    } else if (typeof end === 'string') {
      encoding = end
      end = this.length
    }
    if (val.length === 1) {
      var code = val.charCodeAt(0)
      if (code < 256) {
        val = code
      }
    }
    if (encoding !== undefined && typeof encoding !== 'string') {
      throw new TypeError('encoding must be a string')
    }
    if (typeof encoding === 'string' && !Buffer.isEncoding(encoding)) {
      throw new TypeError('Unknown encoding: ' + encoding)
    }
  } else if (typeof val === 'number') {
    val = val & 255
  }

  // Invalid ranges are not set to a default, so can range check early.
  if (start < 0 || this.length < start || this.length < end) {
    throw new RangeError('Out of range index')
  }

  if (end <= start) {
    return this
  }

  start = start >>> 0
  end = end === undefined ? this.length : end >>> 0

  if (!val) val = 0

  var i
  if (typeof val === 'number') {
    for (i = start; i < end; ++i) {
      this[i] = val
    }
  } else {
    var bytes = Buffer.isBuffer(val)
      ? val
      : utf8ToBytes(new Buffer(val, encoding).toString())
    var len = bytes.length
    for (i = 0; i < end - start; ++i) {
      this[i + start] = bytes[i % len]
    }
  }

  return this
}

// HELPER FUNCTIONS
// ================

var INVALID_BASE64_RE = /[^+\/0-9A-Za-z-_]/g

function base64clean (str) {
  // Node strips out invalid characters like \n and \t from the string, base64-js does not
  str = stringtrim(str).replace(INVALID_BASE64_RE, '')
  // Node converts strings with length < 2 to ''
  if (str.length < 2) return ''
  // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
  while (str.length % 4 !== 0) {
    str = str + '='
  }
  return str
}

function stringtrim (str) {
  if (str.trim) return str.trim()
  return str.replace(/^\s+|\s+$/g, '')
}

function toHex (n) {
  if (n < 16) return '0' + n.toString(16)
  return n.toString(16)
}

function utf8ToBytes (string, units) {
  units = units || Infinity
  var codePoint
  var length = string.length
  var leadSurrogate = null
  var bytes = []

  for (var i = 0; i < length; ++i) {
    codePoint = string.charCodeAt(i)

    // is surrogate component
    if (codePoint > 0xD7FF && codePoint < 0xE000) {
      // last char was a lead
      if (!leadSurrogate) {
        // no lead yet
        if (codePoint > 0xDBFF) {
          // unexpected trail
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        } else if (i + 1 === length) {
          // unpaired lead
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        }

        // valid lead
        leadSurrogate = codePoint

        continue
      }

      // 2 leads in a row
      if (codePoint < 0xDC00) {
        if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
        leadSurrogate = codePoint
        continue
      }

      // valid surrogate pair
      codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000
    } else if (leadSurrogate) {
      // valid bmp char, but last char was a lead
      if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
    }

    leadSurrogate = null

    // encode utf8
    if (codePoint < 0x80) {
      if ((units -= 1) < 0) break
      bytes.push(codePoint)
    } else if (codePoint < 0x800) {
      if ((units -= 2) < 0) break
      bytes.push(
        codePoint >> 0x6 | 0xC0,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x10000) {
      if ((units -= 3) < 0) break
      bytes.push(
        codePoint >> 0xC | 0xE0,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x110000) {
      if ((units -= 4) < 0) break
      bytes.push(
        codePoint >> 0x12 | 0xF0,
        codePoint >> 0xC & 0x3F | 0x80,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else {
      throw new Error('Invalid code point')
    }
  }

  return bytes
}

function asciiToBytes (str) {
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    // Node's code seems to be doing this and not & 0x7F..
    byteArray.push(str.charCodeAt(i) & 0xFF)
  }
  return byteArray
}

function utf16leToBytes (str, units) {
  var c, hi, lo
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    if ((units -= 2) < 0) break

    c = str.charCodeAt(i)
    hi = c >> 8
    lo = c % 256
    byteArray.push(lo)
    byteArray.push(hi)
  }

  return byteArray
}

function base64ToBytes (str) {
  return base64.toByteArray(base64clean(str))
}

function blitBuffer (src, dst, offset, length) {
  for (var i = 0; i < length; ++i) {
    if ((i + offset >= dst.length) || (i >= src.length)) break
    dst[i + offset] = src[i]
  }
  return i
}

function isnan (val) {
  return val !== val // eslint-disable-line no-self-compare
}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(17)))

/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/*<replacement>*/

var processNextTick = __webpack_require__(26);
/*</replacement>*/

// undocumented cb() API, needed for core, not for public API
function destroy(err, cb) {
  var _this = this;

  var readableDestroyed = this._readableState && this._readableState.destroyed;
  var writableDestroyed = this._writableState && this._writableState.destroyed;

  if (readableDestroyed || writableDestroyed) {
    if (cb) {
      cb(err);
    } else if (err && (!this._writableState || !this._writableState.errorEmitted)) {
      processNextTick(emitErrorNT, this, err);
    }
    return;
  }

  // we set destroyed to true before firing error callbacks in order
  // to make it re-entrance safe in case destroy() is called within callbacks

  if (this._readableState) {
    this._readableState.destroyed = true;
  }

  // if this is a duplex stream mark the writable part as destroyed as well
  if (this._writableState) {
    this._writableState.destroyed = true;
  }

  this._destroy(err || null, function (err) {
    if (!cb && err) {
      processNextTick(emitErrorNT, _this, err);
      if (_this._writableState) {
        _this._writableState.errorEmitted = true;
      }
    } else if (cb) {
      cb(err);
    }
  });
}

function undestroy() {
  if (this._readableState) {
    this._readableState.destroyed = false;
    this._readableState.reading = false;
    this._readableState.ended = false;
    this._readableState.endEmitted = false;
  }

  if (this._writableState) {
    this._writableState.destroyed = false;
    this._writableState.ended = false;
    this._writableState.ending = false;
    this._writableState.finished = false;
    this._writableState.errorEmitted = false;
  }
}

function emitErrorNT(self, err) {
  self.emit('error', err);
}

module.exports = {
  destroy: destroy,
  undestroy: undestroy
};

/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Buffer = __webpack_require__(27).Buffer;

var isEncoding = Buffer.isEncoding || function (encoding) {
  encoding = '' + encoding;
  switch (encoding && encoding.toLowerCase()) {
    case 'hex':case 'utf8':case 'utf-8':case 'ascii':case 'binary':case 'base64':case 'ucs2':case 'ucs-2':case 'utf16le':case 'utf-16le':case 'raw':
      return true;
    default:
      return false;
  }
};

function _normalizeEncoding(enc) {
  if (!enc) return 'utf8';
  var retried;
  while (true) {
    switch (enc) {
      case 'utf8':
      case 'utf-8':
        return 'utf8';
      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return 'utf16le';
      case 'latin1':
      case 'binary':
        return 'latin1';
      case 'base64':
      case 'ascii':
      case 'hex':
        return enc;
      default:
        if (retried) return; // undefined
        enc = ('' + enc).toLowerCase();
        retried = true;
    }
  }
};

// Do not cache `Buffer.isEncoding` when checking encoding names as some
// modules monkey-patch it to support additional encodings
function normalizeEncoding(enc) {
  var nenc = _normalizeEncoding(enc);
  if (typeof nenc !== 'string' && (Buffer.isEncoding === isEncoding || !isEncoding(enc))) throw new Error('Unknown encoding: ' + enc);
  return nenc || enc;
}

// StringDecoder provides an interface for efficiently splitting a series of
// buffers into a series of JS strings without breaking apart multi-byte
// characters.
exports.StringDecoder = StringDecoder;
function StringDecoder(encoding) {
  this.encoding = normalizeEncoding(encoding);
  var nb;
  switch (this.encoding) {
    case 'utf16le':
      this.text = utf16Text;
      this.end = utf16End;
      nb = 4;
      break;
    case 'utf8':
      this.fillLast = utf8FillLast;
      nb = 4;
      break;
    case 'base64':
      this.text = base64Text;
      this.end = base64End;
      nb = 3;
      break;
    default:
      this.write = simpleWrite;
      this.end = simpleEnd;
      return;
  }
  this.lastNeed = 0;
  this.lastTotal = 0;
  this.lastChar = Buffer.allocUnsafe(nb);
}

StringDecoder.prototype.write = function (buf) {
  if (buf.length === 0) return '';
  var r;
  var i;
  if (this.lastNeed) {
    r = this.fillLast(buf);
    if (r === undefined) return '';
    i = this.lastNeed;
    this.lastNeed = 0;
  } else {
    i = 0;
  }
  if (i < buf.length) return r ? r + this.text(buf, i) : this.text(buf, i);
  return r || '';
};

StringDecoder.prototype.end = utf8End;

// Returns only complete characters in a Buffer
StringDecoder.prototype.text = utf8Text;

// Attempts to complete a partial non-UTF-8 character using bytes from a Buffer
StringDecoder.prototype.fillLast = function (buf) {
  if (this.lastNeed <= buf.length) {
    buf.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, this.lastNeed);
    return this.lastChar.toString(this.encoding, 0, this.lastTotal);
  }
  buf.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, buf.length);
  this.lastNeed -= buf.length;
};

// Checks the type of a UTF-8 byte, whether it's ASCII, a leading byte, or a
// continuation byte.
function utf8CheckByte(byte) {
  if (byte <= 0x7F) return 0;else if (byte >> 5 === 0x06) return 2;else if (byte >> 4 === 0x0E) return 3;else if (byte >> 3 === 0x1E) return 4;
  return -1;
}

// Checks at most 3 bytes at the end of a Buffer in order to detect an
// incomplete multi-byte UTF-8 character. The total number of bytes (2, 3, or 4)
// needed to complete the UTF-8 character (if applicable) are returned.
function utf8CheckIncomplete(self, buf, i) {
  var j = buf.length - 1;
  if (j < i) return 0;
  var nb = utf8CheckByte(buf[j]);
  if (nb >= 0) {
    if (nb > 0) self.lastNeed = nb - 1;
    return nb;
  }
  if (--j < i) return 0;
  nb = utf8CheckByte(buf[j]);
  if (nb >= 0) {
    if (nb > 0) self.lastNeed = nb - 2;
    return nb;
  }
  if (--j < i) return 0;
  nb = utf8CheckByte(buf[j]);
  if (nb >= 0) {
    if (nb > 0) {
      if (nb === 2) nb = 0;else self.lastNeed = nb - 3;
    }
    return nb;
  }
  return 0;
}

// Validates as many continuation bytes for a multi-byte UTF-8 character as
// needed or are available. If we see a non-continuation byte where we expect
// one, we "replace" the validated continuation bytes we've seen so far with
// UTF-8 replacement characters ('\ufffd'), to match v8's UTF-8 decoding
// behavior. The continuation byte check is included three times in the case
// where all of the continuation bytes for a character exist in the same buffer.
// It is also done this way as a slight performance increase instead of using a
// loop.
function utf8CheckExtraBytes(self, buf, p) {
  if ((buf[0] & 0xC0) !== 0x80) {
    self.lastNeed = 0;
    return '\ufffd'.repeat(p);
  }
  if (self.lastNeed > 1 && buf.length > 1) {
    if ((buf[1] & 0xC0) !== 0x80) {
      self.lastNeed = 1;
      return '\ufffd'.repeat(p + 1);
    }
    if (self.lastNeed > 2 && buf.length > 2) {
      if ((buf[2] & 0xC0) !== 0x80) {
        self.lastNeed = 2;
        return '\ufffd'.repeat(p + 2);
      }
    }
  }
}

// Attempts to complete a multi-byte UTF-8 character using bytes from a Buffer.
function utf8FillLast(buf) {
  var p = this.lastTotal - this.lastNeed;
  var r = utf8CheckExtraBytes(this, buf, p);
  if (r !== undefined) return r;
  if (this.lastNeed <= buf.length) {
    buf.copy(this.lastChar, p, 0, this.lastNeed);
    return this.lastChar.toString(this.encoding, 0, this.lastTotal);
  }
  buf.copy(this.lastChar, p, 0, buf.length);
  this.lastNeed -= buf.length;
}

// Returns all complete UTF-8 characters in a Buffer. If the Buffer ended on a
// partial character, the character's bytes are buffered until the required
// number of bytes are available.
function utf8Text(buf, i) {
  var total = utf8CheckIncomplete(this, buf, i);
  if (!this.lastNeed) return buf.toString('utf8', i);
  this.lastTotal = total;
  var end = buf.length - (total - this.lastNeed);
  buf.copy(this.lastChar, 0, end);
  return buf.toString('utf8', i, end);
}

// For UTF-8, a replacement character for each buffered byte of a (partial)
// character needs to be added to the output.
function utf8End(buf) {
  var r = buf && buf.length ? this.write(buf) : '';
  if (this.lastNeed) return r + '\ufffd'.repeat(this.lastTotal - this.lastNeed);
  return r;
}

// UTF-16LE typically needs two bytes per character, but even if we have an even
// number of bytes available, we need to check if we end on a leading/high
// surrogate. In that case, we need to wait for the next two bytes in order to
// decode the last character properly.
function utf16Text(buf, i) {
  if ((buf.length - i) % 2 === 0) {
    var r = buf.toString('utf16le', i);
    if (r) {
      var c = r.charCodeAt(r.length - 1);
      if (c >= 0xD800 && c <= 0xDBFF) {
        this.lastNeed = 2;
        this.lastTotal = 4;
        this.lastChar[0] = buf[buf.length - 2];
        this.lastChar[1] = buf[buf.length - 1];
        return r.slice(0, -1);
      }
    }
    return r;
  }
  this.lastNeed = 1;
  this.lastTotal = 2;
  this.lastChar[0] = buf[buf.length - 1];
  return buf.toString('utf16le', i, buf.length - 1);
}

// For UTF-16LE we do not explicitly append special replacement characters if we
// end on a partial character, we simply let v8 handle that.
function utf16End(buf) {
  var r = buf && buf.length ? this.write(buf) : '';
  if (this.lastNeed) {
    var end = this.lastTotal - this.lastNeed;
    return r + this.lastChar.toString('utf16le', 0, end);
  }
  return r;
}

function base64Text(buf, i) {
  var n = (buf.length - i) % 3;
  if (n === 0) return buf.toString('base64', i);
  this.lastNeed = 3 - n;
  this.lastTotal = 3;
  if (n === 1) {
    this.lastChar[0] = buf[buf.length - 1];
  } else {
    this.lastChar[0] = buf[buf.length - 2];
    this.lastChar[1] = buf[buf.length - 1];
  }
  return buf.toString('base64', i, buf.length - n);
}

function base64End(buf) {
  var r = buf && buf.length ? this.write(buf) : '';
  if (this.lastNeed) return r + this.lastChar.toString('base64', 0, 3 - this.lastNeed);
  return r;
}

// Pass bytes on through for single-byte encodings (e.g. ascii, latin1, hex)
function simpleWrite(buf) {
  return buf.toString(this.encoding);
}

function simpleEnd(buf) {
  return buf && buf.length ? this.write(buf) : '';
}

/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

// a transform stream is a readable/writable stream where you do
// something with the data.  Sometimes it's called a "filter",
// but that's not a great name for it, since that implies a thing where
// some bits pass through, and others are simply ignored.  (That would
// be a valid example of a transform, of course.)
//
// While the output is causally related to the input, it's not a
// necessarily symmetric or synchronous transformation.  For example,
// a zlib stream might take multiple plain-text writes(), and then
// emit a single compressed chunk some time in the future.
//
// Here's how this works:
//
// The Transform stream has all the aspects of the readable and writable
// stream classes.  When you write(chunk), that calls _write(chunk,cb)
// internally, and returns false if there's a lot of pending writes
// buffered up.  When you call read(), that calls _read(n) until
// there's enough pending readable data buffered up.
//
// In a transform stream, the written data is placed in a buffer.  When
// _read(n) is called, it transforms the queued up data, calling the
// buffered _write cb's as it consumes chunks.  If consuming a single
// written chunk would result in multiple output chunks, then the first
// outputted bit calls the readcb, and subsequent chunks just go into
// the read buffer, and will cause it to emit 'readable' if necessary.
//
// This way, back-pressure is actually determined by the reading side,
// since _read has to be called to start processing a new chunk.  However,
// a pathological inflate type of transform can cause excessive buffering
// here.  For example, imagine a stream where every byte of input is
// interpreted as an integer from 0-255, and then results in that many
// bytes of output.  Writing the 4 bytes {ff,ff,ff,ff} would result in
// 1kb of data being output.  In this case, you could write a very small
// amount of input, and end up with a very large amount of output.  In
// such a pathological inflating mechanism, there'd be no way to tell
// the system to stop doing the transform.  A single 4MB write could
// cause the system to run out of memory.
//
// However, even in such a pathological case, only a single written chunk
// would be consumed, and then the rest would wait (un-transformed) until
// the results of the previous transformed chunk were consumed.



module.exports = Transform;

var Duplex = __webpack_require__(15);

/*<replacement>*/
var util = __webpack_require__(23);
util.inherits = __webpack_require__(18);
/*</replacement>*/

util.inherits(Transform, Duplex);

function TransformState(stream) {
  this.afterTransform = function (er, data) {
    return afterTransform(stream, er, data);
  };

  this.needTransform = false;
  this.transforming = false;
  this.writecb = null;
  this.writechunk = null;
  this.writeencoding = null;
}

function afterTransform(stream, er, data) {
  var ts = stream._transformState;
  ts.transforming = false;

  var cb = ts.writecb;

  if (!cb) {
    return stream.emit('error', new Error('write callback called multiple times'));
  }

  ts.writechunk = null;
  ts.writecb = null;

  if (data !== null && data !== undefined) stream.push(data);

  cb(er);

  var rs = stream._readableState;
  rs.reading = false;
  if (rs.needReadable || rs.length < rs.highWaterMark) {
    stream._read(rs.highWaterMark);
  }
}

function Transform(options) {
  if (!(this instanceof Transform)) return new Transform(options);

  Duplex.call(this, options);

  this._transformState = new TransformState(this);

  var stream = this;

  // start out asking for a readable event once data is transformed.
  this._readableState.needReadable = true;

  // we have implemented the _read method, and done the other things
  // that Readable wants before the first _read call, so unset the
  // sync guard flag.
  this._readableState.sync = false;

  if (options) {
    if (typeof options.transform === 'function') this._transform = options.transform;

    if (typeof options.flush === 'function') this._flush = options.flush;
  }

  // When the writable side finishes, then flush out anything remaining.
  this.once('prefinish', function () {
    if (typeof this._flush === 'function') this._flush(function (er, data) {
      done(stream, er, data);
    });else done(stream);
  });
}

Transform.prototype.push = function (chunk, encoding) {
  this._transformState.needTransform = false;
  return Duplex.prototype.push.call(this, chunk, encoding);
};

// This is the part where you do stuff!
// override this function in implementation classes.
// 'chunk' is an input chunk.
//
// Call `push(newChunk)` to pass along transformed output
// to the readable side.  You may call 'push' zero or more times.
//
// Call `cb(err)` when you are done with this chunk.  If you pass
// an error, then that'll put the hurt on the whole operation.  If you
// never call cb(), then you'll never get another chunk.
Transform.prototype._transform = function (chunk, encoding, cb) {
  throw new Error('_transform() is not implemented');
};

Transform.prototype._write = function (chunk, encoding, cb) {
  var ts = this._transformState;
  ts.writecb = cb;
  ts.writechunk = chunk;
  ts.writeencoding = encoding;
  if (!ts.transforming) {
    var rs = this._readableState;
    if (ts.needTransform || rs.needReadable || rs.length < rs.highWaterMark) this._read(rs.highWaterMark);
  }
};

// Doesn't matter what the args are here.
// _transform does all the work.
// That we got here means that the readable side wants more data.
Transform.prototype._read = function (n) {
  var ts = this._transformState;

  if (ts.writechunk !== null && ts.writecb && !ts.transforming) {
    ts.transforming = true;
    this._transform(ts.writechunk, ts.writeencoding, ts.afterTransform);
  } else {
    // mark that we need a transform, so that any data that comes in
    // will get processed, now that we've asked for it.
    ts.needTransform = true;
  }
};

Transform.prototype._destroy = function (err, cb) {
  var _this = this;

  Duplex.prototype._destroy.call(this, err, function (err2) {
    cb(err2);
    _this.emit('close');
  });
};

function done(stream, er, data) {
  if (er) return stream.emit('error', er);

  if (data !== null && data !== undefined) stream.push(data);

  // if there's nothing in the write buffer, then that means
  // that nothing more will ever be provided
  var ws = stream._writableState;
  var ts = stream._transformState;

  if (ws.length) throw new Error('Calling transform done when ws.length != 0');

  if (ts.transforming) throw new Error('Calling transform done when still transforming');

  return stream.push(null);
}

/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const maybe_1 = __webpack_require__(0);
const tab_utils_1 = __webpack_require__(48);
const url_utils_1 = __webpack_require__(4);
const iter_utils_1 = __webpack_require__(35);
const iter_utils_2 = __webpack_require__(35);
const browser_1 = __webpack_require__(6);
const string_utils_1 = __webpack_require__(3);
function parseBrowserNewTabURLs() {
    const newTabSpecs = [
        [browser_1.Browser.chrome, "chrome://newtab"],
        [browser_1.Browser.firefox, "about:newtab"],
        [browser_1.Browser.edge, "https://www.msn.com/spartan/ntp"],
        [browser_1.Browser.edgeChromium, "https://ntp.msn.com/edge/ntp"]
    ];
    const newTabURLs = newTabSpecs.map(([browser, spec]) => {
        const url = url_utils_1.parseUrl(spec);
        if (maybe_1.none(url)) {
            return undefined;
        }
        return [browser, url];
    }).filter(maybe_1.some);
    return new Map(newTabURLs);
}
exports.parseBrowserNewTabURLs = parseBrowserNewTabURLs;
function parseTabUrl(tab) {
    if (tab.url === undefined) {
        return undefined;
    }
    const spec = tab.url;
    const url = url_utils_1.parseUrl(spec);
    if (url === undefined) {
        return spec;
    }
    else {
        return url;
    }
}
class TabStalker {
    constructor(browser) {
        this.browser = browser;
        this.windows = new Set();
        this.tabs = new Set();
        this.windowsToTabs = new Map();
        this.tabsToWindows = new Map();
        this.tabURLs = new Map();
        this.windowActivatedTabs = new Map();
        this.windowLastUniqueActivatedTabs = new Map();
        this.activatedTabs = new Set();
        this.openerTabs = new Map();
        this.openerWindows = new Map();
        this.restoredSessionTabs = new Set();
        this.onTabClosedHandlers = [];
        this.onTabCreatedHandlers = [];
        this.onTabRestoredListeners = [];
        this.browserNewTabURLs = parseBrowserNewTabURLs();
    }
    queryRestoredSessionTabs() {
        chrome.windows.getAll((windows) => {
            for (const window of windows) {
                this.onWindowCreated(window);
            }
            chrome.tabs.query({}, (tabs) => {
                for (const tab of tabs) {
                    this.onTabCreated(tab);
                    const tabId = tab.id;
                    if (maybe_1.some(tabId)) {
                        this.restoredSessionTabs.add(tabId);
                        const url = maybe_1.some(tab.url) ? url_utils_1.parseUrl(tab.url) : undefined;
                        this.notifyOnTabRestoredListeners(tabId, url);
                    }
                }
            });
        });
    }
    onTabCreated(tab) {
        const tabId = tab.id;
        if (tabId === undefined) {
            return;
        }
        if (!tab_utils_1.isValidTabId(tabId)) {
            return;
        }
        const windowId = tab.windowId;
        this.tabs.add(tabId);
        this.addTabToWindow(tabId, windowId);
        const openerTabId = tab.openerTabId;
        if (openerTabId !== undefined) {
            this.openerTabs.set(tabId, openerTabId);
        }
        if (tab.active) {
            this.updateTabActivation(tabId, windowId);
        }
        this.updateTabURL(tabId, tab);
        this.notifyOnTabCreatedHandlers(tabId);
    }
    updateTabURL(tabId, tabInfo) {
        if (tabInfo.url === undefined) {
            return;
        }
        const url = parseTabUrl(tabInfo);
        if (url === undefined) {
            return;
        }
        this.tabURLs.set(tabId, url);
    }
    onTabUpdated(tabId, changeInfo, tab) {
        if (!tab_utils_1.isValidTabId(tabId)) {
            return;
        }
        this.tabs.add(tabId);
        if (tab.active) {
            this.updateTabActivation(tabId, tab.windowId);
        }
        this.updateTabURL(tabId, changeInfo);
    }
    onTabMoved(tabId, moveInfo) {
    }
    onTabActivated(activeInfo) {
        const tabId = activeInfo.tabId;
        const windowId = activeInfo.windowId;
        if (this.tabs.has(tabId)) {
            this.updateTabActivation(tabId, windowId);
        }
        else {
            chrome.tabs.get(tabId, tab => this.onTabCreated(tab));
        }
    }
    updateTabActivation(tabId, windowId) {
        if (!tab_utils_1.isValidTabId(tabId)) {
            return;
        }
        if (!tab_utils_1.isValidWindowId(windowId)) {
            return;
        }
        const lastActivatedTabId = this.windowActivatedTabs.get(windowId);
        if (maybe_1.some(lastActivatedTabId) && lastActivatedTabId !== tabId) {
            this.windowLastUniqueActivatedTabs.set(windowId, lastActivatedTabId);
        }
        this.windowActivatedTabs.set(windowId, tabId);
        this.activatedTabs = new Set(this.windowActivatedTabs.values());
    }
    onTabHighlighted(highlightInfo) {
    }
    onTabDetached(tabId, detachInfo) {
        if (!tab_utils_1.isValidTabId(tabId)) {
            return;
        }
        const windowId = detachInfo.oldWindowId;
        if (!tab_utils_1.isValidWindowId(windowId)) {
            return;
        }
        this.removeTabFromWindow(tabId, windowId);
    }
    onTabAttached(tabId, attachInfo) {
        if (!tab_utils_1.isValidTabId(tabId)) {
            return;
        }
        const windowId = attachInfo.newWindowId;
        if (!tab_utils_1.isValidWindowId(windowId)) {
            return;
        }
        this.addTabToWindow(tabId, windowId);
    }
    removeTab(tabId) {
        this.tabs.delete(tabId);
        this.tabURLs.delete(tabId);
        this.openerTabs.delete(tabId);
        this.restoredSessionTabs.delete(tabId);
    }
    onTabRemoved(tabId, removeInfo) {
        if (!tab_utils_1.isValidTabId(tabId)) {
            return;
        }
        const windowId = removeInfo.windowId;
        if (!tab_utils_1.isValidWindowId(windowId)) {
            return;
        }
        this.notifyOnTabClosedHandlers(tabId);
        this.removeTabFromWindow(tabId, windowId);
        this.removeTab(tabId);
    }
    onTabReplaced(addedTabId, removedTabId) {
        if (this.isTab(addedTabId)) {
            const windowId = this.findTabWindowId(addedTabId);
            if (maybe_1.some(windowId)) {
                this.addTabToWindow(addedTabId, windowId);
            }
        }
        if (this.isTab(removedTabId)) {
            const windowId = this.findTabWindowId(removedTabId);
            if (maybe_1.some(windowId)) {
                this.removeTabFromWindow(removedTabId, windowId);
                this.removeTab(removedTabId);
            }
        }
    }
    onWindowCreated(window) {
        const windowId = window.id;
        if (!tab_utils_1.isValidWindowId(windowId)) {
            return;
        }
        this.windows.add(windowId);
        let focusedWindowId = this.focusedWindowId;
        if (focusedWindowId === undefined) {
            focusedWindowId = this.lastFocusedWindowId;
        }
        if (focusedWindowId !== undefined) {
            const activatedTabId = this.windowActivatedTabs.get(focusedWindowId);
            if (activatedTabId !== undefined) {
                this.openerWindows.set(windowId, [focusedWindowId, activatedTabId]);
            }
        }
    }
    onWindowRemoved(windowId) {
        if (!tab_utils_1.isValidWindowId) {
            return;
        }
        this.windows.delete(windowId);
        const tabs = this.windowsToTabs.get(windowId);
        if (tabs !== undefined) {
            for (const tabId of tabs) {
                this.removeTab(tabId);
                this.removeTabFromWindow(tabId, windowId);
            }
        }
        this.windowsToTabs.delete(windowId);
        this.windowActivatedTabs.delete(windowId);
        this.windowLastUniqueActivatedTabs.delete(windowId);
        this.openerWindows.delete(windowId);
    }
    onWindowFocusChanged(windowId) {
        if (this.focusedWindowId !== undefined) {
            this.lastFocusedWindowId = this.focusedWindowId;
        }
        if (tab_utils_1.isValidWindowId(windowId)) {
            this.focusedWindowId = windowId;
        }
        else {
            this.focusedWindowId = undefined;
        }
    }
    registerTabEventListeners() {
        chrome.tabs.onCreated.addListener(this.onTabCreated.bind(this));
        chrome.tabs.onUpdated.addListener(this.onTabUpdated.bind(this));
        chrome.tabs.onMoved.addListener(this.onTabMoved.bind(this));
        chrome.tabs.onActivated.addListener(this.onTabActivated.bind(this));
        chrome.tabs.onHighlighted.addListener(this.onTabHighlighted.bind(this));
        chrome.tabs.onDetached.addListener(this.onTabDetached.bind(this));
        chrome.tabs.onAttached.addListener(this.onTabAttached.bind(this));
        chrome.tabs.onRemoved.addListener(this.onTabRemoved.bind(this));
        chrome.tabs.onReplaced.addListener(this.onTabReplaced.bind(this));
    }
    registerWindowEventListeners() {
        chrome.windows.onCreated.addListener(this.onWindowCreated.bind(this));
        chrome.windows.onRemoved.addListener(this.onWindowRemoved.bind(this));
        chrome.windows.onFocusChanged.addListener(this.onWindowFocusChanged.bind(this));
    }
    registerListeners() {
        this.registerWindowEventListeners();
        this.registerTabEventListeners();
    }
    addTabToWindow(tabId, windowId) {
        const windowToTabs = this.windowsToTabs.get(windowId);
        if (windowToTabs === undefined) {
            this.windowsToTabs.set(windowId, new Set([tabId]));
        }
        else {
            windowToTabs.add(tabId);
        }
        this.tabsToWindows.set(tabId, windowId);
    }
    removeTabFromWindow(tabId, windowId) {
        const windowToTabs = this.windowsToTabs.get(windowId);
        if (windowToTabs !== undefined) {
            this.windowsToTabs.delete(tabId);
        }
        this.tabsToWindows.delete(tabId);
    }
    findActivatedTabId(windowId) {
        if (windowId === undefined) {
            return undefined;
        }
        if (!tab_utils_1.isValidWindowId(windowId)) {
            return undefined;
        }
        return this.windowActivatedTabs.get(windowId);
    }
    findLastActivatedTabId(windowId) {
        if (windowId === undefined) {
            return undefined;
        }
        if (!tab_utils_1.isValidWindowId(windowId)) {
            return undefined;
        }
        return this.windowLastUniqueActivatedTabs.get(windowId);
    }
    findTabURL(tabId) {
        if (tabId === undefined) {
            return undefined;
        }
        if (!tab_utils_1.isValidTabId(tabId)) {
            return undefined;
        }
        return this.tabURLs.get(tabId);
    }
    findOpenerTabId(tabId) {
        if (tabId === undefined) {
            return undefined;
        }
        if (!tab_utils_1.isValidTabId(tabId)) {
            return undefined;
        }
        return this.openerTabs.get(tabId);
    }
    findTabWindowId(tabId) {
        if (tabId === undefined) {
            return undefined;
        }
        if (!tab_utils_1.isValidTabId(tabId)) {
            return undefined;
        }
        return this.tabsToWindows.get(tabId);
    }
    findOpenerWindowId(windowId) {
        if (windowId === undefined) {
            return undefined;
        }
        if (!tab_utils_1.isValidWindowId(windowId)) {
            return undefined;
        }
        return this.openerWindows.get(windowId);
    }
    findWindowTabCount(windowId) {
        if (windowId === undefined) {
            return 0;
        }
        const windowToTabs = this.windowsToTabs.get(windowId);
        if (windowToTabs === undefined) {
            return 0;
        }
        return windowToTabs.size;
    }
    get maybeNewWindowId() {
        const emptyWindowIds = iter_utils_1.toArray(iter_utils_1.filter(this.windows.keys(), (windowId) => {
            return this.findWindowTabCount(windowId) === 0;
        }));
        if (emptyWindowIds.length === 1) {
            return iter_utils_2.first(emptyWindowIds);
        }
        else {
            return undefined;
        }
    }
    isTabActivated(tabId) {
        return this.activatedTabs.has(tabId);
    }
    get activatedTabId() {
        return this.findActivatedTabId(this.focusedWindowId);
    }
    get activatedTabURL() {
        return this.findTabURL(this.activatedTabId);
    }
    get lastActivatedTabId() {
        return this.findLastActivatedTabId(this.focusedWindowId);
    }
    get lastFocusedWindowActivatedTabId() {
        return this.findActivatedTabId(this.lastFocusedWindowId);
    }
    isTab(tabId) {
        return tab_utils_1.isValidTabId(tabId) && this.tabs.has(tabId);
    }
    isWindow(windowId) {
        return tab_utils_1.isValidWindowId(windowId) && this.windows.has(windowId);
    }
    isRestoredSessionTab(tabId) {
        return tab_utils_1.isValidTabId(tabId) && this.restoredSessionTabs.has(tabId);
    }
    findPopupWindowTabId(windowId) {
        if (!tab_utils_1.isValidWindowId(windowId)) {
            return undefined;
        }
        const tabs = this.windowsToTabs.get(windowId);
        if (maybe_1.none(tabs) || (tabs.size !== 1)) {
            return undefined;
        }
        return iter_utils_2.first(tabs);
    }
    findPopupWindowTabIds() {
        const windows = iter_utils_1.toArray(this.windows);
        return windows.map((windowId) => this.findPopupWindowTabId(windowId)).filter(maybe_1.some);
    }
    findBrowserNewTabURL() {
        if (maybe_1.none(this.browser)) {
            return undefined;
        }
        if (maybe_1.none(this.browserNewTabURLs)) {
            return undefined;
        }
        const browserNewTabURL = this.browserNewTabURLs.get(this.browser);
        return browserNewTabURL;
    }
    didUserCreateTab(tabId) {
        const urlOrSpec = this.findTabURL(tabId);
        if (maybe_1.none(urlOrSpec)) {
            return false;
        }
        const url = url_utils_1.parseURLIfNecessary(urlOrSpec);
        if (maybe_1.none(url)) {
            return false;
        }
        const browserNewTabURL = this.findBrowserNewTabURL();
        if (maybe_1.none(browserNewTabURL)) {
            return false;
        }
        return url_utils_1.isSameUrl(url, browserNewTabURL, url_utils_1.UrlCompareOptions.IgnoreSearchParams);
    }
    registerOnTabClosedHandler(handler) {
        this.onTabClosedHandlers.push(handler);
    }
    notifyOnTabClosedHandlers(tabId) {
        for (const onTabClosed of this.onTabClosedHandlers) {
            onTabClosed(tabId);
        }
    }
    registerOnTabCreatedHandler(handler) {
        this.onTabCreatedHandlers.push(handler);
    }
    notifyOnTabCreatedHandlers(tabId) {
        for (const onTabCreated of this.onTabCreatedHandlers) {
            onTabCreated(tabId);
        }
    }
    registerOnTabRestoredListeners(listener) {
        this.onTabRestoredListeners.push(listener);
        if (!iter_utils_1.isEmpty(this.restoredSessionTabs)) {
            for (const tabId of this.restoredSessionTabs) {
                const urlOrSpec = this.findTabURL(tabId);
                const url = maybe_1.some(urlOrSpec) ? url_utils_1.parseURLIfNecessary(urlOrSpec) : undefined;
                this.notifyOnTabRestoredListeners(tabId, url);
            }
        }
    }
    notifyOnTabRestoredListeners(tabId, url) {
        for (const onTabRestored of this.onTabRestoredListeners) {
            onTabRestored(tabId, url);
        }
    }
    toString() {
        const windowsToTabsToURLs = new Map();
        for (const [window, tabs] of this.windowsToTabs) {
            let tabsToURLs = new Map();
            for (const tab of tabs) {
                tabsToURLs.set(tab, this.tabURLs.get(tab));
            }
            windowsToTabsToURLs.set(window, tabsToURLs);
        }
        return string_utils_1.toString({
            windowsToTabsToURLs: windowsToTabsToURLs,
            windowActivatedTabs: this.windowActivatedTabs,
            windowLastUniqueActivatedTabs: this.windowLastUniqueActivatedTabs,
            activatedTabs: this.activatedTabs,
            openerTabs: this.openerTabs,
            openerWindows: this.openerWindows,
            browserNewTabURLs: this.browserNewTabURLs
        }, 1);
    }
}
exports.TabStalker = TabStalker;


/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const murmur_hash_1 = __webpack_require__(11);
function isValidWindowId(windowId) {
    return windowId !== chrome.windows.WINDOW_ID_NONE;
}
exports.isValidWindowId = isValidWindowId;
function isValidTabId(tabId) {
    return tabId !== chrome.tabs.TAB_ID_NONE;
}
exports.isValidTabId = isValidTabId;
function hashTabId(tabId, seed = 0) {
    return murmur_hash_1.murmurHash(tabId, seed);
}
exports.hashTabId = hashTabId;
function isSameTabId(a, b) {
    if (!isValidTabId(a) || !isValidTabId(b)) {
        return false;
    }
    return a === b;
}
exports.isSameTabId = isSameTabId;


/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const url_utils_1 = __webpack_require__(4);
const murmur_hash_1 = __webpack_require__(11);
const origin_1 = __webpack_require__(9);
const maybe_1 = __webpack_require__(0);
const hash_map_1 = __webpack_require__(16);
const id_generator_1 = __webpack_require__(19);
const iter_utils_1 = __webpack_require__(35);
const config_keys_1 = __webpack_require__(7);
const log_1 = __webpack_require__(1);
const string_utils_1 = __webpack_require__(3);
const array_utils_1 = __webpack_require__(8);
const nav_sequence_parser_1 = __webpack_require__(36);
const config_1 = __webpack_require__(25);
const builtin_nav_sequence_detector_rules_1 = __webpack_require__(94);
const browser_1 = __webpack_require__(6);
class PartialNavSequence {
    constructor(navSequenceId, id, partialLength, completeLength) {
        this.navSequenceId = navSequenceId;
        this.id = id;
        this.partialLength = partialLength;
        this.completeLength = completeLength;
    }
    get isPartial() {
        return this.partialLength < this.completeLength;
    }
    get isComplete() {
        return this.partialLength === this.completeLength;
    }
    hashWithSeed(seed) {
        let hash = seed;
        hash = murmur_hash_1.murmurHash(this.navSequenceId, hash);
        hash = murmur_hash_1.murmurHash(this.id, hash);
        hash = murmur_hash_1.murmurHash(this.partialLength, hash);
        hash = murmur_hash_1.murmurHash(this.completeLength, hash);
        return hash;
    }
    hash() {
        const seed = 0;
        return this.hashWithSeed(seed);
    }
    compare(other) {
        return (this.navSequenceId === other.navSequenceId) &&
            (this.id === other.id) &&
            (this.partialLength === other.partialLength) &&
            (this.completeLength === other.completeLength);
    }
    get asBackRef() {
        return this.id;
    }
    get asIndex() {
        return this.partialLength - 1;
    }
    get asNextIndex() {
        if (this.isComplete) {
            return undefined;
        }
        return this.partialLength;
    }
}
class NavData {
    constructor(type, url, origin, category, groups) {
        this.type = type;
        this.url = url;
        this.origin = origin;
        this.category = category;
        this.groups = groups;
        this.isNewTab = undefined;
        this.didUserCreateTab = undefined;
        this.contentType = undefined;
    }
    get isParentTab() {
        return this.type === nav_sequence_parser_1.NavType.parentTab;
    }
}
exports.NavData = NavData;
function isSameNavData(a, b) {
    return (a.type === b.type) &&
        url_utils_1.isSameUrl(a.url, b.url) &&
        origin_1.isSameOrigin(a.origin, b.origin) &&
        (a.category === b.category);
}
exports.isSameNavData = isSameNavData;
class TrackedNavSequence {
    constructor(metadata) {
        this.metadata = metadata;
        this.sequence = [];
        this.boundBackRefs = new Map();
    }
    push(navData, partialNavSequence) {
        this.sequence.push(navData);
        const backRef = partialNavSequence.asBackRef;
        this.boundBackRefs.set(backRef, navData);
    }
    get(index) {
        return this.sequence[index];
    }
    lookupBackRefBinding(backRef) {
        return this.boundBackRefs.get(backRef);
    }
    get precedence() {
        if (maybe_1.none(this.metadata)) {
            return undefined;
        }
        return this.metadata.precedence;
    }
    get length() {
        return this.sequence.length;
    }
    get navigateToURL() {
        if (maybe_1.none(this.metadata)) {
            if (array_utils_1.isEmpty(this.sequence)) {
                return undefined;
            }
            const navData = array_utils_1.last(this.sequence);
            return navData.url;
        }
        const navData = this.boundBackRefs.get(this.metadata.navigateTo);
        if (maybe_1.none(navData)) {
            return undefined;
        }
        return navData.url;
    }
    get navSequence() {
        return this.sequence;
    }
}
exports.TrackedNavSequence = TrackedNavSequence;
class EmptyNavSequenceDetection {
    get precedence() {
        return undefined;
    }
    get navSequence() {
        return [];
    }
    get navigateToURL() {
        return undefined;
    }
}
class EmptyNavSequenceDetections {
    get precedence() {
        return undefined;
    }
    get shouldBlock() {
        return false;
    }
    get shouldPossiblyBlock() {
        return false;
    }
    get shouldAllow() {
        return false;
    }
    get shouldPossiblyAllow() {
        return false;
    }
    get blocked() {
        return new EmptyNavSequenceDetection();
    }
    get possibleBlocked() {
        return new EmptyNavSequenceDetection();
    }
    get allowed() {
        return new EmptyNavSequenceDetection();
    }
    get possibleAllowed() {
        return new EmptyNavSequenceDetection();
    }
}
exports.EmptyNavSequenceDetections = EmptyNavSequenceDetections;
var BlockType;
(function (BlockType) {
    BlockType[BlockType["none"] = 0] = "none";
    BlockType[BlockType["block"] = 1] = "block";
    BlockType[BlockType["allow"] = 2] = "allow";
})(BlockType = exports.BlockType || (exports.BlockType = {}));
var DetectedType;
(function (DetectedType) {
    DetectedType[DetectedType["none"] = 0] = "none";
    DetectedType[DetectedType["detected"] = 1] = "detected";
    DetectedType[DetectedType["possiblyDetected"] = 2] = "possiblyDetected";
})(DetectedType = exports.DetectedType || (exports.DetectedType = {}));
class ResolvedDetectionAction {
    constructor(precedence, block, detected) {
        this.precedence = precedence;
        this.block = block;
        this.detected = detected;
    }
    get isBlocked() {
        return this.block === BlockType.block;
    }
    get isAllowed() {
        return this.block === BlockType.allow;
    }
    get isDetected() {
        return this.detected === DetectedType.detected;
    }
    get isPossiblyDetected() {
        return this.detected === DetectedType.possiblyDetected;
    }
    get shouldBlock() {
        return this.isBlocked && this.isDetected;
    }
    get shouldAllow() {
        return this.isAllowed && this.isDetected;
    }
    get shouldPossiblyBlock() {
        return this.isBlocked && this.isPossiblyDetected;
    }
    get shouldPossilbyAllow() {
        return this.isAllowed && this.isPossiblyDetected;
    }
}
exports.ResolvedDetectionAction = ResolvedDetectionAction;
class NavSequenceDetections {
    constructor(detected, possiblyDetected) {
        this.blockedDetected = [];
        this.blockedPossiblyDetected = [];
        this.allowedDetected = [];
        this.allowedPossiblyDetected = [];
        const isBlocked = (sequence) => {
            const metadata = sequence.metadata;
            if (maybe_1.none(metadata)) {
                return false;
            }
            return metadata.block;
        };
        const isAllowed = (sequence) => {
            const metadata = sequence.metadata;
            if (maybe_1.none(metadata)) {
                return false;
            }
            return metadata.allow;
        };
        this.blockedDetected = sortDetectedNavSequences(detected.filter(isBlocked));
        this.blockedPossiblyDetected = sortDetectedNavSequences(possiblyDetected.filter(isBlocked));
        this.allowedDetected = sortDetectedNavSequences(detected.filter(isAllowed));
        this.allowedPossiblyDetected = sortDetectedNavSequences(possiblyDetected.filter(isAllowed));
        this.action = this.resolveActions();
    }
    sortActions(actions) {
        if (array_utils_1.isEmpty(actions)) {
            return [];
        }
        return actions.sort((a, b) => {
            const [sequenceA, blockA, detectedA] = a;
            const [sequenceB, blockB, detectedB] = b;
            const comparison = compareTrackedNavSequences(sequenceA, sequenceB);
            if (comparison === 0) {
                const isBlockedA = blockA === BlockType.block;
                const isBlockedB = blockB === BlockType.block;
                const isAllowedA = blockA === BlockType.allow;
                const isAllowedB = blockB === BlockType.allow;
                const isDetectedA = detectedA === DetectedType.detected;
                const isDetectedB = detectedB === DetectedType.detected;
                const isPossiblyDetectedA = detectedA === DetectedType.possiblyDetected;
                const isPossiblyDetectedB = detectedB === DetectedType.possiblyDetected;
                if (isDetectedA && isPossiblyDetectedB) {
                    return -1;
                }
                else if (isDetectedB && isPossiblyDetectedA) {
                    return 1;
                }
                else if (isBlockedA && isAllowedB) {
                    return -1;
                }
                else if (isBlockedB && isAllowedA) {
                    return 1;
                }
                else {
                    return compareHigher(sequenceA.length, sequenceB.length);
                }
            }
            else {
                return comparison;
            }
        });
    }
    resolveActions() {
        const actions = [];
        const maybeAddAction = (sequences, block, detected) => {
            if (!array_utils_1.isEmpty(sequences)) {
                actions.push([array_utils_1.first(sequences), block, detected]);
            }
        };
        maybeAddAction(this.blockedDetected, BlockType.block, DetectedType.detected);
        maybeAddAction(this.allowedDetected, BlockType.allow, DetectedType.detected);
        maybeAddAction(this.blockedPossiblyDetected, BlockType.block, DetectedType.possiblyDetected);
        maybeAddAction(this.allowedPossiblyDetected, BlockType.allow, DetectedType.possiblyDetected);
        if (array_utils_1.isEmpty(actions)) {
            const precedence = undefined;
            return new ResolvedDetectionAction(precedence, BlockType.none, DetectedType.none);
        }
        const sortedActions = this.sortActions(actions);
        const [action, block, detected] = array_utils_1.first(sortedActions);
        return new ResolvedDetectionAction(action.precedence, block, detected);
    }
    get precedence() {
        return this.action.precedence;
    }
    get shouldBlock() {
        return this.action.shouldBlock;
    }
    get shouldPossiblyBlock() {
        return this.action.shouldPossiblyBlock;
    }
    get shouldAllow() {
        return this.action.shouldAllow;
    }
    get shouldPossiblyAllow() {
        return this.action.shouldPossilbyAllow;
    }
    findFirstDetection(sequences) {
        if (array_utils_1.isEmpty(sequences)) {
            return new EmptyNavSequenceDetection();
        }
        return array_utils_1.first(sequences);
    }
    get blocked() {
        return this.findFirstDetection(this.blockedDetected);
    }
    get possibleBlocked() {
        return this.findFirstDetection(this.blockedPossiblyDetected);
    }
    get allowed() {
        return this.findFirstDetection(this.allowedDetected);
    }
    get possibleAllowed() {
        return this.findFirstDetection(this.allowedPossiblyDetected);
    }
}
class CompleteNavSequence {
    constructor(metadata) {
        this.metadata = metadata;
        this.sequence = [];
        this.backRefs = [];
    }
    push(navPattern, partialNavSequence) {
        this.sequence.push([navPattern, partialNavSequence]);
        const backRef = navPattern.asBackReference;
        if (maybe_1.some(backRef)) {
            this.backRefs.push([backRef, partialNavSequence]);
        }
    }
    get length() {
        return this.sequence.length;
    }
    get(index) {
        if (index < 0 || index >= this.sequence.length) {
            return undefined;
        }
        return this.sequence[index];
    }
}
function* findInclusions(length) {
    const includes = array_utils_1.newArray(length, false);
    yield includes;
    let foundAllInclusions = false;
    while (!foundAllInclusions) {
        let carry = true;
        for (let index = 0; carry && (index < includes.length); index += 1) {
            const include = includes[index];
            if (include) {
                includes[index] = false;
                carry = true;
            }
            else {
                includes[index] = true;
                carry = false;
            }
        }
        if (carry) {
            foundAllInclusions = true;
        }
        else {
            yield includes;
        }
    }
}
function makeIndexMask(indices, length) {
    const isIndexMask = array_utils_1.newArray(length, false);
    const indexMask = array_utils_1.newArray(length, -1);
    for (let i = 0; i < indices.length; i += 1) {
        const index = indices[i];
        isIndexMask[index] = true;
        indexMask[index] = i;
    }
    return [isIndexMask, indexMask];
}
class NavSequenceDetector {
    constructor(navSequences) {
        this.completeNavSequenceMap = new Map();
        this.partialNavSequenceMap = new hash_map_1.HashMap(nav_sequence_parser_1.hashNavigation, nav_sequence_parser_1.isSameNavigation);
        this.idGenerator = new id_generator_1.IdGenerator();
        for (const [navSequence, navMetadata] of navSequences) {
            for (const navSequenceVariation of this.findRepeatPatternVariations(navSequence)) {
                const navSequenceId = this.idGenerator.generateId();
                this.buildPartialNavSequences(navSequenceVariation, navMetadata, navSequenceId);
            }
        }
    }
    *findRepeatPatternVariations(navSequence) {
        const repeatPatternIndices = array_utils_1.findAllIndices(navSequence, (navPattern) => {
            return navPattern.hasRepeatedModifier;
        });
        const [isRepeatPattern, includesIndex] = makeIndexMask(repeatPatternIndices, navSequence.length);
        const doInclude = (includes, index) => {
            if (isRepeatPattern[index]) {
                return includes[includesIndex[index]];
            }
            else {
                return true;
            }
        };
        for (const includes of findInclusions(repeatPatternIndices.length)) {
            const navSequenceVariation = new Array();
            for (let index = 0; index < navSequence.length; index += 1) {
                if (doInclude(includes, index)) {
                    navSequenceVariation.push(navSequence[index]);
                }
            }
            yield navSequenceVariation;
        }
    }
    emptyPartialNavSequenceSet() {
        return hash_map_1.makeDefaultHashSet();
    }
    addPartialNavSequence(navigation, partialNavSequence) {
        const partialNavSequenceSet = this.partialNavSequenceMap.get(navigation);
        if (maybe_1.some(partialNavSequenceSet)) {
            partialNavSequenceSet.add(partialNavSequence);
        }
        else {
            const newPartialNavSequenceSet = this.emptyPartialNavSequenceSet();
            newPartialNavSequenceSet.add(partialNavSequence);
            this.partialNavSequenceMap.put(navigation, newPartialNavSequenceSet);
        }
    }
    addCompleteNavSequence(navPattern, partialNavSequence, navMetadata) {
        const navSequenceId = partialNavSequence.navSequenceId;
        const completeNavSequence = this.completeNavSequenceMap.get(navSequenceId);
        if (maybe_1.some(completeNavSequence)) {
            completeNavSequence.push(navPattern, partialNavSequence);
        }
        else {
            const newCompleteNavSequence = new CompleteNavSequence(navMetadata);
            newCompleteNavSequence.push(navPattern, partialNavSequence);
            this.completeNavSequenceMap.set(navSequenceId, newCompleteNavSequence);
        }
    }
    buildPartialNavSequences(navSequence, navMetadata, navSequenceId) {
        const completeLength = navSequence.length;
        navSequence.forEach((navPattern, index) => {
            const id = navPattern.id;
            const partialLength = index + 1;
            const partialNavSequence = new PartialNavSequence(navSequenceId, id, partialLength, completeLength);
            this.addCompleteNavSequence(navPattern, partialNavSequence, navMetadata);
            for (const navigation of navPattern.buildNavigations()) {
                this.addPartialNavSequence(navigation, partialNavSequence);
            }
        });
    }
    findNextInCompleteNavSequence(partialNavSequence) {
        if (partialNavSequence.isComplete) {
            return undefined;
        }
        const navSequenceId = partialNavSequence.navSequenceId;
        const completeNavSequence = this.completeNavSequenceMap.get(navSequenceId);
        if (maybe_1.none(completeNavSequence)) {
            return undefined;
        }
        const nextIndex = partialNavSequence.asNextIndex;
        if (maybe_1.none(nextIndex)) {
            return undefined;
        }
        const nextInSequence = completeNavSequence.get(nextIndex);
        return nextInSequence;
    }
    findNextInNavSequenceWithRepeated(partialNavSequence, nextPartialNavSequenceSet) {
        if (partialNavSequence.isComplete) {
            return undefined;
        }
        const navSequenceId = partialNavSequence.navSequenceId;
        const completeNavSequence = this.completeNavSequenceMap.get(navSequenceId);
        if (maybe_1.none(completeNavSequence)) {
            return undefined;
        }
        const nextIndex = partialNavSequence.asNextIndex;
        if (maybe_1.some(nextIndex)) {
            const nextPossible = completeNavSequence.get(nextIndex);
            if (maybe_1.some(nextPossible)) {
                const [, nextPartialNavSequence] = nextPossible;
                if (nextPartialNavSequenceSet.has(nextPartialNavSequence)) {
                    return nextPartialNavSequence;
                }
            }
        }
        const currentIndex = partialNavSequence.asIndex;
        const repeatedNextPossible = completeNavSequence.get(currentIndex);
        if (maybe_1.some(repeatedNextPossible)) {
            const [, currentPartialNavSequence] = repeatedNextPossible;
            if (nextPartialNavSequenceSet.has(currentPartialNavSequence)) {
                return currentPartialNavSequence;
            }
        }
        return undefined;
    }
    *findNextInNavSequences(currentPartialNavSequenceResultMap, nextPartialNavSequenceSet, navData) {
        for (const [partialNavSequence, trackedNavSequence] of currentPartialNavSequenceResultMap) {
            const nextPartialNavSequence = this.findNextInNavSequenceWithRepeated(partialNavSequence, nextPartialNavSequenceSet);
            if (maybe_1.some(nextPartialNavSequence)) {
                trackedNavSequence.push(navData, nextPartialNavSequence);
                yield [nextPartialNavSequence, trackedNavSequence];
            }
        }
    }
    findNavMetadata(navSequenceId) {
        const completeNavSequence = this.completeNavSequenceMap.get(navSequenceId);
        if (maybe_1.none(completeNavSequence)) {
            return undefined;
        }
        return completeNavSequence.metadata;
    }
    *findFirstInNavSequences(partialNavSequenceSet, navData) {
        yield* iter_utils_1.map(iter_utils_1.filter(partialNavSequenceSet, (partialNavSequence) => {
            return (partialNavSequence.partialLength === 1);
        }), (partialNavSequence) => {
            const navSequenceId = partialNavSequence.navSequenceId;
            const metadata = this.findNavMetadata(navSequenceId);
            const trackedNavSequence = new TrackedNavSequence(metadata);
            trackedNavSequence.push(navData, partialNavSequence);
            return [partialNavSequence, trackedNavSequence];
        });
    }
    findPartialNavSequenceSet(navigation) {
        if (maybe_1.none(navigation)) {
            return this.emptyPartialNavSequenceSet();
        }
        const partialNavSequenceSet = this.partialNavSequenceMap.get(navigation);
        if (maybe_1.none(partialNavSequenceSet)) {
            return this.emptyPartialNavSequenceSet();
        }
        return partialNavSequenceSet;
    }
    findOriginPartialNavSequenceSet(navData) {
        if (maybe_1.some(navData.origin)) {
            const navigation = new nav_sequence_parser_1.OriginNav(navData.type, navData.origin);
            return this.findPartialNavSequenceSet(navigation);
        }
        return this.emptyPartialNavSequenceSet();
    }
    findCategorizedPartialNavSequenceSet(navData) {
        const navigation = new nav_sequence_parser_1.CategorizedNav(navData.type, navData.category);
        return this.findPartialNavSequenceSet(navigation);
    }
    findGroupPartialNavSequenceSet(navData) {
        if (maybe_1.none(navData.groups)) {
            return this.emptyPartialNavSequenceSet();
        }
        const groupPartialNavSequenceSet = this.emptyPartialNavSequenceSet();
        for (const group of navData.groups) {
            const navigation = new nav_sequence_parser_1.GroupNav(navData.type, group);
            groupPartialNavSequenceSet.addMany(this.findPartialNavSequenceSet(navigation));
        }
        return groupPartialNavSequenceSet;
    }
    *findBackRefPartialNavSequences(navData, currentPartialNavSequence, trackedNavSequence) {
        const navSequenceId = currentPartialNavSequence.navSequenceId;
        const completeNavSequence = this.completeNavSequenceMap.get(navSequenceId);
        if (maybe_1.none(completeNavSequence)) {
            return;
        }
        for (const [backRefNavPattern, nextPartialNavSequence] of completeNavSequence.backRefs) {
            const backRefNavData = trackedNavSequence.lookupBackRefBinding(backRefNavPattern.backRef);
            for (const navType of backRefNavPattern.navTypes()) {
                const hasSameNavType = (navData.type === navType);
                const hasSameOrigin = (maybe_1.some(backRefNavData) && origin_1.isSameOrigin(navData.origin, backRefNavData.origin));
                if (backRefNavPattern.hasNotModifer) {
                    if (hasSameNavType && maybe_1.some(backRefNavData) && !hasSameOrigin) {
                        yield nextPartialNavSequence;
                    }
                }
                else {
                    if (hasSameNavType && maybe_1.some(backRefNavData) && hasSameOrigin) {
                        yield nextPartialNavSequence;
                    }
                }
            }
        }
    }
    findBackRefPartialNavSequenceSet(navData, currentPartialNavSequenceResultMap) {
        const nextPartialNavSequenceSet = this.emptyPartialNavSequenceSet();
        for (const [currentPartialNavSequence, trackedNavSequence] of currentPartialNavSequenceResultMap) {
            nextPartialNavSequenceSet.addMany(this.findBackRefPartialNavSequences(navData, currentPartialNavSequence, trackedNavSequence));
        }
        return nextPartialNavSequenceSet;
    }
    detectNavSequence(navData, currentPartialNavSequenceResultMap) {
        if (navData.type === nav_sequence_parser_1.NavType.contentType) {
            return this.detectNavSequenceWithContentType(navData, currentPartialNavSequenceResultMap);
        }
        const nextPartialNavSequenceSet = this.emptyPartialNavSequenceSet();
        nextPartialNavSequenceSet.addMany(this.findOriginPartialNavSequenceSet(navData));
        nextPartialNavSequenceSet.addMany(this.findCategorizedPartialNavSequenceSet(navData));
        nextPartialNavSequenceSet.addMany(this.findGroupPartialNavSequenceSet(navData));
        nextPartialNavSequenceSet.addMany(this.findBackRefPartialNavSequenceSet(navData, currentPartialNavSequenceResultMap));
        const nextPartialNavSequenceResultMap = hash_map_1.makeDefaultHashMap();
        nextPartialNavSequenceResultMap.putMany(this.findFirstInNavSequences(nextPartialNavSequenceSet, navData));
        nextPartialNavSequenceResultMap.putMany(this.findNextInNavSequences(currentPartialNavSequenceResultMap, nextPartialNavSequenceSet, navData));
        return nextPartialNavSequenceResultMap;
    }
    findContentType(navigation) {
        if (maybe_1.none(navigation.asContentType)) {
            return undefined;
        }
        return navigation.asContentType.contentType;
    }
    findNextInNavSequenceWithContentType(currentPartialNavSequence, trackedNavSequence, navData) {
        const nextInSequence = this.findNextInCompleteNavSequence(currentPartialNavSequence);
        if (maybe_1.none(nextInSequence)) {
            return undefined;
        }
        const [nextNavigation, nextPartialNavSequence] = nextInSequence;
        const nextContentType = this.findContentType(nextNavigation);
        if (maybe_1.none(nextContentType)) {
            return [currentPartialNavSequence, trackedNavSequence];
        }
        const contentType = navData.contentType;
        if (maybe_1.none(contentType)) {
            return undefined;
        }
        if (contentType === nextContentType) {
            trackedNavSequence.push(navData, nextPartialNavSequence);
            return [nextPartialNavSequence, trackedNavSequence];
        }
        return undefined;
    }
    *findNextInNavSequencesWithContentType(navData, currentPartialNavSequenceResultMap) {
        for (const [currentPartialNavSequence, trackedNavSequence] of currentPartialNavSequenceResultMap) {
            const nextInSequence = this.findNextInNavSequenceWithContentType(currentPartialNavSequence, trackedNavSequence, navData);
            if (maybe_1.some(nextInSequence)) {
                yield nextInSequence;
            }
        }
    }
    detectNavSequenceWithContentType(navData, currentPartialNavSequenceResultMap) {
        const nextPartialNavSequenceResultMap = hash_map_1.makeDefaultHashMap();
        nextPartialNavSequenceResultMap.putMany(this.findNextInNavSequencesWithContentType(navData, currentPartialNavSequenceResultMap));
        return nextPartialNavSequenceResultMap;
    }
}
class TabNavSequence {
    constructor(tabId) {
        this.tabId = tabId;
        this.navSequence = new Array();
        this.navListeners = new Array();
    }
    onParentTab(url, origin, category, groups) {
        const navigation = new NavData(nav_sequence_parser_1.NavType.parentTab, url, origin, category, groups);
        this.onNavigation(navigation);
    }
    onNavigate(url, origin, category, groups, isNewTab, didUserCreateTab) {
        const navigation = new NavData(nav_sequence_parser_1.NavType.navigation, url, origin, category, groups);
        navigation.isNewTab = isNewTab;
        navigation.didUserCreateTab = didUserCreateTab;
        this.onNavigation(navigation);
    }
    onRedirect(url, origin, category, groups) {
        const navigation = new NavData(nav_sequence_parser_1.NavType.redirect, url, origin, category, groups);
        this.onNavigation(navigation);
    }
    onContentType(url, origin, category, groups, contentType) {
        const navigation = new NavData(nav_sequence_parser_1.NavType.contentType, url, origin, category, groups);
        navigation.contentType = contentType;
        this.onNavigation(navigation);
    }
    onNavigation(navigation) {
        this.navSequence.push(navigation);
        this.notifyListeners(navigation);
    }
    notifyListeners(navigation) {
        for (const onNavigation of this.navListeners) {
            onNavigation(navigation);
        }
    }
    addListener(onNavigation) {
        for (const navigation of this.navSequence) {
            onNavigation(navigation);
        }
        this.navListeners.push(onNavigation);
    }
    get isNewTab() {
        return array_utils_1.isEmpty(this.navSequence);
    }
    reset() {
        this.navSequence = [];
    }
}
class TabNavSequenceDetector {
    constructor(tabId, tabNavSequence, navSequenceDetector) {
        this.tabId = tabId;
        this.navSequenceDetector = navSequenceDetector;
        this.partialNavSequenceResultMap = hash_map_1.makeDefaultHashMap();
        this.navigationCount = 0;
        tabNavSequence.addListener((navigation) => this.onNavigation(navigation));
    }
    onNavigation(navigation) {
        const isParentTab = (navigation.type === nav_sequence_parser_1.NavType.parentTab);
        const isFirstNavigation = (this.navigationCount === 0);
        if (isParentTab && !isFirstNavigation) {
            return;
        }
        this.navigationCount += 1;
        this.partialNavSequenceResultMap = this.detectNavSequence(navigation);
    }
    detectNavSequence(navigation) {
        return this.navSequenceDetector.detectNavSequence(navigation, this.partialNavSequenceResultMap);
    }
    findDetectedNavSequences(doIncludeNavSequence) {
        const detectedNavSequences = [];
        for (const [partialNavSequence, trackedNavSequence] of this.partialNavSequenceResultMap) {
            if (doIncludeNavSequence(partialNavSequence)) {
                detectedNavSequences.push(trackedNavSequence);
            }
        }
        return detectedNavSequences;
    }
    get detectedNavSequences() {
        return this.findDetectedNavSequences((partialNavSequence) => {
            return partialNavSequence.isComplete;
        });
    }
    get possiblyDetectedNavSequences() {
        return this.findDetectedNavSequences((partialNavSequence) => {
            return partialNavSequence.isPartial;
        });
    }
    reset() {
        this.partialNavSequenceResultMap = hash_map_1.makeDefaultHashMap();
        this.navigationCount = 0;
    }
}
class PhishingNavSequenceDetector {
    constructor(browser, configNotifier, tabClosedDispatcher) {
        this.browser = browser;
        this.tabNavSequences = new Map();
        this.tabNavSequenceDetectors = new Map();
        this.builtinRulesPrecedence = undefined;
        this.updateNavSequenceDetector(builtin_nav_sequence_detector_rules_1.builtinRules);
        configNotifier.addConfigListenerForKey(this.onConfigChanged.bind(this), config_keys_1.ConfigKey.phishingNavigationSequences);
        tabClosedDispatcher.registerOnTabClosedHandler(this.onTabClosed.bind(this));
    }
    chooseRules(serializedPhishingNavSeqData) {
        if (!nav_sequence_parser_1.isValidSerializedPhishingNavSeqData(serializedPhishingNavSeqData)) {
            log_1.logError(new Error(`Invalid SerializedPhishingNavSeqData: ${string_utils_1.toString(serializedPhishingNavSeqData)}`));
            return builtin_nav_sequence_detector_rules_1.builtinRules;
        }
        if (!nav_sequence_parser_1.checkVersion(serializedPhishingNavSeqData, config_1.Config.phishingNavigationSequencesVersion())) {
            log_1.logError(new Error(`Failed to check version: ${string_utils_1.toString(serializedPhishingNavSeqData)}`));
            return builtin_nav_sequence_detector_rules_1.builtinRules;
        }
        return serializedPhishingNavSeqData;
    }
    updateNavSequenceDetector(serializedPhishingNavSeqData) {
        const rules = this.chooseRules(serializedPhishingNavSeqData);
        this.builtinRulesPrecedence = rules.builtinRulesPrecedence;
        const parsedPhishingNavSequences = rules.seqs.map(nav_sequence_parser_1.parseNavSeqData);
        if (parsedPhishingNavSequences.some(maybe_1.none)) {
            log_1.logError(new Error(`Failed to parse phishingNavigationSequences: ${string_utils_1.toString(rules)}`));
            return;
        }
        const phishingNavigationSequences = parsedPhishingNavSequences.filter(maybe_1.some);
        const navSequenceDetector = new NavSequenceDetector(phishingNavigationSequences);
        this.tabNavSequenceDetectors = this.makeTabNavSequenceDetectors(navSequenceDetector);
        this.navSequenceDetector = navSequenceDetector;
    }
    makeTabNavSequenceDetectors(navSequenceDetector) {
        const tabNavSequenceDetectors = new Map();
        this.tabNavSequences.forEach((tabNavSequence, tabId) => {
            const tabNavSequenceDetector = new TabNavSequenceDetector(tabId, tabNavSequence, navSequenceDetector);
            tabNavSequenceDetectors.set(tabId, tabNavSequenceDetector);
        });
        return tabNavSequenceDetectors;
    }
    onConfigChanged(key, config) {
        switch (key) {
            case config_keys_1.ConfigKey.phishingNavigationSequences: {
                if (maybe_1.some(config.phishingNavigationSequences)) {
                    this.updateNavSequenceDetector(config.phishingNavigationSequences);
                }
                break;
            }
        }
    }
    onTabClosed(tabId) {
        this.tabNavSequenceDetectors.delete(tabId);
        this.tabNavSequences.delete(tabId);
    }
    onNewTab(tabId) {
        const tabNavSequence = new TabNavSequence(tabId);
        this.tabNavSequences.set(tabId, tabNavSequence);
        if (maybe_1.some(this.navSequenceDetector)) {
            const tabNavSequenceDetector = new TabNavSequenceDetector(tabId, tabNavSequence, this.navSequenceDetector);
            this.tabNavSequenceDetectors.set(tabId, tabNavSequenceDetector);
        }
    }
    hasHigherPrecedenceThanBuiltin(navSequenceDetections) {
        if (maybe_1.none(this.builtinRulesPrecedence) ||
            maybe_1.none(navSequenceDetections.precedence)) {
            return false;
        }
        return navSequenceDetections.precedence > this.builtinRulesPrecedence;
    }
    resetDetector(tabId) {
        const tabNavSequence = this.tabNavSequences.get(tabId);
        if (maybe_1.some(tabNavSequence)) {
            tabNavSequence.reset();
        }
        const tabNavSequenceDetector = this.tabNavSequenceDetectors.get(tabId);
        if (maybe_1.some(tabNavSequenceDetector)) {
            tabNavSequenceDetector.reset();
        }
    }
    onTabDetected(tabId) {
        if (this.tabNavSequences.has(tabId)) {
            return;
        }
        this.onNewTab(tabId);
    }
    onParentTabDetected(tabId, url, category, groups) {
        const tabNavSequence = this.tabNavSequences.get(tabId);
        if (maybe_1.none(tabNavSequence)) {
            return false;
        }
        if (!tabNavSequence.isNewTab) {
            return false;
        }
        const origin = origin_1.parseOrigin(url);
        if (maybe_1.none(origin)) {
            return false;
        }
        tabNavSequence.onParentTab(url, origin, category, groups);
        return true;
    }
    parseOriginForBrowser(url) {
        switch (this.browser) {
            case browser_1.Browser.chrome:
                return origin_1.parseOrigin(url, new origin_1.OriginParseOptions({
                    allowChromeScheme: true,
                    allowChromeExtensionScheme: true,
                }));
            case browser_1.Browser.firefox:
                return origin_1.parseOrigin(url, new origin_1.OriginParseOptions({
                    allowAboutScheme: true,
                    allowFirefoxExtensionScheme: true,
                }));
            case browser_1.Browser.edge:
                return origin_1.parseOrigin(url, new origin_1.OriginParseOptions({
                    allowAboutScheme: true,
                    allowEdgeExtensionScheme: true
                }));
            case browser_1.Browser.edgeChromium:
                return origin_1.parseOrigin(url, new origin_1.OriginParseOptions({
                    allowEdgeScheme: true,
                    allowChromeScheme: true,
                    allowChromeExtensionScheme: true,
                }));
            default:
                log_1.logError(new Error("Current browser unknown in NavSequenceDetector.parseOriginForBrowser"));
                return origin_1.parseOrigin(url, new origin_1.OriginParseOptions());
        }
    }
    onEvent(tabId, url, handleEvent) {
        const tabNavSequence = this.tabNavSequences.get(tabId);
        if (maybe_1.none(tabNavSequence)) {
            return new EmptyNavSequenceDetections();
        }
        const origin = this.parseOriginForBrowser(url);
        handleEvent(tabNavSequence, url, origin);
        const tabNavSequenceDetector = this.tabNavSequenceDetectors.get(tabId);
        if (maybe_1.none(tabNavSequenceDetector)) {
            return new EmptyNavSequenceDetections();
        }
        return new NavSequenceDetections(tabNavSequenceDetector.detectedNavSequences, tabNavSequenceDetector.possiblyDetectedNavSequences);
    }
    onNavigate(tabId, url, category, groups, isNewTab, didUserCreateTab) {
        return this.onEvent(tabId, url, (tabNavSequence, url, origin) => {
            tabNavSequence.onNavigate(url, origin, category, groups, isNewTab, didUserCreateTab);
        });
    }
    onRedirect(tabId, url, category, groups) {
        return this.onEvent(tabId, url, (tabNavSequence, url, origin) => {
            tabNavSequence.onRedirect(url, origin, category, groups);
        });
    }
    onContentType(tabId, url, category, groups, contentType) {
        return this.onEvent(tabId, url, (tabNavSequence, url, origin) => {
            tabNavSequence.onContentType(url, origin, category, groups, contentType);
        });
    }
}
exports.PhishingNavSequenceDetector = PhishingNavSequenceDetector;
function compareHigher(a, b) {
    if (a > b) {
        return -1;
    }
    else if (a < b) {
        return 1;
    }
    else {
        return 0;
    }
}
function compareTrackedNavSequences(a, b) {
    const aPrecedence = a.precedence;
    const bPrecedence = b.precedence;
    if (maybe_1.none(aPrecedence) || maybe_1.none(bPrecedence)) {
        return 0;
    }
    return compareHigher(aPrecedence, bPrecedence);
}
function sortDetectedNavSequences(detectedNavSequences) {
    if (array_utils_1.isEmpty(detectedNavSequences)) {
        return [];
    }
    return detectedNavSequences.sort(compareTrackedNavSequences);
}


/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const http_method_1 = __webpack_require__(51);
const origin_1 = __webpack_require__(9);
const hash_map_1 = __webpack_require__(16);
const maybe_1 = __webpack_require__(0);
const nav_sequence_parser_1 = __webpack_require__(36);
const murmur_hash_1 = __webpack_require__(11);
const string_utils_1 = __webpack_require__(3);
var TabType;
(function (TabType) {
    TabType[TabType["newTab"] = 0] = "newTab";
    TabType[TabType["sameTab"] = 1] = "sameTab";
})(TabType = exports.TabType || (exports.TabType = {}));
class PhishingSourceSitesKey {
    constructor(tabType, navType, methodType) {
        this.tabType = tabType;
        this.navType = navType;
        this.methodType = methodType;
    }
    hashWithSeed(seed) {
        let hash = seed;
        hash = murmur_hash_1.murmurHash(this.tabType, hash);
        hash = murmur_hash_1.murmurHash(this.navType, hash);
        hash = murmur_hash_1.murmurHash(this.methodType, hash);
        return hash;
    }
    hash() {
        const seed = 0;
        return this.hashWithSeed(seed);
    }
    compare(other) {
        return (this.tabType === other.tabType) &&
            (this.navType === other.navType) &&
            (this.methodType === other.methodType);
    }
}
class EmptyPhishingSourceSites {
    isPhishingSourceSite(origin) {
        return false;
    }
    isWebMailSite(origin) {
        return false;
    }
    siteRequiresAuth(origin) {
        return false;
    }
    isAuthSite(origin) {
        return false;
    }
    findGroups(origin) {
        return [];
    }
    shouldBlockNavigation(tabType, navType, methodType, origin) {
        return false;
    }
    get shouldEnablePageInputEventHeuristics() {
        return true;
    }
    get shouldEnableNavigationRequestTypeHeuristics() {
        return true;
    }
}
exports.EmptyPhishingSourceSites = EmptyPhishingSourceSites;
class PhishingSourceSites {
    constructor(serializedSites) {
        this.serializedSites = serializedSites;
        this.keyedSites = hash_map_1.makeDefaultHashMap();
        this.groups = new origin_1.OriginGrouper();
        this.phishingSourceSites = this.parseOriginMatcher(serializedSites.phishingSourceSites);
        this.webMailSites = this.parseOriginMatcher(serializedSites.webMail);
        this.requireAuthSites = this.parseOriginMatcher(serializedSites.advanced.requireAuth);
        this.authSites = this.parseOriginMatcher(serializedSites.advanced.auth);
        this.parseGroups(serializedSites.groups);
        this.deserializeKeyedSites(serializedSites);
    }
    get originParseOptions() {
        return new origin_1.OriginParseOptions({
            allowWildcards: true,
            allowMissingWildcardScheme: true
        });
    }
    parseOriginMatcher(specList) {
        return origin_1.parseOriginMatcher(specList, this.originParseOptions);
    }
    parseGroups(serializedGroups) {
        for (const group of Object.keys(serializedGroups)) {
            const specList = serializedGroups[group];
            this.groups.addFromSpecList(specList, group, this.originParseOptions);
        }
    }
    makeKey(tabType, navType, methodType) {
        const key = new PhishingSourceSitesKey(tabType, navType, methodType);
        return key;
    }
    shouldBlockNavigation(tabType, navType, methodType, origin) {
        const key = this.makeKey(tabType, navType, methodType);
        const matcher = this.keyedSites.get(key);
        if (maybe_1.none(matcher)) {
            return false;
        }
        return matcher.has(origin);
    }
    isPhishingSourceSite(origin) {
        return this.phishingSourceSites.has(origin);
    }
    isWebMailSite(origin) {
        return this.webMailSites.has(origin);
    }
    siteRequiresAuth(origin) {
        return this.requireAuthSites.has(origin);
    }
    isAuthSite(origin) {
        return this.authSites.has(origin);
    }
    findGroups(origin) {
        return this.groups.match(origin);
    }
    get shouldEnablePageInputEventHeuristics() {
        return this.serializedSites.advanced.heuristics.pageInputEvents;
    }
    get shouldEnableNavigationRequestTypeHeuristics() {
        return this.serializedSites.advanced.heuristics.navigationRequestType;
    }
    addKeyedSites(tabType, navType, methodType, specList) {
        const deduplicate = (values) => {
            const set = string_utils_1.makeStringHashSet();
            set.addMany(values);
            return set.toArray();
        };
        const dedeuplicatedSpecList = deduplicate(specList);
        const matcher = this.parseOriginMatcher(dedeuplicatedSpecList);
        const key = this.makeKey(tabType, navType, methodType);
        this.keyedSites.put(key, matcher);
    }
    deserializeKeyedSites(serializedSites) {
        const withWebMail = (sites) => {
            return sites.concat(serializedSites.webMail);
        };
        const withPhishingSourceSites = (sites) => {
            return sites.concat(serializedSites.phishingSourceSites);
        };
        const withDisableHeuristics = (() => {
            if (this.shouldEnableNavigationRequestTypeHeuristics) {
                return (sites) => {
                    return sites;
                };
            }
            else {
                return (sites) => {
                    return withPhishingSourceSites(withWebMail(sites));
                };
            }
        })();
        this.addKeyedSites(TabType.newTab, nav_sequence_parser_1.NavType.navigation, http_method_1.HttpMethodType.get, withPhishingSourceSites(withWebMail(serializedSites.advanced.newTab.navigate.get)));
        this.addKeyedSites(TabType.newTab, nav_sequence_parser_1.NavType.navigation, http_method_1.HttpMethodType.post, withDisableHeuristics(serializedSites.advanced.newTab.navigate.post));
        this.addKeyedSites(TabType.newTab, nav_sequence_parser_1.NavType.redirect, http_method_1.HttpMethodType.get, withDisableHeuristics(serializedSites.advanced.newTab.redirect.get));
        this.addKeyedSites(TabType.newTab, nav_sequence_parser_1.NavType.redirect, http_method_1.HttpMethodType.post, withDisableHeuristics(serializedSites.advanced.newTab.redirect.post));
        this.addKeyedSites(TabType.sameTab, nav_sequence_parser_1.NavType.navigation, http_method_1.HttpMethodType.get, withDisableHeuristics(withPhishingSourceSites(serializedSites.advanced.sameTab.navigate.get)));
        this.addKeyedSites(TabType.sameTab, nav_sequence_parser_1.NavType.navigation, http_method_1.HttpMethodType.post, withDisableHeuristics(serializedSites.advanced.sameTab.navigate.post));
        this.addKeyedSites(TabType.sameTab, nav_sequence_parser_1.NavType.redirect, http_method_1.HttpMethodType.get, withDisableHeuristics(withPhishingSourceSites(serializedSites.advanced.sameTab.redirect.get)));
        this.addKeyedSites(TabType.sameTab, nav_sequence_parser_1.NavType.redirect, http_method_1.HttpMethodType.post, withDisableHeuristics(serializedSites.advanced.sameTab.redirect.post));
    }
}
exports.PhishingSourceSites = PhishingSourceSites;


/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var HttpMethodType;
(function (HttpMethodType) {
    HttpMethodType[HttpMethodType["get"] = 0] = "get";
    HttpMethodType[HttpMethodType["post"] = 1] = "post";
})(HttpMethodType = exports.HttpMethodType || (exports.HttpMethodType = {}));
;
var HttpMethodKeys;
(function (HttpMethodKeys) {
    HttpMethodKeys["get"] = "get";
    HttpMethodKeys["post"] = "post";
})(HttpMethodKeys || (HttpMethodKeys = {}));
function parseHttpMethod(method) {
    switch (method.toLowerCase()) {
        case HttpMethodKeys.get:
            return HttpMethodType.get;
        case HttpMethodKeys.post:
            return HttpMethodType.post;
        default:
            return undefined;
    }
}
exports.parseHttpMethod = parseHttpMethod;
function httpMethodTypeToString(methodType) {
    switch (methodType) {
        case HttpMethodType.get:
            return HttpMethodKeys.get.toUpperCase();
        case HttpMethodType.post:
            return HttpMethodKeys.post.toUpperCase();
        default:
            return `Invalid HttpMethodType: ${methodType}`;
    }
}
exports.httpMethodTypeToString = httpMethodTypeToString;


/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const maybe_1 = __webpack_require__(0);
const url_utils_1 = __webpack_require__(4);
const number_utils_1 = __webpack_require__(10);
function findDocumentUrl(window) {
    return url_utils_1.parseUrl(window.location.toString());
}
exports.findDocumentUrl = findDocumentUrl;
function getQueryParamFromSearch(search, queryParam) {
    const paramsString = search.substring(1);
    const params = paramsString.split("&");
    for (const pairString of params) {
        const pair = pairString.split("=");
        if (decodeURIComponent(pair[0]) === queryParam) {
            return decodeURIComponent(pair[1]);
        }
    }
    return null;
}
function findDocumentQueryParam(documentUrl, queryParam) {
    if (maybe_1.none(documentUrl)) {
        return "";
    }
    let value = null;
    if (documentUrl.searchParams === undefined) {
        try {
            const searchParams = new URLSearchParams(documentUrl.search);
            value = searchParams.get(queryParam);
        }
        catch (e) {
            value = getQueryParamFromSearch(documentUrl.search, queryParam);
        }
    }
    else {
        value = documentUrl.searchParams.get(queryParam);
    }
    if (value === null) {
        return undefined;
    }
    return value;
}
exports.findDocumentQueryParam = findDocumentQueryParam;
function findURLDocumentQueryParam(documentUrl, queryParam) {
    const queryParamValue = findDocumentQueryParam(documentUrl, queryParam);
    if (maybe_1.none(queryParamValue)) {
        return undefined;
    }
    return url_utils_1.parseUrl(queryParamValue);
}
exports.findURLDocumentQueryParam = findURLDocumentQueryParam;
function findNumberDocumentQueryParam(documentUrl, queryParamName) {
    const queryParamValue = findDocumentQueryParam(documentUrl, queryParamName);
    if (maybe_1.none(queryParamValue)) {
        return undefined;
    }
    return number_utils_1.parseNumber(queryParamValue);
}
exports.findNumberDocumentQueryParam = findNumberDocumentQueryParam;


/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var OptionNames;
(function (OptionNames) {
    OptionNames["navigateToSpec"] = "navigateSpec";
    OptionNames["blockedSpec"] = "blockedSpec";
    OptionNames["contentType"] = "contentType";
    OptionNames["rememberDecisionsDefault"] = "rememberDecisionsDefault";
    OptionNames["isConsumerProduct"] = "isConsumerProduct";
    OptionNames["learnMoreURL"] = "learnMoreURL";
    OptionNames["launchedSpec"] = "launchedSpec";
})(OptionNames = exports.OptionNames || (exports.OptionNames = {}));


/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const message_decoder_1 = __webpack_require__(55);
const event_dispatcher_1 = __webpack_require__(20);
function handleInvalidMessage(port, invalidMessage) {
    console.log(`handleInvalidMessage: invalidMessage: ${invalidMessage}`);
}
function onUnhandledMessage(port, message) {
    console.log(`onUnhandledMessage: message: ${message}`);
}
class MessageRouter {
    constructor(handleInvalidMessage, onUnhandledMessage) {
        this.handleInvalidMessage = handleInvalidMessage;
        this.onUnhandledMessage = onUnhandledMessage;
        this.messageHandlers = new Map();
    }
    registerMessageHandler(type, handleMessage) {
        this.registerPortMessageHandler(type, (port, message) => {
            handleMessage(message);
        });
    }
    registerPortMessageHandler(type, handleMessage) {
        const messageHandlers = this.messageHandlers.get(type);
        if (messageHandlers === undefined) {
            this.messageHandlers.set(type, [handleMessage]);
        }
        else {
            messageHandlers.push(handleMessage);
        }
    }
}
class GenericMessageRouter extends MessageRouter {
    constructor() {
        super(handleInvalidMessage, onUnhandledMessage);
        this.onMessageDecoded = new event_dispatcher_1.EventDispatcher();
    }
    onMessageReceived(port, encodedMessage) {
        let message = message_decoder_1.decodeMessage(encodedMessage);
        if (message === undefined) {
            this.handleInvalidMessage(port, encodedMessage);
            return;
        }
        this.onMessageDecoded.dispatchEvent(new message_decoder_1.MessageDecodedEvent(message));
        const messageHandlers = this.messageHandlers.get(message.type);
        if (messageHandlers === undefined) {
            this.onUnhandledMessage(port, message);
            return;
        }
        for (const handleMessage of messageHandlers) {
            handleMessage(port, message);
        }
    }
}
exports.GenericMessageRouter = GenericMessageRouter;


/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const message_types_1 = __webpack_require__(2);
const number_utils_1 = __webpack_require__(10);
function decodeMessage(encodedMessage) {
    let message = encodedMessage;
    if (message.type === undefined) {
        message = JSON.parse(encodedMessage.toString());
        if (message.type === undefined) {
            return undefined;
        }
    }
    if (!number_utils_1.isNumber(message.type)) {
        return undefined;
    }
    if (!message_types_1.isMessageType(message.type)) {
        return undefined;
    }
    return message;
}
exports.decodeMessage = decodeMessage;
class MessageDecodedEvent {
    constructor(message) {
        this.message = message;
    }
}
exports.MessageDecodedEvent = MessageDecodedEvent;


/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const host_constants_1 = __webpack_require__(12);
const port_resolver_1 = __webpack_require__(57);
const page_port_controller_1 = __webpack_require__(24);
const message_types_1 = __webpack_require__(2);
const messages_1 = __webpack_require__(5);
const i18n_1 = __webpack_require__(31);
const log_1 = __webpack_require__(1);
const promise_utils_1 = __webpack_require__(13);
const maybe_1 = __webpack_require__(0);
const config_keys_1 = __webpack_require__(7);
const protocol_versions_1 = __webpack_require__(14);
const branding_1 = __webpack_require__(99);
exports.sureClickAdvancedHelpHostname = "https://help-sureclickadvanced.bromium-online.com";
exports.sureClickHelpHostname = "https://help-sureclick.bromium-online.com";
exports.bromiumHelpHostname = "https://help.bromium-online.com";
class PopupPageController {
    constructor(port, currentPopupMessage, openPhishingLinksInSecureBrowser, isEnterpriseProduct, dontAskAgain, helpLinkURL, onDisconnect, hostHelperMessageSender, featureManager) {
        this.currentPopupMessage = currentPopupMessage;
        this.openPhishingLinksInSecureBrowser = openPhishingLinksInSecureBrowser;
        this.isEnterpriseProduct = isEnterpriseProduct;
        this.dontAskAgain = dontAskAgain;
        this.helpLinkURL = helpLinkURL;
        this.onDisconnect = onDisconnect;
        this.hostHelperMessageSender = hostHelperMessageSender;
        this.featureManager = featureManager;
        this.pagePortController = new page_port_controller_1.PagePortController(chrome.tabs.TAB_ID_NONE, port, (port) => { }, (port) => { this.onDisconnect(); });
        this.pagePortController.registerMessageHandler(message_types_1.MessageType.popupDataRequestV1, (message) => this.handlePopupDataRequest(message));
        this.pagePortController.connect();
        if (i18n_1.popupType === i18n_1.PopupType.clearRememberedDecisions) {
            this.pagePortController.registerMessageHandler(message_types_1.MessageType.clearRememberedDecisionsV1, (message) => this.clearAllRememberedDecisions(message));
        }
    }
    clearAllRememberedDecisions(message) {
        this.hostHelperMessageSender.sendMessage(message_types_1.MessageType.clearRememberedDecisionsV1, new messages_1.ClearRememberedDecisionsV1());
    }
    updatePopupData(i18nMessage, openPhishingLinksInSecureBrowser, isEnterpriseProduct, dontAskAgain, helpLinkURL) {
        this.currentPopupMessage = i18nMessage;
        this.openPhishingLinksInSecureBrowser = openPhishingLinksInSecureBrowser;
        this.isEnterpriseProduct = isEnterpriseProduct;
        this.dontAskAgain = dontAskAgain;
        this.helpLinkURL = helpLinkURL;
        this.sendPopupDataResponse();
    }
    sendPopupDataResponse() {
        let message = this.currentPopupMessage;
        if (this.dontAskAgain && message === i18n_1.I18nMessages.popupNoError) {
            message = i18n_1.I18nMessages.popupDontAskAgain;
        }
        this.pagePortController.sendMessage(message_types_1.MessageType.popupDataResponseV11, new messages_1.PopupDataResponseV11(message, this.showClearRememberedDecisionsInfo, this.isEnterpriseProduct, this.helpLinkURL));
    }
    handlePopupDataRequest(message) {
        this.sendPopupDataResponse();
    }
    get showClearRememberedDecisionsInfo() {
        if (this.dontAskAgain || this.openPhishingLinksInSecureBrowser) {
            return false;
        }
        return this.featureManager.isLinkProtectionEnabled || this.featureManager.isPDFProtectionEnabled;
    }
}
class PopupController {
    constructor(hostHelperMessageSender, configNotifier, errorHandler, featureManager, handshaker) {
        this.hostHelperMessageSender = hostHelperMessageSender;
        this.featureManager = featureManager;
        this.openPhishingLinksInSecureBrowser = false;
        this.isEnterpriseProduct = false;
        this.dontAskAgain = false;
        this.isSureClick = branding_1.isSureClick();
        configNotifier.addConfigListenerForKeys(this.onConfigChanged.bind(this), [config_keys_1.ConfigKey.openPhishingLinksInSecureBrowser, config_keys_1.ConfigKey.isEnterpriseProduct, config_keys_1.ConfigKey.dontAskAgain]);
        this.portResolver = new port_resolver_1.PortResolver(host_constants_1.hostConstants.popupPortName, port => this.onUnresolvedPortConnected(port));
        const port = this.portResolver.resolvePort();
        this.currentPopupMessage = errorHandler.isDormant ? i18n_1.I18nMessages.popupGenericError : i18n_1.I18nMessages.popupNoError;
        errorHandler.onPopupDataChanged.registerEventHandler(this.onPopupDataChanged.bind(this));
        if (handshaker.isHandshaken && maybe_1.some(handshaker.negotiatedVersion)) {
            this.onHandshaken(handshaker.negotiatedVersion);
        }
        else {
            handshaker.onHandshaken.registerEventHandler(event => this.onHandshaken(event.negotiatedVersion));
        }
        this.makeNewPageController(port);
    }
    onHandshaken(negotiatedVersion) {
        this.negotiatedVersion = negotiatedVersion;
        this.updatePopupData();
    }
    onConfigChanged(key, config) {
        switch (key) {
            case config_keys_1.ConfigKey.openPhishingLinksInSecureBrowser:
                this.openPhishingLinksInSecureBrowser = config.openPhishingLinksInSecureBrowser;
                this.updatePopupData();
                break;
            case config_keys_1.ConfigKey.isEnterpriseProduct:
                this.isEnterpriseProduct = config.isEnterpriseProduct;
                this.updatePopupData();
                break;
            case config_keys_1.ConfigKey.dontAskAgain:
                this.dontAskAgain = config.dontAskAgain;
                this.updatePopupData();
                break;
        }
    }
    onPopupDataChanged(newPopupMessage) {
        log_1.log(`Setting popup message to internationalised string ${newPopupMessage}`);
        if (this.currentPopupMessage !== newPopupMessage) {
            this.currentPopupMessage = newPopupMessage;
            this.updatePopupData();
        }
    }
    updatePopupData() {
        if (maybe_1.some(this.popupPageController)) {
            this.popupPageController.updatePopupData(this.currentPopupMessage, this.openPhishingLinksInSecureBrowser, this.isEnterpriseProduct, this.dontAskAgain, this.helpLinkURL);
        }
    }
    makeNewPageController(port) {
        this.popupPageController = new PopupPageController(port, this.currentPopupMessage, this.openPhishingLinksInSecureBrowser, this.isEnterpriseProduct, this.dontAskAgain, this.helpLinkURL, () => { this.onPortDisconnected(); }, this.hostHelperMessageSender, this.featureManager);
    }
    onPortDisconnected() {
        this.popupPageController = undefined;
        const port = this.portResolver.resolvePort();
        this.makeNewPageController(port);
    }
    onUnresolvedPortConnected(port) {
        log_1.log("PopupController.onUnexpectedPortConnected");
        if (maybe_1.none(this.popupPageController)) {
            this.makeNewPageController(promise_utils_1.makePromise(() => port));
        }
    }
    get helpLinkURL() {
        const hostname = (() => {
            if (this.isSureClick) {
                if (this.isEnterpriseProduct) {
                    return exports.sureClickAdvancedHelpHostname;
                }
                else {
                    return exports.sureClickHelpHostname;
                }
            }
            else {
                return exports.bromiumHelpHostname;
            }
        })();
        const version = protocol_versions_1.getHelpPageVersion(this.negotiatedVersion);
        const localisedHelpFile = i18n_1.getI18n(i18n_1.I18nMessages.helpLinkFile);
        return `${hostname}/secure-browsing/${version}/${localisedHelpFile}`;
    }
}
exports.PopupController = PopupController;


/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const maybe_1 = __webpack_require__(0);
const promise_utils_1 = __webpack_require__(13);
const string_utils_1 = __webpack_require__(3);
class PortResolver {
    constructor(portName, onUnresolvedPortConnected) {
        this.portName = portName;
        this.onUnresolvedPortConnected = onUnresolvedPortConnected;
        this.resolver = undefined;
        chrome.runtime.onConnect.addListener(this.onPortConnected.bind(this));
    }
    onPortConnected(port) {
        if (!string_utils_1.compareStrings(port.name, this.portName)) {
            return;
        }
        if (maybe_1.none(this.resolver)) {
            this.onUnresolvedPortConnected(port);
            return;
        }
        this.resolver(port);
    }
    resolvePort() {
        return promise_utils_1.makePromiseAsync((resolve) => {
            this.resolver = resolve;
        });
    }
}
exports.PortResolver = PortResolver;


/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const message_sender_1 = __webpack_require__(59);
const messages_1 = __webpack_require__(5);
const message_types_1 = __webpack_require__(2);
const message_encoder_1 = __webpack_require__(60);
const message_decoder_1 = __webpack_require__(55);
const maybe_1 = __webpack_require__(0);
const event_dispatcher_1 = __webpack_require__(20);
const handshaker_1 = __webpack_require__(97);
const string_utils_1 = __webpack_require__(3);
const errors_1 = __webpack_require__(21);
const port_utils_1 = __webpack_require__(29);
const protocol_versions_1 = __webpack_require__(14);
const connection_1 = __webpack_require__(38);
const log_1 = __webpack_require__(1);
var Negotiation;
(function (Negotiation) {
    Negotiation[Negotiation["None"] = 0] = "None";
    Negotiation[Negotiation["NegotiateProtocolVersion"] = 1] = "NegotiateProtocolVersion";
})(Negotiation = exports.Negotiation || (exports.Negotiation = {}));
class MessagePortChannel {
    constructor(connectToPort, onConnect, onDisconnect, onPortError, onNegotiationError, messageRouter, negotiation) {
        this.connectToPort = connectToPort;
        this.onConnect = onConnect;
        this.onDisconnect = onDisconnect;
        this.onPortError = onPortError;
        this.onNegotiationError = onNegotiationError;
        this.messageRouter = messageRouter;
        this.negotiation = negotiation;
        this.onHandshaken = new event_dispatcher_1.EventDispatcher();
        this.onConnectionStateChanged = new event_dispatcher_1.EventDispatcher();
        this.messages = new Array();
        this._connState = connection_1.ConnectionState.Disconnected;
        this._negotiatedVersion = undefined;
        this.messageSender = new message_sender_1.MessageSender((message) => this.sendMessage(message));
    }
    disconnectPort(port) {
        port.disconnect();
        this.handleDisconnect(port);
    }
    connect() {
        console.log("MessagePortChannel.connect");
        if (this.connState !== connection_1.ConnectionState.Disconnected) {
            throw new Error(`MessagePortChannel.connect called with connState == ${this.connState}`);
        }
        this.connState = connection_1.ConnectionState.Connecting;
        this.connectToPort.then((port) => {
            if (this.connState === connection_1.ConnectionState.Disconnecting) {
                this.disconnectPort(port);
                return;
            }
            this.port = port;
            this.port.onMessage.addListener((encodeMessage, port) => this.onMessage(encodeMessage, port));
            this.port.onDisconnect.addListener((port) => this.handleDisconnect(port));
            if (this.negotiation === Negotiation.NegotiateProtocolVersion) {
                this.connState = connection_1.ConnectionState.Handshaking;
                const handshake = new messages_1.HandshakeV1(protocol_versions_1.supportedProtocolVersions);
                const message = message_encoder_1.encodeMessage(message_types_1.MessageType.handshakeV1, handshake);
                this.postMessage(message);
            }
            else {
                this.sendQueuedMessages();
                this.connState = connection_1.ConnectionState.Connected;
                this.onConnect(this.port);
            }
        });
    }
    disconnect() {
        console.log(`MessagePortChannel.connect: connState == ${this.connState}`);
        switch (this.connState) {
            case connection_1.ConnectionState.Disconnected:
                break;
            case connection_1.ConnectionState.Disconnecting:
                break;
            case connection_1.ConnectionState.Connecting:
                this.connState = connection_1.ConnectionState.Disconnecting;
                break;
            case connection_1.ConnectionState.Handshaking:
                if (maybe_1.some(this.port)) {
                    this.disconnectPort(this.port);
                }
                break;
            case connection_1.ConnectionState.Connected:
                if (maybe_1.some(this.port)) {
                    this.disconnectPort(this.port);
                }
                break;
        }
    }
    postMessage(message) {
        try {
            if (maybe_1.none(this.port)) {
                throw new Error("MessagePortChannel.postMessage: this.port === undefined");
            }
            if (!message_types_1.isFrequentlySentMessageType(message.type)) {
                this.log(`MessagePortChannel.postMessage: message: ${messages_1.messageToString(message)}`);
            }
            this.port.postMessage(message);
        }
        catch (e) {
            if (errors_1.isError(e)) {
                this.onPortError(e);
            }
            else {
                const error = new Error(`Unknown error caught in postMessage: ${string_utils_1.toString(e)}`);
                this.onPortError(error);
            }
        }
    }
    sendQueuedMessages() {
        for (const message of this.messages) {
            this.postMessage(message);
        }
        this.messages = [];
    }
    queueMessage(message) {
        this.messages.push(message);
    }
    sendMessage(message) {
        if (this.connState === connection_1.ConnectionState.Connected) {
            this.postMessage(message);
        }
        else {
            this.queueMessage(message);
        }
        return true;
    }
    onMessage(encodedMessage, port) {
        if (this.connState === connection_1.ConnectionState.Handshaking) {
            this.log(`MessagePortChannel.onMessage: message: ${string_utils_1.toString(encodedMessage)} port: ${port_utils_1.portToString(port)}`);
            let message = message_decoder_1.decodeMessage(encodedMessage);
            if (maybe_1.none(message)) {
                this.logError(new Error('MessagePortChannel.onMessage: invalid message'));
            }
            else if (message_types_1.isEdgeAckWorkaround(message.type)) {
            }
            else if (message.type !== message_types_1.MessageType.handshakeV1) {
                this.onNegotiationError(new Error(`Message before handshaken: ${message.type}`));
            }
            else if (maybe_1.none(this.port)) {
                this.onPortError(new Error("MessagePortChannel.onMessage: this.port === undefined"));
            }
            else {
                const handshake = message.payload;
                for (const supportedVersion of protocol_versions_1.supportedProtocolVersions) {
                    if (handshake.versions.indexOf(supportedVersion) >= 0) {
                        this._negotiatedVersion = supportedVersion;
                        this.log(`Negotiated protocol version: ${this._negotiatedVersion}`);
                        this.sendQueuedMessages();
                        this.connState = connection_1.ConnectionState.Connected;
                        this.onHandshaken.dispatchEvent(new handshaker_1.HandshakenEvent(this._negotiatedVersion));
                        this.onConnect(this.port);
                        return;
                    }
                }
                this.onNegotiationError(new Error(`No supported version received in handshake: ${handshake.versions}`));
            }
        }
        else if (this.connState == connection_1.ConnectionState.Connected) {
            this.messageRouter.onMessageReceived(port, encodedMessage);
        }
    }
    handleDisconnect(port) {
        if (this.connState === connection_1.ConnectionState.Disconnected) {
            return;
        }
        this.connState = connection_1.ConnectionState.Disconnected;
        this.port = undefined;
        console.log(`MessagePortChannel.handleDisconnect: port: ${port_utils_1.portToString(port)}`);
        this.onDisconnect(port);
    }
    shouldLogMessage() {
        if (this.negotiation === Negotiation.None) {
            return true;
        }
        return maybe_1.some(this.negotiatedVersion) && protocol_versions_1.shouldLogMessage(this.negotiatedVersion);
    }
    log(message) {
        if (this.shouldLogMessage()) {
            log_1.log(message);
        }
        else {
            console.log(message);
        }
    }
    logError(error) {
        if (this.shouldLogMessage()) {
            log_1.logError(error);
        }
        else {
            console.error(error);
        }
    }
    get connState() {
        return this._connState;
    }
    set connState(newState) {
        const oldState = this._connState;
        this._connState = newState;
        this.onConnectionStateChanged.dispatchEvent(new connection_1.ConnectionStateChangedEvent(oldState, newState));
    }
    get isHandshaken() {
        return this.connState === connection_1.ConnectionState.Connected;
    }
    get negotiatedVersion() {
        return this._negotiatedVersion;
    }
    get connectionState() {
        return this.connState;
    }
}
exports.MessagePortChannel = MessagePortChannel;
class GenericMessagePortChannel extends MessagePortChannel {
    constructor(connectToPort, onConnect, onDisconnect, messageRouter, negotiation) {
        super(connectToPort, onConnect, onDisconnect, (e) => { console.error(e); }, (e) => { console.error(e); }, messageRouter, negotiation);
    }
}
exports.GenericMessagePortChannel = GenericMessagePortChannel;


/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const message_encoder_1 = __webpack_require__(60);
class MessageSender {
    constructor(doSendMessage) {
        this.doSendMessage = doSendMessage;
    }
    sendMessage(type, payload) {
        const message = message_encoder_1.encodeMessage(type, payload);
        return this.doSendMessage(message);
    }
}
exports.MessageSender = MessageSender;


/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function encodeMessage(type, payload) {
    return { type: type, payload: payload };
}
exports.encodeMessage = encodeMessage;


/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const event_dispatcher_1 = __webpack_require__(20);
const once_1 = __webpack_require__(30);
const log_1 = __webpack_require__(1);
class OnConfiguredManager {
    constructor() {
        this.onConfigured = once_1.doOnce(() => {
            this.configured = true;
            log_1.log("OnConfiguredManager: SBX is fully configured");
            this.onConfiguredDispatcher.setCondition();
        });
        this.onConfiguredDispatcher = new event_dispatcher_1.ConditionDispatcher();
        this.configured = false;
    }
    registerListener(listener) {
        this.onConfiguredDispatcher.registerConditionListener(listener);
    }
    get isConfigured() {
        return this.configured;
    }
}
exports.OnConfiguredManager = OnConfiguredManager;
class DummyOnConfigured {
    constructor() {
        this.isConfigured = true;
    }
    registerListener(listener) {
        listener();
    }
}
exports.DummyOnConfigured = DummyOnConfigured;


/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const url_utils_1 = __webpack_require__(4);
const array_utils_1 = __webpack_require__(8);
class UrlEncoder {
    constructor(url) {
        this.url = url;
        this.queryParams = new Array();
    }
    addUrlQueryParam(name, value) {
        this.addQueryParam(name, url_utils_1.URLToString(value));
    }
    addQueryParam(name, value) {
        this.queryParams.push([name, encodeURIComponent(value)]);
    }
    encodeQueryParam(name, value) {
        return `${name}=${value}`;
    }
    encodeQueryParams() {
        return this.queryParams.map(([name, value]) => this.encodeQueryParam(name, value)).join("&");
    }
    encodeUrl() {
        if (array_utils_1.isEmpty(this.queryParams)) {
            return this.url;
        }
        const spec = `${url_utils_1.URLToString(this.url)}?${this.encodeQueryParams()}`;
        return url_utils_1.parseUrl(spec);
    }
}
exports.UrlEncoder = UrlEncoder;


/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const errors_1 = __webpack_require__(21);
const once_1 = __webpack_require__(30);
const messages_1 = __webpack_require__(5);
const message_types_1 = __webpack_require__(2);
const config_keys_1 = __webpack_require__(7);
const i18n_1 = __webpack_require__(31);
const browser_action_1 = __webpack_require__(106);
const maybe_1 = __webpack_require__(0);
const number_utils_1 = __webpack_require__(10);
const browser_1 = __webpack_require__(6);
const host_constants_1 = __webpack_require__(12);
const protocol_versions_1 = __webpack_require__(14);
const connection_1 = __webpack_require__(38);
const event_dispatcher_1 = __webpack_require__(20);
exports.maxFailedReloadAttempts = 3;
exports.maxFailedReconnectAttempts = 30;
const log = console.log;
const logError = console.error;
class ExtensionReloader {
    constructor() {
        this.reload = once_1.doOnce(() => {
            this.readFailedReloadAttempts((failedReloadAttempts) => {
                this.reloadExtension(failedReloadAttempts);
            });
        });
        this.loadedSuccessfully = once_1.doOnce(() => {
            this.writeFailedReloadAttempts({ failedReloadAttempts: 0, isReload: false }, () => {
                log(`ExtensionReloader.loadedSuccessfully: reset failedReloadAttempts`);
            });
        });
        chrome.runtime.onStartup.addListener(() => this.onStartup());
        this.readFailedReloadAttempts(failedReloadAttemps => {
            log(`ExtensionReloader.constructor: failedReloadAttempts == ${failedReloadAttemps}`);
        });
    }
    onStartup() {
        log("ExtensionReloader.onStartup");
        this.loadedSuccessfully();
    }
    readFailedReloadAttempts(callback) {
        const key = ExtensionReloader.failedReloadAttemptsKey;
        chrome.storage.local.get(key, (items) => {
            const error = chrome.runtime.lastError;
            if (error) {
                logError(new Error(`ExtensionReloader.readFailedReloadAttempts: error: ${error.message}`));
                return;
            }
            const failedReloadAttempts = items[key];
            if (number_utils_1.isNumber(failedReloadAttempts)) {
                callback(failedReloadAttempts);
            }
            else {
                callback(0);
            }
        });
    }
    writeFailedReloadAttempts(args, callback) {
        const key = ExtensionReloader.failedReloadAttemptsKey;
        chrome.storage.local.set({
            [key]: args.failedReloadAttempts
        }, () => {
            const error = chrome.runtime.lastError;
            if (error) {
                logError(new Error(`ExtensionReloader.writeFailedReloadAttempts: error: ${error.message}`));
                return;
            }
            callback();
        });
    }
    reloadExtension(failedReloadAttempts) {
        if (failedReloadAttempts < exports.maxFailedReloadAttempts) {
            const extensionTabs = chrome.extension.getViews({ type: "tab" });
            if (extensionTabs.length > 0) {
                setTimeout(() => this.reloadExtension(failedReloadAttempts), host_constants_1.hostConstants.postponementTimeout);
                return;
            }
            this.writeFailedReloadAttempts({ failedReloadAttempts: failedReloadAttempts + 1, isReload: true }, () => {
                log(`ExtensionReloader.reloadExtension: reloading extension attempt: ${failedReloadAttempts}`);
                chrome.runtime.reload();
            });
        }
    }
}
ExtensionReloader.failedReloadAttemptsKey = "failedReloadAttempts";
class ErrorHandler {
    constructor(browser, messageRouter, configNotifier, onConfiguredRaiser) {
        this.browser = browser;
        this.onConfiguredRaiser = onConfiguredRaiser;
        this.onDormantStateChanged = new event_dispatcher_1.EventDispatcher();
        this.onPopupDataChanged = new event_dispatcher_1.EventDispatcher();
        this.lastError = errors_1.ChragError.recoveredFromError;
        this._isDormant = false;
        this.extensionReloader = new ExtensionReloader();
        this.messageSender = undefined;
        this.reconnectToHelper = undefined;
        this.protocolVersion = undefined;
        this.isSBXEnabled = true;
        this.productStatus = messages_1.ProductStatuses.Enabled;
        this.isEnterpriseProduct = false;
        messageRouter.registerMessageHandler(message_types_1.MessageType.helperErrorV1, this.onHelperError.bind(this));
        this.iconUpdater = new browser_action_1.IconUpdater(this.browser, browser_action_1.IconType.normal);
        browser_action_1.setNormalBadge();
        configNotifier.addConfigListenerForKeys(this.onConfigChanged.bind(this), [config_keys_1.ConfigKey.isEnabled, config_keys_1.ConfigKey.productStatus, config_keys_1.ConfigKey.isEnterpriseProduct]);
    }
    onBrowserLaunchEvent(event) {
        if (event.didLaunch) {
            this.extensionReloader.loadedSuccessfully();
        }
    }
    get isDormant() {
        return this._isDormant;
    }
    sendDormantState() {
        try {
            this.sendMessage(message_types_1.MessageType.dormantStateChangedV1, new messages_1.DormantStateChangedV1(this.isDormant));
        }
        catch (e) {
            logError(e);
        }
    }
    enterDormantState(popupMessage, errorCode) {
        if (!this.isDormant) {
            logError(new Error("Chrag has encountered a fatal error and is entering a dormant state."));
            this._isDormant = true;
            this.onDormantStateChanged.dispatchEvent(this.isDormant);
            this.onPopupDataChanged.dispatchEvent(popupMessage);
            this.iconUpdater.setIcon(browser_action_1.IconType.error);
            if (i18n_1.isPopupError(popupMessage)) {
                browser_action_1.setErrorBadge();
            }
            if (errorCode !== errors_1.ChragError.notEnabled) {
                this.sendDormantState();
            }
        }
    }
    wakeFromDormantState(popupMessage, lastErrorCode) {
        if (this.isDormant) {
            logError(new Error("Chrag has recovered and is reactivating (waking from a dormant state)."));
            this._isDormant = false;
            this.onDormantStateChanged.dispatchEvent(this.isDormant);
            this.onPopupDataChanged.dispatchEvent(popupMessage);
            this.iconUpdater.setIcon(browser_action_1.IconType.normal);
            browser_action_1.setNormalBadge();
            if (lastErrorCode !== errors_1.ChragError.notEnabled) {
                this.sendDormantState();
            }
        }
    }
    reloadExtension() {
        log("ErrorHandler.reloadExtension");
        if (this.browser === browser_1.Browser.edge) {
            if (maybe_1.none(this.reconnectToHelper)) {
                throw new Error("ErrorHandler.reloadExtension: this.reconnectToHelper === undefined");
            }
            this.reconnectToHelper();
        }
        else {
            this.extensionReloader.reload();
        }
    }
    handleHelperError(popupMessage, errorCode) {
        log(`ErrorHandler.handleHelperError: errorCode == ${errorCode}`);
        try {
            this.enterDormantState(popupMessage, errorCode);
        }
        catch (e) {
            logError(e);
        }
        try {
            this.reloadExtension();
        }
        finally {
            this.onConfiguredRaiser.onConfigured();
        }
    }
    raiseError(errorCode, e) {
        if (e) {
            logError(e);
        }
        errorCode = this.toProtocolError(errorCode);
        logError(new Error(`ChragError raised: ${errors_1.ChragError[errorCode]}`));
        if (errorCode === this.lastError) {
            return;
        }
        try {
            switch (errorCode) {
                case errors_1.ChragError.notEnabled:
                    this.enterDormantState(this.disabledPopupMessage, errorCode);
                    break;
                case errors_1.ChragError.helperPortError:
                    this.handleHelperError(i18n_1.I18nMessages.popupMissingHelper, errorCode);
                    break;
                case errors_1.ChragError.trustDownloadFailed:
                    break;
                case errors_1.ChragError.launchBrowserFailed:
                    this.enterDormantState(i18n_1.I18nMessages.popupGenericError, errorCode);
                    break;
                case errors_1.ChragError.handshakeError:
                    this.enterDormantState(i18n_1.I18nMessages.popupGenericError, errorCode);
                    break;
                case errors_1.ChragError.unknownError:
                    this.enterDormantState(i18n_1.I18nMessages.popupGenericError, errorCode);
                    break;
                case errors_1.ChragError.recoveredFromError:
                    this.wakeFromDormantState(i18n_1.I18nMessages.popupNoError, this.lastError);
                    break;
                case errors_1.ChragError.is32bitFirefox:
                    this.enterDormantState(i18n_1.I18nMessages.popupIs32bitFirefox, errorCode);
                    break;
                case errors_1.ChragError.helperUnresponsive:
                    this.handleHelperError(i18n_1.I18nMessages.popupMissingHelper, errorCode);
                    break;
            }
        }
        finally {
            this.lastError = errorCode;
        }
    }
    onHelperError(message) {
        const helperError = message.payload;
        this.raiseError(helperError.errorType, new Error(helperError.errorMessage));
    }
    get disabledPopupMessage() {
        if (!this.isSBXEnabled) {
            return i18n_1.I18nMessages.popupSBXDisabled;
        }
        switch (this.productStatus) {
            case messages_1.ProductStatuses.Disabled:
                return i18n_1.I18nMessages.popupProductDisabled;
            case messages_1.ProductStatuses.InitRequired:
                return i18n_1.I18nMessages.popupInitRequired;
            case messages_1.ProductStatuses.Unlicensed:
                if (this.isEnterpriseProduct) {
                    return i18n_1.I18nMessages.popupUnlicensed;
                }
                else {
                    return i18n_1.I18nMessages.popupUnconfigured;
                }
            case messages_1.ProductStatuses.Unknown:
                return i18n_1.I18nMessages.popupGenericError;
        }
        return i18n_1.I18nMessages.popupNoError;
    }
    get isDisabled() {
        return !this.isSBXEnabled || this.productStatus !== messages_1.ProductStatuses.Enabled;
    }
    setIsSBXEnabled(config) {
        if (maybe_1.none(config.isEnabled)) {
            this.raiseError(errors_1.ChragError.unknownError, new Error("isEnabled config is undefined"));
            return;
        }
        switch (this.browser) {
            case browser_1.Browser.chrome:
                this.isSBXEnabled = config.isEnabled.chrome;
                return;
            case browser_1.Browser.firefox:
                this.isSBXEnabled = config.isEnabled.firefox;
                return;
            case browser_1.Browser.edge:
                this.isSBXEnabled = config.isEnabled.edge;
                return;
            case browser_1.Browser.edgeChromium:
                this.isSBXEnabled = config.isEnabled.edgeChromium;
                return;
        }
        this.raiseError(errors_1.ChragError.unknownError, new Error("Current browser unknown in ErrorHandler.onConfigChanged"));
    }
    onConfigChanged(key, config) {
        switch (key) {
            case config_keys_1.ConfigKey.isEnabled:
                this.setIsSBXEnabled(config);
                break;
            case config_keys_1.ConfigKey.productStatus:
                this.productStatus = config.productStatus;
                break;
            case config_keys_1.ConfigKey.isEnterpriseProduct:
                this.isEnterpriseProduct = config.isEnterpriseProduct;
                break;
            default:
                return;
        }
        if (this.isDisabled) {
            this.raiseError(errors_1.ChragError.notEnabled);
        }
        else if (this.isDormant && this.lastError === errors_1.ChragError.notEnabled) {
            this.raiseError(errors_1.ChragError.recoveredFromError);
        }
    }
    sendMessage(type, payload) {
        if (maybe_1.none(this.messageSender)) {
            throw new Error("ErrorHandler.sendMessage: this.messageSender === undefined");
        }
        this.messageSender.sendMessage(type, payload);
    }
    setup(messageSender, handshaker, connection, reconnectToHelper) {
        this.messageSender = messageSender;
        this.reconnectToHelper = reconnectToHelper;
        handshaker.onHandshaken.registerEventHandler((event) => {
            this.protocolVersion = event.negotiatedVersion;
        });
        connection.onConnectionStateChanged.registerEventHandler((event) => {
            if (event.newState === connection_1.ConnectionState.Connected) {
                if (this.isDormant) {
                    switch (this.lastError) {
                        case errors_1.ChragError.helperPortError:
                            this.raiseError(errors_1.ChragError.recoveredFromError);
                            break;
                        case errors_1.ChragError.helperUnresponsive:
                            this.raiseError(errors_1.ChragError.recoveredFromError);
                            break;
                        default:
                            break;
                    }
                }
            }
        });
    }
    toProtocolError(error) {
        const protocolVersion = maybe_1.some(this.protocolVersion) ? this.protocolVersion : protocol_versions_1.ProtocolVersion.v1;
        if (protocol_versions_1.isErrorSupported(error, protocolVersion)) {
            return error;
        }
        else {
            return errors_1.ChragError.unknownError;
        }
    }
}
exports.ErrorHandler = ErrorHandler;


/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const maybe_1 = __webpack_require__(0);
class RequestResponseHandler {
    constructor(requestType, responseType, makeRequest, readResponse, messageRouter, messageSender, idGenerator) {
        this.requestType = requestType;
        this.responseType = responseType;
        this.makeRequest = makeRequest;
        this.readResponse = readResponse;
        this.messageSender = messageSender;
        this.idGenerator = idGenerator;
        this.requests = new Map();
        messageRouter.registerMessageHandler(responseType, (message) => this.handleResponse(message));
    }
    sendRequest(data, onResponse) {
        const id = this.idGenerator.generateId();
        this.requests.set(id, [data, onResponse]);
        const request = this.makeRequest(id, data);
        this.messageSender.sendMessage(this.requestType, request);
    }
    handleResponse(message) {
        const [id, result] = this.readResponse(message);
        const request = this.requests.get(id);
        if (maybe_1.none(request)) {
            return;
        }
        this.requests.delete(id);
        const [data, onResponse] = request;
        onResponse(data, result);
    }
}
exports.RequestResponseHandler = RequestResponseHandler;


/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __webpack_require__(25);
const event_page_listener_1 = __webpack_require__(88);
const config = config_1.loadConfig();
const eventPageListener = new event_page_listener_1.EventPageListener(config);


/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*jslint node: true*/

module.exports = __webpack_require__(67);


/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
# qlobber&nbsp;&nbsp;&nbsp;[![Build Status](https://travis-ci.org/davedoesdev/qlobber.png)](https://travis-ci.org/davedoesdev/qlobber) [![Coverage Status](https://coveralls.io/repos/davedoesdev/qlobber/badge.png?branch=master)](https://coveralls.io/r/davedoesdev/qlobber?branch=master) [![NPM version](https://badge.fury.io/js/qlobber.png)](http://badge.fury.io/js/qlobber)

Node.js globbing for amqp-like topics.

Example:

```javascript
var Qlobber = require('qlobber').Qlobber;
var matcher = new Qlobber();
matcher.add('foo.*', 'it matched!');
assert.deepEqual(matcher.match('foo.bar'), ['it matched!']);
assert(matcher.test('foo.bar', 'it matched!'));
```

The API is described [here](#tableofcontents).

qlobber is implemented using a trie, as described in the RabbitMQ blog posts [here](http://www.rabbitmq.com/blog/2010/09/14/very-fast-and-scalable-topic-routing-part-1/) and [here](http://www.rabbitmq.com/blog/2011/03/28/very-fast-and-scalable-topic-routing-part-2/).

## Installation

```shell
npm install qlobber
```

## Another Example

A more advanced example using topics from the [RabbitMQ topic tutorial](http://www.rabbitmq.com/tutorials/tutorial-five-python.html):

```javascript
var matcher = new Qlobber();
matcher.add('*.orange.*', 'Q1');
matcher.add('*.*.rabbit', 'Q2');
matcher.add('lazy.#', 'Q2');
assert.deepEqual(['quick.orange.rabbit',
                  'lazy.orange.elephant',
                  'quick.orange.fox',
                  'lazy.brown.fox',
                  'lazy.pink.rabbit',
                  'quick.brown.fox',
                  'orange',
                  'quick.orange.male.rabbit',
                  'lazy.orange.male.rabbit'].map(function (topic)
                  {
                      return matcher.match(topic).sort();
                  }),
                 [['Q1', 'Q2'],
                  ['Q1', 'Q2'],
                  ['Q1'],
                  ['Q2'],
                  ['Q2', 'Q2'],
                  [],
                  [],
                  [],
                  ['Q2']]);
```

## Licence

[MIT](LICENCE)

## Tests

qlobber passes the [RabbitMQ topic tests](https://github.com/rabbitmq/rabbitmq-server/blob/master/src/rabbit_tests.erl) (I converted them from Erlang to Javascript).

To run the tests:

```shell
grunt test
```

## Lint

```shell
grunt lint
```

## Code Coverage

```shell
grunt coverage
```

[Instanbul](http://gotwarlost.github.io/istanbul/) results are available [here](http://rawgit.davedoesdev.com/davedoesdev/qlobber/master/coverage/lcov-report/index.html).

Coveralls page is [here](https://coveralls.io/r/davedoesdev/qlobber).

## Benchmarks

```shell
grunt bench
```

qlobber is also benchmarked in [ascoltatori](https://github.com/mcollina/ascoltatori).

# API
*/

/*jslint node: true, nomen: true */


var util = __webpack_require__(68);

/**
Creates a new qlobber.

@constructor
@param {Object} [options] Configures the qlobber. Use the following properties:
- `{String} separator` The character to use for separating words in topics. Defaults to '.'. MQTT uses '/' as the separator, for example.

- `{String} wildcard_one` The character to use for matching exactly one word in a topic. Defaults to '*'. MQTT uses '+', for example.

- `{String} wildcard_some` The character to use for matching zero or more words in a topic. Defaults to '#'. MQTT uses '#' too.

- `{Boolean} cache_adds` Whether to cache topics when adding topic matchers. This will make adding multiple matchers for the same topic faster at the cost of extra memory usage. Defaults to `false`.
*/
function Qlobber (options)
{
    options = options || {};

    this._separator = options.separator || '.';
    this._wildcard_one = options.wildcard_one || '*';
    this._wildcard_some = options.wildcard_some || '#';
    this._trie = new Map();
    if (options.cache_adds)
    {
        this._shortcuts = new Map();
    }
}

Qlobber.prototype._initial_value = function (val)
{
    return [val];
};

Qlobber.prototype._add_value = function (vals, val)
{
    vals[vals.length] = val;
};

Qlobber.prototype._add_values = function (dest, origin)
{
    var i, destLength = dest.length, originLength = origin.length;

    for (i = 0; i < originLength; i += 1)
    {
        dest[destLength + i] = origin[i];
    }
};

Qlobber.prototype._remove_value = function (vals, val)
{
    if (val === undefined)
    {
        return true;
    }

    var index = vals.lastIndexOf(val);

    if (index >= 0)
    {
        vals.splice(index, 1);
    }

    return vals.length === 0;
};

Qlobber.prototype._add = function (val, i, words, sub_trie)
{
    var st, word;

    if (i === words.length)
    {
        st = sub_trie.get(this._separator);
        
        if (st)
        {
            this._add_value(st, val);
        }
        else
        {
            st = this._initial_value(val);
            sub_trie.set(this._separator, st);
        }
        
        return st;
    }

    word = words[i];
    st = sub_trie.get(word);
    
    if (!st)
    {
        st = new Map();
        sub_trie.set(word, st);
    }
    
    return this._add(val, i + 1, words, st);
};

Qlobber.prototype._remove = function (val, i, words, sub_trie)
{
    var st, word, r;

    if (i === words.length)
    {
        st = sub_trie.get(this._separator);

        if (st && this._remove_value(st, val))
        {
            sub_trie.delete(this._separator);
            return true;
        }

        return false;
    }
    
    word = words[i];
    st = sub_trie.get(word);

    if (!st)
    {
        return false;
    }

    r = this._remove(val, i + 1, words, st);

    if (st.size === 0)
    {
        sub_trie.delete(word);
    }

    return r;
};

Qlobber.prototype._match_some = function (v, i, words, st, ctx)
{
    var j, w;

    for (w of st.keys())
    {
        if (w !== this._separator)
        {
            for (j = i; j < words.length; j += 1)
            {
                v = this._match(v, j, words, st, ctx);
            }
            break;
        }
    }

    return v;
};

Qlobber.prototype._match = function (v, i, words, sub_trie, ctx)
{
    var word, st;

    st = sub_trie.get(this._wildcard_some);

    if (st)
    {
        // in the common case there will be no more levels...
        v = this._match_some(v, i, words, st, ctx);
        // and we'll end up matching the rest of the words:
        v = this._match(v, words.length, words, st, ctx);
    }

    if (i === words.length)
    {
        st = sub_trie.get(this._separator);

        if (st)
        {
            if (v.dest)
            {
                this._add_values(v.dest, v.source, ctx);
                this._add_values(v.dest, st, ctx);
                v = v.dest;
            }
            else if (v.source)
            {
                v.dest = v.source;
                v.source = st;
            }
            else
            {
                this._add_values(v, st, ctx);
            }
        }
    }
    else
    {
        word = words[i];

        if ((word !== this._wildcard_one) && (word !== this._wildcard_some))
        {
            st = sub_trie.get(word);

            if (st)
            {
                v = this._match(v, i + 1, words, st, ctx);
            }
        }

        if (word)
        {
            st = sub_trie.get(this._wildcard_one);

            if (st)
            {
                v = this._match(v, i + 1, words, st, ctx);
            }
        }
    }

    return v;
};

Qlobber.prototype._match2 = function (v, topic, ctx)
{
    var vals = this._match(
    {
        source: v
    }, 0, topic.split(this._separator), this._trie, ctx);

    return vals.source || vals;
};

Qlobber.prototype._test_some = function (v, i, words, st)
{
    var j, w;

    for (w of st.keys())
    {
        if (w !== this._separator)
        {
            for (j = i; j < words.length; j += 1)
            {
                if (this._test(v, j, words, st))
                {
                    return true;
                }
            }
            break;
        }
    }

    return false;
};

Qlobber.prototype._test = function (v, i, words, sub_trie)
{
    var word, st;

    st = sub_trie.get(this._wildcard_some);

    if (st)
    {
            // in the common case there will be no more levels...
        if (this._test_some(v, i, words, st) ||
            // and we'll end up matching the rest of the words:
            this._test(v, words.length, words, st))
        {
            return true;
        }
    }

    if (i === words.length)
    {
        st = sub_trie.get(this._separator);

        if (st && this.test_values(st, v))
        {
            return true;
        }
    }
    else
    {
        word = words[i];

        if ((word !== this._wildcard_one) && (word !== this._wildcard_some))
        {
            st = sub_trie.get(word);

            if (st && this._test(v, i + 1, words, st))
            {
                return true;
            }
        }

        if (word)
        {
            st = sub_trie.get(this._wildcard_one);

            if (st && this._test(v, i + 1, words, st))
            {
                return true;
            }
        }
    }

    return false;
};

/**
Add a topic matcher to the qlobber.

Note you can match more than one value against a topic by calling `add` multiple times with the same topic and different values.

@param {String} topic The topic to match against.
@param {Any} val The value to return if the topic is matched.
@return {Qlobber} The qlobber (for chaining).
*/
Qlobber.prototype.add = function (topic, val)
{
    var shortcut = this._shortcuts && this._shortcuts.get(topic);
    if (shortcut)
    {
        this._add_value(shortcut, val);
    }
    else
    {
        shortcut = this._add(val, 0, topic.split(this._separator), this._trie);
        if (this._shortcuts)
        {
            this._shortcuts.set(topic, shortcut);
        }
    }
    return this;
};

/**
Remove a topic matcher from the qlobber.

@param {String} topic The topic that's being matched against.
@param {Any} [val] The value that's being matched. If you don't specify `val` then all matchers for `topic` are removed.
@return {Qlobber} The qlobber (for chaining).
*/
Qlobber.prototype.remove = function (topic, val)
{
    if (this._remove(val, 0, topic.split(this._separator), this._trie) && this._shortcuts)
    {
        this._shortcuts.delete(topic);
    }
    return this;
};

/**
Match a topic.

@param {String} topic The topic to match against.
@return {Array} List of values that matched the topic. This may contain duplicates. Use a [`QlobberDedup`](#qlobberdedupoptions) if you don't want duplicates.
*/
Qlobber.prototype.match = function (topic, ctx)
{
    return this._match2([], topic, ctx);
};

/**
Test whether a topic match contains a value. Faster than calling [`match`](#qlobberprototypematchtopic) and searching the result for the value. Values are tested using [`test_values`](#qlobberprototypetest_valuesvals-val).

@param {String} topic The topic to match against.
@param {Any} val The value being tested for.
@return {Boolean} Whether matching against `topic` contains `val`.
*/
Qlobber.prototype.test = function (topic, val)
{
    return this._test(val, 0, topic.split(this._separator), this._trie);
};

/**
Test whether values found in a match contain a value passed to [`test`](#qlobberprototypetesttopic-val). You can override this to provide a custom implementation. Defaults to using `indexOf`.

@param {Array} vals The values found while matching.
@param {Any} val The value being tested for.
@return {Boolean} Whether `vals` contains `val`.
*/
Qlobber.prototype.test_values = function (vals, val)
{
    return vals.indexOf(val) >= 0;
};

/**
Reset the qlobber.

Removes all topic matchers from the qlobber.

@return {Qlobber} The qlobber (for chaining).
*/
Qlobber.prototype.clear = function ()
{
    this._trie.clear();
    if (this._shortcuts)
    {
        this._shortcuts.clear();
    }
    return this;
};

// for debugging
Qlobber.prototype.get_trie = function ()
{
    return this._trie;
};

/**
Visit each node in the qlobber's trie in turn.

@return {Iterator} An iterator on the trie. The iterator returns objects which, if fed (in the same order) to the function returned by [`get_restorer`](#qlobberprototypeget_restoreroptions) on a different qlobber, will build that qlobber's trie to the same state. The objects can be serialized using `JSON.stringify`, _if_ the values you store in the qlobber are also serializable.
*/
Qlobber.prototype.visit = function* ()
{
    let iterators = [],
        iterator = this._trie.entries(),
        i = 0;

    while (true)
    {
        if (i === 0)
        {
            yield { type: 'start_entries' };
        }

        let next = iterator.next();

        if (next.done)
        {
            yield { type: 'end_entries' };

            let prev = iterators.pop();
            if (prev === undefined)
            {
                return;
            }

            [iterator, i] = prev;
            continue;
        }

        let [key, value] = next.value;
        yield { type: 'entry', i: i++, key: key };

        if (key === this._separator)
        {
            yield { type: 'start_values' };

            if (value[Symbol.iterator])
            {
                let j = 0;
                for (let v of value)
                {
                    yield { type: 'value', i: j++, value: v };
                }
            }
            else
            {
                yield { type: 'value', i: 0, value: value };
            }

            yield { type: 'end_values' };
            continue;
        }

        iterators.push([iterator, i]);
        iterator = value.entries();
        i = 0;
    }
};

/**
Get a function which can restore the qlobber's trie to a state you retrieved
by calling [`visit`](#qlobberprototypevisit) on this or another qlobber.

@param {Object} [options] Options for restoring the trie.
- `{Boolean} cache_adds` Whether to cache topics when rebuilding the trie. This only applies if you also passed `cache_adds` as true in the [constructor](#qlobberoptions).

@return {Function} Function to call in order to rebuild the qlobber's trie. You should call this repeatedly with the objects you received from a call to [`visit`](#qlobberprototypevisit). If you serialized the objects, remember to deserialize them first (e.g. with `JSON.parse`)!
*/
Qlobber.prototype.get_restorer = function (options)
{
    options = options || {};

    let sts = [],
        entry = this._trie,
        path = '';

    return (obj) =>
    {
        switch (obj.type)
        {
            case 'entry':
                entry = entry || new Map();
                sts.push([entry, obj.key, path]);
                entry = entry.get(obj.key);
                if (options.cache_adds)
                {
                    if (path)
                    {
                        path += this._separator;
                    }
                    path += obj.key;
                }
                break;

            case 'value':
                if (entry)
                {
                    this._add_value(entry, obj.value);
                }
                else
                {
                    entry = this._initial_value(obj.value);
                }
                break;

            case 'end_entries':
                if (entry && (entry.size === 0))
                {
                    entry = undefined;
                }
                /* falls through */

            case 'end_values':
                let prev = sts.pop();
                if (prev === undefined)
                {
                    entry = undefined;
                    path = '';
                }
                else
                {
                    let [prev_entry, key, prev_path] = prev;
                    if (entry)
                    {
                        if (options.cache_adds &&
                            this._shortcuts &&
                            (obj.type === 'end_values'))
                        {
                            this._shortcuts.set(prev_path, entry);
                        }
                        prev_entry.set(key, entry);
                    }
                    entry = prev_entry;
                    path = prev_path;
                }
                break;
        }
    };
};

/**
Creates a new de-duplicating qlobber.

Inherits from [`Qlobber`](#qlobberoptions).

@constructor
@param {Object} [options] Same options as Qlobber.
*/
function QlobberDedup (options)
{
    Qlobber.call(this, options);
}

util.inherits(QlobberDedup, Qlobber);

QlobberDedup.prototype._initial_value = function (val)
{
    return new Set().add(val);
};

QlobberDedup.prototype._add_value = function (vals, val)
{
    vals.add(val);
};

QlobberDedup.prototype._add_values = function (dest, origin)
{
    origin.forEach(function (val)
    {
        dest.add(val);
    });
};

QlobberDedup.prototype._remove_value = function (vals, val)
{
    if (val === undefined)
    {
        return true;
    }

    vals.delete(val);
    return vals.size === 0;
};

/**
Test whether values found in a match contain a value passed to [`test`](#qlobberprototypetesttopic_val). You can override this to provide a custom implementation. Defaults to using `has`.

@param {Set} vals The values found while matching ([ES6 Set](http://www.ecma-international.org/ecma-262/6.0/#sec-set-objects)).
@param {Any} val The value being tested for.
@return {Boolean} Whether `vals` contains `val`.
*/
QlobberDedup.prototype.test_values = function (vals, val)
{
    return vals.has(val);
};

/**
Match a topic.

@param {String} topic The topic to match against.
@return {Set} [ES6 Set](http://www.ecma-international.org/ecma-262/6.0/#sec-set-objects) of values that matched the topic.
*/
QlobberDedup.prototype.match = function (topic, ctx)
{
    return this._match2(new Set(), topic, ctx);
};

/**
Creates a new qlobber which only stores the value `true`.

Whatever value you [`add`](#qlobberprototypeaddtopic-val) to this qlobber
(even `undefined`), a single, de-duplicated `true` will be stored. Use this
qlobber if you only need to test whether topics match, not about the values
they match to.

Inherits from [`Qlobber`](#qlobberoptions).

@constructor
@param {Object} [options] Same options as Qlobber.
*/
function QlobberTrue (options)
{
    Qlobber.call(this, options);
}

util.inherits(QlobberTrue, Qlobber);

QlobberTrue.prototype._initial_value = function ()
{
    return true;
};

QlobberTrue.prototype._add_value = function ()
{
};

QlobberTrue.prototype._remove_value = function ()
{
    return true;
};

/**
This override of [`test_values`](#qlobberprototypetest_valuesvals-val) always
returns `true`. When you call [`test`](#qlobberprototypetesttopic-val) on a
`QlobberTrue` instance, the value you pass is ignored since it only cares
whether a topic is matched.

@return {Boolean} Always `true`.
*/
QlobberTrue.prototype.test_values = function ()
{
    return true;    
};

/**
Match a topic.

Since `QlobberTrue` only cares whether a topic is matched and not about values
it matches to, this override of [`match`](#qlobberprototypematchtopic) just
calls [`test`](#qlobberprototypetesttopic-val) (with value `undefined`).

@param {String} topic The topic to match against.
@return {Boolean} Whether the `QlobberTrue` instance matches the topic.
*/
QlobberTrue.prototype.match = function (topic, ctx)
{
    return this.test(topic, ctx);
};

let stream = __webpack_require__(71);

/**
Creates a new [`Readable`](https://nodejs.org/dist/latest-v8.x/docs/api/stream.html#stream_class_stream_readable) stream, in object mode, which calls [`visit`](#qlobberprototypevisit) on a qlobber to generate its data.

You could [`pipe`](https://nodejs.org/dist/latest-v8.x/docs/api/stream.html#stream_readable_pipe_destination_options) this to a [`JSONStream.stringify`](https://github.com/dominictarr/JSONStream#jsonstreamstringifyopen-sep-close) stream, for instance, to serialize the qlobber to JSON. See [this test](test/json.js#L14) for an example.

Inherits from [`Readable`](https://nodejs.org/dist/latest-v8.x/docs/api/stream.html#stream_class_stream_readable).

@constructor

@param {Qlobber} qlobber The qlobber to call [`visit`](#qlobberprototypevisit) on.
*/
function VisitorStream (qlobber)
{
    stream.Readable.call(this, { objectMode: true });
    this._iterator = qlobber.visit();
}

util.inherits(VisitorStream, stream.Readable);

VisitorStream.prototype._read = function ()
{
    while (true)
    {
        let { done, value } = this._iterator.next();

        if (done)
        {
            this.push(null);
            break;
        }

        if (!this.push(value))
        {
            break;
        }
    }
};

/**
Creates a new [`Writable`](https://nodejs.org/dist/latest-v8.x/docs/api/stream.html#stream_class_stream_writable) stream, in object mode, which passes data written to it into the function returned by calling [`get_restorer`](#qlobberprototypeget_restoreroptions) on a qlobber.

You could [`pipe`](https://nodejs.org/dist/latest-v8.x/docs/api/stream.html#stream_readable_pipe_destination_options) a [`JSONStream.parse`](https://github.com/dominictarr/JSONStream#jsonstreamparsepath) stream to this, for instance, to deserialize the qlobber from JSON. See [this test](test/json.js#L33) for an example.

Inherits from [`Writable`](https://nodejs.org/dist/latest-v8.x/docs/api/stream.html#stream_class_stream_writable).

@constructor

@param {Qlobber} qlobber The qlobber to call [`get_restorer`](#qlobberprototypeget_restoreroptions) on.
*/
function RestorerStream (qlobber)
{
    stream.Writable.call(this, { objectMode: true });
    this._restorer = qlobber.get_restorer();
}

util.inherits(RestorerStream, stream.Writable);

RestorerStream.prototype._write = function (value, _, cb)
{
    this._restorer(value);
    cb();
};

exports.Qlobber = Qlobber;
exports.QlobberDedup = QlobberDedup;
exports.QlobberTrue = QlobberTrue;
exports.VisitorStream = VisitorStream;
exports.RestorerStream = RestorerStream;



/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global, process) {// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

var formatRegExp = /%[sdj%]/g;
exports.format = function(f) {
  if (!isString(f)) {
    var objects = [];
    for (var i = 0; i < arguments.length; i++) {
      objects.push(inspect(arguments[i]));
    }
    return objects.join(' ');
  }

  var i = 1;
  var args = arguments;
  var len = args.length;
  var str = String(f).replace(formatRegExp, function(x) {
    if (x === '%%') return '%';
    if (i >= len) return x;
    switch (x) {
      case '%s': return String(args[i++]);
      case '%d': return Number(args[i++]);
      case '%j':
        try {
          return JSON.stringify(args[i++]);
        } catch (_) {
          return '[Circular]';
        }
      default:
        return x;
    }
  });
  for (var x = args[i]; i < len; x = args[++i]) {
    if (isNull(x) || !isObject(x)) {
      str += ' ' + x;
    } else {
      str += ' ' + inspect(x);
    }
  }
  return str;
};


// Mark that a method should not be used.
// Returns a modified function which warns once by default.
// If --no-deprecation is set, then it is a no-op.
exports.deprecate = function(fn, msg) {
  // Allow for deprecating things in the process of starting up.
  if (isUndefined(global.process)) {
    return function() {
      return exports.deprecate(fn, msg).apply(this, arguments);
    };
  }

  if (process.noDeprecation === true) {
    return fn;
  }

  var warned = false;
  function deprecated() {
    if (!warned) {
      if (process.throwDeprecation) {
        throw new Error(msg);
      } else if (process.traceDeprecation) {
        console.trace(msg);
      } else {
        console.error(msg);
      }
      warned = true;
    }
    return fn.apply(this, arguments);
  }

  return deprecated;
};


var debugs = {};
var debugEnviron;
exports.debuglog = function(set) {
  if (isUndefined(debugEnviron))
    debugEnviron = process.env.NODE_DEBUG || '';
  set = set.toUpperCase();
  if (!debugs[set]) {
    if (new RegExp('\\b' + set + '\\b', 'i').test(debugEnviron)) {
      var pid = process.pid;
      debugs[set] = function() {
        var msg = exports.format.apply(exports, arguments);
        console.error('%s %d: %s', set, pid, msg);
      };
    } else {
      debugs[set] = function() {};
    }
  }
  return debugs[set];
};


/**
 * Echos the value of a value. Trys to print the value out
 * in the best way possible given the different types.
 *
 * @param {Object} obj The object to print out.
 * @param {Object} opts Optional options object that alters the output.
 */
/* legacy: obj, showHidden, depth, colors*/
function inspect(obj, opts) {
  // default options
  var ctx = {
    seen: [],
    stylize: stylizeNoColor
  };
  // legacy...
  if (arguments.length >= 3) ctx.depth = arguments[2];
  if (arguments.length >= 4) ctx.colors = arguments[3];
  if (isBoolean(opts)) {
    // legacy...
    ctx.showHidden = opts;
  } else if (opts) {
    // got an "options" object
    exports._extend(ctx, opts);
  }
  // set default options
  if (isUndefined(ctx.showHidden)) ctx.showHidden = false;
  if (isUndefined(ctx.depth)) ctx.depth = 2;
  if (isUndefined(ctx.colors)) ctx.colors = false;
  if (isUndefined(ctx.customInspect)) ctx.customInspect = true;
  if (ctx.colors) ctx.stylize = stylizeWithColor;
  return formatValue(ctx, obj, ctx.depth);
}
exports.inspect = inspect;


// http://en.wikipedia.org/wiki/ANSI_escape_code#graphics
inspect.colors = {
  'bold' : [1, 22],
  'italic' : [3, 23],
  'underline' : [4, 24],
  'inverse' : [7, 27],
  'white' : [37, 39],
  'grey' : [90, 39],
  'black' : [30, 39],
  'blue' : [34, 39],
  'cyan' : [36, 39],
  'green' : [32, 39],
  'magenta' : [35, 39],
  'red' : [31, 39],
  'yellow' : [33, 39]
};

// Don't use 'blue' not visible on cmd.exe
inspect.styles = {
  'special': 'cyan',
  'number': 'yellow',
  'boolean': 'yellow',
  'undefined': 'grey',
  'null': 'bold',
  'string': 'green',
  'date': 'magenta',
  // "name": intentionally not styling
  'regexp': 'red'
};


function stylizeWithColor(str, styleType) {
  var style = inspect.styles[styleType];

  if (style) {
    return '\u001b[' + inspect.colors[style][0] + 'm' + str +
           '\u001b[' + inspect.colors[style][1] + 'm';
  } else {
    return str;
  }
}


function stylizeNoColor(str, styleType) {
  return str;
}


function arrayToHash(array) {
  var hash = {};

  array.forEach(function(val, idx) {
    hash[val] = true;
  });

  return hash;
}


function formatValue(ctx, value, recurseTimes) {
  // Provide a hook for user-specified inspect functions.
  // Check that value is an object with an inspect function on it
  if (ctx.customInspect &&
      value &&
      isFunction(value.inspect) &&
      // Filter out the util module, it's inspect function is special
      value.inspect !== exports.inspect &&
      // Also filter out any prototype objects using the circular check.
      !(value.constructor && value.constructor.prototype === value)) {
    var ret = value.inspect(recurseTimes, ctx);
    if (!isString(ret)) {
      ret = formatValue(ctx, ret, recurseTimes);
    }
    return ret;
  }

  // Primitive types cannot have properties
  var primitive = formatPrimitive(ctx, value);
  if (primitive) {
    return primitive;
  }

  // Look up the keys of the object.
  var keys = Object.keys(value);
  var visibleKeys = arrayToHash(keys);

  if (ctx.showHidden) {
    keys = Object.getOwnPropertyNames(value);
  }

  // IE doesn't make error fields non-enumerable
  // http://msdn.microsoft.com/en-us/library/ie/dww52sbt(v=vs.94).aspx
  if (isError(value)
      && (keys.indexOf('message') >= 0 || keys.indexOf('description') >= 0)) {
    return formatError(value);
  }

  // Some type of object without properties can be shortcutted.
  if (keys.length === 0) {
    if (isFunction(value)) {
      var name = value.name ? ': ' + value.name : '';
      return ctx.stylize('[Function' + name + ']', 'special');
    }
    if (isRegExp(value)) {
      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
    }
    if (isDate(value)) {
      return ctx.stylize(Date.prototype.toString.call(value), 'date');
    }
    if (isError(value)) {
      return formatError(value);
    }
  }

  var base = '', array = false, braces = ['{', '}'];

  // Make Array say that they are Array
  if (isArray(value)) {
    array = true;
    braces = ['[', ']'];
  }

  // Make functions say that they are functions
  if (isFunction(value)) {
    var n = value.name ? ': ' + value.name : '';
    base = ' [Function' + n + ']';
  }

  // Make RegExps say that they are RegExps
  if (isRegExp(value)) {
    base = ' ' + RegExp.prototype.toString.call(value);
  }

  // Make dates with properties first say the date
  if (isDate(value)) {
    base = ' ' + Date.prototype.toUTCString.call(value);
  }

  // Make error with message first say the error
  if (isError(value)) {
    base = ' ' + formatError(value);
  }

  if (keys.length === 0 && (!array || value.length == 0)) {
    return braces[0] + base + braces[1];
  }

  if (recurseTimes < 0) {
    if (isRegExp(value)) {
      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
    } else {
      return ctx.stylize('[Object]', 'special');
    }
  }

  ctx.seen.push(value);

  var output;
  if (array) {
    output = formatArray(ctx, value, recurseTimes, visibleKeys, keys);
  } else {
    output = keys.map(function(key) {
      return formatProperty(ctx, value, recurseTimes, visibleKeys, key, array);
    });
  }

  ctx.seen.pop();

  return reduceToSingleString(output, base, braces);
}


function formatPrimitive(ctx, value) {
  if (isUndefined(value))
    return ctx.stylize('undefined', 'undefined');
  if (isString(value)) {
    var simple = '\'' + JSON.stringify(value).replace(/^"|"$/g, '')
                                             .replace(/'/g, "\\'")
                                             .replace(/\\"/g, '"') + '\'';
    return ctx.stylize(simple, 'string');
  }
  if (isNumber(value))
    return ctx.stylize('' + value, 'number');
  if (isBoolean(value))
    return ctx.stylize('' + value, 'boolean');
  // For some reason typeof null is "object", so special case here.
  if (isNull(value))
    return ctx.stylize('null', 'null');
}


function formatError(value) {
  return '[' + Error.prototype.toString.call(value) + ']';
}


function formatArray(ctx, value, recurseTimes, visibleKeys, keys) {
  var output = [];
  for (var i = 0, l = value.length; i < l; ++i) {
    if (hasOwnProperty(value, String(i))) {
      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
          String(i), true));
    } else {
      output.push('');
    }
  }
  keys.forEach(function(key) {
    if (!key.match(/^\d+$/)) {
      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
          key, true));
    }
  });
  return output;
}


function formatProperty(ctx, value, recurseTimes, visibleKeys, key, array) {
  var name, str, desc;
  desc = Object.getOwnPropertyDescriptor(value, key) || { value: value[key] };
  if (desc.get) {
    if (desc.set) {
      str = ctx.stylize('[Getter/Setter]', 'special');
    } else {
      str = ctx.stylize('[Getter]', 'special');
    }
  } else {
    if (desc.set) {
      str = ctx.stylize('[Setter]', 'special');
    }
  }
  if (!hasOwnProperty(visibleKeys, key)) {
    name = '[' + key + ']';
  }
  if (!str) {
    if (ctx.seen.indexOf(desc.value) < 0) {
      if (isNull(recurseTimes)) {
        str = formatValue(ctx, desc.value, null);
      } else {
        str = formatValue(ctx, desc.value, recurseTimes - 1);
      }
      if (str.indexOf('\n') > -1) {
        if (array) {
          str = str.split('\n').map(function(line) {
            return '  ' + line;
          }).join('\n').substr(2);
        } else {
          str = '\n' + str.split('\n').map(function(line) {
            return '   ' + line;
          }).join('\n');
        }
      }
    } else {
      str = ctx.stylize('[Circular]', 'special');
    }
  }
  if (isUndefined(name)) {
    if (array && key.match(/^\d+$/)) {
      return str;
    }
    name = JSON.stringify('' + key);
    if (name.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)) {
      name = name.substr(1, name.length - 2);
      name = ctx.stylize(name, 'name');
    } else {
      name = name.replace(/'/g, "\\'")
                 .replace(/\\"/g, '"')
                 .replace(/(^"|"$)/g, "'");
      name = ctx.stylize(name, 'string');
    }
  }

  return name + ': ' + str;
}


function reduceToSingleString(output, base, braces) {
  var numLinesEst = 0;
  var length = output.reduce(function(prev, cur) {
    numLinesEst++;
    if (cur.indexOf('\n') >= 0) numLinesEst++;
    return prev + cur.replace(/\u001b\[\d\d?m/g, '').length + 1;
  }, 0);

  if (length > 60) {
    return braces[0] +
           (base === '' ? '' : base + '\n ') +
           ' ' +
           output.join(',\n  ') +
           ' ' +
           braces[1];
  }

  return braces[0] + base + ' ' + output.join(', ') + ' ' + braces[1];
}


// NOTE: These type checking functions intentionally don't use `instanceof`
// because it is fragile and can be easily faked with `Object.create()`.
function isArray(ar) {
  return Array.isArray(ar);
}
exports.isArray = isArray;

function isBoolean(arg) {
  return typeof arg === 'boolean';
}
exports.isBoolean = isBoolean;

function isNull(arg) {
  return arg === null;
}
exports.isNull = isNull;

function isNullOrUndefined(arg) {
  return arg == null;
}
exports.isNullOrUndefined = isNullOrUndefined;

function isNumber(arg) {
  return typeof arg === 'number';
}
exports.isNumber = isNumber;

function isString(arg) {
  return typeof arg === 'string';
}
exports.isString = isString;

function isSymbol(arg) {
  return typeof arg === 'symbol';
}
exports.isSymbol = isSymbol;

function isUndefined(arg) {
  return arg === void 0;
}
exports.isUndefined = isUndefined;

function isRegExp(re) {
  return isObject(re) && objectToString(re) === '[object RegExp]';
}
exports.isRegExp = isRegExp;

function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}
exports.isObject = isObject;

function isDate(d) {
  return isObject(d) && objectToString(d) === '[object Date]';
}
exports.isDate = isDate;

function isError(e) {
  return isObject(e) &&
      (objectToString(e) === '[object Error]' || e instanceof Error);
}
exports.isError = isError;

function isFunction(arg) {
  return typeof arg === 'function';
}
exports.isFunction = isFunction;

function isPrimitive(arg) {
  return arg === null ||
         typeof arg === 'boolean' ||
         typeof arg === 'number' ||
         typeof arg === 'string' ||
         typeof arg === 'symbol' ||  // ES6 symbol
         typeof arg === 'undefined';
}
exports.isPrimitive = isPrimitive;

exports.isBuffer = __webpack_require__(69);

function objectToString(o) {
  return Object.prototype.toString.call(o);
}


function pad(n) {
  return n < 10 ? '0' + n.toString(10) : n.toString(10);
}


var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep',
              'Oct', 'Nov', 'Dec'];

// 26 Feb 16:19:34
function timestamp() {
  var d = new Date();
  var time = [pad(d.getHours()),
              pad(d.getMinutes()),
              pad(d.getSeconds())].join(':');
  return [d.getDate(), months[d.getMonth()], time].join(' ');
}


// log is just a thin wrapper to console.log that prepends a timestamp
exports.log = function() {
  console.log('%s - %s', timestamp(), exports.format.apply(exports, arguments));
};


/**
 * Inherit the prototype methods from one constructor into another.
 *
 * The Function.prototype.inherits from lang.js rewritten as a standalone
 * function (not on Function.prototype). NOTE: If this file is to be loaded
 * during bootstrapping this function needs to be rewritten using some native
 * functions as prototype setup using normal JavaScript does not work as
 * expected during bootstrapping (see mirror.js in r114903).
 *
 * @param {function} ctor Constructor function which needs to inherit the
 *     prototype.
 * @param {function} superCtor Constructor function to inherit prototype from.
 */
exports.inherits = __webpack_require__(70);

exports._extend = function(origin, add) {
  // Don't do anything if add isn't an object
  if (!add || !isObject(add)) return origin;

  var keys = Object.keys(add);
  var i = keys.length;
  while (i--) {
    origin[keys[i]] = add[keys[i]];
  }
  return origin;
};

function hasOwnProperty(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(17), __webpack_require__(22)))

/***/ }),
/* 69 */
/***/ (function(module, exports) {

module.exports = function isBuffer(arg) {
  return arg && typeof arg === 'object'
    && typeof arg.copy === 'function'
    && typeof arg.fill === 'function'
    && typeof arg.readUInt8 === 'function';
}

/***/ }),
/* 70 */
/***/ (function(module, exports) {

if (typeof Object.create === 'function') {
  // implementation from standard node.js 'util' module
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor
    ctor.prototype = Object.create(superCtor.prototype, {
      constructor: {
        value: ctor,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
  };
} else {
  // old school shim for old browsers
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor
    var TempCtor = function () {}
    TempCtor.prototype = superCtor.prototype
    ctor.prototype = new TempCtor()
    ctor.prototype.constructor = ctor
  }
}


/***/ }),
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

module.exports = Stream;

var EE = __webpack_require__(32).EventEmitter;
var inherits = __webpack_require__(18);

inherits(Stream, EE);
Stream.Readable = __webpack_require__(33);
Stream.Writable = __webpack_require__(82);
Stream.Duplex = __webpack_require__(83);
Stream.Transform = __webpack_require__(84);
Stream.PassThrough = __webpack_require__(85);

// Backwards-compat with node 0.4.x
Stream.Stream = Stream;



// old-style streams.  Note that the pipe method (the only relevant
// part of this class) is overridden in the Readable class.

function Stream() {
  EE.call(this);
}

Stream.prototype.pipe = function(dest, options) {
  var source = this;

  function ondata(chunk) {
    if (dest.writable) {
      if (false === dest.write(chunk) && source.pause) {
        source.pause();
      }
    }
  }

  source.on('data', ondata);

  function ondrain() {
    if (source.readable && source.resume) {
      source.resume();
    }
  }

  dest.on('drain', ondrain);

  // If the 'end' option is not supplied, dest.end() will be called when
  // source gets the 'end' or 'close' events.  Only dest.end() once.
  if (!dest._isStdio && (!options || options.end !== false)) {
    source.on('end', onend);
    source.on('close', onclose);
  }

  var didOnEnd = false;
  function onend() {
    if (didOnEnd) return;
    didOnEnd = true;

    dest.end();
  }


  function onclose() {
    if (didOnEnd) return;
    didOnEnd = true;

    if (typeof dest.destroy === 'function') dest.destroy();
  }

  // don't leave dangling pipes when there are errors.
  function onerror(er) {
    cleanup();
    if (EE.listenerCount(this, 'error') === 0) {
      throw er; // Unhandled stream error in pipe.
    }
  }

  source.on('error', onerror);
  dest.on('error', onerror);

  // remove all the event listeners that were added.
  function cleanup() {
    source.removeListener('data', ondata);
    dest.removeListener('drain', ondrain);

    source.removeListener('end', onend);
    source.removeListener('close', onclose);

    source.removeListener('error', onerror);
    dest.removeListener('error', onerror);

    source.removeListener('end', cleanup);
    source.removeListener('close', cleanup);

    dest.removeListener('close', cleanup);
  }

  source.on('end', cleanup);
  source.on('close', cleanup);

  dest.on('close', cleanup);

  dest.emit('pipe', source);

  // Allow for unix-like usage: A.pipe(B).pipe(C)
  return dest;
};


/***/ }),
/* 72 */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = Array.isArray || function (arr) {
  return toString.call(arr) == '[object Array]';
};


/***/ }),
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.byteLength = byteLength
exports.toByteArray = toByteArray
exports.fromByteArray = fromByteArray

var lookup = []
var revLookup = []
var Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array

var code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
for (var i = 0, len = code.length; i < len; ++i) {
  lookup[i] = code[i]
  revLookup[code.charCodeAt(i)] = i
}

revLookup['-'.charCodeAt(0)] = 62
revLookup['_'.charCodeAt(0)] = 63

function placeHoldersCount (b64) {
  var len = b64.length
  if (len % 4 > 0) {
    throw new Error('Invalid string. Length must be a multiple of 4')
  }

  // the number of equal signs (place holders)
  // if there are two placeholders, than the two characters before it
  // represent one byte
  // if there is only one, then the three characters before it represent 2 bytes
  // this is just a cheap hack to not do indexOf twice
  return b64[len - 2] === '=' ? 2 : b64[len - 1] === '=' ? 1 : 0
}

function byteLength (b64) {
  // base64 is 4/3 + up to two characters of the original data
  return (b64.length * 3 / 4) - placeHoldersCount(b64)
}

function toByteArray (b64) {
  var i, l, tmp, placeHolders, arr
  var len = b64.length
  placeHolders = placeHoldersCount(b64)

  arr = new Arr((len * 3 / 4) - placeHolders)

  // if there are placeholders, only get up to the last complete 4 chars
  l = placeHolders > 0 ? len - 4 : len

  var L = 0

  for (i = 0; i < l; i += 4) {
    tmp = (revLookup[b64.charCodeAt(i)] << 18) | (revLookup[b64.charCodeAt(i + 1)] << 12) | (revLookup[b64.charCodeAt(i + 2)] << 6) | revLookup[b64.charCodeAt(i + 3)]
    arr[L++] = (tmp >> 16) & 0xFF
    arr[L++] = (tmp >> 8) & 0xFF
    arr[L++] = tmp & 0xFF
  }

  if (placeHolders === 2) {
    tmp = (revLookup[b64.charCodeAt(i)] << 2) | (revLookup[b64.charCodeAt(i + 1)] >> 4)
    arr[L++] = tmp & 0xFF
  } else if (placeHolders === 1) {
    tmp = (revLookup[b64.charCodeAt(i)] << 10) | (revLookup[b64.charCodeAt(i + 1)] << 4) | (revLookup[b64.charCodeAt(i + 2)] >> 2)
    arr[L++] = (tmp >> 8) & 0xFF
    arr[L++] = tmp & 0xFF
  }

  return arr
}

function tripletToBase64 (num) {
  return lookup[num >> 18 & 0x3F] + lookup[num >> 12 & 0x3F] + lookup[num >> 6 & 0x3F] + lookup[num & 0x3F]
}

function encodeChunk (uint8, start, end) {
  var tmp
  var output = []
  for (var i = start; i < end; i += 3) {
    tmp = (uint8[i] << 16) + (uint8[i + 1] << 8) + (uint8[i + 2])
    output.push(tripletToBase64(tmp))
  }
  return output.join('')
}

function fromByteArray (uint8) {
  var tmp
  var len = uint8.length
  var extraBytes = len % 3 // if we have 1 byte left, pad 2 bytes
  var output = ''
  var parts = []
  var maxChunkLength = 16383 // must be multiple of 3

  // go through the array every three bytes, we'll deal with trailing stuff later
  for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
    parts.push(encodeChunk(uint8, i, (i + maxChunkLength) > len2 ? len2 : (i + maxChunkLength)))
  }

  // pad the end with zeros, but make sure to not forget the extra bytes
  if (extraBytes === 1) {
    tmp = uint8[len - 1]
    output += lookup[tmp >> 2]
    output += lookup[(tmp << 4) & 0x3F]
    output += '=='
  } else if (extraBytes === 2) {
    tmp = (uint8[len - 2] << 8) + (uint8[len - 1])
    output += lookup[tmp >> 10]
    output += lookup[(tmp >> 4) & 0x3F]
    output += lookup[(tmp << 2) & 0x3F]
    output += '='
  }

  parts.push(output)

  return parts.join('')
}


/***/ }),
/* 74 */
/***/ (function(module, exports) {

exports.read = function (buffer, offset, isLE, mLen, nBytes) {
  var e, m
  var eLen = nBytes * 8 - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var nBits = -7
  var i = isLE ? (nBytes - 1) : 0
  var d = isLE ? -1 : 1
  var s = buffer[offset + i]

  i += d

  e = s & ((1 << (-nBits)) - 1)
  s >>= (-nBits)
  nBits += eLen
  for (; nBits > 0; e = e * 256 + buffer[offset + i], i += d, nBits -= 8) {}

  m = e & ((1 << (-nBits)) - 1)
  e >>= (-nBits)
  nBits += mLen
  for (; nBits > 0; m = m * 256 + buffer[offset + i], i += d, nBits -= 8) {}

  if (e === 0) {
    e = 1 - eBias
  } else if (e === eMax) {
    return m ? NaN : ((s ? -1 : 1) * Infinity)
  } else {
    m = m + Math.pow(2, mLen)
    e = e - eBias
  }
  return (s ? -1 : 1) * m * Math.pow(2, e - mLen)
}

exports.write = function (buffer, value, offset, isLE, mLen, nBytes) {
  var e, m, c
  var eLen = nBytes * 8 - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0)
  var i = isLE ? 0 : (nBytes - 1)
  var d = isLE ? 1 : -1
  var s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0

  value = Math.abs(value)

  if (isNaN(value) || value === Infinity) {
    m = isNaN(value) ? 1 : 0
    e = eMax
  } else {
    e = Math.floor(Math.log(value) / Math.LN2)
    if (value * (c = Math.pow(2, -e)) < 1) {
      e--
      c *= 2
    }
    if (e + eBias >= 1) {
      value += rt / c
    } else {
      value += rt * Math.pow(2, 1 - eBias)
    }
    if (value * c >= 2) {
      e++
      c /= 2
    }

    if (e + eBias >= eMax) {
      m = 0
      e = eMax
    } else if (e + eBias >= 1) {
      m = (value * c - 1) * Math.pow(2, mLen)
      e = e + eBias
    } else {
      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen)
      e = 0
    }
  }

  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}

  e = (e << mLen) | m
  eLen += mLen
  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}

  buffer[offset + i - d] |= s * 128
}


/***/ }),
/* 75 */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = Array.isArray || function (arr) {
  return toString.call(arr) == '[object Array]';
};


/***/ }),
/* 76 */
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),
/* 77 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/*<replacement>*/

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Buffer = __webpack_require__(27).Buffer;
/*</replacement>*/

function copyBuffer(src, target, offset) {
  src.copy(target, offset);
}

module.exports = function () {
  function BufferList() {
    _classCallCheck(this, BufferList);

    this.head = null;
    this.tail = null;
    this.length = 0;
  }

  BufferList.prototype.push = function push(v) {
    var entry = { data: v, next: null };
    if (this.length > 0) this.tail.next = entry;else this.head = entry;
    this.tail = entry;
    ++this.length;
  };

  BufferList.prototype.unshift = function unshift(v) {
    var entry = { data: v, next: this.head };
    if (this.length === 0) this.tail = entry;
    this.head = entry;
    ++this.length;
  };

  BufferList.prototype.shift = function shift() {
    if (this.length === 0) return;
    var ret = this.head.data;
    if (this.length === 1) this.head = this.tail = null;else this.head = this.head.next;
    --this.length;
    return ret;
  };

  BufferList.prototype.clear = function clear() {
    this.head = this.tail = null;
    this.length = 0;
  };

  BufferList.prototype.join = function join(s) {
    if (this.length === 0) return '';
    var p = this.head;
    var ret = '' + p.data;
    while (p = p.next) {
      ret += s + p.data;
    }return ret;
  };

  BufferList.prototype.concat = function concat(n) {
    if (this.length === 0) return Buffer.alloc(0);
    if (this.length === 1) return this.head.data;
    var ret = Buffer.allocUnsafe(n >>> 0);
    var p = this.head;
    var i = 0;
    while (p) {
      copyBuffer(p.data, ret, i);
      i += p.data.length;
      p = p.next;
    }
    return ret;
  };

  return BufferList;
}();

/***/ }),
/* 78 */
/***/ (function(module, exports, __webpack_require__) {

var apply = Function.prototype.apply;

// DOM APIs, for completeness

exports.setTimeout = function() {
  return new Timeout(apply.call(setTimeout, window, arguments), clearTimeout);
};
exports.setInterval = function() {
  return new Timeout(apply.call(setInterval, window, arguments), clearInterval);
};
exports.clearTimeout =
exports.clearInterval = function(timeout) {
  if (timeout) {
    timeout.close();
  }
};

function Timeout(id, clearFn) {
  this._id = id;
  this._clearFn = clearFn;
}
Timeout.prototype.unref = Timeout.prototype.ref = function() {};
Timeout.prototype.close = function() {
  this._clearFn.call(window, this._id);
};

// Does not start the time, just sets up the members needed.
exports.enroll = function(item, msecs) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = msecs;
};

exports.unenroll = function(item) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = -1;
};

exports._unrefActive = exports.active = function(item) {
  clearTimeout(item._idleTimeoutId);

  var msecs = item._idleTimeout;
  if (msecs >= 0) {
    item._idleTimeoutId = setTimeout(function onTimeout() {
      if (item._onTimeout)
        item._onTimeout();
    }, msecs);
  }
};

// setimmediate attaches itself to the global object
__webpack_require__(79);
exports.setImmediate = setImmediate;
exports.clearImmediate = clearImmediate;


/***/ }),
/* 79 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global, process) {(function (global, undefined) {
    "use strict";

    if (global.setImmediate) {
        return;
    }

    var nextHandle = 1; // Spec says greater than zero
    var tasksByHandle = {};
    var currentlyRunningATask = false;
    var doc = global.document;
    var registerImmediate;

    function setImmediate(callback) {
      // Callback can either be a function or a string
      if (typeof callback !== "function") {
        callback = new Function("" + callback);
      }
      // Copy function arguments
      var args = new Array(arguments.length - 1);
      for (var i = 0; i < args.length; i++) {
          args[i] = arguments[i + 1];
      }
      // Store and register the task
      var task = { callback: callback, args: args };
      tasksByHandle[nextHandle] = task;
      registerImmediate(nextHandle);
      return nextHandle++;
    }

    function clearImmediate(handle) {
        delete tasksByHandle[handle];
    }

    function run(task) {
        var callback = task.callback;
        var args = task.args;
        switch (args.length) {
        case 0:
            callback();
            break;
        case 1:
            callback(args[0]);
            break;
        case 2:
            callback(args[0], args[1]);
            break;
        case 3:
            callback(args[0], args[1], args[2]);
            break;
        default:
            callback.apply(undefined, args);
            break;
        }
    }

    function runIfPresent(handle) {
        // From the spec: "Wait until any invocations of this algorithm started before this one have completed."
        // So if we're currently running a task, we'll need to delay this invocation.
        if (currentlyRunningATask) {
            // Delay by doing a setTimeout. setImmediate was tried instead, but in Firefox 7 it generated a
            // "too much recursion" error.
            setTimeout(runIfPresent, 0, handle);
        } else {
            var task = tasksByHandle[handle];
            if (task) {
                currentlyRunningATask = true;
                try {
                    run(task);
                } finally {
                    clearImmediate(handle);
                    currentlyRunningATask = false;
                }
            }
        }
    }

    function installNextTickImplementation() {
        registerImmediate = function(handle) {
            process.nextTick(function () { runIfPresent(handle); });
        };
    }

    function canUsePostMessage() {
        // The test against `importScripts` prevents this implementation from being installed inside a web worker,
        // where `global.postMessage` means something completely different and can't be used for this purpose.
        if (global.postMessage && !global.importScripts) {
            var postMessageIsAsynchronous = true;
            var oldOnMessage = global.onmessage;
            global.onmessage = function() {
                postMessageIsAsynchronous = false;
            };
            global.postMessage("", "*");
            global.onmessage = oldOnMessage;
            return postMessageIsAsynchronous;
        }
    }

    function installPostMessageImplementation() {
        // Installs an event handler on `global` for the `message` event: see
        // * https://developer.mozilla.org/en/DOM/window.postMessage
        // * http://www.whatwg.org/specs/web-apps/current-work/multipage/comms.html#crossDocumentMessages

        var messagePrefix = "setImmediate$" + Math.random() + "$";
        var onGlobalMessage = function(event) {
            if (event.source === global &&
                typeof event.data === "string" &&
                event.data.indexOf(messagePrefix) === 0) {
                runIfPresent(+event.data.slice(messagePrefix.length));
            }
        };

        if (global.addEventListener) {
            global.addEventListener("message", onGlobalMessage, false);
        } else {
            global.attachEvent("onmessage", onGlobalMessage);
        }

        registerImmediate = function(handle) {
            global.postMessage(messagePrefix + handle, "*");
        };
    }

    function installMessageChannelImplementation() {
        var channel = new MessageChannel();
        channel.port1.onmessage = function(event) {
            var handle = event.data;
            runIfPresent(handle);
        };

        registerImmediate = function(handle) {
            channel.port2.postMessage(handle);
        };
    }

    function installReadyStateChangeImplementation() {
        var html = doc.documentElement;
        registerImmediate = function(handle) {
            // Create a <script> element; its readystatechange event will be fired asynchronously once it is inserted
            // into the document. Do so, thus queuing up the task. Remember to clean up once it's been called.
            var script = doc.createElement("script");
            script.onreadystatechange = function () {
                runIfPresent(handle);
                script.onreadystatechange = null;
                html.removeChild(script);
                script = null;
            };
            html.appendChild(script);
        };
    }

    function installSetTimeoutImplementation() {
        registerImmediate = function(handle) {
            setTimeout(runIfPresent, 0, handle);
        };
    }

    // If supported, we should attach to the prototype of global, since that is where setTimeout et al. live.
    var attachTo = Object.getPrototypeOf && Object.getPrototypeOf(global);
    attachTo = attachTo && attachTo.setTimeout ? attachTo : global;

    // Don't get fooled by e.g. browserify environments.
    if ({}.toString.call(global.process) === "[object process]") {
        // For Node.js before 0.9
        installNextTickImplementation();

    } else if (canUsePostMessage()) {
        // For non-IE10 modern browsers
        installPostMessageImplementation();

    } else if (global.MessageChannel) {
        // For web workers, where supported
        installMessageChannelImplementation();

    } else if (doc && "onreadystatechange" in doc.createElement("script")) {
        // For IE 6–8
        installReadyStateChangeImplementation();

    } else {
        // For older browsers
        installSetTimeoutImplementation();
    }

    attachTo.setImmediate = setImmediate;
    attachTo.clearImmediate = clearImmediate;
}(typeof self === "undefined" ? typeof global === "undefined" ? this : global : self));

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(17), __webpack_require__(22)))

/***/ }),
/* 80 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {
/**
 * Module exports.
 */

module.exports = deprecate;

/**
 * Mark that a method should not be used.
 * Returns a modified function which warns once by default.
 *
 * If `localStorage.noDeprecation = true` is set, then it is a no-op.
 *
 * If `localStorage.throwDeprecation = true` is set, then deprecated functions
 * will throw an Error when invoked.
 *
 * If `localStorage.traceDeprecation = true` is set, then deprecated functions
 * will invoke `console.trace()` instead of `console.error()`.
 *
 * @param {Function} fn - the function to deprecate
 * @param {String} msg - the string to print to the console when `fn` is invoked
 * @returns {Function} a new "deprecated" version of `fn`
 * @api public
 */

function deprecate (fn, msg) {
  if (config('noDeprecation')) {
    return fn;
  }

  var warned = false;
  function deprecated() {
    if (!warned) {
      if (config('throwDeprecation')) {
        throw new Error(msg);
      } else if (config('traceDeprecation')) {
        console.trace(msg);
      } else {
        console.warn(msg);
      }
      warned = true;
    }
    return fn.apply(this, arguments);
  }

  return deprecated;
}

/**
 * Checks `localStorage` for boolean values for the given `name`.
 *
 * @param {String} name
 * @returns {Boolean}
 * @api private
 */

function config (name) {
  // accessing global.localStorage can trigger a DOMException in sandboxed iframes
  try {
    if (!global.localStorage) return false;
  } catch (_) {
    return false;
  }
  var val = global.localStorage[name];
  if (null == val) return false;
  return String(val).toLowerCase() === 'true';
}

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(17)))

/***/ }),
/* 81 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

// a passthrough stream.
// basically just the most minimal sort of Transform stream.
// Every written chunk gets output as-is.



module.exports = PassThrough;

var Transform = __webpack_require__(46);

/*<replacement>*/
var util = __webpack_require__(23);
util.inherits = __webpack_require__(18);
/*</replacement>*/

util.inherits(PassThrough, Transform);

function PassThrough(options) {
  if (!(this instanceof PassThrough)) return new PassThrough(options);

  Transform.call(this, options);
}

PassThrough.prototype._transform = function (chunk, encoding, cb) {
  cb(null, chunk);
};

/***/ }),
/* 82 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(34);


/***/ }),
/* 83 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(15);


/***/ }),
/* 84 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(33).Transform


/***/ }),
/* 85 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(33).PassThrough


/***/ }),
/* 86 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function isObject(value) {
    return value instanceof Object;
}
exports.isObject = isObject;
function isBoolean(value) {
    return typeof value === "boolean";
}
exports.isBoolean = isBoolean;
function isNumber(value) {
    return typeof value === "number";
}
exports.isNumber = isNumber;
function isArray(value) {
    return Array.isArray(value);
}
exports.isArray = isArray;


/***/ }),
/* 87 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.chromeNewTabPageUrls = [
    "https://www.bing.com/chrome/newtab",
    "https://www.google.ac/_/chrome/newtab",
    "https://www.google.ad/_/chrome/newtab",
    "https://www.google.ae/_/chrome/newtab",
    "https://www.google.af/_/chrome/newtab",
    "https://www.google.ag/_/chrome/newtab",
    "https://www.google.al/_/chrome/newtab",
    "https://www.google.am/_/chrome/newtab",
    "https://www.google.as/_/chrome/newtab",
    "https://www.google.at/_/chrome/newtab",
    "https://www.google.aw/_/chrome/newtab",
    "https://www.google.az/_/chrome/newtab",
    "https://www.google.ba/_/chrome/newtab",
    "https://www.google.be/_/chrome/newtab",
    "https://www.google.bf/_/chrome/newtab",
    "https://www.google.bg/_/chrome/newtab",
    "https://www.google.bi/_/chrome/newtab",
    "https://www.google.bj/_/chrome/newtab",
    "https://www.google.bm/_/chrome/newtab",
    "https://www.google.bn/_/chrome/newtab",
    "https://www.google.bo/_/chrome/newtab",
    "https://www.google.bs/_/chrome/newtab",
    "https://www.google.bt/_/chrome/newtab",
    "https://www.google.by/_/chrome/newtab",
    "https://www.google.ca/_/chrome/newtab",
    "https://www.google.cat/_/chrome/newtab",
    "https://www.google.cc/_/chrome/newtab",
    "https://www.google.cd/_/chrome/newtab",
    "https://www.google.cf/_/chrome/newtab",
    "https://www.google.cg/_/chrome/newtab",
    "https://www.google.ch/_/chrome/newtab",
    "https://www.google.ci/_/chrome/newtab",
    "https://www.google.cl/_/chrome/newtab",
    "https://www.google.cm/_/chrome/newtab",
    "https://www.google.cn/_/chrome/newtab",
    "https://www.google.co.ao/_/chrome/newtab",
    "https://www.google.co.bw/_/chrome/newtab",
    "https://www.google.co.ck/_/chrome/newtab",
    "https://www.google.co.cr/_/chrome/newtab",
    "https://www.google.co.gy/_/chrome/newtab",
    "https://www.google.co.hu/_/chrome/newtab",
    "https://www.google.co.id/_/chrome/newtab",
    "https://www.google.co.il/_/chrome/newtab",
    "https://www.google.co.im/_/chrome/newtab",
    "https://www.google.co.in/_/chrome/newtab",
    "https://www.google.co.je/_/chrome/newtab",
    "https://www.google.co.jp/_/chrome/newtab",
    "https://www.google.co.ke/_/chrome/newtab",
    "https://www.google.co.kr/_/chrome/newtab",
    "https://www.google.co.ls/_/chrome/newtab",
    "https://www.google.co.ma/_/chrome/newtab",
    "https://www.google.co.mz/_/chrome/newtab",
    "https://www.google.co.nz/_/chrome/newtab",
    "https://www.google.co.rs/_/chrome/newtab",
    "https://www.google.co.th/_/chrome/newtab",
    "https://www.google.co.tz/_/chrome/newtab",
    "https://www.google.co.ug/_/chrome/newtab",
    "https://www.google.co.uk/_/chrome/newtab",
    "https://www.google.co.uz/_/chrome/newtab",
    "https://www.google.co.ve/_/chrome/newtab",
    "https://www.google.co.vi/_/chrome/newtab",
    "https://www.google.co.za/_/chrome/newtab",
    "https://www.google.co.zm/_/chrome/newtab",
    "https://www.google.co.zw/_/chrome/newtab",
    "https://www.google.co/_/chrome/newtab",
    "https://www.google.com.af/_/chrome/newtab",
    "https://www.google.com.ag/_/chrome/newtab",
    "https://www.google.com.ai/_/chrome/newtab",
    "https://www.google.com.ar/_/chrome/newtab",
    "https://www.google.com.au/_/chrome/newtab",
    "https://www.google.com.bd/_/chrome/newtab",
    "https://www.google.com.bh/_/chrome/newtab",
    "https://www.google.com.bi/_/chrome/newtab",
    "https://www.google.com.bn/_/chrome/newtab",
    "https://www.google.com.bo/_/chrome/newtab",
    "https://www.google.com.br/_/chrome/newtab",
    "https://www.google.com.by/_/chrome/newtab",
    "https://www.google.com.bz/_/chrome/newtab",
    "https://www.google.com.cn/_/chrome/newtab",
    "https://www.google.com.co/_/chrome/newtab",
    "https://www.google.com.cu/_/chrome/newtab",
    "https://www.google.com.cy/_/chrome/newtab",
    "https://www.google.com.do/_/chrome/newtab",
    "https://www.google.com.dz/_/chrome/newtab",
    "https://www.google.com.ec/_/chrome/newtab",
    "https://www.google.com.eg/_/chrome/newtab",
    "https://www.google.com.er/_/chrome/newtab",
    "https://www.google.com.et/_/chrome/newtab",
    "https://www.google.com.fj/_/chrome/newtab",
    "https://www.google.com.ge/_/chrome/newtab",
    "https://www.google.com.gh/_/chrome/newtab",
    "https://www.google.com.gi/_/chrome/newtab",
    "https://www.google.com.gp/_/chrome/newtab",
    "https://www.google.com.gr/_/chrome/newtab",
    "https://www.google.com.gt/_/chrome/newtab",
    "https://www.google.com.gy/_/chrome/newtab",
    "https://www.google.com.hk/_/chrome/newtab",
    "https://www.google.com.ht/_/chrome/newtab",
    "https://www.google.com.iq/_/chrome/newtab",
    "https://www.google.com.jm/_/chrome/newtab",
    "https://www.google.com.jo/_/chrome/newtab",
    "https://www.google.com.kh/_/chrome/newtab",
    "https://www.google.com.kw/_/chrome/newtab",
    "https://www.google.com.kz/_/chrome/newtab",
    "https://www.google.com.lb/_/chrome/newtab",
    "https://www.google.com.lv/_/chrome/newtab",
    "https://www.google.com.ly/_/chrome/newtab",
    "https://www.google.com.mm/_/chrome/newtab",
    "https://www.google.com.mt/_/chrome/newtab",
    "https://www.google.com.mx/_/chrome/newtab",
    "https://www.google.com.my/_/chrome/newtab",
    "https://www.google.com.na/_/chrome/newtab",
    "https://www.google.com.nc/_/chrome/newtab",
    "https://www.google.com.nf/_/chrome/newtab",
    "https://www.google.com.ng/_/chrome/newtab",
    "https://www.google.com.ni/_/chrome/newtab",
    "https://www.google.com.np/_/chrome/newtab",
    "https://www.google.com.nr/_/chrome/newtab",
    "https://www.google.com.om/_/chrome/newtab",
    "https://www.google.com.pa/_/chrome/newtab",
    "https://www.google.com.pe/_/chrome/newtab",
    "https://www.google.com.pg/_/chrome/newtab",
    "https://www.google.com.ph/_/chrome/newtab",
    "https://www.google.com.pk/_/chrome/newtab",
    "https://www.google.com.pl/_/chrome/newtab",
    "https://www.google.com.pr/_/chrome/newtab",
    "https://www.google.com.ps/_/chrome/newtab",
    "https://www.google.com.pt/_/chrome/newtab",
    "https://www.google.com.py/_/chrome/newtab",
    "https://www.google.com.qa/_/chrome/newtab",
    "https://www.google.com.ru/_/chrome/newtab",
    "https://www.google.com.sa/_/chrome/newtab",
    "https://www.google.com.sb/_/chrome/newtab",
    "https://www.google.com.sg/_/chrome/newtab",
    "https://www.google.com.sl/_/chrome/newtab",
    "https://www.google.com.sv/_/chrome/newtab",
    "https://www.google.com.tj/_/chrome/newtab",
    "https://www.google.com.tm/_/chrome/newtab",
    "https://www.google.com.tn/_/chrome/newtab",
    "https://www.google.com.tr/_/chrome/newtab",
    "https://www.google.com.tw/_/chrome/newtab",
    "https://www.google.com.ua/_/chrome/newtab",
    "https://www.google.com.uy/_/chrome/newtab",
    "https://www.google.com.vc/_/chrome/newtab",
    "https://www.google.com.ve/_/chrome/newtab",
    "https://www.google.com.vn/_/chrome/newtab",
    "https://www.google.com/_/chrome/newtab",
    "https://www.google.cv/_/chrome/newtab",
    "https://www.google.cz/_/chrome/newtab",
    "https://www.google.de/_/chrome/newtab",
    "https://www.google.dj/_/chrome/newtab",
    "https://www.google.dk/_/chrome/newtab",
    "https://www.google.dm/_/chrome/newtab",
    "https://www.google.do/_/chrome/newtab",
    "https://www.google.dz/_/chrome/newtab",
    "https://www.google.ec/_/chrome/newtab",
    "https://www.google.ee/_/chrome/newtab",
    "https://www.google.es/_/chrome/newtab",
    "https://www.google.eu/_/chrome/newtab",
    "https://www.google.fi/_/chrome/newtab",
    "https://www.google.fm/_/chrome/newtab",
    "https://www.google.fr/_/chrome/newtab",
    "https://www.google.ga/_/chrome/newtab",
    "https://www.google.gd/_/chrome/newtab",
    "https://www.google.ge/_/chrome/newtab",
    "https://www.google.gf/_/chrome/newtab",
    "https://www.google.gg/_/chrome/newtab",
    "https://www.google.gl/_/chrome/newtab",
    "https://www.google.gm/_/chrome/newtab",
    "https://www.google.gp/_/chrome/newtab",
    "https://www.google.gr/_/chrome/newtab",
    "https://www.google.gw/_/chrome/newtab",
    "https://www.google.gy/_/chrome/newtab",
    "https://www.google.hk/_/chrome/newtab",
    "https://www.google.hn/_/chrome/newtab",
    "https://www.google.hr/_/chrome/newtab",
    "https://www.google.ht/_/chrome/newtab",
    "https://www.google.hu/_/chrome/newtab",
    "https://www.google.ie/_/chrome/newtab",
    "https://www.google.im/_/chrome/newtab",
    "https://www.google.in/_/chrome/newtab",
    "https://www.google.info/_/chrome/newtab",
    "https://www.google.io/_/chrome/newtab",
    "https://www.google.iq/_/chrome/newtab",
    "https://www.google.is/_/chrome/newtab",
    "https://www.google.it.ao/_/chrome/newtab",
    "https://www.google.it/_/chrome/newtab",
    "https://www.google.je/_/chrome/newtab",
    "https://www.google.jo/_/chrome/newtab",
    "https://www.google.jobs/_/chrome/newtab",
    "https://www.google.jp/_/chrome/newtab",
    "https://www.google.kg/_/chrome/newtab",
    "https://www.google.ki/_/chrome/newtab",
    "https://www.google.km/_/chrome/newtab",
    "https://www.google.kr/_/chrome/newtab",
    "https://www.google.kz/_/chrome/newtab",
    "https://www.google.la/_/chrome/newtab",
    "https://www.google.li/_/chrome/newtab",
    "https://www.google.lk/_/chrome/newtab",
    "https://www.google.lt/_/chrome/newtab",
    "https://www.google.lu/_/chrome/newtab",
    "https://www.google.lv/_/chrome/newtab",
    "https://www.google.ma/_/chrome/newtab",
    "https://www.google.md/_/chrome/newtab",
    "https://www.google.me/_/chrome/newtab",
    "https://www.google.mg/_/chrome/newtab",
    "https://www.google.mh/_/chrome/newtab",
    "https://www.google.mk/_/chrome/newtab",
    "https://www.google.ml/_/chrome/newtab",
    "https://www.google.mn/_/chrome/newtab",
    "https://www.google.mr/_/chrome/newtab",
    "https://www.google.ms/_/chrome/newtab",
    "https://www.google.mu/_/chrome/newtab",
    "https://www.google.mv/_/chrome/newtab",
    "https://www.google.mw/_/chrome/newtab",
    "https://www.google.mx/_/chrome/newtab",
    "https://www.google.ne.jp/_/chrome/newtab",
    "https://www.google.ne/_/chrome/newtab",
    "https://www.google.net/_/chrome/newtab",
    "https://www.google.ng/_/chrome/newtab",
    "https://www.google.nl/_/chrome/newtab",
    "https://www.google.no/_/chrome/newtab",
    "https://www.google.nr/_/chrome/newtab",
    "https://www.google.nu/_/chrome/newtab",
    "https://www.google.off.ai/_/chrome/newtab",
    "https://www.google.org/_/chrome/newtab",
    "https://www.google.pf/_/chrome/newtab",
    "https://www.google.ph/_/chrome/newtab",
    "https://www.google.pk/_/chrome/newtab",
    "https://www.google.pl/_/chrome/newtab",
    "https://www.google.pn/_/chrome/newtab",
    "https://www.google.ps/_/chrome/newtab",
    "https://www.google.pt/_/chrome/newtab",
    "https://www.google.qa/_/chrome/newtab",
    "https://www.google.re/_/chrome/newtab",
    "https://www.google.ro/_/chrome/newtab",
    "https://www.google.rs/_/chrome/newtab",
    "https://www.google.ru/_/chrome/newtab",
    "https://www.google.rw/_/chrome/newtab",
    "https://www.google.sc/_/chrome/newtab",
    "https://www.google.se/_/chrome/newtab",
    "https://www.google.sg/_/chrome/newtab",
    "https://www.google.sh/_/chrome/newtab",
    "https://www.google.si/_/chrome/newtab",
    "https://www.google.sk/_/chrome/newtab",
    "https://www.google.sl/_/chrome/newtab",
    "https://www.google.sm/_/chrome/newtab",
    "https://www.google.sn/_/chrome/newtab",
    "https://www.google.so/_/chrome/newtab",
    "https://www.google.sr/_/chrome/newtab",
    "https://www.google.st/_/chrome/newtab",
    "https://www.google.sz/_/chrome/newtab",
    "https://www.google.td/_/chrome/newtab",
    "https://www.google.tel/_/chrome/newtab",
    "https://www.google.tg/_/chrome/newtab",
    "https://www.google.tk/_/chrome/newtab",
    "https://www.google.tl/_/chrome/newtab",
    "https://www.google.tm/_/chrome/newtab",
    "https://www.google.tn/_/chrome/newtab",
    "https://www.google.to/_/chrome/newtab",
    "https://www.google.tt/_/chrome/newtab",
    "https://www.google.tw/_/chrome/newtab",
    "https://www.google.ua/_/chrome/newtab",
    "https://www.google.us/_/chrome/newtab",
    "https://www.google.uz/_/chrome/newtab",
    "https://www.google.vg/_/chrome/newtab",
    "https://www.google.vn/_/chrome/newtab",
    "https://www.google.vu/_/chrome/newtab",
    "https://www.google.ws/_/chrome/newtab",
    "https://www.google.yt/_/chrome/newtab",
];


/***/ }),
/* 88 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const date_utils_1 = __webpack_require__(40);
const tab_stalker_1 = __webpack_require__(47);
const web_request_listener_1 = __webpack_require__(91);
const maybe_1 = __webpack_require__(0);
const once_1 = __webpack_require__(30);
const message_router_1 = __webpack_require__(54);
const log_1 = __webpack_require__(1);
const trusted_url_tracker_1 = __webpack_require__(96);
const placement_manager_1 = __webpack_require__(100);
const blocked_page_controller_1 = __webpack_require__(101);
const download_tracker_1 = __webpack_require__(102);
const config_notifier_1 = __webpack_require__(103);
const config_updater_1 = __webpack_require__(104);
const nav_sequence_detector_1 = __webpack_require__(49);
const error_handler_1 = __webpack_require__(63);
const errors_1 = __webpack_require__(21);
const message_types_1 = __webpack_require__(2);
const external_app_link_controller_1 = __webpack_require__(107);
const file_url_tracker_1 = __webpack_require__(108);
const file_blocker_1 = __webpack_require__(109);
const popup_page_controller_1 = __webpack_require__(56);
const browser_1 = __webpack_require__(6);
const feature_manager_1 = __webpack_require__(111);
const heartbeat_1 = __webpack_require__(112);
const options_page_controller_1 = __webpack_require__(113);
const on_configured_1 = __webpack_require__(61);
const new_tab_page_url_tracker_1 = __webpack_require__(114);
const host_helper_channel_1 = __webpack_require__(115);
const logger_1 = __webpack_require__(117);
const context_menus_1 = __webpack_require__(118);
class EventPageListener {
    constructor(config) {
        this.config = config;
        const browser = browser_1.getCurrentBrowser();
        const configNotifier = new config_notifier_1.ConfigNotifier(this.config);
        const messageRouter = new message_router_1.GenericMessageRouter();
        messageRouter.registerMessageHandler(message_types_1.MessageType.edgeAckV10, () => { });
        const onConfiguredManager = new on_configured_1.OnConfiguredManager();
        const errorHandler = new error_handler_1.ErrorHandler(browser, messageRouter, configNotifier, onConfiguredManager);
        const hostHelperChannel = new host_helper_channel_1.HelperPortChannel(errorHandler, messageRouter);
        const messageSender = hostHelperChannel.messageSender;
        errorHandler.setup(messageSender, hostHelperChannel, hostHelperChannel, () => hostHelperChannel.reconnect());
        log_1.logger.addSink(new logger_1.HelperLogSink(messageSender));
        new logger_1.MessageLogger(messageRouter, hostHelperChannel);
        new heartbeat_1.HeartbeatController(errorHandler, messageSender, messageRouter, hostHelperChannel);
        new config_updater_1.ConfigUpdater(this.config, configNotifier, messageSender, messageRouter, hostHelperChannel, onConfiguredManager);
        const featureManager = new feature_manager_1.FeatureManager(messageRouter, messageSender, hostHelperChannel, configNotifier, onConfiguredManager);
        const tabStalker = new tab_stalker_1.TabStalker(browser);
        const trustedUrlTracker = new trusted_url_tracker_1.TrustedUrlTracker(configNotifier, messageSender);
        const fileUrlTracker = new file_url_tracker_1.FileUrlTracker(messageRouter, messageSender, browser);
        const newTabPageUrlTracker = new new_tab_page_url_tracker_1.NewTabPageUrlTracker(configNotifier, browser);
        const placementManager = new placement_manager_1.PlacementManager(trustedUrlTracker, fileUrlTracker, newTabPageUrlTracker, configNotifier);
        const browserLauncher = new blocked_page_controller_1.BrowserLauncher(messageRouter, messageSender, hostHelperChannel);
        browserLauncher.registerEventHandler(event => errorHandler.onBrowserLaunchEvent(event));
        const contextMenuManager = new context_menus_1.ContextMenuManager(browserLauncher, placementManager, errorHandler, configNotifier);
        const blockedPageController = new blocked_page_controller_1.BlockedPageController(browser, trustedUrlTracker, browserLauncher, configNotifier, hostHelperChannel, onConfiguredManager, messageSender);
        const fileBlocker = new file_blocker_1.FileBlocker(browser, fileUrlTracker, browserLauncher, onConfiguredManager);
        const blockLink = (linkURL, tabId) => blockedPageController.blockLink(linkURL, tabId);
        const externalAppLinkController = new external_app_link_controller_1.ExternalAppLinkController(browser, blockLink, onConfiguredManager, errorHandler);
        new popup_page_controller_1.PopupController(messageSender, configNotifier, errorHandler, featureManager, hostHelperChannel);
        new options_page_controller_1.OptionsController(messageSender, configNotifier, hostHelperChannel);
        const phishingNavSequenceDetector = new nav_sequence_detector_1.PhishingNavSequenceDetector(browser, configNotifier, tabStalker);
        const downloadTracker = new download_tracker_1.DownloadTracker(browser, messageSender, hostHelperChannel, featureManager, errorHandler);
        const webRequestListener = new web_request_listener_1.WebRequestListener(browser, configNotifier, tabStalker, placementManager, blockedPageController, fileBlocker, browserLauncher, phishingNavSequenceDetector, externalAppLinkController, featureManager, onConfiguredManager, errorHandler);
        const registerListeners = once_1.doOnce(() => {
            chrome.runtime.onInstalled.addListener(this.onInstalled.bind(this));
            chrome.runtime.onUpdateAvailable.addListener(this.onUpdateAvailable.bind(this));
            contextMenuManager.registerListeners();
            hostHelperChannel.connect();
            tabStalker.registerListeners();
            downloadTracker.registerListeners();
            webRequestListener.registerListeners();
            tabStalker.queryRestoredSessionTabs();
        });
        if (maybe_1.some(browser)) {
            log_1.log(`The current browser is ${browser_1.Browser[browser]} with userAgent "${navigator.userAgent}"`);
        }
        else {
            log_1.logError(new Error("Unable to work out the current browser"));
        }
        log_1.log(`EventPageListener constructed for extension version: ${chrome.runtime.getManifest().version}`);
        registerListeners();
        if (browser == browser_1.Browser.firefox && browser_1.is32bitFirefox()) {
            errorHandler.raiseError(errors_1.ChragError.is32bitFirefox);
        }
    }
    onInstalled(details) {
        log_1.log(`onInstalled(${JSON.stringify(details)})`);
        log_1.log(`onInstalled: ${date_utils_1.currentDateTimeString()}`);
    }
    onUpdateAvailable(details) {
        log_1.log(`onUpdateAvailable(${JSON.stringify(details)})`);
        log_1.log(`onUpdateAvailable: ${date_utils_1.currentDateTimeString()}`);
    }
}
exports.EventPageListener = EventPageListener;


/***/ }),
/* 89 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const maybe_1 = __webpack_require__(0);
const array_utils_1 = __webpack_require__(8);
const parser_utils_1 = __webpack_require__(90);
const number_utils_1 = __webpack_require__(10);
exports.charLexers = (() => {
    const octet = parser_utils_1.matchCharCodeRange(0, 255);
    const char = parser_utils_1.matchCharCodeRange(0, 127);
    const upalpha = parser_utils_1.matchCharRange('A', 'Z');
    const loalpha = parser_utils_1.matchCharRange('a', 'z');
    const digit = parser_utils_1.matchCharRange('0', '9');
    const ctl = parser_utils_1.matchCharSet(parser_utils_1.matchCharCodeRange(0, 31), parser_utils_1.matchCharCode(127));
    const cr = parser_utils_1.matchCharCode(13);
    const lf = parser_utils_1.matchCharCode(10);
    const sp = parser_utils_1.matchCharCode(32);
    const ht = parser_utils_1.matchCharCode(9);
    const doubleQuote = parser_utils_1.matchCharCode(34);
    const crlf = parser_utils_1.matchCharSeq(cr, lf);
    const lws = parser_utils_1.matchSeq(parser_utils_1.matchMaybe(crlf), parser_utils_1.matchAtLeastOnce(parser_utils_1.matchStream(parser_utils_1.matchCharSet(sp, ht))));
    const nonWhitespaceText = parser_utils_1.matchStream(parser_utils_1.matchAndChar(octet, parser_utils_1.matchNotChar(ctl)));
    const text = parser_utils_1.matchAtLeastOnce(parser_utils_1.matchAlt(nonWhitespaceText, lws));
    const hex = parser_utils_1.matchCharSet(parser_utils_1.matchCharRange('A', 'F'), parser_utils_1.matchCharRange('a', 'f'), digit);
    const separators = parser_utils_1.matchCharSet(parser_utils_1.matchChars('(', ')', '<', '>', '@', ',', ';', ':', '\\', '"', '/', '[', ']', '?', '=', '{', '}'), sp, ht);
    const token = parser_utils_1.matchAtLeastOnce(parser_utils_1.matchStream(parser_utils_1.matchAndChar(char, parser_utils_1.matchNotChar(ctl), parser_utils_1.matchNotChar(separators))));
    const nonWhitespaceNonParens = parser_utils_1.matchStream(parser_utils_1.matchAndChar(octet, parser_utils_1.matchNotChar(ctl), parser_utils_1.matchNotChar(parser_utils_1.matchChars('(', ')'))));
    const ctext = parser_utils_1.matchAtLeastOnce(parser_utils_1.matchAlt(nonWhitespaceNonParens, lws));
    const quotedPair = parser_utils_1.matchCharSeq(parser_utils_1.matchChar('\\'), char);
    let comment;
    const matchComment = (stream) => {
        return comment(stream);
    };
    comment = parser_utils_1.matchSeq(parser_utils_1.matchStream(parser_utils_1.matchChar('(')), parser_utils_1.matchRepeat(parser_utils_1.matchAlt(ctext, quotedPair, matchComment)), parser_utils_1.matchStream(parser_utils_1.matchChar(')')));
    const nonWhitespaceNonQuotedText = parser_utils_1.matchStream(parser_utils_1.matchAndChar(octet, parser_utils_1.matchNotChar(ctl), parser_utils_1.matchNotChar(parser_utils_1.matchChar('"'))));
    const qdtext = parser_utils_1.matchAtLeastOnce(parser_utils_1.matchAlt(nonWhitespaceNonQuotedText, lws));
    const quotedString = parser_utils_1.matchSeq(parser_utils_1.matchStream(doubleQuote), parser_utils_1.matchRepeat(parser_utils_1.matchAlt(qdtext, quotedPair)), parser_utils_1.matchStream(doubleQuote));
    return {
        octet,
        char,
        upalpha,
        loalpha,
        digit,
        ctl,
        cr,
        lf,
        sp,
        ht,
        doubleQuote,
        crlf,
        lws,
        text,
        hex,
        token,
        comment,
        quotedString,
        quotedPair
    };
})();
var TokenType;
(function (TokenType) {
    TokenType[TokenType["unspecified"] = 0] = "unspecified";
    TokenType[TokenType["comment"] = 1] = "comment";
    TokenType[TokenType["productName"] = 2] = "productName";
    TokenType[TokenType["productVersion"] = 3] = "productVersion";
    TokenType[TokenType["product"] = 4] = "product";
    TokenType[TokenType["userAgent"] = 5] = "userAgent";
    TokenType[TokenType["versionNumberComponent"] = 6] = "versionNumberComponent";
    TokenType[TokenType["versionNumber"] = 7] = "versionNumber";
})(TokenType = exports.TokenType || (exports.TokenType = {}));
function matchUnspecifiedToken(matcher) {
    return parser_utils_1.matchTree(TokenType.unspecified, matcher);
}
exports.tokenParsers = (() => {
    const comment = parser_utils_1.matchTree(TokenType.comment, exports.charLexers.comment);
    const productName = parser_utils_1.matchTree(TokenType.productName, exports.charLexers.token);
    const productVersion = parser_utils_1.matchTree(TokenType.productVersion, exports.charLexers.token);
    const product = parser_utils_1.matchTreeFlatten(TokenType.product, parser_utils_1.matchSeq(productName, parser_utils_1.matchMaybe(parser_utils_1.matchSeq(matchUnspecifiedToken(parser_utils_1.matchStream(parser_utils_1.matchChar('/'))), productVersion))));
    const userAgent = parser_utils_1.matchTreeFlatten(TokenType.userAgent, parser_utils_1.matchSeq(parser_utils_1.matchAlt(product, comment), parser_utils_1.matchRepeat(parser_utils_1.matchSeq(parser_utils_1.matchTree(TokenType.unspecified, exports.charLexers.lws), parser_utils_1.matchAlt(product, comment)))));
    const versionNumberComponent = parser_utils_1.matchTree(TokenType.versionNumberComponent, parser_utils_1.matchAtLeastOnce(parser_utils_1.matchStream(exports.charLexers.digit)));
    const versionNumber = parser_utils_1.matchTreeFlatten(TokenType.versionNumber, parser_utils_1.matchSeq(versionNumberComponent, parser_utils_1.matchRepeat(parser_utils_1.matchSeq(matchUnspecifiedToken(parser_utils_1.matchStream(parser_utils_1.matchChar('.'))), versionNumberComponent))));
    return {
        comment,
        product,
        userAgent,
        versionNumber
    };
})();
class Product {
    constructor(name, version) {
        this.name = name;
        this.version = version;
    }
}
exports.Product = Product;
function parseToken(matchToken, type, tokenStr) {
    const stream = parser_utils_1.makeStringStream(tokenStr);
    const tree = array_utils_1.maybeFirst(matchToken(stream));
    if (maybe_1.none(tree)) {
        return undefined;
    }
    if (tree.key !== type) {
        return undefined;
    }
    return tree;
}
function parseUserAgent(userAgentStr) {
    const userAgentTree = parseToken(exports.tokenParsers.userAgent, TokenType.userAgent, userAgentStr);
    if (maybe_1.none(userAgentTree)) {
        return undefined;
    }
    const productTrees = userAgentTree.find(TokenType.product);
    const findUniqueChild = (type, tree) => {
        const child = array_utils_1.maybeFirst(tree.find(type));
        return child;
    };
    const findUniqueChildValue = (type, tree) => {
        const child = findUniqueChild(type, tree);
        if (maybe_1.none(child)) {
            return undefined;
        }
        return String.fromCharCode(...child.value);
    };
    const makeProduct = (productTree) => {
        const productName = findUniqueChildValue(TokenType.productName, productTree);
        if (maybe_1.none(productName)) {
            return undefined;
        }
        const productVersion = findUniqueChildValue(TokenType.productVersion, productTree);
        return new Product(productName, productVersion);
    };
    const products = productTrees.map(makeProduct).filter(maybe_1.some);
    return products;
}
exports.parseUserAgent = parseUserAgent;
function parseProductVersion(productVersionStr) {
    const productVersionTree = parseToken(exports.tokenParsers.versionNumber, TokenType.versionNumber, productVersionStr);
    if (maybe_1.none(productVersionTree)) {
        return undefined;
    }
    const versionComponentTrees = productVersionTree.find(TokenType.versionNumberComponent);
    const parsedVersionComponents = versionComponentTrees.map((tree) => number_utils_1.parseNumber(String.fromCharCode(...tree.value)));
    if (parsedVersionComponents.some(maybe_1.none)) {
        return undefined;
    }
    const versionComponents = parsedVersionComponents.filter(maybe_1.some);
    return versionComponents;
}
exports.parseProductVersion = parseProductVersion;


/***/ }),
/* 90 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const maybe_1 = __webpack_require__(0);
const array_utils_1 = __webpack_require__(8);
class Tree {
    constructor(key, value, children = []) {
        this.key = key;
        this.value = value;
        this.children = children;
    }
    addChild(key, value) {
        const child = new Tree(key, value);
        return new Tree(this.key, this.value, [...this.children, child]);
    }
    find(key, compareKeys = maybe_1.isEqual) {
        return this.doFind(key, compareKeys, []);
    }
    doFind(key, compareKeys, result) {
        if (key === this.key) {
            result.push(this);
        }
        for (const child of this.children) {
            child.doFind(key, compareKeys, result);
        }
        return result;
    }
    isEqual(other, compareKeys = maybe_1.isEqual, compareValues = maybe_1.isEqual) {
        if (!compareKeys(this.key, other.key)) {
            return false;
        }
        if (!compareValues(this.value, other.value)) {
            return false;
        }
        return array_utils_1.compareArrays(this.children, other.children, (a, b) => a.isEqual(b, compareKeys, compareValues));
    }
}
exports.Tree = Tree;
function makeTree(key, value, ...children) {
    return new Tree(key, value, children);
}
exports.makeTree = makeTree;
function charToCode(char) {
    return char.charCodeAt(0);
}
exports.charToCode = charToCode;
function strToCharCodes(str) {
    const codes = new Array();
    for (let i = 0; i < str.length; i += 1) {
        const code = str.charCodeAt(i);
        codes.push(code);
    }
    return codes;
}
exports.strToCharCodes = strToCharCodes;
class Stream {
    constructor(content, pos = 0) {
        this.content = content;
        this.pos = pos;
    }
    get position() {
        return this.pos;
    }
    get length() {
        return this.content.length;
    }
    isAtEnd() {
        return this.position === this.length;
    }
    canRead() {
        return this.position < this.length;
    }
    read() {
        if (!this.canRead()) {
            return undefined;
        }
        const value = this.content[this.position];
        this.setPosition(this.position + 1);
        return value;
    }
    savePosition() {
        return this.position;
    }
    restorePosition(position) {
        this.setPosition(position);
    }
    setPosition(position) {
        this.pos = position;
    }
}
exports.Stream = Stream;
function makeStringStream(str) {
    const content = strToCharCodes(str);
    return new Stream(content);
}
exports.makeStringStream = makeStringStream;
function matchCharCode(valueToMatch) {
    return (value) => {
        if (value === valueToMatch) {
            return value;
        }
        return undefined;
    };
}
exports.matchCharCode = matchCharCode;
function matchChar(valueToMatch) {
    return matchCharCode(charToCode(valueToMatch));
}
exports.matchChar = matchChar;
function matchCharCodes(...values) {
    return (value) => {
        if (array_utils_1.has(values, value)) {
            return value;
        }
        return undefined;
    };
}
exports.matchCharCodes = matchCharCodes;
function matchChars(...values) {
    return matchCharCodes(...values.map(charToCode));
}
exports.matchChars = matchChars;
function matchCharCodeRange(first, last) {
    return (value) => {
        if (value >= first && value <= last) {
            return value;
        }
        return undefined;
    };
}
exports.matchCharCodeRange = matchCharCodeRange;
function matchCharRange(first, last) {
    return matchCharCodeRange(charToCode(first), charToCode(last));
}
exports.matchCharRange = matchCharRange;
function matchCharSet(...matchers) {
    return (value) => {
        if (matchers.some(matcher => maybe_1.some(matcher(value)))) {
            return value;
        }
        return undefined;
    };
}
exports.matchCharSet = matchCharSet;
function matchNotChar(matcher) {
    return (value) => {
        if (maybe_1.none(matcher(value))) {
            return value;
        }
        return undefined;
    };
}
exports.matchNotChar = matchNotChar;
function matchAndChar(...matchers) {
    return (value) => {
        if (matchers.every(matcher => maybe_1.some(matcher(value)))) {
            return value;
        }
        return undefined;
    };
}
exports.matchAndChar = matchAndChar;
function matchStream(matcher) {
    return (stream) => {
        const position = stream.savePosition();
        const onMatchFailed = () => {
            stream.restorePosition(position);
            return undefined;
        };
        const result = new Array();
        const value = stream.read();
        if (maybe_1.none(value)) {
            return onMatchFailed();
        }
        const match = matcher(value);
        if (maybe_1.none(match)) {
            return onMatchFailed();
        }
        result.push(match);
        return result;
    };
}
exports.matchStream = matchStream;
function matchCharSeq(...matchers) {
    return (stream) => {
        const position = stream.savePosition();
        const didNotMatch = () => {
            stream.restorePosition(position);
            return undefined;
        };
        const result = new Array();
        for (const matcher of matchers) {
            const value = stream.read();
            if (maybe_1.none(value)) {
                return didNotMatch();
            }
            const match = matcher(value);
            if (maybe_1.none(match)) {
                return didNotMatch();
            }
            result.push(match);
        }
        return result;
    };
}
exports.matchCharSeq = matchCharSeq;
function matchSeq(...matchers) {
    return (stream) => {
        const position = stream.savePosition();
        let result = new Array();
        for (const matcher of matchers) {
            const match = matcher(stream);
            if (maybe_1.none(match)) {
                stream.restorePosition(position);
                return undefined;
            }
            result = result.concat(match);
        }
        return result;
    };
}
exports.matchSeq = matchSeq;
function matchMaybe(matcher) {
    return (stream) => {
        const position = stream.savePosition();
        const match = matcher(stream);
        if (maybe_1.none(match)) {
            stream.restorePosition(position);
            return new Array();
        }
        return match;
    };
}
exports.matchMaybe = matchMaybe;
function matchAtLeastOnce(matcher) {
    return (stream) => {
        const position = stream.savePosition();
        const match = matcher(stream);
        if (maybe_1.none(match)) {
            stream.restorePosition(position);
            return undefined;
        }
        let result = match;
        while (true) {
            const position = stream.savePosition();
            const match = matcher(stream);
            if (maybe_1.none(match)) {
                stream.restorePosition(position);
                return result;
            }
            result = result.concat(match);
        }
    };
}
exports.matchAtLeastOnce = matchAtLeastOnce;
function matchRepeat(matcher) {
    const doMatchAtLeastOnce = matchAtLeastOnce(matcher);
    return (stream) => {
        const match = doMatchAtLeastOnce(stream);
        if (maybe_1.none(match)) {
            return new Array();
        }
        return match;
    };
}
exports.matchRepeat = matchRepeat;
function matchAlt(...matchers) {
    return (stream) => {
        for (const matcher of matchers) {
            const position = stream.savePosition();
            const match = matcher(stream);
            if (maybe_1.some(match)) {
                return match;
            }
            stream.restorePosition(position);
        }
        return undefined;
    };
}
exports.matchAlt = matchAlt;
function matchTree(key, matcher) {
    return (stream) => {
        const match = matcher(stream);
        if (maybe_1.none(match)) {
            return undefined;
        }
        return [makeTree(key, match)];
    };
}
exports.matchTree = matchTree;
function matchTreeFlatten(key, matcher) {
    return (stream) => {
        const match = matcher(stream);
        if (maybe_1.none(match)) {
            return undefined;
        }
        const value = match.reduce((currentValue, tree) => currentValue.concat(tree.value), new Array());
        return [makeTree(key, value, ...match)];
    };
}
exports.matchTreeFlatten = matchTreeFlatten;


/***/ }),
/* 91 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const url_utils_1 = __webpack_require__(4);
const tab_stalker_1 = __webpack_require__(47);
const boolean_utils_1 = __webpack_require__(92);
const array_utils_1 = __webpack_require__(8);
const log_1 = __webpack_require__(1);
const string_utils_1 = __webpack_require__(3);
const origin_1 = __webpack_require__(9);
const maybe_1 = __webpack_require__(0);
const nav_sequence_detector_1 = __webpack_require__(49);
const nav_sequence_parser_1 = __webpack_require__(36);
const array_utils_2 = __webpack_require__(8);
const phishing_source_sites_1 = __webpack_require__(50);
const http_method_1 = __webpack_require__(51);
const browser_1 = __webpack_require__(6);
const host_constants_1 = __webpack_require__(12);
const url_parse_utils_1 = __webpack_require__(52);
const config_keys_1 = __webpack_require__(7);
const blocked_page_options_1 = __webpack_require__(53);
const url_parse_utils_2 = __webpack_require__(52);
const id_generator_1 = __webpack_require__(19);
const web_request_listener_filter_1 = __webpack_require__(95);
const history_1 = __webpack_require__(28);
const content_type_1 = __webpack_require__(37);
function ifIncognitoTab(tabId, action) {
    chrome.tabs.get(tabId, tab => {
        if (tab.incognito) {
            action();
        }
    });
}
var Comparison;
(function (Comparison) {
    Comparison[Comparison["lessThan"] = -1] = "lessThan";
    Comparison[Comparison["equal"] = 0] = "equal";
    Comparison[Comparison["greaterThan"] = 1] = "greaterThan";
})(Comparison || (Comparison = {}));
class WebRequestListener {
    constructor(browser, configNotifier, tabStalker, placementManager, blockedPageController, fileBlocker, browserLauncher, phishingNavSequenceDetector, externalAppLinkController, featureManager, onConfigured, errorHandler) {
        this.browser = browser;
        this.tabStalker = tabStalker;
        this.placementManager = placementManager;
        this.blockedPageController = blockedPageController;
        this.fileBlocker = fileBlocker;
        this.browserLauncher = browserLauncher;
        this.phishingNavSequenceDetector = phishingNavSequenceDetector;
        this.externalAppLinkController = externalAppLinkController;
        this.featureManager = featureManager;
        this.onConfigured = onConfigured;
        this.extensionHoldingPageURL = chrome.runtime.getURL(host_constants_1.hostConstants.holdingPage);
        this.onBeforeRequestCB = (details) => this.onBeforeRequest(details);
        this.onBeforeRedirectCB = (details) => this.onBeforeRedirect(details);
        this.onHeadersReceivedCB = (details) => this.onHeadersReceived(details);
        this.onCompletedCB = (details) => this.onCompleted(details);
        this.onErrorOccurredCB = (details) => this.onErrorOccurred(details);
        this.pendingRedirects = new Set();
        this.tabs = new Set();
        this.tabURLs = new Map();
        this.redirectBackToSrcInfo = new Map();
        this.isDormant = false;
        this.promptForUncategorized = false;
        this.delayedTabs = new Set();
        this.idGenerator = new id_generator_1.IdGenerator();
        this.newTabURLs = tab_stalker_1.parseBrowserNewTabURLs();
        this.aboutBlankURL = url_utils_1.parseUrl("about:blank");
        this.edgeMajorVersion = browser_1.findEdgeMajorVersion();
        configNotifier.addConfigListenerForKeys((key, config) => { this.onConfigChanged(key, config); }, [config_keys_1.ConfigKey.promptForUncategorized]);
        this.tabStalker.registerOnTabClosedHandler((tabId) => this.onTabClosed(tabId));
        this.tabStalker.registerOnTabRestoredListeners((tabId, url) => this.onTabRestored(tabId, url));
        errorHandler.onDormantStateChanged.registerEventHandler(this.onDormantStateChanged.bind(this));
        this.onConfigured.registerListener(() => this.removeHoldingPageFromHistory());
    }
    onConfigChanged(key, config) {
        switch (key) {
            case config_keys_1.ConfigKey.promptForUncategorized:
                this.promptForUncategorized = config.promptForUncategorized;
                break;
        }
    }
    onDormantStateChanged(dormantState) {
        this.isDormant = dormantState;
    }
    removeHoldingPageFromHistory() {
        const extensionWindows = chrome.extension.getViews({ type: "tab" });
        if (extensionWindows.some(window => window.location.href === this.extensionHoldingPageURL)) {
            setTimeout(() => this.removeHoldingPageFromHistory(), 500);
            return;
        }
        history_1.removeUrlFromHistory(this.browser, this.extensionHoldingPageURL);
    }
    onTabRestored(tabId, url) {
        const isNewTab = this.detectedTab(tabId);
        if (!isNewTab) {
            return;
        }
        this.onConfigured.registerListener(() => {
            log_1.log(`WebRequestListener.onTabRestored: tabId: ${tabId} url: ${url}`);
            const urlCategory = this.categorizeURL(url);
            const groups = this.findGroups(url);
            const didUserCreateTab = this.didUserCreateTab(tabId);
            this.detectPhishingNavSequenceOnNavigate(tabId, url, urlCategory, groups, isNewTab, didUserCreateTab);
            this.onTabNavigated(tabId, url);
        });
    }
    isRestoredSessionTab(tabId) {
        return this.tabStalker.isRestoredSessionTab(tabId);
    }
    findTabURL(tabId) {
        if (maybe_1.none(tabId)) {
            return undefined;
        }
        const webRequestListenerURL = this.tabURLs.get(tabId);
        let tabStalkerURL = undefined;
        const urlOrSpec = this.tabStalker.findTabURL(tabId);
        if (maybe_1.some(urlOrSpec)) {
            tabStalkerURL = url_utils_1.parseURLIfNecessary(urlOrSpec);
        }
        if (maybe_1.some(webRequestListenerURL) && maybe_1.some(tabStalkerURL)) {
            if (!url_utils_1.isSameUrl(webRequestListenerURL, tabStalkerURL)) {
                log_1.logError(new Error(`webRequestListenerURL (${webRequestListenerURL}) and tabStalkerURL` +
                    ` (${tabStalkerURL}) do not match for tab ${tabId}. Will use tabStalkerURL`));
            }
            return tabStalkerURL;
        }
        if (maybe_1.some(webRequestListenerURL)) {
            return webRequestListenerURL;
        }
        if (maybe_1.some(tabStalkerURL)) {
            return tabStalkerURL;
        }
        return undefined;
    }
    findOpenerTabId(tabId) {
        return this.tabStalker.findOpenerTabId(tabId);
    }
    findOpenerWindowTabId(windowId) {
        const ids = this.tabStalker.findOpenerWindowId(windowId);
        if (maybe_1.none(ids)) {
            return undefined;
        }
        const [, openerTabId] = ids;
        return openerTabId;
    }
    findParentTabIds(tabId, isNewTab) {
        const filterUniqueTabIds = (tabIds) => {
            const uniqueTabsIds = [];
            const unorderedUniqueTabIds = new Set();
            for (const tabId of tabIds) {
                if (!unorderedUniqueTabIds.has(tabId)) {
                    unorderedUniqueTabIds.add(tabId);
                    uniqueTabsIds.push(tabId);
                }
            }
            return uniqueTabsIds;
        };
        const removeTabId = (tabIds, tabIdToRemove) => {
            return tabIds.filter((tabId) => tabId !== tabIdToRemove);
        };
        const isSameTab = (parentTabId) => {
            return tabId === parentTabId;
        };
        let parentTabIds = [];
        const openerTabId = this.findOpenerTabId(tabId);
        if (maybe_1.some(openerTabId) && !isSameTab(openerTabId)) {
            parentTabIds.push(openerTabId);
        }
        const activatedTabId = this.tabStalker.activatedTabId;
        if (maybe_1.some(activatedTabId)) {
            if (!isSameTab(activatedTabId)) {
                parentTabIds.push(activatedTabId);
            }
            else {
                const lastActivatedTabId = this.tabStalker.lastActivatedTabId;
                if (maybe_1.some(lastActivatedTabId) && !isSameTab(lastActivatedTabId)) {
                    parentTabIds.push(lastActivatedTabId);
                }
            }
        }
        const lastFocusedWindowActivatedTabId = this.tabStalker.lastFocusedWindowActivatedTabId;
        if (maybe_1.some(lastFocusedWindowActivatedTabId) && !isSameTab(lastFocusedWindowActivatedTabId)) {
            parentTabIds.push(lastFocusedWindowActivatedTabId);
        }
        const maybeNewWindowId = this.tabStalker.maybeNewWindowId;
        if (maybe_1.some(maybeNewWindowId) && isNewTab) {
            const openerWindowTabId = this.findOpenerWindowTabId(maybeNewWindowId);
            if (maybe_1.some(openerWindowTabId) && !isSameTab(openerWindowTabId)) {
                parentTabIds.push(openerWindowTabId);
            }
        }
        const lastFocusedWindowId = this.tabStalker.lastFocusedWindowId;
        if (maybe_1.some(lastFocusedWindowId) && isNewTab) {
            const popupWindowTabId = this.tabStalker.findPopupWindowTabId(lastFocusedWindowId);
            if (maybe_1.some(popupWindowTabId) && !isSameTab(popupWindowTabId)) {
                parentTabIds.push(popupWindowTabId);
            }
        }
        if (this.browser == browser_1.Browser.edge) {
            parentTabIds = parentTabIds.concat(this.tabStalker.findPopupWindowTabIds());
        }
        parentTabIds = filterUniqueTabIds(parentTabIds);
        parentTabIds = removeTabId(parentTabIds, tabId);
        log_1.log(`findParentTabIds: ${string_utils_1.toString({
            parentTabIds: parentTabIds,
            tabStalker: this.tabStalker
        })}`);
        return parentTabIds;
    }
    findSrcURL(tabId, initiator, initiatorIsSrc) {
        let srcURL = this.findTabURL(tabId);
        if (maybe_1.none(srcURL) && initiatorIsSrc && maybe_1.some(initiator)) {
            srcURL = url_utils_1.parseUrl(initiator);
        }
        return srcURL;
    }
    isBlockedPageURL(url) {
        return this.blockedPageController.isBlockedPageURL(url);
    }
    isBlockedFilePageURL(url) {
        return this.fileBlocker.isBlockedFilePageURL(url);
    }
    isExternalAppLinkURL(url) {
        return this.externalAppLinkController.isExternalAppLinkURL(url);
    }
    isNewTabPageUrl(url) {
        if (maybe_1.none(url)) {
            return false;
        }
        return this.placementManager.isNewTabPageUrl(url);
    }
    isPhishingSourceSite(url) {
        if (maybe_1.none(url)) {
            return false;
        }
        const isPhishingSourceSite = this.placementManager.isPhishingSourceSite(url);
        return boolean_utils_1.isTrue(isPhishingSourceSite);
    }
    isWebMailSite(url) {
        if (maybe_1.none(url)) {
            return false;
        }
        const isWebMailSite = this.placementManager.isWebMailSite(url);
        return boolean_utils_1.isTrue(isWebMailSite);
    }
    findGroups(url) {
        if (maybe_1.none(url)) {
            return [];
        }
        const groups = this.placementManager.findGroups(url);
        if (maybe_1.none(groups)) {
            return [];
        }
        return groups;
    }
    shouldBlockNavigation(isNewTab, isRedirect, httpMethod, srcURL, parentURL) {
        if (maybe_1.none(httpMethod)) {
            return false;
        }
        const url = isNewTab ? parentURL : srcURL;
        if (maybe_1.none(url)) {
            return false;
        }
        const tabType = isNewTab ? phishing_source_sites_1.TabType.newTab : phishing_source_sites_1.TabType.sameTab;
        const navType = isRedirect ? nav_sequence_parser_1.NavType.redirect : nav_sequence_parser_1.NavType.navigation;
        const shouldBlock = this.placementManager.shouldBlockNavigation(tabType, navType, httpMethod, url);
        return boolean_utils_1.isTrue(shouldBlock);
    }
    isAuthRequest(srcURL, destURL) {
        if (maybe_1.none(srcURL) || maybe_1.none(destURL)) {
            return false;
        }
        const siteRequiresAuth = this.placementManager.siteRequiresAuth(srcURL);
        const isAuthSite = this.placementManager.isAuthSite(destURL);
        const isAuthRequest = boolean_utils_1.isTrue(siteRequiresAuth) && boolean_utils_1.isTrue(isAuthSite);
        return isAuthRequest;
    }
    isTrustedURL(url) {
        const isTrusted = true;
        const isUntrusted = true;
        if (maybe_1.none(url)) {
            return [!isTrusted, !isUntrusted];
        }
        const isTrustedURL = this.placementManager.isTrustedUrl(url);
        if (maybe_1.none(isTrustedURL)) {
            return [!isTrusted, !isUntrusted];
        }
        return [isTrustedURL, !isTrustedURL];
    }
    isTrustedFileURL(fileURL) {
        const isFileURL = true;
        const isTrusted = true;
        const isUntrusted = true;
        if (maybe_1.none(fileURL) || !url_utils_1.isFileUrl(fileURL)) {
            return [!isFileURL, !isTrusted, !isUntrusted];
        }
        const isTrustedFileURL = this.placementManager.isTrustedFileUrl(fileURL);
        if (maybe_1.none(isTrustedFileURL)) {
            return [isFileURL, !isTrusted, !isUntrusted];
        }
        return [isFileURL, isTrustedFileURL, !isTrustedFileURL];
    }
    isSameOrigin(srcURL, destURL) {
        if (maybe_1.none(srcURL) || maybe_1.none(destURL)) {
            return false;
        }
        const srcOrigin = origin_1.parseOrigin(srcURL);
        const destOrigin = origin_1.parseOrigin(destURL);
        if (maybe_1.none(srcOrigin) || maybe_1.none(destOrigin)) {
            return false;
        }
        return origin_1.isSameOrigin(srcOrigin, destOrigin);
    }
    isRedirect(requestId) {
        return this.pendingRedirects.has(requestId);
    }
    clearPendingRedirect(requestId) {
        this.pendingRedirects.delete(requestId);
    }
    canLaunchBrowser(url) {
        return this.browserLauncher.canLaunchBrowser(url);
    }
    launchBrowser(url) {
        if (maybe_1.none(url)) {
            return;
        }
        this.browserLauncher.launchBrowser(url, () => { });
    }
    launchBrowserAndCloseTabOrNavigateTab(tabId, url, closeTab) {
        if (maybe_1.none(url)) {
            return;
        }
        this.browserLauncher.launchBrowserAndCloseTabOrNavigateTab(tabId, url, closeTab);
    }
    closeTab(tabId, onTabClosed = () => { }) {
        setTimeout(() => {
            chrome.tabs.remove(tabId, () => {
                log_1.log(`WebRequestListener.closeTab: tabId: ${tabId}`);
                onTabClosed(tabId);
            });
        }, 100);
    }
    closeTabAndLaunchBrowser(tabId, url) {
        this.closeTab(tabId, () => {
            this.launchBrowser(url);
        });
    }
    createTab(url, onTabCreated = () => { }) {
        chrome.tabs.create({ url: url }, (tab) => {
            log_1.log(`WebRequestListener.createTab: ${string_utils_1.toString({
                tabId: tab.id,
                url: url
            })}`);
            onTabCreated(tab);
        });
    }
    onTabClosed(tabId) {
        log_1.log(`WebRequestListener.onTabClosed: tabId: ${tabId}`);
        this.tabURLs.delete(tabId);
        this.tabs.delete(tabId);
        this.delayedTabs.delete(tabId);
    }
    detectedTab(tabId) {
        const isNewTab = !this.tabs.has(tabId);
        if (isNewTab) {
            this.tabs.add(tabId);
            this.phishingNavSequenceDetector.onTabDetected(tabId);
        }
        return isNewTab;
    }
    didUserCreateTab(tabId) {
        return this.tabStalker.didUserCreateTab(tabId);
    }
    onTabNavigated(tabId, url) {
        if (maybe_1.none(url)) {
            return;
        }
        this.tabURLs.set(tabId, url);
    }
    detectedExternalAppLink(tabId) {
        this.externalAppLinkController.onExternalAppLinkDetected(tabId);
    }
    detectedParentTab(tabId, url, urlCategory, groups) {
        if (maybe_1.none(url)) {
            return;
        }
        if (this.isBlockedPageURL(url)) {
            return;
        }
        if (!this.phishingNavSequenceDetector.onParentTabDetected(tabId, url, urlCategory, groups)) {
            log_1.logError(new Error(`WebRequestListener.detectedParentTab: ${string_utils_1.toString({
                tabId: tabId,
                url: url,
                urlCategory: nav_sequence_parser_1.urlCategoryToString(urlCategory),
                groups: groups
            })}`));
        }
    }
    detectPhishingNavSequence(url, doDetect) {
        if (maybe_1.none(url)) {
            return new nav_sequence_detector_1.EmptyNavSequenceDetections();
        }
        if (this.isBlockedPageURL(url) || this.isBlockedFilePageURL(url)) {
            return new nav_sequence_detector_1.EmptyNavSequenceDetections();
        }
        return doDetect(this.phishingNavSequenceDetector, url);
    }
    detectPhishingNavSequenceOnNavigate(tabId, url, urlCategory, groups, isNewTab, didUserCreateTab) {
        return this.detectPhishingNavSequence(url, (phishingNavSequenceDetector, url) => {
            return phishingNavSequenceDetector.onNavigate(tabId, url, urlCategory, groups, isNewTab, didUserCreateTab);
        });
    }
    detectPhishingNavSequenceOnRedirect(tabId, url, urlCategory, groups) {
        return this.detectPhishingNavSequence(url, (phishingNavSequenceDetector, url) => {
            return phishingNavSequenceDetector.onRedirect(tabId, url, urlCategory, groups);
        });
    }
    detectPhishingNavSequenceOnContentType(tabId, url, urlCategory, groups, contentType) {
        return this.detectPhishingNavSequence(url, (phishingNavSequenceDetector, url) => {
            return phishingNavSequenceDetector.onContentType(tabId, url, urlCategory, groups, contentType);
        });
    }
    hasHigherPrecedenceThanBuiltin(navSequenceDetections) {
        return this.phishingNavSequenceDetector.hasHigherPrecedenceThanBuiltin(navSequenceDetections);
    }
    categorizeURL(url) {
        const [isTrustedURL, isUntrustedURL] = this.isTrustedURL(url);
        const isPhishingSourceSite = this.isPhishingSourceSite(url);
        const isWebMailSite = this.isWebMailSite(url);
        const isExternalAppLinkURL = this.isExternalAppLinkURL(url);
        const urlCategory = nav_sequence_parser_1.categorizeUrl(isTrustedURL, isUntrustedURL, isPhishingSourceSite, isWebMailSite, isExternalAppLinkURL);
        log_1.log(`WebRequestListener.categorizeURL: ${string_utils_1.toString({
            url: url,
            isTrustedURL: isTrustedURL,
            isUntrustedURL: isUntrustedURL,
            isPhishingSourceSite: isPhishingSourceSite,
            isWebMailSite: isWebMailSite,
            isExternalAppLinkURL: isExternalAppLinkURL,
            urlCategory: nav_sequence_parser_1.urlCategoryToString(urlCategory)
        })}`);
        return urlCategory;
    }
    get shouldOpenPhishingLinksInSecureBrowser() {
        return this.placementManager.shouldOpenPhishingLinksInSecureBrowser;
    }
    isBlockedPageContinueNavigation(srcURL, destURL) {
        if (this.isBlockedPageURL(srcURL)) {
            const srcBlockedPageNavigateToURL = url_parse_utils_2.findURLDocumentQueryParam(srcURL, blocked_page_options_1.OptionNames.navigateToSpec);
            if (maybe_1.some(destURL) && maybe_1.some(srcBlockedPageNavigateToURL)) {
                return url_utils_1.isSameUrl(destURL, srcBlockedPageNavigateToURL);
            }
        }
        return false;
    }
    continueNavigation() {
        return {
            cancel: false
        };
    }
    blockNavigation() {
        return {
            cancel: true
        };
    }
    redirectNavigation(tabId, url) {
        if (maybe_1.none(url)) {
            log_1.logError(new Error("Invalid redirect URL. Letting navigation proceed"));
            return this.continueNavigation();
        }
        this.onTabNavigated(tabId, url);
        if (this.browser === browser_1.Browser.edge && url_utils_1.isExtensionUrl(url)) {
            this.createTab(url_utils_1.URLToString(url), () => {
                this.closeTab(tabId);
            });
            return this.blockNavigation();
        }
        return {
            redirectUrl: url_utils_1.URLToString(url)
        };
    }
    ;
    launchBrowserAndCloseTab(tabId, launchURL, redirectURL = undefined) {
        if (maybe_1.none(launchURL) || !this.canLaunchBrowser(launchURL)) {
            log_1.logError(new Error("Can't launch Secure Browser. Letting navigation proceed"));
            return this.continueNavigation();
        }
        const shouldRedirectAndKeepTab = maybe_1.some(redirectURL) && !url_utils_1.isSameUrl(launchURL, redirectURL);
        chrome.tabs.get(tabId, () => {
            const err = chrome.runtime.lastError;
            if (err) {
                log_1.log(`launchBrowser will not be called because an error ` +
                    `was encountered while checking if the tabId (${tabId}) was ` +
                    `valid in onBeforeRequest: blockUntrusted - "${err.message}"`);
                return;
            }
            this.launchBrowserAndCloseTabOrNavigateTab(tabId, launchURL, !shouldRedirectAndKeepTab);
        });
        if (shouldRedirectAndKeepTab) {
            log_1.log(`Instead of cancelling the navigation and closing the tab we are ` +
                `redirecting to ${redirectURL} and keeping the native tab (${tabId}) open`);
            return this.redirectNavigation(tabId, redirectURL);
        }
        else {
            return this.blockNavigation();
        }
    }
    detectNotChromeExternalAppLinkFileNavigation(tabId, srcURL, isNewTab, didUserCreateTab) {
        if (this.browser === browser_1.Browser.chrome || this.browser === browser_1.Browser.edgeChromium) {
            return;
        }
        const isSrcExternalAppLinkURL = this.isExternalAppLinkURL(srcURL);
        log_1.log(`detectNotChromeExternalAppLinkFileNavigation(${string_utils_1.toString({
            tabId: tabId,
            srcURL: srcURL,
            isSrcExternalAppLinkPageURL: isSrcExternalAppLinkURL,
        })})`);
        if (!isSrcExternalAppLinkURL) {
            return;
        }
        const srcGroups = this.findGroups(srcURL);
        this.detectPhishingNavSequenceOnNavigate(tabId, srcURL, nav_sequence_parser_1.UrlCategory.externalAppLink, srcGroups, isNewTab, didUserCreateTab);
        this.onTabNavigated(tabId, srcURL);
    }
    isEdgeExternalAppLinkNavigation(destURL) {
        if (this.browser !== browser_1.Browser.edge) {
            return false;
        }
        const edgeExternalAppLinkQueryValue = url_parse_utils_1.findDocumentQueryParam(destURL, host_constants_1.hostConstants.edgeExternalAppLinkQueryKey);
        const hasEdgeExternalAppLinkQueryParam = maybe_1.some(edgeExternalAppLinkQueryValue);
        log_1.log(`detectEdgeExternalAppLinkNavigation(${string_utils_1.toString({
            destURLSearchParams: destURL.search,
            hasEdgeExternalAppLinkQueryParam: hasEdgeExternalAppLinkQueryParam
        })})`);
        return hasEdgeExternalAppLinkQueryParam;
    }
    stripEdgeExternalAppLinkNavigationQueryParam(destURL) {
        const targetURL = destURL;
        try {
            const searchParams = new URLSearchParams(targetURL.search);
            searchParams.delete(host_constants_1.hostConstants.edgeExternalAppLinkQueryKey);
            targetURL.search = searchParams.toString();
        }
        catch (e) {
            const searchParams = targetURL.search;
            const re = new RegExp("[?&]" + host_constants_1.hostConstants.edgeExternalAppLinkQueryKey +
                "=" + host_constants_1.hostConstants.edgeExternalAppLinkQueryValue);
            targetURL.search = searchParams.replace(re, "");
        }
        return targetURL;
    }
    selectParentTab(parentTabIds, initiator, initiatorIsParent) {
        if (initiatorIsParent && maybe_1.some(initiator)) {
            const parentURL = url_utils_1.parseUrl(initiator);
            if (maybe_1.some(parentURL)) {
                return [undefined, parentURL, this.categorizeURL(parentURL)];
            }
        }
        const sortedParentTabs = parentTabIds.map((parentTabId) => {
            const parentURL = this.findTabURL(parentTabId);
            const parentURLCategory = this.categorizeURL(parentURL);
            return [parentTabId, parentURL, parentURLCategory];
        }).sort((a, b) => {
            const [, , urlCategoryA] = a;
            const [, , urlCategoryB] = b;
            const isWebMailSiteA = urlCategoryA === nav_sequence_parser_1.UrlCategory.webMailSiteUrl;
            const isWebMailSiteB = urlCategoryB === nav_sequence_parser_1.UrlCategory.webMailSiteUrl;
            const isPhishingSourceSiteA = urlCategoryA === nav_sequence_parser_1.UrlCategory.phishingSourceSiteUrl;
            const isPhishingSourceSiteB = urlCategoryB === nav_sequence_parser_1.UrlCategory.phishingSourceSiteUrl;
            if (isWebMailSiteA) {
                return Comparison.lessThan;
            }
            else if (isWebMailSiteB) {
                return Comparison.greaterThan;
            }
            else if (isPhishingSourceSiteA) {
                return Comparison.lessThan;
            }
            else if (isPhishingSourceSiteB) {
                return Comparison.greaterThan;
            }
            else {
                return Comparison.equal;
            }
        });
        log_1.log(`selectParentTab: sortedParentTabs: ${string_utils_1.toString(sortedParentTabs.map(([tabId, url, urlCategory]) => [
            tabId,
            url,
            nav_sequence_parser_1.urlCategoryToString(urlCategory)
        ]))}`);
        if (array_utils_2.isEmpty(sortedParentTabs)) {
            return [undefined, undefined, nav_sequence_parser_1.UrlCategory.uncategorizedUrl];
        }
        const selectedParentTab = array_utils_1.first(sortedParentTabs);
        return selectedParentTab;
    }
    get holdingPageURL() {
        if (this.browser === browser_1.Browser.edge) {
            if (maybe_1.none(this.edgeMajorVersion) || this.edgeMajorVersion < 18) {
                return "about:blank";
            }
        }
        return this.extensionHoldingPageURL;
    }
    getEdgeRedirectURL(redirectURL) {
        const newTabURL = this.newTabURLs.get(browser_1.Browser.edge);
        if (newTabURL && url_utils_1.isSameUrl(redirectURL, newTabURL, url_utils_1.UrlCompareOptions.IgnoreSearchParams)) {
            return this.aboutBlankURL;
        }
        return redirectURL;
    }
    getRedirectURL(requestId) {
        const info = this.redirectBackToSrcInfo.get(requestId);
        if (maybe_1.none(info)) {
            return undefined;
        }
        const { srcURL, isNewTab, didUserCreateTab } = info;
        if (isNewTab && !didUserCreateTab) {
            return undefined;
        }
        if (this.browser === browser_1.Browser.edge) {
            return this.getEdgeRedirectURL(srcURL);
        }
        return srcURL;
    }
    getInitiator(onBeforeRequestDetails) {
        switch (this.browser) {
            case browser_1.Browser.chrome:
                return onBeforeRequestDetails.initiator;
            case browser_1.Browser.edgeChromium:
                return onBeforeRequestDetails.initiator;
            case browser_1.Browser.firefox:
                return onBeforeRequestDetails.originUrl;
            default:
                return undefined;
        }
    }
    onBeforeRequest(details) {
        if (this.onConfigured.isConfigured || this.isDormant || this.delayedTabs.has(details.tabId)) {
            return this.onBeforeRequestImpl(details);
        }
        const tabId = details.tabId;
        this.delayedTabs.add(tabId);
        const proceedURL = details.url;
        const holdingURL = this.holdingPageURL;
        if (proceedURL === holdingURL) {
            log_1.log(`onBeforeRequest to [holdingURL] will proceed. Details: ${string_utils_1.toString(details)}`);
            this.onTabNavigated(tabId, url_utils_1.parseUrl(proceedURL));
            return this.continueNavigation();
        }
        let didTimeout = false;
        const timeout = host_constants_1.hostConstants.postponementTimeout;
        const id = this.idGenerator.generateId();
        log_1.log(`onBeforeRequest: SBX hasn't received all configuration so this onBeforeRequest event to ` +
            `${proceedURL} in tab ${tabId} has been postponed for up to ${timeout}ms and given id ${id}`);
        const proceed = () => {
            log_1.log(`onBeforeRequest: postponed id ${id}: proceed: ${string_utils_1.toString({
                tabId: tabId,
                proceedURL: proceedURL
            })}`);
            chrome.tabs.update(tabId, { url: proceedURL });
        };
        const redirect = (redirectURL) => {
            log_1.log(`onBeforeRequest: postponed id ${id}: redirect: ${string_utils_1.toString({
                tabId: tabId,
                redirectURL: redirectURL
            })}`);
            chrome.tabs.update(details.tabId, { url: redirectURL });
        };
        const onTimeout = () => {
            didTimeout = true;
            log_1.log(`onBeforeRequest: postponed id: ${id} onTimeout`);
            this.onTabNavigated(tabId, url_utils_1.parseUrl(proceedURL));
            proceed();
        };
        const timeoutId = setTimeout(onTimeout, timeout);
        this.onConfigured.registerListener(() => {
            clearTimeout(timeoutId);
            if (didTimeout) {
                return;
            }
            log_1.log(`onBeforeRequest: postponed id ${id}: onConfigured`);
            const onBeforeRequestAction = this.onBeforeRequestImpl(details);
            log_1.log(`onBeforeRequest: postponed id ${id}: onBeforeRequestAction: ${string_utils_1.toString(onBeforeRequestAction)}`);
            const cancel = onBeforeRequestAction.cancel;
            if (boolean_utils_1.isFalse(cancel)) {
                proceed();
            }
            const redirectURL = onBeforeRequestAction.redirectUrl;
            if (maybe_1.some(redirectURL)) {
                redirect(redirectURL);
            }
        });
        this.onTabNavigated(tabId, url_utils_1.parseUrl(holdingURL));
        return {
            redirectUrl: holdingURL
        };
    }
    onBeforeRequestImpl(details) {
        log_1.log(`onBeforeRequest(${string_utils_1.toString(details)})`);
        const requestId = details.requestId;
        const tabId = details.tabId;
        const frameId = details.frameId;
        const destURL = url_utils_1.parseUrl(details.url);
        const httpMethod = http_method_1.parseHttpMethod(details.method);
        const didUserCreateTab = this.didUserCreateTab(tabId);
        const isNewTab = this.detectedTab(tabId);
        const isRestoredSessionTab = this.isRestoredSessionTab(tabId);
        const considerParentTab = isNewTab && !didUserCreateTab;
        const initiator = this.getInitiator(details);
        const initiatorIsParent = considerParentTab;
        const initiatorIsSrc = !considerParentTab;
        const parentTabIds = this.findParentTabIds(tabId, isNewTab);
        const selectedParentTab = this.selectParentTab(parentTabIds, initiator, initiatorIsParent);
        const [parentTabId, parentURL, parentURLCategory] = selectedParentTab;
        const srcURL = this.findSrcURL(tabId, initiator, initiatorIsSrc);
        this.detectNotChromeExternalAppLinkFileNavigation(tabId, srcURL, isNewTab, didUserCreateTab);
        const isRedirect = this.isRedirect(requestId);
        if (isRedirect) {
            this.clearPendingRedirect(requestId);
        }
        if (maybe_1.some(srcURL) && !this.isExternalAppLinkURL(srcURL) && !isRedirect) {
            this.redirectBackToSrcInfo.set(requestId, { srcURL, isNewTab, didUserCreateTab });
        }
        else {
            this.redirectBackToSrcInfo.delete(requestId);
        }
        const proceed = () => {
            log_1.log(`onBeforeRequest: proceed(${string_utils_1.toString({
                destURL: destURL,
                tabId: tabId,
                isNewTab: isNewTab,
                isRedirect: isRedirect
            })})`);
            this.onTabNavigated(tabId, destURL);
            return this.continueNavigation();
        };
        const block = (url) => {
            log_1.log(`onBeforeRequest: block(${string_utils_1.toString({
                destURL: destURL,
                tabId: tabId,
                isNewTab: isNewTab,
                isRedirect: isRedirect,
                shouldOpenPhishingLinksInSecureBrowser: this.shouldOpenPhishingLinksInSecureBrowser
            })})`);
            if (!this.featureManager.isLinkProtectionEnabled) {
                log_1.log(`onBeforeRequest: block: link protection is not enabled`);
                return proceed();
            }
            if (this.shouldOpenPhishingLinksInSecureBrowser) {
                return this.launchBrowserAndCloseTab(tabId, url);
            }
            ifIncognitoTab(tabId, () => {
                this.closeTabAndLaunchBrowser(tabId, url);
            });
            this.phishingNavSequenceDetector.resetDetector(tabId);
            const blockedPageURL = this.blockedPageController.blockNavigation(url, tabId);
            return this.redirectNavigation(tabId, blockedPageURL);
        };
        const blockWithNavSequence = (url, blockedNavSequence) => {
            log_1.log(`onBeforeRequest: blockWithNavSequence(${string_utils_1.toString({
                destURL: destURL,
                tabId: tabId,
                isNewTab: isNewTab,
                isRedirect: isRedirect,
                shouldOpenPhishingLinksInSecureBrowser: this.shouldOpenPhishingLinksInSecureBrowser
            })})`);
            if (!this.featureManager.isLinkProtectionEnabled) {
                log_1.log(`onBeforeRequest: blockWithNavSequence: link protection is not enabled`);
                return proceed();
            }
            if (this.shouldOpenPhishingLinksInSecureBrowser) {
                return this.launchBrowserAndCloseTab(tabId, url);
            }
            ifIncognitoTab(tabId, () => {
                this.closeTabAndLaunchBrowser(tabId, url);
            });
            this.phishingNavSequenceDetector.resetDetector(tabId);
            const blockedPageURL = this.blockedPageController.blockNavigationWithNavSequence(url, blockedNavSequence, tabId);
            return this.redirectNavigation(tabId, blockedPageURL);
        };
        const blockUntrusted = (url) => {
            log_1.log(`onBeforeRequest: blockUntrusted(${string_utils_1.toString({
                destURL: destURL,
                tabId: tabId,
                isNewTab: isNewTab,
                isRedirect: isRedirect
            })})`);
            if (!this.featureManager.isLinkProtectionEnabled) {
                log_1.log(`onBeforeRequest: blockUntrusted: link protection is not enabled`);
                return proceed();
            }
            const redirectURL = this.getRedirectURL(requestId);
            return this.launchBrowserAndCloseTab(tabId, url, redirectURL);
        };
        const blockFile = (fileURL) => {
            log_1.log(`onBeforeRequest: blockFile(${string_utils_1.toString({
                destURL: destURL,
                tabId: tabId,
                isNewTab: isNewTab,
                isRedirect: isRedirect
            })})`);
            if (!this.featureManager.isFileURLProtectionEnabled) {
                log_1.log(`onBeforeRequest: blockFile: file URL protection is not enabled`);
                return proceed();
            }
            ifIncognitoTab(tabId, () => {
                this.closeTabAndLaunchBrowser(tabId, fileURL);
            });
            this.phishingNavSequenceDetector.resetDetector(tabId);
            const blockedFilePageURL = this.fileBlocker.blockFile(fileURL, tabId);
            return this.redirectNavigation(tabId, blockedFilePageURL);
        };
        const blockUntrustedFile = (fileURL) => {
            log_1.log(`onBeforeRequest: blockUntrustedFile(${string_utils_1.toString({
                destURL: destURL,
                tabId: tabId,
                isNewTab: isNewTab,
                isRedirect: isRedirect
            })})`);
            if (!this.featureManager.isFileURLProtectionEnabled) {
                log_1.log(`onBeforeRequest: blockUntrustedFile: file URL protection is not enabled`);
                return proceed();
            }
            return this.launchBrowserAndCloseTab(tabId, fileURL);
        };
        const sendToExternalAppLinkPage = (url) => {
            log_1.log(`onBeforeRequest: sendToExternalAppLinkPage(${string_utils_1.toString({
                URL: url,
                tabId: tabId,
                isNewTab: isNewTab,
                isRedirect: isRedirect
            })})`);
            this.phishingNavSequenceDetector.resetDetector(tabId);
            const externalAppLinkURL = url_utils_1.URLToString(this.externalAppLinkController.getExternalAppLinkURL())
                + "?linkSpec=" + encodeURIComponent(url.toString())
                + "&externalAppName=unknown";
            return this.redirectNavigation(tabId, url_utils_1.parseUrl(externalAppLinkURL));
        };
        const isAuthRequest = this.isAuthRequest(srcURL, destURL);
        const isParentPhishingSourceSite = this.isPhishingSourceSite(parentURL);
        const isSrcPhishingSourceSite = this.isPhishingSourceSite(srcURL);
        const isDestPhishingSourceSite = this.isPhishingSourceSite(destURL);
        const isParentWebMailSite = this.isWebMailSite(parentURL);
        const isSrcWebMailSite = this.isWebMailSite(srcURL);
        const isDestWebMailSite = this.isWebMailSite(destURL);
        const shouldBlockNavigation = this.shouldBlockNavigation(isNewTab, isRedirect, httpMethod, srcURL, parentURL);
        const [isParentTrustedURL] = this.isTrustedURL(parentURL);
        const [isDestTrustedURL, isDestUntrustedURL] = this.isTrustedURL(destURL);
        const isDestUncategorizedURL = (maybe_1.some(destURL) && !isDestTrustedURL && !isDestUntrustedURL);
        const [isDestFileURL, isDestTrustedFileURL, isDestUntrustedFileURL] = this.isTrustedFileURL(destURL);
        const isDestBlockedPageURL = this.isBlockedPageURL(destURL);
        const isDestBlockedFilePageURL = this.isBlockedFilePageURL(destURL);
        const isDestExternalAppLinkURL = this.isExternalAppLinkURL(destURL);
        const isParentExternalAppLinkURL = this.isExternalAppLinkURL(parentURL);
        const isDestNewTabPageUrl = this.isNewTabPageUrl(destURL);
        const parentGroups = this.findGroups(parentURL);
        const destGroups = this.findGroups(destURL);
        const isSrcSameOrigin = this.isSameOrigin(srcURL, destURL);
        const isParentSameOrigin = this.isSameOrigin(parentURL, destURL);
        const isBlockedPageContinue = this.isBlockedPageContinueNavigation(srcURL, destURL);
        if (isDestExternalAppLinkURL) {
            this.detectedExternalAppLink(tabId);
        }
        const destURLCategory = nav_sequence_parser_1.categorizeUrl(isDestTrustedURL, isDestUntrustedURL, isDestPhishingSourceSite, isDestWebMailSite, isDestExternalAppLinkURL);
        if (isDestBlockedPageURL ||
            isDestBlockedFilePageURL) {
            this.phishingNavSequenceDetector.resetDetector(tabId);
        }
        if (considerParentTab) {
            this.detectedParentTab(tabId, parentURL, parentURLCategory, parentGroups);
        }
        const navSequenceDetections = (isRedirect ?
            this.detectPhishingNavSequenceOnRedirect(tabId, destURL, destURLCategory, destGroups) :
            this.detectPhishingNavSequenceOnNavigate(tabId, destURL, destURLCategory, destGroups, isNewTab, didUserCreateTab));
        const hasHigherPrecedenceThanBuiltin = this.hasHigherPrecedenceThanBuiltin(navSequenceDetections);
        const shouldAllowNavigation = (navSequenceDetections.shouldAllow ||
            navSequenceDetections.shouldPossiblyAllow ||
            navSequenceDetections.shouldPossiblyBlock) &&
            hasHigherPrecedenceThanBuiltin;
        log_1.log(`onBeforeRequest(${string_utils_1.toString({
            requestId: requestId,
            frameId: frameId,
            tabId: tabId,
            parentTabId: parentTabId,
            isNewTab: isNewTab,
            didUserCreateTab: didUserCreateTab,
            considerParentTab: considerParentTab,
            isRestoredSessionTab: isRestoredSessionTab,
            initiator: initiator,
            srcURL: srcURL,
            destURL: destURL,
            parentURL: parentURL,
            isRedirect: isRedirect,
            isAuthRequest: isAuthRequest,
            httpMethod: maybe_1.some(httpMethod) ? http_method_1.httpMethodTypeToString(httpMethod) : details.method,
            isSrcPhishingSourceSite: isSrcPhishingSourceSite,
            isDestPhishingSourceSite: isDestPhishingSourceSite,
            isParentPhishingSourceSite: isParentPhishingSourceSite,
            isSrcWebMailSite: isSrcWebMailSite,
            isDestWebMailSite: isDestWebMailSite,
            isParentWebMailSite: isParentWebMailSite,
            isDestTrustedURL: isDestTrustedURL,
            isDestUntrustedURL: isDestUntrustedURL,
            isDestUncategorizedURL: isDestUncategorizedURL,
            isParentTrustedURL: isParentTrustedURL,
            isDestBlockedPageURL: isDestBlockedPageURL,
            isDestBlockedFilePageURL: isDestBlockedFilePageURL,
            isDestExternalAppLinkPageURL: isDestExternalAppLinkURL,
            isParentExternalAppLinkPageURL: isParentExternalAppLinkURL,
            isDestNewTabPageUrl: isDestNewTabPageUrl,
            parentGroups: parentGroups,
            destGroups: destGroups,
            shouldBlockNavigation: shouldBlockNavigation,
            shouldAllowNavigation: shouldAllowNavigation,
            destURLCategory: nav_sequence_parser_1.urlCategoryToString(destURLCategory),
            parentURLCategory: nav_sequence_parser_1.urlCategoryToString(parentURLCategory),
            isSrcSameOrigin: isSrcSameOrigin,
            isParentSameOrigin: isParentSameOrigin,
            isBlockedPageContinue: isBlockedPageContinue,
            isBlockedNavSequence: navSequenceDetections.shouldBlock,
            isPossibleBlockedNavSequence: navSequenceDetections.shouldPossiblyBlock,
            isAllowedNavSequence: navSequenceDetections.shouldAllow,
            isPossibleAllowedNavSequence: navSequenceDetections.shouldPossiblyAllow,
            navSequenceDetectionsPrecedence: navSequenceDetections.precedence,
            hasHigherPrecedenceThanBuiltin: hasHigherPrecedenceThanBuiltin,
        })})`);
        if (maybe_1.some(destURL) && this.isEdgeExternalAppLinkNavigation(destURL)) {
            const targetURL = this.stripEdgeExternalAppLinkNavigationQueryParam(destURL);
            return sendToExternalAppLinkPage(targetURL);
        }
        if (this.isDormant) {
            log_1.log("Extension is in a dormant state so onBeforeRequest will return proceed()");
            return proceed();
        }
        if (isDestBlockedPageURL ||
            isDestBlockedFilePageURL ||
            isDestExternalAppLinkURL ||
            isDestNewTabPageUrl ||
            isBlockedPageContinue) {
            return proceed();
        }
        else if (isDestUntrustedURL) {
            return blockUntrusted(destURL);
        }
        else if (isDestFileURL) {
            if (isDestTrustedFileURL) {
                return proceed();
            }
            else if (isDestUntrustedFileURL) {
                return blockUntrustedFile(destURL);
            }
            else {
                return blockFile(destURL);
            }
        }
        else if (navSequenceDetections.shouldBlock &&
            hasHigherPrecedenceThanBuiltin) {
            return blockWithNavSequence(destURL, navSequenceDetections.blocked);
        }
        else if (navSequenceDetections.shouldAllow &&
            hasHigherPrecedenceThanBuiltin) {
            return proceed();
        }
        else if (this.promptForUncategorized &&
            isDestUncategorizedURL &&
            !isBlockedPageContinue) {
            return block(destURL);
        }
        else if (isNewTab && isRedirect) {
            log_1.logError(new Error(`onBeforeRequest: unexpected: ${string_utils_1.toString({
                destURL: destURL,
                tabId: tabId,
                isNewTab: isNewTab,
                isRedirect: isRedirect
            })}`));
            return proceed();
        }
        else if (isNewTab) {
            if (isRestoredSessionTab) {
                return proceed();
            }
            else if (shouldBlockNavigation &&
                !shouldAllowNavigation &&
                !isDestTrustedURL &&
                !isParentSameOrigin &&
                !didUserCreateTab) {
                return block(destURL);
            }
        }
        else if (isRedirect) {
            if (shouldBlockNavigation &&
                !shouldAllowNavigation &&
                !isAuthRequest &&
                !isDestTrustedURL &&
                !isSrcSameOrigin) {
                return block(destURL);
            }
        }
        else if (shouldBlockNavigation &&
            !navSequenceDetections.shouldAllow &&
            !navSequenceDetections.shouldPossiblyBlock &&
            !navSequenceDetections.shouldPossiblyAllow &&
            !isAuthRequest &&
            !isDestTrustedURL &&
            !isSrcSameOrigin) {
            return block(destURL);
        }
        if (navSequenceDetections.shouldBlock &&
            !hasHigherPrecedenceThanBuiltin) {
            return blockWithNavSequence(destURL, navSequenceDetections.blocked);
        }
        else if (navSequenceDetections.shouldAllow &&
            !hasHigherPrecedenceThanBuiltin) {
            return proceed();
        }
        return proceed();
    }
    onBeforeRedirect(details) {
        log_1.log(`onBeforeRedirect(${string_utils_1.toString(details)})`);
        this.pendingRedirects.add(details.requestId);
    }
    readContentTypeHeader(headers) {
        if (maybe_1.none(headers)) {
            return undefined;
        }
        const filteredHeaders = headers.filter((header) => {
            const headerType = nav_sequence_parser_1.parseHeaderType(header.name);
            return headerType === nav_sequence_parser_1.HttpHeaderType.contentType;
        });
        if (filteredHeaders.length !== 1) {
            return undefined;
        }
        const contentTypeHeader = array_utils_1.first(filteredHeaders);
        return contentTypeHeader.value;
    }
    readContentType(contentTypeHeader) {
        if (maybe_1.none(contentTypeHeader)) {
            return undefined;
        }
        return content_type_1.parseContentType(contentTypeHeader);
    }
    isPDFContentType(contentType) {
        if (maybe_1.none(contentType)) {
            return false;
        }
        return contentType === content_type_1.ContentType.pdf;
    }
    onHeadersReceived(details) {
        const requestId = details.requestId;
        const tabId = details.tabId;
        const url = url_utils_1.parseUrl(details.url);
        const headers = details.responseHeaders;
        const contentTypeHeader = this.readContentTypeHeader(headers);
        const contentType = this.readContentType(contentTypeHeader);
        const isPDFContentType = this.isPDFContentType(contentType);
        const urlCategory = this.categorizeURL(url);
        const groups = this.findGroups(url);
        const navSequenceDetections = this.detectPhishingNavSequenceOnContentType(tabId, url, urlCategory, groups, contentType);
        log_1.log(`onHeadersReceived: ${string_utils_1.toString({
            requestId: requestId,
            tabId: tabId,
            url: url,
            contentTypeHeader: contentTypeHeader,
            contentType: maybe_1.some(contentType) ? content_type_1.contentTypeToString(contentType) : contentTypeHeader,
            isPDFContentType: isPDFContentType,
            urlCategory: nav_sequence_parser_1.urlCategoryToString(urlCategory),
            groups: groups,
            shouldBlock: navSequenceDetections.shouldBlock,
            shouldAllow: navSequenceDetections.shouldAllow,
            shouldPossiblyBlock: navSequenceDetections.shouldPossiblyBlock,
            shouldPossiblyAllow: navSequenceDetections.shouldPossiblyAllow,
        })}`);
        const proceed = () => {
            log_1.log(`onHeadersReceived: proceed: ${string_utils_1.toString({
                tabId: tabId,
                url: url,
                isPDFContentType: isPDFContentType
            })}`);
            return this.continueNavigation();
        };
        const block = (phishingNavSequence) => {
            log_1.log(`onHeadersReceived: block: ${string_utils_1.toString({
                tabId: tabId,
                url: url,
                isPDFContentType: isPDFContentType
            })}`);
            if (!this.featureManager.isPDFProtectionEnabled) {
                log_1.log(`onHeadersReceived: block: PDF protection is not enabled`);
                return proceed();
            }
            if (this.shouldOpenPhishingLinksInSecureBrowser) {
                if (isPDFContentType) {
                    const redirectURL = this.getRedirectURL(requestId);
                    return this.launchBrowserAndCloseTab(tabId, url, redirectURL);
                }
                else {
                    return this.launchBrowserAndCloseTab(tabId, url);
                }
            }
            this.phishingNavSequenceDetector.resetDetector(tabId);
            const blockedPageURL = this.blockedPageController.blockContentType(url, contentTypeHeader, phishingNavSequence, tabId);
            return this.redirectNavigation(tabId, blockedPageURL);
        };
        if (this.isDormant) {
            log_1.log("Extension is in a dormant state so onHeadersReceived will return proceed()");
            return proceed();
        }
        if (navSequenceDetections.shouldBlock) {
            return block(navSequenceDetections.blocked);
        }
        else {
            return proceed();
        }
    }
    onCompleted(details) {
        this.redirectBackToSrcInfo.delete(details.requestId);
    }
    onErrorOccurred(details) {
        this.redirectBackToSrcInfo.delete(details.requestId);
    }
    registerListeners() {
        const mainFrameFilter = 'main_frame';
        const filter = {
            urls: web_request_listener_filter_1.getWebRequestListenerUrlFilter(this.browser),
            types: [mainFrameFilter]
        };
        log_1.log(`WebRequestListener.registerListeners: ${string_utils_1.toString({
            browser: browser_1.browserToString(this.browser),
            filter
        })}`);
        if (!chrome.webRequest.onBeforeRequest.hasListener(this.onBeforeRequestCB)) {
            chrome.webRequest.onBeforeRequest.addListener(this.onBeforeRequestCB, filter, ['blocking', 'requestBody']);
        }
        if (!chrome.webRequest.onBeforeRedirect.hasListener(this.onBeforeRedirectCB)) {
            chrome.webRequest.onBeforeRedirect.addListener(this.onBeforeRedirectCB, filter);
        }
        if (!chrome.webRequest.onHeadersReceived.hasListener(this.onHeadersReceivedCB)) {
            chrome.webRequest.onHeadersReceived.addListener(this.onHeadersReceivedCB, filter, ['blocking', 'responseHeaders']);
        }
        if (!chrome.webRequest.onCompleted.hasListener(this.onCompletedCB)) {
            chrome.webRequest.onCompleted.addListener(this.onCompletedCB, filter);
        }
        if (!chrome.webRequest.onErrorOccurred.hasListener(this.onErrorOccurredCB)) {
            chrome.webRequest.onErrorOccurred.addListener(this.onErrorOccurredCB, filter);
        }
        chrome.webRequest.handlerBehaviorChanged();
    }
    removeListeners() {
        chrome.webRequest.onBeforeRequest.removeListener(this.onBeforeRequestCB);
        chrome.webRequest.onBeforeRedirect.removeListener(this.onBeforeRedirectCB);
        chrome.webRequest.onHeadersReceived.removeListener(this.onHeadersReceivedCB);
        chrome.webRequest.onCompleted.removeListener(this.onCompletedCB);
        chrome.webRequest.onErrorOccurred.removeListener(this.onErrorOccurredCB);
        chrome.webRequest.handlerBehaviorChanged();
    }
}
exports.WebRequestListener = WebRequestListener;


/***/ }),
/* 92 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function isTrue(value) {
    return value === true;
}
exports.isTrue = isTrue;
function isFalse(value) {
    return value === false;
}
exports.isFalse = isFalse;


/***/ }),
/* 93 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function unused(arg) {
}
exports.unused = unused;


/***/ }),
/* 94 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.builtinRules = {
    "version": 1,
    "builtinRulesPrecedence": 10,
    "seqs": [
        {
            "seq": [
                ["parentTab", "$gmail"],
                ["navigateTo", "https://accounts.google.com"]
            ],
            "metadata": {
                "precedence": 11,
                "allow": true,
                "block": false,
                "navigateTo": 3
            }
        },
        {
            "seq": [
                ["parentTab", "$gmail"],
                ["navigateTo", "https://hangouts.google.com"]
            ],
            "metadata": {
                "precedence": 12,
                "allow": true,
                "block": false,
                "navigateTo": 3
            }
        },
        {
            "seq": [
                ["parentTab", "$gmail"],
                ["navigateTo", "https://www.google.com"],
                ["navOrRedirectTo", "<uncategorizedUrl>"]
            ],
            "metadata": {
                "precedence": 13,
                "allow": false,
                "block": true,
                "navigateTo": 3
            }
        },
        {
            "seq": [
                ["navigateTo", "<externalAppLink>"],
                ["navigateTo", "<webMailSiteUrl>"]
            ],
            "metadata": {
                "precedence": 14,
                "allow": true,
                "block": false,
                "navigateTo": 2
            }
        },
        {
            "seq": [
                ["parentTab", "<webMailSiteUrl>"],
                ["navigateTo", "<uncategorizedUrl>"]
            ],
            "metadata": {
                "precedence": 9,
                "allow": false,
                "block": true,
                "navigateTo": 4
            }
        },
        {
            "seq": [
                ["parentTab", "<webMailSiteUrl>"],
                ["navigateTo", "<trustedUrl>"],
                ["repeat", "redirectTo", "not", "<untrustedUrl>"],
                ["redirectTo", "<uncategorizedUrl>"]
            ],
            "metadata": {
                "precedence": 8,
                "allow": false,
                "block": true,
                "navigateTo": 4
            }
        },
        {
            "seq": [
                ["navigateTo", "<externalAppLink>"],
                ["navigateTo", "<trustedUrl>"],
                ["repeat", "redirectTo", "not", "<untrustedUrl>"],
                ["redirectTo", "<uncategorizedUrl>"]
            ],
            "metadata": {
                "precedence": 5,
                "allow": false,
                "block": true,
                "navigateTo": 4
            }
        },
        {
            "seq": [
                ["navigateTo", "<externalAppLink>"],
                ["navigateTo", "$navigatingEmailRewriter"],
                ["navigateTo", "<uncategorizedUrl>"]
            ],
            "metadata": {
                "precedence": 6,
                "allow": false,
                "block": true,
                "navigateTo": 3
            }
        },
        {
            "seq": [
                ["navigateTo", "<externalAppLink>"],
                ["navigateTo", "not", "<trustedUrl>"]
            ],
            "metadata": {
                "precedence": 7,
                "allow": false,
                "block": true,
                "navigateTo": 2
            }
        },
        {
            "seq": [
                ["navOrRedirectTo", "not", "<trustedUrl>"],
                ["navigateTo", "not", "<trustedUrl>"],
                ["Content-Type", "application/pdf"]
            ],
            "metadata": {
                "precedence": 2,
                "allow": false,
                "block": true,
                "navigateTo": 2
            }
        },
        {
            "seq": [
                ["navOrRedirectTo", "not", "<trustedUrl>"],
                ["repeat", "redirectTo", "not", "<untrustedUrl>"],
                ["redirectTo", "not", "<trustedUrl>"],
                ["Content-Type", "application/pdf"]
            ],
            "metadata": {
                "precedence": 1,
                "allow": false,
                "block": true,
                "navigateTo": 3,
                "requiresUserClick": 2
            }
        },
        {
            "seq": [
                ["parentTab", "not", "<trustedUrl>"],
                ["navigateTo", "not", "<trustedUrl>"],
                ["Content-Type", "application/pdf"]
            ],
            "metadata": {
                "precedence": 4,
                "allow": false,
                "block": true,
                "navigateTo": 2
            }
        },
        {
            "seq": [
                ["parentTab", "not", "<trustedUrl>"],
                ["navigateTo", "not", "<trustedUrl>"],
                ["repeat", "redirectTo", "not", "<untrustedUrl>"],
                ["redirectTo", "not", "<trustedUrl>"],
                ["Content-Type", "application/pdf"]
            ],
            "metadata": {
                "precedence": 3,
                "allow": false,
                "block": true,
                "navigateTo": 4,
                "requiresUserClick": 2
            }
        }
    ]
};


/***/ }),
/* 95 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const maybe_1 = __webpack_require__(0);
const browser_1 = __webpack_require__(6);
const origin_1 = __webpack_require__(9);
const log_1 = __webpack_require__(1);
const string_utils_1 = __webpack_require__(3);
function getWebRequestListenerUrlFilter(browser) {
    const getDefaultUrlFilter = () => {
        return ["<all_urls>"];
    };
    const getEdgeUrlFilter = () => {
        const edgeMajorVersion = browser_1.findEdgeMajorVersion();
        log_1.log(`getEdgeUrlFilter: ${string_utils_1.toString({
            edgeMajorVersion
        })}`);
        if (maybe_1.none(edgeMajorVersion)) {
            return getDefaultUrlFilter();
        }
        if (edgeMajorVersion === 15) {
            const makeUrlSchemeFilter = (...schemes) => {
                return schemes.map(scheme => `${scheme}//*/*`);
            };
            return makeUrlSchemeFilter(origin_1.Scheme.WILDCARD_SOME);
        }
        return getDefaultUrlFilter();
    };
    if (maybe_1.none(browser)) {
        return getDefaultUrlFilter();
    }
    const browserUrlFilters = new Map([
        [browser_1.Browser.chrome, getDefaultUrlFilter],
        [browser_1.Browser.firefox, getDefaultUrlFilter],
        [browser_1.Browser.edge, getEdgeUrlFilter],
        [browser_1.Browser.edgeChromium, getDefaultUrlFilter]
    ]);
    const getUrlFilter = browserUrlFilters.get(browser);
    if (maybe_1.none(getUrlFilter)) {
        return getDefaultUrlFilter();
    }
    return getUrlFilter();
}
exports.getWebRequestListenerUrlFilter = getWebRequestListenerUrlFilter;


/***/ }),
/* 96 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const origin_1 = __webpack_require__(9);
const url_utils_1 = __webpack_require__(4);
const config_keys_1 = __webpack_require__(7);
const maybe_1 = __webpack_require__(0);
const message_types_1 = __webpack_require__(2);
const messages_1 = __webpack_require__(5);
const log_1 = __webpack_require__(1);
const popup_page_controller_1 = __webpack_require__(56);
const originMatcherOptions = new origin_1.OriginParseOptions({ allowWildcards: true, allowMissingWildcardScheme: true });
const originHashOptions = new origin_1.OriginHashOptions({ ignoreHttpHttpsDifference: true, ignorePort: true });
class TrustedUrlTracker {
    constructor(configNotifier, messageSender) {
        this.messageSender = messageSender;
        this.trustedOrigins = new origin_1.OriginMatcher();
        this.untrustedOrigins = new origin_1.OriginMatcher();
        this.pendingReputableSites = [];
        this.reputableOrigins = new origin_1.OriginExpiryMatcher();
        this.userTrustedOrigins = origin_1.makeOriginSet(originHashOptions);
        this.userUntrustedOrigins = origin_1.makeOriginSet(originHashOptions);
        this.prioritiseTrustedSites = false;
        configNotifier.addConfigListenerForKeys((key, config) => this.onConfigChanged(key, config), [
            config_keys_1.ConfigKey.trustedUrls,
            config_keys_1.ConfigKey.untrustedUrls,
            config_keys_1.ConfigKey.userTrustedOrigins,
            config_keys_1.ConfigKey.userUntrustedOrigins,
            config_keys_1.ConfigKey.prioritiseTrustedSites,
            config_keys_1.ConfigKey.reputableUrls
        ]);
        this.sbxTrustedOrigins = origin_1.parseOriginMatcher([
            popup_page_controller_1.sureClickAdvancedHelpHostname,
            popup_page_controller_1.sureClickHelpHostname,
            popup_page_controller_1.bromiumHelpHostname,
        ]);
    }
    onConfigChanged(key, config) {
        switch (key) {
            case config_keys_1.ConfigKey.trustedUrls:
                this.trustedOrigins = origin_1.parseOriginMatcher(config.trustedUrls, originMatcherOptions);
                break;
            case config_keys_1.ConfigKey.untrustedUrls:
                this.untrustedOrigins = origin_1.parseOriginMatcher(config.untrustedUrls, originMatcherOptions);
                break;
            case config_keys_1.ConfigKey.userTrustedOrigins:
                this.userTrustedOrigins = origin_1.parseOriginSet(config.userTrustedOrigins, originHashOptions);
                break;
            case config_keys_1.ConfigKey.userUntrustedOrigins:
                this.userUntrustedOrigins = origin_1.parseOriginSet(config.userUntrustedOrigins, originHashOptions);
                break;
            case config_keys_1.ConfigKey.prioritiseTrustedSites:
                this.prioritiseTrustedSites = config.prioritiseTrustedSites;
                break;
            case config_keys_1.ConfigKey.reputableUrls:
                this.updateReputation(config);
                break;
        }
    }
    updateReputation(config) {
        const index = config.reputableSites.index;
        if (index === 0) {
            this.pendingReputableSites = [];
        }
        let length = this.pendingReputableSites.length;
        if (length !== index) {
            log_1.logError(new Error(`Reputable site index mismatch: index=${index} length=${length}`));
            return;
        }
        this.pendingReputableSites = this.pendingReputableSites.concat(config.reputableSites.reputableSites);
        length = this.pendingReputableSites.length;
        const total = config.reputableSites.total;
        if (length > total) {
            log_1.logError(new Error(`Reputable site length mismatch: total=${total} length=${length}`));
            return;
        }
        if (length === total) {
            this.reputableOrigins = origin_1.parseOriginExpiryMatcher(this.pendingReputableSites, originMatcherOptions);
        }
    }
    trustUrl(url, trust) {
        const origin = origin_1.parseOrigin(url);
        if (maybe_1.none(origin)) {
            return;
        }
        this.trustOrigin(origin, trust);
    }
    trustOrigin(origin, trust) {
        if (trust) {
            if (!this.userTrustedOrigins.add(origin)) {
                return;
            }
            const request = new messages_1.AddUserTrustedOriginV1(origin.toString());
            this.messageSender.sendMessage(message_types_1.MessageType.addUserTrustedOriginV1, request);
        }
        else {
            if (!this.userUntrustedOrigins.add(origin)) {
                return;
            }
            const request = new messages_1.AddUserUntrustedOriginV1(origin.toString());
            this.messageSender.sendMessage(message_types_1.MessageType.addUserUntrustedOriginV1, request);
        }
    }
    isTrustedUrl(url) {
        if (url_utils_1.isExtensionUrl(url)) {
            return true;
        }
        if (url_utils_1.isBrowserUrl(url)) {
            return true;
        }
        const origin = origin_1.parseOrigin(url);
        if (maybe_1.none(origin)) {
            return undefined;
        }
        if (this.sbxTrustedOrigins.has(origin)) {
            return true;
        }
        const handleUntrustedOrigin = () => {
            if (this.untrustedOrigins.has(origin)) {
                return false;
            }
            return undefined;
        };
        const handleTrustedOrigin = () => {
            if (this.trustedOrigins.has(origin)) {
                return true;
            }
            return undefined;
        };
        const handleUserUntrustedOrigin = () => {
            if (this.userUntrustedOrigins.has(origin)) {
                return false;
            }
            return undefined;
        };
        const handleUserTrustedOrigin = () => {
            if (this.userTrustedOrigins.has(origin)) {
                return true;
            }
            return undefined;
        };
        const handleReputableOrigin = () => {
            if (this.reputableOrigins.has(origin)) {
                return true;
            }
            return undefined;
        };
        const originHandlers = this.prioritiseTrustedSites ? [
            handleTrustedOrigin,
            handleUntrustedOrigin,
            handleUserTrustedOrigin,
            handleUserUntrustedOrigin,
            handleReputableOrigin
        ] : [
            handleUntrustedOrigin,
            handleTrustedOrigin,
            handleUserUntrustedOrigin,
            handleUserTrustedOrigin,
            handleReputableOrigin
        ];
        for (const originHandler of originHandlers) {
            const result = originHandler();
            if (maybe_1.some(result)) {
                return result;
            }
        }
        return undefined;
    }
}
exports.TrustedUrlTracker = TrustedUrlTracker;


/***/ }),
/* 97 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class HandshakenEvent {
    constructor(negotiatedVersion) {
        this.negotiatedVersion = negotiatedVersion;
    }
}
exports.HandshakenEvent = HandshakenEvent;


/***/ }),
/* 98 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const number_utils_1 = __webpack_require__(10);
class Range {
    constructor(min, max) {
        this.min = min;
        this.max = max;
    }
    contains(value) {
        return number_utils_1.isInRange(value, this.min, this.max);
    }
}
exports.Range = Range;


/***/ }),
/* 99 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const i18n_1 = __webpack_require__(31);
function isSureClick() {
    const name = i18n_1.getI18n(i18n_1.I18nMessages.name);
    return name.startsWith("HP");
}
exports.isSureClick = isSureClick;


/***/ }),
/* 100 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const maybe_1 = __webpack_require__(0);
const url_utils_1 = __webpack_require__(4);
const origin_1 = __webpack_require__(9);
const config_keys_1 = __webpack_require__(7);
const phishing_source_sites_1 = __webpack_require__(50);
const config_1 = __webpack_require__(25);
function maybeIsSameUrl(a, b) {
    if (b === undefined) {
        return false;
    }
    return url_utils_1.isSameUrl(a, b, url_utils_1.UrlCompareOptions.IgnoreSearchParams);
}
class PlacementManager {
    constructor(trustedUrlTracker, fileUrlTracker, newTabPageUrlTracker, configNotifier) {
        this.trustedUrlTracker = trustedUrlTracker;
        this.fileUrlTracker = fileUrlTracker;
        this.newTabPageUrlTracker = newTabPageUrlTracker;
        this.shouldOpenPhishingLinksInSecureBrowser = false;
        this.phishingSourceSites = new phishing_source_sites_1.EmptyPhishingSourceSites();
        configNotifier.addConfigListenerForKeys((key, config) => this.onConfigChanged(key, config), [
            config_keys_1.ConfigKey.phishingSourceSites,
            config_keys_1.ConfigKey.openPhishingLinksInSecureBrowser
        ]);
    }
    onConfigChanged(key, config) {
        switch (key) {
            case config_keys_1.ConfigKey.phishingSourceSites: {
                if (maybe_1.some(config.phishingSourceSites)) {
                    if (config.phishingSourceSites.version === config_1.Config.phishingSourceSitesVersion()) {
                        this.phishingSourceSites = new phishing_source_sites_1.PhishingSourceSites(config.phishingSourceSites);
                    }
                }
                break;
            }
            case config_keys_1.ConfigKey.openPhishingLinksInSecureBrowser: {
                this.shouldOpenPhishingLinksInSecureBrowser = config.openPhishingLinksInSecureBrowser;
                break;
            }
            default:
                break;
        }
    }
    isNewTabPageUrl(url) {
        return this.newTabPageUrlTracker.isNewTabPageUrl(url);
    }
    isTrustedUrl(url) {
        return this.trustedUrlTracker.isTrustedUrl(url);
    }
    isTrustedFileUrl(fileUrl) {
        return this.fileUrlTracker.isFileUrlTrusted(fileUrl);
    }
    isPhishingSourceSite(url) {
        const origin = origin_1.parseOrigin(url);
        if (maybe_1.none(origin)) {
            return undefined;
        }
        return this.phishingSourceSites.isPhishingSourceSite(origin);
    }
    isWebMailSite(url) {
        const origin = origin_1.parseOrigin(url);
        if (maybe_1.none(origin)) {
            return undefined;
        }
        return this.phishingSourceSites.isWebMailSite(origin);
    }
    siteRequiresAuth(url) {
        const origin = origin_1.parseOrigin(url);
        if (maybe_1.none(origin)) {
            return undefined;
        }
        return this.phishingSourceSites.siteRequiresAuth(origin);
    }
    isAuthSite(url) {
        const origin = origin_1.parseOrigin(url);
        if (maybe_1.none(origin)) {
            return undefined;
        }
        return this.phishingSourceSites.isAuthSite(origin);
    }
    findGroups(url) {
        const origin = origin_1.parseOrigin(url);
        if (maybe_1.none(origin)) {
            return undefined;
        }
        return this.phishingSourceSites.findGroups(origin);
    }
    shouldBlockNavigation(tabType, navType, methodType, url) {
        const origin = origin_1.parseOrigin(url);
        if (maybe_1.none(origin)) {
            return undefined;
        }
        return this.phishingSourceSites.shouldBlockNavigation(tabType, navType, methodType, origin);
    }
}
exports.PlacementManager = PlacementManager;


/***/ }),
/* 101 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const url_utils_1 = __webpack_require__(4);
const maybe_1 = __webpack_require__(0);
const id_generator_1 = __webpack_require__(19);
const message_types_1 = __webpack_require__(2);
const messages_1 = __webpack_require__(5);
const promise_utils_1 = __webpack_require__(13);
const log_1 = __webpack_require__(1);
const string_utils_1 = __webpack_require__(3);
const blocked_page_options_1 = __webpack_require__(53);
const host_constants_1 = __webpack_require__(12);
const page_port_resolver_1 = __webpack_require__(39);
const page_port_controller_1 = __webpack_require__(24);
const url_encoder_1 = __webpack_require__(62);
const config_keys_1 = __webpack_require__(7);
const event_dispatcher_1 = __webpack_require__(20);
const history_1 = __webpack_require__(28);
const content_type_1 = __webpack_require__(37);
const protocol_versions_1 = __webpack_require__(14);
class BlockedPagePageController {
    constructor(tabId, port, onConfigured, onTrustUrl, onDisconnect, messageSender, configNotifier, handshaker) {
        this.tabId = tabId;
        this.port = port;
        this.onTrustUrl = onTrustUrl;
        this.onDisconnect = onDisconnect;
        this.messageSender = messageSender;
        this.handshaker = handshaker;
        this.isConsumerProduct = false;
        configNotifier.addConfigListenerForKeys((key, config) => this.onConfigChanged(key, config), [config_keys_1.ConfigKey.isConsumerProduct]);
        this.pagePortController = new page_port_controller_1.PagePortController(tabId, port, (port) => this.onPageConnected(port), (port) => this.onPageDisconnnected(port), onConfigured);
        this.pagePortController.registerMessageHandler(message_types_1.MessageType.trustUrlV8, (message) => this.handleTrustUrl(message));
        this.pagePortController.connect();
    }
    onPageConnected(port) { }
    onPageDisconnnected(port) {
        this.onDisconnect(port);
    }
    onConfigChanged(key, config) {
        switch (key) {
            case config_keys_1.ConfigKey.isConsumerProduct:
                this.isConsumerProduct = config.isConsumerProduct;
                break;
        }
    }
    sendDontAskAgain(protocolVersion) {
        if (protocol_versions_1.isMessageTypeSupported(message_types_1.MessageType.dontAskAgainV9, protocolVersion)) {
            this.messageSender.sendMessage(message_types_1.MessageType.dontAskAgainV9, new messages_1.DontAskAgainV9(true));
        }
        else if (protocol_versions_1.isMessageTypeSupported(message_types_1.MessageType.dontAskAgainV8, protocolVersion)) {
            this.messageSender.sendMessage(message_types_1.MessageType.dontAskAgainV8, new messages_1.DontAskAgainV8());
        }
        else {
            log_1.logError(new Error(`User has chosen "Don't ask me agagin" but the protocol version doesn't ` +
                `support the DontAskAgain messages: "${protocolVersion}"`));
        }
    }
    handleTrustUrl(message) {
        const trustUrlMessage = message.payload;
        const contentType = content_type_1.parseRawContentType(trustUrlMessage.contentType);
        const navigateToURL = url_utils_1.parseUrl(trustUrlMessage.navigateToUrlSpec);
        const blockedURL = url_utils_1.parseUrl(trustUrlMessage.blockedUrlSpec);
        if (maybe_1.some(navigateToURL) && maybe_1.some(blockedURL)) {
            this.onTrustUrl(trustUrlMessage.trustUrl, trustUrlMessage.rememberDecision, navigateToURL, blockedURL, this.tabId, contentType);
        }
        if (trustUrlMessage.dontAskAgain && this.isConsumerProduct) {
            if (this.handshaker.isHandshaken && maybe_1.some(this.handshaker.negotiatedVersion)) {
                this.sendDontAskAgain(this.handshaker.negotiatedVersion);
            }
            else {
                this.handshaker.onHandshaken.registerEventHandler(event => this.sendDontAskAgain(event.negotiatedVersion));
            }
        }
    }
}
class BrowserLaunchEvent {
    constructor(urlSpec, id, didLaunch) {
        this.urlSpec = urlSpec;
        this.id = id;
        this.didLaunch = didLaunch;
    }
}
exports.BrowserLaunchEvent = BrowserLaunchEvent;
class BrowserLauncher {
    constructor(messageRouter, messageSender, handshaker) {
        this.messageSender = messageSender;
        this.handshaker = handshaker;
        this.pendingRequests = new Map();
        this.eventDispatcher = new event_dispatcher_1.EventDispatcher();
        this.idGenerator = new id_generator_1.IdGenerator();
        const blockedPageSpec = chrome.runtime.getURL(host_constants_1.hostConstants.blockedPage);
        const blockedPageURL = url_utils_1.parseUrl(blockedPageSpec);
        if (maybe_1.none(blockedPageURL)) {
            throw new Error(`Failed to parse blockedPageURL ${blockedPageSpec}`);
        }
        this.blockedPageURL = blockedPageURL;
        messageRouter.registerMessageHandler(message_types_1.MessageType.launchBrowserResponseV1, (message) => this.onLaunchBrowserResponse(message));
    }
    registerEventHandler(eventHandler) {
        this.eventDispatcher.registerEventHandler(eventHandler);
    }
    onLaunchBrowserResponse(message) {
        const response = message.payload;
        const id = response.id;
        const onBrowserLaunchResponse = this.pendingRequests.get(id);
        if (maybe_1.none(onBrowserLaunchResponse)) {
            log_1.logError(new Error(`Unexpected launch browser response: ${string_utils_1.toString(response)}`));
            return;
        }
        log_1.log(`BrowserLauncher.onLaunchBrowserResponse: ${string_utils_1.toString(response)}`);
        onBrowserLaunchResponse(response.urlSpec, response.didLaunch);
        this.pendingRequests.delete(id);
        this.eventDispatcher.dispatchEvent(new BrowserLaunchEvent(response.urlSpec, response.id, response.didLaunch));
    }
    canLaunchBrowser(url) {
        if (this.handshaker.isHandshaken) {
            return true;
        }
        else {
            return false;
        }
    }
    launchBrowser(url, onBrowserLaunchResponse) {
        if (this.handshaker.isHandshaken) {
            const id = this.idGenerator.generateId();
            const message = new messages_1.LaunchBrowserRequestV1(url_utils_1.URLToString(url), id);
            this.messageSender.sendMessage(message_types_1.MessageType.launchBrowserRequestV1, message);
            this.pendingRequests.set(id, onBrowserLaunchResponse);
            return true;
        }
        else {
            log_1.logError(new Error(`Not handshaken so not sending launch browser message for url=<${url}>`));
            return false;
        }
    }
    launchBrowserAndCloseTabOrNavigateTab(tabId, url, closeTab = true) {
        const failOpen = () => {
            chrome.tabs.update(tabId, { url: url_utils_1.URLToString(url) });
        };
        const displayLaunchedPage = () => {
            log_1.log(`BrowserLauncher.launchBrowserAndCloseTabOrNavigateTab: Displaying launched page for tab ${tabId} ` +
                `rather than closing because it is the only tab.`);
            const urlEncoder = new url_encoder_1.UrlEncoder(this.blockedPageURL);
            urlEncoder.addUrlQueryParam(blocked_page_options_1.OptionNames.launchedSpec, url);
            const blockedPageURL = urlEncoder.encodeUrl();
            if (maybe_1.some(blockedPageURL)) {
                chrome.tabs.update(tabId, { url: url_utils_1.URLToString(blockedPageURL) });
            }
            else {
                failOpen();
            }
        };
        const onBrowserLaunchResponse = (urlSpec, didLaunch) => {
            if (didLaunch) {
                if (closeTab) {
                    chrome.tabs.query({}, (tabs) => {
                        if (tabs.length > 1) {
                            this.closeTab(tabId);
                        }
                        else {
                            displayLaunchedPage();
                        }
                    });
                }
                return;
            }
            failOpen();
        };
        if (!this.launchBrowser(url, onBrowserLaunchResponse)) {
            failOpen();
        }
    }
    onTabClosed(tabId) {
        log_1.log(`BrowserLauncher.onTabClosed: tabId: ${tabId}`);
    }
    closeTab(tabId) {
        chrome.tabs.remove(tabId, () => this.onTabClosed(tabId));
    }
}
exports.BrowserLauncher = BrowserLauncher;
class BlockedPageController {
    constructor(browser, trustedURLTracker, browserLauncher, configNotifier, handshaker, onConfigured, messageSender) {
        this.browser = browser;
        this.trustedURLTracker = trustedURLTracker;
        this.browserLauncher = browserLauncher;
        this.configNotifier = configNotifier;
        this.handshaker = handshaker;
        this.onConfigured = onConfigured;
        this.messageSender = messageSender;
        this.blockedPageControllers = new Map();
        this.rememberDecisionsDefault = false;
        this.isConsumerProduct = false;
        this.idGenerator = new id_generator_1.IdGenerator();
        configNotifier.addConfigListenerForKeys((key, config) => this.onConfigChanged(key, config), [
            config_keys_1.ConfigKey.promptForUncategorized,
            config_keys_1.ConfigKey.isConsumerProduct,
            config_keys_1.ConfigKey.blockedPageLearnMoreURL
        ]);
        const blockedPageSpec = chrome.runtime.getURL(host_constants_1.hostConstants.blockedPage);
        const blockedPageURL = url_utils_1.parseUrl(blockedPageSpec);
        if (maybe_1.none(blockedPageURL)) {
            throw new Error(`Failed to parse blockedPageURL ${blockedPageSpec}`);
        }
        this.blockedPageURL = blockedPageURL;
        this.portResolver = page_port_resolver_1.getBrowserSpecificExtensionPagePortResolver(this.browser, host_constants_1.hostConstants.blockedPagePortName, (tabId, port) => this.onUnresolvedPortConnected(tabId, port), (url) => this.isBlockedPageURL(url));
    }
    onConfigChanged(key, config) {
        switch (key) {
            case config_keys_1.ConfigKey.promptForUncategorized:
                this.rememberDecisionsDefault = config.promptForUncategorized;
                break;
            case config_keys_1.ConfigKey.isConsumerProduct:
                this.isConsumerProduct = config.isConsumerProduct;
                break;
            case config_keys_1.ConfigKey.blockedPageLearnMoreURL:
                this.learnMoreURL = config.blockedPageLearnMoreURL;
                break;
        }
    }
    onUnresolvedPortConnected(tabId, port) {
        this.addBlockedPageController(tabId, promise_utils_1.makePromise(() => port));
    }
    isBlockedPageURL(url) {
        if (url === undefined) {
            return false;
        }
        return url_utils_1.isSameUrl(url, this.blockedPageURL, url_utils_1.UrlCompareOptions.IgnoreSearchParams);
    }
    makeBlockedPageURL(navigateToURL, blockedURL, contentType) {
        const urlEncoder = new url_encoder_1.UrlEncoder(this.blockedPageURL);
        urlEncoder.addUrlQueryParam(blocked_page_options_1.OptionNames.navigateToSpec, navigateToURL);
        urlEncoder.addUrlQueryParam(blocked_page_options_1.OptionNames.blockedSpec, blockedURL);
        if (maybe_1.some(contentType)) {
            urlEncoder.addQueryParam(blocked_page_options_1.OptionNames.contentType, contentType);
        }
        if (this.rememberDecisionsDefault) {
            urlEncoder.addQueryParam(blocked_page_options_1.OptionNames.rememberDecisionsDefault, "true");
        }
        if (this.isConsumerProduct) {
            urlEncoder.addQueryParam(blocked_page_options_1.OptionNames.isConsumerProduct, "true");
        }
        if (maybe_1.some(this.learnMoreURL)) {
            urlEncoder.addQueryParam(blocked_page_options_1.OptionNames.learnMoreURL, this.learnMoreURL);
        }
        const blockedPageURL = urlEncoder.encodeUrl();
        if (maybe_1.none(blockedPageURL)) {
            return this.blockedPageURL;
        }
        return blockedPageURL;
    }
    addBlockedPageController(tabId, port) {
        const id = this.idGenerator.generateId();
        const controller = new BlockedPagePageController(tabId, port, this.onConfigured, (trustURL, rememberDecision, navigateToURL, blockedURL, tabId, contentType) => this.trustURL(trustURL, rememberDecision, navigateToURL, blockedURL, tabId, contentType, id), port => this.onPageDisconnected(port, id), this.messageSender, this.configNotifier, this.handshaker);
        this.blockedPageControllers.set(id, controller);
    }
    onPageDisconnected(port, id) {
        this.blockedPageControllers.delete(id);
        history_1.removeExtensionPageFromHistoryAfterClosing(this.browser, port);
    }
    trustURL(trustURL, rememberDecision, navigateToURL, blockedURL, tabId, contentType, id) {
        const controller = this.blockedPageControllers.get(id);
        if (maybe_1.none(controller) ||
            maybe_1.none(navigateToURL) || !url_utils_1.isURL(navigateToURL) ||
            maybe_1.none(blockedURL) || !url_utils_1.isURL(blockedURL)) {
            log_1.logError(new Error(`NavigationBlocker.trustURL: invalid parameters: ${string_utils_1.toString({
                trustURL: trustURL,
                trustURLPermanently: rememberDecision,
                navigateToURL: navigateToURL,
                blockedURL: blockedURL,
                tabId: tabId,
            })}`));
            return;
        }
        if (rememberDecision) {
            this.trustedURLTracker.trustUrl(blockedURL, trustURL);
        }
        if (!trustURL) {
            const shouldCloseTab = contentType !== content_type_1.ContentType.pdf;
            this.browserLauncher.launchBrowserAndCloseTabOrNavigateTab(tabId, navigateToURL, shouldCloseTab);
        }
    }
    findNavigateToURL(url, phishingNavSequence) {
        if (maybe_1.none(url)) {
            return undefined;
        }
        if (maybe_1.none(phishingNavSequence)) {
            return url;
        }
        const navigateToURL = phishingNavSequence.navigateToURL;
        if (maybe_1.none(navigateToURL)) {
            return url;
        }
        return navigateToURL;
    }
    blockURL(blockedURL, navigateToURL, tabId, contentType = undefined) {
        const port = this.portResolver.resolvePort(tabId);
        this.addBlockedPageController(tabId, port);
        const blockedPageUrl = this.makeBlockedPageURL(navigateToURL, blockedURL, contentType);
        return blockedPageUrl;
    }
    blockNavigation(blockedURL, tabId) {
        return this.blockURL(blockedURL, blockedURL, tabId);
    }
    blockNavigationWithNavSequence(blockedURL, phishingNavSequence, tabId) {
        const navigateToURL = this.findNavigateToURL(blockedURL, phishingNavSequence);
        return this.blockURL(blockedURL, navigateToURL, tabId);
    }
    blockLink(linkURL, tabId) {
        const blockedURL = linkURL;
        const navigateToURL = linkURL;
        return this.blockURL(blockedURL, navigateToURL, tabId);
    }
    blockContentType(blockedURL, contentType, phishingNavSequence, tabId) {
        const navigateToURL = this.findNavigateToURL(blockedURL, phishingNavSequence);
        return this.blockURL(blockedURL, navigateToURL, tabId, contentType);
    }
}
exports.BlockedPageController = BlockedPageController;


/***/ }),
/* 102 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const message_types_1 = __webpack_require__(2);
const messages_1 = __webpack_require__(5);
const log_1 = __webpack_require__(1);
const maybe_1 = __webpack_require__(0);
const browser_1 = __webpack_require__(6);
class DownloadTracker {
    constructor(browser, messageSender, handshaker, featureManager, errorHandler) {
        this.messageSender = messageSender;
        this.handshaker = handshaker;
        this.featureManager = featureManager;
        this.onChangedCB = this.onChanged.bind(this);
        this.isDormant = false;
        if (maybe_1.some(browser) && browser !== browser_1.Browser.edge) {
            this.isDownloadsApiSupported = true;
        }
        else {
            this.isDownloadsApiSupported = false;
        }
        errorHandler.onDormantStateChanged.registerEventHandler(this.onDormantStateChanged.bind(this));
    }
    onDormantStateChanged(dormantState) {
        this.isDormant = dormantState;
    }
    onChanged(downloadDelta) {
        if (downloadDelta.state &&
            (downloadDelta.state.current === 'complete')) {
            chrome.downloads.search({ id: downloadDelta.id }, this.foundDownloads.bind(this));
        }
    }
    foundDownloads(downloadItems) {
        if (downloadItems.length === 0) {
            return;
        }
        const downloadItem = downloadItems[0];
        log_1.log(`Download completed url=<${downloadItem.url}> filename=<${downloadItem.filename}>`);
        if (this.isDormant) {
            log_1.log("Extension is in a dormant state so foundDownloads will not send downloadComplete message");
            return;
        }
        if (!this.featureManager.isDownloadProtectionEnabled) {
            log_1.log("DownloadTracker: foundDownloads: download protection is not enabled");
            return;
        }
        if (this.handshaker.isHandshaken) {
            const message = new messages_1.DownloadCompleteV1(downloadItem.url, downloadItem.filename);
            this.messageSender.sendMessage(message_types_1.MessageType.downloadCompleteV1, message);
        }
        else {
            log_1.logError(new Error(`Not handshaken so not sending download complete message for url=<${downloadItem.url}> filename=<${downloadItem.filename}>`));
        }
    }
    registerListeners() {
        if (this.isDownloadsApiSupported) {
            if (!chrome.downloads.onChanged.hasListener(this.onChangedCB)) {
                chrome.downloads.onChanged.addListener(this.onChangedCB);
            }
        }
    }
    removeListeners() {
        if (this.isDownloadsApiSupported) {
            chrome.downloads.onChanged.removeListener(this.onChangedCB);
        }
    }
}
exports.DownloadTracker = DownloadTracker;


/***/ }),
/* 103 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const maybe_1 = __webpack_require__(0);
class ConfigNotifier {
    constructor(config) {
        this.config = config;
        this.keyListeners = new Map();
    }
    addConfigListenerForKey(listener, key) {
        const listenersForKey = this.keyListeners.get(key);
        if (maybe_1.some(listenersForKey)) {
            listenersForKey.push(listener);
        }
        else {
            this.keyListeners.set(key, [listener]);
        }
        listener(key, this.config);
    }
    addConfigListenerForKeys(listener, keys) {
        for (const key of keys) {
            this.addConfigListenerForKey(listener, key);
        }
    }
    onConfigChanged(key) {
        const listenersForKey = this.keyListeners.get(key);
        if (maybe_1.some(listenersForKey)) {
            for (const listener of listenersForKey) {
                listener(key, this.config);
            }
        }
    }
}
exports.ConfigNotifier = ConfigNotifier;


/***/ }),
/* 104 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const message_types_1 = __webpack_require__(2);
const messages_1 = __webpack_require__(5);
const config_1 = __webpack_require__(25);
const config_keys_1 = __webpack_require__(7);
const serialized_phishing_source_sites_1 = __webpack_require__(105);
const browser_1 = __webpack_require__(6);
const string_utils_1 = __webpack_require__(3);
class ConfigUpdaterV1 {
    constructor(config) {
        this.config = config;
    }
    updateConfig(configChanged) {
        const isEnabled = configChanged.isEnabled;
        const phishingSourceSites = configChanged.phishingSourceSites;
        const phishingNavigationSequences = configChanged.phishingNavigationSequences;
        const trustedSites = configChanged.trustedSites;
        const untrustedSites = configChanged.untrustedSites;
        const userTrustedOrigins = configChanged.userTrustedOrigins;
        const userUntrustedOrigins = configChanged.userUntrustedOrigins;
        const openPhishingLinksInSecureBrowser = configChanged.openPhishingLinksInSecureBrowser;
        if (messages_1.isSerializedIsEnabledDataV12(isEnabled)) {
            this.config.isEnabled = isEnabled;
        }
        else if (messages_1.isSerializedIsEnabledDataV1(isEnabled)) {
            this.config.isEnabled = Object.assign({}, isEnabled, { edgeChromium: false });
        }
        else {
            this.config.isEnabled = {
                chrome: false,
                firefox: false,
                edge: false,
                edgeChromium: false
            };
        }
        if (serialized_phishing_source_sites_1.isValidSerializedPhishingSourceSites(phishingSourceSites) &&
            (phishingSourceSites.version === config_1.Config.phishingSourceSitesVersion())) {
            this.config.phishingSourceSites = phishingSourceSites;
        }
        else {
            this.config.phishingSourceSites = undefined;
        }
        if (messages_1.isSerializedPhishingNavSeqData(phishingNavigationSequences)) {
            this.config.phishingNavigationSequences = phishingNavigationSequences;
        }
        else {
            this.config.phishingNavigationSequences = undefined;
        }
        this.config.trustedUrls = trustedSites;
        this.config.untrustedUrls = untrustedSites;
        this.config.userTrustedOrigins = userTrustedOrigins;
        this.config.userUntrustedOrigins = userUntrustedOrigins;
        this.config.openPhishingLinksInSecureBrowser = openPhishingLinksInSecureBrowser;
    }
}
class ConfigUpdaterV3 extends ConfigUpdaterV1 {
    updateConfig(configChanged) {
        super.updateConfig(configChanged);
        const prioritiseTrustedSites = configChanged.prioritiseTrustedSites;
        this.config.prioritiseTrustedSites = prioritiseTrustedSites;
    }
}
class ConfigUpdaterV4 extends ConfigUpdaterV3 {
    updateConfig(configChanged) {
        super.updateConfig(configChanged);
        const promptForUncategorized = configChanged.promptForUncategorized;
        this.config.promptForUncategorized = promptForUncategorized;
    }
}
class ConfigUpdaterV5 extends ConfigUpdaterV4 {
    updateConfig(configChanged) {
        super.updateConfig(configChanged);
        const isEnterpriseProduct = configChanged.isEnterpriseProduct;
        this.config.isEnterpriseProduct = isEnterpriseProduct;
    }
}
class ConfigUpdaterV7 extends ConfigUpdaterV5 {
    updateConfig(configChanged) {
        super.updateConfig(configChanged);
        const newTabPageUrls = configChanged.newTabPageUrls;
        if (messages_1.isSerializedNewTabPageUrlsV12(newTabPageUrls)) {
            this.config.newTabPageUrls = newTabPageUrls;
        }
        else if (messages_1.isSerializedNewTabPageUrlsV7(newTabPageUrls)) {
            this.config.newTabPageUrls = Object.assign({}, newTabPageUrls, { edgeChromium: [] });
        }
    }
}
class ConfigUpdaterV8 extends ConfigUpdaterV7 {
    updateConfig(configChanged) {
        super.updateConfig(configChanged);
        const isConsumerProduct = configChanged.isConsumerProduct;
        const blockedPageLearnMoreURL = configChanged.blockedPageLearnMoreURL;
        this.config.isConsumerProduct = isConsumerProduct;
        if (!string_utils_1.isEmptyString(blockedPageLearnMoreURL)) {
            this.config.blockedPageLearnMoreURL = blockedPageLearnMoreURL;
        }
    }
}
class ConfigUpdaterV9 extends ConfigUpdaterV8 {
    updateConfig(configChanged) {
        super.updateConfig(configChanged);
        const dontAskAgain = configChanged.dontAskAgain;
        this.config.dontAskAgain = dontAskAgain;
    }
}
class ConfigUpdaterV11 extends ConfigUpdaterV9 {
    updateConfig(configChanged) {
        super.updateConfig(configChanged);
        const secureBrowserRedirectTrustedSites = configChanged.secureBrowserRedirectTrustedSites;
        const productStatus = configChanged.productStatus;
        this.config.secureBrowserRedirectTrustedSites = secureBrowserRedirectTrustedSites;
        this.config.productStatus = productStatus;
    }
}
class ConfigUpdaterV12 extends ConfigUpdaterV11 {
    updateConfig(configChanged) {
        super.updateConfig(configChanged);
    }
}
class ConfigNotifierV1 {
    constructor(configNotifier) {
        this.configNotifier = configNotifier;
    }
    notify() {
        this.configNotifier.onConfigChanged(config_keys_1.ConfigKey.isEnabled);
        this.configNotifier.onConfigChanged(config_keys_1.ConfigKey.phishingSourceSites);
        this.configNotifier.onConfigChanged(config_keys_1.ConfigKey.phishingNavigationSequences);
        this.configNotifier.onConfigChanged(config_keys_1.ConfigKey.trustedUrls);
        this.configNotifier.onConfigChanged(config_keys_1.ConfigKey.untrustedUrls);
        this.configNotifier.onConfigChanged(config_keys_1.ConfigKey.userTrustedOrigins);
        this.configNotifier.onConfigChanged(config_keys_1.ConfigKey.userUntrustedOrigins);
        this.configNotifier.onConfigChanged(config_keys_1.ConfigKey.openPhishingLinksInSecureBrowser);
    }
}
class ConfigNotifierV3 extends ConfigNotifierV1 {
    notify() {
        super.notify();
        this.configNotifier.onConfigChanged(config_keys_1.ConfigKey.prioritiseTrustedSites);
    }
}
class ConfigNotifierV4 extends ConfigNotifierV3 {
    notify() {
        super.notify();
        this.configNotifier.onConfigChanged(config_keys_1.ConfigKey.promptForUncategorized);
    }
}
class ConfigNotifierV5 extends ConfigNotifierV4 {
    notify() {
        super.notify();
        this.configNotifier.onConfigChanged(config_keys_1.ConfigKey.isEnterpriseProduct);
    }
}
class ConfigNotifierV7 extends ConfigNotifierV5 {
    notify() {
        super.notify();
        this.configNotifier.onConfigChanged(config_keys_1.ConfigKey.newTabPageUrls);
    }
}
class ConfigNotifierV8 extends ConfigNotifierV7 {
    notify() {
        super.notify();
        this.configNotifier.onConfigChanged(config_keys_1.ConfigKey.isConsumerProduct);
        this.configNotifier.onConfigChanged(config_keys_1.ConfigKey.blockedPageLearnMoreURL);
    }
}
class ConfigNotifierV9 extends ConfigNotifierV8 {
    notify() {
        super.notify();
        this.configNotifier.onConfigChanged(config_keys_1.ConfigKey.dontAskAgain);
    }
}
class ConfigNotifierV11 extends ConfigNotifierV9 {
    notify() {
        super.notify();
        this.configNotifier.onConfigChanged(config_keys_1.ConfigKey.secureBrowserRedirectTrustedSites);
        this.configNotifier.onConfigChanged(config_keys_1.ConfigKey.productStatus);
    }
}
class ConfigNotifierV12 extends ConfigNotifierV11 {
    notify() {
        super.notify();
    }
}
class ConfigUpdater {
    constructor(config, configNotifier, messageSender, messageRouter, handshaker, onConfiguredRaiser) {
        this.config = config;
        this.configNotifier = configNotifier;
        this.messageSender = messageSender;
        this.onConfiguredRaiser = onConfiguredRaiser;
        messageRouter.registerMessageHandler(message_types_1.MessageType.configChangedV1, (message) => {
            this.onConfigUpdatedV1(message);
        });
        messageRouter.registerMessageHandler(message_types_1.MessageType.configChangedV3, (message) => {
            this.onConfigUpdatedV3(message);
        });
        messageRouter.registerMessageHandler(message_types_1.MessageType.configChangedV4, (message) => {
            this.onConfigUpdatedV4(message);
        });
        messageRouter.registerMessageHandler(message_types_1.MessageType.configChangedV5, (message) => {
            this.onConfigUpdatedV5(message);
        });
        messageRouter.registerMessageHandler(message_types_1.MessageType.configChangedV7, (message) => {
            this.onConfigUpdatedV7(message);
        });
        messageRouter.registerMessageHandler(message_types_1.MessageType.configChangedV8, (message) => {
            this.onConfigUpdatedV8(message);
        });
        messageRouter.registerMessageHandler(message_types_1.MessageType.configChangedV9, (message) => {
            this.onConfigUpdatedV9(message);
        });
        messageRouter.registerMessageHandler(message_types_1.MessageType.configChangedV11, (message) => {
            this.onConfigUpdatedV11(message);
        });
        messageRouter.registerMessageHandler(message_types_1.MessageType.configChangedV12, (message) => {
            this.onConfigUpdatedV12(message);
        });
        messageRouter.registerMessageHandler(message_types_1.MessageType.reputationChangedV3, message => {
            this.onReputationUpdatedV3(message);
        });
        handshaker.onHandshaken.registerEventHandler((_) => {
            this.requestConfigUpdate();
        });
    }
    requestConfigUpdate() {
        const request = new messages_1.ConfigRequestV1(config_1.Config.phishingSourceSitesVersion(), config_1.Config.phishingNavigationSequencesVersion(), browser_1.getCurrentBrowserInfo());
        this.messageSender.sendMessage(message_types_1.MessageType.configRequestV1, request);
    }
    onConfigUpdated(message, updater, notifier) {
        const configChanged = message.payload;
        updater.updateConfig(configChanged);
        notifier.notify();
    }
    onConfigUpdatedV1(message) {
        this.onConfigUpdated(message, new ConfigUpdaterV1(this.config), new ConfigNotifierV1(this.configNotifier));
        this.onConfiguredRaiser.onConfigured();
    }
    onConfigUpdatedV3(message) {
        this.onConfigUpdated(message, new ConfigUpdaterV3(this.config), new ConfigNotifierV3(this.configNotifier));
    }
    onConfigUpdatedV4(message) {
        this.onConfigUpdated(message, new ConfigUpdaterV4(this.config), new ConfigNotifierV4(this.configNotifier));
    }
    onConfigUpdatedV5(message) {
        this.onConfigUpdated(message, new ConfigUpdaterV5(this.config), new ConfigNotifierV5(this.configNotifier));
    }
    onConfigUpdatedV7(message) {
        this.onConfigUpdated(message, new ConfigUpdaterV7(this.config), new ConfigNotifierV7(this.configNotifier));
    }
    onConfigUpdatedV8(message) {
        this.onConfigUpdated(message, new ConfigUpdaterV8(this.config), new ConfigNotifierV8(this.configNotifier));
    }
    onConfigUpdatedV9(message) {
        this.onConfigUpdated(message, new ConfigUpdaterV9(this.config), new ConfigNotifierV9(this.configNotifier));
    }
    onConfigUpdatedV11(message) {
        this.onConfigUpdated(message, new ConfigUpdaterV11(this.config), new ConfigNotifierV11(this.configNotifier));
    }
    onConfigUpdatedV12(message) {
        this.onConfigUpdated(message, new ConfigUpdaterV12(this.config), new ConfigNotifierV12(this.configNotifier));
    }
    onReputationUpdatedV3(message) {
        const reputationChanged = message.payload;
        this.config.reputableSites = reputationChanged;
        this.configNotifier.onConfigChanged(config_keys_1.ConfigKey.reputableUrls);
    }
}
exports.ConfigUpdater = ConfigUpdater;


/***/ }),
/* 105 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const maybe_1 = __webpack_require__(0);
function isValidSerializedPhishingSourceSites(value) {
    const isValidMethodData = (value) => {
        return maybe_1.some(value.get) &&
            maybe_1.some(value.post);
    };
    const isValidNavData = (value) => {
        return maybe_1.some(value.navigate) &&
            maybe_1.some(value.redirect) &&
            isValidMethodData(value.navigate) &&
            isValidMethodData(value.redirect);
    };
    const isValidHeuristics = (value) => {
        return maybe_1.some(value.pageInputEvents) &&
            maybe_1.some(value.navigationRequestType);
    };
    return value instanceof Object &&
        maybe_1.some(value.version) &&
        maybe_1.some(value.phishingSourceSites) &&
        maybe_1.some(value.webMail) &&
        maybe_1.some(value.advanced) &&
        maybe_1.some(value.advanced.requireAuth) &&
        maybe_1.some(value.advanced.auth) &&
        maybe_1.some(value.advanced.heuristics) &&
        maybe_1.some(value.advanced.newTab) &&
        maybe_1.some(value.advanced.sameTab) &&
        isValidHeuristics(value.advanced.heuristics) &&
        isValidNavData(value.advanced.newTab) &&
        isValidNavData(value.advanced.sameTab);
}
exports.isValidSerializedPhishingSourceSites = isValidSerializedPhishingSourceSites;


/***/ }),
/* 106 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const maybe_1 = __webpack_require__(0);
const log_1 = __webpack_require__(1);
const browser_1 = __webpack_require__(6);
function setNormalBadge() {
    chrome.browserAction.setBadgeText({ text: "" });
}
exports.setNormalBadge = setNormalBadge;
function setErrorBadge() {
    chrome.browserAction.setBadgeBackgroundColor({ color: [255, 0, 0, 255] });
    chrome.browserAction.setBadgeText({ text: "!" });
}
exports.setErrorBadge = setErrorBadge;
const normalIcon = {
    path: {
        16: "icons/icon16.png",
        32: "icons/icon32.png",
        64: "icons/icon64.png"
    }
};
const normalEdgeIcon = { path: "icons/icon64.png" };
const errorIcon = {
    path: {
        16: "icons/greyscale_icon16.png",
        32: "icons/greyscale_icon32.png",
        64: "icons/greyscale_icon64.png"
    }
};
const errorEdgeIcon = { path: "icons/greyscale_icon64.png" };
var IconType;
(function (IconType) {
    IconType[IconType["normal"] = 0] = "normal";
    IconType[IconType["error"] = 1] = "error";
})(IconType = exports.IconType || (exports.IconType = {}));
class IconUpdater {
    constructor(browser, currentIconType) {
        this.browser = browser;
        this.currentIconType = currentIconType;
        this.getNormalIcon = () => {
            if (maybe_1.some(this.browser) && this.browser !== browser_1.Browser.edge) {
                return normalIcon;
            }
            return normalEdgeIcon;
        };
        this.getErrorIcon = () => {
            if (maybe_1.some(this.browser) && this.browser !== browser_1.Browser.edge) {
                return errorIcon;
            }
            return errorEdgeIcon;
        };
        this.updateIcon(this.currentIconType);
    }
    chooseIcon(type) {
        switch (type) {
            case IconType.normal:
                return this.getNormalIcon();
            case IconType.error:
                return this.getErrorIcon();
            default:
                return this.getErrorIcon();
        }
    }
    getIcon() {
        return this.currentIconType;
    }
    setIcon(newIconType) {
        if (maybe_1.some(this.pendingIconType)) {
            this.pendingIconType = newIconType;
        }
        else if (newIconType !== this.currentIconType) {
            this.updateIcon(newIconType);
        }
    }
    updateIcon(newIconType) {
        this.pendingIconType = newIconType;
        const newIcon = this.chooseIcon(newIconType);
        chrome.browserAction.setIcon(newIcon, () => {
            this.currentIconType = newIconType;
            if (maybe_1.none(this.pendingIconType)) {
                log_1.logError(new Error("updateIcon callback: unexpected undefined pendingIconType"));
            }
            else if (this.pendingIconType === this.currentIconType) {
                this.pendingIconType = undefined;
            }
            else {
                this.updateIcon(this.pendingIconType);
            }
        });
    }
}
exports.IconUpdater = IconUpdater;


/***/ }),
/* 107 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const page_port_resolver_1 = __webpack_require__(39);
const promise_utils_1 = __webpack_require__(13);
const message_types_1 = __webpack_require__(2);
const messages_1 = __webpack_require__(5);
const log_1 = __webpack_require__(1);
const string_utils_1 = __webpack_require__(3);
const url_utils_1 = __webpack_require__(4);
const maybe_1 = __webpack_require__(0);
const port_utils_1 = __webpack_require__(29);
const host_constants_1 = __webpack_require__(12);
const page_port_controller_1 = __webpack_require__(24);
const browser_1 = __webpack_require__(6);
const history_1 = __webpack_require__(28);
var BlockLinkType;
(function (BlockLinkType) {
    BlockLinkType[BlockLinkType["allow"] = 0] = "allow";
    BlockLinkType[BlockLinkType["retry"] = 1] = "retry";
})(BlockLinkType || (BlockLinkType = {}));
class ExternalAppLinkPageController {
    constructor(tabId, port, onDisconnect, blockLink, shouldBlockLinkType, onConfigured) {
        this.tabId = tabId;
        this.onDisconnect = onDisconnect;
        this.blockLink = blockLink;
        this.shouldBlockLinkType = shouldBlockLinkType;
        this.pagePortController = new page_port_controller_1.PagePortController(tabId, port, (port) => this.onPageConnected(port), (port) => this.onPageDisconnected(port), onConfigured);
        this.pagePortController.registerMessageHandler(message_types_1.MessageType.externalAppLinkRequestV1, (message) => this.handleRequest(message));
        this.pagePortController.connect();
    }
    get shouldRetryLink() {
        return this.shouldBlockLinkType === BlockLinkType.retry;
    }
    sendMessage(type, payload) {
        this.pagePortController.sendMessage(type, payload);
    }
    handleRequest(message) {
        const request = message.payload;
        const linkSpec = request.linkSpec;
        const linkURL = url_utils_1.parseUrl(linkSpec);
        log_1.log(`ExternalAppLinkPageController.handleExternalAppLink: ${string_utils_1.toString({
            tabId: this.tabId,
            linkSpec: request.linkSpec,
            externalAppName: request.externalAppName,
            navigateToLink: maybe_1.some(linkURL),
            shouldRetryLink: this.shouldRetryLink
        })}`);
        let navigateToURL;
        if (maybe_1.some(linkURL)) {
            if (this.shouldRetryLink) {
                if (maybe_1.some(this.senderURL)) {
                    navigateToURL = this.senderURL;
                }
            }
            else {
                navigateToURL = linkURL;
            }
        }
        this.sendResponse(maybe_1.some(navigateToURL) ? navigateToURL : this.blockLink(linkURL, this.tabId));
    }
    sendResponse(navigateToURL) {
        const navigateToSpec = url_utils_1.URLToString(navigateToURL);
        this.sendMessage(message_types_1.MessageType.externalAppLinkResponseV1, new messages_1.ExternalAppLinkResponseV1(navigateToSpec));
    }
    onPageConnected(port) {
        this.senderURL = port_utils_1.readPortPageUrl(port);
    }
    onPageDisconnected(port) {
        this.onDisconnect(port, this.tabId);
    }
}
class ExternalAppLinkController {
    constructor(browser, blockLink, onConfigured, errorHandler) {
        this.browser = browser;
        this.blockLink = blockLink;
        this.onConfigured = onConfigured;
        this.externalAppLinkPage = undefined;
        this.pageControllers = new Map();
        this.isDormant = false;
        this.externalAppLinkPage = url_utils_1.parseUrl(chrome.runtime.getURL(host_constants_1.hostConstants.externalAppLinkPage));
        this.portResolver = page_port_resolver_1.getBrowserSpecificExtensionPagePortResolver(this.browser, host_constants_1.hostConstants.externalAppLinkPagePortName, (tabId, port) => this.onUnresolvedPortConnected(tabId, port), (url) => this.isExternalAppLinkURL(url));
        errorHandler.onDormantStateChanged.registerEventHandler(this.onDormantStateChanged.bind(this));
    }
    onDormantStateChanged(dormantState) {
        this.isDormant = dormantState;
    }
    isExternalAppLinkURL(url) {
        if (maybe_1.none(url) || maybe_1.none(this.externalAppLinkPage)) {
            return false;
        }
        return url_utils_1.isSameUrl(url, this.externalAppLinkPage, url_utils_1.UrlCompareOptions.IgnoreSearchParams);
    }
    getExternalAppLinkURL() {
        return this.externalAppLinkPage;
    }
    onExternalAppLinkDetected(tabId) {
        const port = this.portResolver.resolvePort(tabId);
        this.addPageController(tabId, port, BlockLinkType.allow);
    }
    addPageController(tabId, port, shouldBlockLink) {
        const onPortDisconnected = (port, tabId) => {
            this.onPortDisconnected(port, tabId);
        };
        const pageController = new ExternalAppLinkPageController(tabId, port, onPortDisconnected, this.blockLink, shouldBlockLink, this.onConfigured);
        this.pageControllers.set(tabId, pageController);
    }
    onPortDisconnected(port, tabId) {
        this.pageControllers.delete(tabId);
        history_1.removeExtensionPageFromHistoryAfterClosing(this.browser, port);
    }
    onUnresolvedPortConnected(tabId, port) {
        log_1.log(`ExternalAppLinkController.onUnexpectedPortConnected: tabId: ${tabId}`);
        if (this.isDormant) {
            log_1.log("Extension in a dormant state so set BlockLinkType.allow instead of retry.");
            this.addPageController(tabId, promise_utils_1.makePromise(() => port), BlockLinkType.allow);
        }
        else if (this.browser === browser_1.Browser.chrome || this.browser === browser_1.Browser.edgeChromium) {
            this.addPageController(tabId, promise_utils_1.makePromise(() => port), BlockLinkType.retry);
        }
        else {
            this.addPageController(tabId, promise_utils_1.makePromise(() => port), BlockLinkType.allow);
        }
    }
}
exports.ExternalAppLinkController = ExternalAppLinkController;


/***/ }),
/* 108 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const request_response_handler_1 = __webpack_require__(64);
const url_utils_1 = __webpack_require__(4);
const message_types_1 = __webpack_require__(2);
const messages_1 = __webpack_require__(5);
const id_generator_1 = __webpack_require__(19);
const browser_1 = __webpack_require__(6);
function makeIsFileUrlTrustedRequestHandler(messageRouter, messageSender, idGenerator) {
    const makeRequest = (id, fileUrl) => {
        return new messages_1.IsFileURLTrustedRequestV1(id, url_utils_1.URLToString(fileUrl));
    };
    const readResponse = (message) => {
        const response = message.payload;
        const id = response.id;
        const isTrusted = response.isTrusted;
        return [id, isTrusted];
    };
    return new request_response_handler_1.RequestResponseHandler(message_types_1.MessageType.isFileURLTrustedRequestV1, message_types_1.MessageType.isFileURLTrustedResponseV1, makeRequest, readResponse, messageRouter, messageSender, idGenerator);
}
class FileUrlTracker {
    constructor(messageRouter, messageSender, browser) {
        this.browser = browser;
        this.idGenerator = new id_generator_1.IdGenerator();
        this.trustedFileUrls = url_utils_1.makeUrlHashSet(url_utils_1.UrlCompareOptions.IgnoreSearchParams);
        this.untrustedFileUrls = url_utils_1.makeUrlHashSet(url_utils_1.UrlCompareOptions.IgnoreSearchParams);
        this.requestHandler = makeIsFileUrlTrustedRequestHandler(messageRouter, messageSender, this.idGenerator);
    }
    isEdgeDnsErrorPage(fileUrl) {
        const isEdge = this.browser === browser_1.Browser.edge;
        const isDnsErrorPage = fileUrl.pathname.endsWith("dnserror.html");
        return isEdge && isDnsErrorPage;
    }
    isFileUrlTrusted(fileUrl) {
        if (!url_utils_1.isFileUrl(fileUrl)) {
            return undefined;
        }
        if (this.untrustedFileUrls.has(fileUrl)) {
            return false;
        }
        if (this.trustedFileUrls.has(fileUrl)) {
            return true;
        }
        if (this.isEdgeDnsErrorPage(fileUrl)) {
            return true;
        }
        return undefined;
    }
    queryFileUrlTrustedness(fileUrl, onQueryComplete) {
        if (!url_utils_1.isFileUrl(fileUrl)) {
            return false;
        }
        this.requestHandler.sendRequest(fileUrl, (fileUrl, isTrusted) => {
            this.untrustedFileUrls.remove(fileUrl);
            this.trustedFileUrls.remove(fileUrl);
            if (isTrusted) {
                this.trustedFileUrls.add(fileUrl);
            }
            else {
                this.untrustedFileUrls.add(fileUrl);
            }
            onQueryComplete(fileUrl, isTrusted);
        });
        return true;
    }
}
exports.FileUrlTracker = FileUrlTracker;


/***/ }),
/* 109 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const message_types_1 = __webpack_require__(2);
const messages_1 = __webpack_require__(5);
const page_port_resolver_1 = __webpack_require__(39);
const host_constants_1 = __webpack_require__(12);
const maybe_1 = __webpack_require__(0);
const url_utils_1 = __webpack_require__(4);
const page_port_controller_1 = __webpack_require__(24);
const log_1 = __webpack_require__(1);
const string_utils_1 = __webpack_require__(3);
const url_encoder_1 = __webpack_require__(62);
const blocked_file_page_options_1 = __webpack_require__(110);
const promise_utils_1 = __webpack_require__(13);
const browser_1 = __webpack_require__(6);
const history_1 = __webpack_require__(28);
class BlockedFilePageController {
    constructor(browser, tabId, port, onDisconnect, fileUrlTracker, browserLauncher, onConfigured) {
        this.browser = browser;
        this.tabId = tabId;
        this.port = port;
        this.onDisconnect = onDisconnect;
        this.fileUrlTracker = fileUrlTracker;
        this.browserLauncher = browserLauncher;
        this.pagePortController = new page_port_controller_1.PagePortController(tabId, port, (port) => this.onPortConnected(port), (port) => this.onPortDisconnected(port), onConfigured);
        this.pagePortController.registerMessageHandler(message_types_1.MessageType.blockedFileRequestV1, (message) => this.handleRequest(message));
        this.pagePortController.connect();
    }
    closeTab() {
        chrome.tabs.remove(this.tabId, () => {
            log_1.log(`BlockedFilePageController.closeTab: tabId: ${this.tabId}`);
        });
    }
    handleRequest(message) {
        const request = message.payload;
        const fileUrl = url_utils_1.parseUrl(request.fileUrlSpec);
        if (maybe_1.none(fileUrl) || !url_utils_1.isFileUrl(fileUrl)) {
            this.closeTab();
            return;
        }
        this.fileUrlTracker.queryFileUrlTrustedness(fileUrl, (fileUrl, isTrusted) => {
            log_1.log(`BlockedFilePageController.handleRequest: ${string_utils_1.toString({
                fileUrl: fileUrl,
                isTrusted: isTrusted
            })}`);
            if (!isTrusted) {
                this.browserLauncher.launchBrowserAndCloseTabOrNavigateTab(this.tabId, fileUrl);
            }
            else if (this.browser === browser_1.Browser.edge) {
                chrome.tabs.update(this.tabId, { url: url_utils_1.URLToString(fileUrl) });
            }
            else {
                this.sendResponse(fileUrl, isTrusted);
            }
        });
    }
    sendResponse(fileUrl, isTrusted) {
        this.pagePortController.sendMessage(message_types_1.MessageType.blockedFileResponseV1, new messages_1.BlockedFileResponseV1(url_utils_1.URLToString(fileUrl), isTrusted));
    }
    onPortConnected(port) { }
    onPortDisconnected(port) {
        this.onDisconnect(port, this.tabId);
    }
}
class FileBlocker {
    constructor(browser, fileUrlTracker, browserLauncher, onConfigured) {
        this.browser = browser;
        this.fileUrlTracker = fileUrlTracker;
        this.browserLauncher = browserLauncher;
        this.onConfigured = onConfigured;
        this.pageControllers = new Map();
        const blockedFilePageSpec = chrome.runtime.getURL(host_constants_1.hostConstants.blockedFilePage);
        const blockedFilePageURL = url_utils_1.parseUrl(blockedFilePageSpec);
        if (maybe_1.none(blockedFilePageURL)) {
            throw new Error(`FileBlocker.constructor: invalid blockedFilePageURL: ${host_constants_1.hostConstants.blockedFilePage}`);
        }
        this.blockedFilePageURL = blockedFilePageURL;
        this.pagePortResolver = page_port_resolver_1.getBrowserSpecificExtensionPagePortResolver(this.browser, host_constants_1.hostConstants.blockedFilePagePortName, (tabId, port) => this.onUnresolvedPagePortConnected(tabId, port), (url) => this.isBlockedFilePageURL(url));
    }
    isBlockedFilePageURL(url) {
        if (maybe_1.none(url) || maybe_1.none(this.blockedFilePageURL)) {
            return false;
        }
        return url_utils_1.isSameUrl(url, this.blockedFilePageURL, url_utils_1.UrlCompareOptions.IgnoreSearchParams);
    }
    makeBlockedFilePageURL(fileUrl) {
        const urlEncoder = new url_encoder_1.UrlEncoder(this.blockedFilePageURL);
        urlEncoder.addUrlQueryParam(blocked_file_page_options_1.OptionNames.fileUrlSpec, fileUrl);
        const blockedFilePageURL = urlEncoder.encodeUrl();
        if (maybe_1.none(blockedFilePageURL)) {
            return this.blockedFilePageURL;
        }
        return blockedFilePageURL;
    }
    addBlockedFilePageController(tabId, port) {
        const controller = new BlockedFilePageController(this.browser, tabId, port, (port, tabId) => this.onPageDisconnected(port, tabId), this.fileUrlTracker, this.browserLauncher, this.onConfigured);
        this.pageControllers.set(tabId, controller);
    }
    onPageDisconnected(port, tabId) {
        this.pageControllers.delete(tabId);
        history_1.removeExtensionPageFromHistoryAfterClosing(this.browser, port);
    }
    onUnresolvedPagePortConnected(tabId, port) {
        this.addBlockedFilePageController(tabId, promise_utils_1.makePromise(() => port));
    }
    blockFile(fileUrl, tabId) {
        const port = this.pagePortResolver.resolvePort(tabId);
        this.addBlockedFilePageController(tabId, port);
        const blockedFilePageURL = this.makeBlockedFilePageURL(fileUrl);
        return blockedFilePageURL;
    }
}
exports.FileBlocker = FileBlocker;


/***/ }),
/* 110 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var OptionNames;
(function (OptionNames) {
    OptionNames["fileUrlSpec"] = "fileUrlSpec";
})(OptionNames = exports.OptionNames || (exports.OptionNames = {}));


/***/ }),
/* 111 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const request_response_handler_1 = __webpack_require__(64);
const id_generator_1 = __webpack_require__(19);
const messages_1 = __webpack_require__(5);
const message_types_1 = __webpack_require__(2);
const protocol_versions_1 = __webpack_require__(14);
const maybe_1 = __webpack_require__(0);
const config_keys_1 = __webpack_require__(7);
const log_1 = __webpack_require__(1);
var ResponseTime;
(function (ResponseTime) {
    ResponseTime[ResponseTime["respondImmediately"] = 0] = "respondImmediately";
    ResponseTime[ResponseTime["respondWhenChanged"] = 1] = "respondWhenChanged";
})(ResponseTime || (ResponseTime = {}));
function makeEnabledFeaturesRequestHandler(messageRouter, messageSender, idGenerator) {
    const makeRequest = (id, responseTime) => {
        const respondImmediately = responseTime === ResponseTime.respondImmediately;
        return new messages_1.EnabledFeaturesRequestV2(id, respondImmediately);
    };
    const readResponse = (message) => {
        const response = message.payload;
        const id = response.id;
        const enabledFeatures = response;
        return [id, enabledFeatures];
    };
    return new request_response_handler_1.RequestResponseHandler(message_types_1.MessageType.enabledFeaturesRequestV2, message_types_1.MessageType.enabledFeaturesResponseV2, makeRequest, readResponse, messageRouter, messageSender, idGenerator);
}
class FeatureManager {
    constructor(messageRouter, messageSender, handshaker, configNotifier, onConfiguredRaiser) {
        this.onConfiguredRaiser = onConfiguredRaiser;
        this.idGenerator = new id_generator_1.IdGenerator();
        this.enabledFeatures = undefined;
        this.dontAskAgain = false;
        this.isConsumerProduct = false;
        this.requestHandler = makeEnabledFeaturesRequestHandler(messageRouter, messageSender, this.idGenerator);
        handshaker.onHandshaken.registerEventHandler((event) => {
            this.onHandshaken(event);
        });
        configNotifier.addConfigListenerForKeys((key, config) => this.onConfigChanged(key, config), [config_keys_1.ConfigKey.dontAskAgain, config_keys_1.ConfigKey.isConsumerProduct]);
    }
    onConfigChanged(key, config) {
        switch (key) {
            case config_keys_1.ConfigKey.dontAskAgain:
                this.dontAskAgain = config.dontAskAgain;
                break;
            case config_keys_1.ConfigKey.isConsumerProduct:
                this.isConsumerProduct = config.isConsumerProduct;
                break;
        }
    }
    get shouldNotAskAgain() {
        return this.isConsumerProduct && this.dontAskAgain;
    }
    get isLinkProtectionEnabled() {
        if (this.shouldNotAskAgain) {
            log_1.log(`Treating link protection as disabled because the user has chosen "Don't ask again"`);
            return false;
        }
        return maybe_1.some(this.enabledFeatures) && this.enabledFeatures.linkProtection;
    }
    get isFileURLProtectionEnabled() {
        return maybe_1.some(this.enabledFeatures) && this.enabledFeatures.fileURLProtection;
    }
    get isPDFProtectionEnabled() {
        if (this.shouldNotAskAgain) {
            log_1.log(`Treating PDF protection as disabled because the user has chosen "Don't ask again"`);
            return false;
        }
        return maybe_1.some(this.enabledFeatures) && this.enabledFeatures.pdfProtection;
    }
    get isDownloadProtectionEnabled() {
        return maybe_1.some(this.enabledFeatures) && this.enabledFeatures.downloadProtection;
    }
    onHandshaken(event) {
        const protocolVersion = event.negotiatedVersion;
        if (protocol_versions_1.isMessageTypeSupported(message_types_1.MessageType.enabledFeaturesRequestV2, protocolVersion)) {
            this.requestHandler.sendRequest(ResponseTime.respondImmediately, (responseTime, enabledFeatures) => this.onResponseReceived(responseTime, enabledFeatures));
        }
        else {
            this.enabledFeatures = {
                linkProtection: true,
                fileURLProtection: true,
                pdfProtection: true,
                downloadProtection: true
            };
        }
    }
    onResponseReceived(responseTime, enabledFeatures) {
        this.enabledFeatures = enabledFeatures;
        this.requestHandler.sendRequest(ResponseTime.respondWhenChanged, (responseTime, enabledFeatures) => this.onResponseReceived(responseTime, enabledFeatures));
        this.onConfiguredRaiser.onConfigured();
    }
}
exports.FeatureManager = FeatureManager;


/***/ }),
/* 112 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const message_types_1 = __webpack_require__(2);
const messages_1 = __webpack_require__(5);
const id_generator_1 = __webpack_require__(19);
const maybe_1 = __webpack_require__(0);
const errors_1 = __webpack_require__(21);
const protocol_versions_1 = __webpack_require__(14);
class HeartbeatController {
    constructor(errorHandler, messageSender, messageRouter, handshaker) {
        this.errorHandler = errorHandler;
        this.messageSender = messageSender;
        this.timeoutId = undefined;
        this.pendingHeartbeat = undefined;
        this.idGenerator = new id_generator_1.IdGenerator();
        messageRouter.registerMessageHandler(message_types_1.MessageType.heartbeatV10, (message) => this.onHeartbeatReceived(message));
        handshaker.onHandshaken.registerEventHandler((event) => {
            this.resetPendingHeartbeat();
            this.cancelTimeout();
            const negotiatedVersion = event.negotiatedVersion;
            if (maybe_1.some(negotiatedVersion) && protocol_versions_1.isMessageTypeSupported(message_types_1.MessageType.heartbeatV10, negotiatedVersion)) {
                this.sendHeartbeat();
            }
        });
    }
    onHeartbeatReceived(message) {
        const heartbeat = message.payload;
        if (maybe_1.some(this.pendingHeartbeat) && this.pendingHeartbeat === heartbeat.id) {
            this.resetPendingHeartbeat();
        }
    }
    sendHeartbeat() {
        this.resetPendingHeartbeat();
        this.cancelTimeout();
        const id = this.idGenerator.generateId();
        this.messageSender.sendMessage(message_types_1.MessageType.heartbeatV10, new messages_1.HeartbeatV10(id));
        try {
            const oneMinute = 60000;
            this.timeoutId = setTimeout(() => {
                if (maybe_1.some(this.pendingHeartbeat)) {
                    this.resetPendingHeartbeat();
                    this.errorHandler.raiseError(errors_1.ChragError.helperUnresponsive);
                    return;
                }
                else {
                    this.sendHeartbeat();
                }
            }, oneMinute);
        }
        finally {
            this.pendingHeartbeat = id;
        }
    }
    resetPendingHeartbeat() {
        if (maybe_1.none(this.pendingHeartbeat)) {
            return;
        }
        this.pendingHeartbeat = undefined;
    }
    cancelTimeout() {
        if (maybe_1.none(this.timeoutId)) {
            return;
        }
        try {
            clearTimeout(this.timeoutId);
        }
        finally {
            this.timeoutId = undefined;
        }
    }
}
exports.HeartbeatController = HeartbeatController;


/***/ }),
/* 113 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const host_constants_1 = __webpack_require__(12);
const port_resolver_1 = __webpack_require__(57);
const page_port_controller_1 = __webpack_require__(24);
const message_types_1 = __webpack_require__(2);
const messages_1 = __webpack_require__(5);
const log_1 = __webpack_require__(1);
const promise_utils_1 = __webpack_require__(13);
const maybe_1 = __webpack_require__(0);
const config_keys_1 = __webpack_require__(7);
const protocol_versions_1 = __webpack_require__(14);
class OptionsPageController {
    constructor(handshaker, port, openPhishingLinksInSecureBrowser, userTrustedOrigins, userUntrustedOrigins, onDisconnect, hostHelperMessageSender) {
        this.handshaker = handshaker;
        this.openPhishingLinksInSecureBrowser = openPhishingLinksInSecureBrowser;
        this.userTrustedOrigins = userTrustedOrigins;
        this.userUntrustedOrigins = userUntrustedOrigins;
        this.onDisconnect = onDisconnect;
        this.hostHelperMessageSender = hostHelperMessageSender;
        this.optionsPageSupportStatus = protocol_versions_1.VersionSupportStatus.notHandshaken;
        this.pagePortController = new page_port_controller_1.PagePortController(chrome.tabs.TAB_ID_NONE, port, (port) => { }, (port) => { this.onDisconnect(); });
        this.pagePortController.registerMessageHandler(message_types_1.MessageType.optionsDataRequestV3, (message) => this.handleOptionsDataRequest(message));
        this.pagePortController.registerMessageHandler(message_types_1.MessageType.clearRememberedDecisionsV1, (message) => this.clearAllRememberedDecisions(message));
        this.pagePortController.registerMessageHandler(message_types_1.MessageType.clearRememberedOriginV3, (message) => this.clearRememberedOrigin(message));
        this.pagePortController.connect();
        if (this.handshaker.isHandshaken && maybe_1.some(this.handshaker.negotiatedVersion)) {
            this.setOptionsPageSupportStatus(this.handshaker.negotiatedVersion);
        }
        else {
            this.handshaker.onHandshaken.registerEventHandler((handshakenEvent) => {
                this.onNegotiatedVersion(handshakenEvent.negotiatedVersion);
            });
        }
    }
    setOptionsPageSupportStatus(negotiatedVersion) {
        if (protocol_versions_1.isMessageTypeSupported(message_types_1.MessageType.optionsDataResponseV3, negotiatedVersion)) {
            this.optionsPageSupportStatus = protocol_versions_1.VersionSupportStatus.supported;
        }
        else {
            this.optionsPageSupportStatus = protocol_versions_1.VersionSupportStatus.unsupported;
        }
    }
    onNegotiatedVersion(negotiatedVersion) {
        this.setOptionsPageSupportStatus(negotiatedVersion);
        this.sendOptionsDataResponse();
    }
    updateOptionsData(openPhishingLinksInSecureBrowser, userTrustedOrigins, userUntrustedOrigins) {
        this.openPhishingLinksInSecureBrowser = openPhishingLinksInSecureBrowser;
        this.userTrustedOrigins = userTrustedOrigins;
        this.userUntrustedOrigins = userUntrustedOrigins;
        this.sendOptionsDataResponse();
    }
    sendOptionsDataResponse() {
        this.pagePortController.sendMessage(message_types_1.MessageType.optionsDataResponseV3, new messages_1.OptionsDataResponseV3(this.optionsPageSupportStatus, this.openPhishingLinksInSecureBrowser, this.userTrustedOrigins, this.userUntrustedOrigins));
    }
    handleOptionsDataRequest(message) {
        this.sendOptionsDataResponse();
    }
    clearRememberedOrigin(message) {
        const protocol = this.handshaker.negotiatedVersion;
        if (maybe_1.some(protocol) && protocol_versions_1.isMessageTypeSupported(message_types_1.MessageType.clearRememberedOriginV3, protocol)) {
            this.hostHelperMessageSender.sendMessage(message_types_1.MessageType.clearRememberedOriginV3, message.payload);
        }
    }
    clearAllRememberedDecisions(message) {
        this.hostHelperMessageSender.sendMessage(message_types_1.MessageType.clearRememberedDecisionsV1, new messages_1.ClearRememberedDecisionsV1());
    }
}
class OptionsController {
    constructor(hostHelperMessageSender, configNotifier, handshaker) {
        this.hostHelperMessageSender = hostHelperMessageSender;
        this.handshaker = handshaker;
        this.openPhishingLinksInSecureBrowser = false;
        this.userTrustedOrigins = [];
        this.userUntrustedOrigins = [];
        configNotifier.addConfigListenerForKeys((key, config) => { this.onConfigChanged(key, config); }, [
            config_keys_1.ConfigKey.openPhishingLinksInSecureBrowser,
            config_keys_1.ConfigKey.userTrustedOrigins,
            config_keys_1.ConfigKey.userUntrustedOrigins
        ]);
        this.portResolver = new port_resolver_1.PortResolver(host_constants_1.hostConstants.optionsPortName, port => this.onUnresolvedPortConnected(port));
        const port = this.portResolver.resolvePort();
        this.makeNewPageController(port);
    }
    onConfigChanged(key, config) {
        switch (key) {
            case config_keys_1.ConfigKey.openPhishingLinksInSecureBrowser:
                this.openPhishingLinksInSecureBrowser = config.openPhishingLinksInSecureBrowser;
                break;
            case config_keys_1.ConfigKey.userTrustedOrigins:
                this.userTrustedOrigins = config.userTrustedOrigins;
                break;
            case config_keys_1.ConfigKey.userUntrustedOrigins:
                this.userUntrustedOrigins = config.userUntrustedOrigins;
                break;
        }
        if (maybe_1.some(this.optionsPageController)) {
            this.optionsPageController.updateOptionsData(this.openPhishingLinksInSecureBrowser, this.userTrustedOrigins, this.userUntrustedOrigins);
        }
    }
    makeNewPageController(port) {
        this.optionsPageController = new OptionsPageController(this.handshaker, port, this.openPhishingLinksInSecureBrowser, this.userTrustedOrigins, this.userUntrustedOrigins, () => { this.onPortDisconnected(); }, this.hostHelperMessageSender);
    }
    onPortDisconnected() {
        this.optionsPageController = undefined;
        const port = this.portResolver.resolvePort();
        this.makeNewPageController(port);
    }
    onUnresolvedPortConnected(port) {
        log_1.log("OptionsController.onUnexpectedPortConnected");
        if (maybe_1.none(this.optionsPageController)) {
            this.makeNewPageController(promise_utils_1.makePromise(() => port));
        }
    }
}
exports.OptionsController = OptionsController;


/***/ }),
/* 114 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const config_keys_1 = __webpack_require__(7);
const url_utils_1 = __webpack_require__(4);
const browser_1 = __webpack_require__(6);
const maybe_1 = __webpack_require__(0);
const defaultNewTabPageUrls = {
    chrome: [
        "https://www.google.com/_/chrome/newtab",
        "https://www.bing.com/chrome/newtab"
    ],
    firefox: [],
    edge: [],
    edgeChromium: []
};
class NewTabPageUrlTracker {
    constructor(configNotifier, browser) {
        this.browser = browser;
        this.newTabPageUrls = new Map();
        this.updateNewTabPageUrls(defaultNewTabPageUrls);
        configNotifier.addConfigListenerForKey((key, config) => {
            this.onConfigChanged(key, config);
        }, config_keys_1.ConfigKey.newTabPageUrls);
    }
    onConfigChanged(key, config) {
        switch (key) {
            case config_keys_1.ConfigKey.newTabPageUrls:
                this.updateNewTabPageUrls(config.newTabPageUrls);
                break;
            default:
                break;
        }
    }
    isNewTabPageUrl(url) {
        if (maybe_1.none(this.browser)) {
            return false;
        }
        const urls = this.newTabPageUrls.get(this.browser);
        if (maybe_1.none(urls)) {
            return false;
        }
        return urls.has(url);
    }
    updateNewTabPageUrls(serializedNewTabPageUrls) {
        if (maybe_1.none(serializedNewTabPageUrls)) {
            this.newTabPageUrls = new Map();
            return;
        }
        this.newTabPageUrls = new Map();
        const updateBrowserNewTabPageUrls = (browser, specs) => {
            const urls = url_utils_1.makeUrlHashSet(url_utils_1.UrlCompareOptions.IgnoreSearchParams);
            urls.addMany(specs.map(url_utils_1.parseUrl).filter(maybe_1.some));
            this.newTabPageUrls.set(browser, urls);
        };
        updateBrowserNewTabPageUrls(browser_1.Browser.chrome, serializedNewTabPageUrls.chrome);
        updateBrowserNewTabPageUrls(browser_1.Browser.firefox, serializedNewTabPageUrls.firefox);
        updateBrowserNewTabPageUrls(browser_1.Browser.edge, serializedNewTabPageUrls.edge);
        updateBrowserNewTabPageUrls(browser_1.Browser.edgeChromium, serializedNewTabPageUrls.edgeChromium);
    }
}
exports.NewTabPageUrlTracker = NewTabPageUrlTracker;


/***/ }),
/* 115 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const message_port_channel_1 = __webpack_require__(58);
const error_handler_1 = __webpack_require__(63);
const message_sender_1 = __webpack_require__(59);
const promise_utils_1 = __webpack_require__(13);
const host_helper_connection_1 = __webpack_require__(116);
const errors_1 = __webpack_require__(21);
const event_dispatcher_1 = __webpack_require__(20);
const connection_1 = __webpack_require__(38);
const log = console.log;
class DummyMessagePortChannel {
    constructor() {
        this.messageSender = new message_sender_1.MessageSender((message) => this.sendMessage(message));
        this.onConnectionStateChanged = new event_dispatcher_1.EventDispatcher();
        this.onHandshaken = new event_dispatcher_1.EventDispatcher();
        this.isHandshaken = false;
        this.negotiatedVersion = undefined;
        this.connectionState = connection_1.ConnectionState.Disconnected;
    }
    connect() { }
    disconnect() { }
    sendMessage(message) {
        return false;
    }
}
class HelperPortChannel {
    constructor(errorHandler, messageRouter) {
        this.errorHandler = errorHandler;
        this.messageRouter = messageRouter;
        this.onHandshaken = new event_dispatcher_1.EventDispatcher();
        this.onConnectionStateChanged = new event_dispatcher_1.EventDispatcher();
        this.failedReconnectAttempts = 0;
        this.messageSender = new message_sender_1.MessageSender((message) => this.sendMessage(message));
        this.channel = this.makeConnection();
    }
    makeDummyConnection() {
        return new DummyMessagePortChannel();
    }
    makeConnection() {
        const createPort = promise_utils_1.makePromise(() => {
            return host_helper_connection_1.createHostHelperPort();
        });
        const channel = new message_port_channel_1.MessagePortChannel(createPort, (port) => this.onPortConnected(port), (port) => this.onPortDisconnected(port), (e) => this.onPortError(e), (e) => this.onHandshakeError(e), this.messageRouter, message_port_channel_1.Negotiation.NegotiateProtocolVersion);
        channel.onHandshaken.registerEventHandler((event) => this.onHandshaken.dispatchEvent(event));
        channel.onConnectionStateChanged.registerEventHandler((event) => this.onConnectionStateChanged.dispatchEvent(event));
        return channel;
    }
    connect() {
        log("HostHelperChannel.connect");
        this.channel.connect();
    }
    disconnect() {
        log("HostHelperChannel.disconnect");
        this.channel.disconnect();
    }
    reconnect() {
        log("HostHelperChannel.reconnect");
        const channel = this.channel;
        this.channel = this.makeDummyConnection();
        channel.disconnect();
    }
    sendMessage(message) {
        return this.channel.sendMessage(message);
    }
    onPortConnected(port) {
        log("HostHelperChannel.onPortConnected");
    }
    onPortDisconnected(port) {
        log(`HostHelperChannel.onPortDisconnected: failedReconnectAttempts: ${this.failedReconnectAttempts}`);
        if (this.failedReconnectAttempts < error_handler_1.maxFailedReconnectAttempts) {
            try {
                this.channel = this.makeConnection();
                this.channel.connect();
            }
            finally {
                this.failedReconnectAttempts += 1;
            }
        }
        else {
            this.errorHandler.raiseError(errors_1.ChragError.helperPortError, new Error("hostHelperChannel.onPortDisconnected"));
        }
    }
    onPortError(e) {
        log(`HostHelperChannel.onPortError: ${e}`);
        this.errorHandler.raiseError(errors_1.ChragError.helperPortError, e);
    }
    onHandshakeError(e) {
        log(`HostHelperChannel.onHandshakeError: ${e}`);
        this.errorHandler.raiseError(errors_1.ChragError.handshakeError, e);
    }
    get isHandshaken() {
        return this.channel.isHandshaken;
    }
    get negotiatedVersion() {
        return this.channel.negotiatedVersion;
    }
    get connectionState() {
        return this.channel.connectionState;
    }
}
exports.HelperPortChannel = HelperPortChannel;


/***/ }),
/* 116 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const host_constants_1 = __webpack_require__(12);
function createHostHelperPort() {
    return chrome.runtime.connectNative(host_constants_1.hostConstants.hostHelperId);
}
exports.createHostHelperPort = createHostHelperPort;


/***/ }),
/* 117 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const log_1 = __webpack_require__(1);
const messages_1 = __webpack_require__(5);
const message_types_1 = __webpack_require__(2);
const maybe_1 = __webpack_require__(0);
const protocol_versions_1 = __webpack_require__(14);
class HelperLogSink {
    constructor(sender) {
        this.sender = sender;
        this.isSendingLogMessage = false;
    }
    log(message) {
        if (this.isSendingLogMessage) {
            return;
        }
        const msg = new messages_1.LogMessageV1(messages_1.LogLevel.Info, message);
        this.isSendingLogMessage = true;
        try {
            this.sender.sendMessage(message_types_1.MessageType.logMessageV1, msg);
        }
        catch (e) {
        }
        finally {
            this.isSendingLogMessage = false;
        }
    }
    logError(message) {
        this.log(message);
    }
}
exports.HelperLogSink = HelperLogSink;
class MessageLogger {
    constructor(messageDecoder, handshaker) {
        this.protocolVersion = undefined;
        handshaker.onHandshaken.registerEventHandler((event) => {
            this.protocolVersion = event.negotiatedVersion;
        });
        messageDecoder.onMessageDecoded.registerEventHandler((event) => {
            const message = event.message;
            if (!message_types_1.isFrequentlySentMessageType(message.type)) {
                this.log(`MessageLogger.onMessageReceived: message: ${messages_1.messageToString(message)}`);
            }
        });
    }
    log(message) {
        if (maybe_1.some(this.protocolVersion) && protocol_versions_1.shouldLogMessage(this.protocolVersion)) {
            log_1.log(message);
        }
        else {
            console.log(message);
        }
    }
}
exports.MessageLogger = MessageLogger;


/***/ }),
/* 118 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const i18n_1 = __webpack_require__(31);
const maybe_1 = __webpack_require__(0);
const log_1 = __webpack_require__(1);
const config_keys_1 = __webpack_require__(7);
const url_utils_1 = __webpack_require__(4);
var ContextMenuIds;
(function (ContextMenuIds) {
    ContextMenuIds["brOpenLink"] = "BrOpenLink";
})(ContextMenuIds || (ContextMenuIds = {}));
class ContextMenuManager {
    constructor(browserLauncher, placementManager, errorHandler, configNotifier) {
        this.browserLauncher = browserLauncher;
        this.placementManager = placementManager;
        this.secureBrowserRedirectTrustedSites = false;
        chrome.contextMenus.create({
            id: ContextMenuIds.brOpenLink,
            title: i18n_1.getI18n(i18n_1.I18nMessages.openLinkInSecureBrowser),
            contexts: ['link']
        });
        if (errorHandler.isDormant) {
            this.hideContextMenus();
        }
        errorHandler.onDormantStateChanged.registerEventHandler(isDormant => this.onDormantStateChanged(isDormant));
        configNotifier.addConfigListenerForKeys((key, config) => this.onConfigChanged(key, config), [config_keys_1.ConfigKey.secureBrowserRedirectTrustedSites]);
    }
    registerListeners() {
        chrome.contextMenus.onClicked.addListener(itemData => this.onContextMenuClicked(itemData));
    }
    onDormantStateChanged(isDormant) {
        if (isDormant) {
            this.hideContextMenus();
        }
        else {
            this.showContextMenus();
        }
    }
    hideContextMenus() {
        chrome.contextMenus.update(ContextMenuIds.brOpenLink, { enabled: false });
    }
    showContextMenus() {
        chrome.contextMenus.update(ContextMenuIds.brOpenLink, { enabled: true });
    }
    onConfigChanged(key, config) {
        switch (key) {
            case config_keys_1.ConfigKey.secureBrowserRedirectTrustedSites:
                this.secureBrowserRedirectTrustedSites = config.secureBrowserRedirectTrustedSites;
                break;
        }
    }
    onContextMenuClicked(itemData) {
        if (maybe_1.none(this.browserLauncher) || maybe_1.none(this.placementManager)) {
            log_1.logError(new Error("Context menu click before ContextMenuManager.setup() has been called"));
            return;
        }
        if ((itemData.menuItemId === ContextMenuIds.brOpenLink) && itemData.linkUrl) {
            log_1.log(`User wants to open link in secure browser: ${itemData.linkUrl}`);
            let url = url_utils_1.parseUrl(itemData.linkUrl);
            if (maybe_1.some(url)) {
                if (this.secureBrowserRedirectTrustedSites && this.placementManager.isTrustedUrl(url)) {
                    log_1.log(`Ignoring context menu click to open ${itemData.linkUrl} in the secure browser because the site `
                        + `is trusted and trusted site redirection for BrChrome is enabled`);
                    return;
                }
                this.browserLauncher.launchBrowser(url, () => { });
            }
        }
    }
}
exports.ContextMenuManager = ContextMenuManager;


/***/ })
/******/ ]);