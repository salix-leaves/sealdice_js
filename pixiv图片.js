// ==UserScript==
// @name         随机pixiv日榜图片
// @author       叶子salix
// @version      1.0
// @description  随机返回pixiv日榜第一页图片
// @timestamp    1731232069
// @license      MIT
// @homepageURL  https://github.com/salix-leaves/sealdice_js
// ==/UserScript==
if (!seal.ext.find("Pix")) {
    const ext = seal.ext.new("Pix", "叶子salix", "1.0");
    const cmdbandori = seal.ext.newCmdItemInfo();
    cmdbandori.name = "pix";
    cmdbandori.help ="输入“.pix”，随机推送图片";
    cmdbandori.solve = (ctx, msg, cmdArgs) => {
      let val = cmdArgs.getArgN(1);
      switch (val) {
        case "help": {
          const ret = seal.ext.newCmdExecuteResult(true);
          ret.showHelp = true;
          return ret;
        }
        default: {
          let url =
            "https://open.pximg.org/rank.php?p=1" ;
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
              let picurl = "https://i.pximg.org/"
              // 找不到的话返回“{"result":{"songCount":0},"code":200}”
              if (pidnum.status_code != 200 ) {
                seal.replyToSender(ctx, msg, "努力连接中，网好像不太好");
              }else{
                const n = pidnum.pid.length
                const nnn = Math.floor(Math.random()*n)
              let pixid = pidnum.pid[nnn]
              let pixpic = `[CQ:image,file=${picurl}` + pixid + `]`
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
    ext.cmdMap["pix"] = cmdbandori;
    // 注册扩展
    seal.ext.register(ext);
  }
  