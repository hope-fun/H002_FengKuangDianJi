/**
 * Created by chen_qp on 2015/8/4.
 */
module game {

    /**
     * 列表项目
     */
    export class ListItem extends egret.gui.SkinnableComponent {

        public constructor() {
            super();
            this.skinName = skin.PlayerItemSkin;
            //this.addEventListener(egret.gui.UIEvent.CREATION_COMPLETE , this.createCompleteEvent, this);
        }

        public createCompleteEvent(event:egret.gui.UIEvent):void{
            this.removeEventListener(egret.gui.UIEvent.CREATION_COMPLETE , this.createCompleteEvent, this);
            this.lvUpButton.addEventListener(egret.TouchEvent.TOUCH_TAP,this.lvUpButtonClick,this);
            //ApplicationFacade.getInstance().registerMediator( new GameMenuMediator(this) );
            
            this.UpdateInfo();
        }
        
        private nType: ListItemType;
        private itemData: any;
        private lvUpData: levelUpData;
        
        public setItemType(_nType: ListItemType,_itemData:any):void{
            this.nType = _nType;
            this.itemData = _itemData;
            if(ListItemType.PLAYER == this.nType)
            { 
                this.skinName = skin.PlayerItemSkin;
                var pData: playerData = this.itemData;
                this.lvUpData = pData.levelUpData;
            }
            else if(ListItemType.SKILL == this.nType)
            { 
                this.skinName = skin.SkillItemSkin;
            }
            else if(ListItemType.HERO == this.nType)
            { 
                this.skinName = skin.HeroItemSkin;
                var hData: heroData = this.itemData;
                this.lvUpData = hData.levelUpData;
            }
            this.addEventListener(egret.gui.UIEvent.CREATION_COMPLETE , this.createCompleteEvent, this);
        }
        
        public UpdateInfo(): void
        { 
            //todo:真实的加成
            var realAdd: number = this.lvUpData.addNum*(1+0.01);
            if(ListItemType.PLAYER == this.nType)
            { 
                var pData: playerData = this.itemData;
                this.itemIcon.source = pData.dynamicData.pic;
                this.itemName.text = pData.nickName;
                this.itemLevel.text = pData.dynamicData.level.toString();
                this.itemEffectDes.text = pData.totalDmg.toString();
                realAdd += pData.baseDmg*0.01;
            }
            else if(ListItemType.SKILL == this.nType)
            { 
                
            }
            else if(ListItemType.HERO == this.nType)
            { 
                var hData: heroData = this.itemData;
                this.itemIcon.source = hData.pic;
                this.itemName.text = hData.name;
                this.itemLevel.text = hData.dynamicData.level.toString();
                //this.itemEffectDes.text = hData.baseDps.toString();
                this.itemEffectDes.text = hData.totalDps.toString();
                realAdd += hData.baseDps*0.01;
                if(hData.dynamicData.level > 0)
                { 
                    this.lvUpButton.tipLabel.text = "等级提升";
                }
                else
                { 
                    this.lvUpButton.tipLabel.text = "招募";
                }                
            }
            
            realAdd = Math.ceil(realAdd);
                        
            if(this.lvUpData.needCount <= GameData.gameInGata.dynamicData.totalMoney)
            { 
                //钱够
                this.lvUpButton.bgImage.source = "button_5";
            }
            else
            { 
                //钱不够
                this.lvUpButton.bgImage.source = "button_3";
            }            
            this.lvUpButton.needMoney.text = this.lvUpData.needCount.toString();
            if(this.lvUpData.additionType == AdditionType.BASEDMG) {
                //this.lvUpButton.effectDes.text = "+" + this.lvUpData.addNum.toString() + "DMG";
                this.lvUpButton.effectDes.text = "+" + realAdd.toString() + "DMG";
            }
            else if(this.lvUpData.additionType == AdditionType.BASEDPS) {
                //this.lvUpButton.effectDes.text = "+" + this.lvUpData.addNum.toString() + "DPS";
                this.lvUpButton.effectDes.text = "+" + realAdd.toString() + "DPS";
            }          
        }        
        
        private saveHeroDynamicData(): void
        { 
            var heros: heroDynamicData[] = new Array(GameData.gameOutData.herosData.length);
            for(var i = 0;i < GameData.gameOutData.herosData.length;i++)
            { 
                heros[i] = GameData.gameOutData.herosData[i].dynamicData;
            }  
            if(heros[heros.length - 1].level == 0)
            { 
                heros.pop();
            }
            localStorage.setItem("heroDynamicData",JSON.stringify(heros));
        }
        
        private itemLevelUp(): void
        { 
            if(ListItemType.PLAYER == this.nType)
            { 
                var pData: playerData = this.itemData;
                pData.dynamicData.level += this.lvUpData.upCount;
                pData.dmgAddition = pData.dynamicData.level/100;
                localStorage.setItem("playerDynamicData",JSON.stringify(pData.dynamicData));
                pData.baseDmg += this.lvUpData.addNum;

                //this.lvUpData.needCount = Math.pow(pData.dynamicData.level+1,2);
                //this.lvUpData.addNum = Math.ceil(Math.pow(pData.dynamicData.level+1,2)/2);
                this.lvUpData.needCount = Math.ceil(10*Math.pow(1.074,pData.dynamicData.level+1));
                this.lvUpData.addNum = Math.ceil(5*Math.pow(1.053,pData.dynamicData.level+1));
                
                GameData.updateGameInData();
            }
            else if(ListItemType.SKILL == this.nType)
            { 
                                
            }
            else if(ListItemType.HERO == this.nType)
            { 
                var hData: heroData = this.itemData;
                hData.dynamicData.level += this.lvUpData.upCount;
                hData.dpsAddition = hData.dynamicData.level/100;
                this.saveHeroDynamicData();
                hData.baseDps += this.lvUpData.addNum;
                
                //this.lvUpData.needCount = Math.pow(hData.dynamicData.level+1,2)*hData.quality;
                //this.lvUpData.addNum = Math.ceil(Math.pow(hData.dynamicData.level+1,2)*hData.quality/2);
                this.lvUpData.needCount = Math.ceil(hData.lvUpNeedMoney*Math.pow(1.075,hData.dynamicData.level+1));
                this.lvUpData.addNum = Math.ceil(hData.lvUpAddDps*Math.pow(1.045,hData.dynamicData.level+1));
                    
                GameData.updateGameInData();
            }
            this.UpdateInfo();
        }
        
        private lvUpButtonClick(event:egret.TouchEvent):void
        { 
            if(this.lvUpData.moneyType == MoneyType.MONEY && this.lvUpData.needCount <= GameData.gameInGata.dynamicData.totalMoney)
            { 
                GameData.gameInGata.dynamicData.totalMoney -= this.lvUpData.needCount;
                localStorage.setItem("gameInDynamicData",JSON.stringify(GameData.gameInGata.dynamicData));    
                this.itemLevelUp();
                if(ListItemType.HERO == this.nType && (<heroData>this.itemData).dynamicData.level == 1) { 
                    //招募
                    ApplicationFacade.getInstance().sendNotification(SceneCommand.LEVEL_UP,this.nType,"zhaomu");
                }
                else {
                    ApplicationFacade.getInstance().sendNotification(SceneCommand.LEVEL_UP,this.nType);
                }                
            }
            if(this.lvUpData.moneyType == MoneyType.ITEM && this.lvUpData.needCount <= GameData.gameInGata.dynamicData.totalItem)
            { 
                GameData.gameInGata.dynamicData.totalItem -= this.lvUpData.needCount;
                localStorage.setItem("gameInDynamicData",JSON.stringify(GameData.gameInGata.dynamicData));
                this.itemLevelUp();
                ApplicationFacade.getInstance().sendNotification(SceneCommand.LEVEL_UP,this.nType);
            }
            
        }

        public itemIcon: egret.gui.UIAsset;
        public itemName:egret.gui.Label;
        public itemLevel:egret.gui.Label;
        public itemEffectDes:egret.gui.Label;
        public lvUpButton:LvUpButton;        

    }
}