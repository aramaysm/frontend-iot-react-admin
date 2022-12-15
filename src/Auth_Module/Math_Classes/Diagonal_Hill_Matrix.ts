import { Modular_Data } from "./Modular_Data";
import Square_Hill_Matrix from "./Square_Hill_Matrix";
import { Random_Generator } from "./Random_Generator";
import Transform_Data from "../Utils_Classes/Transform_Data";


const MODULUS = 251;

export default class Diagonal_Hill_Matrix {
  _order: number;
  _matrix: Array<Modular_Data>;

  constructor(orderNew: number, matrixNew: Array<number>) {
    this._order = orderNew;
    if (matrixNew !== null && matrixNew !== undefined && matrixNew.length > 0) {
      this._matrix = matrixNew.map((item) => new Modular_Data(item));
    } else {
      this._matrix = new Array<Modular_Data>(orderNew);
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

  getItem(row: number): number {
    return this._matrix[row].get_data();
  }
  setItem(row: number, dataNew: number) {
    this._matrix[row] = new Modular_Data(dataNew);
  }

  static InitializeAs(mtype: number, order: number): Array<Modular_Data> {
    let matrix: Array<Modular_Data> = new Array<Modular_Data>(order);

    if (order == 0) return new Array<Modular_Data>(0);

    let data: Modular_Data = new Modular_Data(0);

    switch (mtype) {
      case 0:
        for (let i = 0; i < order; i++) matrix[i] = new Modular_Data(1);
        break;
      case 1:
        for (let i = 0; i < order; i++) matrix[i] = new Modular_Data(0);
        break;
      case 2:
        for (let i = 0; i < order; i++) {
          data._data =
            ((Random_Generator.RandomValue() % MODULUS) + MODULUS) % MODULUS;
          while (data._data == 0)
            data._data =
              ((Random_Generator.RandomValue() % MODULUS) + MODULUS) % MODULUS;
          matrix[i] = data;
        }
        break;
      default: {
        let valid: boolean = false,
          found: boolean = false;
        let j: number = 0;
        for (let i = 0; i < order; i++) {
          data = new Modular_Data(0);
          valid = false;
          while (valid === false) {
            data._data =
              ((Random_Generator.RandomValue() % MODULUS) + MODULUS) % MODULUS;
            while (data._data === 0)
              data._data =
                ((Random_Generator.RandomValue() % MODULUS) + MODULUS) %
                MODULUS;
            //console.log("Data:", data._data);
            const filtredArray = matrix.filter(
              (item, index) => item === data && index < i
            );

            if (filtredArray.length === 0) valid = true;
            else valid = false;

            //console.log("Filtred array", filtredArray);
            /* j = 0;
            found = false;
            while (j < i && found === false) {
              if (matrix[j]._data === data._data) found = false;
              else found = true;

              if (found === false) j++;

              console.log("Found and j", found, j);
            }
            console.log("Finish j and found loop");
            if (found === false) valid = true;
            else valid = false;*/
          }
          matrix[i] = data;
          //console.log("matrix,", matrix);
        }
        break;
      }
    }
    //console.log("Diagonal matrix initializated is ", matrix);
    return matrix;
  }

  InverseOf(matrix: Diagonal_Hill_Matrix): Diagonal_Hill_Matrix {
    let order = matrix._order;
    let inverse: Diagonal_Hill_Matrix = new Diagonal_Hill_Matrix(order, []);
    for (let i = 0; i < order; i++)
      inverse._matrix[i] = Modular_Data.operator_inverseOf(
        matrix._matrix[i]
      );

    return inverse;
  }

  MultiplyHillMatrices(
    matrix1: Diagonal_Hill_Matrix,
    matrix2: Diagonal_Hill_Matrix
  ): Diagonal_Hill_Matrix {
    let order = matrix1._order;
    let product: Diagonal_Hill_Matrix = new Diagonal_Hill_Matrix(order, []);
    let mat1Data: Array<Modular_Data> = matrix1._matrix;
    let mat2Data: Array<Modular_Data> = matrix2._matrix;
    let prodData: Array<Modular_Data> = product._matrix;
    for (let i = 0; i < order; i++)
      prodData[i] = Modular_Data.operator_mult(mat1Data[i], mat2Data[i]);

    return product;
  }

  static PowerOf(
    matrix: Diagonal_Hill_Matrix,
    p: number
  ): Diagonal_Hill_Matrix {

    let order = matrix._order;
    let power: Diagonal_Hill_Matrix = new Diagonal_Hill_Matrix(order, []);

    if(p<0){
      matrix = matrix.InverseOf(matrix);
      for (let i = 0; i < order; i++)
      power._matrix[i] = Modular_Data.PowerOf(matrix._matrix[i], Math.abs(p));

    }
    else{
      for (let i = 0; i < order; i++)
      power._matrix[i] = Modular_Data.PowerOf(matrix._matrix[i],p);

    }
    
    return power;
  }

  ToSquareHillMatrix(matrix: Diagonal_Hill_Matrix): Square_Hill_Matrix {
    let order = matrix._order;
    let result: Square_Hill_Matrix = new Square_Hill_Matrix(order, []);
    result._matrix = result.InitializeAs(-1, order);

    for (let rowCol = 0; rowCol < order; rowCol++)
      result._matrix[rowCol * order + rowCol] =
        matrix._matrix[rowCol];

    return result;
  }
}

/*
let matrix = new Diagonal_Hill_Matrix(8,[]);
matrix._matrix = Diagonal_Hill_Matrix.InitializeAs(3, 8);
console.log("Matrix 1: ", Transform_Data.Get_Array_From_DiagonalMatrix(matrix));
matrix._matrix = Diagonal_Hill_Matrix.InitializeAs(3, 8);
console.log("Matrix 2: ", Transform_Data.Get_Array_From_DiagonalMatrix(matrix));
*/
//   tsc Diagonal_Hill_Matrix.ts