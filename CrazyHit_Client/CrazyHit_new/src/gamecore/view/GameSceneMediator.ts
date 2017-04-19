
module game {
    /**
     * 游戏场景中介器
     */
	export class GameSceneMediator extends puremvc.Mediator implements puremvc.IMediator{
		public static NAME:string = "GameSceneMediator";
		
		public constructor(viewComponent:any){
			super(GameSceneMediator.NAME, viewComponent);
		}
		
		public listNotificationInterests():Array<any>{
			return [
			];
		}
		
		public handleNotification(notification:puremvc.INotification):void{
			var data:any = notification.getBody();
			switch(notification.getName()){
			}
		}

		public get gameScene():GameScene{
			return <GameScene><any> (this.viewComponent);
		}
	}
}