

module game {

	export class GameInData{

        /**
        * 游戏内动态数据
        */
        public dynamicData:GameInDynamicData;            

        /**
        * 初始挑战进度（1~10）
        */
        public initChallengeProgress:number = 1;        
        
        /**
        * 普通进度（1~10） 
        */
        public normalProgress:number = 1;        
		
		/**
		 * 是否在升级挑战
		 */
		public isInChallenge:boolean = false; 
        
        /**
        * 当前每秒总攻击力
        */
        public currentAtk:number = 1;    
        
        /**
        * 点击攻击力
        */
        public totalDmg:number = 1;    
        
        /**
        * 每秒挂机攻击力
        */
        public totalDps:number = 1;   
        
        /**
        * 金币掉落加成
        */
        public moneyDropAddition:number = 1;   
        
        /**
        * 速度加成
        */
        public speedAddition:number = 0;   
        
        /**
        * 普通怪物数据
        */
        public normalEnemisData:enemyData[]; 
        
        /**
        * 挑战事怪物数据
        */
        public challengeEnemisData:enemyData[];   
        
        /**
        * 当前怪物
        */
        public curEnemy:enemyData;  
        
        /**
        * 游戏场景
        */
        public gameTopContainer:egret.Sprite;        
		
		public constructor(){


		}
		
        /**
        * 加载游戏内数据
        */
        public loadData():void{

            if(localStorage.getItem("gameInDynamicData")) {
                this.dynamicData = JSON.parse(localStorage.getItem("gameInDynamicData"));
            }
            else
            { 
                this.dynamicData = new GameInDynamicData();
            }

            this.initChallengeProgress = this.dynamicData.challengeProgress;

            this.moneyDropAddition = Math.random() * 3;
            //this.speedAddition = Math.random() * 2;
                
            this.loadNormalEnemisData();
                        
            this.loadChallengeEnemisData();
                        
            if(this.isInChallenge) {
                this.curEnemy = this.challengeEnemisData[this.dynamicData.challengeProgress - this.initChallengeProgress];
            }
            else
            { 
                this.curEnemy = this.normalEnemisData[this.normalProgress-1];
            }
        }
		
        /**
        * 加载普通场景怪物数据
        */
        public loadNormalEnemisData():void{
            if(this.normalEnemisData)
            { 
                delete this.normalEnemisData;
            }
            this.normalEnemisData = GameData.staticDatas.getNormalEnemyDataByScene(this.dynamicData.level);
        }
        
        /**
        * 加载挑战场景怪物数据
        */
        public loadChallengeEnemisData():void{            
            if(this.challengeEnemisData)
            { 
                delete this.challengeEnemisData;
            }
            this.challengeEnemisData = GameData.staticDatas.getChallengeEnemyDataByScene(this.dynamicData.level);
        }
		
        /**
        * 获取下一个怪物
        */
        public getNextEnemy():enemyData{  
            var nextEnemy: enemyData;
            if(this.isInChallenge) {
                this.dynamicData.challengeProgress++;
                if(this.dynamicData.challengeProgress > 10)
                { 
                    this.dynamicData.challengeProgress = 1;
                    //等级提升
                    this.dynamicData.level++;   
                    this.normalProgress = 1;
                    this.loadNormalEnemisData();
                    //重新加载挑战场景怪物数据
                    this.loadChallengeEnemisData();
                }
                localStorage.setItem("gameInDynamicData",JSON.stringify(this.dynamicData));
                nextEnemy = this.challengeEnemisData[this.dynamicData.challengeProgress - this.initChallengeProgress];
            }
            else
            { 
                this.normalProgress++;
                if(this.normalProgress > 10)
                { 
                    //普通场景循环打怪
                    this.normalProgress = 1;
                }
                //重置一遍下次再用
                this.curEnemy.reset();
                nextEnemy = this.normalEnemisData[this.normalProgress-1];
            }
            return nextEnemy;
        }
	}
}