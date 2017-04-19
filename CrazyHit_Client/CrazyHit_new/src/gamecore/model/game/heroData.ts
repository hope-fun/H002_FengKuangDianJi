

module game {

	export class heroData extends heroStaticData {    	
        
        /**
        * 小伙伴动态信息
        */
        public dynamicData:heroDynamicData;    
		
		/**
		 * 基础每秒挂机攻击力
		 */
		public baseDps:number=0;
		
		/**
		 * 每秒挂机攻击力加成
		 */
		public dpsAddition:number;
		
		/**
		 * 等级提升数据
		 */
		public levelUpData:levelUpData;
		
        private fa: heroStaticData;
        public constructor(fa:heroStaticData,_dynamicData:heroDynamicData){
            super();
            this.dynamicData = _dynamicData;
            this.fa = fa;
            this.id = fa.id;
            this.quality = fa.quality;
            this.name = fa.name;
            this.pic = fa.pic;     
            this.boneAnimation = fa.boneAnimation;
            
            this.baseDps = fa.baseDps;
            if(this.dynamicData.level == 0)
            { 
                this.baseDps = 0;
            }
            this.lvUpAddDps = fa.lvUpAddDps;
            this.lvUpNeedMoney = fa.lvUpNeedMoney;            
            for(var i = 1;i <= this.dynamicData.level;i++)
            { 
                //this.baseDps += Math.pow(i,2)*this.quality/2;
                this.baseDps += Math.ceil(this.lvUpAddDps*Math.pow(1.045,i));
            }
            this.needMoney = fa.needMoney;
            //todo:加玩家技能和小伙伴技能了再启用
            this.dpsAddition = this.dynamicData.level/100;               
                        
            this.levelUpData = new levelUpData();
            this.levelUpData.upCount = 1;
            this.levelUpData.moneyType = MoneyType.MONEY;
            //this.levelUpData.needCount = Math.pow(this.dynamicData.level+1,2)*this.quality;
            this.levelUpData.needCount = Math.ceil(this.lvUpNeedMoney*Math.pow(1.075,this.dynamicData.level+1));
            this.levelUpData.additionType = AdditionType.BASEDPS;
            //this.levelUpData.addNum = Math.ceil(Math.pow(this.dynamicData.level+1,2)*this.quality/2); 
            this.levelUpData.addNum = Math.ceil(this.lvUpAddDps*Math.pow(1.045,this.dynamicData.level+1));
            if(this.dynamicData.level == 0)
            { 
                //招募所需以及增加攻击力
                this.levelUpData.needCount = this.needMoney;
                this.levelUpData.addNum = fa.baseDps;
            }
        }
		
        /*
        public constructor(id:string,_quality:number){
            
            this.id = id;
            this.quality = _quality;
            this.heroName = id+"英雄";
            this.level = Math.ceil(Math.random()*50);
            //this.baseDps = Math.pow(2,this.level);
            for(var i = 1;i <= this.level;i++)
            { 
                this.baseDps += Math.pow(i,2)/2;
            }
            this.baseDps *= this.quality;
            this.dpsAddition = this.level/100;   
            
            this.levelUpData = new levelUpData();
            this.levelUpData.upCount = 1;
            this.levelUpData.moneyType = MoneyType.MONEY;
            this.levelUpData.needCount = Math.pow(this.level+1,2)*this.quality;
            this.levelUpData.additionType = AdditionType.BASEDPS;
            this.levelUpData.addNum = Math.ceil(Math.pow(this.level+1,2)*this.quality/2);                    
        }
        */
        
        private _totalDps:number;
        public get totalDps():number
        {
            return Math.ceil(this.baseDps*(1+this.dpsAddition));
        }         
		
		public clone():heroData{
			//var pData:heroData = new heroData(this.id,this.quality);
            var pData:heroData = new heroData(this.fa,this.dynamicData);
			
			return pData;
		}

	}
}