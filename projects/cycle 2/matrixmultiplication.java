/*Vishwesh V Shenoy
S3 CSEAI
Roll No 61
Program to multiply two matrices*/
import java.util.*;
class matrixmultiplication
{
    public static void main(String args[]){
    int a[][] = new int[50][50];
    int b[][] = new int[50][50];
    int c[][] = new int[50][50];
    Scanner s1 = new Scanner(System.in);
    
    System.out.println("Enter the number of rows and columns in 1st matrix: ");
    int col1=s1.nextInt();
    int row1=s1.nextInt();
    
    System.out.println("Enter the number of rows and columns in 2nd matrix: ");
    int col2=s1.nextInt();
    int row2=s1.nextInt();
    
    if(col1 != row2)
    {
        System.out.println("Multiplication not possible");
        s1.close();
        return;
    }
    
    System.out.println("Enter the elements of 1st matrix: ");
    for(int i=0;i<row1;i++)
    {
        for(int j=0;j<col1;j++)
        {
        a[i][j] = s1.nextInt();
        }
    }
    System.out.println("Enter the elements of 2nd matrix: ");
    for(int i=0;i<row2;i++)
    {
        for(int j=0;j<col2;j++)
        {
        b[i][j] = s1.nextInt();
        }
    }
    for(int i=0;i<row1;i++)
    {
            for(int j=0;j<col2;j++)
            {
                c[i][j] = 0;
                for(int k=0;k<col1;k++ )
                {
                    c[i][j] += a[i][k]*b[k][j];
                }
            }
    }
    System.out.println("The product of matrix is: ");
    for(int i=0;i<row1;i++)
    {
        for(int j=0;j<col2;j++)
        {
        System.out.print(c[i][j]+ " ");
        }
        System.out.println( );
    }
    s1.close();
}
}