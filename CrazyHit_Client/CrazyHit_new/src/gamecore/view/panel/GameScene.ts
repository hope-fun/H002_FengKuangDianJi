/**
 * Created by chen_qp on 2015/8/10.
 */
module game {

    /**
     * 游戏场景
     */
    export class GameScene extends egret.gui.UIAsset {
        
        public constructor(){
            super();
            this.addEventListener(egret.gui.UIEvent.CREATION_COMPLETE , this.createCompleteEvent, this);
            this.addContainer();                     
        }
        
        /**
        * 加载游戏场景
        */
        private loadGameScene(): void {          
            this.loadEnemy(GameData.gameInGata.curEnemy);
        }
        
        public enemy: EnemyUI;
        public enemyAmt: dragonBones.Armature;
        public enemyDisp: any;
        
        /**
        * 加载怪物
        */
        public loadEnemy(_enemy:enemyData): void { 
            ///*
            if(this.enemyAmt != null)
            { 
                dragonBones.WorldClock.clock.remove(this.enemyAmt);
            }
            if(this.enemyDisp != null)
            { 
                GameData.gameInGata.gameTopContainer.removeChild(this.enemyDisp);
            }
            if(GameData.dbFactory.getDragonBonesData(GameData.gameInGata.curEnemy.boneAnimation) == null) {
                GameData.addArmatureToFactory(GameData.dbFactory,GameData.gameInGata.curEnemy.boneAnimation,GameData.gameInGata.curEnemy.boneAnimation);
            }
            this.enemyAmt = GameData.dbFactory.buildArmature(GameData.gameInGata.curEnemy.boneAnimation);
            this.enemyDisp = this.enemyAmt.getDisplay();    
            GameData.gameInGata.gameTopContainer.addChildAt( this.enemyDisp,0 ); 
            this.enemyDisp.x = 450;
            this.enemyDisp.y = 400-50+168;     
            this.enemyDisp.anchorOffsetX = this.enemyDisp.width / 2;
            this.enemyDisp.anchorOffsetY = this.enemyDisp.height / 2;
            //循环播放
            this.enemyAmt.animation.gotoAndPlay("Standby",0,-1,0);
            //this.enemyAmt.animation.gotoAndPlay("Attack",0,-1,0);
            dragonBones.WorldClock.clock.add(this.enemyAmt);
            
            
            this.enemy = new EnemyUI( GameData.gameInGata.curEnemy.pic );
            //*/
                /*
            this.enemy = new EnemyUI( GameData.gameInGata.curEnemy.pic );
            //GameData.gameInGata.gameTopContainer.addChild( this.enemy );   
            GameData.gameInGata.gameTopContainer.addChildAt( this.enemy,0 );   
            */
        }
        
        /**
        * 加载下一怪物
        */
        public loadNextEnemy(): void { 
            GameData.gameInGata.curEnemy = GameData.gameInGata.getNextEnemy();
            //GameData.gameInGata.gameTopContainer.removeChild( this.enemy );   
            delete this.enemy;
            this.loadEnemy(GameData.gameInGata.curEnemy);
        }     

        private addContainer():void{
            GameData.gameInGata.gameTopContainer = new egret.Sprite();
            this.source = GameData.gameInGata.gameTopContainer;
        }

        public createCompleteEvent(event:egret.gui.UIEvent):void{
            this.removeEventListener(egret.gui.UIEvent.CREATION_COMPLETE , this.createCompleteEvent, this);
            this.loadGameScene();   
            ApplicationFacade.getInstance().registerMediator( new GameSceneMediator(this) );
        }

    }
}