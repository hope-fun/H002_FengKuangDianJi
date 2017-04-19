/**
 * Created by xzper on 2014/11/15.
 */

module game {
    /**
     * 货币类型
     */
    export class MoneyType {
        /**
        * 金币
        */
        public static MONEY:number = 1;
        /**
        * 装备点数
        */        
        public static ITEM:number = 2;
        /**
        * 钻石
        */   
        public static DIAMOND:number = 3;
    }
    
    /**
    * 加成类型
    */
    export class AdditionType {
        /**
        * 基础点击攻击力
        */
        public static BASEDMG:number = 1;
        /**
        * 点击攻击力加成
        */        
        public static DMGADDITION:number = 2;
        /**
        * 基础每秒挂机攻击力
        */
        public static BASEDPS:number = 3;
        /**
        * 每秒挂机攻击力加成
        */        
        public static DPSADDITION:number = 4;        
        /**
        * 挂机攻击速度加成
        */   
        public static SPEEDADDITION:number = 5;
    }    
    
    /**
    * 列表项目类型
    */
    export class ListItemType {
        /**
        * 玩家
        */
        public static PLAYER:number = 1;
        /**
        * 技能
        */        
        public static SKILL:number = 2;
        /**
        * 小伙伴
        */   
        public static HERO:number = 3;
    }   
    
    /**
    * 特效类型
    */
    export class ParticleType {
        /**
        * 死亡
        */
        public static DIE:number = 1;
        /**
        * 点击
        */        
        public static TouchScreen:number = 2;
        /**
        * 金币掉落
        */        
        public static GoldDrop:number = 3;        
    }  
        
    /**
    * 等级Icon类型
    */
    export class LevelIconType {
        /**
        * 前一等级
        */
        public static PRE:number = 1;
        /**
        * 当前等级
        */        
        public static CURRENT:number = 2;
        /**
        * 下一等级
        */   
        public static NEXT:number = 3;
    }      
}