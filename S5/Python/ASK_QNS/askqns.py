a=int(input("How's the climate outside?\n1.Sunny\n2.Rainy\n3.Thunder\n"))
if a in [1,2,3]:
	b=input("Do you have an Umbrella?")
	if b == 'YES' or b == 'NO':
		q=int(input("  ------------------------\n1.|Should you go outside?|\n  ------------------------\n ------------------------\n2.|Should you carry the umbrella?|\n  ------------------------\n"))
	else:
		print("Enter valid choice!")
	
else:
	print("Enter valid choice!")
if q == 1 and (a == 1 or b == 'YES'):
	print("Yes you can go!")
elif q == 1 and (a != 1 and b == 'YES'):
	print("Yes you can go!")
elif q == 1 and (a != 1 and b == 'NO'):
	print("No, you can't go!")
elif q == 1 and (a == 1 and b == 'NO'):
	print("Yes you can go!")
if q == 2 and (a == 1 and b == 'YES'):
	print("No you can go without it!")
elif q == 2 and (a != 1 and b == 'YES'):
	print("Yes, you should carry the umbrella!")
elif q == 2 and (b == 'NO'):
	print("You don't have a Umbrella")
