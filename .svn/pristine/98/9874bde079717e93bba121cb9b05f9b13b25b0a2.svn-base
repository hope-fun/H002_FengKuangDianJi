/**
 * Copyright (c) 2014,Egret-Labs.org
 * All rights reserved.
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 *     * Redistributions of source code must retain the above copyright
 *       notice, this list of conditions and the following disclaimer.
 *     * Redistributions in binary form must reproduce the above copyright
 *       notice, this list of conditions and the following disclaimer in the
 *       documentation and/or other materials provided with the distribution.
 *     * Neither the name of the Egret-Labs.org nor the
 *       names of its contributors may be used to endorse or promote products
 *       derived from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY EGRET-LABS.ORG AND CONTRIBUTORS "AS IS" AND ANY
 * EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL EGRET-LABS.ORG AND CONTRIBUTORS BE LIABLE FOR ANY
 * DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
 * ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */


class Main extends egret.Sprite{

    /**
     * 加载进度界面
     */
    private loadingView:LoadingUI;

    public constructor() {
        super();
        this.init();
    }

    private appContainer:game.AppContainer;

    private init():void
    {
        //iphone,ipad等【无痕浏览】模式
        try {
            localStorage.setItem("test","test");
        }
        catch(e)
        { 
            console.log( "您处于无痕浏览，无法为您保存" );
            alert( "您处于无痕浏览，无法进入游戏，请关闭【无痕浏览】再试！" );
            return;
        }
        //下面的代码用于显示FPS等信息，可选,FPS需要大于24
        //egret.Profiler.getInstance().run();

        //注入自定义的解析器
        //egret.Injector.mapClass("egret.gui.IAssetAdapter",AssetAdapter);
        egret.gui.mapClass("egret.gui.IAssetAdapter",AssetAdapter);
        //egret.gui.Theme.load("resource/theme.thm");

        //初始化UIStage
        this.appContainer = new game.AppContainer();
        this.addChild(this.appContainer);

        //初始化Resource资源加载库
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE,this.onConfigComplete,this);
        RES.loadConfig("resource/resource.json","resource/");
        
        //RES.getResByUrl("resource/assets/font/font.fnt", this.onLoadComplete, this,
        RES.getResByUrl("resource/assets/font/num-export.fnt", this.onLoadComplete, this,
            RES.ResourceItem.TYPE_FONT);
    }
    
    private onLoadComplete(font:egret.BitmapFont):void {
        //alert(font);
        game.GameData.customFont = font;
        /*
        var bitmapText:egret.BitmapText = new egret.BitmapText();
        bitmapText.font = font;
        this.addChild(bitmapText);
        bitmapText.text = "Hello Egret";
        */
    }

    /**
     * 配置文件加载完成,开始预加载preload资源组。
     */
    private onConfigComplete(event:RES.ResourceEvent):void{
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE,this.onConfigComplete,this);
        RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE,this.onResourceLoadComplete,this);
        RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS,this.onResourceProgress,this);
        RES.loadGroup("loading",1);
        RES.loadGroup("newui",2);
        //RES.loadGroup("dragon",3);
        //RES.loadGroup("robot",4);
        //RES.loadGroup("ren",5);
        RES.loadGroup("effects",6);
        RES.loadGroup("BoneAnimation",7);
        
        RES.loadGroup("preload");
    }
    
    /**
     * preload资源组加载完成
     */
    private onResourceLoadComplete(event:RES.ResourceEvent):void {
        if(event.groupName=="loading"){
            //设置加载进度界面
            this.loadingView  = new LoadingUI();
            this.appContainer.addElement(this.loadingView);
        }
        else if(event.groupName=="preload"){
            this.appContainer.removeElement(this.loadingView);
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE,this.onResourceLoadComplete,this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_PROGRESS,this.onResourceProgress,this);
            
            //数据处理          
            //game.GameData.staticDatas.getAllData();
            /*
            var db: game.IndexDB = game.GameData.db;
            var createFlag: boolean = false;
            var dbName = "H5GameDB_CrazyHit";
            //todo:从服务端传来的数据库信息
            var dbVersionS = 1;            
            var dbVersion = 1;
            if(localStorage.getItem("dbVersion") != null) {                
                dbVersion = <number>localStorage.getItem("dbVersion");
                createFlag = false;
                if(dbVersionS != dbVersion) {
                    dbVersion = dbVersionS;
                    createFlag = true;
                }
                else
                { 
                    createFlag = false;
                }                
            }
            else
            { 
                dbVersion = dbVersionS;
                createFlag = true;
            }
            console.log(createFlag);
            if(createFlag) { 
                //创建数据库并初始化数据
                db.create(dbName,dbVersion);
            }
            else {
                //打开数据库
                db.open(dbName,dbVersion);
            }
            */
            //alert(window.openDatabase);不支持

            this.createGameScene(); 
        }
    }
    /**
     * preload资源组加载进度
     */
    private onResourceProgress(event:RES.ResourceEvent):void {
        if(event.groupName=="preload"){                       
            this.loadingView.setProgress(event.itemsLoaded,event.itemsTotal);
        }
    }

    /**
     * 创建游戏场景
     */
    private createGameScene():void {
        //设置模态层透明度,写在这里是因为初始化的时候UIStage还没初始化完毕，直接设置会报错
        egret.gui.PopUpManager.modalAlpha = 0;

        game.ApplicationFacade.getInstance().startUp(this.appContainer);
        
        //数据处理好再切换     
        game.GameData.staticDatas.getAllData();
        //game.ApplicationFacade.getInstance().sendNotification(game.SceneCommand.CHANGE,1);
    }
}