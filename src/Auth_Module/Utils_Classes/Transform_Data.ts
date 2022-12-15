import Hill_Vector from "../Math_Classes/Hill_Vector";
import { Modular_Data } from "../Math_Classes/Modular_Data";
import Square_Hill_Matrix from "../Math_Classes/Square_Hill_Matrix";
import { Random_Generator } from "../Math_Classes/Random_Generator";
import Elementary_Matrix from "../Math_Classes/Elementary_Matrix";
import Diagonal_Hill_Matrix from "../Math_Classes/Diagonal_Hill_Matrix";

export default class Transform_Data {
  static Get_Array_From_SquareMatrix(
    matrix: Square_Hill_Matrix
  ): Array<number> {
    let array_To_Return: Array<number> = new Array<number>(matrix._order);

    let square_matrix: Square_Hill_Matrix = new Square_Hill_Matrix(8, []);

    square_matrix = matrix;

    array_To_Return = square_matrix._matrix.map((item) => item._data);

    //console.log("Array from sqaure matrix is:", array_To_Return);

    return array_To_Return;
  }

  static Get_SquareMatrix_From_Array(array: Array<number>): Square_Hill_Matrix {
    let matrix_To_Return: Square_Hill_Matrix = new Square_Hill_Matrix(8,[]);
    matrix_To_Return._matrix = matrix_To_Return.InitializeAs(0, 8);

    array.map((item, index) => matrix_To_Return._matrix[index]._data = item);

    return matrix_To_Return;
  }

  static Get_Array_From_ElementaryMatrix(
    matrix: Elementary_Matrix
  ): Array<number> {
    //[[u],[v],fInv]

    let array_To_Return: Array<number> = new Array<number>(0);

    let vector1: Array<number> = new Array<number>(matrix._order);
    let vector2: Array<number> = new Array<number>(matrix._order);

    vector1 = matrix._vector1._vector.map((item) => item._data);
    vector2 = matrix._vector2._vector.map((item) => item._data);

    vector1.map((item) => array_To_Return.push(item));
    vector2.map((item) => array_To_Return.push(item));
    array_To_Return.push(matrix._factorForInverse._data);

    //console.log("Array from sqaure matrix is:", array_To_Return);

    return array_To_Return;
  }

  static Get_ElementaryMatrix_From_Array(
    array: Array<number>
  ): Elementary_Matrix {
    let matrix_To_Return: Elementary_Matrix = new Elementary_Matrix(8);

    let vector1: Hill_Vector = new Hill_Vector(8, array.slice(0, 8));
    let vector2: Hill_Vector = new Hill_Vector(8, array.slice(8, 16));
    let factInv: Modular_Data = new Modular_Data(0);
    factInv._data = array[16];

    matrix_To_Return._factorForInverse = factInv;
    matrix_To_Return._vector1 = vector1;
    matrix_To_Return._vector2 = vector2;

    //console.log("Array from elemtary matrix is:", matrix_To_Return);

    return matrix_To_Return;
  }

  static Get_Array_From_DiagonalMatrix(
    matrix: Diagonal_Hill_Matrix
  ): Array<number> {
    let array_To_Return: Array<number> = new Array<number>(8);

    let diagonal_matrix: Diagonal_Hill_Matrix = new Diagonal_Hill_Matrix(
      matrix._order,
      []
    );

    diagonal_matrix = matrix;

    array_To_Return = diagonal_matrix._matrix.map((item) => item._data);

    return array_To_Return;
  }

  static Get_DiagonalMatrix_From_Array(
    array: Array<number>
  ): Diagonal_Hill_Matrix {
    let matrix_To_Return: Diagonal_Hill_Matrix = new Diagonal_Hill_Matrix(
      8,
      []
    );
    matrix_To_Return._matrix = Diagonal_Hill_Matrix.InitializeAs(0, 8);

    array.map((item, index) => (matrix_To_Return._matrix[index]._data = item));
    return matrix_To_Return;
  }

  static getAsciFromString(stringArray: string): Array<number> {
    let arrayNumber: Array<number> = new Array<number>();

    for (let i = 0; i < stringArray.length; i++) {
      arrayNumber[i] = stringArray.charCodeAt(i);
    }

    return arrayNumber;
  }
}
