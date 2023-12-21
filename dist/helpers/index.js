"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.codeStatus = exports.getIndex = void 0;
const http_codes_1 = require("./http_codes");
Object.defineProperty(exports, "codeStatus", { enumerable: true, get: function () { return http_codes_1.codeStatus; } });
const genIndex_1 = require("./genIndex");
Object.defineProperty(exports, "getIndex", { enumerable: true, get: function () { return genIndex_1.getIndex; } });
