/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/mapa.js":
/*!************************!*\
  !*** ./src/js/mapa.js ***!
  \************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n(function () {\r\n  //esto es un ifi una funcion que se llama asi misma\r\n  //tiene las caracterisca es que dejamos las variable este scope y no se utilizaran en otros archivos\r\n\r\n  //utilizar Provider y Geocoder\r\n  //las librearias de leaflet se agregan mediante la L\r\n\r\n  const geocodeService = L.esri.Geocoding.geocodeService();\r\n\r\n  const lat = document.querySelector(\"#lat\").value || 38.8806526;\r\n  const lng = document.querySelector(\"#lng\").value || 1.4045704;\r\n  const mapa = L.map(\"mapa\").setView([lat, lng], 12);\r\n  let marker;\r\n\r\n  //el div con la id de mapa tiene una altura de 0 no se muestra pero con css se deberia mostrar\r\n  //Esta parte de atribuciones es necesaria si no , no funciona leaflet\r\n  L.tileLayer(\"https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png\", {\r\n    attribution:\r\n      '&copy; <a href=\"https://www.openstreetmap.org/copyright\">OpenStreetMap</a> contributors',\r\n  }).addTo(mapa);\r\n\r\n  //El pin\r\n  //l es con tiene toda la informacion de leaftlet\r\n  //draggable es el pin para mover\r\n  //autoPan es para centrar el mapa cuando lo movamos\r\n  marker = new L.marker([lat, lng], {\r\n    draggable: true,\r\n    autoPan: true,\r\n  }).addTo(mapa);\r\n\r\n  //detecta el moviento del pin\r\n\r\n  marker.on(\"moveend\", function (event) {\r\n    marker = event.target;\r\n\r\n    //retorna la posicion\r\n    const posicion = marker.getLatLng();\r\n\r\n    //   console.log(posicion)\r\n    //centramos esa cordenada\r\n\r\n    mapa.panTo(new L.latLng(posicion.lat, posicion.lng));\r\n    //Obtener informacion de la calle al obtener el PIN\r\n\r\n    geocodeService.reverse().latlng(posicion, 13).run(function (error, resultado) {\r\n        console.log(resultado);\r\n\r\n        marker.bindPopup(resultado.address.LongLabel)\r\n\r\n        //llenar los campos de crear.pug creados\r\n\r\n        //seleccion de parrafo y muestra la calle y lo renderiza\r\n\r\n        //todo esto se va a guardar en la base de datos\r\n\r\n        //Ya cuando estemos trabajando en la vista de la propiedad de las personas que le pueda interesar esta\r\n        //propiedad, estaremos mostrando el mapa.\r\n        //es por esto que requerimos estos valores\r\n\r\n        document.querySelector(\".calle\").textContent =resultado?.address.Address ??  \"\"\r\n        \r\n        //nombre de la calle\r\n        document.querySelector(\"#calle\").value =resultado?.address.Address ??  \"\"\r\n\r\n        document.querySelector(\"#lat\").value =resultado?.latlng?.lat ??  \"\"\r\n\r\n        document.querySelector(\"#lng\").value =resultado?.latlng.lng ??  \"\"\r\n      });\r\n  });\r\n\r\n})();\r\n\n\n//# sourceURL=webpack://bienesraices_mvc/./src/js/mapa.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/js/mapa.js"](0, __webpack_exports__, __webpack_require__);
/******/ 	
/******/ })()
;