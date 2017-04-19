/**
* Created by chenqp on 2015/9/6.
*/

module game {

	export class GameInDynamicData {
    	
        /**
        * 当前游戏等级
        */
        public level:number = 1;  	
        
        /**
        * 挑战进度（1~10）
        */
        public challengeProgress:number = 1;          
    	        		
        /**
        * 金币总数
        */
        public totalMoney:number = 0;	
                
        /**
        * 钻石总数
        */
        public totalDiamond:number = 0;   
                
        /**
        * 装备点数
        */
        public totalItem:number = 0;  	
        
        /*
        public set level(value:number)
        {
            this._level = value;
            localStorage.setItem("gameInDynamicData",JSON.stringify(this));
        } 
        public get level():number
        {
            return this._level;
        }   
        
        public set challengeProgress(value:number)
        {
            this._challengeProgress = value;
            localStorage.setItem("gameInDynamicData",JSON.stringify(this));
        } 
        public get challengeProgress():number
        {
            return this._challengeProgress;
        }  
        
        public set totalMoney(value:number)
        {
            this._totalMoney = value;
            localStorage.setItem("gameInDynamicData",JSON.stringify(this));
        } 
        public get totalMoney():number
        {
            return this._totalMoney;
        }  
        
        public set totalDiamond(value:number)
        {
            this._totalDiamond = value;
            localStorage.setItem("gameInDynamicData",JSON.stringify(this));
        } 
        public get totalDiamond():number
        {
            return this._totalDiamond;
        }  
        
        public set totalItem(value:number)
        {
            this._totalItem = value;
            localStorage.setItem("gameInDynamicData",JSON.stringify(this));
        } 
        public get totalItem():number
        {
            return this._totalItem;
        }  
        */
        
        public constructor() {
        }

	}
}