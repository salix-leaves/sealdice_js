// ==UserScript==
// @name         随机pixiv图片
// @author       叶子salix
// @version      1.0
// @description  引用api https://api.lolicon.app/#/setu
// @timestamp    1731232069
// @license      MIT
// @homepageURL  https://github.com/salix-leaves/sealdice_js
// ==/UserScript==
if (!seal.ext.find("setu")) {
    const ext = seal.ext.new("setu", "叶子salix", "1.0");
    const cmdbandori = seal.ext.newCmdItemInfo();
    cmdbandori.name = "setu";
    cmdbandori.help ="输入“.setu”，随机推送图片";
    cmdbandori.solve = (ctx, msg, cmdArgs) => {
      let val = cmdArgs.getArgN(1);
      switch (val) {
        case "help": {
          const ret = seal.ext.newCmdExecuteResult(true);
          ret.showHelp = true;
          return ret;
        }
        case"r18":{
          let url =
            "https://api.lolicon.app/setu/v2?size=small&?r18=1" ;
          // 发送 GET 请求
          fetch(url,{
            method: "GET"
          })
            .then((response) => {
              if (response.ok) {
                
                return response.text();
              } else {
                console.log(response.status);
                console.log("api失效！");
              }
            })
            .then((data) => {
              let pid = JSON.stringify(JSON.parse(data));
              let pidnum = JSON.parse(pid) 
              
              // 找不到的话返回“{"result":{"songCount":0},"code":200}”
              if (pidnum.error != "" ) {
                seal.replyToSender(ctx, msg, "努力连接中，网好像不太好");
              }else if(pidnum.data[0].urls == null ){
                seal.replyToSender(ctx, msg, "没有找到图片呢");

              }else{
              let picurl = pidnum.data[0].urls.small
              let pixpic = `[CQ:image,file=${picurl}]`+ String.fromCharCode(10);
              pixpic += "pid:" + pidnum.data[0].pid;
              seal.replyToSender(ctx, msg, pixpic);
            }})
            .catch((error) => {
              console.log("api请求错误！错误原因：" + error);
              seal.replyToSender(ctx, msg, "好像出了点问题呢")
            });
          return seal.ext.newCmdExecuteResult(true);

        }
        case"tag":{
          let pictag = cmdArgs.getArgN(2)
          let url =
          "https://api.lolicon.app/setu/v2?size=small&?r18=0&tag="+pictag ;
        // 发送 GET 请求
        fetch(url,{
          method: "GET"
        })
          .then((response) => {
            if (response.ok) {
              
              return response.text();
            } else {
              console.log(response.status);
              console.log("api失效！");
            }
          })
          .then((data) => {
            let pid = JSON.stringify(JSON.parse(data));
            let pidnum = JSON.parse(pid) 
            
            // 找不到的话返回“{"result":{"songCount":0},"code":200}”
            if (pidnum.error != "" ) {
              seal.replyToSender(ctx, msg, "努力连接中，网好像不太好");
            }else if(pidnum.data[0].urls == null ){
              seal.replyToSender(ctx, msg, "没有找到图片呢");

            }else{
            let picurl = pidnum.data[0].urls.small
            let pixpic = `[CQ:image,file=${picurl}]`+ String.fromCharCode(10);
            pixpic += "pid:" + pidnum.data[0].pid;
            seal.replyToSender(ctx, msg, pixpic);
          }})
          .catch((error) => {
            console.log("api请求错误！错误原因：" + error);
            seal.replyToSender(ctx, msg, "好像出了点问题呢")
          });
        return seal.ext.newCmdExecuteResult(true);
        }
        default: {
          let url =
            "https://api.lolicon.app/setu/v2?size=small&?r18=0" ;
          // 发送 GET 请求
          fetch(url,{
            method: "GET"
          })
            .then((response) => {
              if (response.ok) {
                
                return response.text();
              } else {
                console.log(response.status);
                console.log("api失效！");
              }
            })
            .then((data) => {
              let pid = JSON.stringify(JSON.parse(data));
              let pidnum = JSON.parse(pid) 
              
              // 找不到的话返回“{"result":{"songCount":0},"code":200}”
              if (pidnum.error != "" ) {
                seal.replyToSender(ctx, msg, "努力连接中，网好像不太好");
              }else if(pidnum.data[0].urls == null ){
                seal.replyToSender(ctx, msg, "没有找到图片呢");

              }else{
              let picurl = pidnum.data[0].urls.small
              let pixpic = `[CQ:image,file=${picurl}]`+ String.fromCharCode(10);
              pixpic += "pid:" + pidnum.data[0].pid;
              seal.replyToSender(ctx, msg, pixpic);
            }})
            .catch((error) => {
              console.log("api请求错误！错误原因：" + error);
              seal.replyToSender(ctx, msg, "好像出了点问题呢")
            });
          return seal.ext.newCmdExecuteResult(true);
        }
      }
    };
    // 注册命令
    ext.cmdMap["setu"] = cmdbandori;
    // 注册扩展
    seal.ext.register(ext);
  }
  