

module game {

	export class enemyData extends enemyStaticData {    	
		
        /**
        * 怪物最大HP
        */
        public maxHp:number;
		
        private fa: enemyStaticData;
        public constructor(fa:enemyStaticData){
            super();
            this.fa = fa;
            this.id = fa.id;
            this.quality = fa.quality;
            this.name = fa.name;
            this.pic = fa.pic;
            this.hp = fa.hp;
            this.drop = fa.drop;
            this.scene = fa.scene;
            this.maxHp = this.hp;    
            this.boneAnimation = fa.boneAnimation;
        }
        
        public get totalDropMoney():number
        {
            return Math.ceil(this.drop*(1+GameData.gameInGata.moneyDropAddition));
        }         
		
		public clone():enemyData{
			var eData:enemyData = new enemyData(this.fa);
			
			return eData;
		}
		
        /**
        * 重置
        */
        public reset():void{
            this.hp = this.maxHp;
        }

	}
}