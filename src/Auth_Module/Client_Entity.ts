import Hill_Vector from "./Math_Classes/Hill_Vector";
import { Modular_Data } from "./Math_Classes/Modular_Data";
import Square_Hill_Matrix from "./Math_Classes/Square_Hill_Matrix";
import { Random_Generator } from "./Math_Classes/Random_Generator";
import Elementary_Matrix from "./Math_Classes/Elementary_Matrix";
import Diagonal_Hill_Matrix from "./Math_Classes/Diagonal_Hill_Matrix";
import Transform_Data from "./Utils_Classes/Transform_Data";

import axios from "axios";

const MATRIXORDER = 8;
const Z_BOUND = 20;

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

  //Atributos propios de la clase
  _challenge: Square_Hill_Matrix;
  _url_Server: string;
  _password: string;
  _diagB: Diagonal_Hill_Matrix;
  _username: string;

  constructor(url_Server: string, password: string, username: string) {
    this._diagMat = new Diagonal_Hill_Matrix(8, []);
    this._eigVectMat = new Elementary_Matrix(8);
    this._invEigVectMat = new Square_Hill_Matrix(8, []);
    this._privateKey = new Square_Hill_Matrix(8, []);
    this._pubKeyBaseMatA = new Square_Hill_Matrix(8, []);
    this._pubKeyMat = new Square_Hill_Matrix(8, []);
    this._otherPubKeyMat = new Square_Hill_Matrix(8, []);
    this._pubKeyBaseCommon = new Square_Hill_Matrix(8, []);
    this._challenge = new Square_Hill_Matrix(8, []);
    this._challenge_response = new Square_Hill_Matrix(8, []);
    this._witness = new Square_Hill_Matrix(8, []);
  }

   async phase_0(info: any, pass: string): Promise<any> {
    
    this.CreateEigenValuesMatrixFor(); //DA
   
    this._eigVectMat = Transform_Data.Get_ElementaryMatrix_From_Array(
      info["P"]
    ); //matrix P
    this._invEigVectMat = Transform_Data.Get_SquareMatrix_From_Array(
      info["P_Inv"]
    );
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
    complementary_Base_Matrix1 = await Square_Hill_Matrix.MultiplyHillMatrices(
      await squareF.PowerOf(squareF, this._mValue),
      this._pubKeyBaseCommon
    );

    this._pubKeyBaseMatA = await Square_Hill_Matrix.MultiplyHillMatrices(
      complementary_Base_Matrix1,
      await squareF.PowerOf(squareF, this._nValue)
    );

    this._privateKey = await this.Create_PrivateKey(this._diagMat);
    this._pubKeyMat = await this.CreatePublicKeyMatrix(this._pubKeyBaseMatA);
   
  }
  async phase_1(): Promise<any> {
    this._witness = new Square_Hill_Matrix(8, []);
    this._challenge = new Square_Hill_Matrix(8, []);
    this._challenge_response = new Square_Hill_Matrix(8, []);

    let matrix_S_1: Square_Hill_Matrix = new Square_Hill_Matrix(
      MATRIXORDER,
      []
    ); 
    let matrix_S_2: Square_Hill_Matrix = new Square_Hill_Matrix(
      MATRIXORDER,
      []
    ); 

    this.InitializeKFor();

    console.log("K value :", this._kValue);
   
    let powerOf_k_PrivateKey = await this._privateKey.PowerOf(
      this._privateKey,
      this._kValue
    );
    let powerOf_m_privateKey_Inverse =  await this._privateKey.PowerOf(
      this._privateKey,
      -1 * this._mValue
    );
   
    matrix_S_1 = await Square_Hill_Matrix.MultiplyHillMatrices(
      powerOf_k_PrivateKey,
      this._otherPubKeyMat
    );

    matrix_S_2 = await Square_Hill_Matrix.MultiplyHillMatrices(
      matrix_S_1,
      powerOf_m_privateKey_Inverse
    );

    //matrix_S = await Square_Hill_Matrix.MultiplyHillMatrices(matrix_S_4, matrix_S_5);

    this._witness = matrix_S_2;
   

    let everything_ok: boolean = false;

    return {
      GA: Transform_Data.Get_Array_From_SquareMatrix(this._pubKeyMat),
      witness: Transform_Data.Get_Array_From_SquareMatrix(matrix_S_2),
    };
  }
  phase_2(info: any): any {
    this._bValue = info["b"];
    this._challenge = Transform_Data.Get_SquareMatrix_From_Array(
      info["challenge"]
    );

    console.log("Challenge", Transform_Data.Get_Array_From_SquareMatrix(this._challenge));

    return this.phase_3();
  }
  async phase_3(): Promise<any> {
   
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
      let witness_PowerOf_m_inverse = await this._witness.PowerOf(this._witness, -1 * this._mValue);
      let witness_PowerOf_n_inverse = await this._witness.PowerOf(this._witness, -1 * this._nValue);
  
      matrix_R_1 = await Square_Hill_Matrix.MultiplyHillMatrices(
        witness_PowerOf_m_inverse,
        this._challenge
      );
      this._challenge_response = await Square_Hill_Matrix.MultiplyHillMatrices(
        matrix_R_1,
        witness_PowerOf_n_inverse
      );
    
    } 
    else if (this._bValue === 1) {
     
      let privateKey_to_k_inverse = await this._privateKey.PowerOf(this._privateKey, -1 * this._kValue);
      let privateKey_to_n_inverse = await this._privateKey.PowerOf(this._privateKey, -1 * this._nValue);
      
      matrix_R_1 = await Square_Hill_Matrix.MultiplyHillMatrices(
        privateKey_to_k_inverse,
        this._challenge
      ); //P Da^-k

      this._challenge_response = await Square_Hill_Matrix.MultiplyHillMatrices(
        matrix_R_1,
        privateKey_to_n_inverse
      ); //P^-1 Q

    }

    console.log("Challenge response: ",Transform_Data.Get_Array_From_SquareMatrix(this._challenge_response))
    
    
    return {
      R: Transform_Data.Get_Array_From_SquareMatrix(this._challenge_response),
      Ga: Transform_Data.Get_Array_From_SquareMatrix(this._pubKeyBaseMatA),
    };
  }
  
  InitializeKFor() {
    this._kValue = Random_Generator.RandomValueLessThan(Z_BOUND);
    while (
      this._kValue < 2 ||
      this._kValue == this._mValue ||
      this._kValue == this._nValue || (this._kValue % 2 == 1 && this._kValue > 10)
    )
      this._kValue = Random_Generator.RandomValueLessThan(Z_BOUND);
  }
  InvertEigenVectorsMatrixOf() {
    this._invEigVectMat = Elementary_Matrix.InverseOf(this._eigVectMat);
   
  }

  async CreatePublicKeyMatrix(G: Square_Hill_Matrix): Promise<Square_Hill_Matrix> {
    // GA = A^m*G*A^n = P*D^m*P^(-1)*G*P*D^n*P(-1).      // Total: 22n*n + 20n + 7.

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

    matrix_P_1 = await Square_Hill_Matrix.MultiplyHillMatrices(
      await this._privateKey.PowerOf(this._privateKey, this._mValue),
      G
    );

    matrix_P_2 = await Square_Hill_Matrix.MultiplyHillMatrices(
      matrix_P_1,
      await this._privateKey.PowerOf(this._privateKey, this._nValue)
    );

    PubKey = matrix_P_2;

    return PubKey;
  }

  async Create_PrivateKey(diagMatrix: Diagonal_Hill_Matrix): Promise<Square_Hill_Matrix> {
    let privKey: Square_Hill_Matrix = new Square_Hill_Matrix(8, []);

    let priv_1: Square_Hill_Matrix = new Square_Hill_Matrix(8, []);
    let priv_2: Square_Hill_Matrix = new Square_Hill_Matrix(8, []);

    

    priv_1 = await Square_Hill_Matrix.MultiplyHillMatrices(
      Elementary_Matrix.ToSquare_Hill_Matrix(this._eigVectMat),
      diagMatrix.ToSquareHillMatrix(diagMatrix)
    );

    priv_2 = await Square_Hill_Matrix.MultiplyHillMatrices(
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
