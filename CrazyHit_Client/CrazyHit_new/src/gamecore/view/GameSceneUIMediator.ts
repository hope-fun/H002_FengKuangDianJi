/**
 * Created by chen_qp on 2015/8/8.
 */

module game {

    export class GameSceneUIMediator extends puremvc.Mediator implements puremvc.IMediator{
        public static NAME:string = "GameSceneUIMediator";

        public constructor(viewComponent:any){
            super(SubSystemMediator.NAME, viewComponent);
            
        }      

        public listNotificationInterests():Array<any>{
            return [
            ];
        }

        public handleNotification(notification:puremvc.INotification):void{
            switch(notification.getName()){

            }
        }

        public get gameSceneUI():GameSceneUI{
            return <GameSceneUI><any> (this.viewComponent);
        }
    }
}