## 為何需要API

- 目前網站、APP非常盛行，這些前端的介面如何取得資料，並且將資料呈現出來，就是一個資訊技術上的問題
- 首先，資料的來源最為大家所熟知的就是資料庫了
- 那麼APP或網站要呈現資料，就是直接連線到資料庫取得資料嗎？
- 不行，會有很多問題，例如資料庫可能會無法負荷連線量、有可能會有資訊安全的問題
- 另外，如果我想取得的資料，我沒辦法連線到那個資料庫，那怎麼辦？
- 所以API是一個機制，讓APP、網站可以藉由API去取得資料，再由API去資料庫取得資料，那麼APP或網站就不需要知道資料庫連線的帳號密碼，一樣可以取得資料了

## API概述

- API基本上就是一個網址
  - 例如[http://example.com.tw/sample](http://example.com.tw/sample)，或是我們最常使用到的，自己的電腦，[http://localhost/]()
  - 有時候也會使用IP位置，例如[http://127.0.0.1/](http://127.0.0.1/)
  - 上述例子，**http://**表示協定，**example.com.tw**、**localhost**、**127.0.0.1**代表主機，**/sample**、**/**代表path
  - API都是使用**http://**或**https://**的協定
  - API也時常會在主機後面再接一個PORT號，格式就是http://主機**:8080**/，**:8080**就是PORT號

- 而網址我們會帶著一些資訊，來告訴這網址我們需要索取的內容，例如：[https://www.google.com/search?q=node.js](https://www.google.com/search?q=node.js)
  - 上述例子，網址後面的q=node.js，這種將資訊直接帶在網址上的方式，稱為GET，資訊藉由**q=**來帶給API
  - 另一種常用的方式叫做POST，他是將資訊帶在傳輸的資料中，而不是網址上
  
- API常見的傳輸資料叫做JSON格式，以下是一些Sample
  ```json
  {
      "university": "SHU",
      "department": "Information Management"
  }
  ```
  ```json
  {
      "universities": [
          {
              "name": "SHU",
              "location": "Taipei"
          },
          {
              "name": "NTU",
              "location": "Taipei"
          },
          {
              "name": "YZU",
              "location": "Taoyuan"
          }
      ]
  }
  ```



## 內容大綱

- 主要讓大家先會使用呼叫API，再學會自己建立API給別人呼叫
- 這裡都會以GET的方式為例子

## 呼叫API

- 我們這裡使用Node.js，搭配[YouBike的及時自行車資訊](https://data.gov.tw/dataset/137993)的資料集為例子
- 從網站中我們可以得到API的位置為[https://quality.data.gov.tw/dq_download_json.php?nid=137993&md5_url=86ec099baa2d36c22ab3a87350b718de](https://quality.data.gov.tw/dq_download_json.php?nid=137993&md5_url=86ec099baa2d36c22ab3a87350b718de)
- 開發工具我們使用VS Code為基礎

### 推薦API測試工具

- 這邊推薦給大家2個工具

  - [Hoppscotch](https://hoppscotch.io/)：可直接在網頁上測試API
  - [Postman](https://www.postman.com/downloads/)：需要下載App，但我自己比較常使用這個

- 本次範例都先使用Hoppscotch來做說明，打開該網站，在畫面中會看到一個輸入框，直接輸入API [https://quality.data.gov.tw/dq_download_json.php?nid=137993&md5_url=86ec099baa2d36c22ab3a87350b718de](https://quality.data.gov.tw/dq_download_json.php?nid=137993&md5_url=86ec099baa2d36c22ab3a87350b718de)，並且按下「Send」，就可以看到回傳的資料了

  ```json
  [
    {
      "sno": "500101001",
      "sna": "YouBike2.0_捷運科技大樓站",
      "tot": "28",
      "sbi": "0",
      "sarea": "大安區",
      "mday": "2021-11-03 09:43:03",
      "lat": "25.02605",
      "lng": "121.5436",
      "ar": "復興南路二段235號前",
      "sareaen": "Daan Dist.",
      "snaen": "YouBike2.0_MRT Technology Bldg. Sta.",
      "aren": "No.235， Sec. 2， Fuxing S. Rd.",
      "bemp": "28",
      "act": "1",
      "srcUpdateTime": "2021-11-03 09:54:16",
      "updateTime": "2021-11-03 09:54:50",
      "infoTime": "2021-11-03 09:43:03",
      "infoDate": "2021-11-03"
    },
    ...
  ]
  ```

- 依照官方文件的說明，可以知道欄位資料的意義

  ```tex
  sno(站點代號)、sna(場站中文名稱)、tot(場站總停車格)、sbi(場站目前車輛數量)、sarea(場站區域)、mday(資料更新時間)、lat(緯度)、lng(經度)、ar(地點)、sareaen(場站區域英文)、snaen(場站名稱英文)、aren(地址英文)、bemp(空位數量)、act(全站禁用狀態)、srcUpdateTime、updateTime、infoTime、infoDate
  ```

- 對這次範例來說，有用的資料為sno(站點代號)、sna(場站中文名稱)、sbi(場站目前車輛數量)

### 第一步、建立應用程式檔案

- 首先打開檔案總管，在「文件」的資料夾下建立一個叫做workshop的資料夾

- 對該資料夾按下滑鼠右鍵，選擇「以Code開啟」。如果你按下滑鼠右鍵沒有這個選單，就直接打開VS Code，在VS Code上方「檔案」->「開啟資料夾」，然後選擇剛剛在文件下建立的workshop資料夾

- 要建立Node.js的應用程式，首先需要一個Javascript檔案，所以在剛剛開啟的VS Code專案下，選擇上方「檔案」-> 「新增檔案」，這時候畫面就會出現一個新的檔案名叫Untitled-1

- 我們先將這個沒有命名的檔案存檔，在VS Code上方「檔案」->「儲存」，或你可以按下快速鍵「Ctrl + s」，接下來會跳出存檔視窗，檔案名稱儲存為**index.js**

### 第二步、輸入程式碼

- 要呼叫API，我們要使用到Node.js的套件[request](https://github.com/request/request)
- 完整程式碼如下：
  ```javascript
  const request = require('request');

  var options = {
    method: 'GET',
    url: 'https://quality.data.gov.tw/dq_download_json.php?nid=137993&md5_url=86ec099baa2d36c22ab3a87350b718de'
  };
  request(options, function (err, response, body) {
    if (err) {
      console.error(err);
      return;
    }
    console.log(body);
  });
  ```
- 程式碼說明：
  - 這表示我們這個程式碼會使用到request這個套件
  ```javascript
  const request = require('request');
  ```
  
  - 這是建立一個要呼叫的API的資訊物件，options
    - method：就是要呼叫API的方式，這邊使用GET
    - url：要呼叫的API
  ```javascript
  var options = {
    method: 'GET',
    url: 'https://quality.data.gov.tw/dq_download_json.php?nid=137993&md5_url=86ec099baa2d36c22ab3a87350b718de'
  };
  ```
  - 使用在第一行宣告使用的套件request，傳送2個參數
    - ```options```：要呼叫的API資訊物件
    - ```function (err, response, body) {...}```：這個叫做回呼函式(callback)，當呼叫的API有收到結果時，就會從回呼函式傳回結果，這個回呼函式會有3個參數
      - ```err```：如果有出錯時，err就會收到回傳的結果
      - ```response```：可以從這個參數得到回傳的資訊，例如```response.statusCode```，取得連線的狀態碼，詳細說明[見此](https://developer.mozilla.org/zh-TW/docs/Web/HTTP/Status)，最常表示成功的代碼是**200**
      - ```body```：如果呼叫API成功時，可以得到回傳的資料
  ```javascript
  request(options, function (err, response, body) {
    ...
  });
  ```
  
  - 再來看回呼函式內的程式碼
  - ```if (err) {...}```：表示如果回呼函式的第1個參數不是空的，就表示有發生錯誤
  - ```console.error(err)```：使用Javascript內建錯誤內容在畫面上的方式，印出發生的錯誤
  - ```console.log(body)```：使用Javascript內建印資料文字在畫面上的方式，印出API回傳的資料
  ```javascript
  if (err) {
    console.error(err);
    return;
  }
  console.log(body);
  ```

### 第三步、執行應用程式

- 要執行Node.js的應用程式需要用到指令模式，在Windows中稱為「命令提示字元」或是「終端機」或是「Power Shell」或是「Command Prompt」或是「cmd」，但VS Code中有內建這個功能

- 在VS Code上方選單，「終端機」->「新增終端」，預設就會在VS Code最下方出現指令模式

- 這邊要說明Node.js最常使用到的指令之一，**```node <javascript的檔案>```**，本範例執行的例子如下：
  ```bash
  node index.js
  ```
  
- 在VS Code的指令模式中輸入以上指令```node index.js```，並且按下Enter來執行

- 糟糕！出錯了，錯誤應該跟下面一樣。這個錯誤表示你需要**安裝套件**，以下錯誤說到```Error: Cannot find module 'request'```，表示缺少了request這個套件
  ```bash
  internal/modules/cjs/loader.js:883
    throw err;
    ^

  Error: Cannot find module 'request'
  Require stack:
  - C:\Users\liu71\Documents\workspace\2021-nodejs-api-workshop\call_api\index.js
      at Function.Module._resolveFilename (internal/modules/cjs/loader.js:880:15)
      at Function.Module._load (internal/modules/cjs/loader.js:725:27)
      at Module.require (internal/modules/cjs/loader.js:952:19)
      at require (internal/modules/cjs/helpers.js:88:18)
      at Object.<anonymous> (C:\Users\liu71\Documents\workspace\2021-nodejs-api-workshop\call_api\index.js:1:17)
      at Module._compile (internal/modules/cjs/loader.js:1063:30)
      at Object.Module._extensions..js (internal/modules/cjs/loader.js:1092:10)
      at Module.load (internal/modules/cjs/loader.js:928:32)
      at Function.Module._load (internal/modules/cjs/loader.js:769:14)
      at Function.executeUserEntryPoint [as runMain] (internal/modules/run_main.js:72:12) {
    code: 'MODULE_NOT_FOUND',
    requireStack: [
      'C:\\Users\\liu71\\Documents\\workspace\\2021-nodejs-api-workshop\\call_api\\index.js'
    ]
  }
  ```
  
- 這邊要用到Node.js最常用到的指令之二，**```npm install --save <套件名稱>```**，本範例要在指令模式下輸入以下指令，並按下Enter執行：

  ```bash
  npm install --save request
  ```

- 上述指令執行完畢後，再次執行**node index.js**，就會看到API回傳的資料了，雖然很亂難以閱讀...

- 
