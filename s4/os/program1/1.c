#include<stdlib.h>
#include<sys/types.h>
#include<stdio.h>
#include<unistd.h>
#include<sys/wait.h>
void main(){
	int pid,child_pid,status;
	pid=fork();
	if(pid==-1){
		printf("child process creation failed!");
		exit(0);
	}
	else if(pid==0){
		printf("\nInside child process with process id:%d\n", getpid());
		execlp("/bin/date","date",NULL);
		exit(0);
	}
	else{
		child_pid=wait(&status);
		printf("\nInside the parent process with ID:%d\n", getpid());
		printf("Child Process created Successfully\n");
	}
}
