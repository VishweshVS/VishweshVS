import java.util.*;
import java.lang.Math.*;
class sqrt
{
public static void main(String args[])
{
int a;
double sqr;
Scanner s1= new Scanner(System.in);
System.out.println("Enter a number:");
a=s1.nextInt();
sqr=Math.sqrt(a);
System.out.println("root is:" +sqr);
s1.close();
}
}
