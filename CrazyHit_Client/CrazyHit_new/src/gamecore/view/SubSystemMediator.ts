/**
 * Created by chen_qp on 2015/8/4.
 */

module game {

    export class SubSystemMediator extends puremvc.Mediator implements puremvc.IMediator{
        public static NAME:string = "SubSystemMediator";

        public constructor(viewComponent:any){
            super(SubSystemMediator.NAME, viewComponent);
            this.subSystem.closeButton.addEventListener(egret.TouchEvent.TOUCH_TAP , this.closeButtonClick, this);
            //this.subSystem.closeButtonBg.addEventListener(egret.TouchEvent.TOUCH_TAP , this.closeButtonClick, this);
            
            //this.subSystem.playerItem.setItemType(ListItemType.PLAYER,GameData.gameOutData.playerData);
            var player: ListItem = new ListItem();
            player.setItemType(ListItemType.PLAYER,GameData.gameOutData.playerData);
            this.subSystem.skillGroup.addElement(player);            

            for(var i = 0; i < GameData.gameOutData.herosData.length;i++)
            { 
                var hero: ListItem = new ListItem();
                hero.id = "hero"+i.toString();
                hero.setItemType(ListItemType.HERO,GameData.gameOutData.herosData[i]);
                this.subSystem.heroGroup.addElement(hero);
            }
            this.subSystem.UpdateInfo();
            
            this.subSystem.skillsBtn.addEventListener(egret.TouchEvent.TOUCH_TAP , this.skillsBtnClick, this);
            this.subSystem.herosBtn.addEventListener(egret.TouchEvent.TOUCH_TAP , this.herosBtnClick, this);
            this.subSystem.equipsBtn.addEventListener(egret.TouchEvent.TOUCH_TAP , this.equipsBtnClick, this);
            this.subSystem.shopBtn.addEventListener(egret.TouchEvent.TOUCH_TAP , this.shopBtnClick, this);
        }

        private closeButtonClick(event:egret.TouchEvent):void
        {
            this.subSystem.setSubSystemType("none");
            this.subSystem.subSystemsTab.y = 0;
            this.subSystem.skillsBtn.unSelect();
            this.subSystem.herosBtn.unSelect();
            this.subSystem.equipsBtn.unSelect();
            this.subSystem.shopBtn.unSelect();            
        }
        
        private skillsBtnClick(event:egret.TouchEvent):void
        {
            //var howtoPlay:HowtoplayWindow = new HowtoplayWindow();
            //egret.gui.PopUpManager.addPopUp(howtoPlay,true);
            this.subSystem.setSubSystemType("skills");
            this.subSystem.subSystemsTab.y = -16;
            this.subSystem.skillsBtn.select();
            this.subSystem.herosBtn.unSelect();
            this.subSystem.equipsBtn.unSelect();
            this.subSystem.shopBtn.unSelect();
        }

        private herosBtnClick(event:egret.TouchEvent):void
        {
            //var about:AboutWindow = new AboutWindow();
            //egret.gui.PopUpManager.addPopUp(about,true);
            this.subSystem.setSubSystemType("heros");
            this.subSystem.subSystemsTab.y = -16;
            this.subSystem.skillsBtn.unSelect();
            this.subSystem.herosBtn.select();
            this.subSystem.equipsBtn.unSelect();
            this.subSystem.shopBtn.unSelect();            
        }

        private equipsBtnClick(event:egret.TouchEvent):void
        {
            //egret.gui.PopUpManager.removePopUp(this.settingWindow);
            this.subSystem.setSubSystemType("equips");
            this.subSystem.subSystemsTab.y = -16;
            this.subSystem.skillsBtn.unSelect();
            this.subSystem.herosBtn.unSelect();
            this.subSystem.equipsBtn.select();
            this.subSystem.shopBtn.unSelect();            
        }

        private shopBtnClick(event:egret.TouchEvent):void
        {
            //this.settingWindow.setWindowType("restart");
            this.subSystem.setSubSystemType("shop");
            this.subSystem.subSystemsTab.y = -16;
            this.subSystem.skillsBtn.unSelect();
            this.subSystem.herosBtn.unSelect();
            this.subSystem.equipsBtn.unSelect();
            this.subSystem.shopBtn.select();            
        }


        public listNotificationInterests():Array<any>{
            return [
            ];
        }

        public handleNotification(notification:puremvc.INotification):void{
            switch(notification.getName()){

            }
        }

        public get subSystem():SubSystemUI{
            return <SubSystemUI><any> (this.viewComponent);
        }
    }
}