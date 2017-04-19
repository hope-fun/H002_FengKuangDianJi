

module game {

	export class playerData {
    	
        /**
        * 玩家昵称
        */
        public nickName:string;
        
		/**
		 * 玩家动态信息
		 */
		public dynamicData:playerDynamicData;       
		
		/**
		 * 基础点击攻击力
		 */
		public baseDmg:number=0;
		
		/**
		 * 点击攻击力加成
		 */
		public dmgAddition:number;
		
		/**
		 * 等级提升数据
		 */
		public levelUpData:levelUpData;
		
		public constructor(){
            if(localStorage.getItem("playerDynamicData")) {
                this.dynamicData = JSON.parse(localStorage.getItem("playerDynamicData"));
            }
            else
            { 
                this.dynamicData = new playerDynamicData();
            }
            this.nickName = "cqp";
            //this.level = Math.ceil(Math.random()*20);
            //this.baseDmg = Math.pow(this.level,3);
            this.baseDmg = 5;
            for(var i = 1;i <= this.dynamicData.level;i++)
            { 
                //this.baseDmg += Math.pow(i,2)/2;
                this.baseDmg += Math.ceil(5*Math.pow(1.053,i));
            }
            //todo:加玩家技能和小伙伴技能了再启用
            this.dmgAddition = this.dynamicData.level/100;
                
            this.levelUpData = new levelUpData();
            this.levelUpData.upCount = 1;
            this.levelUpData.moneyType = MoneyType.MONEY;
            //this.levelUpData.needCount = Math.pow(this.dynamicData.level+1,2);
            this.levelUpData.needCount = Math.ceil(10*Math.pow(1.074,this.dynamicData.level+1));
            this.levelUpData.additionType = AdditionType.BASEDMG;
            //this.levelUpData.addNum = Math.ceil(Math.pow(this.dynamicData.level+1,2)/2);
            this.levelUpData.addNum = Math.ceil(5*Math.pow(1.053,this.dynamicData.level+1));
		}
		
        private _totalDmg:number;
        public get totalDmg():number
        {
            return Math.ceil(this.baseDmg*(1+this.dmgAddition));
        }   		
		
		public clone():playerData{
			var pData:playerData = new playerData();
			
			return pData;
		}

	}
}