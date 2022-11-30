"use strict";
exports.__esModule = true;
var Modular_Data_1 = require("./Math_Classes/Modular_Data");
var Square_Hill_Matrix_1 = require("./Math_Classes/Square_Hill_Matrix");
var Random_Generator_1 = require("./Math_Classes/Random_Generator");
var Elementary_Matrix_1 = require("./Math_Classes/Elementary_Matrix");
var Diagonal_Hill_Matrix_1 = require("./Math_Classes/Diagonal_Hill_Matrix");
var Transform_Data_1 = require("./Utils_Classes/Transform_Data");
var MATRIXORDER = 8;
var Z_BOUND = 33;
var Client_Entity = /** @class */ (function () {
    function Client_Entity(url_Server, password, username) {
        this._diagMat = new Diagonal_Hill_Matrix_1["default"](0, []);
        this._eigVectMat = new Elementary_Matrix_1["default"](0);
        this._invEigVectMat = new Square_Hill_Matrix_1["default"](0, []);
        this._bValue = 0;
        this._kValue = 0;
        this._mValue = 0;
        this._nValue = 0;
        this._privateKey = new Square_Hill_Matrix_1["default"](0, []);
        this._pubKeyBaseMatA = new Square_Hill_Matrix_1["default"](0, []);
        this._pubKeyMat = new Square_Hill_Matrix_1["default"](0, []);
        this._otherPubKeyMat = new Square_Hill_Matrix_1["default"](0, []);
        this._pubKeyBaseCommon = new Square_Hill_Matrix_1["default"](0, []);
        this._privKeyExp_m = new Square_Hill_Matrix_1["default"](0, []);
        this._privKeyExp_n = new Square_Hill_Matrix_1["default"](0, []);
        this._witnessExp_m = new Square_Hill_Matrix_1["default"](0, []);
        this._witnessExp_n = new Square_Hill_Matrix_1["default"](0, []);
        this._challenge = new Square_Hill_Matrix_1["default"](0, []);
        this._challenge_response = new Square_Hill_Matrix_1["default"](0, []);
        this._witness = new Square_Hill_Matrix_1["default"](0, []);
    }
    Client_Entity.prototype.phase_0 = function (info, pass) {
        /*
        this._diagMat = this.encryptPassword(pass); //DA
        this._eigVectMat = Transform_Data.Get_ElementaryMatrix_From_Array(
          info["P"]
        ); //matrix P
        this._mValue = info["m"]; //m value
        this._nValue = info["n"]; //n value
        this._pubKeyBaseMat = Transform_Data.Get_ElementaryMatrix_From_Array(
          info["G"]
        ); //matrix G
        this._otherPubKeyMat = Transform_Data.Get_SquareMatrix_From_Array(
          info["GB"]
        ); //matrix GB
        //this._diagB = Transform_Data.Get_DiagonalMatrix_From_Array(info["D"]);
    
        this.CreatePublicKeyMatrix(
          this._eigVectMat,
          Diagonal_Hill_Matrix.PowerOf(this._diagMat, this._mValue),
          Diagonal_Hill_Matrix.PowerOf(this._diagMat, this._nValue),
          this._pubKeyBaseMat
        ); //GA
         
        return this.phase_1(info);*/
        var _this = this;
        this.CreateEigenValuesMatrixFor(); //DB
        this._eigVectMat = Transform_Data_1["default"].Get_ElementaryMatrix_From_Array(info["P"]); //matrix P
        this._mValue = info["m"]; //m value
        this._nValue = info["n"]; //n value
        this._pubKeyBaseCommon = Transform_Data_1["default"].Get_SquareMatrix_From_Array(info["G"]);
        this._otherPubKeyMat = Transform_Data_1["default"].Get_SquareMatrix_From_Array(info["GB"]);
        /****Matriz F-representa la contraseña del usuario recibido en codigo ASCI */
        var squareF = new Square_Hill_Matrix_1["default"](8, Transform_Data_1["default"].getAsciFromString(pass));
        /***Calculo de Gb=E^m*G*E^n   ***/
        var complementary_Base_Matrix1 = new Square_Hill_Matrix_1["default"](8, []);
        complementary_Base_Matrix1 = Square_Hill_Matrix_1["default"].MultiplyHillMatrices(squareF.PowerOf(squareF, this._mValue), this._pubKeyBaseCommon);
        this._pubKeyBaseMatA = Square_Hill_Matrix_1["default"].MultiplyHillMatrices(complementary_Base_Matrix1, squareF.PowerOf(squareF, this._nValue));
        this._privateKey = this.Create_PrivateKey(this._diagMat);
        var expPrivKeys = Square_Hill_Matrix_1["default"].TwoPowerOf(this._mValue, this._nValue, this._privateKey);
        var founded = expPrivKeys.find(function (x) { return x.power === _this._mValue; });
        if (founded)
            this._privKeyExp_m = founded.matrixPower;
        console.log("First founded: ", founded);
        var founded1 = expPrivKeys.find(function (x) { return x.power === _this._nValue; });
        if (founded)
            this._privKeyExp_n = founded1.matrixPower;
        this._pubKeyMat = this.CreatePublicKeyMatrix(this._pubKeyBaseMatA);
        return this.phase_1("");
    };
    Client_Entity.prototype.phase_1 = function (info) {
        var _this = this;
        var matrix_S = new Square_Hill_Matrix_1["default"](MATRIXORDER, []);
        var matrix_S_1 = new Square_Hill_Matrix_1["default"](MATRIXORDER, []); //P*Dk
        var matrix_S_2 = new Square_Hill_Matrix_1["default"](MATRIXORDER, []); //P-1*Gb
        this.InitializeKFor();
        matrix_S_1 = Square_Hill_Matrix_1["default"].MultiplyHillMatrices(this._privateKey.PowerOf(this._privateKey, this._kValue), this._otherPubKeyMat);
        matrix_S_2 = Square_Hill_Matrix_1["default"].MultiplyHillMatrices(matrix_S_1, this._privKeyExp_m.InverseOf(this._privKeyExp_m));
        //matrix_S = Square_Hill_Matrix.MultiplyHillMatrices(matrix_S_4, matrix_S_5);
        this._witness = matrix_S_2;
        var expWitness = Square_Hill_Matrix_1["default"].TwoPowerOf(this._mValue, this._nValue, this._witness);
        var founded = expWitness.find(function (x) { return x.power === _this._mValue; });
        if (founded)
            this._witnessExp_m = founded.matrixPower;
        var founded1 = expWitness.find(function (x) { return x.power === _this._nValue; });
        if (founded1)
            this._witnessExp_n = founded1.matrixPower;
        console.log("Witness is: ", Transform_Data_1["default"].Get_Array_From_SquareMatrix(matrix_S_2));
        var everything_ok = false;
        return {
            GA: Transform_Data_1["default"].Get_Array_From_SquareMatrix(this._pubKeyMat),
            witness: Transform_Data_1["default"].Get_Array_From_SquareMatrix(matrix_S_2)
        };
    };
    Client_Entity.prototype.phase_2 = function (info) {
        this._bValue = info["b"];
        this._challenge = Transform_Data_1["default"].Get_SquareMatrix_From_Array(info["q_matrix"]);
        return this.phase_3();
    };
    Client_Entity.prototype.phase_3 = function () {
        var matrix_R = new Square_Hill_Matrix_1["default"](MATRIXORDER, []);
        var matrix_R_1 = new Square_Hill_Matrix_1["default"](MATRIXORDER, []);
        var matrix_R_2 = new Square_Hill_Matrix_1["default"](MATRIXORDER, []);
        if (this._bValue === 0) {
            matrix_R_1 = Square_Hill_Matrix_1["default"].MultiplyHillMatrices(this._witnessExp_m.InverseOf(this._witnessExp_m), this._challenge);
            matrix_R_2 = Square_Hill_Matrix_1["default"].MultiplyHillMatrices(matrix_R_1, this._witnessExp_m.InverseOf(this._witnessExp_n));
            /*matrix_R = Square_Hill_Matrix.MultiplyHillMatrices(
              matrix_R_2,
              this._pubKeyBaseMatA
            );*/
            matrix_R = matrix_R_2;
        }
        else if (this._bValue === 1) {
            // R = A^-k * Q * A^-n
            // R = P Da^-k P^-1 * Q * P Da^-n P^-1
            var matrix_R_3 = new Square_Hill_Matrix_1["default"](MATRIXORDER, []);
            matrix_R_1 = Square_Hill_Matrix_1["default"].MultiplyHillMatrices(this._privateKey.PowerOf(this._privateKey, -1 * this._kValue), this._challenge); //P Da^-k
            matrix_R_2 = Square_Hill_Matrix_1["default"].MultiplyHillMatrices(matrix_R_1, this._privKeyExp_n.InverseOf(this._privKeyExp_n)); //P^-1 Q
            matrix_R = matrix_R_2; //R_4 * R_5
        }
        this._challenge_response = matrix_R;
        return {
            R: Transform_Data_1["default"].Get_Array_From_SquareMatrix(this._challenge_response),
            Ga: Transform_Data_1["default"].Get_Array_From_SquareMatrix(this._pubKeyBaseMatA)
        };
        /*this.Send_Results(
          {
            P: Transform_Data.Get_Array_From_ElementaryMatrix(this._eigVectMat),
            m: this._mValue,
            n: this._nValue,
            G: Transform_Data.Get_Array_From_ElementaryMatrix(this._pubKeyBaseMat),
            GB: Transform_Data.Get_Array_From_SquareMatrix(this._otherPubKeyMat),
            D: Transform_Data.Get_Array_From_DiagonalMatrix(this._diagB),
            R: Transform_Data.Get_Array_From_SquareMatrix(matrix_R),
            GA: Transform_Data.Get_Array_From_SquareMatrix(this._pubKeyMat),
            witness: Transform_Data.Get_Array_From_SquareMatrix(this._witness),
          },
          3
        )
          .then((response) => {
            everything_ok = this.phase_4(response);
          })
          .catch((error) => {});
    */
    };
    Client_Entity.prototype.phase_4 = function (info) {
        if (info["data"]["validated_credentials"] === true) {
            if (info["data"]["finished"] === false) {
                this.phase_1("");
                return false;
            }
            else {
                return true;
            }
        }
        else {
            throw new Error("Credentials are not validated");
        }
    };
    Client_Entity.prototype.phase_4_adapted = function (matrixdiagB, matrix_complementary) { };
    Client_Entity.prototype.InitializeKFor = function () {
        this._kValue = Random_Generator_1.Random_Generator.RandomValueLessThan(Z_BOUND);
        while (this._kValue < 2 ||
            this._kValue == this._mValue ||
            this._kValue == this._nValue)
            this._kValue = Random_Generator_1.Random_Generator.RandomValueLessThan(Z_BOUND);
    };
    Client_Entity.prototype.InvertEigenVectorsMatrixOf = function () {
        this._invEigVectMat = Elementary_Matrix_1["default"].InverseOf(this._eigVectMat);
        console.log("Inverse is : ", Transform_Data_1["default"].Get_Array_From_SquareMatrix(this._invEigVectMat));
    };
    Client_Entity.prototype.CreatePublicKeyMatrix = function (G) {
        // GA = A^m*G*A^n = P*D^m*P^(-1)*G*P*D^n*P(-1).      // Total: 22n*n + 20n + 7.
        /*
        let order = P._order;
        let k: Modular_Data = P._factorForInverse;
        let u: Array<Modular_Data> = P._vector1._vector;
        let vT: Array<Modular_Data> = P._vector2._vector;
        let r: Array<Modular_Data> = G._vector1._vector;
        let sT: Array<Modular_Data> = G._vector2._vector;
    
        let P1: Elementary_Matrix = new Elementary_Matrix(order);
        let o: Array<Modular_Data> = P1._vector1._vector;
        let pT: Array<Modular_Data> = P1._vector2._vector;
    
        // a = sTu; b = vTr
        let a: Modular_Data = new Modular_Data(0);
        let b: Modular_Data = new Modular_Data(0);
    
        // cT = vTD^m; d = kD^nu; e = cTd; fT = cTD^n;
        // g = cTx; h = yTd; iT = yTD^n; j = D^md; l = D^mx
    
        let cT: Array<Modular_Data> = new Array<Modular_Data>(order);
        let d: Array<Modular_Data> = new Array<Modular_Data>(order);
        let fT: Array<Modular_Data> = new Array<Modular_Data>(order);
        let iT: Array<Modular_Data> = new Array<Modular_Data>(order);
        let j: Array<Modular_Data> = new Array<Modular_Data>(order);
        let l: Array<Modular_Data> = new Array<Modular_Data>(order);
    
        let e: Modular_Data = new Modular_Data(0);
        let g: Modular_Data = new Modular_Data(0);
        let h: Modular_Data = new Modular_Data(0);
        let s: Modular_Data = new Modular_Data(0);
    
        let lIdx: number = 0;
        let PubKey: Square_Hill_Matrix = new Square_Hill_Matrix(order, []);
        let pkData: Array<Modular_Data> = PubKey._matrix;
    
        for (let idx = 0; idx < order * order; idx++)
          pkData[idx] = new Modular_Data(0);
    
        let DmData: Array<Modular_Data> = DmMat._matrix;
        let DnData: Array<Modular_Data> = DnMat._matrix;
    
        for (let idx = 0; idx < order; idx++) {
          a = Modular_Data.operator_add(
            a,
            Modular_Data.operator_mult(sT[idx], u[idx])
          );
          b = Modular_Data.operator_add(
            b,
            Modular_Data.operator_mult(vT[idx], r[idx])
          );
    
          cT[idx] = Modular_Data.operator_mult(vT[idx], DmData[idx]);
          d[idx] = Modular_Data.operator_mult(
            k,
            Modular_Data.operator_mult(DnData[idx], u[idx])
          );
    
          e = Modular_Data.operator_add(
            e,
            Modular_Data.operator_mult(cT[idx], d[idx])
          );
          fT[idx] = Modular_Data.operator_mult(cT[idx], DnData[idx]);
        }
        let kb: Modular_Data = Modular_Data.operator_mult(k, b);
    
        for (let idx = 0; idx < order; idx++) {
          o[idx] = Modular_Data.operator_sub(
            r[idx],
            Modular_Data.operator_mult(kb, u[idx])
          );
          pT[idx] = Modular_Data.operator_sub(
            sT[idx],
            Modular_Data.operator_mult(a, vT[idx])
          );
    
          s = Modular_Data.operator_add(
            s,
            Modular_Data.operator_mult(o[idx], pT[idx])
          );
          e = Modular_Data.operator_add(
            e,
            Modular_Data.operator_mult(cT[idx], d[idx])
          );
          g = Modular_Data.operator_add(
            g,
            Modular_Data.operator_mult(cT[idx], o[idx])
          );
          h = Modular_Data.operator_add(
            h,
            Modular_Data.operator_mult(pT[idx], d[idx])
          );
          iT[idx] = Modular_Data.operator_add(
            iT[idx],
            Modular_Data.operator_mult(pT[idx], DnData[idx])
          );
          j[idx] = Modular_Data.operator_add(
            j[idx],
            Modular_Data.operator_mult(DmData[idx], d[idx])
          );
    
          l[idx] = Modular_Data.operator_add(
            l[idx],
            Modular_Data.operator_mult(DmData[idx], o[idx])
          );
        }
        P1._factorForInverse = Modular_Data.operator_inverseOf(
          Modular_Data.operator_sub_value(s, 1)
        );
        //P1->_initialized = true;
    
        // u2 = gu - l; v1T = evT - fT; v2T = iT - hvT
    
        let u2: Array<Modular_Data> = new Array<Modular_Data>(order);
        let v1T: Array<Modular_Data> = new Array<Modular_Data>(order);
        let v2T: Array<Modular_Data> = new Array<Modular_Data>(order);
    
        let u1v1T: Modular_Data = new Modular_Data(0);
        let u2v2T: Modular_Data = new Modular_Data(0);
        let u3v3T: Modular_Data = new Modular_Data(0);
    
        for (let idx = 0; idx < order; idx++) {
          v1T[idx] = Modular_Data.operator_sub(
            Modular_Data.operator_mult(e, vT[idx]),
            fT[idx]
          );
          v2T[idx] = Modular_Data.operator_sub(
            iT[idx],
            Modular_Data.operator_mult(h, vT[idx])
          );
        }
        lIdx = 0;
    
        for (let rIdx = 0; rIdx < order; rIdx++) {
          pkData[rIdx * order + rIdx] = Modular_Data.operator_mult(
            DmData[rIdx],
            DnData[rIdx]
          );
          u2[rIdx] = Modular_Data.operator_sub(
            Modular_Data.operator_mult(g, u[rIdx]),
            l[rIdx]
          );
    
          for (let cIdx = 0; cIdx < order; cIdx++) {
            u1v1T = Modular_Data.operator_mult(u[rIdx], v1T[cIdx]);
            u2v2T = Modular_Data.operator_mult(u2[rIdx], v2T[cIdx]);
            u3v3T = Modular_Data.operator_mult(j[rIdx], vT[cIdx]);
    
            pkData[lIdx] = Modular_Data.operator_add(
              pkData[lIdx],
              Modular_Data.operator_add(
                u1v1T,
                Modular_Data.operator_sub(u2v2T, u3v3T)
              )
            );
            lIdx++;
          }
        }
        PubKey._matrix = pkData;
        */
        var PubKey = new Square_Hill_Matrix_1["default"](8, []);
        var matrix_P_1 = new Square_Hill_Matrix_1["default"](MATRIXORDER, []); //P*Dk
        var matrix_P_2 = new Square_Hill_Matrix_1["default"](MATRIXORDER, []); //P-1*Gb
        var matrix_P_3 = new Square_Hill_Matrix_1["default"](MATRIXORDER, []); //P*D-m
        matrix_P_1 = Square_Hill_Matrix_1["default"].MultiplyHillMatrices(this._privKeyExp_m, G);
        matrix_P_2 = Square_Hill_Matrix_1["default"].MultiplyHillMatrices(matrix_P_1, this._privKeyExp_n);
        PubKey = matrix_P_2;
        return PubKey;
    };
    Client_Entity.prototype.InitializeBFor = function () {
        //return 0;
        return Random_Generator_1.Random_Generator.RandomValue() % 2;
    };
    Client_Entity.prototype.Create_PrivateKey = function (diagMatrix) {
        var privKey = new Square_Hill_Matrix_1["default"](8, []);
        var priv_1 = new Square_Hill_Matrix_1["default"](8, []);
        var priv_2 = new Square_Hill_Matrix_1["default"](8, []);
        this.InvertEigenVectorsMatrixOf();
        priv_1 = Square_Hill_Matrix_1["default"].MultiplyHillMatrices(Elementary_Matrix_1["default"].ToSquare_Hill_Matrix(this._eigVectMat), diagMatrix.ToSquareHillMatrix(diagMatrix));
        priv_2 = Square_Hill_Matrix_1["default"].MultiplyHillMatrices(priv_1, this._invEigVectMat);
        privKey = priv_2;
        console.log("Private key: ", Transform_Data_1["default"].Get_Array_From_SquareMatrix(privKey));
        return privKey;
    };
    Client_Entity.prototype.encryptPassword = function (password) {
        ///Cipher Text initially empty
        var a = Random_Generator_1.Random_Generator.RandomValue();
        var b = Random_Generator_1.Random_Generator.RandomValue();
        var i = 0;
        console.log("In client: ", "a:", a, ",b:", b);
        var diagMatrix = new Diagonal_Hill_Matrix_1["default"](MATRIXORDER, []);
        for (i = 0; i < password.length; i++) {
            if (password[i] != " ")
                diagMatrix._matrix[i] = new Modular_Data_1.Modular_Data(a * password.charCodeAt(i) + b);
        }
        diagMatrix._matrix[i] = new Modular_Data_1.Modular_Data(a);
        diagMatrix._matrix[i + 1] = new Modular_Data_1.Modular_Data(b);
        //console.log("Matrix generated: ", diagMatrix._matrix);
        return diagMatrix;
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
