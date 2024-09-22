/*Vishwesh V Shenoy
S3 CSAI
Roll No 61
Program to print transpose of a matrix.*/

import java.util.*;
class transpose {
    public static void main(String args[]) {
        Scanner S = new Scanner(System.in);
        int matrix[][] = new int[50][50];
        int transposematrix[][] = new int[50][50];
        int I, j;
        System.out.println("Enter the number of rows:");
        int row = S.nextInt();
        System.out.println("Enter the number of columns:");
        int column = S.nextInt();
        System.out.println("Enter the elements of the matrix:");
        for (I = 0; I < row; I++) {
            for (j = 0; j < column; j++) {
                matrix[I][j] = S.nextInt();
            }
        }
        for (I= 0; I < row; I++) {
            for (j = 0; j < column; j++) {
                transposematrix[j][I] = matrix[I][j];
            }
        }
        System.out.println("The transpose of matrix is:");
        for (I = 0; I < column; I++) {
            for (j = 0; j < row; j++) {
                System.out.print(transposematrix[I][j] +" ");
            }
            System.out.println();
        }
        S.close();
    }
}