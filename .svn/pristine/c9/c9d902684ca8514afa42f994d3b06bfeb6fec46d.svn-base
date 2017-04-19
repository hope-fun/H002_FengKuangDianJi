/**
* Created by chen_qp on 2015/9/22.
* 金币掉落
*/
module game {

	export class DropGold extends egret.Bitmap{

        public timerId: number = -1;
        public elOriginalLeft: number;
        public elOriginalTop: number;
        public driftX: number;
        public driftY: number;
        public b: number;
        
        public totalMoneyX: number;
        public totalMoneyY: number;
        
        public el: any = null;
        //偏移位置
        public offset: number[] = [200,200];
        //终点元素，这时就会自动获取该元素的left、top，设置了这个参数，offset将失效
        public targetEl: any = null;
        //已运行时间：默认0毫秒
        public runTime: number=0;
        //检测间隔，默认13毫秒
        public stepSpan: number = 30;//fps:33
        //运动的时间，默认500毫秒
        public duration: number = 500;
        //抛物线曲率，就是弯曲的程度，越接近于0越像直线，默认0.001
        public curvature: number = 0.01;
        //运动后执行的回调函数
        public callback: Function = null;
        // 是否自动开始，默认为false
        public autostart: boolean = false;
        //运动过程中执行的回调函数
        public stepCallback: Function = null;
        
		public constructor(_pic:string,_x:number,_y:number){
			super();
            this.texture = RES.getRes(_pic);
            this.x = _x;
            this.y = _y;
            //this.targetEl = _dropTarget;
            
            this.callback = this.flyToTotalMoney;
            
            //加入到游戏场景
            GameData.gameInGata.gameTopContainer.addChild(this);

            //this.elOriginalLeft = 0;
            //this.elOriginalTop = 0;
            this.elOriginalLeft = _x;
            this.elOriginalTop = _y;
            // this.driftX X轴的偏移总量
            //this.driftY Y轴的偏移总量
            this.driftX = Math.ceil(Math.random() * 590)+10 - this.elOriginalLeft;
            this.driftY = 600 - this.elOriginalTop;
            /*
            if (this.targetEl) {
                this.driftX = this.targetEl.x - this.elOriginalLeft;
                this.driftY = this.targetEl.y - this.elOriginalTop;
            } else {
                this.driftX = this.offset[0];
                this.driftY = this.offset[1];
            }
            */
            
            // 根据两点坐标以及曲率确定运动曲线函数（也就是确定a, b的值）
            //a=this.curvature
            /* 公式： y = a*x*x + b*x + c;
            */
            /*
            * 因为经过(0, 0), 因此c = 0
            * 于是：
            * y = a * x*x + b*x;
            * y1 = a * x1*x1 + b*x1;
            * y2 = a * x2*x2 + b*x2;
            * 利用第二个坐标：
            * b = (y2+ a*x2*x2) / x2
            */
            // 于是
            this.b = ( this.driftY - this.curvature * this.driftX * this.driftX ) / this.driftX;
                
            //自动开始
            if (this.autostart) {
                this.start();
            }
		}
		
        /**
        * 开始
        */
        public start():void {
            var self = this;
            if (this.driftX === 0 && this.driftY === 0) {
                // 原地踏步就别浪费性能了
                return;
            }

            if (this.timerId != -1) {
                clearInterval(this.timerId);
                this.stop();
            }
            this.timerId = setInterval(function () {
                self.step(self.stepSpan);
                
                }, this.stepSpan);
            }
		
        /**
        * 定位
        * @param {Number} x x坐标 .
        * @param {Number} y y坐标 .
        */
        public domove(x:number, y:number):void {
            this.x = this.elOriginalLeft + x;
            this.y = this.elOriginalTop + y;
        }
        
        /**
        * 每一步执行
        * @param {Data} stepSpan 间隔时间 .
        */
        public step(stepSpan:number):void {
            var x, y;
            this.runTime += stepSpan;
            if (this.runTime > this.duration) {
                // 运行结束
                x = this.driftX;
                y = this.driftY;
                this.domove(x, y);
                this.stop();

                if(this.callback) {
                    this.callback.call(this);
                }
            } else {
                //x 每一步的X轴的位置
                x = this.driftX * (this.runTime / this.duration);
                //每一步的Y轴的位置y = a*x*x + b*x + c;   c==0;
                y = this.curvature * x * x + this.b * x;
                
                this.domove(x, y);
                if (this.stepCallback) {
                    this.stepCallback.call(this);
                }
            }
        }
		
        /**
        * 重置
        */
        public reset(x:number, y:number):void {
            this.stop();
            this.x = x ? x : 0;
            this.y = y ? y : 0;
            this.domove(x, y);
        }
        
        /**
        * 停止
        */
        public stop():void {
            if (this.timerId != -1) {
                clearInterval(this.timerId);                
            }
        }
        
        /**
        * 死亡消失
        */
        public die():void {
            //从游戏场景中删除
            GameData.gameInGata.gameTopContainer.removeChild(this);
        }        
        
        /**
        * 飞向总钱数
        */
        public flyToTotalMoney():void {
            //egret.Tween.get(this).to({x:265 , y:142} , 500);
            //egret.Tween.get(this).to({x:265 , y:155} , 500,this.die);
            egret.Tween.get(this).to({x:this.x , y:this.y} , 1500)
            .to({x:this.totalMoneyX , y:this.totalMoneyY} , 500);
            var _this = this;
            setTimeout(function(){
                _this.die();
            },2000);
            /*
            var _this = this;
            setTimeout(function(){
                //egret.Tween.get(_this).to({x:-50 , y:160} , 500,_this.die);
                //egret.Tween.get(_this).to({x:265 , y:142} , 500);
                    egret.Tween.get(_this).to({x:_this.totalMoneyX , y:_this.totalMoneyY} , 500);
            },1500);
            */
        }        
	}
}