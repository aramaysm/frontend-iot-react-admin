import Diagonal_Hill_Matrix from "./Diagonal_Hill_Matrix";
import { Modular_Data } from "./Modular_Data";
import { Random_Generator } from "./Random_Generator";
import Transform_Data from "../Utils_Classes/Transform_Data";

const MODULUS = 251;

class Square_Hill_Matrix {
  _order: number;
  _matrix: Array<Modular_Data>;

  constructor(orderNew: number, matrixNew: Array<number>) {
    this._order = orderNew;
    if (matrixNew !== null && matrixNew !== undefined && matrixNew.length > 0) {
      this._matrix = matrixNew.map((item) => new Modular_Data(item));
    } else {
      this._matrix = this.InitializeAs(-1,8);
    }
  }

  get_matrix() {
    return this._matrix;
  }
  get_order() {
    return this._order;
  }

  set_matrix(newMatrix: Array<Modular_Data>) {
    this._matrix = newMatrix;
  }

  set_order(newOrder: number) {
    this._order = newOrder;
  }

  getItem(row: number, col: number): number {
    return this._matrix[row * this._order + col].get_data();
  }
  setItem(row: number, col: number, dataNew: number) {
    this._matrix[row * this._order + col] = new Modular_Data(dataNew);
  }

  /* --mType es el tipo de matriz--
0 - matriz de identidad,
1 - matriz null,
2 - matriz de valores random
3 - matriz de valores random sin duplicados
*/
  static AreEquals(
    mat1: Square_Hill_Matrix,
    mat2: Square_Hill_Matrix
  ): boolean {
    let order = mat1._order;
    let areEquals = true;
    let idx = 0;

    while (idx < order * order && areEquals === true)
      if (mat1._matrix[idx]._data !== mat2._matrix[idx]._data)
        areEquals = false;
      else idx++;
    return areEquals;
  }

  InitializeAs(mtype: number, order: number): Array<Modular_Data> {
    let matrix: Array<Modular_Data> = new Array<Modular_Data>(order * order);

    if (order == 0) return new Array<Modular_Data>(0);

    switch (mtype) {
      case -1:
        for (let i = 0; i < order * order; i++) 
        matrix[i] = new Modular_Data(0);
    
      case 0:
        for (let i = 0; i < order * order; i++)
          if (i % (order + 1) != 0) matrix[i] = new Modular_Data(0);
          else matrix[i] = new Modular_Data(1);
        break;
      case 1:
        for (let i = 0; i < order * order; i++) matrix[i] = new Modular_Data(0);
        break;
      case 2: {
        let data: Modular_Data = new Modular_Data(0);
        for (let i = 0; i < order * order; i++) {
          data._data =
            ((Random_Generator.RandomValue() % MODULUS) + MODULUS) % MODULUS;
          while (data._data == 0)
            data._data =
              ((Random_Generator.RandomValue() % MODULUS) + MODULUS) % MODULUS;
          matrix[i] = data;
        }
        break;
      }
      default: {
        //console.log("Into default option");

        let data: Modular_Data = new Modular_Data(0);
        let valid: boolean = false,
          found: boolean = false;
        let j: number = 0;

        for (let i = 0; i < order * order; i++) {
          valid = false;
          while (valid === false) {
            data = new Modular_Data(0);
            data._data =
              ((Random_Generator.RandomValue() % MODULUS) + MODULUS) % MODULUS;
            while (data._data === 0)
              data._data =
                ((Random_Generator.RandomValue() % MODULUS) + MODULUS) %
                MODULUS;
            j = 0;
            found = false;

            while (j < i && found === false) {
              found = matrix[j]._data === data._data ? true : false;

              if (found === false) j++;
            }

            if (found === false) {
              valid = true;
            } else {
              valid = false;
            }
          }
          matrix[i] = data;
        }
      }
    }

    return matrix;
  }

  GaussianEliminationOf(): Square_Hill_Matrix {
    let order: number = this._order;
    let array: Array<number> = Random_Generator.Generate_Zeros_Array(order);

    let gaussMat = new Square_Hill_Matrix(this._order, array);
    gaussMat.set_matrix(this._matrix);
    let diagData: Modular_Data = new Modular_Data(0);
    let quotient: Modular_Data = new Modular_Data(0);

    for (let col = 0; col < order - 1; col++) {
      diagData._data = gaussMat._matrix[col * order + col]._data;
      for (let row = col + 1; row < order; row++) {
        quotient = Modular_Data.operator_div(
          gaussMat._matrix[row * order + col],
          diagData
        );
        console.log(
          "Quotient is: ",
          quotient,
          ", diagonal_data is : ",
          diagData,
          " and matrix gauss mat is ",
          gaussMat._matrix[row * order + col]
        );
        gaussMat.setItem(row, col, 0);
        for (let k = col + 1; k < order; k++)
          gaussMat._matrix[row * order + k]._data -=
            quotient._data * gaussMat._matrix[col * order + k]._data;
      }

      console.log("Triangular matrix in gauss elimination: ", gaussMat);
    }

    return gaussMat;
  }

  DeterminantByGaussOf(): Modular_Data {
    let order: number = this._order;
    let array: Array<number> = Random_Generator.Generate_Zeros_Array(order);
    let result: Modular_Data = new Modular_Data(0);

    let triangMat: Square_Hill_Matrix = new Square_Hill_Matrix(order, array);
    triangMat = this.GaussianEliminationOf();
    console.log("Triangular matrix: ", triangMat);

    result._data = triangMat.get_matrix()[0]._data;

    for (let i = 1; i < order; i++) {
      result = Modular_Data.operator_mult(
        result,
        triangMat._matrix[i * order + i]
      );
      console.log("Determinante ahora: ", result);
    }

    return result;
  }

  async InverseOf(matrix: Square_Hill_Matrix): Promise<Square_Hill_Matrix> {
    let luFactors: Square_Hill_Matrix = await this.LuFactorizationOf(matrix);
    let inverse: Square_Hill_Matrix = await this.InverseOfWithLU(matrix, luFactors);

    return inverse;
  }

  InverseOfWithLU(
    matrix: Square_Hill_Matrix,
    luFactors: Square_Hill_Matrix
  ): Square_Hill_Matrix {
    let order = 8, index = 0;
    let inverse: Square_Hill_Matrix = new Square_Hill_Matrix(order, []);
    inverse._matrix = this.InitializeAs(0, order);
    for (let r = 1; r < order; r++)
      for (let c = 0; c < r; c++) {
        index = r * order + c;
        for (let k = c; k < r; k++)
          inverse._matrix[index] = Modular_Data.operator_sub(
            inverse._matrix[index],
            Modular_Data.operator_mult(
              luFactors._matrix[r * order + k],
              inverse._matrix[k * order + c]
            )
          );
      }
    let sum: Modular_Data = new Modular_Data(0);
    
    for (let c = 0; c < order; c++)
      for (let r = order - 1; r >= 0; r--) {
        index = r * order + c;
        sum = new Modular_Data(0);
        for (let k = r + 1; k < order; k++)
          sum = Modular_Data.operator_add(
            sum,
            Modular_Data.operator_mult(
              luFactors._matrix[r * order + k],
              inverse._matrix[k * order + c]
            )
          );

        inverse._matrix[index] = Modular_Data.operator_div(
          Modular_Data.operator_sub(inverse._matrix[index], sum),
          luFactors._matrix[r * order + r]
        );
      }

    return inverse;
  }

  LuFactorizationOf(matrix: Square_Hill_Matrix): Square_Hill_Matrix {
    let luFactors: Square_Hill_Matrix = new Square_Hill_Matrix(
      matrix._order,
      []
    );
    luFactors._matrix=(matrix._matrix);

    let diagValue: Modular_Data = new Modular_Data(0);
    let order = matrix._order;
    for (let k = 0; k < order - 1; k++) {
      diagValue._data = luFactors._matrix[k * order + k]._data;
      for (let row = k + 1; row < order; row++)
        luFactors._matrix[row * order + k] = Modular_Data.operator_div(
          luFactors._matrix[row * order + k],
          diagValue
        );
      for (let row = k + 1; row < order; row++)
        for (let col = k + 1; col < order; col++)
          luFactors._matrix[row * order + col] = Modular_Data.operator_sub(
            luFactors._matrix[row * order + col],
            Modular_Data.operator_mult(
              luFactors._matrix[row * order + k],
              luFactors._matrix[k * order + col]
            )
          );
    }

    return luFactors;
  }

  MultiplyHillMatricesSquareByDiagonal(
    matrix: Square_Hill_Matrix,
    dMat: Diagonal_Hill_Matrix
  ): Square_Hill_Matrix {
    let order = matrix._order,
      index = 0;
    let product = new Square_Hill_Matrix(order, []);
    let matData: Array<Modular_Data> = matrix._matrix;
    let dMatData: Array<Modular_Data> = dMat._matrix;
    let prodData: Array<Modular_Data> = product._matrix;

    for (let col = 0; col < order; col++)
      for (let row = 0; row < order; row++) {
        index = row * order + col;
        prodData[index] = Modular_Data.operator_mult(
          dMatData[col],
          matData[index]
        );
      }

    return product;
  }
  static async MultiplyHillMatrices(
    matrix1: Square_Hill_Matrix,
    matrix2: Square_Hill_Matrix
  ): Promise<Square_Hill_Matrix> {

    let matrix1_Array = Transform_Data.Get_Array_From_SquareMatrix(matrix1);
    let matrix2_Array = Transform_Data.Get_Array_From_SquareMatrix(matrix2);
    let order = 8;
    let sum: number = 0;
    
    let product: Array<number> = new Array<number>(order * order);

    for (let row = 0; row < order; row++){
      for (let col = 0; col < order; col++) {
        sum = 0;
        for (let k = 0; k < order; k++)
          sum = sum + matrix1_Array[row * order + k] *  matrix2_Array[k * order + col];
           
         
        product[row * order + col] = sum;
      }
    }
      

    let result: Square_Hill_Matrix = new Square_Hill_Matrix(order, product);
   

    return result;
  }

   async PowerOf(mat: Square_Hill_Matrix, power: number): Promise<Square_Hill_Matrix> {
    let matPower: Square_Hill_Matrix = new Square_Hill_Matrix(8, []);
    matPower._matrix = mat._matrix;

    if (power != 0) {
      for (let i = 0; i < Math.abs(power) - 1; i++)
        matPower =  await Square_Hill_Matrix.MultiplyHillMatrices(matPower, mat);
      if (power < 0) matPower = await  this.InverseOf(matPower);
    } else matPower._matrix = this.InitializeAs(0, mat._order);
    return matPower;
  }

  
}

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

export default Square_Hill_Matrix;

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
