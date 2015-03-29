var l=3,played=0;

var list=[[l,l,l,l,l,l,l],[l,0,0,0,0,0,l],[l,0,0,0,0,0,l],[l,0,0,0,0,0,l],[l,0,0,0,0,0,l],[l,0,0,0,0,0,l],[l,l,l,l,l,l,l]];
var down=1,right=1,up=0,left=0,currentrow=1,currentcolumn=1,userrow=1,usercolumn=1;
var t=0,win=0,dead=0;
var soln=[];
var r1=1,r2=1;
var element=document.createElement("img");
  element.setAttribute("id","image");
  element.setAttribute("src","static/img/spaceship.png ");
  element.setAttribute("width","100%");
  element.setAttribute("height","100%");
  element.setAttribute("style","visibility: visible; top: 0px; left: 0px; display: inline-block; height: 50px; width: 50px;")
/*
function startnew()
{
document.location.reload();
$(document).ready(function(){
start();});
}*/

function reset() //cant use location.reload() as javascript gets washed off 
{
list=[[l,l,l,l,l,l,l],[l,0,0,0,0,0,l],[l,0,0,0,0,0,l],[l,0,0,0,0,0,l],[l,0,0,0,0,0,l],[l,0,0,0,0,0,l],[l,l,l,l,l,l,l]];
down=right=currentrow=currentcolumn=userrow=usercolumn=1;
up=left=t=win=dead=0;
	r1=1;r2=1;
	r1 = Math.round(5*Math.random());
	r2 = Math.round(5*Math.random());
	while((r2==r1 && r1==5)||(r1==0||r2==0))
	{
		r1 = Math.round(5*Math.random());
		r2 = Math.round(5*Math.random());
	}
	currentrow=r1,currentcolumn=r2,userrow=r1,usercolumn=r2;
	var foo=document.getElementById(""+r1+""+r2);
    foo.appendChild(element);
soln=[];
document.getElementById("image").style.visibility="visible";

var x=document.getElementById("image");
x.style.top=0;
x.style.left=0;
x.width=0;
x.height=0;
$(document).ready(function(){
  $("img").animate({height:'50px',width:'50px'},0,function(){});});
  
 document.getElementById("solution").style.visibility="hidden";
 document.getElementById("result").style.visibility="hidden";
}

function start()
{
	
	
if (played!=0) reset();
else 
{
	r1=1;r2=1;
	r1 = Math.round(5*Math.random());
	r2 = Math.round(5*Math.random());
	while((r2==r1 && r1==5)||(r1==0||r2==0))
	{
		r1 = Math.round(5*Math.random());
		r2 = Math.round(5*Math.random());
	}
	currentrow=r1,currentcolumn=r2,userrow=r1,usercolumn=r2;
	var foo=document.getElementById(""+r1+""+r2);
    foo.appendChild(element);
document.getElementById("image").style.visibility="visible";
document.getElementById("solution").style.visibility="hidden";
}
 for(var i=1;i<=5;i++)
 {
 for(var j=1;j<=5;j++)
 document.getElementById(""+i+""+j).style.backgroundColor="";
 }

generate();


if(played==0) input(); //input is called only once otherwise it would form a queue of animate function and on pressing a single time more steps would be taken
}

function generate()
{
 while(list[5][5]==0)
 {
 
 var ran = Math.round(4*Math.random()); 

 // document.getElementById("abc").innerHTML=111; 
 
 generated=0;
 
 if((ran==0||ran==4)&&right<5)//up
 {
  if((list[currentrow-1][currentcolumn]!=l)&&(currentrow!=2||currentcolumn!=1)&&(right-left>1||list[currentrow][currentcolumn-1]!=l))
   {
   currentrow--;
   generated=1;
   up++;
   }  
 } 
 
 else if(ran==1)//down
 {
  if(list[currentrow+1][currentcolumn]!=l)
  {
   if(currentcolumn!=5||currentrow!=5)  generated=1;
   currentrow++;
   down++;
  }
 }
 else if(ran==2&&down<5)//left
 {
  if((list[currentrow][currentcolumn-1]!=l)&&(currentcolumn!=2||currentrow!=1)&&(down-up>1||list[currentrow+1][currentcolumn]!=l))
  { 
   currentcolumn--;
   generated=1;
   left++;
  }
 }
 else if(ran==3)//right
 {
  if(list[currentrow][currentcolumn+1]!=l)
   {
   if(currentcolumn!=5||currentrow!=5)  generated=1;
   currentcolumn++;
   right++;
   }
 }
 if(generated==1) 
 {
 list[currentrow][currentcolumn]++;
 colourchange(currentrow,currentcolumn);
 add_to_soln(currentrow,currentcolumn);
 }
 }
document.getElementById("55").style.backgroundColor="green";
document.getElementById(""+r1+""+r2).style.backgroundColor="red";

} 

function colourchange(a,b)
{
 if(list[a][b]==0) document.getElementById(""+a+""+b).style.backgroundColor="";
 else if(list[a][b]==1) document.getElementById(""+a+""+b).style.backgroundColor="blue";
 else if(list[a][b]==2) document.getElementById(""+a+""+b).style.backgroundColor="yellow";
 else if(list[a][b]==3) document.getElementById(""+a+""+b).style.backgroundColor="brown";

}

function add_to_soln(a,b)
{
 soln[t]=""+a+","+b;
 t++;
}

function show_soln()
{
var j="";
for(var i=0; i<t; i++) j+=soln[i]+" ; ";
document.getElementById("solution").style.visibility="visible";
document.getElementById("solution").innerHTML=(j);
}

function test_soln()
{
if(document.getElementById("solution").style.visibility=="hidden") show_soln();
else document.getElementById("solution").style.visibility="hidden";
} 

function input()                                 // IT IS NECESSARY TO DEFINE THE POSITION OF AN ELEMENT TO USE JQUERY
{
played=1;
 $(document).ready(function(){
  $(document).keyup(function(e){
    if(e.keyCode == 65&&dead==0) //num arrow keys 
	{
	  usercolumn--;
	  $("img").animate({left:'-=58px'},150,function(){timelag();});
	}
  	else if(e.keyCode == 68&&dead==0) 
    {
	  usercolumn++;
      $("img").animate({left:'+=58px'},150,function(){timelag();});
	}
    else if(e.keyCode == 87&&dead==0) 
    {
	  userrow--;
      $("img").animate({top:'-=58px'},150,function(){timelag();});
	}
    else if(e.keyCode == 83&&dead==0) 
    {
	  userrow++;
	  $("img").animate({top:'+=58px'},150,function(){timelag();});
	}
  
  });
 });
}

function timelag()
{
  if((userrow!=r1||usercolumn!=r2)&&(userrow!=5||usercolumn!=5)) 
  {
   checkdead(userrow,usercolumn);
   if(userrow!=0&&userrow!=6&&usercolumn!=0&&usercolumn!=6)   // if instead of this condtion i write if(dead==0) it wont work
   {
   list[userrow][usercolumn]--;
   colourchange(userrow,usercolumn);
   }
  }
  else if (userrow==5&&usercolumn==5) checkwin();
}

function checkdead(a,b)
{
 if (a<=0||a>=6||b<=0||b>=6||list[a][b]==0)
 {
 $(document).ready(function(){
  $("img").animate({height:'0px',width:'0px',left:'+=25px',top:'+=25px'},750,function(){
   document.getElementById("result").style.visibility="visible";
   document.getElementById("result").innerHTML=("YOU LOST!!");
   dead=1;
   //$("img").stop(true);
   }); 
  });
 }
}

function checkwin()
{
 list[r1][r2] = 3;
 win=0;
 for(var i=1;i<=5;i++)
 {
 for(var j=1;j<=5;j++)
 win+=list[i][j];
 }
  
 if(win==l+1) 
 {
 document.getElementById("result").style.visibility="visible";
 document.getElementById("result").innerHTML=("YOU WON!!");//l of (1,1) & 1 of (5,5)
 dead=1;
 }
}