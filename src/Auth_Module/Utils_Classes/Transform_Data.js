"use strict";
exports.__esModule = true;
var Hill_Vector_1 = require("../Math_Classes/Hill_Vector");
var Modular_Data_1 = require("../Math_Classes/Modular_Data");
var Square_Hill_Matrix_1 = require("../Math_Classes/Square_Hill_Matrix");
var Elementary_Matrix_1 = require("../Math_Classes/Elementary_Matrix");
var Diagonal_Hill_Matrix_1 = require("../Math_Classes/Diagonal_Hill_Matrix");
var Transform_Data = /** @class */ (function () {
    function Transform_Data() {
    }
    Transform_Data.Get_Array_From_SquareMatrix = function (matrix) {
        var array_To_Return = new Array(matrix._order);
        var square_matrix = new Square_Hill_Matrix_1["default"](8, []);
        square_matrix = matrix;
        array_To_Return = square_matrix._matrix.map(function (item) { return item._data; });
        //console.log("Array from sqaure matrix is:", array_To_Return);
        return array_To_Return;
    };
    Transform_Data.Get_SquareMatrix_From_Array = function (array) {
        var matrix_To_Return = new Square_Hill_Matrix_1["default"](8, []);
        matrix_To_Return._matrix = matrix_To_Return.InitializeAs(0, 8);
        array.map(function (item, index) { return matrix_To_Return._matrix[index]._data = item; });
        return matrix_To_Return;
    };
    Transform_Data.Get_Array_From_ElementaryMatrix = function (matrix) {
        //[[u],[v],fInv]
        var array_To_Return = new Array(0);
        var vector1 = new Array(matrix._order);
        var vector2 = new Array(matrix._order);
        vector1 = matrix._vector1._vector.map(function (item) { return item._data; });
        vector2 = matrix._vector2._vector.map(function (item) { return item._data; });
        vector1.map(function (item) { return array_To_Return.push(item); });
        vector2.map(function (item) { return array_To_Return.push(item); });
        array_To_Return.push(matrix._factorForInverse._data);
        //console.log("Array from sqaure matrix is:", array_To_Return);
        return array_To_Return;
    };
    Transform_Data.Get_ElementaryMatrix_From_Array = function (array) {
        var matrix_To_Return = new Elementary_Matrix_1["default"](8);
        var vector1 = new Hill_Vector_1["default"](8, array.slice(0, 8));
        var vector2 = new Hill_Vector_1["default"](8, array.slice(8, 16));
        var factInv = new Modular_Data_1.Modular_Data(0);
        factInv._data = array[16];
        matrix_To_Return._factorForInverse = factInv;
        matrix_To_Return._vector1 = vector1;
        matrix_To_Return._vector2 = vector2;
        //console.log("Array from elemtary matrix is:", matrix_To_Return);
        return matrix_To_Return;
    };
    Transform_Data.Get_Array_From_DiagonalMatrix = function (matrix) {
        var array_To_Return = new Array(8);
        var diagonal_matrix = new Diagonal_Hill_Matrix_1["default"](matrix._order, []);
        diagonal_matrix = matrix;
        array_To_Return = diagonal_matrix._matrix.map(function (item) { return item._data; });
        return array_To_Return;
    };
    Transform_Data.Get_DiagonalMatrix_From_Array = function (array) {
        var matrix_To_Return = new Diagonal_Hill_Matrix_1["default"](8, []);
        matrix_To_Return._matrix = Diagonal_Hill_Matrix_1["default"].InitializeAs(0, 8);
        array.map(function (item, index) { return (matrix_To_Return._matrix[index]._data = item); });
        return matrix_To_Return;
    };
    Transform_Data.getAsciFromString = function (stringArray) {
        var arrayNumber = new Array();
        for (var i = 0; i < stringArray.length; i++) {
            arrayNumber[i] = stringArray.charCodeAt(i);
        }
        return arrayNumber;
    };
    return Transform_Data;
}());
exports["default"] = Transform_Data;
