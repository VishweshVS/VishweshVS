s=str(input("Enter a sentence: "))
chr=0
for i in s:
	if i != " ":
		chr+=1
print("No.of characters: ",chr)
print("Uppercase : ",s.upper(),"\nLowercase : ",s.lower())
k=s
j=0

print(k.replace(' ','_'))
l=[]
l.append(s.split())
p='Python'
if p in s:
	print("The word Python is present.")
