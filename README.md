- [呼叫API](#%E5%91%BC%E5%8F%ABapi)
  - [為何需要API](#%E7%82%BA%E4%BD%95%E9%9C%80%E8%A6%81api)
  - [API概述](#api%E6%A6%82%E8%BF%B0)
  - [內容大綱](#%E5%85%A7%E5%AE%B9%E5%A4%A7%E7%B6%B1)
  - [呼叫API](#%E5%91%BC%E5%8F%ABapi-1)
    - [推薦API測試工具](#%E6%8E%A8%E8%96%A6api%E6%B8%AC%E8%A9%A6%E5%B7%A5%E5%85%B7)
    - [第一步、建立應用程式檔案](#%E7%AC%AC%E4%B8%80%E6%AD%A5%E5%BB%BA%E7%AB%8B%E6%87%89%E7%94%A8%E7%A8%8B%E5%BC%8F%E6%AA%94%E6%A1%88)
    - [第二步、輸入程式碼](#%E7%AC%AC%E4%BA%8C%E6%AD%A5%E8%BC%B8%E5%85%A5%E7%A8%8B%E5%BC%8F%E7%A2%BC)
    - [第三步、執行應用程式](#%E7%AC%AC%E4%B8%89%E6%AD%A5%E5%9F%B7%E8%A1%8C%E6%87%89%E7%94%A8%E7%A8%8B%E5%BC%8F)
    - [第四步、處理資料](#%E7%AC%AC%E5%9B%9B%E6%AD%A5%E8%99%95%E7%90%86%E8%B3%87%E6%96%99)
    - [挑戰一下](#%E6%8C%91%E6%88%B0%E4%B8%80%E4%B8%8B)
    - [補充資料](#%E8%A3%9C%E5%85%85%E8%B3%87%E6%96%99)
- [建立API](#%E5%BB%BA%E7%AB%8Bapi)
  - [建立GET API](#%E5%BB%BA%E7%AB%8Bget-api)
    - [第一步、撰寫程式碼](#%E7%AC%AC%E4%B8%80%E6%AD%A5%E6%92%B0%E5%AF%AB%E7%A8%8B%E5%BC%8F%E7%A2%BC)
    - [第二步、測試API與CORS問題](#%E7%AC%AC%E4%BA%8C%E6%AD%A5%E6%B8%AC%E8%A9%A6api%E8%88%87cors%E5%95%8F%E9%A1%8C)
    - [第三步、再次測試API](#%E7%AC%AC%E4%B8%89%E6%AD%A5%E5%86%8D%E6%AC%A1%E6%B8%AC%E8%A9%A6api)
  - [建立可以接收參數的GET API](#%E5%BB%BA%E7%AB%8B%E5%8F%AF%E4%BB%A5%E6%8E%A5%E6%94%B6%E5%8F%83%E6%95%B8%E7%9A%84get-api)
    - [第一步、撰寫程式碼](#%E7%AC%AC%E4%B8%80%E6%AD%A5%E6%92%B0%E5%AF%AB%E7%A8%8B%E5%BC%8F%E7%A2%BC-1)
    - [第二步、測試API](#%E7%AC%AC%E4%BA%8C%E6%AD%A5%E6%B8%AC%E8%A9%A6api)

# 呼叫API

## 為何需要API

- 目前網站、APP非常盛行，這些前端的介面如何取得資料，並且將資料呈現出來，就是一個資訊技術上的問題
- 首先，資料的來源最為大家所熟知的就是資料庫了
- 那麼APP或網站要呈現資料，就是直接連線到資料庫取得資料嗎？
- 不行，會有很多問題，例如資料庫可能會無法負荷連線量、有可能會有資訊安全的問題

![直接連資料庫是有危險的](https://github.com/silencecork/nodejs-api-workshop2021/blob/master/img/no_api.jpg?raw=true)

- 另外，如果我想取得的資料，我沒辦法連線到那個資料庫，那怎麼辦？
- 所以API是一個機制，讓APP、網站可以藉由API去取得資料，再由API去資料庫取得資料，那麼APP或網站就不需要知道資料庫連線的帳號密碼，一樣可以取得資料了

![使用API取得資料](https://github.com/silencecork/nodejs-api-workshop2021/blob/master/img/api.jpg?raw=true)

## API概述

![url的組成(資料出處：https://www.welcometothejungle.com/en/articles/btc-url-internet)](https://cdn.welcometothejungle.co/uploads/image/file/6023/159368/68dca0f2-7683-4ba9-a87a-3a7fdbe8015e.png)

- API基本上就是一個網址
  
  - 例如[http://example.com.tw/sample](http://example.com.tw/sample)，或是我們最常使用到的，自己的電腦，[http://localhost/]()
  - 有時候也會使用IP位置，例如[http://127.0.0.1/](http://127.0.0.1/)
    - 上述例子，**http://**表示協定(Sheme)
    - **example.com.tw**、**localhost**、**127.0.0.1**代表主機
  - **/sample**、**/**代表路徑(path)
    - 也時常會在主機後面再接一個PORT號，格式就是http://主機**:8080**/，**:8080**就是PORT號
  - API都是使用**http://**或**https://**的協定
  
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

- 本次範例都先使用Hoppscotch來做說明

  ![Hoppscotch](https://github.com/silencecork/nodejs-api-workshop2021/blob/master/img/use_hoppscotch.png?raw=true)
  
- 打開該網站，在畫面中會看到一個輸入框，直接輸入API [https://quality.data.gov.tw/dq_download_json.php?nid=137993&md5_url=86ec099baa2d36c22ab3a87350b718de](https://quality.data.gov.tw/dq_download_json.php?nid=137993&md5_url=86ec099baa2d36c22ab3a87350b718de)，並且按下「Send」，就可以看到回傳的資料了

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

  ![打開VSCode](https://github.com/silencecork/nodejs-api-workshop2021/blob/master/img/import_to_vscode.png?raw=true)

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

  ![打開終端機](https://github.com/silencecork/nodejs-api-workshop2021/blob/master/img/open_terminal.png?raw=true)

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
  
- 安裝套件之前，我們要先建立Node.js的專案，這邊使用到最常使用的指令之二，```npm init```，在指令模式下輸入這個指令

  ```bash
  npm init
  ```

- 會看到結果如下

  ```bash
  Press ^C at any time to quit.
  package name: (workshop)
  version: (1.0.0)
  description:
  entry point: (index.js)
  test command:
  git repository:
  keywords:
  author:
  license: (ISC)
  About to write to ...\workshop\package.json:
  
  {
    "name": "workshop",
    "version": "1.0.0",
    "description": "",
    "main": "index.js",
    "scripts": {
      "test": "echo \"Error: no test specified\" && exit 1"
    },
    "author": "",
    "license": "ISC"
  }
  
  
  Is this OK? (yes) yes
  ```

- 接下來才可以安裝套件，使用Node.js最常用到的指令之三，**```npm install --save <套件名稱>```**，本範例要在指令模式下輸入以下指令，並按下Enter執行：

  ```bash
  npm install --save request
  ```

- 上述指令執行完畢後，再次執行**node index.js**，就會看到API回傳的資料了，雖然很亂難以閱讀...

### 第四步、處理資料

- 現在來處理回傳的資料，從回呼函式回傳的```body```是字串，我們必須先將他轉為JSON格式的資料才能在Node.js中使用

- 以下是處理資料的完整程式碼

  ```javascript
  const request = require('request');
  
  var options = {
    'method': 'GET',
    'url': 'https://quality.data.gov.tw/dq_download_json.php?nid=137993&md5_url=86ec099baa2d36c22ab3a87350b718de'
  };
  request(options, function (err, response, body) {
    if (err) {
      console.error(err);
      return;
    }
    let data = JSON.parse(body);
    console.log(Array.isArray(data));
    data.forEach(function (item) {
      console.log(item.sna + " " + item.sbi);
    });
  });
  ```

- 程式碼說明

  - 使用```JSON.parse(字串)```，只要字串符合JSON格式的規定，就可以將字串轉為JSON物件，並存在變數```data```中

    ```javascript
    let data = JSON.parse(body);
    ```

  - 如果我們看看API回傳的資料，可以用```Array.isArray(變數)```檢查資料是不是陣列，如果我們去執行程式碼，就會發現變數data目前是陣列

    ```javascript
    console.log(Array.isArray(data));
    ```

  - ```陣列變數.foreach(function (陣列中一個一個的物件) {...})```：這是Javascript中常見的迴圈使用方式

    ```javascript
    data.forEach(function (item) {
      ...
    });
    ```

    - 也可以用傳統的for迴圈尋訪陣列

      ```javascript
      for (i = 0; i < data.length; i++) {
        let item = data[i];
      }
      ```

  - 我們在前面有檢查過API回傳的資料，其中sna(場站中文名稱)、sbi(場站目前車輛數量)是很有用的資訊，我們可以把資訊列印在畫面上

    ```javascript
    data.forEach(function (item) {
      console.log(item.sna + " " + item.sbi);
    });
    ```

- 接下來，使用```node index.js```再次執行程式，就會得到以下結果

  ```bash
  YouBike2.0_捷運科技大樓站 0
  YouBike2.0_復興南路二段273號前 0
  YouBike2.0_國北教大實小東側門 0
  YouBike2.0_和平公園東側 0
  YouBike2.0_辛亥復興路口西北側 1
  YouBike2.0_復興南路二段280號前 0
  YouBike2.0_復興南路二段340巷口 0
  YouBike2.0_新生南路三段52號前 0
  YouBike2.0_新生南路三段66號前 0
  YouBike2.0_新生南路三段82號前 0
  YouBike2.0_羅斯福路三段333巷9號旁 0
  YouBike2.0_辛亥路一段30號前 0
  YouBike2.0_和平復興路口西北側 0
  YouBike2.0_羅斯福路三段311號前 0
  YouBike2.0_大安運動中心停車場 1
  ...
  ```

### 挑戰一下

- 只印出目前場站車輛數大於5台的場站要怎麼做？

### 補充資料

- 其他關於Javascript操作物件和陣列的教學，[見此](https://miahsuwork.medium.com/%E7%AC%AC%E5%9B%9B%E9%80%B1-javascript-%E9%99%A3%E5%88%97-array-%E8%88%87-%E7%89%A9%E4%BB%B6-object-25f13e3d3c92)

- request是使用在Node.js之上的，如果你在寫網頁程式，就沒辦法使用了。但也有對應的套件可以使用，例如[fetch](https://developer.mozilla.org/zh-TW/docs/Web/API/Fetch_API/Using_Fetch)

- 使用request的POST的方式，以下是簡單的範例程式碼：

  ```javascript
  const request = require('request');
  
  let postData = {
      key1: "value 1",
      key2: "value 2"
  }
  request.post('API位置', form: postData, function (err, httpResponse, body) {
      if (err) {
          console.error(err);
          return;
      }
      ...
  });
  ```

  

# 建立API

- 我們也可以自己建立API伺服器
- 這次我們使用到的套件叫做[express](https://expressjs.com/zh-tw/)

## 建立GET API

### 第一步、撰寫程式碼

- 在目前的專案新增一個檔案，稱為server.js，程式碼如下：

  ```javascript
  const express = require('express');
  const app = express();
  
  app.get('/', function (httpRequest, httpResponse) {
      let data = {
          message: "Hello World"
      };
      return httpResponse.json(data);
  });
  
  app.listen(8080, function (err) {
      if (err) {
          console.error(err)
      }
  });
  ```

- 程式碼說明：

  - 首先我們先引用套件express

    ```javascript
    const express = require('express');
    ```

  - 建立express實體

    ```javascript
    const app = express();
    ```

  - express的架構是讓我們以URL的Path做為不同的API入口，不同入口設定不同的接收器 (回呼函式)負責處理

  - 格式為```app.<http方法>(路徑, 回呼函式)```，所以本範例就是建立了一個接收根路徑，接受GET的方式的接收器

  - 回呼函式的資料有兩個參數，httpRequest包含著用戶來呼叫API時的資訊；httpResponse是負責將資料傳回給用戶使用的參數

    ```javascript
    app.get('/', function (httpRequest, httpResponse) {
        ...
    });
    ```

  - 再來看看接收器(回呼函式)的內容，藉由```httpResponse.json(資料)```，一律回傳JSON格式的資料。所以這裡會回傳的資料就是```{"message": "Hello World"}```

    ```javascript
    app.get('/', function (httpRequest, httpResponse) {
        let data = {
            message: "Hello World"
        };
        return httpResponse.json(data);
    });
    ```

  - 再來看看讓API伺服器的啟動方式，```app.listen(Port號)```就可以啟動了。而範例中的寫法還加上了回呼函式，用來接收啟動是否成功。如果回呼函式的參數err有值，就表示啟動出現問題了

    ```javascript
    app.listen(8080, function (err) {
        if (err) {
            console.error(err)
        }
    });
    ```

- 接下來使用指令

  - ```npm install --save express```：安裝express套件
  - ```node server.js```：啟動伺服器

### 第二步、測試API與CORS問題

- 打開[hoppscotch](https://hoppscotch.io/)，在網址列輸入[http://127.0.0.1:8080/](http://127.0.0.1:8080/)，並按下Send

- 出現錯誤了，Could not send request

  ![CORS錯誤](https://github.com/silencecork/nodejs-api-workshop2021/blob/master/img/hoppscotch_cors_error.png?raw=true)

- 這是CORS的安全性問題，這裡有[詳細的說明](https://developer.mozilla.org/zh-TW/docs/Web/HTTP/CORS)，簡單來說，Hoppscotch是網頁應用程式，網頁應用程式不能夠隨便呼叫別人家的API，必須API特別允許才能呼叫，所以我們的API Server必須得解決這個問題

- 打開server.js，程式碼更改如下

  ```javascript
  const express = require('express');
  const app = express();
  const cors = require('cors');
  
  app.use(cors());
  
  app.get('/', function (httpRequest, httpResponse) {
      let data = {
          message: "Hello World"
      };
      return httpResponse.json(data);
  });
  
  app.listen(8080, function (err) {
      if (err) {
          console.error(err)
      }
  });
  ```

- 程式碼說明：

  - 這邊引入了專門用來解決CORS問題的套件

    ```javascript
    const cors = require('cors');
    ```

  - 在express再加上這一行就可以解除CORS的問題了

    ```javascript
    app.use(cors());
    ```

- 接下來執行指令

  - ```npm install --save cors```：使用npm安裝cors套件
  - ```node index.js```：再次執行應用程式

### 第三步、再次測試API

- 再次使用[hoppscotch](https://hoppscotch.io/)，在網址列輸入[http://127.0.0.1:8080/](http://127.0.0.1:8080/)，並按下Send

- 應該會看到下圖的畫面

  ![越過CORS的安全性檢查](https://github.com/silencecork/nodejs-api-workshop2021/blob/master/img/hoppscotch_cors_success.png?raw=true)

## 建立可以接收參數的GET API

- 我們另外建立一個路徑/param，來做為可以接收參數的API
- 呼叫API時會長得像這樣[http://localhost:8080/param?key1=Hello&key2=World](http://localhost:8080/param?key1=Hello&key2=World)
  - API接收兩個Key，分別是key1和key2

### 第一步、撰寫程式碼

- 以下是完整的程式碼：

  ```javascript
  const express = require('express');
  const app = express();
  const cors = require('cors');
  
  app.use(cors())
  
  app.get('/', function (httpRequest, httpResponse) {
      let data = {
          message: "Hello World"
      };
      return httpResponse.json(data);
  });
  
  app.get('/param', function (httpRequest, httpResponse) {
      let key1 = httpRequest.query.key1;
      let key2 = httpRequest.query.key2;
      let data = {
          message: key1 + " " + key2
      };
      return httpResponse.json(data);
  });
  
  app.listen(8080, function (err) {
      if (err) {
          console.error(err)
      }
  });
  ```

- 程式碼說明：

  - 建立另一個路徑/param的接收器

    ```javascript
    app.get('/param', function (httpRequest, httpResponse) {
        ...
    });
    ```

  - 使用```httpReques.query.參數名```可以取得傳入的參數，本次例子參數是key1=Hello&key2=World，是兩個參數分別為key1和key2，所以就可以用以下的程式碼取得

    ```javascript
    let key1 = httpRequest.query.key1;
    let key2 = httpRequest.query.key2;
    ```

### 第二步、測試API

- 打開[hoppscotch](https://hoppscotch.io/)，在網址列輸入[http://localhost:8080/param?key1=SHU&key2=Workshop](http://localhost:8080/param?key1=SHU&key2=Workshop)，並按下Send，就可以看到結果了
