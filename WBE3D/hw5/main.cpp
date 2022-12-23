#include <stdio.h>
#include <stdlib.h>  // for atof
#include <math.h>

void rose (double &posX,double &posY,double &x, double &y)
// K, t: call by value
// x, y: call by reference
{
    int isReflectedX = 0;
    int isReflectedY = 0;
	if(posY > 70 || posY < -70){
		y = y * -1;
        if(posY > 0){
            posY = 69;
        }else{
            posY = -69;
        }
        isReflectedY = 1;
	}
	if(posX > 70 || posX < -70 ){
		x = x * -1;
		if(posX > 0){
            posX = 69;
        }else{
            posX = -69;
        }
        isReflectedX = 1;
	}
	if(!isReflectedX){
        posX = x + posX;

	}
	if(!isReflectedY){
        posY = y + posY;
	}
}

int main(int argc, char *argv[]) {
    if ( argc != 5 ) {
    	printf("%d", 0);
		exit (1);
    }else {
		double posX,posY;
		posX = atof(argv[3]);
		posY = atof(argv[4]);
		double x = atof (argv[1]);
    		double y = atof (argv[2]);
		rose (posX,posY, x, y);
        printf("%lf %lf %lf %lf",x ,y ,posX ,posY);
    }
    exit(0);
}

