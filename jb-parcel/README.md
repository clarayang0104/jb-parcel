# JB 代收包裹 — 部署指南

## 文件夹结构
```
jb-parcel/
├── package.json
├── vercel.json
├── public/
│   └── index.html
└── src/
    ├── index.js
    ├── firebase.js   ← Firebase config & storage
    └── App.jsx       ← 主要 app 代码
```

## 部署步骤

### 1. 上传到 GitHub
1. 去 github.com → New repository → 名字填 "jb-parcel" → Create
2. 把整个 jb-parcel 文件夹上传（点 "uploading an existing file"）
3. 选择所有文件拖进去 → Commit changes

### 2. 部署到 Vercel
1. 去 vercel.com → Sign up with GitHub
2. 点 "Add New Project" → 选你的 jb-parcel repo
3. Framework 选 "Create React App"
4. 点 Deploy → 等 2-3 分钟
5. 拿到你的网址！例如 https://jb-parcel.vercel.app

### 3. 完成！
- 网址可以直接分享给顾客
- 数据存在 Firebase，不会消失
- 后台密码: admin888

## 注意事项
- Firebase test mode 30天后需要更新 Firestore Rules
- 到 Firebase Console → Firestore → Rules，把日期改远一点
