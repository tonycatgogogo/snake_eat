/**
 * Created by USER on 2019/2/13.
 */
(function () {
    //声明一个elements用来存储小蛇的位置，每次移动都删掉一次
    var elements=[];
    //构造小蛇函数（这个地方到底应不应该设置x，y变量？懵逼）
    function Snake(width,height,direction) {
        this.width=width||20;
        this.height=height||20;
        //小蛇开始有一个头 红色的，两个身子orange，食物是绿的。
        //小蛇最开始的位置是map的左上角，坐标如下
        this.body =[
            {x:3,y:2,background: 'url("./images/head.jpg") no-repeat center/cover'},
            {x:2,y:2,color:"green"},
            {x:1,y:2,color:"green"}
        ];
        //因为放到左下角了，所以默认先往右走吧
        this.direction=direction||"right"
    }
    //然后给小蛇添加原型方法
    Snake.prototype.init=function (map) {
        //先把小蛇放到map上，然后在加入移动的原型方法
        //每次调用之前先把原来的删了 不然满屏幕都是蛇
        remove();
        for(var i=0;i<this.body.length;i++){
            var obj=this.body[i];
            //因为小蛇的三个部分是用数组中的三个对象定义的，所以这里声明个obj,循环3次就出三个div在地图上
            var div=document.createElement("div");
            div.style.width=this.width+"px";
            div.style.height=this.height+"px";
            //x y color三个属性都是obj拿过来的 所以这三个用obj而不是this，此时的this是调用init的函数的实例对象
            //所以这个this是Snake未来的实例对象？
            if(i === 0){
                div.style.background=obj.background;
            }else {
                div.style.backgroundColor=obj.color;
            }
            div.style.position="absolute";
            this.x=obj.x*this.width;
            this.y=obj.y*this.height;
            //这里应该可以直接写到上面,给left 和top赋值就行
            div.style.left=this.x+"px";
            div.style.top=this.y+"px";
            map.appendChild(div);
            elements.push(div);
        }

    };
    //现在小蛇已经有了，再让小蛇动起来！
    Snake.prototype.move=function (food,map) {
        //身体部分每次都是把前面的给后一个,这样后面的看起来就往前跑了
        var i=this.body.length-1;
        for (;i>0;i--){
            //因为蛇头要根据方向判断，所以蛇头单独写，这里把数组前面的信息给后面的身子
            this.body[i].x=this.body[i-1].x;
            this.body[i].y=this.body[i-1].y;
        }
        switch (this.direction){
            case "right":this.body[0].x+=1;
            break;
            case "left":this.body[0].x-=1;
                break;
            case "top":this.body[0].y-=1;
                break;
            case "bottom":this.body[0].y+=1;
                break;
        }
        //移动的方式就这样，然后在game里面做一个定时器，不停的调用这个move 小蛇就能动了
        //然后让小蛇吃食物，通过坐标判断，相同的时候就让Food刷新，然后给小蛇的body里面push一个身子；
        var headX=this.body[0].x*this.width;
        var headY=this.body[0].y*this.height;
        if(headX==food.x&&headY==food.y){
            //这里不知道有没有问题。food是传进.move方法里的参数，后面再game里面如何实现food参数的传输？
            //没思路
            var last=this.body[this.body.length-1];
            //然后把last里面的参数push到body里面，蛇变长
            this.body.push({
                x:last.x,
                y:last.y,
                color:last.color
            });
            //每次蛇变长就刷新实物 把现在的这个删掉
            //这里的food应该大写还是小写好事不明白？？？（上面加了food参数，所以此时是小写）
            food.init(map);
        }
    };
    //把remove函数写出来 每次移动就删一次
    function remove() {
        //这个时候声明的element就来了
        var i=elements.length-1;
        for(;i>=0;i--){
            var ele=elements[i];
            ele.parentNode.removeChild(ele);
            //这里div的父级元素和父级节点有啥区别
            elements.splice(i,1);
        }
    }
    //把Snake献祭给window，然后外面就能用了
    window.Snake=Snake;
}());