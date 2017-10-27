"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ApiService = /** @class */ (function () {
    function ApiService() {
    }
    ApiService.prototype.getDataObj = function () {
        return {
            'name': 'Kenneth',
            'balance': 100000,
            'owner': 'Christian'
        };
    };
    return ApiService;
}());
exports.ApiService = ApiService;
