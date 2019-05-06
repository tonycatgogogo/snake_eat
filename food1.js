/**
 * Created by USER on 2019/2/13.
 */
(function () {
    //声明一个变量elements，用来存储实物方块
    var elements=[];
    //自定义构造函数Food
    function Food(x,y,width,height) {
        this.x=x||0;
        this.y=y||0;
        this.width=width||20;
        this.height=height||20;
        this.bgImage = 'url("./images/food1.jpg") no-repeat center/cover'
    }
    //给Food添加原型方法，并添加到map上
    Food.prototype.init=function (map) {
        //每次刷新实物之前先清除地图上的食物
        remove();
        //给小食物添加样式
        var div=document.createElement("div");
        div.style.width=this.width+"px";
        div.style.height=this.height+"px";
        div.style.background=this.bgImage;
        div.style.position="absolute";
        this.x=parseInt(Math.random()*map.offsetWidth/this.width)*this.width;
        this.y=parseInt(Math.random()*map.offsetHeight/this.height)*this.height;
        div.style.left=this.x+"px";
        div.style.top=this.y+"px";
        map.appendChild(div);
        elements.push(div);
    };
    //定义remove函数，把小食物删除的同时，把elements里面存储的食物数组也干掉；
    function remove() {
        for(var i=0;i<elements.length;i++){
            var ele=elements[i];
            ele.parentNode.removeChild(ele);
            elements.splice(i,1);
        }
    }
    //构造函数Food变成全局变量
    window.Food=Food
}
());