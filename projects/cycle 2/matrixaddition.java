/*Vishwesh V Shenoy
S3 CSAI
Roll No 61
Program ro find the sum of two matrices*/
import java.util.*;
class matrixaddition
{
	public static void main(String args[])
	{
	
	int a[][] = new int[50][50];
	int b[][] = new int[50][50];
	int c[][] = new int[50][50];
	Scanner s1 = new Scanner(System.in);
	
	System.out.println("Enter the number of rows and columns:");
	int col=s1.nextInt();
	int row=s1.nextInt();
	
	System.out.println("Enter the elements of 1st matrix:");
	for(int i=0;i<row;i++)
	{
		for(int j=0;j<col;j++)
		{
		a[i][j] = s1.nextInt();
		}
	}
	System.out.println("Enter the elements of 2nd matrix:");
	for(int i=0;i<row;i++)
	{
		for(int j=0;j<col;j++)
		{
		b[i][j] = s1.nextInt();
		}
	}
	for(int i=0;i<row;i++)
	{
		for(int j=0;j<col;j++)
		{
		c[i][j] = a[i][j]+b[i][j];
		}
	}
	System.out.println("The sum of matrix is: ");
	for(int i=0;i<row;i++)
	{
		for(int j=0;j<col;j++)
		{
		System.out.print( c[i][j] + " ");
		}
        System.out.println( );
	}
	s1.close();
	
	}
}