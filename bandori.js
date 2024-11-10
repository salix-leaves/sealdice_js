// ==UserScript==
// @name         邦邦国服查车牌
// @author       叶子salix
// @version      1.0
// @description  从网站https://bandoristation.com/返回房间号信息
// @timestamp    1730302375
// @license      Apache-2
// @homepageURL  https://github.com/salix-leaves/sealdice_js
// ==/UserScript==

function notCommandband(ext) {
  ext.onNotCommandReceived = function (ctx, msg) {
      console.log(msg.message);
      const keeys =/ycm|YCM/;
      let r = msg.message;
      if ( keeys.exec(r)  != null ) {
          //检测到包含ycm三个字母触发
          bandGET(ctx,msg);  
      }
  };
}
function bandGET(ctx,msg) {
  let url ="https://api.bandoristation.com/?function=query_room_number" ;
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
                let res = JSON.stringify(JSON.parse(data));
                const BandJson = JSON.parse(res) ;
                const ycmnum = BandJson.response.length
                // 找不到的话返回“{"result":{"songCount":0},"code":200}”
                if (ycmnum == 0 ) {
                  seal.replyToSender(ctx, msg, "没有车，爬");
                }else if (ycmnum < 6){
                  let MessageRet = "车牌：" + BandJson.response[0].number + String.fromCharCode(10);
                  MessageRet += "车牌信息：" + BandJson.response[0].raw_message + String.fromCharCode(10);

                  for (i = 1; i < ycmnum; i++) { 
                    MessageRet += "车牌：" + BandJson.response[i].number + String.fromCharCode(10);
                    MessageRet += "车牌信息：" + BandJson.response[i].raw_message + String.fromCharCode(10);
                 }
                
                
                seal.replyToSender(ctx, msg, MessageRet);
              }else {
                let MessageRet = "车牌：" + BandJson.response[0].number + String.fromCharCode(10);
                  MessageRet += "车牌信息：" + BandJson.response[0].raw_message + String.fromCharCode(10);

                  for (i = 1; i < 6; i++) { 
                    MessageRet += "车牌：" + BandJson.response[i].number + String.fromCharCode(10);
                    MessageRet += "车牌信息：" + BandJson.response[i].raw_message + String.fromCharCode(10);
                 }
                
                
                seal.replyToSender(ctx, msg, MessageRet);

              }
            
            
            })
              .catch((error) => {
                console.log("api请求错误！错误原因：" + error);
                seal.replyToSender(ctx, msg, "不太清楚，我去问问tsugu")
                console.log(BandJson)
              });
              return seal.ext.newCmdExecuteResult(true);
          }

function main() {
  if (!seal.ext.find("bandori")) {
      const ext = seal.ext.new("bandori", "叶子salix", "1.0");
      const cmdbandori = seal.ext.newCmdItemInfo();
      notCommandband(ext);
      cmdbandori.name = "ycm";
      cmdbandori.help ="输入“ycm”，查找邦邦房间号";
      cmdbandori.solve = (ctx, msg, cmdArgs) => {
        let val = cmdArgs.getArgN(1);
        switch (val) {
          case "help": {
            const ret = seal.ext.newCmdExecuteResult(true);
            ret.showHelp = true;
            return ret;
          }
          default: {
            bandGET(ctx,msg);
            return seal.ext.newCmdExecuteResult(true);
          }
        }
      };
    
    // 注册命令
    ext.cmdMap["ycm"] = cmdbandori;
    // 注册扩展
    seal.ext.register(ext);
  }
}
main();
