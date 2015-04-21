
var checklist=[[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0]];
var resetlist=[[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0]];
var soln=[];
var t=0, started=0,pos=0,stopball; 
var moves=-4;
function runfireball()
{
pos+=5;
document.getElementById("fireball").style.left=pos;
document.getElementById("fireball2").style.right=pos;
document.getElementById("title").style.fontSize=20+2*pos/25;
if(pos>=250) clearInterval(stopball);
}

function animation()
{
stopball=setInterval(function(){runfireball()},10);
refresh();
}

function refresh()
{
checklist=[[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0]];
soln=[];
t=0;
moves=-4;

for(var i=1; i<=4; i++)
 {
 for(var j=1; j<=5; j++)
  {
  document.getElementById(""+i+""+j).style.backgroundColor="white";
  document.getElementById(""+i+""+j).style.border="7px double grey";
  } 
 }
 document.getElementById("solution").style.visibility="hidden";
 document.getElementById("result").style.visibility="hidden";
}

function add_to_soln(a,b)
{
 soln[t]=""+a+","+b;
 t++;
}

function show_soln()
{
var j="";
for(var i=t-1; i>=0; i--) j+=soln[i]+" ; ";
document.getElementById("solution").style.visibility="visible";
document.getElementById("solution").innerHTML=(j);
}

function test_soln()
{
if(document.getElementById("solution").style.visibility=="hidden") show_soln();
else document.getElementById("solution").style.visibility="hidden";
}

function generate()
{
resetlist=[[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0]];
refresh();
started=1;
for (var i=0; i<4; )                           <!-->Change here to increase hardness!!<-->
 {
 var x = Math.round(3*Math.random()) + 1;
 var y = Math.round(4*Math.random()) + 1;
 
 //document.getElementById("11").innerHTML=(""+x+","+y);
 
 
 if(checklist[x-1][y-1]==0)
  {
  resetlist[x-1][y-1]=1;
  i++;
  clicked(x,y);
  }
 }
}

function checkcolor(r,c)
{
if(document.getElementById(""+r+""+c).style.backgroundColor=="black") 
 {
 document.getElementById(""+r+""+c).style.backgroundColor="white";
 document.getElementById(""+r+""+c).style.border="7px double grey";
 }
else if(document.getElementById(""+r+""+c).style.backgroundColor=="white") 
 {
 document.getElementById(""+r+""+c).style.backgroundColor="black";
 document.getElementById(""+r+""+c).style.border="7px double white";
 }
}

function clicked(r,c)
{
if (started==1)
{
  moves++;
  
  document.getElementById("tocheck").innerHTML=("MOVES="+moves);
 if(checklist[r-1][c-1]==1) 
  {
  checklist[r-1][c-1]=0;
  var index = soln.indexOf(""+r+","+c);
  //document.getElementById("result").innerHTML=(index);
  if (index > -1) 
   {
   soln.splice(index, 1); 
   t--;
   if(t==0)
    {
    document.getElementById("result").style.visibility="visible";
    document.getElementById("result").innerHTML=("CONGRATULATIONS!! YOU WON!! MOVES ="+moves);
    started=0;
	}
   }
  }
 
 else if(checklist[r-1][c-1]==0) 
  {
  checklist[r-1][c-1]=1;
  add_to_soln(r,c);
  } 

  if(r!=1) checkcolor(r-1,c);
  if(r!=4) checkcolor(r+1,c);
  if(c!=5) checkcolor(r,c+1);
  if(c!=1) checkcolor(r,c-1);

 if(document.getElementById("solution").style.visibility=="visible") show_soln();
 }
}
function reset()
{
 refresh();
 for(var i=0;i<4;i++)
 {
  for(var j=0;j<5;j++)
  {
   if(resetlist[i][j]==1) clicked(i+1,j+1);
  }
 } 
}
