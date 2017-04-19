/**
 * Created by chen_qp on 2015/8/8.
 */

module game {

    export class GameSceneUI extends egret.gui.SkinnableComponent {

        public constructor() {
            super();
            this.skinName = skin.GameSceneSkin;
            this.addEventListener(egret.gui.UIEvent.CREATION_COMPLETE , this.createCompleteEvent, this);
        }
        
        private _type:string;
                
        /**
        * 设置游戏界面
        * @param type
        */
        public setGameUIType(type:string):void
        {
            this._type = type;
            this.invalidateSkinState();
        }
                
        public getCurrentSkinState():string
        {
            return this._type;
        }          

        public createCompleteEvent(event:egret.gui.UIEvent):void{
            this.removeEventListener(egret.gui.UIEvent.CREATION_COMPLETE , this.createCompleteEvent, this);
            //ApplicationFacade.getInstance().registerMediator( new GameScreenMediator(this) );
            this.initSet();
        }
        
        public initSet(): void
        { 
            //this.settingButton.addEventListener(egret.TouchEvent.TOUCH_TAP , this.settingButtonClick, this);
            this.challengeButton.addEventListener(egret.TouchEvent.TOUCH_TAP , this.challengeButtonClick, this);
            this.stopChallengeButton.addEventListener(egret.TouchEvent.TOUCH_TAP , this.stopChallengeButtonClick, this);
            this.UpdateInfo();
        }
        
        public setProgress(current:number, total:number):void {
            if(this.enemyHpPB)
            {
                this.enemyHpPB.maximum = total;
                this.enemyHpPB.value = current;
            }
        }          
        
        private urlloader:egret.URLLoader;
        private webSocket:egret.WebSocket;
        private settingButtonClick(event:egret.TouchEvent):void
        {
            //test network
            //test1
            /*
            this.urlloader = new egret.URLLoader();
            var urlreq:egret.URLRequest = new egret.URLRequest();
            urlreq.url = "http://httpbin.org/user-agent";
            this.urlloader.load( urlreq );
            this.urlloader.addEventListener(egret.Event.COMPLETE, this.onComplete, this);    
            */
            //test2
            /*
            this.urlloader = new egret.URLLoader();
            this.urlloader.dataFormat = egret.URLLoaderDataFormat.VARIABLES;
            var urlreq:egret.URLRequest = new egret.URLRequest();
            urlreq.url = "http://httpbin.org/headers";
            this.urlloader.load( urlreq );
            this.urlloader.addEventListener(egret.Event.COMPLETE, this.onComplete, this);
            */
            //test3
            /*
            var url:string = "http://httpbin.org/post";
            var loader:egret.URLLoader = new egret.URLLoader();
            loader.addEventListener(egret.Event.COMPLETE, this.onPostComplete, this);
            var request:egret.URLRequest = new egret.URLRequest(url);
            request.method = egret.URLRequestMethod.POST;
            request.data = new egret.URLVariables("test=ok");
            loader.load(request);
            */
            //test websocket
            this.webSocket = new egret.WebSocket();
            this.webSocket.addEventListener(egret.ProgressEvent.SOCKET_DATA, this.onReceiveMessage, this);
            this.webSocket.addEventListener(egret.Event.CONNECT, this.onSocketOpen, this);
            //this.webSocket.connect("echo.websocket.org", 80);
            this.webSocket.connect("10.20.20.5",4141);
            //ApplicationFacade.getInstance().sendNotification(SceneCommand.SHOW_SETTING,"setting");
        }
        
        private onComplete(event:egret.Event):void
        {
            //test1,2
            console.log( this.urlloader.data );            
        }
        
        private onPostComplete(event:egret.Event):void
        {
            var loader:egret.URLLoader = <egret.URLLoader> event.target;
            var data:egret.URLVariables = loader.data;
            console.log( data.toString() );
        }
        
        private onSocketOpen():void {
            var cmd = "Hello Egret WebSocket";
            console.log("连接成功，发送数据：" + cmd);
            this.webSocket.writeUTF(cmd);
        }
        private onReceiveMessage(e:egret.Event):void {
            var msg = this.webSocket.readUTF();
            console.log("收到数据：" + msg);
        }
        
        /**
        * 开始挑战
        */
        private challengeButtonClick(event:egret.TouchEvent):void
        {
            GameData.gameInGata.isInChallenge = true;
            GameData.gameInGata.dynamicData.challengeProgress--;
            localStorage.setItem("gameInDynamicData",JSON.stringify(GameData.gameInGata.dynamicData));
            this.setGameUIType("challenge");
            ApplicationFacade.getInstance().sendNotification(SceneCommand.UPDATE_SCENE,1);
        }
        
        /**
        * 停止挑战
        */
        private stopChallengeButtonClick(event:egret.TouchEvent):void
        {
            GameData.gameInGata.isInChallenge = false;
            GameData.gameInGata.normalProgress--;
            this.setGameUIType("normal");
            ApplicationFacade.getInstance().sendNotification(SceneCommand.UPDATE_SCENE,2);
        }
        
        public UpdateInfo(): void
        { 
            this.preLevel.setType(LevelIconType.PRE);
            this.currentLevel.setType(LevelIconType.CURRENT);
            this.nextLevel.setType(LevelIconType.NEXT);
            var curEnemy: enemyData = GameData.gameInGata.curEnemy;
            this.setProgress(curEnemy.hp,curEnemy.maxHp);
            this.enemyName.text = curEnemy.name;
            this.enemyHp.text = curEnemy.hp.toString();
            this.challengeProgress.text = GameData.gameInGata.dynamicData.challengeProgress.toString()+"/10";
            if(GameData.gameInGata.isInChallenge) {
                if(10 == GameData.gameInGata.dynamicData.challengeProgress) {
                    this.setGameUIType("challengeFinal");
                }
                else
                { 
                    this.setGameUIType("challenge");
                }
            }
            else
            { 
                this.setGameUIType("normal");
            }
            this.totalMoney.text = GameData.gameInGata.dynamicData.totalMoney.toString();     
        }         

        public settingButton:egret.gui.Button;
        public preLevel:LevelIcon;
        public currentLevel:LevelIcon;
        public nextLevel:LevelIcon;
        public enemyHpPB: egret.gui.ProgressBar;
        public enemyName: egret.gui.Label;
        public enemyHp: egret.gui.Label;
        public challengeProgress: egret.gui.Label;
        public challengeButton: egret.gui.Button;
        public stopChallengeButton: egret.gui.Button;
        public totalMoneyIcon: egret.gui.UIAsset;
        public totalMoney: egret.gui.Label;
        
    }
}