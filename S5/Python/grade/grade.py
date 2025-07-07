m=int(input("Enter the marks out of 100: "))
if m >= 90:
	print("GRADE A")
elif m >= 75 and m <=89:
	print("GRADE B")
elif m >= 60 and m <= 74:
	print("GRADE C")
elif m >= 40 and m <= 59:
	print("GRADE D")
elif m < 40:
	print("FAIL!")
