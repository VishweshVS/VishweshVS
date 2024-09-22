/*Vishwesh V Shenoy
S3 CSAI
Roll No 61
Program to find frequency of a letter in a string.*/
import java.util.*;
class frequency
	{
		public static void main(String args[])
		{
			String str;
			char c;
			int f=0;
			int i;
			Scanner s= new Scanner(System.in);
			System.out.println("Enter the string for frequency check:");
			str = s.nextLine();
			int len=str.length();
			System.out.println("Enter the letter for frequency check:");
			
			c = s.next().charAt(0);
			for(i=0;i<len;i++)
			{
				if(str.charAt(i)==c)
				{
					f=f+1;
				}
			}
			System.out.println("The frequency of the letter is: "+f);
			s.close();
		}
	}