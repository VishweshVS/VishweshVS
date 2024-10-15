import java.io.*;
class lineinteger
{
public static void main(String args[])throws IOException
{
long sum=0;
String i="";
BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
System.out.println("Enter Line of Integer");
int str=Integer.parseInt(br.readLine());
int temp=str;
while(str>0)
{
i=i+str%10;
sum=sum+str%10;
str=str/10;
}
System.out.println("All integer Degits :-> ");
while(temp>0)
{
System.out.println(temp%10);
temp=(temp/10);
}
System.out.println("Summation of all integer Degits :-> "+sum);
}
}