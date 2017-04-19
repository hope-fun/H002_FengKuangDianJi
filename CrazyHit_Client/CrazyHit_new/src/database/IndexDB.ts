/**
* Created by chenqp on 2015/8/13.
*/

module game {
	/**
	 * safari和手机浏览器支持不好，废弃。
	 * @author 
	 *
	 */
    export class IndexDB {
        public db:IDBDatabase;
        public dbName: string;
        public dbVersion: number;
        private enemyTable: string = "enemy";
        private heroTable: string = "hero";
        public constructor() {
        }
        
        /**
        * 创建数据库
        */
        public create(_dbName: string,_dbVersion: number): void {
            this.dbName = _dbName;           
            this.dbVersion = _dbVersion;                                    
            
            //先删除                
            var request = indexedDB.deleteDatabase(_dbName);
            var _this = this; 
            request.onsuccess = function(e) {              
                console.log("delete onsuccess");
                _this.realCreate();
            };
            request.onerror = function(e) {              
                console.log("delete onerror");
                _this.realCreate();
            };    
            /*
            var _this = this; 
            setTimeout(function(){
                _this.realCreate();
            },1000);
            */
        }
        
        public realCreate(): void
        { 
            var request = indexedDB.open(this.dbName,this.dbVersion);   
            var _this = this;            
            request.onupgradeneeded = function(e) {              
                console.log("onupgradeneeded");
                _this.db = request.result;    
                
                //初始化创建数据库
                if(!_this.db.objectStoreNames.contains(_this.enemyTable)) {
                    //初始化怪物表
                    var store = _this.db.createObjectStore(_this.enemyTable,{ keyPath: "id" });
                    store.createIndex('idIndex','id',{unique:true}); 
                    store.createIndex('sceneIndex','scene',{unique:false}); 
                }
                if(!_this.db.objectStoreNames.contains(_this.heroTable)) {
                    //初始化怪物表
                    var store = _this.db.createObjectStore(_this.heroTable,{ keyPath: "id" });
                    store.createIndex('idIndex','id',{unique:true}); 
                }
                /*
                localStorage.setItem("dbVersion",_this.dbVersion.toString());
                */
                //添加怪物数据
                _this.addEnemyData();                
                console.log('DB version changed to '+_this.dbVersion.toString());
            };
            request.onblocked = function(e) {      
                console.log("onblocked");
                alert("创建数据库失败，请退出后重试");
            };
            request.onerror = function(e) {              
                console.log("onerror");
                alert("创建数据库失败，请退出后重试");
            };          
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
            console.log( this.enemyLoader.data ); 
            if(this.db) {
                
                var transaction = this.db.transaction(this.enemyTable,'readwrite');       
                /*
                var _this = this;
                transaction.oncomplete = function(e) {              
                    console.log("transaction oncomplete");
                    //从服务器获取的怪物静态数据
                    var enemies: enemyStaticData[] = JSON.parse(_this.enemyLoader.data);
                    console.log("enemies.length:"+enemies.length.toString());
                                        
                    var store = transaction.objectStore(_this.enemyTable); 
                    for(var i = 0;i < enemies.length;i++) {
                        //console.log("enemy id:"+enemies[i].id.toString());
                        store.put(enemies[i]);
                    }
                }; 
                */
                ///*
                //从服务器获取的怪物静态数据
                var enemies: enemyStaticData[] = JSON.parse(this.enemyLoader.data);
                console.log("enemies.length:"+enemies.length.toString());
                    
                //var store = this.db.transaction(this.enemyTable,'readwrite').objectStore(this.enemyTable); 
                var store = transaction.objectStore(this.enemyTable); 
                for(var i = 0;i < enemies.length;i++) {
                    console.log("enemy id:"+enemies[i].id.toString());
                    store.put(enemies[i]);
                }

                var _this = this;
                transaction.oncomplete = function(e) {              
                    console.log("transaction oncomplete");
                    //怪物静态数据添加完毕
                    //添加小伙伴数据
                    _this.addHeroData();
                }; 
                //*/
            }  
            
            //添加小伙伴数据
            //this.addHeroData();
        }   
        
        private onLoadHeroComplete(event:egret.Event):void
        {
            //console.log( this.heroLoader.data );  
            if(this.db) {
                
                var transaction = this.db.transaction(this.heroTable,'readwrite');
                var store = transaction.objectStore(this.heroTable);   
                //var store = this.db.transaction(this.heroTable,'readwrite').objectStore(this.heroTable);   
                                
                //从服务器获取的小伙伴静态数据
                var heros: heroStaticData[] = JSON.parse(this.heroLoader.data);
                console.log("heros.length:"+heros.length.toString());
                /*
                var heros: heroStaticData[] = new Array(20);
                for(var i = 0;i < heros.length;i++) {
                    var hero: heroStaticData = new heroStaticData();
                    hero.id = i + 1;
                    hero.quality = i + 1;
                    hero.name = "hero" + hero.id.toString();
                    hero.pic = "hero" + (hero.id % 10).toString();
                    hero.baseDps = 100 * Math.pow(2,i);
                    hero.needMoney = hero.baseDps * 4;
                    hero.lvUpAddDps = hero.baseDps / 4;
                    hero.lvUpNeedMoney = hero.baseDps;
                    heros[i] = hero;
                }   
                */
                
                for(var i = 0;i < heros.length;i++) {
                    console.log("hero id:"+heros[i].id);
                    store.put(heros[i]);
                }
                
                var _this = this;
                transaction.oncomplete = function(e) {              
                    console.log("transaction oncomplete");
                    localStorage.setItem("dbVersion",_this.dbVersion.toString());
                    //怪物小伙伴数据添加完毕
                    //数据创建完毕，关闭数据库
                    _this.close();
                    //重新打开数据库并读取数据
                    _this.open(_this.dbName,_this.dbVersion);
                }; 
            }    
            
            //数据创建完毕，关闭数据库
            //this.close();
            //重新打开数据库并读取数据
            //this.open(this.dbName,this.dbVersion);
        } 
        
        /**
        * 添加怪物数据
        */
        public addEnemyData():void{
            /*
            if(!this.db.objectStoreNames.contains(this.enemyTable)) {
                //初始化怪物表
                var store = this.db.createObjectStore(this.enemyTable,{ keyPath: "id" });
                store.createIndex('idIndex','id',{unique:true}); 
                store.createIndex('sceneIndex','scene',{unique:false}); 
            }
            */
            
            this.enemyLoader = new egret.URLLoader();
            var urlreq:egret.URLRequest = new egret.URLRequest();
            urlreq.url = "resource/assets/datas/enemies.json";
            this.enemyLoader.load( urlreq );
            this.enemyLoader.addEventListener(egret.Event.COMPLETE, this.onLoadEnemyComplete, this);   
            /*
            if(this.db) {
                
                var transaction = this.db.transaction(this.enemyTable,'readwrite');
                var store = transaction.objectStore(this.enemyTable);   

                //从服务器获取的怪物静态数据
                var enemies: enemyStaticData[] = new Array(1000);
                for(var i = 0;i < enemies.length;i++) {
                    var enemy: enemyStaticData = new enemyStaticData();
                    enemy.id = i + 1;
                    enemy.quality = i + 1;
                    enemy.name = "enemy" + enemy.id.toString();
                    if(enemy.id % 10 == 0) { 
                        enemy.pic = "enemy10";
                    }
                    else {
                        enemy.pic = "enemy" + (enemy.id % 10).toString();
                    }
                    enemy.scene = Math.ceil(enemy.id / 10);
                    enemy.hp = Math.ceil(100 * (Math.pow(enemy.scene,3) * (1+(enemy.id % 10)/3)));
                    enemy.drop = Math.ceil(enemy.hp / 4);
                    enemies[i] = enemy;
                }                
                
                for(var i = 0;i < enemies.length;i++) {
                    store.put(enemies[i]);
                }
            }
            */
        }
        
        /**
        * 添加小伙伴数据
        */
        public addHeroData():void{
            /*
            if(!this.db.objectStoreNames.contains(this.heroTable)) {
                //初始化怪物表
                var store = this.db.createObjectStore(this.heroTable,{ keyPath: "id" });
                store.createIndex('idIndex','id',{unique:true}); 
            }
            */
            
            this.heroLoader = new egret.URLLoader();
            var urlreq:egret.URLRequest = new egret.URLRequest();
            urlreq.url = "resource/assets/datas/heros.json";
            this.heroLoader.load( urlreq );
            this.heroLoader.addEventListener(egret.Event.COMPLETE, this.onLoadHeroComplete, this); 
            /*
            if(this.db) {
                
                var transaction = this.db.transaction(this.heroTable,'readwrite');
                var store = transaction.objectStore(this.heroTable);   
                
                //从服务器获取的小伙伴静态数据
                var heros: heroStaticData[] = new Array(20);
                for(var i = 0;i < heros.length;i++) {
                    var hero: heroStaticData = new heroStaticData();
                    hero.id = i + 1;
                    hero.quality = i + 1;
                    hero.name = "hero" + hero.id.toString();
                    hero.pic = "hero" + (hero.id % 10).toString();
                    hero.baseDps = 100 * Math.pow(2,i);
                    hero.needMoney = hero.baseDps * 4;
                    hero.lvUpAddDps = hero.baseDps / 4;
                    hero.lvUpNeedMoney = hero.baseDps;
                    heros[i] = hero;
                }                
                
                for(var i = 0;i < heros.length;i++) {
                    store.put(heros[i]);
                }
            }
            */
        }
        
        /**
        * 打开既存数据库
        */
        public open(_dbName: string,_dbVersion: number): void {
            this.dbName = _dbName;           
            this.dbVersion = _dbVersion;
            var request = indexedDB.open(_dbName,_dbVersion);   
            var _this = this;
            request.onsuccess = function(e) {
                console.log("onsuccess");
                _this.db = request.result;      
                //获取所有数据
                _this.getAllData();
                //_this.addEnemyData();                
            };

            request.onupgradeneeded = function(e) {              
                console.log("onupgradeneeded");
                _this.db = request.result;    
                _this.db.close();

                console.log('DB version changed to '+_dbVersion.toString());
                alert("数据库版本不对，请退出后重试");
            };
            request.onblocked = function(e) {              
                console.log("onblocked");
                alert("打开数据库失败，请退出后重试");
            };
            request.onerror = function(e) {              
                console.log("onerror");
                alert("打开数据库失败，请退出后重试");
            };            
        }
        
        private enemyDataReady: boolean = false;
        private heroDataReady: boolean = false;
        private loadGame(): void
        { 
            if(!this.enemyDataReady)
            { 
                return;
            }
            if(!this.heroDataReady)
            { 
                return;
            }
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
                                    
            if(this.db) {
                
                var transaction = this.db.transaction(this.enemyTable,'readwrite');
                var store = transaction.objectStore(this.enemyTable);
                //var boundKeyRange = IDBKeyRange.only(scene);
                //var request = store.index("sceneIndex").openCursor(boundKeyRange);
                var request = store.openCursor();
                //var enemies: enemyData[] = new Array(10);
                //var i = 0;
                var _this = this;
                request.onsuccess = function(e) {
                    var cursor = request.result;
                    if(cursor) {
                        //console.log(cursor.key);
                        var enemy: enemyData = new enemyData(cursor.value);
                        _this.enemies.push(enemy);
                        //_this.enemies.push(cursor.value);
                        //var enemy: enemyStaticData = cursor.value;
                        //console.log(enemies[i].name);
                        cursor.continue();
                    }
                    else
                    { 
                        _this.enemyDataReady = true;
                        _this.loadGame();
                    }
                };
            }
        }   
        
        private heros: heroStaticData[] = Array(0);
        /**
        * 获得所有小伙伴数据
        */
        public getAllHeroData():void{
                                                
            if(this.db) {
                
                var transaction = this.db.transaction(this.heroTable,'readwrite');
                var store = transaction.objectStore(this.heroTable);
                //var boundKeyRange = IDBKeyRange.only(scene);
                //var request = store.index("sceneIndex").openCursor(boundKeyRange);
                var request = store.openCursor();
                //var enemies: enemyData[] = new Array(10);
                //var i = 0;
                var _this = this;
                request.onsuccess = function(e) {
                    var cursor = request.result;
                    if(cursor) {
                        //console.log(cursor.key);
                                                
                        _this.heros.push(cursor.value);
                        //var enemy: enemyStaticData = cursor.value;
                        //console.log(enemies[i].name);
                        cursor.continue();
                    }
                    else
                    { 
                        _this.heroDataReady = true;
                        _this.loadGame();
                    }
                };
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
        
        public close(): void
        { 
            if(this.db)
            { 
                this.db.close();
            }
        }
        
        public delete(): void
        { 
            if(this.dbName) {
                indexedDB.deleteDatabase(this.dbName);
            }
        }
    }
}
