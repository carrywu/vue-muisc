//输入  输出
/*1.用户每输入一个数字后，判断后面的value
假如是.
继续判断是否还是.
如果是. 用户不能输入
如果不是 继续计算
当输入+*-/=
进行运算
2.利用数组存值
*/
var sum=[];
var btn=document.getElementsByClassName("btn_a");
var btm=document.getElementsByClassName("btm");
// console.log(btm);
var play=document.getElementsByClassName("txt")[0];
//ac,del事件
for(i=0;i<btn.length;i++){
  btn[i].onclick =function(){
          if(this.value=="ac"){
            sum=[];
            play.value="";
          }
          else {
            play.value=play.value.substr(0,play.value.length-1);
          }
  }
}
//其他按钮
for(i=0;i<btm.length;i++)
{
  btm[i].onclick=function(){
    if(play.value==""&& this.value=="."){
      play.value="0.";
    }
    else {
      if(!isNaN(this.value)||this.value =="."){
        if(play.value.indexOf(".")!=-1)
        {
          if(this.value!=".")
          {
            play.value+=this.value;
          }
        }
        else {
           play.value += this.value;
        }
        }
        else {
          //是符号的情况
        if(this.value !="="){
          sum[sum.length]=play.value;
          sum[sum.length]=this.value;
          play.value= "";
        }
        else {
          sum[sum.length]=play.value;
          play.value=eval(sum.join(""));
          sum=[];
        }
        }

    }
  }
}
