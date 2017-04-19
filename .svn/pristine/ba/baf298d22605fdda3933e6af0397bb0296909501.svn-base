/**
 * Created by xzper on 2014/11/15.
 */

module game {

    export class SceneCommand extends puremvc.SimpleCommand implements puremvc.ICommand{

        public constructor(){
            super();
        }
        public static NAME:string = "SceneCommand";

        /**
         * 切换场景
         */
        public static CHANGE:string = "scene_change";

        /**
         * 显示设置界面
         */
        public static SHOW_SETTING:string = "scene_setting";

        /**
         * 显示结束窗口
         */
        public static SHOW_END:string = "scene_end";
        
        /**
        * 创建游戏场景
        */
        public static CREATE_GAME:string = "create_game";           
        
        /**
        * 等级提升(玩家，小伙伴，装备)
        */
        public static LEVEL_UP:string = "level_up";    
        
        /**
        * 更新场景
        */
        public static UPDATE_SCENE:string = "update_scene";

        /**
         * 注册消息
         */
        public register():void{
            this.facade.registerCommand(SceneCommand.CHANGE , SceneCommand);
            this.facade.registerCommand(SceneCommand.SHOW_SETTING , SceneCommand);
            this.facade.registerCommand(SceneCommand.SHOW_END , SceneCommand);
            this.facade.registerCommand(SceneCommand.CREATE_GAME , SceneCommand);
            this.facade.registerCommand(SceneCommand.LEVEL_UP , SceneCommand);
            this.facade.registerCommand(SceneCommand.UPDATE_SCENE , SceneCommand);
        }

        public execute(notification:puremvc.INotification):void{
            var data:any = notification.getBody();
            var appMediator:ApplicationMediator =
                <ApplicationMediator><any>this.facade.retrieveMediator(ApplicationMediator.NAME);
            switch(notification.getName()){
                case SceneCommand.CHANGE:{
                    if(data == 1) {
                        //appMediator.main.enterStartScreen();
                        appMediator.main.enterNormalGameScene();
                    }
                    else {
                        //appMediator.main.enterGameScreen();
                        appMediator.main.enterChallengeGameScene();
                    }
                    break;
                }
                case SceneCommand.CREATE_GAME: {
                    var itemType: ListItemType = data;
                    appMediator.main.updateUIForLevelUp(data);
                    break;
                }
                case SceneCommand.LEVEL_UP: {
                    var itemType: ListItemType = data;
                    var type = notification.getType();
                    if(type == "zhaomu")
                    { 
                        //更新小伙伴骨骼动画
                        appMediator.main.gameScreen.updateHeroBoneAnimation();
                    }                    
                    appMediator.main.updateUIForLevelUp(data);
                    break;
                }
                case SceneCommand.UPDATE_SCENE: {
                    if(data == 1) {
                        appMediator.main.changeToNormalGameScene();
                    }
                    else {
                        appMediator.main.changeToChallengeGameScene();
                    }
                    break;
                }
            }
        }
    }
}