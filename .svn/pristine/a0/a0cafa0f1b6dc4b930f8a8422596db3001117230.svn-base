

module game {

	export class GameOutData{
        /**
         * 玩家数据
         */
        public playerData:playerData;

        /**
         * 技能数据
         */
        public static skillData:string;

        /**
         * 小伙伴数据
         */
        public herosData:heroData[];            
		
		public constructor(){
            /*
            this.playerData = new playerData();
            var herosDynamicData: heroDynamicData[];
            if(localStorage.getItem("heroDynamicData")) {
                herosDynamicData = JSON.parse(localStorage.getItem("heroDynamicData"));
            }
            else
            { 
                herosDynamicData = new Array(1);
                var heroD = new heroDynamicData();
                heroD.id = 1;
                herosDynamicData[0] = heroD;
            }

            this.herosData = new Array(herosDynamicData.length);
            for(var i = 0;i < herosDynamicData.length;i++)
            { 
                this.herosData[i] = new heroData(null,herosDynamicData[i]);
            }             
            */
            /*
            var heros: string[] = ["hero1","hero2","hero3","hero4","hero5"];
            var herosQa: number[] = [1,2,3,4,5];
            this.herosData = new Array(heros.length);
            for(var i = 0;i < heros.length;i++)
            { 
                //this.herosData.push(new heroData(heros[i],herosQa[i]));
                this.herosData[i] = new heroData(heros[i],herosQa[i]);
            }      
            */
		}
		
        /**
        * 加载游戏外数据
        */
        public loadData():void{
            this.playerData = new playerData();
            var herosDynamicData: heroDynamicData[];
            var heroD = new heroDynamicData();
            if(localStorage.getItem("heroDynamicData")) {
                herosDynamicData = JSON.parse(localStorage.getItem("heroDynamicData"));
                /*
                if(herosDynamicData[herosDynamicData.length - 1].level > 1) {
                    heroD.id = herosDynamicData[herosDynamicData.length - 1].id + 1;
                    herosDynamicData.push(heroD);
                }
                */
            }
            else
            { 
                herosDynamicData = new Array(1);                
                heroD.id = 1;
                herosDynamicData[0] = heroD;
            }
            
            this.herosData = new Array(herosDynamicData.length);
            for(var i = 0;i < herosDynamicData.length;i++)
            { 
                this.herosData[i] = new heroData(GameData.staticDatas.getHeroDataById(herosDynamicData[i].id),herosDynamicData[i]);
            }      
        }		
	}
}