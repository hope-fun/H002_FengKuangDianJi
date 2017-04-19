/**
* Created by chenqp on 2015/8/14.
*/

module game {

	export class enemyStaticData {
    	
        /**
        * 怪物id
        */
        public id:number;    	
        
        /**
        * 品质
        */
        public quality: number;            
    	
        /**
        * 怪物名称
        */
        public name:string;
        
        /**
        * 怪物图片
        */
        public pic:string;        
        
		/**
		 * 怪物HP
		 */
		public hp:number;
		
		/**
		 * 掉落金币
		 */
		public drop:number;	
		
        /**
        * 所属关卡
        */
        public scene:number;		
        
        /**
        * 骨骼动画名
        */
        public boneAnimation:string;  
        
        public constructor() {
        }

	}
}