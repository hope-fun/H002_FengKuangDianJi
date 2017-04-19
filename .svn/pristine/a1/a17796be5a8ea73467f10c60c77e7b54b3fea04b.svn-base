/**
 * Created by chen_qp on 2015/8/4.
 */
module game {

    /**
     * 技能和三围子系统
     */
    export class SkillAndPropertyUI extends egret.gui.SkinnableComponent {

        public constructor() {
            super();
            this.skinName = skin.SkillAndPropertySkin;
            this.addEventListener(egret.gui.UIEvent.CREATION_COMPLETE , this.createCompleteEvent, this);
        }

        public createCompleteEvent(event:egret.gui.UIEvent):void{
            this.removeEventListener(egret.gui.UIEvent.CREATION_COMPLETE , this.createCompleteEvent, this);
            //ApplicationFacade.getInstance().registerMediator( new GameMenuMediator(this) );
            
            this.UpdateInfo();
        }
        
        public UpdateInfo(): void
        { 
            this.currentAtkLabel.text = GameData.gameInGata.currentAtk.toString();
            this.totalDmgLabel.text = GameData.gameInGata.totalDmg.toString();
            this.totalDpsLabel.text = GameData.gameInGata.totalDps.toString();
            this.skill1Button.setSkill("1");
            this.skill2Button.setSkill("2");
            this.skill3Button.setSkill("3");
            this.skill4Button.setSkill("4");
            this.skill5Button.setSkill("1");
            this.skill6Button.setSkill("2");
        }

        public quickKillButton:egret.gui.Button;
        public currentAtkLabel:egret.gui.Label;
        public totalDmgLabel:egret.gui.Label;
        public totalDpsLabel:egret.gui.Label;
        public skill1Button:SkillButton;
        public skill2Button:SkillButton;
        public skill3Button:SkillButton;
        public skill4Button:SkillButton;
        public skill5Button:SkillButton;
        public skill6Button:SkillButton;

    }
}