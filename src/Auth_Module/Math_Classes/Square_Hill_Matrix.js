"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var Modular_Data_1 = require("./Modular_Data");
var Random_Generator_1 = require("./Random_Generator");
var Transform_Data_1 = require("../Utils_Classes/Transform_Data");
var MODULUS = 251;
var Square_Hill_Matrix = /** @class */ (function () {
    function Square_Hill_Matrix(orderNew, matrixNew) {
        this._order = orderNew;
        if (matrixNew !== null && matrixNew !== undefined && matrixNew.length > 0) {
            this._matrix = matrixNew.map(function (item) { return new Modular_Data_1.Modular_Data(item); });
        }
        else {
            this._matrix = this.InitializeAs(-1, 8);
        }
    }
    Square_Hill_Matrix.prototype.get_matrix = function () {
        return this._matrix;
    };
    Square_Hill_Matrix.prototype.get_order = function () {
        return this._order;
    };
    Square_Hill_Matrix.prototype.set_matrix = function (newMatrix) {
        this._matrix = newMatrix;
    };
    Square_Hill_Matrix.prototype.set_order = function (newOrder) {
        this._order = newOrder;
    };
    Square_Hill_Matrix.prototype.getItem = function (row, col) {
        return this._matrix[row * this._order + col].get_data();
    };
    Square_Hill_Matrix.prototype.setItem = function (row, col, dataNew) {
        this._matrix[row * this._order + col] = new Modular_Data_1.Modular_Data(dataNew);
    };
    /* --mType es el tipo de matriz--
  0 - matriz de identidad,
  1 - matriz null,
  2 - matriz de valores random
  3 - matriz de valores random sin duplicados
  */
    Square_Hill_Matrix.AreEquals = function (mat1, mat2) {
        var order = mat1._order;
        var areEquals = true;
        var idx = 0;
        while (idx < order * order && areEquals === true)
            if (mat1._matrix[idx]._data !== mat2._matrix[idx]._data)
                areEquals = false;
            else
                idx++;
        return areEquals;
    };
    Square_Hill_Matrix.prototype.InitializeAs = function (mtype, order) {
        var matrix = new Array(order * order);
        if (order == 0)
            return new Array(0);
        switch (mtype) {
            case -1:
                for (var i = 0; i < order * order; i++)
                    matrix[i] = new Modular_Data_1.Modular_Data(0);
            case 0:
                for (var i = 0; i < order * order; i++)
                    if (i % (order + 1) != 0)
                        matrix[i] = new Modular_Data_1.Modular_Data(0);
                    else
                        matrix[i] = new Modular_Data_1.Modular_Data(1);
                break;
            case 1:
                for (var i = 0; i < order * order; i++)
                    matrix[i] = new Modular_Data_1.Modular_Data(0);
                break;
            case 2: {
                var data = new Modular_Data_1.Modular_Data(0);
                for (var i = 0; i < order * order; i++) {
                    data._data =
                        ((Random_Generator_1.Random_Generator.RandomValue() % MODULUS) + MODULUS) % MODULUS;
                    while (data._data == 0)
                        data._data =
                            ((Random_Generator_1.Random_Generator.RandomValue() % MODULUS) + MODULUS) % MODULUS;
                    matrix[i] = data;
                }
                break;
            }
            default: {
                //console.log("Into default option");
                var data = new Modular_Data_1.Modular_Data(0);
                var valid = false, found = false;
                var j = 0;
                for (var i = 0; i < order * order; i++) {
                    valid = false;
                    while (valid === false) {
                        data = new Modular_Data_1.Modular_Data(0);
                        data._data =
                            ((Random_Generator_1.Random_Generator.RandomValue() % MODULUS) + MODULUS) % MODULUS;
                        while (data._data === 0)
                            data._data =
                                ((Random_Generator_1.Random_Generator.RandomValue() % MODULUS) + MODULUS) %
                                    MODULUS;
                        j = 0;
                        found = false;
                        while (j < i && found === false) {
                            found = matrix[j]._data === data._data ? true : false;
                            if (found === false)
                                j++;
                        }
                        if (found === false) {
                            valid = true;
                        }
                        else {
                            valid = false;
                        }
                    }
                    matrix[i] = data;
                }
            }
        }
        return matrix;
    };
    Square_Hill_Matrix.prototype.GaussianEliminationOf = function () {
        var order = this._order;
        var array = Random_Generator_1.Random_Generator.Generate_Zeros_Array(order);
        var gaussMat = new Square_Hill_Matrix(this._order, array);
        gaussMat.set_matrix(this._matrix);
        var diagData = new Modular_Data_1.Modular_Data(0);
        var quotient = new Modular_Data_1.Modular_Data(0);
        for (var col = 0; col < order - 1; col++) {
            diagData._data = gaussMat._matrix[col * order + col]._data;
            for (var row = col + 1; row < order; row++) {
                quotient = Modular_Data_1.Modular_Data.operator_div(gaussMat._matrix[row * order + col], diagData);
                console.log("Quotient is: ", quotient, ", diagonal_data is : ", diagData, " and matrix gauss mat is ", gaussMat._matrix[row * order + col]);
                gaussMat.setItem(row, col, 0);
                for (var k = col + 1; k < order; k++)
                    gaussMat._matrix[row * order + k]._data -=
                        quotient._data * gaussMat._matrix[col * order + k]._data;
            }
            console.log("Triangular matrix in gauss elimination: ", gaussMat);
        }
        return gaussMat;
    };
    Square_Hill_Matrix.prototype.DeterminantByGaussOf = function () {
        var order = this._order;
        var array = Random_Generator_1.Random_Generator.Generate_Zeros_Array(order);
        var result = new Modular_Data_1.Modular_Data(0);
        var triangMat = new Square_Hill_Matrix(order, array);
        triangMat = this.GaussianEliminationOf();
        console.log("Triangular matrix: ", triangMat);
        result._data = triangMat.get_matrix()[0]._data;
        for (var i = 1; i < order; i++) {
            result = Modular_Data_1.Modular_Data.operator_mult(result, triangMat._matrix[i * order + i]);
            console.log("Determinante ahora: ", result);
        }
        return result;
    };
    Square_Hill_Matrix.prototype.InverseOf = function (matrix) {
        return __awaiter(this, void 0, void 0, function () {
            var luFactors, inverse;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.LuFactorizationOf(matrix)];
                    case 1:
                        luFactors = _a.sent();
                        return [4 /*yield*/, this.InverseOfWithLU(matrix, luFactors)];
                    case 2:
                        inverse = _a.sent();
                        return [2 /*return*/, inverse];
                }
            });
        });
    };
    Square_Hill_Matrix.prototype.InverseOfWithLU = function (matrix, luFactors) {
        var order = 8, index = 0;
        var inverse = new Square_Hill_Matrix(order, []);
        inverse._matrix = this.InitializeAs(0, order);
        for (var r = 1; r < order; r++)
            for (var c = 0; c < r; c++) {
                index = r * order + c;
                for (var k = c; k < r; k++)
                    inverse._matrix[index] = Modular_Data_1.Modular_Data.operator_sub(inverse._matrix[index], Modular_Data_1.Modular_Data.operator_mult(luFactors._matrix[r * order + k], inverse._matrix[k * order + c]));
            }
        var sum = new Modular_Data_1.Modular_Data(0);
        for (var c = 0; c < order; c++)
            for (var r = order - 1; r >= 0; r--) {
                index = r * order + c;
                sum = new Modular_Data_1.Modular_Data(0);
                for (var k = r + 1; k < order; k++)
                    sum = Modular_Data_1.Modular_Data.operator_add(sum, Modular_Data_1.Modular_Data.operator_mult(luFactors._matrix[r * order + k], inverse._matrix[k * order + c]));
                inverse._matrix[index] = Modular_Data_1.Modular_Data.operator_div(Modular_Data_1.Modular_Data.operator_sub(inverse._matrix[index], sum), luFactors._matrix[r * order + r]);
            }
        return inverse;
    };
    Square_Hill_Matrix.prototype.LuFactorizationOf = function (matrix) {
        var luFactors = new Square_Hill_Matrix(matrix._order, []);
        luFactors._matrix = (matrix._matrix);
        var diagValue = new Modular_Data_1.Modular_Data(0);
        var order = matrix._order;
        for (var k = 0; k < order - 1; k++) {
            diagValue._data = luFactors._matrix[k * order + k]._data;
            for (var row = k + 1; row < order; row++)
                luFactors._matrix[row * order + k] = Modular_Data_1.Modular_Data.operator_div(luFactors._matrix[row * order + k], diagValue);
            for (var row = k + 1; row < order; row++)
                for (var col = k + 1; col < order; col++)
                    luFactors._matrix[row * order + col] = Modular_Data_1.Modular_Data.operator_sub(luFactors._matrix[row * order + col], Modular_Data_1.Modular_Data.operator_mult(luFactors._matrix[row * order + k], luFactors._matrix[k * order + col]));
        }
        return luFactors;
    };
    Square_Hill_Matrix.prototype.MultiplyHillMatricesSquareByDiagonal = function (matrix, dMat) {
        var order = matrix._order, index = 0;
        var product = new Square_Hill_Matrix(order, []);
        var matData = matrix._matrix;
        var dMatData = dMat._matrix;
        var prodData = product._matrix;
        for (var col = 0; col < order; col++)
            for (var row = 0; row < order; row++) {
                index = row * order + col;
                prodData[index] = Modular_Data_1.Modular_Data.operator_mult(dMatData[col], matData[index]);
            }
        return product;
    };
    Square_Hill_Matrix.MultiplyHillMatrices = function (matrix1, matrix2) {
        return __awaiter(this, void 0, void 0, function () {
            var matrix1_Array, matrix2_Array, order, sum, product, row, col, k, result;
            return __generator(this, function (_a) {
                matrix1_Array = Transform_Data_1["default"].Get_Array_From_SquareMatrix(matrix1);
                matrix2_Array = Transform_Data_1["default"].Get_Array_From_SquareMatrix(matrix2);
                order = 8;
                sum = 0;
                product = new Array(order * order);
                for (row = 0; row < order; row++) {
                    for (col = 0; col < order; col++) {
                        sum = 0;
                        for (k = 0; k < order; k++)
                            sum = sum + matrix1_Array[row * order + k] * matrix2_Array[k * order + col];
                        product[row * order + col] = sum;
                    }
                }
                result = new Square_Hill_Matrix(order, product);
                return [2 /*return*/, result];
            });
        });
    };
    Square_Hill_Matrix.prototype.PowerOf = function (mat, power) {
        return __awaiter(this, void 0, void 0, function () {
            var matPower, i;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        matPower = new Square_Hill_Matrix(8, []);
                        matPower._matrix = mat._matrix;
                        if (!(power != 0)) return [3 /*break*/, 7];
                        i = 0;
                        _a.label = 1;
                    case 1:
                        if (!(i < Math.abs(power) - 1)) return [3 /*break*/, 4];
                        return [4 /*yield*/, Square_Hill_Matrix.MultiplyHillMatrices(matPower, mat)];
                    case 2:
                        matPower = _a.sent();
                        _a.label = 3;
                    case 3:
                        i++;
                        return [3 /*break*/, 1];
                    case 4:
                        if (!(power < 0)) return [3 /*break*/, 6];
                        return [4 /*yield*/, this.InverseOf(matPower)];
                    case 5:
                        matPower = _a.sent();
                        _a.label = 6;
                    case 6: return [3 /*break*/, 8];
                    case 7:
                        matPower._matrix = this.InitializeAs(0, mat._order);
                        _a.label = 8;
                    case 8: return [2 /*return*/, matPower];
                }
            });
        });
    };
    return Square_Hill_Matrix;
}());
/*let hill_v = new Square_Hill_Matrix(2, [1547, 5478, 8746, 4578]);

console.log("Determinant of square matrix:", hill_v.DeterminantByGaussOf());
*/
/*
let square1: Square_Hill_Matrix = new Square_Hill_Matrix(8, []);
let square2: Square_Hill_Matrix = new Square_Hill_Matrix(8, []);
let squareResult: Square_Hill_Matrix = new Square_Hill_Matrix(8, []);

let matrix1: Array<Modular_Data> = square1.InitializeAs(3, 8);
square1._matrix = matrix1;
let matrix2: Array<Modular_Data> = square2.InitializeAs(3, 8);
square2._matrix = matrix2;

console.log("First matrix is:");
console.table(square1._matrix);
console.log("Second matrix is:");
console.table(square2._matrix);

squareResult = Square_Hill_Matrix.MultiplyHillMatrices(square1, square2);

console.log("Result matrix is:");
console.table(squareResult._matrix);
*/
exports["default"] = Square_Hill_Matrix;
/*
let square1: Square_Hill_Matrix = new Square_Hill_Matrix(
  8,
  [
    101, 51, 48, 50, 55, 50, 56, 57, 52, 52, 50, 49, 99, 100, 101, 49, 53, 101,
    53, 97, 51, 52, 48, 52, 48, 100, 50, 102, 52, 53, 55, 57, 55, 99, 98, 50,
    56, 54, 101, 52, 52, 55, 57, 98, 49, 99, 54, 98, 99, 98, 97, 48, 99, 48, 99,
    53, 101, 97, 50, 55, 57, 49, 56, 102,
  ]
);

let square2: Square_Hill_Matrix = Square_Hill_Matrix.MultiplyHillMatrices(
  square1,
  square1
);
let square3: Square_Hill_Matrix = Square_Hill_Matrix.MultiplyHillMatrices(
  square2,
  square1
);
let square4: Square_Hill_Matrix = Square_Hill_Matrix.MultiplyHillMatrices(
  square3,
  square1
);

console.log(
  "Result power matrix is: ",
  Transform_Data.Get_Array_From_SquareMatrix(square4)
);

/*
let matrix1: Array<Modular_Data> = square1.InitializeAs(3, 8);
square1._matrix = matrix1;
console.log("Result matrix is: ", Transform_Data.Get_Array_From_SquareMatrix(square1));
*/
//tsc Square_Hill_Matrix.ts
// node Square_Hill_Matrix.js
//tsc src/Math_Classes/Square_Hill_Matrix.ts
//  node src/Math_Classes/Square_Hill_Matrix.js
/*
let square1: Square_Hill_Matrix = new Square_Hill_Matrix(8,[101, 51, 48, 50, 55, 50, 56, 57, 52, 52, 50, 49, 99, 100, 101, 49, 53, 101, 53, 97, 51, 52, 48, 52, 48, 100, 50, 102, 52, 53, 55, 57, 55, 99, 98, 50, 56, 54, 101, 52, 52, 55, 57, 98, 49, 99, 54, 98, 99, 98, 97, 48, 99, 48, 99, 53, 101, 97, 50, 55, 57, 49, 56, 102]);
Transform_Data.Get_Array_From_SquareMatrix(square1);
let matrixEPower_e = square1.PowerOfValueByValue(square1, 12);
Transform_Data.Get_Array_From_SquareMatrix(matrixEPower_e);*/
