/**
* Created by chen_qp on 2015/9/22.
* 金币掉落
*/
module game {

	export class ParallelGold extends egret.Bitmap{

        public timerId: number = -1;
        public elOriginalLeft: number;
        public elOriginalTop: number;
        public driftX: number;
        public driftY: number;

        //运动后执行的回调函数
        public callback: Function = null;
        // 是否自动开始，默认为false
        public autostart: boolean = false;
        
        private playingEffect:egret.gui.Effect;
		public constructor(_pic:string,_x:number,_y:number){
			super();
            this.texture = RES.getRes(_pic);
            this.x = _x;
            this.y = _y;
            //this.targetEl = _dropTarget;
            
            this.callback = this.flyToTotalMoney;
            
            //加入到游戏场景
            GameData.gameInGata.gameTopContainer.addChild(this);

            this.elOriginalLeft = _x;
            this.elOriginalTop = _y;
            // this.driftX X轴的偏移总量
            //this.driftY Y轴的偏移总量
            this.driftX = Math.ceil(Math.random() * 590)+10 - this.elOriginalLeft;
            this.driftY = 600 - this.elOriginalTop;
            
            var parallel:egret.gui.Parallel = new egret.gui.Parallel();
            var move:egret.gui.Move = new egret.gui.Move();
            move.repeatCount = 0;
            move.repeatBehavior = egret.gui.RepeatBehavior.REVERSE;
            move.autoCenterTransform = true;
            move.xFrom = _x;
            move.yFrom = _y;
            move.xTo = Math.ceil(Math.random() * 590)+10;
            move.yTo = 600;

            parallel.children = [move];    
            
            parallel.target = this;
            this.playingEffect = parallel;
                
            //自动开始
            if (this.autostart) {
                this.start();
            }
		}
		
        /**
        * 开始
        */
        public start():void {
            if(this.playingEffect)
            { 
                this.playingEffect.play();
            }
        }
        
        /**
        * 停止
        */
        public stop():void {
            if(this.playingEffect)
            { 
                //将播放头设置到初始值
                this.playingEffect.playheadTime = 0;
                //设置playheadTime后，动画又将重新播放，这里将动画终止
                this.playingEffect.stop();
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
            var _this = this;
            setTimeout(function(){
                //egret.Tween.get(_this).to({x:-50 , y:160} , 500,_this.die);
                egret.Tween.get(_this).to({x:265 , y:142} , 500);
            },1500);
        }        
	}
}