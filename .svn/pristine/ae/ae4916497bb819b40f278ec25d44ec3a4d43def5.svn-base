/**
 * Created by chen_qp on 2015/8/8.
 */
module game {

    /**
     * tab按钮
     */
    export class TabButton extends egret.gui.Button {

        public constructor() {
            super();
            this.skinName = skin.components.TabButtonSkin;
            this.addEventListener(egret.gui.UIEvent.CREATION_COMPLETE , this.createCompleteEvent, this);
        }

        public createCompleteEvent(event:egret.gui.UIEvent):void{
            this.removeEventListener(egret.gui.UIEvent.CREATION_COMPLETE , this.createCompleteEvent, this);
            //ApplicationFacade.getInstance().registerMediator( new GameMenuMediator(this) );
            
        }
        
        public setTab(_tabName:string):void{
            //this.icon.width = 36;
            //this.icon.height = 36;
            //this.icon.source = "skill_"+_id;
            
            this.tabname.text = _tabName;
        }    
        
        private tabType: number;
        public setTabType(_tabType:number):void{
            this.tabType = _tabType;
            this.tabBg.source = "tab_"+_tabType.toString();
            this.iconDisplay.source = "tabIcon_"+_tabType.toString();
        } 
        
        public select():void{
            this.selectedRect.fillAlpha = 1;
            
            /*
            this.tabBg.height = 70;
            this.tabBg.source = "button_2";
            */
        }    
        
        public unSelect():void{
            this.selectedRect.fillAlpha = 0;
            
            /*
            this.icon.height = 56;
            this.tabBg.source = "button_1";
            */
        }          

        public selectedRect: egret.gui.Rect;
        public tabBg: egret.gui.UIAsset;
        public tabname:egret.gui.Label;    

    }
}