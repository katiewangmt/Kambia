"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "app/api/checkout/route";
exports.ids = ["app/api/checkout/route"];
exports.modules = {

/***/ "next/dist/compiled/next-server/app-page.runtime.dev.js":
/*!*************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-page.runtime.dev.js" ***!
  \*************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/compiled/next-server/app-page.runtime.dev.js");

/***/ }),

/***/ "next/dist/compiled/next-server/app-route.runtime.dev.js":
/*!**************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-route.runtime.dev.js" ***!
  \**************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/compiled/next-server/app-route.runtime.dev.js");

/***/ }),

/***/ "child_process":
/*!********************************!*\
  !*** external "child_process" ***!
  \********************************/
/***/ ((module) => {

module.exports = require("child_process");

/***/ }),

/***/ "crypto":
/*!*************************!*\
  !*** external "crypto" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("crypto");

/***/ }),

/***/ "events":
/*!*************************!*\
  !*** external "events" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("events");

/***/ }),

/***/ "http":
/*!***********************!*\
  !*** external "http" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("http");

/***/ }),

/***/ "https":
/*!************************!*\
  !*** external "https" ***!
  \************************/
/***/ ((module) => {

module.exports = require("https");

/***/ }),

/***/ "util":
/*!***********************!*\
  !*** external "util" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("util");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fcheckout%2Froute&page=%2Fapi%2Fcheckout%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fcheckout%2Froute.js&appDir=%2FUsers%2Fkatie%2FKambia%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fkatie%2FKambia&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fcheckout%2Froute&page=%2Fapi%2Fcheckout%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fcheckout%2Froute.js&appDir=%2FUsers%2Fkatie%2FKambia%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fkatie%2FKambia&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \******************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   originalPathname: () => (/* binding */ originalPathname),\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   requestAsyncStorage: () => (/* binding */ requestAsyncStorage),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   staticGenerationAsyncStorage: () => (/* binding */ staticGenerationAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/future/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/future/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/future/route-kind */ \"(rsc)/./node_modules/next/dist/server/future/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _Users_katie_Kambia_app_api_checkout_route_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/api/checkout/route.js */ \"(rsc)/./app/api/checkout/route.js\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/checkout/route\",\n        pathname: \"/api/checkout\",\n        filename: \"route\",\n        bundlePath: \"app/api/checkout/route\"\n    },\n    resolvedPagePath: \"/Users/katie/Kambia/app/api/checkout/route.js\",\n    nextConfigOutput,\n    userland: _Users_katie_Kambia_app_api_checkout_route_js__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { requestAsyncStorage, staticGenerationAsyncStorage, serverHooks } = routeModule;\nconst originalPathname = \"/api/checkout/route\";\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        serverHooks,\n        staticGenerationAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIuanM/bmFtZT1hcHAlMkZhcGklMkZjaGVja291dCUyRnJvdXRlJnBhZ2U9JTJGYXBpJTJGY2hlY2tvdXQlMkZyb3V0ZSZhcHBQYXRocz0mcGFnZVBhdGg9cHJpdmF0ZS1uZXh0LWFwcC1kaXIlMkZhcGklMkZjaGVja291dCUyRnJvdXRlLmpzJmFwcERpcj0lMkZVc2VycyUyRmthdGllJTJGS2FtYmlhJTJGYXBwJnBhZ2VFeHRlbnNpb25zPXRzeCZwYWdlRXh0ZW5zaW9ucz10cyZwYWdlRXh0ZW5zaW9ucz1qc3gmcGFnZUV4dGVuc2lvbnM9anMmcm9vdERpcj0lMkZVc2VycyUyRmthdGllJTJGS2FtYmlhJmlzRGV2PXRydWUmdHNjb25maWdQYXRoPXRzY29uZmlnLmpzb24mYmFzZVBhdGg9JmFzc2V0UHJlZml4PSZuZXh0Q29uZmlnT3V0cHV0PSZwcmVmZXJyZWRSZWdpb249Jm1pZGRsZXdhcmVDb25maWc9ZTMwJTNEISIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBc0c7QUFDdkM7QUFDYztBQUNIO0FBQzFFO0FBQ0E7QUFDQTtBQUNBLHdCQUF3QixnSEFBbUI7QUFDM0M7QUFDQSxjQUFjLHlFQUFTO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxZQUFZO0FBQ1osQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBLFFBQVEsaUVBQWlFO0FBQ3pFO0FBQ0E7QUFDQSxXQUFXLDRFQUFXO0FBQ3RCO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDdUg7O0FBRXZIIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8veW91ci1wcm9qZWN0LW5hbWUvPzBlZGIiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQXBwUm91dGVSb3V0ZU1vZHVsZSB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL2Z1dHVyZS9yb3V0ZS1tb2R1bGVzL2FwcC1yb3V0ZS9tb2R1bGUuY29tcGlsZWRcIjtcbmltcG9ydCB7IFJvdXRlS2luZCB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL2Z1dHVyZS9yb3V0ZS1raW5kXCI7XG5pbXBvcnQgeyBwYXRjaEZldGNoIGFzIF9wYXRjaEZldGNoIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvbGliL3BhdGNoLWZldGNoXCI7XG5pbXBvcnQgKiBhcyB1c2VybGFuZCBmcm9tIFwiL1VzZXJzL2thdGllL0thbWJpYS9hcHAvYXBpL2NoZWNrb3V0L3JvdXRlLmpzXCI7XG4vLyBXZSBpbmplY3QgdGhlIG5leHRDb25maWdPdXRwdXQgaGVyZSBzbyB0aGF0IHdlIGNhbiB1c2UgdGhlbSBpbiB0aGUgcm91dGVcbi8vIG1vZHVsZS5cbmNvbnN0IG5leHRDb25maWdPdXRwdXQgPSBcIlwiXG5jb25zdCByb3V0ZU1vZHVsZSA9IG5ldyBBcHBSb3V0ZVJvdXRlTW9kdWxlKHtcbiAgICBkZWZpbml0aW9uOiB7XG4gICAgICAgIGtpbmQ6IFJvdXRlS2luZC5BUFBfUk9VVEUsXG4gICAgICAgIHBhZ2U6IFwiL2FwaS9jaGVja291dC9yb3V0ZVwiLFxuICAgICAgICBwYXRobmFtZTogXCIvYXBpL2NoZWNrb3V0XCIsXG4gICAgICAgIGZpbGVuYW1lOiBcInJvdXRlXCIsXG4gICAgICAgIGJ1bmRsZVBhdGg6IFwiYXBwL2FwaS9jaGVja291dC9yb3V0ZVwiXG4gICAgfSxcbiAgICByZXNvbHZlZFBhZ2VQYXRoOiBcIi9Vc2Vycy9rYXRpZS9LYW1iaWEvYXBwL2FwaS9jaGVja291dC9yb3V0ZS5qc1wiLFxuICAgIG5leHRDb25maWdPdXRwdXQsXG4gICAgdXNlcmxhbmRcbn0pO1xuLy8gUHVsbCBvdXQgdGhlIGV4cG9ydHMgdGhhdCB3ZSBuZWVkIHRvIGV4cG9zZSBmcm9tIHRoZSBtb2R1bGUuIFRoaXMgc2hvdWxkXG4vLyBiZSBlbGltaW5hdGVkIHdoZW4gd2UndmUgbW92ZWQgdGhlIG90aGVyIHJvdXRlcyB0byB0aGUgbmV3IGZvcm1hdC4gVGhlc2Vcbi8vIGFyZSB1c2VkIHRvIGhvb2sgaW50byB0aGUgcm91dGUuXG5jb25zdCB7IHJlcXVlc3RBc3luY1N0b3JhZ2UsIHN0YXRpY0dlbmVyYXRpb25Bc3luY1N0b3JhZ2UsIHNlcnZlckhvb2tzIH0gPSByb3V0ZU1vZHVsZTtcbmNvbnN0IG9yaWdpbmFsUGF0aG5hbWUgPSBcIi9hcGkvY2hlY2tvdXQvcm91dGVcIjtcbmZ1bmN0aW9uIHBhdGNoRmV0Y2goKSB7XG4gICAgcmV0dXJuIF9wYXRjaEZldGNoKHtcbiAgICAgICAgc2VydmVySG9va3MsXG4gICAgICAgIHN0YXRpY0dlbmVyYXRpb25Bc3luY1N0b3JhZ2VcbiAgICB9KTtcbn1cbmV4cG9ydCB7IHJvdXRlTW9kdWxlLCByZXF1ZXN0QXN5bmNTdG9yYWdlLCBzdGF0aWNHZW5lcmF0aW9uQXN5bmNTdG9yYWdlLCBzZXJ2ZXJIb29rcywgb3JpZ2luYWxQYXRobmFtZSwgcGF0Y2hGZXRjaCwgIH07XG5cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWFwcC1yb3V0ZS5qcy5tYXAiXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fcheckout%2Froute&page=%2Fapi%2Fcheckout%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fcheckout%2Froute.js&appDir=%2FUsers%2Fkatie%2FKambia%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fkatie%2FKambia&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

/***/ }),

/***/ "(rsc)/./app/api/checkout/route.js":
/*!***********************************!*\
  !*** ./app/api/checkout/route.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   POST: () => (/* binding */ POST)\n/* harmony export */ });\n/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/server */ \"(rsc)/./node_modules/next/dist/api/server.js\");\n/* harmony import */ var stripe__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! stripe */ \"(rsc)/./node_modules/stripe/esm/stripe.esm.node.js\");\n\n\n// Correct way to initialize Stripe on server side\nconst stripe = new stripe__WEBPACK_IMPORTED_MODULE_1__[\"default\"](process.env.STRIPE_SECRET_KEY, {\n    apiVersion: \"2023-10-16\"\n});\nasync function POST(req) {\n    try {\n        const body = await req.json();\n        const { boxes } = body;\n        const lineItems = boxes.map((box)=>{\n            if (box.macarons.length === 0) return null;\n            // Create description of flavors for this box\n            const flavorList = box.macarons.map((macaron)=>macaron.name).join(\", \");\n            const totalPrice = box.macarons.reduce((sum, macaron)=>sum + macaron.price * 100, 0);\n            return {\n                price_data: {\n                    currency: \"usd\",\n                    product_data: {\n                        name: `Macaron Box ${box.id}`,\n                        description: `Flavors: ${flavorList}`,\n                        metadata: {\n                            flavors: flavorList,\n                            boxId: box.id.toString()\n                        }\n                    },\n                    unit_amount: totalPrice\n                },\n                quantity: 1\n            };\n        }).filter(Boolean); // Remove any null items\n        const session = await stripe.checkout.sessions.create({\n            payment_method_types: [\n                \"card\"\n            ],\n            line_items: lineItems,\n            mode: \"payment\",\n            success_url: `${req.headers.get(\"origin\")}/success?session_id={CHECKOUT_SESSION_ID}`,\n            cancel_url: `${req.headers.get(\"origin\")}/products`,\n            metadata: {\n                totalBoxes: boxes.length.toString()\n            }\n        });\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            sessionId: session.id\n        });\n    } catch (error) {\n        console.error(\"Stripe error:\", error);\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            error: error.message\n        }, {\n            status: 500\n        });\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9hcHAvYXBpL2NoZWNrb3V0L3JvdXRlLmpzIiwibWFwcGluZ3MiOiI7Ozs7OztBQUEyQztBQUNmO0FBRTVCLGtEQUFrRDtBQUNsRCxNQUFNRSxTQUFTLElBQUlELDhDQUFNQSxDQUFDRSxRQUFRQyxHQUFHLENBQUNDLGlCQUFpQixFQUFFO0lBQ3ZEQyxZQUFZO0FBQ2Q7QUFFTyxlQUFlQyxLQUFLQyxHQUFHO0lBQzVCLElBQUk7UUFDRixNQUFNQyxPQUFPLE1BQU1ELElBQUlFLElBQUk7UUFDM0IsTUFBTSxFQUFFQyxLQUFLLEVBQUUsR0FBR0Y7UUFFbEIsTUFBTUcsWUFBWUQsTUFBTUUsR0FBRyxDQUFDQyxDQUFBQTtZQUMxQixJQUFJQSxJQUFJQyxRQUFRLENBQUNDLE1BQU0sS0FBSyxHQUFHLE9BQU87WUFFdEMsNkNBQTZDO1lBQzdDLE1BQU1DLGFBQWFILElBQUlDLFFBQVEsQ0FBQ0YsR0FBRyxDQUFDSyxDQUFBQSxVQUFXQSxRQUFRQyxJQUFJLEVBQUVDLElBQUksQ0FBQztZQUNsRSxNQUFNQyxhQUFhUCxJQUFJQyxRQUFRLENBQUNPLE1BQU0sQ0FBQyxDQUFDQyxLQUFLTCxVQUFZSyxNQUFNTCxRQUFRTSxLQUFLLEdBQUcsS0FBSztZQUVwRixPQUFPO2dCQUNMQyxZQUFZO29CQUNWQyxVQUFVO29CQUNWQyxjQUFjO3dCQUNaUixNQUFNLENBQUMsWUFBWSxFQUFFTCxJQUFJYyxFQUFFLENBQUMsQ0FBQzt3QkFDN0JDLGFBQWEsQ0FBQyxTQUFTLEVBQUVaLFdBQVcsQ0FBQzt3QkFDckNhLFVBQVU7NEJBQ1JDLFNBQVNkOzRCQUNUZSxPQUFPbEIsSUFBSWMsRUFBRSxDQUFDSyxRQUFRO3dCQUN4QjtvQkFDRjtvQkFDQUMsYUFBYWI7Z0JBQ2Y7Z0JBQ0FjLFVBQVU7WUFDWjtRQUNGLEdBQUdDLE1BQU0sQ0FBQ0MsVUFBVSx3QkFBd0I7UUFFNUMsTUFBTUMsVUFBVSxNQUFNcEMsT0FBT3FDLFFBQVEsQ0FBQ0MsUUFBUSxDQUFDQyxNQUFNLENBQUM7WUFDcERDLHNCQUFzQjtnQkFBQzthQUFPO1lBQzlCQyxZQUFZL0I7WUFDWmdDLE1BQU07WUFDTkMsYUFBYSxDQUFDLEVBQUVyQyxJQUFJc0MsT0FBTyxDQUFDQyxHQUFHLENBQUMsVUFBVSx5Q0FBeUMsQ0FBQztZQUNwRkMsWUFBWSxDQUFDLEVBQUV4QyxJQUFJc0MsT0FBTyxDQUFDQyxHQUFHLENBQUMsVUFBVSxTQUFTLENBQUM7WUFDbkRqQixVQUFVO2dCQUNSbUIsWUFBWXRDLE1BQU1LLE1BQU0sQ0FBQ2lCLFFBQVE7WUFDbkM7UUFDRjtRQUVBLE9BQU9qQyxxREFBWUEsQ0FBQ1UsSUFBSSxDQUFDO1lBQUV3QyxXQUFXWixRQUFRVixFQUFFO1FBQUM7SUFDbkQsRUFBRSxPQUFPdUIsT0FBTztRQUNkQyxRQUFRRCxLQUFLLENBQUMsaUJBQWlCQTtRQUMvQixPQUFPbkQscURBQVlBLENBQUNVLElBQUksQ0FDdEI7WUFBRXlDLE9BQU9BLE1BQU1FLE9BQU87UUFBQyxHQUN2QjtZQUFFQyxRQUFRO1FBQUk7SUFFbEI7QUFDRiIsInNvdXJjZXMiOlsid2VicGFjazovL3lvdXItcHJvamVjdC1uYW1lLy4vYXBwL2FwaS9jaGVja291dC9yb3V0ZS5qcz8wZWViIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5leHRSZXNwb25zZSB9IGZyb20gJ25leHQvc2VydmVyJztcbmltcG9ydCBTdHJpcGUgZnJvbSAnc3RyaXBlJztcblxuLy8gQ29ycmVjdCB3YXkgdG8gaW5pdGlhbGl6ZSBTdHJpcGUgb24gc2VydmVyIHNpZGVcbmNvbnN0IHN0cmlwZSA9IG5ldyBTdHJpcGUocHJvY2Vzcy5lbnYuU1RSSVBFX1NFQ1JFVF9LRVksIHtcbiAgYXBpVmVyc2lvbjogJzIwMjMtMTAtMTYnXG59KTtcblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIFBPU1QocmVxKSB7XG4gIHRyeSB7XG4gICAgY29uc3QgYm9keSA9IGF3YWl0IHJlcS5qc29uKCk7XG4gICAgY29uc3QgeyBib3hlcyB9ID0gYm9keTtcblxuICAgIGNvbnN0IGxpbmVJdGVtcyA9IGJveGVzLm1hcChib3ggPT4ge1xuICAgICAgaWYgKGJveC5tYWNhcm9ucy5sZW5ndGggPT09IDApIHJldHVybiBudWxsO1xuXG4gICAgICAvLyBDcmVhdGUgZGVzY3JpcHRpb24gb2YgZmxhdm9ycyBmb3IgdGhpcyBib3hcbiAgICAgIGNvbnN0IGZsYXZvckxpc3QgPSBib3gubWFjYXJvbnMubWFwKG1hY2Fyb24gPT4gbWFjYXJvbi5uYW1lKS5qb2luKCcsICcpO1xuICAgICAgY29uc3QgdG90YWxQcmljZSA9IGJveC5tYWNhcm9ucy5yZWR1Y2UoKHN1bSwgbWFjYXJvbikgPT4gc3VtICsgbWFjYXJvbi5wcmljZSAqIDEwMCwgMCk7XG5cbiAgICAgIHJldHVybiB7XG4gICAgICAgIHByaWNlX2RhdGE6IHtcbiAgICAgICAgICBjdXJyZW5jeTogJ3VzZCcsXG4gICAgICAgICAgcHJvZHVjdF9kYXRhOiB7XG4gICAgICAgICAgICBuYW1lOiBgTWFjYXJvbiBCb3ggJHtib3guaWR9YCxcbiAgICAgICAgICAgIGRlc2NyaXB0aW9uOiBgRmxhdm9yczogJHtmbGF2b3JMaXN0fWAsICAvLyBBZGQgZmxhdm9ycyB0byBkZXNjcmlwdGlvblxuICAgICAgICAgICAgbWV0YWRhdGE6IHtcbiAgICAgICAgICAgICAgZmxhdm9yczogZmxhdm9yTGlzdCwgIC8vIEFsc28gc3RvcmUgaW4gbWV0YWRhdGEgZm9yIHJlZmVyZW5jZVxuICAgICAgICAgICAgICBib3hJZDogYm94LmlkLnRvU3RyaW5nKClcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9LFxuICAgICAgICAgIHVuaXRfYW1vdW50OiB0b3RhbFByaWNlLFxuICAgICAgICB9LFxuICAgICAgICBxdWFudGl0eTogMSxcbiAgICAgIH07XG4gICAgfSkuZmlsdGVyKEJvb2xlYW4pOyAvLyBSZW1vdmUgYW55IG51bGwgaXRlbXNcblxuICAgIGNvbnN0IHNlc3Npb24gPSBhd2FpdCBzdHJpcGUuY2hlY2tvdXQuc2Vzc2lvbnMuY3JlYXRlKHtcbiAgICAgIHBheW1lbnRfbWV0aG9kX3R5cGVzOiBbJ2NhcmQnXSxcbiAgICAgIGxpbmVfaXRlbXM6IGxpbmVJdGVtcyxcbiAgICAgIG1vZGU6ICdwYXltZW50JyxcbiAgICAgIHN1Y2Nlc3NfdXJsOiBgJHtyZXEuaGVhZGVycy5nZXQoJ29yaWdpbicpfS9zdWNjZXNzP3Nlc3Npb25faWQ9e0NIRUNLT1VUX1NFU1NJT05fSUR9YCxcbiAgICAgIGNhbmNlbF91cmw6IGAke3JlcS5oZWFkZXJzLmdldCgnb3JpZ2luJyl9L3Byb2R1Y3RzYCxcbiAgICAgIG1ldGFkYXRhOiB7XG4gICAgICAgIHRvdGFsQm94ZXM6IGJveGVzLmxlbmd0aC50b1N0cmluZygpLFxuICAgICAgfVxuICAgIH0pO1xuXG4gICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKHsgc2Vzc2lvbklkOiBzZXNzaW9uLmlkIH0pO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIGNvbnNvbGUuZXJyb3IoJ1N0cmlwZSBlcnJvcjonLCBlcnJvcik7XG4gICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKFxuICAgICAgeyBlcnJvcjogZXJyb3IubWVzc2FnZSB9LFxuICAgICAgeyBzdGF0dXM6IDUwMCB9XG4gICAgKTtcbiAgfVxufSAiXSwibmFtZXMiOlsiTmV4dFJlc3BvbnNlIiwiU3RyaXBlIiwic3RyaXBlIiwicHJvY2VzcyIsImVudiIsIlNUUklQRV9TRUNSRVRfS0VZIiwiYXBpVmVyc2lvbiIsIlBPU1QiLCJyZXEiLCJib2R5IiwianNvbiIsImJveGVzIiwibGluZUl0ZW1zIiwibWFwIiwiYm94IiwibWFjYXJvbnMiLCJsZW5ndGgiLCJmbGF2b3JMaXN0IiwibWFjYXJvbiIsIm5hbWUiLCJqb2luIiwidG90YWxQcmljZSIsInJlZHVjZSIsInN1bSIsInByaWNlIiwicHJpY2VfZGF0YSIsImN1cnJlbmN5IiwicHJvZHVjdF9kYXRhIiwiaWQiLCJkZXNjcmlwdGlvbiIsIm1ldGFkYXRhIiwiZmxhdm9ycyIsImJveElkIiwidG9TdHJpbmciLCJ1bml0X2Ftb3VudCIsInF1YW50aXR5IiwiZmlsdGVyIiwiQm9vbGVhbiIsInNlc3Npb24iLCJjaGVja291dCIsInNlc3Npb25zIiwiY3JlYXRlIiwicGF5bWVudF9tZXRob2RfdHlwZXMiLCJsaW5lX2l0ZW1zIiwibW9kZSIsInN1Y2Nlc3NfdXJsIiwiaGVhZGVycyIsImdldCIsImNhbmNlbF91cmwiLCJ0b3RhbEJveGVzIiwic2Vzc2lvbklkIiwiZXJyb3IiLCJjb25zb2xlIiwibWVzc2FnZSIsInN0YXR1cyJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./app/api/checkout/route.js\n");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/stripe","vendor-chunks/math-intrinsics","vendor-chunks/es-errors","vendor-chunks/qs","vendor-chunks/call-bind-apply-helpers","vendor-chunks/get-proto","vendor-chunks/object-inspect","vendor-chunks/has-symbols","vendor-chunks/gopd","vendor-chunks/function-bind","vendor-chunks/side-channel","vendor-chunks/side-channel-weakmap","vendor-chunks/side-channel-map","vendor-chunks/side-channel-list","vendor-chunks/hasown","vendor-chunks/get-intrinsic","vendor-chunks/es-object-atoms","vendor-chunks/es-define-property","vendor-chunks/dunder-proto","vendor-chunks/call-bound"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fcheckout%2Froute&page=%2Fapi%2Fcheckout%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fcheckout%2Froute.js&appDir=%2FUsers%2Fkatie%2FKambia%2Fapp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=%2FUsers%2Fkatie%2FKambia&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();