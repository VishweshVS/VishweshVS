import java.util.*;
class sum
{
public static void main(String args[])
{
int a, b, sum;
Scanner s1= new Scanner(System.in);
System.out.println("Enter two numbers:");
a=s1.nextInt();
b=s1.nextInt();
sum=a+b;
System.out.println("Sum is:" +sum);
s1.close();
}
}