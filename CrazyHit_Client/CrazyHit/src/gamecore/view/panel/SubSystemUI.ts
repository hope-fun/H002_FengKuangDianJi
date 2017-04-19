/**
 * Created by xzper on 2014/11/15.
 */
module game {

    /**
     * 游戏外围子系统
     */
    export class SubSystemUI extends egret.gui.SkinnableComponent {

        public constructor() {
            super();
            this.skinName = skin.SubSystemsSkin;
            this.addEventListener(egret.gui.UIEvent.CREATION_COMPLETE , this.createCompleteEvent, this);
        }

        public createCompleteEvent(event:egret.gui.UIEvent):void{
            this.removeEventListener(egret.gui.UIEvent.CREATION_COMPLETE , this.createCompleteEvent, this);
            this.UpdateInfo(true);
            ApplicationFacade.getInstance().registerMediator( new SubSystemMediator(this) );
        }
        
        private _type:string = "";
        /*
        public get type():string
        {
            return this._type;
        }    
        */
        
        /**
        * 设置外围系统显示类型
        * @param type
        */
        public setSubSystemType(type:string):void
        {
            this._type = type;
            this.invalidateSkinState();
        }
        
        public getCurrentSkinState():string
        {
            return this._type;
        }    
        
        private updateLvUpButtonState()
        { 
            var player: ListItem = <ListItem>this.skillGroup.getElementAt(0); 
            player.UpdateInfo();
            //this.playerItem.UpdateInfo();
            
            for(var i = 0; i < GameData.gameOutData.herosData.length;i++)
            { 
                var hero: ListItem = <ListItem>this.heroGroup.getElementAt(i);
                hero.UpdateInfo();
            }
        }
        
        private updateHeros(): void
        { 
            if(GameData.gameOutData.herosData.length > 0) {
                var lasthero: heroData = GameData.gameOutData.herosData[GameData.gameOutData.herosData.length - 1];
                //钱不够则去除最后一个
                //alert(GameData.gameOutData.herosData.length);
                //alert(lasthero.dynamicData.level);
                if(lasthero.dynamicData.level == 0 && lasthero.needMoney > GameData.gameInGata.dynamicData.totalMoney) {
                    this.heroGroup.removeElementAt(GameData.gameOutData.herosData.length - 1);
                    GameData.gameOutData.herosData.pop();
                }
                //钱够则新加一个
                var newheroD: heroDynamicData = new heroDynamicData();
                newheroD.id = lasthero.id + 1;
                var newhero: heroData = new heroData(GameData.staticDatas.getHeroDataById(newheroD.id),newheroD);
                if(lasthero.dynamicData.level > 0 && newhero.needMoney <= GameData.gameInGata.dynamicData.totalMoney) {
                    GameData.gameOutData.herosData.push(newhero);
                    var hero: ListItem = new ListItem();
                    hero.id = newheroD.id.toString();
                    hero.setItemType(ListItemType.HERO,newhero);
                    this.heroGroup.addElement(hero);
                }
            }
            else
            { 
                //钱够则新加一个
                var newheroD: heroDynamicData = new heroDynamicData();
                newheroD.id = 1;
                var newhero: heroData = new heroData(GameData.staticDatas.getHeroDataById(newheroD.id),newheroD);
                if(newhero.needMoney <= GameData.gameInGata.dynamicData.totalMoney) {
                    GameData.gameOutData.herosData.push(newhero);
                    var hero: ListItem = new ListItem();
                    hero.id = newheroD.id.toString();
                    hero.setItemType(ListItemType.HERO,newhero);
                    this.heroGroup.addElement(hero);
                }            
            }
        }
        
        public UpdateInfo(isInit:boolean = false): void
        { 
            this.totalDmg.text = GameData.gameInGata.totalDmg.toString();
            this.totalDps.text = GameData.gameInGata.totalDps.toString();
            //this.totalAtk.text = GameData.gameInGata.totalAtk.toString();
            this.totalMoney.text = GameData.gameInGata.dynamicData.totalMoney.toString();
            this.totalItem.text = GameData.gameInGata.dynamicData.totalItem.toString();
            this.totalDiamond.text = GameData.gameInGata.dynamicData.totalDiamond.toString();   
            this.skillsBtn.setTabType(1);
            this.herosBtn.setTabType(2);
            this.equipsBtn.setTabType(3);
            this.shopBtn.setTabType(4);
            /*
            this.skillsBtn.setTab("玩  家");
            this.herosBtn.setTab("小 伙 伴");
            this.equipsBtn.setTab("神  兵");
            this.shopBtn.setTab("商  城");
            */
            
            if(!isInit) {
                this.updateLvUpButtonState();
                this.updateHeros();
            }
        }        

        public skillAndPropertyUI: SkillAndPropertyUI;
        public closeButton: egret.gui.UIAsset;
        public closeButtonBg: egret.gui.UIAsset;
        public totalDmg: egret.gui.Label;
        public totalDps: egret.gui.Label;
        public totalAtk: egret.gui.Label;
        public totalMoney: egret.gui.Label;
        public totalItem: egret.gui.Label;
        public totalDiamond: egret.gui.Label;        
        public playerItem: ListItem;
        public skillGroup: egret.gui.Group;
        public skillItems: ListItem[];
        public heroGroup: egret.gui.Group;
        public heroItems: ListItem[];
        public subSystemsTab: egret.gui.Group;
        public skillsBtn:TabButton;
        public herosBtn:TabButton;
        public equipsBtn:TabButton;
        public shopBtn:TabButton;

    }
}