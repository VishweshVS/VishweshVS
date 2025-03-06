#include<stdio.h>
#include<stdlib.h>
int mutex=1,full=0,empty=3,x=0;
int signal(int s){
	return(++s);
}
int wait(int s){
	return(--s);
}
void producer(){
	empty= wait(empty);
	mutex=wait(mutex);
	x++;
	printf("PRODUCER PRODUCES ITEM: %d", x);
	mutex=signal(mutex);
	full=signal(full);
	}
void consumer(){
	full= wait(full);
	mutex=wait(mutex);
	printf("CONSUMER CONSUMES ITEM: %d", x);
	x--;
	mutex=signal(mutex);
	empty=signal(empty);
	}
void main(){
int n;
while(1){
	printf("\n1.Producer\n2.Consumer\n3.Exit\n");
	printf("ENTER THE CHOICE:\n");
	scanf("%d",&n);
	switch(n)
	{
		case 1:{
			if ((mutex==1) && (empty!=0)){
				producer();
				}
			else{
				printf("\nThe Buffer is full.\n");
			}
			break;
		}
		case 2:{
			if ((mutex==1) && (full!=0)){
				consumer();
				}
			else{
				printf("\nThe Buffer is empty.\n");
				}
			break;
		}
		case 3:{
			exit(0);
			break;
		}
	}
	}
}
