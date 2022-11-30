import Hill_Vector from "./Math_Classes/Hill_Vector";
import { Modular_Data } from "./Math_Classes/Modular_Data";
import Square_Hill_Matrix from "./Math_Classes/Square_Hill_Matrix";
import { Random_Generator } from "./Math_Classes/Random_Generator";
import Elementary_Matrix from "./Math_Classes/Elementary_Matrix";
import Diagonal_Hill_Matrix from "./Math_Classes/Diagonal_Hill_Matrix";
import Transform_Data from "./Utils_Classes/Transform_Data";

import axios from "axios";

const MATRIXORDER = 8;
const Z_BOUND = 33;

export default class Client_Entity {
  _diagMat: Diagonal_Hill_Matrix; // Diagonal Hill matrix D.
  _eigVectMat: Elementary_Matrix; // Elementary Hill matrix P (public and shared.)
  // int idx;

  _invEigVectMat: Square_Hill_Matrix; // Inverse matrix of P (public and shared.)
  _bValue: number;
  _kValue: number;
  _mValue: number;
  _nValue: number;
  _privateKey: Square_Hill_Matrix;
  _pubKeyBaseMatA: Square_Hill_Matrix; //matrix Ga (public and shared.)
  _pubKeyBaseCommon: Square_Hill_Matrix; //matrix G
  _pubKeyMat: Square_Hill_Matrix; // Square Hill matrix Gx (public and shared. Here, x stands for A [Alice] or B [Bob].)
  _otherPubKeyMat: Square_Hill_Matrix;
  _witness: Square_Hill_Matrix;
  _challenge_response: Square_Hill_Matrix;
  _privKeyExp_m: Square_Hill_Matrix;
  _privKeyExp_n: Square_Hill_Matrix;
  _witnessExp_m:Square_Hill_Matrix;
  _witnessExp_n:Square_Hill_Matrix;

  //Atributos propios de la clase
  _challenge: Square_Hill_Matrix;
  _url_Server: string;
  _password: string;
  _diagB: Diagonal_Hill_Matrix;
  _username: string;

  constructor(url_Server: string, password: string, username: string) {
    this._diagMat = new Diagonal_Hill_Matrix(0, []);
    this._eigVectMat = new Elementary_Matrix(0);
    this._invEigVectMat = new Square_Hill_Matrix(0, []);
    this._bValue = 0;
    this._kValue = 0;
    this._mValue = 0;
    this._nValue = 0;
    this._privateKey = new Square_Hill_Matrix(0, []);
    this._pubKeyBaseMatA = new Square_Hill_Matrix(0, []);
    this._pubKeyMat = new Square_Hill_Matrix(0, []);
    this._otherPubKeyMat = new Square_Hill_Matrix(0, []);
    this._pubKeyBaseCommon = new Square_Hill_Matrix(0, []);
    this._privKeyExp_m = new Square_Hill_Matrix(0, []);
    this._privKeyExp_n = new Square_Hill_Matrix(0, []);
    this._witnessExp_m = new Square_Hill_Matrix(0, []);
    this._witnessExp_n = new Square_Hill_Matrix(0, []);
    this._challenge = new Square_Hill_Matrix(0, []);
    this._challenge_response = new Square_Hill_Matrix(0, []);
    this._witness = new Square_Hill_Matrix(0, []);

  }

  phase_0(info: any, pass: string): any {
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

    this.CreateEigenValuesMatrixFor(); //DB

    this._eigVectMat = Transform_Data.Get_ElementaryMatrix_From_Array(
      info["P"]
    ); //matrix P
    this._mValue = info["m"]; //m value
    this._nValue = info["n"]; //n value
    this._pubKeyBaseCommon = Transform_Data.Get_SquareMatrix_From_Array(
      info["G"]
    );
    this._otherPubKeyMat = Transform_Data.Get_SquareMatrix_From_Array(
      info["GB"]
    );

    /****Matriz F-representa la contraseña del usuario recibido en codigo ASCI */

    let squareF: Square_Hill_Matrix = new Square_Hill_Matrix(
      8,
      Transform_Data.getAsciFromString(pass)
    );

    /***Calculo de Gb=E^m*G*E^n   ***/
    let complementary_Base_Matrix1 = new Square_Hill_Matrix(8, []);
    complementary_Base_Matrix1 = Square_Hill_Matrix.MultiplyHillMatrices(
      squareF.PowerOf(squareF, this._mValue),
      this._pubKeyBaseCommon
    );

    this._pubKeyBaseMatA = Square_Hill_Matrix.MultiplyHillMatrices(
      complementary_Base_Matrix1,
      squareF.PowerOf(squareF, this._nValue)
    );

    this._privateKey = this.Create_PrivateKey(this._diagMat);

    let expPrivKeys = Square_Hill_Matrix.TwoPowerOf(
      this._mValue,
      this._nValue,
      this._privateKey
    );
    let founded = expPrivKeys.find((x) => x.power === this._mValue);
    if (founded) this._privKeyExp_m = founded.matrixPower;
    console.log("First founded: ", founded);
    let founded1 = expPrivKeys.find((x) => x.power === this._nValue);
    if (founded) this._privKeyExp_n = founded1.matrixPower;

    this._pubKeyMat = this.CreatePublicKeyMatrix(this._pubKeyBaseMatA);

    return this.phase_1("");
  }
  phase_1(info: any): any {
    let matrix_S: Square_Hill_Matrix = new Square_Hill_Matrix(MATRIXORDER, []);
    let matrix_S_1: Square_Hill_Matrix = new Square_Hill_Matrix(
      MATRIXORDER,
      []
    ); //P*Dk
    let matrix_S_2: Square_Hill_Matrix = new Square_Hill_Matrix(
      MATRIXORDER,
      []
    ); //P-1*Gb
   
    this.InitializeKFor();

    matrix_S_1 = Square_Hill_Matrix.MultiplyHillMatrices(
      this._privateKey.PowerOf(this._privateKey, this._kValue),
      this._otherPubKeyMat
    );

    matrix_S_2 = Square_Hill_Matrix.MultiplyHillMatrices(
      matrix_S_1,
      this._privKeyExp_m.InverseOf(this._privKeyExp_m)
    );

    //matrix_S = Square_Hill_Matrix.MultiplyHillMatrices(matrix_S_4, matrix_S_5);

    this._witness = matrix_S_2;

    let expWitness = Square_Hill_Matrix.TwoPowerOf(
      this._mValue,
      this._nValue,
      this._witness
    );
    let founded = expWitness.find((x) => x.power === this._mValue);
    if (founded) this._witnessExp_m = founded.matrixPower;
    let founded1 = expWitness.find((x) => x.power === this._nValue);
    if (founded1) this._witnessExp_n = founded1.matrixPower;


    console.log(
      "Witness is: ",
      Transform_Data.Get_Array_From_SquareMatrix(matrix_S_2)
    );

    let everything_ok: boolean = false;

    return {
      GA: Transform_Data.Get_Array_From_SquareMatrix(this._pubKeyMat),
      witness: Transform_Data.Get_Array_From_SquareMatrix(matrix_S_2),
    };

   
  }
  phase_2(info: any): any {
    this._bValue = info["b"];
    this._challenge = Transform_Data.Get_SquareMatrix_From_Array(
      info["q_matrix"]
    );

    return this.phase_3();
  }
  phase_3(): any {
    let matrix_R: Square_Hill_Matrix = new Square_Hill_Matrix(MATRIXORDER, []);
    let matrix_R_1: Square_Hill_Matrix = new Square_Hill_Matrix(
      MATRIXORDER,
      []
    );
    let matrix_R_2: Square_Hill_Matrix = new Square_Hill_Matrix(
      MATRIXORDER,
      []
    );

    if (this._bValue === 0) {
      matrix_R_1 = Square_Hill_Matrix.MultiplyHillMatrices(
        this._witnessExp_m.InverseOf(this._witnessExp_m),
        this._challenge
      );
      matrix_R_2 = Square_Hill_Matrix.MultiplyHillMatrices(
        matrix_R_1,
        this._witnessExp_m.InverseOf(this._witnessExp_n)
      );
      /*matrix_R = Square_Hill_Matrix.MultiplyHillMatrices(
        matrix_R_2,
        this._pubKeyBaseMatA
      );*/
      matrix_R = matrix_R_2;
    } else if (this._bValue === 1) {
      // R = A^-k * Q * A^-n
      // R = P Da^-k P^-1 * Q * P Da^-n P^-1

      let matrix_R_3: Square_Hill_Matrix = new Square_Hill_Matrix(
        MATRIXORDER,
        []
      );

      matrix_R_1 = Square_Hill_Matrix.MultiplyHillMatrices(
        this._privateKey.PowerOf(this._privateKey, -1 * this._kValue),
        this._challenge
      ); //P Da^-k

      matrix_R_2 = Square_Hill_Matrix.MultiplyHillMatrices(
        matrix_R_1,
        this._privKeyExp_n.InverseOf(this._privKeyExp_n)
      ); //P^-1 Q

      matrix_R = matrix_R_2; //R_4 * R_5
    }

    this._challenge_response = matrix_R;

    return {
      R: Transform_Data.Get_Array_From_SquareMatrix(this._challenge_response),
      Ga: Transform_Data.Get_Array_From_SquareMatrix(this._pubKeyBaseMatA),
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
  }
  phase_4(info: any): boolean {
    if (info["data"]["validated_credentials"] === true) {
      if (info["data"]["finished"] === false) {
        this.phase_1("");
        return false;
      } else {
        return true;
      }
    } else {
      throw new Error("Credentials are not validated");
    }
  }

  phase_4_adapted(
    matrixdiagB: any,
    matrix_complementary: Square_Hill_Matrix
  ): any {}

  InitializeKFor() {
    this._kValue = Random_Generator.RandomValueLessThan(Z_BOUND);
    while (
      this._kValue < 2 ||
      this._kValue == this._mValue ||
      this._kValue == this._nValue
    )
      this._kValue = Random_Generator.RandomValueLessThan(Z_BOUND);
  }
  InvertEigenVectorsMatrixOf() {
    this._invEigVectMat = Elementary_Matrix.InverseOf(this._eigVectMat);
    console.log(
      "Inverse is : ",
      Transform_Data.Get_Array_From_SquareMatrix(this._invEigVectMat)
    );
  }

  CreatePublicKeyMatrix(G: Square_Hill_Matrix): Square_Hill_Matrix {
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

    let PubKey: Square_Hill_Matrix = new Square_Hill_Matrix(8, []);

    let matrix_P_1: Square_Hill_Matrix = new Square_Hill_Matrix(
      MATRIXORDER,
      []
    ); //P*Dk
    let matrix_P_2: Square_Hill_Matrix = new Square_Hill_Matrix(
      MATRIXORDER,
      []
    ); //P-1*Gb
    let matrix_P_3: Square_Hill_Matrix = new Square_Hill_Matrix(
      MATRIXORDER,
      []
    ); //P*D-m

    matrix_P_1 = Square_Hill_Matrix.MultiplyHillMatrices(this._privKeyExp_m, G);

    matrix_P_2 = Square_Hill_Matrix.MultiplyHillMatrices(
      matrix_P_1,
      this._privKeyExp_n
    );

    PubKey = matrix_P_2;

    return PubKey;
  }

  

  InitializeBFor(): any {
    //return 0;
    return Random_Generator.RandomValue() % 2;
  }

  Create_PrivateKey(diagMatrix: Diagonal_Hill_Matrix): Square_Hill_Matrix {
    let privKey: Square_Hill_Matrix = new Square_Hill_Matrix(8, []);

    let priv_1: Square_Hill_Matrix = new Square_Hill_Matrix(8, []);
    let priv_2: Square_Hill_Matrix = new Square_Hill_Matrix(8, []);

    this.InvertEigenVectorsMatrixOf();

    priv_1 = Square_Hill_Matrix.MultiplyHillMatrices(
      Elementary_Matrix.ToSquare_Hill_Matrix(this._eigVectMat),
      diagMatrix.ToSquareHillMatrix(diagMatrix)
    );

    priv_2 = Square_Hill_Matrix.MultiplyHillMatrices(
      priv_1,
      this._invEigVectMat
    );

    privKey = priv_2;

    console.log(
      "Private key: ",
      Transform_Data.Get_Array_From_SquareMatrix(privKey)
    );
    return privKey;
  }
  encryptPassword(password: string): Diagonal_Hill_Matrix {
    ///Cipher Text initially empty
    let a: number = Random_Generator.RandomValue();
    let b: number = Random_Generator.RandomValue();
    let i = 0;
    console.log("In client: ", "a:", a, ",b:", b);

    let diagMatrix: Diagonal_Hill_Matrix = new Diagonal_Hill_Matrix(
      MATRIXORDER,
      []
    );

    for (i = 0; i < password.length; i++) {
      if (password[i] != " ")
        diagMatrix._matrix[i] = new Modular_Data(
          a * password.charCodeAt(i) + b
        );
    }
    diagMatrix._matrix[i] = new Modular_Data(a);
    diagMatrix._matrix[i + 1] = new Modular_Data(b);

    //console.log("Matrix generated: ", diagMatrix._matrix);

    return diagMatrix;
  }
  CreateEigenValuesMatrixFor() {
    this._diagMat = new Diagonal_Hill_Matrix(MATRIXORDER, []);
    this._diagMat._matrix = Diagonal_Hill_Matrix.InitializeAs(3, MATRIXORDER);
  }
}

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
