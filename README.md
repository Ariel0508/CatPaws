# Cat Paws 貓咪服飾、配件
販售貓咪服飾、配件、生活用品

網站:https://ariel0508.github.io/CatPaws/#/

## 前台功能介紹
- 首頁
- 產品：產品分類、分頁功能
- 產品詳情頁：商品資訊、產品放大鏡功能、加入購物車
- 購物車：修改商品，增加、減少、刪除商品
- 結帳：套用優惠券、建立訂單

## 後台功能介紹
- 產品：新增、刪除、編輯產品
- 訂單：查看、刪除、編輯訂單
- 優惠券：新增、刪除、編輯優惠券

## 環境變數

請將 `.env.example` 複製一份並命名為 `.env`，並將裡面的環境變數設定為你的值。

```bash
cp .env.example .env
```

### 安裝套件

```bash
npm install
```

### 啟動開發環境

```bash
npm run dev
```

### 打包專案

```bash
npm run build
```

### 部署專案

```bash
npm run deploy
```
## 套件

- axios (^1.6.5)
- bootstrap (^5.3.2)
- bootstrap-icons (^1.11.3)
- dotenv (^16.3.1)
- pinia (^2.1.7)
- vue (^3.3.11)
- vue-router (^4.2.5)
- vee-validate (^4.12.6)
- vue-loading-overlay (^6.0.4)
- vee-validate/i18n (^4.12.6")
- vee-validate/rules(^4.12.6)
- @vitejs/plugin-vue (^4.5.2)
- eslint (^8.49.0)
- eslint-config-standard (^^17.1.0)
- eslint-import-resolver-alias (^1.1.2)
- eslint-plugin-import (^2.29.1)
- eslint-plugin-n (^16.6.2)
- eslint-plugin-promise (^6.1.1)
- eslint-plugin-vue (^9.20.1)
- gh-pages (^6.1.1)
- sass (^1.69.7)
- swiper (^11.0.7)
- vite (^5.0.10)
- vite-plugin-eslint (^1.8.1)

## gh-pages 部署說明

內建預設是使用 gh-pages 進行部署，因此只需要在專案根目錄下執行以下指令即可。

```bash
npm run deploy
```
