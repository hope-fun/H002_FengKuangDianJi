

module game {

	export class GameData{
    	
        /**
        * 游戏静态数据库
        */
        //public static db:IndexDB = new IndexDB();
        
        /**
        * 自定义位图字体
        */
        public static customFont:egret.BitmapFont;          
        
        /**
        * 游戏静态数据
        */
        public static staticDatas:StaticDatas = new StaticDatas();        
        
        /**
         * 游戏内数据
         */
        public static gameInGata:GameInData = new GameInData();

        /**
         * 游戏外数据
         */
        public static gameOutData:GameOutData = new GameOutData();
        
        /**
        * 游戏骨骼动画
        */
        public static dbFactory: dragonBones.EgretFactory = new dragonBones.EgretFactory();  
        
        public static addArmatureToFactory( factory:dragonBones.EgretFactory, name:string, directory:string ){
            var skeletonData = RES.getRes( directory + "/"+directory+".json" );
            var textureData = RES.getRes( directory + "/texture.json" );
            var texture = RES.getRes( directory + "/texture.png" );
            factory.addDragonBonesData(dragonBones.DataParser.parseDragonBonesData(skeletonData));
            factory.addTextureAtlas(new dragonBones.EgretTextureAtlas(texture, textureData));
        }
		
		public static init(){
    		/*
            setTimeout(function(){
                GameData.gameInGata.loadData();
            },3000);     
            */
            GameData.gameInGata.loadData();
            GameData.gameOutData.loadData();
            GameData.updateGameInData();
		}
		
        public static updateGameInData(){
            GameData.gameInGata.totalDmg = GameData.gameOutData.playerData.totalDmg;
            GameData.gameInGata.totalDps = 0;
            for(var i = 0;i < GameData.gameOutData.herosData.length;i++)
            {  
                GameData.gameInGata.totalDps += GameData.gameOutData.herosData[i].totalDps;
            }
            GameData.gameInGata.currentAtk = GameData.gameInGata.totalDps;
        }
	}
}