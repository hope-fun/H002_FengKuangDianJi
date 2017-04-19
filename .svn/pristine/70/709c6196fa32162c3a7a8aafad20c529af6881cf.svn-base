/**
 * Created by xzper on 2014/11/15.
 */


module game {

    export class GameScreenMediator extends puremvc.Mediator implements puremvc.IMediator{
        public static NAME:string = "GameScreenMediator";
        
        //自动战斗用定时器
        private autoBattleTimer: egret.Timer;
        private autoBattleTimerFunc()
        {
            this.autoHitEnemy();
            //console.log("计时");
        }
        private autoBattleTimerComFunc()
        { 
            //console.log("计时结束");
        }
        
        //计算当前每秒总攻击力用定时器
        private calAtkTimer: egret.Timer;
        private calAtkTimerFunc()
        {
            GameData.gameInGata.currentAtk = GameData.gameInGata.totalDps;
            //console.log("计算计时");
        }
        private calAtkTimerComFunc()
        { 
            //console.log("计算计时结束");
        }

        private hitParticle:particle.GravityParticleSystem;
        private dieParticle:particle.GravityParticleSystem;
        private dropParticle:particle.GravityParticleSystem;
        private mcf: egret.MovieClipDataFactory;
        private mc: egret.MovieClip;
        
        private hitSound: egret.Sound;
        
        public constructor(viewComponent:any){
            super(GameScreenMediator.NAME, viewComponent);

            //为PC和移动端设置不同的移动策略
            if(egret.MainContext.deviceType != egret.MainContext.DEVICE_MOBILE)
            {
                var self = this;
                document.addEventListener("keyup",function(event:KeyboardEvent){
                    //Space
                    setTimeout(function() {
                        if(32 == event.keyCode)
                        { 
                            self.hitEnemy();
                        }
                    },60);
                });
            }
            else
            {
                //this.gamescreen.addEventListener(egret.TouchEvent.TOUCH_BEGIN , this.mouseDownHandle , this)
                //this.gamescreen.addEventListener(egret.TouchEvent.TOUCH_TAP , this.touchTapHandle , this)
                this.gamescreen.mainBg.addEventListener(egret.TouchEvent.TOUCH_TAP,this.touchTapHandle,this);
                this.gamescreen.gameScene.addEventListener(egret.TouchEvent.TOUCH_TAP,this.touchTapHandle,this);
            }

            var _this = this;
            setTimeout(function(){
                //创建一个计时器对象(无限循环)
                _this.autoBattleTimer = new egret.Timer(1000/(1+GameData.gameInGata.speedAddition));
                //注册事件侦听器
                _this.autoBattleTimer.addEventListener(egret.TimerEvent.TIMER,_this.autoBattleTimerFunc,_this);
                _this.autoBattleTimer.addEventListener(egret.TimerEvent.TIMER_COMPLETE,_this.autoBattleTimerComFunc,_this);
                //开始计时
                _this.autoBattleTimer.start();
            },300);
            
            //创建一个计时器对象(无限循环)
            this.calAtkTimer = new egret.Timer(1000);
            //注册事件侦听器
            this.calAtkTimer.addEventListener(egret.TimerEvent.TIMER,this.calAtkTimerFunc,this);
            this.calAtkTimer.addEventListener(egret.TimerEvent.TIMER_COMPLETE,this.calAtkTimerComFunc,this);
            //开始计时
            this.calAtkTimer.start();
            
            //特效
            var texture = RES.getRes("TouchScreen_png");
            var config = RES.getRes("TouchScreen_json");
            this.hitParticle = new particle.GravityParticleSystem(texture, config);
            this.hitParticle.x = this.gamescreen.gameScene.enemy.x;
            this.hitParticle.y = this.gamescreen.gameScene.enemy.y;
            
            var texture1 = RES.getRes("DieSmoke_png");
            var config1 = RES.getRes("DieSmoke_json");
            this.dieParticle = new particle.GravityParticleSystem(texture1, config1);
            this.dieParticle.x = this.gamescreen.gameScene.enemy.x;
            this.dieParticle.y = this.gamescreen.gameScene.enemy.y;   
            
            var texture2 = RES.getRes("GoldDrop_png");
            var config2 = RES.getRes("GoldDrop_json");
            this.dropParticle = new particle.GravityParticleSystem(texture2, config2);
            this.dropParticle.x = this.gamescreen.gameScene.enemy.x;
            this.dropParticle.y = this.gamescreen.gameScene.enemy.y-150;
              
            //声音
            this.hitSound = RES.getRes("m404");
            /*
            //序列帧动画            
            //var texture1 = RES.getRes("sprite1_up_png");
            //var config1 = RES.getRes("sprite1_up_json");
            this.mcf = new egret.MovieClipDataFactory(config1,texture1); 

            */            
        }
        
        private touchTapHandle(event:egret.TouchEvent):void
        {
            this.hitParticle.x = event.localX;
            this.hitParticle.y = event.localY;
            this.hitEnemy();
        }
        
        /**
        * 自动打击怪物
        */
        private autoHitEnemy(): void
        {    
            if(GameData.gameInGata.totalDps <= 0)
            { 
                return;
            }
            if(GameData.gameInGata.curEnemy.hp <= 0)
            { 
                return;
            }
            //扣血
            this.gamescreen.gameScene.enemy.minusHp(GameData.gameInGata.totalDps);
            //怪物死亡
            if(GameData.gameInGata.curEnemy.hp <= 0)
            { 
                //播放怪物死亡动画
                var _this = this;
                //console.log("dieParticleRunning:"+this.dieParticleRunning);
                if(!this.dieParticleRunning) {
                    this.startParticle(ParticleType.DIE);
                    setTimeout(function() {
                        _this.stopParticle(ParticleType.DIE);
                    },250);
                }
                setTimeout(function(){
                    /*
                    //播放掉落特效
                    //console.log("dropParticleRunning:"+_this.dropParticleRunning);
                    if(!_this.dropParticleRunning) {
                        _this.startParticle(ParticleType.GoldDrop);
                        setTimeout(function() {
                            _this.stopParticle(ParticleType.GoldDrop);
                        },300);
                    }
                    */
                    //金币掉落
                    var dropcount = Math.ceil(Math.random() * 6)+2;
                    for(var i = 0;i < dropcount;i++) {
                        var drop: DropGold = new DropGold("jinbi_xiao",_this.gamescreen.gameScene.enemy.x,_this.gamescreen.gameScene.enemy.y - 150);
                        drop.totalMoneyX = _this.gamescreen.gameSceneUI.totalMoneyIcon.localToGlobal().x+10;
                        drop.totalMoneyY = _this.gamescreen.gameSceneUI.totalMoneyIcon.localToGlobal().y+10;
                        drop.start();
                    }                      
                    _this.gamescreen.gameScene.enemy.death();
                    //刷新下一个怪物
                    _this.gamescreen.gameScene.loadNextEnemy();
                },300);
            }
            //更新相关信息
            this.gamescreen.gameSceneUI.UpdateInfo();
        }        
        
        private hitParticleRunning: boolean = false;
        private dieParticleRunning: boolean = false;
        private dropParticleRunning: boolean = false;
        private startParticle(_type:ParticleType):void
        {
            if(ParticleType.TouchScreen == _type && !this.hitParticleRunning) {
                this.hitParticleRunning = true;
                this.hitParticle.start();
                GameData.gameInGata.gameTopContainer.addChild(this.hitParticle);
            }
            else if(ParticleType.DIE == _type && !this.dieParticleRunning) {
                this.dieParticleRunning = true;
                this.dieParticle.start();
                GameData.gameInGata.gameTopContainer.addChild(this.dieParticle);
            }
            else if(ParticleType.GoldDrop == _type && !this.dropParticleRunning) {
                this.dropParticleRunning = true;
                this.dropParticle.start();
                GameData.gameInGata.gameTopContainer.addChild(this.dropParticle);
            }
        }
        
        private stopParticle(_type:ParticleType):void
        {
            if(ParticleType.TouchScreen == _type && this.hitParticleRunning) {
                this.hitParticleRunning = false;
                this.hitParticle.stop();
                GameData.gameInGata.gameTopContainer.removeChild(this.hitParticle);
            }
            else if(ParticleType.DIE == _type && this.dieParticleRunning) {
                this.dieParticleRunning = false;
                this.dieParticle.stop();
                GameData.gameInGata.gameTopContainer.removeChild(this.dieParticle);
            }
            else if(ParticleType.GoldDrop == _type && this.dropParticleRunning) {
                this.dropParticleRunning = false;
                this.dropParticle.stop();
                GameData.gameInGata.gameTopContainer.removeChild(this.dropParticle);
            }
        }
        
        private startMovie(movieName:string):void
        {
            var texture1 = RES.getRes(movieName+"_png");
            var config1 = RES.getRes(movieName+"_json");
            var mcf = new egret.MovieClipDataFactory(config1,texture1);         
            this.mc = new egret.MovieClip( mcf.generateMovieClipData( ) );
            this.mc.x = this.gamescreen.gameScene.enemy.x;
            this.mc.y = this.gamescreen.gameScene.enemy.y;
            this.mc.play();
            GameData.gameInGata.gameTopContainer.addChild(this.mc);
        }
                
        private stopMovie():void
        {
            this.mc.stop();
            GameData.gameInGata.gameTopContainer.removeChild(this.mc);
        }
        
        private addArmatureToFactory( factory:dragonBones.EgretFactory, name:string, directory:string ){
            //var skeletonData = RES.getRes( directory + "/skeleton.json" );
            var skeletonData = RES.getRes( directory + "/"+directory+".json" );
            var textureData = RES.getRes( directory + "/texture.json" );
            var texture = RES.getRes( directory + "/texture.png" );
            //factory.addSkeletonData(dragonBones.DataParser.parseDragonBonesData(skeletonData));
            factory.addDragonBonesData(dragonBones.DataParser.parseDragonBonesData(skeletonData));
            factory.addTextureAtlas(new dragonBones.EgretTextureAtlas(texture, textureData));
        }
        
        /**
        * 打击怪物
        */
        private hitEnemy(): void
        {  
            if(GameData.gameInGata.totalDmg <= 0)
            { 
                return;
            }
            if(GameData.gameInGata.curEnemy.hp <= 0)
            { 
                return;
            }            
            
            //播放打击特效
            if(!this.hitParticleRunning) {
                this.startParticle(ParticleType.TouchScreen);
                var _this = this;
                setTimeout(function() {
                    _this.stopParticle(ParticleType.TouchScreen);
                },300);
            }
            
            //播放声音
            //this.hitSound.play();
            /*
            var _this = this;
            setTimeout(function(){
                _this.hitSound.stop();
            },100);  
            */
            /*
            var sounds = ["m401","m402","m403","m404"];
            //var sound:egret.Sound = RES.getRes(sounds[Math.ceil(Math.random()*4)-1]);
            var sound:egret.Sound = RES.getRes(sounds[3]);
            sound.play();
            setTimeout(function(){
                sound.stop();
            },100);  
            */
            
            /*
            //播放序列帧动画
            var nameArray = ["sprite1_right","sprite1_down","sprite1_left","sprite1_up"];            
            //this.startMovie("sprite1_up");
            this.startMovie(nameArray[Math.ceil(Math.random()*4)-1]);
            var _this = this;
            setTimeout(function(){
                _this.stopMovie();
            },3000);    
            */
                
            //背景晃动
            this.gamescreen.mainBg.y = 0;
            this.gamescreen.mainBg.y += 30; 
            var toY = this.gamescreen.mainBg.y-60;
            egret.Tween.get(this.gamescreen.mainBg).to({y:toY} , 40)
                                                    .to({y:toY+30} , 20);

            //更新当前每秒总攻击力
            GameData.gameInGata.currentAtk += GameData.gameInGata.totalDmg;
            //扣血
            this.gamescreen.gameScene.enemy.minusHp(GameData.gameInGata.totalDmg);
            //怪物死亡
            if(GameData.gameInGata.curEnemy.hp <= 0)
            { 
                //播放怪物死亡动画
                var _this = this;
                if(!this.dieParticleRunning) {
                    this.startParticle(ParticleType.DIE);
                    setTimeout(function() {
                        _this.stopParticle(ParticleType.DIE);
                    },250);
                }
                setTimeout(function(){
                    /*
                    //播放掉落特效
                    if(!_this.dropParticleRunning) {
                        _this.startParticle(ParticleType.GoldDrop);
                        setTimeout(function() {
                            _this.stopParticle(ParticleType.GoldDrop);
                        },300);
                    }
                    */
                    //金币掉落
                    var dropcount = Math.ceil(Math.random() * 6)+2;
                    for(var i = 0;i < dropcount;i++) {
                        var drop: DropGold = new DropGold("jinbi_xiao",_this.gamescreen.gameScene.enemy.x,_this.gamescreen.gameScene.enemy.y - 150);
                        drop.totalMoneyX = _this.gamescreen.gameSceneUI.totalMoneyIcon.localToGlobal().x+10;
                        drop.totalMoneyY = _this.gamescreen.gameSceneUI.totalMoneyIcon.localToGlobal().y+10;
                        drop.start();
                    }                    
                    _this.gamescreen.gameScene.enemy.death();
                    //刷新下一个怪物
                    _this.gamescreen.gameScene.loadNextEnemy();
                },300);
            }
            //更新相关信息
            this.gamescreen.gameSceneUI.UpdateInfo();
            this.gamescreen.subSystemUI.skillAndPropertyUI.UpdateInfo();
        }

        public listNotificationInterests():Array<any>{
            return [];
        }

        public handleNotification(notification:puremvc.INotification):void{
            switch(notification.getName()){
            }
        }

        public get gamescreen():GameScreen{
            return <GameScreen><any> (this.viewComponent);
        }
    }
}