

module game {

	export class levelUpData {
    	
        /**
        * 提升等级数(1,10,100)
        */
        public upCount:number = 1;
        
		/**
		 * 所需货币类型
		 */
		public moneyType:MoneyType;
		
		/**
		 * 所需货币数量
		 */
		public needCount:number;
		
		/**
		 * 增加属性类型
		 */
		public additionType:AdditionType;
		
        /**
        * 加成数值
        */
        public addNum:number;
		
		public constructor(){
		}
		
		public clone():levelUpData{
			var luData:levelUpData = new levelUpData();
			
			return luData;
		}

	}
}