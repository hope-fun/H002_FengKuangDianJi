/**
 * Created by chen_qp on 2015/8/8.
 */
module game {

    /**
     * 技能按钮
     */
    export class SkillButton extends egret.gui.SkinnableComponent {

        public constructor() {
            super();
            this.skinName = skin.components.SkillButtonSkin;
            this.addEventListener(egret.gui.UIEvent.CREATION_COMPLETE , this.createCompleteEvent, this);
        }

        public createCompleteEvent(event:egret.gui.UIEvent):void{
            this.removeEventListener(egret.gui.UIEvent.CREATION_COMPLETE , this.createCompleteEvent, this);
            //ApplicationFacade.getInstance().registerMediator( new GameMenuMediator(this) );
            
        }
        
        public setSkill(_id:string):void{
            //this.icon.width = 36;
            //this.icon.height = 36;
            this.icon.source = "skill_"+_id;
            
            this.skillname.text = "skill"+_id;
        }      

        public icon: egret.gui.UIAsset;
        public skillname:egret.gui.Label;    

    }
}