
import java.io.*;
import java.util.*;
class names {
    public static void main(String[] args)
    {
    	String names[]=new String[100];
    	int num;
	Scanner inp=new Scanner(System.in);
	System.out.println("\nEnter the number of names:");
	num=inp.nextInt();
	System.out.println("\nEnter the names:");
	for(int k=0;k<num;k++){
	names[k]=inp.next();
	}
        String temp;
        for (int i = 0; i < num; i++) {
            for (int j = i + 1; j < num; j++) {
               
                if (names[i].compareTo(names[j]) > 0) {

                    temp = names[i];
                    names[i] = names[j];
                    names[j] = temp;
                }
            }
        }
       
        System.out.println(
            "The names in alphabetical order are: ");
        for (int i = 0; i < num; i++) {
            System.out.println(names[i]);
        }
        
    inp.close();
    }
}
