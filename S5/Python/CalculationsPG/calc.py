a=int(input("Enter the first input:"))
b=int(input("Enter the second input:"))
c=int(input("Enter the preferrable calculation you want to perform on the two numbers:\n1.Add\n2.Substract\n3.Multiply\n4.Divide\n5.Floor Divide\n6.Modulo\n7.Exponentiation\n::"))
if c == 1:
	print("Sum of ",a," + ",b," = ",a+b)
elif c == 2:
	if a > b:
		print("Difference of ",a," and ",b," = ",a-b)
	else:
		print("Difference of ",b," and ",a," = ",b-a)
elif c == 3:
	print("Product of ",a," and ",b," = ",a*b)
elif c == 4:
	print("Quotient of ",a," and ",b," = ",a/b)
elif c == 5:
	print("Floor Quotient of ",a," and ",b," = ",abs(a//b))
elif c == 6:
	print("Remainder of ",a," and ",b," = ",a%b)
elif c == 7:
	print("Exponential of ",a," to power ",b," = ",pow(a,b))
else:
	print("Enter a valid option!")
