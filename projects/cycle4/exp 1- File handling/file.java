import java.io.*;
import java.util.*;

class file 
{ 
    public static void main(String[] args) throws IOException 
    { 
    		Scanner s1= new Scanner(System.in);
    		System.out.println("Enter the File contents:");
		    String str = s1.nextLine();
  
        FileWriter fw=new FileWriter("output.txt"); 

        for (int i = 0; i < str.length(); i++) 
            fw.write(str.charAt(i));
  
        System.out.println("Writing successful"); 
        fw.close(); 
        int ch; 
  
        FileReader fr= new FileReader("output.txt");
        
        try
        { 
            fr = new FileReader("output.txt"); 
        } 
        catch (FileNotFoundException fe) 
        { 
            System.out.println("File not found"); 
        } 
  
        while ((ch=fr.read())!=-1) 
            System.out.print((char)ch); 
  
        fr.close(); 
        s1.close();
    } 
}
