/**
 * Created by xzper on 2014/11/15.
 */

module game {

    export class GameScreen extends egret.gui.SkinnableComponent {

        public constructor() {
            super();
            this.skinName = skin.MainGameUISkin;
            this.addEventListener(egret.gui.UIEvent.CREATION_COMPLETE , this.createCompleteEvent, this);
        }

        public createCompleteEvent(event:egret.gui.UIEvent):void{
            this.removeEventListener(egret.gui.UIEvent.CREATION_COMPLETE , this.createCompleteEvent, this);
            ApplicationFacade.getInstance().registerMediator( new GameScreenMediator(this) );

            this.gameScene.height = this.mainBg.height;
            this.gameScene.width = this.mainBg.width;
            //小伙伴骨骼动画
            for(var i = 0; i < GameData.gameOutData.herosData.length;i++)
            { 
                if(GameData.gameOutData.herosData[i].dynamicData.level == 0)
                { 
                    continue;
                }
                if(GameData.dbFactory.getDragonBonesData(GameData.gameOutData.herosData[i].boneAnimation) == null) {
                    GameData.addArmatureToFactory(GameData.dbFactory,GameData.gameOutData.herosData[i].boneAnimation,GameData.gameOutData.herosData[i].boneAnimation);
                }
                var amt = GameData.dbFactory.buildArmature( GameData.gameOutData.herosData[i].boneAnimation );
                var disp = amt.getDisplay();    
                //this.herosGroup.addChild(disp);
                this.herosGroup.addElement(disp);
                disp.x = 50+i*80;
                disp.scaleX = disp.scaleY = .3;
                //循环播放
                amt.animation.gotoAndPlay("Attack",0,-1,0);            
                dragonBones.WorldClock.clock.add(amt);
            }
            
            //心跳时钟开启,注意：这个是重点。不启动没效果。
            egret.Ticker.getInstance().register(function (advancedTime) {
                dragonBones.WorldClock.clock.advanceTime(advancedTime / 1000);
            }, this);  
        }


        
        public updateHeroBoneAnimation(): void
        {                         
            var lasthero: heroData = GameData.gameOutData.herosData[GameData.gameOutData.herosData.length-1];

            if(GameData.dbFactory.getDragonBonesData(lasthero.boneAnimation) == null) {
                GameData.addArmatureToFactory(GameData.dbFactory,lasthero.boneAnimation,lasthero.boneAnimation);
            }
            var amt = GameData.dbFactory.buildArmature(lasthero.boneAnimation);
            var disp = amt.getDisplay();    
            //this.herosGroup.addChild(disp);
            this.herosGroup.addElement(disp);
            disp.x = 50 + (GameData.gameOutData.herosData.length - 1) * 80;
            disp.scaleX = disp.scaleY = .3;
            //循环播放
            amt.animation.gotoAndPlay("Attack",0,-1,0);
            dragonBones.WorldClock.clock.add(amt);
        }
        
        public mainBg: egret.gui.UIAsset;
        public gameGroup: egret.gui.Group;
        public gameSceneUI:GameSceneUI;
        public gameScene:GameScene;
        public herosGroup: egret.gui.Group;
        public subSystemUI: SubSystemUI;
        
    }
}