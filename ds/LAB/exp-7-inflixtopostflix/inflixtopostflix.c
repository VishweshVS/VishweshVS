#include<stdio.h>
#include<stdlib.h>
#include<string.h>
int prec(char c){
if(c=='^')
	return 3;
else if (c== '/'|| c=='*')
	return 2;
else if (c== '+'|| c=='-')
	return 1;
else 
	return -1;


}
char associativity(char c){
	if(c=='^')
		return 'R';
	return 'L';


}
void inflixtopostflix(char s[]){
char result[1000];
int resultindex=0;
int stack[1000];
int stackindex =-1;
int len = strlen(s);
for(int i=0;i<len;i++){
	char c = s[i];
if((c>='a' && c <= 'z')||(c>='A' && c>='Z')||(c>='0'&&c>='9')){
		result[resultindex++]=c;
}
else if(c=='('){
	stack[stackindex++]=c;
}
else if(c==')'){
	while(stackindex>=0&&stack[stackindex]!='('){
		result[resultindex++]=stack[stackindex--];
	}
	stackindex--;
}
else{
	while(stackindex>= 0 && (prec(s[i]) < prec(stack[stackindex])||prec(s[i])==prec(stack[stackindex])&&associativity(s[i]) == 'L')){
	result[resultindex++]=stack[stackindex--];
}
stack[++stackindex]=c;
}
}
while(stackindex>=0){
	result[resultindex++]=stack[stackindex--];
}
result[resultindex]='\0';
printf("%s\n", result);
}
int main(){
	char exp[100];
	printf("\nEnter the equation:");
	scanf("\t%s", exp);
	inflixtopostflix(exp);
return 0;
}
