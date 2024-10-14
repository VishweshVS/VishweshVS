import java.util.*;
abstract class shape
{
	
	abstract void Numberofsides();
}
class rectangle extends shape
{
	void Numberofsides()
	{
		System.out.println("The number of sides of rectangle are 4");
	}
}
class triangle extends shape
{
	void Numberofsides(){
		System.out.println("The number of sides of triangle are 3");
		}
}
class hexagon extends shape
{
	void Numberofsides(){
		System.out.println("The number of sides of hexagon are 5");
		}
}
class demoshape{
	public static void main(String args[]){
		rectangle A = new rectangle();
        triangle B = new triangle();
        hexagon C = new hexagon();
        A.Numberofsides();
        B.Numberofsides();
        C.Numberofsides();
	}
}
