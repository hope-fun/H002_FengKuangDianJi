
var game_file_list = [
    //以下为自动修改，请勿修改
    //----auto game_file_list start----
	"libs/modules/egret/egret.js",
	"libs/modules/egret/egret.native.js",
	"libs/modules/game/game.js",
	"libs/modules/game/game.native.js",
	"libs/modules/res/res.js",
	"libs/modules/gui/gui.js",
	"libs/modules/socket/socket.js",
	"libs/modules/tween/tween.js",
	"libs/modules/dragonbones/dragonbones.js",
	"libs/modules/puremvc/puremvc.js",
	"bin-debug/AssetAdapter.js",
	"bin-debug/database/IndexDB.js",
	"bin-debug/database/StaticDatas.js",
	"bin-debug/gamecore/app/AppConfig.js",
	"bin-debug/gamecore/app/AppContainer.js",
	"bin-debug/gamecore/app/IApp.js",
	"bin-debug/gamecore/ApplicationFacade.js",
	"bin-debug/gamecore/controller/commands/GameCommand.js",
	"bin-debug/gamecore/controller/commands/SceneCommand.js",
	"bin-debug/gamecore/controller/ControllerPrepCommand.js",
	"bin-debug/gamecore/controller/ModelPrepCommand.js",
	"bin-debug/gamecore/controller/StartupCommand.js",
	"bin-debug/gamecore/controller/ViewPrepCommand.js",
	"bin-debug/gamecore/model/common/ConstData.js",
	"bin-debug/gamecore/model/game/enemyStaticData.js",
	"bin-debug/gamecore/model/game/enemyData.js",
	"bin-debug/gamecore/model/game/GameInData.js",
	"bin-debug/gamecore/model/game/GameOutData.js",
	"bin-debug/gamecore/model/game/GameData.js",
	"bin-debug/gamecore/model/game/GameInDynamicData.js",
	"bin-debug/gamecore/model/game/heroStaticData.js",
	"bin-debug/gamecore/model/game/heroData.js",
	"bin-debug/gamecore/model/game/heroDynamicData.js",
	"bin-debug/gamecore/model/game/levelUpData.js",
	"bin-debug/gamecore/model/game/playerData.js",
	"bin-debug/gamecore/model/game/playerDynamicData.js",
	"bin-debug/gamecore/model/GameProxy.js",
	"bin-debug/gamecore/utils/ObjectPool.js",
	"bin-debug/gamecore/view/ApplicationMediator.js",
	"bin-debug/gamecore/view/GameSceneMediator.js",
	"bin-debug/gamecore/view/GameSceneUIMediator.js",
	"bin-debug/gamecore/view/GameScreenMediator.js",
	"bin-debug/gamecore/view/panel/DropGold.js",
	"bin-debug/gamecore/view/panel/DynamicEnemyUI.js",
	"bin-debug/gamecore/view/panel/EnemyUI.js",
	"bin-debug/gamecore/view/panel/GameScene.js",
	"bin-debug/gamecore/view/panel/GameSceneUI.js",
	"bin-debug/gamecore/view/panel/GameScreen.js",
	"bin-debug/gamecore/view/panel/LevelIcon.js",
	"bin-debug/gamecore/view/panel/LvUpButton.js",
	"bin-debug/skin/components/LvUpButtonSkin.g.js",
	"bin-debug/gamecore/view/panel/ListItem.js",
	"bin-debug/gamecore/view/panel/ParallelGold.js",
	"bin-debug/gamecore/view/panel/SkillAndPropertyUI.js",
	"bin-debug/gamecore/view/panel/SkillButton.js",
	"bin-debug/skin/PlayerItemSkin.g.js",
	"bin-debug/skin/SkillItemSkin.g.js",
	"bin-debug/skin/HeroItemSkin.g.js",
	"bin-debug/gamecore/view/panel/SubSystemUI.js",
	"bin-debug/gamecore/view/panel/TabButton.js",
	"bin-debug/gamecore/view/SubSystemMediator.js",
	"bin-debug/LoadingUI.js",
	"bin-debug/skin/components/LevelIconSkin.g.js",
	"bin-debug/skin/GameSceneSkin.g.js",
	"bin-debug/skin/components/SkillButtonSkin.g.js",
	"bin-debug/skin/SkillAndPropertySkin.g.js",
	"bin-debug/skin/SubSystemsSkin.g.js",
	"bin-debug/Main.js",
	"bin-debug/particle/Particle.js",
	"bin-debug/particle/GravityParticle.js",
	"bin-debug/particle/ParticleSystem.js",
	"bin-debug/particle/GravityParticleSystem.js",
	"bin-debug/skin/components/ChallengeButtonSkin.g.js",
	"bin-debug/skin/components/ProgressBarSkin.g.js",
	"bin-debug/skin/components/TabButtonSkin.g.js",
	"bin-debug/skin/LoadingUISkin.g.js",
	"bin-debug/skin/MainGameUISkin.g.js",
	//----auto game_file_list end----
];

var window = {};

egret_native.setSearchPaths([""]);

egret_native.requireFiles = function () {
    for (var key in game_file_list) {
        var src = game_file_list[key];
        require(src);
    }
};

egret_native.egretInit = function () {
    egret_native.requireFiles();
    egret.TextField.default_fontFamily = "/system/fonts/DroidSansFallback.ttf";
    //egret.dom为空实现
    egret.dom = {};
    egret.dom.drawAsCanvas = function () {
    };
};

egret_native.egretStart = function () {
    var option = {
        //以下为自动修改，请勿修改
        //----auto option start----
		entryClassName: "Main",
		frameRate: 30,
		scaleMode: "showAll",
		contentWidth: 480,
		contentHeight: 800,
		showPaintRect: false,
		showFPS: false,
		fpsStyles: "x:0,y:0,size:30,textColor:0x00c200,bgAlpha:0.9",
		showLog: false,
		logFilter: "",
		maxTouches: 2,
		textureScaleFactor: 1
		//----auto option end----
    };

    egret.native.NativePlayer.option = option;
    egret.runEgret();
    egret_native.Label.createLabel(egret.TextField.default_fontFamily, 20, "", 0);
    egret_native.EGTView.preSetOffScreenBufferEnable(true);
};