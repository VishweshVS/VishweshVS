/*Vishwesh V Shenoy
S3 CSAI
Roll No 61
Program to print reverse of a string.*/
import java.util.*;
class reverse 
{
    public static void main(String args[]) 
    {
        String str, rev = "";
        Scanner S1 = new Scanner(System.in);
        System.out.println("Enter the string you want reverse of:");
        str = S1.nextLine();
        int length = str.length();
        int i=length-1;
        for (i=length-1; i >= 0; i--) 
        {
            rev = rev + str.charAt(i);
        }
        System.out.println("The reverse of string is: "+rev);
        S1.close();
    }
}