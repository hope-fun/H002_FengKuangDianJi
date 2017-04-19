/**
* Created by chenqp on 2015/9/17.
*/

module game {
	/**
	 *
	 * @author 
	 *
	 */
    export class StaticDatas {

        private enemyKey: string = "enemiesJsonArray";
        private heroKey: string = "herosJsonArray";
        public constructor() {
        }
        
        /**
        * 添加所有表数据
        */
        public addAllData(): void
        { 
            //添加怪物数据
            this.addEnemyData();
            //添加小伙伴数据
            this.addHeroData();
        }
                    
        private enemyLoader:egret.URLLoader;
        private heroLoader:egret.URLLoader;
        private onLoadEnemyComplete(event:egret.Event):void
        {
            //console.log( this.enemyLoader.data ); 
            try {
                localStorage.setItem(this.enemyKey,this.enemyLoader.data.toString());
            }
            catch(e)
            { 
                console.log( "您处于无痕浏览，无法为您保存" );
            }
            var enemiesS:enemyStaticData[] = JSON.parse(this.enemyLoader.data);
            for(var i= 0;i < enemiesS.length;i++)
            { 
                this.enemies.push(new enemyData(enemiesS[i]));
            }
            //this.enemies = JSON.parse(this.enemyLoader.data); 
            this.enemyDataReady = true;
            this.loadGame();            
        }   
        
        private onLoadHeroComplete(event:egret.Event):void
        {
            //console.log( this.heroLoader.data );  
            try {
                localStorage.setItem(this.heroKey,this.heroLoader.data.toString());
            }
            catch(e)
            { 
                console.log( "您处于无痕浏览，无法为您保存" );
            }
            this.heros = JSON.parse(this.heroLoader.data); 
            this.heroDataReady = true;
            this.loadGame();              
        } 
        
        private onLoadEnemyError(event:egret.IOErrorEvent):void {
            console.log("onLoadEnemyError");
            //alert("onLoadEnemyError");
        }
        
        private onLoadHeroError(event:egret.IOErrorEvent):void {
            console.log("onLoadHeroError");
            alert("onLoadHeroError");
        }
        
        /**
        * 添加怪物数据
        */
        public addEnemyData():void{            
            this.enemyLoader = new egret.URLLoader();
            var urlreq:egret.URLRequest = new egret.URLRequest();
            urlreq.url = "resource/assets/datas/enemies.json";
            this.enemyLoader.load( urlreq );
            this.enemyLoader.addEventListener(egret.Event.COMPLETE, this.onLoadEnemyComplete, this);   
            //添加加载失败侦听
            this.enemyLoader.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onLoadEnemyError, this);
        }
        
        /**
        * 添加小伙伴数据
        */
        public addHeroData():void{            
            this.heroLoader = new egret.URLLoader();
            var urlreq:egret.URLRequest = new egret.URLRequest();
            urlreq.url = "resource/assets/datas/heros.json";
            this.heroLoader.load( urlreq );
            this.heroLoader.addEventListener(egret.Event.COMPLETE, this.onLoadHeroComplete, this); 
            //添加加载失败侦听
            this.heroLoader.addEventListener(egret.IOErrorEvent.IO_ERROR, this.onLoadHeroError, this);            
        }        
        
        private enemyDataReady: boolean = false;
        private heroDataReady: boolean = false;
        private loadGame(): void
        { 
            if(!this.enemyDataReady)
            { 
                console.log("this.enemyDataReady:"+this.enemyDataReady);
                return;
            }
            if(!this.heroDataReady)
            { 
                console.log("this.heroDataReady:"+this.heroDataReady);
                return;
            }
            console.log("loadGame");
            game.ApplicationFacade.getInstance().sendNotification(game.SceneCommand.CHANGE,1);
        }
        /**
        * 获得所有表数据
        */
        public getAllData(): void
        { 
            //获得怪物数据
            this.getAllEnemyData();
            //获得小伙伴数据
            this.getAllHeroData();            
        }
        
        private enemies: enemyData[] = Array(0);
        /**
        * 获得所有怪物数据
        */
        public getAllEnemyData():void{
            var enemiesJson = localStorage.getItem(this.enemyKey);    
            if(enemiesJson) {
                var enemiesS:enemyStaticData[] = JSON.parse(enemiesJson);
                for(var i= 0;i < enemiesS.length;i++)
                { 
                    this.enemies.push(new enemyData(enemiesS[i]));
                }
                //this.enemies = JSON.parse(enemiesJson);
                this.enemyDataReady = true;
                this.loadGame();
            }
            else
            { 
                this.addEnemyData();
            }
        }   
        
        private heros: heroStaticData[] = Array(0);
        /**
        * 获得所有小伙伴数据
        */
        public getAllHeroData():void{
            var herosJson = localStorage.getItem(this.heroKey);   
            if(herosJson) {
                this.heros = JSON.parse(herosJson);
                this.heroDataReady = true;
                this.loadGame();                
            }
            else
            { 
                this.addHeroData();
            }
        }   
        
        /**
        * 根据id获得小伙伴数据
        */
        public getHeroDataById(_id:number):heroStaticData{
            var hero: heroStaticData;
            for(var i = 0;i < this.heros.length;i++)
            { 
                if(this.heros[i].id == _id)
                { 
                    hero = this.heros[i];
                }
            }
            return hero;
        }
                
        /**
        * 根据关卡获得普通怪物数据
        */
        public getNormalEnemyDataByScene(scene:number):enemyData[]{
            var enemies: enemyData[] = new Array(10);
            var j = 0;
            for(var i = 0;i < this.enemies.length;i++)
            { 
                if(this.enemies[i].scene == scene)
                { 
                    enemies[j] = this.enemies[i].clone();
                    //console.log(enemies[j].name);
                    j++;
                    if(j > 9)
                    { 
                        break;
                    }
                }
            }
            return enemies;
        }
        
        /**
        * 根据关卡获得挑战怪物数据
        */
        public getChallengeEnemyDataByScene(scene:number):enemyData[]{
            var enemies: enemyData[] = new Array(10);
            var j = 0;
            for(var i = 0;i < this.enemies.length;i++)
            { 
                if(this.enemies[i].scene == scene)
                { 
                    enemies[j] = this.enemies[i].clone();
                    enemies[j].maxHp = enemies[j].hp = enemies[j].hp * 4;
                    enemies[j].drop = enemies[j].drop * 4;
                    //console.log(enemies[j].name);
                    j++;
                    if(j > 9)
                    { 
                        break;
                    }
                }
            }
            return enemies;
        }
    }
}
