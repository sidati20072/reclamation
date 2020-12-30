(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main-apps-apps-module"],{

/***/ "./src/app/main/apps/apps.module.ts":
/*!******************************************!*\
  !*** ./src/app/main/apps/apps.module.ts ***!
  \******************************************/
/*! exports provided: AppsModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppsModule", function() { return AppsModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _fuse_shared_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @fuse/shared.module */ "./src/@fuse/shared.module.ts");
/* harmony import */ var _order_order_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./order/order.component */ "./src/app/main/apps/order/order.component.ts");





var routes = [
    {
        path: 'dashboards/analytics',
        loadChildren: './dashboards/analytics/analytics.module#AnalyticsDashboardModule'
    },
    {
        path: 'dashboards/project',
        loadChildren: './dashboards/project/project.module#ProjectDashboardModule'
    },
    {
        path: 'utilisateur',
        loadChildren: './contacts/contacts.module#ContactsModule'
    },
    {
        path: 'reclamations',
        loadChildren: './reclamation/reclamation.module#ReclamationModule'
    }
];
var AppsModule = /** @class */ (function () {
    function AppsModule() {
    }
    AppsModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [
                _angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(routes),
                _fuse_shared_module__WEBPACK_IMPORTED_MODULE_3__["FuseSharedModule"],
            ],
            declarations: [_order_order_component__WEBPACK_IMPORTED_MODULE_4__["OrderComponent"]]
        })
    ], AppsModule);
    return AppsModule;
}());



/***/ }),

/***/ "./src/app/main/apps/order/order.component.html":
/*!******************************************************!*\
  !*** ./src/app/main/apps/order/order.component.html ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<p>\n  order works!\n</p>\n"

/***/ }),

/***/ "./src/app/main/apps/order/order.component.scss":
/*!******************************************************!*\
  !*** ./src/app/main/apps/order/order.component.scss ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL21haW4vYXBwcy9vcmRlci9vcmRlci5jb21wb25lbnQuc2NzcyJ9 */"

/***/ }),

/***/ "./src/app/main/apps/order/order.component.ts":
/*!****************************************************!*\
  !*** ./src/app/main/apps/order/order.component.ts ***!
  \****************************************************/
/*! exports provided: OrderComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OrderComponent", function() { return OrderComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "./node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");


var OrderComponent = /** @class */ (function () {
    function OrderComponent() {
    }
    OrderComponent.prototype.ngOnInit = function () {
    };
    OrderComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-order',
            template: __webpack_require__(/*! ./order.component.html */ "./src/app/main/apps/order/order.component.html"),
            styles: [__webpack_require__(/*! ./order.component.scss */ "./src/app/main/apps/order/order.component.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [])
    ], OrderComponent);
    return OrderComponent;
}());



/***/ })

}]);
//# sourceMappingURL=main-apps-apps-module.js.map