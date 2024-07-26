import java.util.*;
class student
{
public static void main(String args[])
{
String a, b;
int c;
Scanner s1= new Scanner(System.in);
System.out.println("Enter the name:");
a=s1.nextLine();
System.out.println("Enter the branch name:");
b=s1.nextLine();
System.out.println("Enter the Roll no:");
c=s1.nextInt();
System.out.println("Student Details");
System.out.println("***************************************************************************");
System.out.println("Student Name:"+a);
System.out.println("Branch:"+b);
System.out.println("Roll no:"+c);
s1.close();
}
}