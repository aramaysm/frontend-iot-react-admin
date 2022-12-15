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
var Square_Hill_Matrix_1 = require("./Math_Classes/Square_Hill_Matrix");
var Random_Generator_1 = require("./Math_Classes/Random_Generator");
var Elementary_Matrix_1 = require("./Math_Classes/Elementary_Matrix");
var Diagonal_Hill_Matrix_1 = require("./Math_Classes/Diagonal_Hill_Matrix");
var Transform_Data_1 = require("./Utils_Classes/Transform_Data");
var MATRIXORDER = 8;
var Z_BOUND = 20;
var Client_Entity = /** @class */ (function () {
    function Client_Entity(url_Server, password, username) {
        this._diagMat = new Diagonal_Hill_Matrix_1["default"](8, []);
        this._eigVectMat = new Elementary_Matrix_1["default"](8);
        this._invEigVectMat = new Square_Hill_Matrix_1["default"](8, []);
        this._privateKey = new Square_Hill_Matrix_1["default"](8, []);
        this._pubKeyBaseMatA = new Square_Hill_Matrix_1["default"](8, []);
        this._pubKeyMat = new Square_Hill_Matrix_1["default"](8, []);
        this._otherPubKeyMat = new Square_Hill_Matrix_1["default"](8, []);
        this._pubKeyBaseCommon = new Square_Hill_Matrix_1["default"](8, []);
        this._challenge = new Square_Hill_Matrix_1["default"](8, []);
        this._challenge_response = new Square_Hill_Matrix_1["default"](8, []);
        this._witness = new Square_Hill_Matrix_1["default"](8, []);
    }
    Client_Entity.prototype.phase_0 = function (info, pass) {
        return __awaiter(this, void 0, void 0, function () {
            var squareF, complementary_Base_Matrix1, _a, _b, _c, _d, _e, _f, _g, _h;
            return __generator(this, function (_j) {
                switch (_j.label) {
                    case 0:
                        this.CreateEigenValuesMatrixFor(); //DA
                        this._eigVectMat = Transform_Data_1["default"].Get_ElementaryMatrix_From_Array(info["P"]); //matrix P
                        this._invEigVectMat = Transform_Data_1["default"].Get_SquareMatrix_From_Array(info["P_Inv"]);
                        this._mValue = info["m"]; //m value
                        this._nValue = info["n"]; //n value
                        this._pubKeyBaseCommon = Transform_Data_1["default"].Get_SquareMatrix_From_Array(info["G"]);
                        this._otherPubKeyMat = Transform_Data_1["default"].Get_SquareMatrix_From_Array(info["GB"]);
                        squareF = new Square_Hill_Matrix_1["default"](8, Transform_Data_1["default"].getAsciFromString(pass));
                        complementary_Base_Matrix1 = new Square_Hill_Matrix_1["default"](8, []);
                        _b = (_a = Square_Hill_Matrix_1["default"]).MultiplyHillMatrices;
                        return [4 /*yield*/, squareF.PowerOf(squareF, this._mValue)];
                    case 1: return [4 /*yield*/, _b.apply(_a, [_j.sent(), this._pubKeyBaseCommon])];
                    case 2:
                        complementary_Base_Matrix1 = _j.sent();
                        _c = this;
                        _e = (_d = Square_Hill_Matrix_1["default"]).MultiplyHillMatrices;
                        _f = [complementary_Base_Matrix1];
                        return [4 /*yield*/, squareF.PowerOf(squareF, this._nValue)];
                    case 3: return [4 /*yield*/, _e.apply(_d, _f.concat([_j.sent()]))];
                    case 4:
                        _c._pubKeyBaseMatA = _j.sent();
                        _g = this;
                        return [4 /*yield*/, this.Create_PrivateKey(this._diagMat)];
                    case 5:
                        _g._privateKey = _j.sent();
                        _h = this;
                        return [4 /*yield*/, this.CreatePublicKeyMatrix(this._pubKeyBaseMatA)];
                    case 6:
                        _h._pubKeyMat = _j.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Client_Entity.prototype.phase_1 = function () {
        return __awaiter(this, void 0, void 0, function () {
            var matrix_S_1, matrix_S_2, powerOf_k_PrivateKey, powerOf_m_privateKey_Inverse, everything_ok;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this._witness = new Square_Hill_Matrix_1["default"](8, []);
                        this._challenge = new Square_Hill_Matrix_1["default"](8, []);
                        this._challenge_response = new Square_Hill_Matrix_1["default"](8, []);
                        matrix_S_1 = new Square_Hill_Matrix_1["default"](MATRIXORDER, []);
                        matrix_S_2 = new Square_Hill_Matrix_1["default"](MATRIXORDER, []);
                        this.InitializeKFor();
                        console.log("K value :", this._kValue);
                        return [4 /*yield*/, this._privateKey.PowerOf(this._privateKey, this._kValue)];
                    case 1:
                        powerOf_k_PrivateKey = _a.sent();
                        return [4 /*yield*/, this._privateKey.PowerOf(this._privateKey, -1 * this._mValue)];
                    case 2:
                        powerOf_m_privateKey_Inverse = _a.sent();
                        return [4 /*yield*/, Square_Hill_Matrix_1["default"].MultiplyHillMatrices(powerOf_k_PrivateKey, this._otherPubKeyMat)];
                    case 3:
                        matrix_S_1 = _a.sent();
                        return [4 /*yield*/, Square_Hill_Matrix_1["default"].MultiplyHillMatrices(matrix_S_1, powerOf_m_privateKey_Inverse)];
                    case 4:
                        matrix_S_2 = _a.sent();
                        //matrix_S = await Square_Hill_Matrix.MultiplyHillMatrices(matrix_S_4, matrix_S_5);
                        this._witness = matrix_S_2;
                        everything_ok = false;
                        return [2 /*return*/, {
                                GA: Transform_Data_1["default"].Get_Array_From_SquareMatrix(this._pubKeyMat),
                                witness: Transform_Data_1["default"].Get_Array_From_SquareMatrix(matrix_S_2)
                            }];
                }
            });
        });
    };
    Client_Entity.prototype.phase_2 = function (info) {
        this._bValue = info["b"];
        this._challenge = Transform_Data_1["default"].Get_SquareMatrix_From_Array(info["challenge"]);
        console.log("Challenge", Transform_Data_1["default"].Get_Array_From_SquareMatrix(this._challenge));
        return this.phase_3();
    };
    Client_Entity.prototype.phase_3 = function () {
        return __awaiter(this, void 0, void 0, function () {
            var matrix_R, matrix_R_1, matrix_R_2, witness_PowerOf_m_inverse, witness_PowerOf_n_inverse, _a, privateKey_to_k_inverse, privateKey_to_n_inverse, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        matrix_R = new Square_Hill_Matrix_1["default"](MATRIXORDER, []);
                        matrix_R_1 = new Square_Hill_Matrix_1["default"](MATRIXORDER, []);
                        matrix_R_2 = new Square_Hill_Matrix_1["default"](MATRIXORDER, []);
                        if (!(this._bValue === 0)) return [3 /*break*/, 5];
                        return [4 /*yield*/, this._witness.PowerOf(this._witness, -1 * this._mValue)];
                    case 1:
                        witness_PowerOf_m_inverse = _c.sent();
                        return [4 /*yield*/, this._witness.PowerOf(this._witness, -1 * this._nValue)];
                    case 2:
                        witness_PowerOf_n_inverse = _c.sent();
                        return [4 /*yield*/, Square_Hill_Matrix_1["default"].MultiplyHillMatrices(witness_PowerOf_m_inverse, this._challenge)];
                    case 3:
                        matrix_R_1 = _c.sent();
                        _a = this;
                        return [4 /*yield*/, Square_Hill_Matrix_1["default"].MultiplyHillMatrices(matrix_R_1, witness_PowerOf_n_inverse)];
                    case 4:
                        _a._challenge_response = _c.sent();
                        return [3 /*break*/, 10];
                    case 5:
                        if (!(this._bValue === 1)) return [3 /*break*/, 10];
                        return [4 /*yield*/, this._privateKey.PowerOf(this._privateKey, -1 * this._kValue)];
                    case 6:
                        privateKey_to_k_inverse = _c.sent();
                        return [4 /*yield*/, this._privateKey.PowerOf(this._privateKey, -1 * this._nValue)];
                    case 7:
                        privateKey_to_n_inverse = _c.sent();
                        return [4 /*yield*/, Square_Hill_Matrix_1["default"].MultiplyHillMatrices(privateKey_to_k_inverse, this._challenge)];
                    case 8:
                        matrix_R_1 = _c.sent(); //P Da^-k
                        _b = this;
                        return [4 /*yield*/, Square_Hill_Matrix_1["default"].MultiplyHillMatrices(matrix_R_1, privateKey_to_n_inverse)];
                    case 9:
                        _b._challenge_response = _c.sent(); //P^-1 Q
                        _c.label = 10;
                    case 10:
                        console.log("Challenge response: ", Transform_Data_1["default"].Get_Array_From_SquareMatrix(this._challenge_response));
                        return [2 /*return*/, {
                                R: Transform_Data_1["default"].Get_Array_From_SquareMatrix(this._challenge_response),
                                Ga: Transform_Data_1["default"].Get_Array_From_SquareMatrix(this._pubKeyBaseMatA)
                            }];
                }
            });
        });
    };
    Client_Entity.prototype.InitializeKFor = function () {
        this._kValue = Random_Generator_1.Random_Generator.RandomValueLessThan(Z_BOUND);
        while (this._kValue < 2 ||
            this._kValue == this._mValue ||
            this._kValue == this._nValue || (this._kValue % 2 == 1 && this._kValue > 10))
            this._kValue = Random_Generator_1.Random_Generator.RandomValueLessThan(Z_BOUND);
    };
    Client_Entity.prototype.InvertEigenVectorsMatrixOf = function () {
        this._invEigVectMat = Elementary_Matrix_1["default"].InverseOf(this._eigVectMat);
    };
    Client_Entity.prototype.CreatePublicKeyMatrix = function (G) {
        return __awaiter(this, void 0, void 0, function () {
            var PubKey, matrix_P_1, matrix_P_2, matrix_P_3, _a, _b, _c, _d, _e;
            return __generator(this, function (_f) {
                switch (_f.label) {
                    case 0:
                        PubKey = new Square_Hill_Matrix_1["default"](8, []);
                        matrix_P_1 = new Square_Hill_Matrix_1["default"](MATRIXORDER, []);
                        matrix_P_2 = new Square_Hill_Matrix_1["default"](MATRIXORDER, []);
                        matrix_P_3 = new Square_Hill_Matrix_1["default"](MATRIXORDER, []);
                        _b = (_a = Square_Hill_Matrix_1["default"]).MultiplyHillMatrices;
                        return [4 /*yield*/, this._privateKey.PowerOf(this._privateKey, this._mValue)];
                    case 1: return [4 /*yield*/, _b.apply(_a, [_f.sent(), G])];
                    case 2:
                        matrix_P_1 = _f.sent();
                        _d = (_c = Square_Hill_Matrix_1["default"]).MultiplyHillMatrices;
                        _e = [matrix_P_1];
                        return [4 /*yield*/, this._privateKey.PowerOf(this._privateKey, this._nValue)];
                    case 3: return [4 /*yield*/, _d.apply(_c, _e.concat([_f.sent()]))];
                    case 4:
                        matrix_P_2 = _f.sent();
                        PubKey = matrix_P_2;
                        return [2 /*return*/, PubKey];
                }
            });
        });
    };
    Client_Entity.prototype.Create_PrivateKey = function (diagMatrix) {
        return __awaiter(this, void 0, void 0, function () {
            var privKey, priv_1, priv_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        privKey = new Square_Hill_Matrix_1["default"](8, []);
                        priv_1 = new Square_Hill_Matrix_1["default"](8, []);
                        priv_2 = new Square_Hill_Matrix_1["default"](8, []);
                        return [4 /*yield*/, Square_Hill_Matrix_1["default"].MultiplyHillMatrices(Elementary_Matrix_1["default"].ToSquare_Hill_Matrix(this._eigVectMat), diagMatrix.ToSquareHillMatrix(diagMatrix))];
                    case 1:
                        priv_1 = _a.sent();
                        return [4 /*yield*/, Square_Hill_Matrix_1["default"].MultiplyHillMatrices(priv_1, this._invEigVectMat)];
                    case 2:
                        priv_2 = _a.sent();
                        privKey = priv_2;
                        console.log("Private key: ", Transform_Data_1["default"].Get_Array_From_SquareMatrix(privKey));
                        return [2 /*return*/, privKey];
                }
            });
        });
    };
    Client_Entity.prototype.CreateEigenValuesMatrixFor = function () {
        this._diagMat = new Diagonal_Hill_Matrix_1["default"](MATRIXORDER, []);
        this._diagMat._matrix = Diagonal_Hill_Matrix_1["default"].InitializeAs(3, MATRIXORDER);
    };
    return Client_Entity;
}());
exports["default"] = Client_Entity;
//let client = new Client_Entity("","aramaysm");
//console.log(client.encryptPassword("aramaysm"));
//Matriz paar el hash SHA-256 de aramaysm
/*let diagA:Square_Hill_Matrix = new Square_Hill_Matrix(8,[152, 146, 124, 58, 4, 162, 77, 192, 238, 111, 140, 25, 45, 191, 176, 152, 228, 116, 116, 218, 41, 29, 99, 211, 130, 141, 106, 218, 52, 98, 248, 237, 76, 206, 89, 240, 84, 177, 33, 154, 93, 153, 99, 188, 238, 114, 189, 129, 14, 104, 23, 31, 106, 26, 163, 68, 184, 76, 123, 13, 174, 19, 212, 143]);
let matrizPow: Square_Hill_Matrix = diagA.PowerOfValueByValue(diagA,10);
console.log("Power of diagonal is ", matrizPow._matrix);*/
/*let client = new Client_Entity("", "aramaysm", "");
client.phase_0("", "");
*/
//tsc Client_Entity.ts
//node Client_Entity.js
