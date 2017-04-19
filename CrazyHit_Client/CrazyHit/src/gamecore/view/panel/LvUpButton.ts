/**
 * Created by chen_qp on 2015/8/5.
 */
module game {

    /**
     * 等级提升按钮
     */
    export class LvUpButton extends egret.gui.SkinnableComponent {

        public constructor() {
            super();
            this.skinName = skin.components.LvUpButtonSkin;
            this.addEventListener(egret.gui.UIEvent.CREATION_COMPLETE , this.createCompleteEvent, this);
        }

        public createCompleteEvent(event:egret.gui.UIEvent):void{
            this.removeEventListener(egret.gui.UIEvent.CREATION_COMPLETE , this.createCompleteEvent, this);
            //ApplicationFacade.getInstance().registerMediator( new GameMenuMediator(this) );
        }

        public bgImage: egret.gui.UIAsset;
        public unitImage: egret.gui.UIAsset;
        public needMoney:egret.gui.Label;
        public tipLabel:egret.gui.Label;
        public effectDes:egret.gui.Label;      

    }
}