a=int(input("Enter the first input:"))
b=int(input("Enter the second input:"))
c=(input("Enter the OPERATION TO PERFORM: +,-,*,/"))
if c == '+':
	print("Sum of ",a," + ",b," = ",a+b)
elif c == "-":
	if a > b:
		print("Difference of ",a," and ",b," = ",a-b)
	else:
		print("Difference of ",b," and ",a," = ",b-a)
elif c == '*':
	print("Product of ",a," and ",b," = ",a*b)
elif c == '/':
	print("Quotient of ",a," and ",b," = ",a/b)
else:
	print("Enter a valid option!")
