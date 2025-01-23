#include<stdio.h>
#include<sys/types.h>
#include<dirent.h>
void main(){
	DIR * dir;
	struct dirent* ptr2;
	char dir_name[50];
	printf("Enter the directory name:\n");
	scanf("%s", dir_name);
	dir=opendir(dir_name);
	while((ptr2=readdir(dir))!=NULL)
		printf("%ld\t%s",ptr2->d_ino,ptr2->d_name);
	closedir(dir);
}
