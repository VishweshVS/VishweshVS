import java.util.*;
class matrixsum
{
	public static void main(String args[])
	{
	int i, j, r, c;
	int a[][]= new int[50][50];
	int b[][]= new int[50][50];
	int sum[][]= new int[50][50];
	Scanner sc= new Scanner(System.in);
	System.out.println("Enter the no of Rows and Columns:");
	r=sc.nextInt();
	c=sc.nextInt();
	System.out.println("Enter the elements of first matrix:");
	for(i=0;i<r;i++)
		{
			for(j=0;j<c;j++)
				{
					a[i][j]=sc.nextInt();
				}
		}
	System.out.println("Enter the elements of Second matrix:");
	for(i=0;i<r;i++)
		{
			for(j=0;j<c;j++)
				{
					b[i][j]=sc.nextInt();
				}
		}
	for(i=0;i<r;i++)
		{
			for(j=0;j<c;j++)
				{
					sum[i][j]=a[i][j]+b[i][j];
				}
		}
	System.out.println("The sum is:");
	for(i=0;i<r;i++)
		{
			for(j=0;j<c;j++)
				{
					System.out.print("	"+sum[i][j]+"		");
				}
									System.out.println("		");
		}
	sc.close();
	}
}
