/* -------------- */
/* LINE Bot クラス */
/* -------------- */

module.exports = class Linebot {

  // constructor
  constructor(channelSecret, channelToken, proxy) {
    this.channelSecret = channelSecret;
    this.channelToken = channelToken;
    this.proxy = proxy;
  };

  // Signature Validation
  signatureValidate(body, signature) {
    const crypto = require('crypto');
    return signature === crypto.createHmac('sha256', this.channelSecret).update(new Buffer(JSON.stringify(body), 'utf8')).digest('base64');
  };

  // Parse Event
  parseEvent(body) {
    // JSONを利用するための設定が必要？
    return body.events;
  };

  // Reply messages
  replyMessage(replyToken, messages) {
    // Node.jsでHTTP/HTTPS通信を行うためのクライアントモジュール
    const request = require('request');
    const headers = {
      'Content-Type' : 'application/json',
      'Authorization' : 'Bearer {' + this.channelToken + '}'
    };
    const data = {
      replyToken : replyToken,
      messages : messages
    };
    const options = {
      uri : 'https://api.line.me/v2/bot/message/reply',
      proxy : this.proxy,
      headers : headers,
      json : true,
      body : data
    };
    request.post(options, (error, response, body) => {
      if (!error && response.statusCode == 200){
        console.log('ok');
      } else {
        console.log('error: ' + JSON.stringify(response));
      };
    });
  };
}
