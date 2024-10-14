import java.util.*;
class garbage
{
	protected void finalize(){
		System.out.println("object is collected");
	}
	public static void main(String args[]){
		garbage t1= new garbage();
		garbage t2= new garbage();
		t1=null;
		t2=null;
		System.gc();
		System.out.println("Garbage collector called");
	}
}
