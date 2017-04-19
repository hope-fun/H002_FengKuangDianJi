/**
* Created by chenqp on 2015/8/15.
*/

module game {

	export class heroStaticData {
    	
        /**
        * id
        */
        public id:number;    	
        
        /**
        * 品质
        */
        public quality: number;        
    	
        /**
        * 名称
        */
        public name:string;
        
        /**
        * 图片
        */
        public pic:string;   
        
        /**
        * 基础每秒挂机攻击力
        */
        public baseDps:number;  
        
        /**
        * 所需金币
        */
        public needMoney:number;         
        
        /**
        * 每秒挂机攻击力成长
        */
        public lvUpAddDps:number;  
        
        /**
        * 成长所需金币
        */
        public lvUpNeedMoney:number; 	
        
        /**
        * 骨骼动画名
        */
        public boneAnimation:string;           
        
        public constructor() {
        }

	}
}