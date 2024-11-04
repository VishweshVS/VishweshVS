import java.io.*;
import java.util.*;
class trycatchfinally {
    public static void main(String[] args)
    {
    	System.out.println("\nWelcome to the program, today will seeing how to use try, catch, finally blocks and by understanding their functions.");
    	System.out.println("\nThere is an equation a/(b-c), which requires the initialization of the variables. You must initialize them:");
    	System.out.println("\n<HINT:If you want the exception to be caught, then try initializing the values of b & c such that their difference is zero.>");
        int a,b,c, result;
        Scanner s1=new Scanner(System.in);
        System.out.println("\na:");
        a=s1.nextInt();
        System.out.println("\nb:");
        b=s1.nextInt();
        System.out.println("\nc:");
        c=s1.nextInt();
        try {
            result = a / (b - c);
            System.out.println("result" + result);
        }
 
        catch (ArithmeticException e) {
            System.out.println("Exception caught:Division by zero");
        }
 
        finally {
            System.out.println("I am in final block");
        }
    }
}
