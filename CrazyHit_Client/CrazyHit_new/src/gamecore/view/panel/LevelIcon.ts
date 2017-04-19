/**
 * Created by chen_qp on 2015/8/8.
 */
module game {

    /**
     * 等级icon
     */
    export class LevelIcon extends egret.gui.SkinnableComponent {

        public constructor() {
            super();
            this.skinName = skin.components.LevelIconSkin;
            this.addEventListener(egret.gui.UIEvent.CREATION_COMPLETE , this.createCompleteEvent, this);
        }

        public createCompleteEvent(event:egret.gui.UIEvent):void{
            this.removeEventListener(egret.gui.UIEvent.CREATION_COMPLETE , this.createCompleteEvent, this);
            //ApplicationFacade.getInstance().registerMediator( new GameMenuMediator(this) );
            
        }
        
        public setType(_type:LevelIconType):void{
            if(_type == LevelIconType.PRE) { 
                this.icon.width = 36;
                this.icon.height = 36;
                this.icon.source = "boss_xiao";
                
                this.level.text = (GameData.gameInGata.dynamicData.level-1).toString();
                this.level.bold = false;
            }
            else if(_type == LevelIconType.CURRENT) { 
                this.icon.width = 48;
                this.icon.height = 48;
                this.level.width = 48;
                this.icon.source = "boss_dangqian";
                
                this.level.text = GameData.gameInGata.dynamicData.level.toString();
                this.level.bold = true;
            }
            else if(_type == LevelIconType.NEXT)
            { 
                this.icon.width = 36;
                this.icon.height = 36;
                this.icon.source = "boss_xiao";
                
                this.level.text = (GameData.gameInGata.dynamicData.level+1).toString();
                this.level.bold = false;
            }
        }
        
        public levelUp():void{
            var level: any = this.level.text; 
            this.level.text = (level+1).toString();
        }        

        public icon: egret.gui.UIAsset;
        public level:egret.gui.Label;    

    }
}