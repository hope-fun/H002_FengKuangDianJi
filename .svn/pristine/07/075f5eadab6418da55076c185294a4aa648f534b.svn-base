
module game {

	export class AppContainer extends egret.gui.UIStage{

		public gameScreen:GameScreen = new GameScreen();

		public constructor(){
			super();            
		}
		
        /**
        * 进入普通游戏场景
        */
        public enterNormalGameScene():void{
            //alert(GameData.gameInGata);
            //初始化数据
            GameData.init();
            this.removeAllElements();
            this.addElement(this.gameScreen);
            if(!this.gameScreen.initialized)
            {
                //在第一次进入游戏页面时立即验证，保证Mediator的注册是及时的，
                //防止注册不及时导致无法接受消息的情况
                this.gameScreen.validateNow();
            }
        }		
        
        /**
        * 进入升级挑战游戏场景
        */
        public enterChallengeGameScene():void{
            //初始化数据
            GameData.init();
            this.removeAllElements();
            this.addElement(this.gameScreen);
            if(!this.gameScreen.initialized)
            {
                //在第一次进入游戏页面时立即验证，保证Mediator的注册是及时的，
                //防止注册不及时导致无法接受消息的情况
                this.gameScreen.validateNow();
            }
        }	        

        /**
         * 进入游戏页面
         */
        public enterGameScreen():void{
            //初始化数据
            GameData.init();
            this.removeAllElements();
            this.addElement(this.gameScreen);
            if(!this.gameScreen.initialized)
            {
                //在第一次进入游戏页面时立即验证，保证Mediator的注册是及时的，
                //防止注册不及时导致无法接受消息的情况
                this.gameScreen.validateNow();
            }
        }
        
        /**
        * 等级提升更新关联UI显示
        */
        public updateUIForLevelUp(_type:ListItemType):void
        {
            this.gameScreen.gameSceneUI.UpdateInfo();
            this.gameScreen.subSystemUI.UpdateInfo();
            this.gameScreen.subSystemUI.skillAndPropertyUI.UpdateInfo();
                   
            if(ListItemType.PLAYER == _type)
            { 
                                        
            }
            else if(ListItemType.SKILL == _type)
            { 
                                                                        
            }
            else if(ListItemType.HERO == _type)
            { 
                                        
            } 
        }  
        
        /**
        * 切换成普通游戏场景
        */
        public changeToNormalGameScene():void{
            //刷新怪物
            this.gameScreen.gameScene.loadNextEnemy();
            this.gameScreen.gameSceneUI.UpdateInfo();
        }		
                
        /**
        * 切换成升级挑战游戏场景
        */
        public changeToChallengeGameScene():void{
            //刷新怪物
            this.gameScreen.gameScene.loadNextEnemy();
            this.gameScreen.gameSceneUI.UpdateInfo();
        }	
	}
}