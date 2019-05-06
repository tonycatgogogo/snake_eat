/**
 * Created by USER on 2019/2/13.
 */
(function () {
    //构造Game函数，这里接口怎么弄真是不太懂
    var that=null;
    var timeId = null;
    function Game(map) {
        //这里实例对象前面的食物和小蛇，完成接口转换
        this.food=new Food;
        this.snake=new Snake;
        this.map=map;
        //把传进来的map拿来
        that=this;
    }
    //初始化游戏，调用的时候就开始
    Game.prototype.init=function () {
        //先把食物和小蛇调出来
        clearInterval(timeId);
        this.snake.body = [
            {x:3,y:2,background: 'url("./images/head.jpg") no-repeat center/cover'},
            {x:2,y:2,color:"green"},
            {x:1,y:2,color:"green"}
        ];
        this.food.init(this.map);
        this.snake.init(this.map);
        //同时调用定时器和键盘监听
        //键盘监听不会写！！！！
        this.runSnake(this.food,this.map);
        this.bindKey(this.food,this.map);
    };
    Game.prototype.pause = function (){
        clearInterval(timeId)
    }
    Game.prototype.continue = function (){
        this.runSnake(this.food,this.map);
    }
    Game.prototype.runSnake=function (food,map) {
        timeId=setInterval(function () {
            this.snake.move(food,map);
            this.snake.init(map);
            var maxX=map.offsetWidth/this.snake.width;
            var maxY=map.offsetHeight/this.snake.height;
            var headX=this.snake.body[0].x;
            var headY=this.snake.body[0].y;
            if(headX<0||headX>=maxX){
                alert("游戏结束");
                clearInterval(timeId);
            }
            if(headY<0||headY>=maxY){
                alert("游戏结束");
                clearInterval(timeId);
            }
        }.bind(that),150)
    };
    //按键监听 上下左右分别改变方向
    Game.prototype.bindKey=function () {
      document.addEventListener("keydown",function (e) {
          switch (e.keyCode){
              case 37:this.snake.direction="left";break;
              case 38:this.snake.direction="top";break;
              case 39:this.snake.direction="right";break;
              case 40:this.snake.direction="bottom";break;
          }
      }.bind(that),false)
    };
    //把Game献祭给window，外部可以调用Game
    window.Game=Game;
}());