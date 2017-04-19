

module game {
    
    export class DynamicEnemyUI extends egret.Bitmap{
        
        //public 
        
        public constructor(_pic:string){
            super();
            this.texture = RES.getRes(_pic);
            this.x = 320;
            //this.y = 300-50;     
            this.y = 300-50+168;     
            this.anchorOffsetX = this.width / 2;
            this.anchorOffsetY = this.height / 2;
        }
        		
        /**
        * 播放缩放效果
        */
        public playScale():void{
            this.scaleX = this.scaleY = 0.3;
            //this.x = 320-this.width*this.scaleX/2;
            //this.y = 400-this.height*this.scaleY/2-50;             
            egret.Tween.get(this).to({scaleX:1 , scaleY:1} , 100,this.tweenComplete);
        }	
        		
        private tweenComplete():void
        {
            //console.log( "tweenComplete" );   
            //this.x = 320*this.scaleX-this.width/2;
            //this.y = 400*this.scaleY-this.height/2-50;  
            //this.x = 320-this.width/2;
            //this.y = 400-this.height/2-50;    
        }
        		
        /**
        * 怪物死亡
        */
        public death():void{
                        
            //播放掉落动画
            var _minusHp: egret.BitmapText = new egret.BitmapText();            
            //_minusHp.size = 48;    
            //_minusHp.textColor = 0xf0f030;
            _minusHp.font = GameData.customFont;
            _minusHp.alpha = 0.5;
            _minusHp.scaleX = _minusHp.scaleY = 0.7;
            _minusHp.text = GameData.gameInGata.curEnemy.totalDropMoney.toString(); 
            GameData.gameInGata.gameTopContainer.addChild(_minusHp);
            //_minusHp.x = this.x+this.width/2+20;
            //_minusHp.y = this.y;
            _minusHp.x = this.x+20;
            _minusHp.y = this.y;
                               
            var fun:Function = function(){
                GameData.gameInGata.gameTopContainer.removeChild(_minusHp);
                //更新金币
                GameData.gameInGata.dynamicData.totalMoney += GameData.gameInGata.curEnemy.totalDropMoney;
                //判断能否买新的小伙伴
                localStorage.setItem("gameInDynamicData",JSON.stringify(GameData.gameInGata.dynamicData));
                ApplicationFacade.getInstance().sendNotification(SceneCommand.LEVEL_UP,ListItemType.PLAYER);
            };
            //egret.Tween.get(_minusHp).to({x:280,y:-10} , 800).call(fun,this);
            egret.Tween.get(_minusHp).to({x:280,y:158,size:24} , 800).call(fun,this);
            //更新金币
            //GameData.gameInGata.totalMoney += GameData.gameInGata.curEnemy.totalDropMoney;
        }			
        		
        /**
        * 扣血
        */
        public minusHp(_minusCount:number):void{
            this.playScale();
            if(_minusCount > GameData.gameInGata.curEnemy.hp)
            { 
                _minusCount = GameData.gameInGata.curEnemy.hp;
            }
            GameData.gameInGata.curEnemy.hp -= _minusCount;
            //播放扣血动画
            var _minusHp: egret.BitmapText = new egret.BitmapText();            
            //_minusHp.size = 48;    
            //_minusHp.textColor = 0xff0000;
                        
            //_minusHp.font = "font_fnt";
            _minusHp.font = GameData.customFont;
            _minusHp.text = _minusCount.toString(); 
            GameData.gameInGata.gameTopContainer.addChild(_minusHp);
            //_minusHp.x = this.x+this.width/2-_minusHp.width/2;
            //_minusHp.y = this.y+this.height/2;
            _minusHp.x = this.x-_minusHp.width/2;
            _minusHp.y = this.y;
                   
            var fun:Function = function(){
                GameData.gameInGata.gameTopContainer.removeChild(_minusHp);
            };
            egret.Tween.get(_minusHp).to({y:_minusHp.y-200,size:32} , 500).call(fun,this);
        }
    }
}