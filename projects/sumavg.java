import java.util.*;
class avg
{
public static void main(String args[])
{
int a, b, c, sum;
float avg;
Scanner s1= new Scanner(System.in);
System.out.println("Enter three numbers:");
a=s1.nextInt();
b=s1.nextInt();
c=s1.nextInt();
sum=a+b+c;
avg=(a+b+c)/3;
System.out.println("Sum is:" +sum);
System.out.println("Average is:" +avg);
s1.close();
}
}