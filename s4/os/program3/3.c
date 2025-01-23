
#include<stdio.h>
#include<sys/types.h>
#include<fcntl.h>
#include<sys/stat.h>
#include<unistd.h>
#include<string.h>
int main(){
int fd,fd2;
	char wbuf[128];
	char rbuf[128];
	fd=open("read.txt", O_RDWR);
	printf("Enter the content:\n");
	scanf("%s", wbuf );
	write(fd,wbuf,strlen(wbuf));
	close(fd);
	fd2=open("read.txt", O_RDWR);
	read(fd2,rbuf,128);
	printf("The contents are:\n");
	printf("%s", rbuf);
	close(fd2);
	return 0;
}
