# Google地圖範例

## 地圖金鑰申請

- 參照這個[連結](https://developers.google.com/maps/documentation/javascript/get-api-key)去申請API Key
- 申請到後打開index.html檔，尋找```AIzaSyB41DRUbKWJHPxaFjMAwdrzWzbVKartNGg```，將這段字換成你自己的API Key

## 運作方式說明

- 首先切換到資料夾/api下，進行套件安裝
  ```bash
  cd api
  npm install
  ```
- 接下來啟動API Server
  ```bash
  node index.js
  ```
- 接下來打開檔案總管，對index.html點兩下，就會開啟瀏覽器(建議使用Chrome)，應該就可以看到地圖了

## 其他Google官方範例

- 參見[此連結](https://developers.google.com/maps/documentation/javascript/examples)