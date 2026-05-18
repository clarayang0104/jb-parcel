import { useState, useEffect } from "react";
import { S } from "./firebase";

const ADMIN_PW = "admin888";
const AVATARS = ["🐱","🐶","🦊","🐼","🐨","🦁","🐸","🐧","🦄","🐙","🌸","⭐","🍓","🎀","🌈","💎"];
const PLATFORMS = ["Shopee","Lazada","Taobao","Qoo10","Other"];
const SYM = { SGD:"SGD ", MYR:"RM ", USD:"US$ " };

const TX = {
  zh: {
    app:"JB 代收包裹", tag:"每周末发货 · Taman Sentosa, JB", tagline:"新加坡人 JB 网购最佳拍档",
    login:"登入", logging:"登入中...", phone:"手机号码", pw:"密码", noAcc:"还没账号？", reg:"免费注册", forgot:"忘记密码？", admin:"🔧 商家后台",
    regTitle:"注册会员", regSub:"推荐朋友注册双方各得 50 积分！",
    name:"姓名 *", email:"电邮（选填）", pwLabel:"密码 *", refPhone:"推荐人手机号（选填）",
    bday:"生日（选填）", bdaySub:"生日月份可获积分礼", mon:"月份", yr:"年份",
    secQ:"安全问题 *", secQsub:"忘记密码时用于验证", secA:"你的答案（不区分大小写）",
    doReg:"立即注册 🎉", reging:"注册中...",
    nav:{ home:"主页", parcels:"包裹", points:"积分", guide:"教学", settings:"设置" },
    hello:"你好，", logout:"登出", ptsBal:"积分余额", addr:"JB 收货地址代码",
    upgTo:"升级到", more:"再", items:"件",
    stats:["总包裹数","总消费","待处理","积分倍率"],
    actions:[["addParcel","📬","登记新包裹","填写 Tracking Number",true],["parcels","📋","我的包裹","查看状态和报价",false],["guide","📖","如何使用","详细教学和价格",false],["points","🪙","积分中心","查看积分和兑换",false]],
    newQuote:"有新报价待付款！", newQuoteSub:"件包裹等待付款",
    parcelsTitle:"📋 我的包裹", addBtn:"+ 新增", emptyParcels:"还没有包裹记录", firstParcel:"登记第一个 →",
    platform:"购物平台", tracking:"Tracking Number *", desc:"包裹描述 *", weight:"预计重量 (kg)",
    svcType:"取货方式 *", pickup:"🏃 自取", delivery:"🚚 送货进新加坡",
    zone:"新加坡送货区域 *", delivAddr:"新加坡送货地址 *",
    submit:"提交登记 📦", submitting:"提交中...", submitNote:"提交后商家会确认并发送报价",
    inspectNote:"我们会在发货前开箱检查，确保符合新加坡海关规定。",
    ptsTitle:"🪙 积分中心", redeemTitle:"🎁 积分兑换奖励", earnTitle:"📊 赚积分方式",
    noRewards:"暂无兑换奖励", confirmRedeem:"确认兑换", confirmSub:"兑换后积分将立即扣除",
    afterBal:"兑换后余额：", doRedeem:"确认兑换 →", cancelBtn:"取消",
    notEnough:"积分不足", tierReq:"等级不足", soldOut:"已兑完", redeemBtn:"兑换",
    earnRows:[["💵","每消费 SGD 1","= 1 积分"],["📦","每寄 1 件","= 额外 2 积分"],["👥","推荐朋友","= 50 积分"],["🎂","生日礼","金100 / 白金300"]],
    guideTitle:"📖 如何使用", guideSub:"简单 4 步，轻松代收包裹",
    pricing:"💰 参考价格", pickupLabel:"📦 自取（JB 仓库）", deliveryLabel:"🚚 送货进新加坡（每周末）", cutoffLabel:"截单时间",
    steps:[{i:"📝",t:"注册账号，获取专属地址",d:"注册后你会获得专属收货代码，这就是你在 JB 的收货地址代码。"},{i:"🛒",t:"网购时填写我们的 JB 地址",d:"在 Shopee MY、Lazada MY 或 Taobao 下单时，填写我们的 JB 仓库地址。"},{i:"📬",t:"登记 Tracking Number",d:"包裹寄出后，回到 App 点「登记新包裹」，填入 Tracking Number 并选自取或送货。"},{i:"✅",t:"收到报价后付款取件",d:"商家确认收到包裹后发送报价，你付款后安排自取或等待送货上门。"}],
    settingsTitle:"⚙️ 设置", langLabel:"语言", currLabel:"显示货币", editName:"修改名字", editAvatar:"更换头像",
    newName:"新名字", save:"保存", saved:"已保存 ✅", chooseAvatar:"选择头像", doLogout:"登出账号",
    fpTitle:"忘记密码", fpSteps:["输入你的注册手机号","回答安全问题以验证身份","设置新密码"],
    fpNext:"下一步 →", fpVerify:"验证答案 →", fpReset:"重置密码 ✓", fpResetting:"重置中...",
    fpNewPw:"新密码", fpConfirmPw:"确认新密码", fpSecQLabel:"安全问题：",
    fpNotFound:"找不到此号码的账号", fpNoSecQ:"此账号未设置安全问题，请联系商家重置密码",
    fpWrongAns:"答案不正确", fpPwShort:"密码至少 6 位", fpPwMismatch:"两次密码不一致", fpSuccess:"密码已重置！请重新登入 ✅",
    adminPwLabel:"后台密码", enterAdmin:"进入后台 →",
    tiers:{ normal:"普通会员", gold:"金会员", platinum:"白金会员" },
    tierIcons:{ normal:"⭐", gold:"🥇", platinum:"💎" },
    secQOpts:["你第一只宠物的名字？","你小学的名字？","你妈妈的名字？","你出生的城市？","你最喜欢的食物？"],
    months:["1月","2月","3月","4月","5月","6月","7月","8月","9月","10月","11月","12月"],
    statuses:{ pending:"等待入仓", received:"已入仓", inspecting:"检查中 🔍", quoted:"待付款 💰", paid:"已付款", ready:"可取/待送出", delivered:"已送达 ✅" },
    quoteLabel:"报价", contactPay:"确认并联系付款 →", contactMsg:"请联系客服付款 😊",
    adminReset:"重置密码", adminResetBtn:"重置",
    overstayLabel:"超期存放（14天后）",
  },
  en: {
    app:"JB Parcel Hub", tag:"Weekend delivery · Taman Sentosa, JB", tagline:"Your JB Shopping Partner",
    login:"Sign In", logging:"Signing in...", phone:"Phone Number", pw:"Password", noAcc:"No account?", reg:"Register Free", forgot:"Forgot password?", admin:"🔧 Admin",
    regTitle:"Create Account", regSub:"Refer a friend — both get 50 pts!",
    name:"Full Name *", email:"Email (optional)", pwLabel:"Password *", refPhone:"Referral phone (optional)",
    bday:"Birthday (optional)", bdaySub:"Get bonus pts on your birthday month", mon:"Month", yr:"Year",
    secQ:"Security Question *", secQsub:"Used to verify identity", secA:"Your answer (not case sensitive)",
    doReg:"Register Now 🎉", reging:"Registering...",
    nav:{ home:"Home", parcels:"Parcels", points:"Points", guide:"Guide", settings:"Settings" },
    hello:"Hello, ", logout:"Logout", ptsBal:"Points Balance", addr:"JB Delivery Code",
    upgTo:"Upgrade to", more:"more", items:" items",
    stats:["Total Parcels","Total Spent","Pending","Points Rate"],
    actions:[["addParcel","📬","Register Parcel","Enter Tracking Number",true],["parcels","📋","My Parcels","View status & quotes",false],["guide","📖","How To Use","Guide & pricing",false],["points","🪙","Points Center","View & redeem points",false]],
    newQuote:"New quote pending!", newQuoteSub:" parcel(s) awaiting payment",
    parcelsTitle:"📋 My Parcels", addBtn:"+ Add", emptyParcels:"No parcel records yet", firstParcel:"Register first →",
    platform:"Platform", tracking:"Tracking Number *", desc:"Description *", weight:"Est. Weight (kg)",
    svcType:"Method *", pickup:"🏃 Self Pickup", delivery:"🚚 Deliver to SG",
    zone:"Delivery Zone *", delivAddr:"Singapore Address *",
    submit:"Submit Parcel 📦", submitting:"Submitting...", submitNote:"Merchant will quote after receiving parcel",
    inspectNote:"We inspect all parcels before delivery to ensure customs compliance.",
    ptsTitle:"🪙 Points Center", redeemTitle:"🎁 Redeem Rewards", earnTitle:"📊 Earn Points",
    noRewards:"No rewards available yet", confirmRedeem:"Confirm Redemption", confirmSub:"Points deducted immediately",
    afterBal:"Balance after: ", doRedeem:"Confirm →", cancelBtn:"Cancel",
    notEnough:"Insufficient Points", tierReq:"Tier Required", soldOut:"Sold Out", redeemBtn:"Redeem",
    earnRows:[["💵","Every SGD 1 spent","= 1 pt"],["📦","Every parcel","= +2 pts"],["👥","Refer a friend","= 50 pts"],["🎂","Birthday gift","Gold:100/Plat:300"]],
    guideTitle:"📖 How To Use", guideSub:"4 easy steps",
    pricing:"💰 Pricing", pickupLabel:"📦 Self Pickup (JB)", deliveryLabel:"🚚 Delivery to SG (weekends)", cutoffLabel:"Cutoff",
    steps:[{i:"📝",t:"Register & Get Address",d:"After registering you'll get a unique delivery code as your JB address."},{i:"🛒",t:"Use Our JB Address",d:"When shopping on Shopee MY, Lazada MY or Taobao, use our JB warehouse address."},{i:"📬",t:"Register Tracking Number",d:"After shipping, go to Register Parcel, enter your tracking number, choose pickup or delivery."},{i:"✅",t:"Pay & Collect",d:"Merchant quotes after receiving. Pay to arrange pickup or delivery."}],
    settingsTitle:"⚙️ Settings", langLabel:"Language", currLabel:"Currency", editName:"Edit Name", editAvatar:"Change Avatar",
    newName:"New Name", save:"Save", saved:"Saved ✅", chooseAvatar:"Choose Avatar", doLogout:"Logout",
    fpTitle:"Forgot Password", fpSteps:["Enter registered phone","Answer security question","Set new password"],
    fpNext:"Next →", fpVerify:"Verify →", fpReset:"Reset Password ✓", fpResetting:"Resetting...",
    fpNewPw:"New Password", fpConfirmPw:"Confirm Password", fpSecQLabel:"Security Question:",
    fpNotFound:"No account found", fpNoSecQ:"No security question set. Contact merchant.", fpWrongAns:"Incorrect answer", fpPwShort:"Min 6 characters", fpPwMismatch:"Passwords don't match", fpSuccess:"Password reset! Please sign in ✅",
    adminPwLabel:"Admin Password", enterAdmin:"Enter Admin →",
    tiers:{ normal:"Member", gold:"Gold Member", platinum:"Platinum" },
    tierIcons:{ normal:"⭐", gold:"🥇", platinum:"💎" },
    secQOpts:["First pet's name?","Primary school?","Mother's name?","Birth city?","Favourite food?"],
    months:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],
    statuses:{ pending:"Awaiting", received:"Received", inspecting:"Inspecting 🔍", quoted:"Quoted 💰", paid:"Paid", ready:"Ready", delivered:"Delivered ✅" },
    quoteLabel:"Quote", contactPay:"Confirm & Pay →", contactMsg:"Contact merchant to pay",
    adminReset:"Reset Password", adminResetBtn:"Reset",
    overstayLabel:"Overstay (14+ days)",
  },
  bm: {
    app:"JB Pusat Parsel", tag:"Penghantaran hujung minggu · Taman Sentosa", tagline:"Rakan Beli-belah JB Anda",
    login:"Log Masuk", logging:"Sedang log masuk...", phone:"Nombor Telefon", pw:"Kata Laluan", noAcc:"Belum ada akaun?", reg:"Daftar Percuma", forgot:"Lupa kata laluan?", admin:"🔧 Admin",
    regTitle:"Daftar Akaun", regSub:"Rujuk rakan — kedua-dua dapat 50 mata!",
    name:"Nama Penuh *", email:"E-mel (pilihan)", pwLabel:"Kata Laluan *", refPhone:"Telefon perujuk (pilihan)",
    bday:"Hari Jadi (pilihan)", bdaySub:"Dapat mata bonus bulan hari jadi", mon:"Bulan", yr:"Tahun",
    secQ:"Soalan Keselamatan *", secQsub:"Untuk mengesahkan identiti", secA:"Jawapan anda",
    doReg:"Daftar Sekarang 🎉", reging:"Mendaftar...",
    nav:{ home:"Utama", parcels:"Parsel", points:"Mata", guide:"Panduan", settings:"Tetapan" },
    hello:"Hai, ", logout:"Log Keluar", ptsBal:"Baki Mata", addr:"Kod Alamat JB",
    upgTo:"Naik taraf ke", more:"lagi", items:" item",
    stats:["Jumlah Parsel","Jumlah Belanja","Tertangguh","Kadar Mata"],
    actions:[["addParcel","📬","Daftar Parsel","Masukkan Tracking Number",true],["parcels","📋","Parsel Saya","Lihat status & sebut harga",false],["guide","📖","Cara Guna","Panduan & harga",false],["points","🪙","Pusat Mata","Lihat & tebus mata",false]],
    newQuote:"Sebut harga baru menunggu!", newQuoteSub:" parsel menunggu bayaran",
    parcelsTitle:"📋 Parsel Saya", addBtn:"+ Tambah", emptyParcels:"Tiada rekod parsel", firstParcel:"Daftar pertama →",
    platform:"Platform", tracking:"Nombor Tracking *", desc:"Penerangan *", weight:"Berat Anggaran (kg)",
    svcType:"Kaedah *", pickup:"🏃 Ambil Sendiri", delivery:"🚚 Hantar ke SG",
    zone:"Zon Penghantaran *", delivAddr:"Alamat Singapura *",
    submit:"Hantar Parsel 📦", submitting:"Menghantar...", submitNote:"Peniaga akan sebut harga selepas terima parsel",
    inspectNote:"Kami memeriksa semua parsel sebelum penghantaran.",
    ptsTitle:"🪙 Pusat Mata", redeemTitle:"🎁 Tebus Ganjaran", earnTitle:"📊 Cara Dapat Mata",
    noRewards:"Tiada ganjaran buat masa ini", confirmRedeem:"Sahkan Penebusan", confirmSub:"Mata akan ditolak serta-merta",
    afterBal:"Baki selepas: ", doRedeem:"Sahkan →", cancelBtn:"Batal",
    notEnough:"Mata Tidak Cukup", tierReq:"Tahap Diperlukan", soldOut:"Habis", redeemBtn:"Tebus",
    earnRows:[["💵","Setiap SGD 1","= 1 mata"],["📦","Setiap parsel","= +2 mata"],["👥","Rujuk rakan","= 50 mata"],["🎂","Hadiah hari jadi","Emas:100/Plat:300"]],
    guideTitle:"📖 Cara Guna", guideSub:"4 langkah mudah",
    pricing:"💰 Harga", pickupLabel:"📦 Ambil Sendiri (JB)", deliveryLabel:"🚚 Hantar ke SG (hujung minggu)", cutoffLabel:"Masa Tutup",
    steps:[{i:"📝",t:"Daftar & Dapatkan Alamat",d:"Selepas daftar, anda akan dapat kod penghantaran unik sebagai alamat JB anda."},{i:"🛒",t:"Guna Alamat JB Kami",d:"Semasa membeli di Shopee MY, Lazada MY atau Taobao, gunakan alamat gudang JB kami."},{i:"📬",t:"Daftar Nombor Tracking",d:"Selepas dihantar, pergi ke Daftar Parsel, masukkan nombor tracking dan pilih kaedah."},{i:"✅",t:"Bayar & Ambil",d:"Peniaga hantar sebut harga selepas terima parsel. Bayar untuk atur pengambilan."}],
    settingsTitle:"⚙️ Tetapan", langLabel:"Bahasa", currLabel:"Mata Wang", editName:"Edit Nama", editAvatar:"Tukar Avatar",
    newName:"Nama Baharu", save:"Simpan", saved:"Tersimpan ✅", chooseAvatar:"Pilih Avatar", doLogout:"Log Keluar",
    fpTitle:"Lupa Kata Laluan", fpSteps:["Masukkan telefon berdaftar","Jawab soalan keselamatan","Tetapkan kata laluan baru"],
    fpNext:"Seterusnya →", fpVerify:"Sahkan →", fpReset:"Tetapkan Semula ✓", fpResetting:"Menetapkan...",
    fpNewPw:"Kata Laluan Baru", fpConfirmPw:"Sahkan Kata Laluan", fpSecQLabel:"Soalan Keselamatan:",
    fpNotFound:"Tiada akaun dijumpai", fpNoSecQ:"Tiada soalan keselamatan. Hubungi peniaga.", fpWrongAns:"Jawapan tidak tepat", fpPwShort:"Sekurang-kurangnya 6 aksara", fpPwMismatch:"Kata laluan tidak sepadan", fpSuccess:"Kata laluan ditetapkan! Sila log masuk ✅",
    adminPwLabel:"Kata Laluan Admin", enterAdmin:"Masuk Admin →",
    tiers:{ normal:"Ahli Biasa", gold:"Ahli Emas", platinum:"Ahli Platinum" },
    tierIcons:{ normal:"⭐", gold:"🥇", platinum:"💎" },
    secQOpts:["Nama haiwan peliharaan pertama?","Nama sekolah rendah?","Nama ibu?","Bandar kelahiran?","Makanan kegemaran?"],
    months:["Jan","Feb","Mac","Apr","Mei","Jun","Jul","Ogo","Sep","Okt","Nov","Dis"],
    statuses:{ pending:"Menunggu", received:"Diterima", inspecting:"Memeriksa 🔍", quoted:"Sebut Harga 💰", paid:"Dibayar", ready:"Sedia", delivered:"Dihantar ✅" },
    quoteLabel:"Sebut Harga", contactPay:"Sahkan & Bayar →", contactMsg:"Hubungi peniaga untuk bayar",
    adminReset:"Tetapkan Semula", adminResetBtn:"Tetapkan",
    overstayLabel:"Lebih masa (14+ hari)",
  }
};

const ST = {
  pending:    { color:"#94a3b8", bg:"#f1f5f9", border:"#cbd5e1" },
  received:   { color:"#3b82f6", bg:"#eff6ff", border:"#bfdbfe" },
  inspecting: { color:"#f59e0b", bg:"#fffbeb", border:"#fde68a" },
  quoted:     { color:"#8b5cf6", bg:"#f5f3ff", border:"#ddd6fe" },
  paid:       { color:"#10b981", bg:"#ecfdf5", border:"#a7f3d0" },
  ready:      { color:"#f97316", bg:"#fff7ed", border:"#fed7aa" },
  delivered:  { color:"#ec4899", bg:"#fdf2f8", border:"#fbcfe8" },
};

const DEF_PRICING = {
  pickup: { tier1:{ qty:"1–3 件", price:5 }, tier2:{ qty:"4 件以上", price:4 }, overstay:2 },
  delivery: {
    z1:{ label:"Zone 1", area:"Woodlands / Admiralty", s:6,  m:9,  h:2.8 },
    z2:{ label:"Zone 2", area:"Yishun / Jurong / CCK", s:8,  m:12, h:3.5 },
    z3:{ label:"Zone 3", area:"Tampines / Bedok",      s:10, m:15, h:4   },
  },
  cutoff:{ normal:"每周四晚 12 点", gold:"每周五晚 12 点", platinum:"每周六早上" },
};
const DEF_REWARDS = [
  { id:"r1", title:"SGD 2 折扣",    desc:"结账时扣除 SGD 2",  points:100, tier:"all",      stock:-1, redeemed:0 },
  { id:"r2", title:"免费寄件 Zone 1", desc:"免费寄 1 件",      points:500, tier:"all",      stock:-1, redeemed:0 },
  { id:"r3", title:"免费寄任何 Zone", desc:"适用所有区域",      points:1000, tier:"gold",    stock:-1, redeemed:0 },
];



function phoneKey(c, raw) {
  const p = raw.replace(/\D/g,"");
  return c === "SG" ? "65"+(p.startsWith("65")?p.slice(2):p) : "60"+(p.startsWith("60")?p.slice(2):p);
}
function getTier(n,s) {
  if (n>=150||s>=800) return { key:"platinum", color:"#7c3aed", light:"#f5f3ff", mult:2 };
  if (n>=50||s>=300)  return { key:"gold",     color:"#d97706", light:"#fffbeb", mult:1.5 };
  return                     { key:"normal",   color:"#ec4899", light:"#fdf2f8", mult:1 };
}
function getNext(n,s) {
  if (n>=150||s>=800) return null;
  if (n>=50||s>=300)  return { key:"platinum", pl:Math.max(0,150-n), sl:Math.max(0,800-s) };
  return                     { key:"gold",     pl:Math.max(0,50-n),  sl:Math.max(0,300-s) };
}
function checkBday(u, tier) {
  if (!u.birthMonth) return 0;
  const now = new Date();
  if (parseInt(u.birthMonth)===now.getMonth()+1 && u.lastBdYear!==now.getFullYear())
    return tier.mult===2 ? 300 : tier.mult===1.5 ? 100 : 0;
  return 0;
}

// ── UI atoms ──────────────────────────────────────────────────────
function Lbl({ children }) {
  return (
    <label style={{fontSize:11,fontWeight:700,color:"#374151",marginBottom:6,display:"block"}}>
      {children}
    </label>
  );
}

function Inp({ label, ...p }) {
  return (
    <div>
      {label && <Lbl>{label}</Lbl>}
      <input
        style={{width:"100%",border:"1.5px solid #d1d5db",borderRadius:12,padding:"11px 14px",fontSize:13,color:"#111",background:"#fff",outline:"none",caretColor:"#ec4899",boxSizing:"border-box"}}
        onFocus={e => { e.target.style.borderColor="#ec4899"; e.target.style.boxShadow="0 0 0 3px rgba(236,72,153,0.1)"; }}
        onBlur={e  => { e.target.style.borderColor="#d1d5db"; e.target.style.boxShadow="none"; }}
        {...p}
      />
    </div>
  );
}

function PhoneInp({ val, country, onCountry, onPhone, placeholder }) {
  return (
    <div style={{display:"flex",gap:8}}>
      <div style={{display:"flex",flexShrink:0,border:"1.5px solid #d1d5db",borderRadius:12,overflow:"hidden"}}>
        {[["SG","🇸🇬"],["MY","🇲🇾"]].map(([c,f]) => (
          <button key={c} onClick={() => onCountry(c)} style={{padding:"11px 12px",fontSize:14,border:"none",cursor:"pointer",background:country===c?"#ec4899":"#f9fafb",color:country===c?"#fff":"#374151",fontWeight:country===c?"700":"400"}}>{f}</button>
        ))}
      </div>
      <input
        style={{flex:1,border:"1.5px solid #d1d5db",borderRadius:12,padding:"11px 14px",fontSize:13,color:"#111",background:"#fff",outline:"none",caretColor:"#ec4899"}}
        onFocus={e => { e.target.style.borderColor="#ec4899"; e.target.style.boxShadow="0 0 0 3px rgba(236,72,153,0.1)"; }}
        onBlur={e  => { e.target.style.borderColor="#d1d5db"; e.target.style.boxShadow="none"; }}
        placeholder={placeholder} value={val} onChange={e => onPhone(e.target.value)}
      />
    </div>
  );
}

function Btn({ children, ghost=false, disabled=false, onClick, style={} }) {
  return (
    <button onClick={onClick} disabled={disabled} style={{width:"100%",padding:"13px",borderRadius:14,fontWeight:700,fontSize:13,cursor:disabled?"not-allowed":"pointer",border:ghost?"1.5px solid #e5e7eb":"none",background:disabled?"#f3f4f6":ghost?"#fff":"linear-gradient(135deg,#ec4899,#f97316)",color:disabled?"#9ca3af":ghost?"#374151":"#fff",boxShadow:disabled||ghost?"none":"0 6px 20px rgba(236,72,153,0.3)",...style}}>
      {children}
    </button>
  );
}

function Card({ children, style={} }) {
  return (
    <div style={{background:"#fff",border:"1.5px solid #f3f4f6",borderRadius:20,padding:16,boxShadow:"0 2px 12px rgba(0,0,0,0.05)",...style}}>
      {children}
    </div>
  );
}

function StatusBadge({ status, t }) {
  const st = ST[status] || ST.pending;
  const label = t.statuses[status] || status;
  return (
    <span style={{fontSize:11,fontWeight:700,padding:"3px 10px",borderRadius:20,background:st.bg,color:st.color,border:"1px solid "+st.border,whiteSpace:"nowrap"}}>
      {label}
    </span>
  );
}

// ── Main ──────────────────────────────────────────────────────────
export default function App() {
  const [lang, setLang]     = useState("zh");
  const [curr, setCurr]     = useState("SGD");
  const [mode, setMode]     = useState("user");
  const [screen, setScreen] = useState("login");
  const [aTab, setATab]     = useState("overview");

  const [userId,  setUserId]  = useState(null);
  const [uData,   setUData]   = useState(null);
  const [parcels, setParcels] = useState([]);
  const [aData,   setAData]   = useState({ parcels:[], users:[] });
  const [loading, setLoading] = useState(false);
  const [toast,   setToast]   = useState(null);

  const [pricing,      setPricing]      = useState(DEF_PRICING);
  const [pricingEdit,  setPricingEdit]  = useState(DEF_PRICING);
  const [rewards,      setRewards]      = useState(DEF_REWARDS);
  const [rewardsEdit,  setRewardsEdit]  = useState(DEF_REWARDS);
  const [rewardForm,   setRewardForm]   = useState({ title:"", desc:"", points:"", tier:"all", stock:"" });
  const [redeemTarget, setRedeemTarget] = useState(null);
  const [quoteMap,     setQuoteMap]     = useState({});
  const [resetPwMap,   setResetPwMap]   = useState({});
  const [showAvatars,  setShowAvatars]  = useState(false);
  const [settingsEdit, setSettingsEdit] = useState({ name:"", avatar:"" });

  const [lf, setLf] = useState({ phone:"", country:"SG", password:"" });
  const [rf, setRf] = useState({ name:"", phone:"", country:"SG", email:"", password:"", ref:"", bm:"", by:"", secQ:"", secA:"" });
  const [pf, setPf] = useState({ platform:"", tracking:"", desc:"", weight:"", type:"pickup", zone:"", addr:"" });
  const [ap, setAp] = useState("");
  const [fpStep, setFpStep] = useState(1);
  const [fpData, setFpData] = useState({ phone:"", country:"SG", answer:"", newPw:"", confirmPw:"", found:null });

  const t   = TX[lang];
  const sym = SYM[curr];

  useEffect(() => {
    S.get("config:pricing").then(p => { if (p) { setPricing(p); setPricingEdit(JSON.parse(JSON.stringify(p))); } });
    S.get("config:rewards").then(r => { if (r) { setRewards(r); setRewardsEdit(JSON.parse(JSON.stringify(r))); } });
  }, []);

  function toast2(msg, type="success") { setToast({msg,type}); setTimeout(()=>setToast(null), 3000); }

  async function loadUser(key) {
    const u = await S.get("user:"+key);
    setUData(u);
    const ks = await S.list("parcel:"+key+":");
    const ps = (await Promise.all(ks.map(k => S.get(k)))).filter(Boolean).sort((a,b) => b.createdAt-a.createdAt);
    setParcels(ps);
    const p = await S.get("config:pricing"); if (p) { setPricing(p); setPricingEdit(JSON.parse(JSON.stringify(p))); }
    const r = await S.get("config:rewards"); if (r) { setRewards(r); setRewardsEdit(JSON.parse(JSON.stringify(r))); }
  }

  async function loadAdmin() {
    const uk = await S.list("user:");
    const users = (await Promise.all(uk.map(k => S.get(k)))).filter(Boolean).filter(u => !u.isAdmin);
    const pk = await S.list("parcel:");
    const ps = (await Promise.all(pk.map(k => S.get(k)))).filter(Boolean).sort((a,b) => b.createdAt-a.createdAt);
    setAData({ parcels:ps, users });
  }

  async function doLogin() {
    if (!lf.phone||!lf.password) return toast2("请填写手机号和密码","error");
    setLoading(true);
    const key = phoneKey(lf.country, lf.phone);
    const u = await S.get("user:"+key);
    setLoading(false);
    if (!u||u.password!==lf.password) return toast2(lang==="en"?"Wrong phone or password":"手机号或密码错误","error");
    const tier = getTier(u.totalParcels, u.totalSpend);
    const bdBonus = checkBday(u, tier);
    if (bdBonus > 0) {
      const now = new Date();
      const upd = {...u, points:u.points+bdBonus, lastBdYear:now.getFullYear()};
      await S.set("user:"+key, upd);
      u.points = upd.points; u.lastBdYear = upd.lastBdYear;
      toast2("🎂 "+(lang==="en"?"Happy Birthday! Got ":"生日快乐！获得 ")+bdBonus+" pts!");
    }
    setUserId(key); await loadUser(key); setScreen("dash");
    if (!bdBonus) toast2((lang==="en"?"Welcome back, ":"欢迎回来，")+u.name+"！");
  }

  async function doReg() {
    if (!rf.name||!rf.phone||!rf.password) return toast2(lang==="en"?"Fill required fields":"请填写必填项","error");
    if (rf.phone.replace(/\D/g,"").length < 7) return toast2(lang==="en"?"Invalid phone":"无效手机号","error");
    const key = phoneKey(rf.country, rf.phone);
    if (await S.get("user:"+key)) return toast2(lang==="en"?"Phone already registered":"此号码已注册","error");
    setLoading(true);
    let bonus = 0;
    if (rf.ref) {
      for (const c of ["SG","MY"]) {
        const rk = phoneKey(c, rf.ref);
        const ru = await S.get("user:"+rk);
        if (ru) { await S.set("user:"+rk, {...ru, points:ru.points+50}); bonus=50; break; }
      }
    }
    const nu = { name:rf.name, phone:key, country:rf.country, email:rf.email, password:rf.password, points:bonus, totalParcels:0, totalSpend:0, joinedAt:Date.now(), address:"TBS-"+rf.phone.replace(/\D/g,"").slice(-4).toUpperCase(), birthMonth:rf.bm||null, birthYear:rf.by||null, lastBdYear:null, secQ:rf.secQ||null, secA:rf.secA||null, avatar:"🐱", displayName:rf.name };
    await S.set("user:"+key, nu);
    setLoading(false);
    setUserId(key); setUData(nu); setParcels([]); setScreen("dash");
    toast2((lang==="en"?"Registered! ":"注册成功！")+(bonus?(lang==="en"?"Got 50 pts 🎉":"获得 50 积分 🎉"):(lang==="en"?"Welcome 🎉":"欢迎加入 🎉")));
  }

  function doLogout() { setUserId(null); setUData(null); setParcels([]); setLf({phone:"",country:"SG",password:""}); setScreen("login"); }

  async function fpCheck() {
    if (!fpData.phone) return toast2(t.fpNotFound,"error");
    setLoading(true);
    const key = phoneKey(fpData.country, fpData.phone);
    const u = await S.get("user:"+key);
    setLoading(false);
    if (!u) return toast2(t.fpNotFound,"error");
    if (!u.secQ||!u.secA) return toast2(t.fpNoSecQ,"error");
    setFpData(d => ({...d, found:u})); setFpStep(2);
  }
  async function fpVerify() {
    if (!fpData.answer) return toast2(t.fpWrongAns,"error");
    if (fpData.answer.trim().toLowerCase() !== fpData.found.secA.trim().toLowerCase()) return toast2(t.fpWrongAns,"error");
    setFpStep(3);
  }
  async function fpReset() {
    if (!fpData.newPw||fpData.newPw.length<6) return toast2(t.fpPwShort,"error");
    if (fpData.newPw!==fpData.confirmPw) return toast2(t.fpPwMismatch,"error");
    setLoading(true);
    const key = phoneKey(fpData.country, fpData.phone);
    await S.set("user:"+key, {...fpData.found, password:fpData.newPw});
    setLoading(false);
    toast2(t.fpSuccess);
    setFpData({phone:"",country:"SG",answer:"",newPw:"",confirmPw:"",found:null}); setFpStep(1); setScreen("login");
  }

  async function doSubmit() {
    if (!pf.tracking||!pf.desc) return toast2(lang==="en"?"Fill tracking & description":"请填写 Tracking 和描述","error");
    if (pf.type==="delivery" && (!pf.zone||!pf.addr)) return toast2(lang==="en"?"Fill zone & address":"请选择区域和填写地址","error");
    setLoading(true);
    const p = { id:"P"+Date.now(), phone:userId, platform:pf.platform, tracking:pf.tracking.toUpperCase(), description:pf.desc, weight:parseFloat(pf.weight)||0, deliveryType:pf.type, zone:pf.zone, address:pf.addr, status:"pending", fee:null, earnedPoints:0, createdAt:Date.now() };
    await S.set("parcel:"+userId+":"+p.id, p);
    const nu = {...uData, totalParcels:uData.totalParcels+1};
    await S.set("user:"+userId, nu); setUData(nu);
    setParcels(prev => [p, ...prev]);
    setPf({platform:"",tracking:"",desc:"",weight:"",type:"pickup",zone:"",addr:""});
    setLoading(false); setScreen("parcels");
    toast2(lang==="en"?"Submitted! Awaiting quote 📦":"已提交！等待商家报价 📦");
  }

  async function doRedeem(reward) {
    if (!uData||uData.points<reward.points) return toast2(t.notEnough,"error");
    const tier = getTier(uData.totalParcels, uData.totalSpend);
    if (reward.tier==="gold"&&tier.mult<1.5) return toast2(t.tierReq,"error");
    if (reward.tier==="platinum"&&tier.mult<2) return toast2(t.tierReq,"error");
    if (reward.stock!==-1&&reward.redeemed>=reward.stock) return toast2(t.soldOut,"error");
    const rec = { id:"red"+Date.now(), userId, rewardTitle:reward.title, pointsUsed:reward.points, redeemedAt:Date.now() };
    await S.set("redemption:"+rec.id, rec);
    const nu = {...uData, points:uData.points-reward.points};
    await S.set("user:"+userId, nu); setUData(nu);
    const ur = (rewards||[]).map(r => r.id===reward.id ? {...r,redeemed:r.redeemed+1} : r);
    await S.set("config:rewards", ur); setRewards(ur);
    setRedeemTarget(null);
    toast2(lang==="en"?"Redeemed! Contact merchant 🎉":"兑换成功！请联系客服核实 🎉");
  }

  async function saveSettings() {
    if (!uData) return;
    const nu = {...uData, displayName:settingsEdit.name||uData.displayName||uData.name, avatar:settingsEdit.avatar||uData.avatar||"🐱"};
    await S.set("user:"+userId, nu); setUData(nu);
    toast2(t.saved); setShowAvatars(false);
  }

  async function sendQuote(p, fee) {
    const f = parseFloat(fee);
    if (!f||f<=0) return toast2("请输入有效金额","error");
    const u = await S.get("user:"+p.phone);
    const tier = u ? getTier(u.totalParcels,u.totalSpend) : {mult:1};
    const pts = Math.floor(f*tier.mult)*2 + Math.floor(f);
    const up = {...p, status:"quoted", fee:f, earnedPoints:pts};
    await S.set("parcel:"+p.phone+":"+p.id, up);
    setAData(d => ({...d, parcels:d.parcels.map(x => x.id===p.id ? up : x)}));
    toast2("报价已发送 ✅");
  }

  async function updateStatus(p, s) {
    if (s==="paid"&&p.fee) {
      const u = await S.get("user:"+p.phone);
      if (u) {
        const tier = getTier(u.totalParcels, u.totalSpend);
        const pts = Math.floor(p.fee*tier.mult)*2 + Math.floor(p.fee);
        await S.set("user:"+p.phone, {...u, points:u.points+pts, totalSpend:u.totalSpend+p.fee});
      }
    }
    const up = {...p, status:s};
    await S.set("parcel:"+p.phone+":"+p.id, up);
    setAData(d => ({...d, parcels:d.parcels.map(x => x.id===p.id ? up : x)}));
    toast2("已更新 ✅");
  }

  async function adminReset(u, pw) {
    if (!pw||pw.length<6) return toast2("密码至少 6 位","error");
    await S.set("user:"+u.phone, {...u, password:pw});
    setResetPwMap(m => ({...m, [u.phone]:""}));
    await loadAdmin(); toast2(u.name+" 密码已重置 ✅");
  }

  async function savePricing() { await S.set("config:pricing", pricingEdit); setPricing(JSON.parse(JSON.stringify(pricingEdit))); toast2("价钱已更新 ✅"); }
  async function saveRewards()  { await S.set("config:rewards", rewardsEdit); setRewards(JSON.parse(JSON.stringify(rewardsEdit))); toast2("奖励已更新 ✅"); }
  async function addReward() {
    if (!rewardForm.title||!rewardForm.points) return toast2("请填写名称和积分","error");
    const nr = { id:"r"+Date.now(), title:rewardForm.title, desc:rewardForm.desc, points:parseInt(rewardForm.points), tier:rewardForm.tier, stock:rewardForm.stock?parseInt(rewardForm.stock):-1, redeemed:0 };
    setRewardsEdit(prev => [...(prev||[]), nr]);
    setRewardForm({title:"",desc:"",points:"",tier:"all",stock:""});
    toast2("已添加，记得保存 ✅");
  }

  const tier     = uData ? getTier(uData.totalParcels, uData.totalSpend) : null;
  const nextTier = uData ? getNext(uData.totalParcels, uData.totalSpend) : null;
  const progress = nextTier ? Math.min(100,(uData.totalParcels/(uData.totalParcels+nextTier.pl))*100) : 100;
  const navScreens = ["dash","parcels","addParcel","points","guide","settings"];
  const BG = "#f8f5f2";
  const revTotal   = aData.parcels.filter(p=>p.fee).reduce((s,p)=>s+(p.fee||0),0);
  const revDone    = aData.parcels.filter(p=>p.status==="delivered"&&p.fee).reduce((s,p)=>s+(p.fee||0),0);
  const pendCount  = aData.parcels.filter(p=>!["delivered"].includes(p.status)).length;
  const weekCount  = aData.parcels.filter(p=>Date.now()-p.createdAt<604800000).length;

  return (
    <div style={{minHeight:"100vh",background:BG,color:"#111",fontFamily:"system-ui,sans-serif"}}>

      {toast && (
        <div style={{position:"fixed",top:16,left:"50%",transform:"translateX(-50%)",zIndex:999,padding:"10px 20px",borderRadius:16,fontSize:13,fontWeight:700,boxShadow:"0 8px 30px rgba(0,0,0,0.15)",background:toast.type==="error"?"#ef4444":"#10b981",color:"#fff",whiteSpace:"nowrap"}}>
          {toast.msg}
        </div>
      )}

      {/* ════ ADMIN ════ */}
      {mode==="admin" && (
        <div style={{maxWidth:680,margin:"0 auto",padding:"20px 16px 100px"}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20}}>
            <div><div style={{fontSize:11,color:"#ec4899",fontWeight:700}}>🔧 Admin</div><div style={{fontSize:20,fontWeight:900}}>JB Parcel Hub</div></div>
            <button onClick={() => { setMode("user"); setScreen("login"); }} style={{fontSize:11,color:"#6b7280",border:"1.5px solid #e5e7eb",borderRadius:10,padding:"5px 12px",background:"#fff",cursor:"pointer"}}>Exit</button>
          </div>

          <div style={{display:"grid",gridTemplateColumns:"repeat(5,1fr)",gap:6,marginBottom:20}}>
            {[["overview","📊","概览"],["parcels","📦","包裹"],["members","👥","会员"],["pricing","🏷️","价钱"],["rewards","🎁","奖励"]].map(([s,i,l]) => (
              <button key={s} onClick={() => { setATab(s); loadAdmin(); }} style={{padding:"8px 4px",borderRadius:12,fontSize:10,fontWeight:700,display:"flex",flexDirection:"column",alignItems:"center",gap:3,cursor:"pointer",border:"1.5px solid",borderColor:aTab===s?"#ec4899":"#e5e7eb",background:aTab===s?"#ec4899":"#fff",color:aTab===s?"#fff":"#374151"}}>
                <span style={{fontSize:16}}>{i}</span>{l}
              </button>
            ))}
          </div>

          {/* Overview */}
          {aTab==="overview" && (
            <div>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:14}}>
                {[["📦","总包裹",aData.parcels.length+"件"],["📅","本周新增",weekCount+"件"],["🕐","待处理",pendCount+"件"],["👥","总会员",aData.users.length+"人"],["💰","总营收","SGD "+revTotal.toFixed(0)],["✅","已完成","SGD "+revDone.toFixed(0)]].map(([i,l,v]) => (
                  <Card key={l}><div style={{fontSize:22,marginBottom:4}}>{i}</div><div style={{fontSize:18,fontWeight:900}}>{v}</div><div style={{fontSize:11,color:"#6b7280"}}>{l}</div></Card>
                ))}
              </div>
            </div>
          )}

          {/* Parcels */}
          {aTab==="parcels" && (
            <div>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
                <div style={{fontWeight:900}}>包裹 ({aData.parcels.length})</div>
                <button onClick={loadAdmin} style={{fontSize:11,border:"1.5px solid #e5e7eb",borderRadius:8,padding:"4px 10px",background:"#fff",cursor:"pointer",color:"#6b7280"}}>刷新</button>
              </div>
              {aData.parcels.map(p => {
                const st = ST[p.status] || ST.pending;
                const u  = aData.users.find(x => x.phone===p.phone);
                const stLabel = TX.zh.statuses[p.status] || p.status;
                return (
                  <Card key={p.id} style={{marginBottom:10}}>
                    <div style={{display:"flex",justifyContent:"space-between",marginBottom:8}}>
                      <div>
                        <div style={{fontWeight:700,fontSize:13}}>{p.description}</div>
                        <div style={{fontSize:11,color:"#6b7280",fontFamily:"monospace"}}>{p.tracking}</div>
                        <div style={{fontSize:11,color:"#9ca3af"}}>{u?.displayName||u?.name||p.phone} · {p.platform}</div>
                      </div>
                      <span style={{fontSize:11,fontWeight:700,padding:"3px 10px",borderRadius:20,background:st.bg,color:st.color,border:"1px solid "+st.border,whiteSpace:"nowrap"}}>{stLabel}</span>
                    </div>
                    {["pending","received","inspecting"].includes(p.status) && (
                      <div style={{background:"#fdf2f8",borderRadius:10,padding:10,marginBottom:8,border:"1px solid #fbcfe8"}}>
                        <div style={{fontSize:11,fontWeight:700,color:"#ec4899",marginBottom:6}}>💰 发报价</div>
                        <div style={{display:"flex",gap:6}}>
                          <input placeholder={p.deliveryType==="pickup"?"RM":"SGD"} value={quoteMap[p.id]||""} onChange={e => setQuoteMap(m => ({...m,[p.id]:e.target.value}))} style={{flex:1,border:"1.5px solid #fbcfe8",borderRadius:8,padding:"7px 10px",fontSize:12,color:"#111",background:"#fff",outline:"none"}}/>
                          <button onClick={() => sendQuote(p, quoteMap[p.id]||"")} style={{background:"#ec4899",color:"#fff",border:"none",borderRadius:8,padding:"7px 12px",fontSize:11,fontWeight:700,cursor:"pointer"}}>发送</button>
                        </div>
                      </div>
                    )}
                    <div style={{display:"flex",gap:6}}>
                      <select value={p.status} onChange={e => updateStatus(p, e.target.value)} style={{flex:1,border:"1.5px solid #e5e7eb",borderRadius:8,padding:"7px 10px",fontSize:11,color:"#111",background:"#fff",outline:"none",cursor:"pointer"}}>
                        {Object.keys(TX.zh.statuses).map(k => (
                          <option key={k} value={k}>{TX.zh.statuses[k]}</option>
                        ))}
                      </select>
                      <button onClick={async () => { await S.del("parcel:"+p.phone+":"+p.id); setAData(d => ({...d,parcels:d.parcels.filter(x=>x.id!==p.id)})); }} style={{background:"#fff0f0",border:"1.5px solid #fecaca",borderRadius:8,padding:"7px 10px",color:"#ef4444",cursor:"pointer",fontSize:13}}>🗑</button>
                    </div>
                  </Card>
                );
              })}
            </div>
          )}

          {/* Members */}
          {aTab==="members" && (
            <div>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
                <div style={{fontWeight:900}}>会员 ({aData.users.length})</div>
                <button onClick={loadAdmin} style={{fontSize:11,border:"1.5px solid #e5e7eb",borderRadius:8,padding:"4px 10px",background:"#fff",cursor:"pointer",color:"#6b7280"}}>刷新</button>
              </div>
              {aData.users.map(u => {
                const t2 = getTier(u.totalParcels, u.totalSpend);
                return (
                  <Card key={u.phone} style={{marginBottom:10}}>
                    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8}}>
                      <div style={{display:"flex",alignItems:"center",gap:10}}>
                        <div style={{fontSize:24}}>{u.avatar||"🐱"}</div>
                        <div>
                          <div style={{fontWeight:700,fontSize:14}}>{u.displayName||u.name}</div>
                          <div style={{fontSize:11,color:"#6b7280",fontFamily:"monospace"}}>{u.country==="SG"?"🇸🇬":"🇲🇾"} {u.phone}</div>
                        </div>
                      </div>
                      <span style={{fontSize:11,fontWeight:700,padding:"3px 10px",borderRadius:20,background:t2.light,color:t2.color}}>{TX.zh.tierIcons[t2.key]} {TX.zh.tiers[t2.key]}</span>
                    </div>
                    <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:6,textAlign:"center",marginBottom:8}}>
                      {[["积分",u.points],["包裹",u.totalParcels+"件"],["消费","SGD "+u.totalSpend.toFixed(0)]].map(([l,v]) => (
                        <div key={l} style={{background:"#f9fafb",borderRadius:8,padding:"6px"}}><div style={{fontWeight:700,fontSize:13}}>{v}</div><div style={{fontSize:10,color:"#9ca3af"}}>{l}</div></div>
                      ))}
                    </div>
                    <div style={{marginTop:8,paddingTop:8,borderTop:"1px solid #f3f4f6"}}>
                      <div style={{fontSize:11,fontWeight:700,color:"#6b7280",marginBottom:5}}>🔐 重置密码</div>
                      <div style={{display:"flex",gap:6}}>
                        <input placeholder="新密码（至少6位）" value={resetPwMap[u.phone]||""} onChange={e => setResetPwMap(m=>({...m,[u.phone]:e.target.value}))} style={{flex:1,border:"1.5px solid #e5e7eb",borderRadius:8,padding:"7px 10px",fontSize:11,color:"#111",background:"#f9fafb",outline:"none"}}/>
                        <button onClick={() => adminReset(u, resetPwMap[u.phone]||"")} style={{background:"#374151",color:"#fff",border:"none",borderRadius:8,padding:"7px 12px",fontSize:11,fontWeight:700,cursor:"pointer"}}>重置</button>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          )}

          {/* Pricing */}
          {aTab==="pricing" && (
            <div>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
                <div style={{fontWeight:900}}>价钱表</div>
                <button onClick={savePricing} style={{fontSize:12,fontWeight:700,color:"#fff",background:"#ec4899",border:"none",borderRadius:8,padding:"6px 14px",cursor:"pointer"}}>保存 ✓</button>
              </div>
              <Card style={{marginBottom:12}}>
                <div style={{fontWeight:700,fontSize:13,color:"#ec4899",marginBottom:10}}>📦 自取 (RM)</div>
                {[{label:"1–3件/件",k:"tier1",f:"price"},{label:"4件以上/件",k:"tier2",f:"price"},{label:"超期/件/天",k:"overstay",f:null}].map(row => (
                  <div key={row.k} style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8}}>
                    <span style={{fontSize:12,color:"#374151"}}>{row.label}</span>
                    <input type="number" value={row.f ? pricingEdit.pickup[row.k][row.f] : pricingEdit.pickup[row.k]} onChange={e => {
                      const v = parseFloat(e.target.value)||0;
                      setPricingEdit(prev => {
                        const np = JSON.parse(JSON.stringify(prev));
                        if (row.f) np.pickup[row.k][row.f]=v; else np.pickup[row.k]=v;
                        return np;
                      });
                    }} style={{width:70,border:"1.5px solid #e5e7eb",borderRadius:8,padding:"6px 10px",fontSize:12,color:"#111",background:"#f9fafb",outline:"none",textAlign:"center"}}/>
                  </div>
                ))}
              </Card>
              <Card>
                <div style={{fontWeight:700,fontSize:13,color:"#f97316",marginBottom:10}}>🚚 送货 (SGD)</div>
                {["z1","z2","z3"].map(zk => (
                  <div key={zk} style={{marginBottom:12,paddingBottom:12,borderBottom:"1px solid #f3f4f6"}}>
                    <div style={{fontWeight:700,fontSize:11,marginBottom:6,color:"#374151"}}>{pricingEdit.delivery[zk].label} <span style={{fontWeight:400,color:"#9ca3af"}}>{pricingEdit.delivery[zk].area}</span></div>
                    <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:6}}>
                      {[["小件","s"],["中件","m"],["重件/kg","h"]].map(([l,f]) => (
                        <div key={f}>
                          <div style={{fontSize:10,color:"#9ca3af",marginBottom:3}}>{l}</div>
                          <input type="number" value={pricingEdit.delivery[zk][f]} onChange={e => {
                            const v = parseFloat(e.target.value)||0;
                            setPricingEdit(prev => { const np=JSON.parse(JSON.stringify(prev)); np.delivery[zk][f]=v; return np; });
                          }} style={{width:"100%",border:"1.5px solid #e5e7eb",borderRadius:8,padding:"6px 8px",fontSize:12,color:"#111",background:"#f9fafb",outline:"none",textAlign:"center",boxSizing:"border-box"}}/>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </Card>
            </div>
          )}

          {/* Rewards */}
          {aTab==="rewards" && (
            <div>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:12}}>
                <div style={{fontWeight:900}}>兑换奖励</div>
                <button onClick={saveRewards} style={{fontSize:12,fontWeight:700,color:"#fff",background:"#ec4899",border:"none",borderRadius:8,padding:"6px 14px",cursor:"pointer"}}>保存 ✓</button>
              </div>
              <Card style={{marginBottom:12,background:"#fdf2f8",border:"1px solid #fbcfe8"}}>
                <div style={{fontWeight:700,fontSize:13,color:"#ec4899",marginBottom:10}}>➕ 添加奖励</div>
                <div style={{display:"flex",flexDirection:"column",gap:8}}>
                  <input placeholder="奖励名称 *" value={rewardForm.title} onChange={e=>setRewardForm(f=>({...f,title:e.target.value}))} style={{border:"1.5px solid #e5e7eb",borderRadius:10,padding:"9px 12px",fontSize:12,color:"#111",background:"#fff",outline:"none"}}/>
                  <input placeholder="描述（选填）" value={rewardForm.desc} onChange={e=>setRewardForm(f=>({...f,desc:e.target.value}))} style={{border:"1.5px solid #e5e7eb",borderRadius:10,padding:"9px 12px",fontSize:12,color:"#111",background:"#fff",outline:"none"}}/>
                  <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
                    <input type="number" placeholder="所需积分 *" value={rewardForm.points} onChange={e=>setRewardForm(f=>({...f,points:e.target.value}))} style={{border:"1.5px solid #e5e7eb",borderRadius:10,padding:"9px 12px",fontSize:12,color:"#111",background:"#fff",outline:"none"}}/>
                    <input type="number" placeholder="库存（空=无限）" value={rewardForm.stock} onChange={e=>setRewardForm(f=>({...f,stock:e.target.value}))} style={{border:"1.5px solid #e5e7eb",borderRadius:10,padding:"9px 12px",fontSize:12,color:"#111",background:"#fff",outline:"none"}}/>
                  </div>
                  <select value={rewardForm.tier} onChange={e=>setRewardForm(f=>({...f,tier:e.target.value}))} style={{border:"1.5px solid #e5e7eb",borderRadius:10,padding:"9px 12px",fontSize:12,color:"#111",background:"#fff",outline:"none",cursor:"pointer"}}>
                    <option value="all">所有会员</option>
                    <option value="gold">🥇 金会员+</option>
                    <option value="platinum">💎 白金专属</option>
                  </select>
                  <button onClick={addReward} style={{background:"#ec4899",color:"#fff",border:"none",borderRadius:10,padding:"9px",fontSize:12,fontWeight:700,cursor:"pointer"}}>添加</button>
                </div>
              </Card>
              {(rewardsEdit||[]).map(r => (
                <Card key={r.id} style={{marginBottom:8,display:"flex",justifyContent:"space-between",alignItems:"center",gap:10}}>
                  <div>
                    <div style={{fontWeight:700,fontSize:13}}>{r.title}</div>
                    <div style={{fontSize:11,color:"#6b7280"}}>{r.points}积分 · {r.tier==="all"?"全员":r.tier==="gold"?"金+":"白金"} · 剩{r.stock===-1?"∞":r.stock-r.redeemed}</div>
                  </div>
                  <button onClick={() => setRewardsEdit(prev => prev.filter(x=>x.id!==r.id))} style={{background:"#fff0f0",border:"1.5px solid #fecaca",borderRadius:8,padding:"6px 10px",color:"#ef4444",cursor:"pointer",fontSize:12,flexShrink:0}}>🗑</button>
                </Card>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ════ USER ════ */}
      {mode==="user" && (
        <div style={{maxWidth:480,margin:"0 auto",minHeight:"100vh",display:"flex",flexDirection:"column"}}>

          {/* LOGIN */}
          {screen==="login" && (
            <div style={{flex:1,display:"flex",flexDirection:"column",minHeight:"100vh"}}>
              <div style={{background:"linear-gradient(160deg,#fdf2f8,#fff7ed,#fdf2f8)",padding:"52px 24px 28px",textAlign:"center",position:"relative",overflow:"hidden"}}>
                <div style={{position:"absolute",top:-40,right:-40,width:160,height:160,background:"rgba(236,72,153,0.08)",borderRadius:"50%"}}/>
                <div style={{width:78,height:78,background:"linear-gradient(135deg,#ec4899,#f97316)",borderRadius:22,display:"flex",alignItems:"center",justifyContent:"center",fontSize:36,margin:"0 auto 14px",boxShadow:"0 12px 40px rgba(236,72,153,0.35)"}}>📦</div>
                <div style={{display:"inline-flex",alignItems:"center",gap:6,background:"rgba(236,72,153,0.1)",border:"1px solid rgba(236,72,153,0.2)",borderRadius:99,padding:"5px 14px",marginBottom:10}}>
                  <div style={{width:6,height:6,background:"#10b981",borderRadius:"50%"}}/>
                  <span style={{fontSize:11,fontWeight:700,color:"#ec4899"}}>{t.tag}</span>
                </div>
                <h1 style={{fontSize:34,fontWeight:900,color:"#111",lineHeight:1.1,margin:"0 0 6px"}}>{t.app.split(" ").slice(0,1)} <span style={{background:"linear-gradient(135deg,#ec4899,#f97316)",WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>{t.app.split(" ").slice(1).join(" ")}</span></h1>
                <p style={{fontSize:12,color:"#6b7280",margin:"0 0 14px"}}>{t.tagline}</p>
                <div style={{display:"flex",gap:6,justifyContent:"center",flexWrap:"wrap"}}>
                  {[["📍","JB"],["🚚","SG"],["🪙","Points"],["💎","VIP"]].map(([i,l]) => (
                    <span key={l} style={{fontSize:10,background:"#fff",border:"1px solid #e5e7eb",borderRadius:99,padding:"4px 10px",color:"#374151"}}>{i} {l}</span>
                  ))}
                </div>
              </div>
              <div style={{display:"flex",justifyContent:"center",gap:6,padding:"10px 0",background:"#fff"}}>
                {[["zh","中文"],["en","EN"],["bm","BM"]].map(([l,label]) => (
                  <button key={l} onClick={() => setLang(l)} style={{padding:"5px 14px",borderRadius:99,fontSize:11,fontWeight:700,border:"1.5px solid",borderColor:lang===l?"#ec4899":"#e5e7eb",background:lang===l?"#fdf2f8":"#fff",color:lang===l?"#ec4899":"#374151",cursor:"pointer"}}>{label}</button>
                ))}
              </div>
              <div style={{background:"#fff",borderRadius:"24px 24px 0 0",padding:"20px",flex:1,boxShadow:"0 -4px 20px rgba(0,0,0,0.07)"}}>
                <div style={{fontWeight:900,fontSize:17,marginBottom:16,textAlign:"center",color:"#111"}}>{t.login}</div>
                <div style={{marginBottom:12}}><Lbl>{t.phone}</Lbl><PhoneInp val={lf.phone} country={lf.country} onCountry={c=>setLf(p=>({...p,country:c}))} onPhone={v=>setLf(p=>({...p,phone:v}))} placeholder={lf.country==="SG"?"91234567":"0123456789"}/></div>
                <Inp label={t.pw} type="password" placeholder="••••••••" value={lf.password} onChange={e=>setLf(p=>({...p,password:e.target.value}))}/>
                <div style={{marginTop:14}}><Btn onClick={doLogin} disabled={loading}>{loading?t.logging:t.login+" →"}</Btn></div>
                <button onClick={()=>setScreen("reg")} style={{width:"100%",marginTop:10,fontSize:13,color:"#6b7280",background:"none",border:"none",cursor:"pointer",padding:"6px 0"}}>{t.noAcc} <span style={{color:"#ec4899",fontWeight:700}}>{t.reg}</span></button>
                <button onClick={()=>{setFpStep(1);setFpData({phone:"",country:"SG",answer:"",newPw:"",confirmPw:"",found:null});setScreen("forgotPw");}} style={{width:"100%",fontSize:11,color:"#9ca3af",background:"none",border:"none",cursor:"pointer",padding:"3px 0"}}>{t.forgot}</button>
                <div style={{marginTop:10,paddingTop:10,borderTop:"1px solid #f3f4f6",textAlign:"center"}}>
                  <button onClick={()=>setScreen("aLogin")} style={{fontSize:11,color:"#9ca3af",background:"none",border:"none",cursor:"pointer"}}>{t.admin}</button>
                </div>
              </div>
            </div>
          )}

          {/* ADMIN LOGIN */}
          {screen==="aLogin" && (
            <div style={{flex:1,display:"flex",flexDirection:"column",justifyContent:"center",padding:"24px 20px"}}>
              <button onClick={()=>setScreen("login")} style={{fontSize:13,color:"#6b7280",background:"none",border:"none",cursor:"pointer",marginBottom:24,textAlign:"left"}}>←</button>
              <div style={{textAlign:"center",marginBottom:24}}><div style={{fontSize:40,marginBottom:8}}>🔧</div><div style={{fontSize:22,fontWeight:900}}>Admin</div></div>
              <Card>
                <Inp label={t.adminPwLabel} type="password" placeholder="••••••" value={ap} onChange={e=>setAp(e.target.value)}/>
                <div style={{marginTop:12}}><Btn onClick={()=>{ if(ap===ADMIN_PW){setMode("admin");loadAdmin();setAp("");}else toast2("Wrong password","error"); }}>{t.enterAdmin}</Btn></div>
              </Card>
            </div>
          )}

          {/* REGISTER */}
          {screen==="reg" && (
            <div style={{flex:1,padding:"20px 20px 32px",overflowY:"auto"}}>
              <button onClick={()=>setScreen("login")} style={{fontSize:13,color:"#6b7280",background:"none",border:"none",cursor:"pointer",marginBottom:12}}>←</button>
              <div style={{textAlign:"center",marginBottom:14}}><div style={{fontSize:32,marginBottom:5}}>✨</div><div style={{fontSize:20,fontWeight:900}}>{t.regTitle}</div><div style={{fontSize:11,color:"#6b7280",marginTop:3}}>{t.regSub}</div></div>
              <Card style={{display:"flex",flexDirection:"column",gap:12}}>
                <Inp label={t.name} placeholder="..." value={rf.name} onChange={e=>setRf(p=>({...p,name:e.target.value}))}/>
                <div><Lbl>{t.phone}</Lbl><PhoneInp val={rf.phone} country={rf.country} onCountry={c=>setRf(p=>({...p,country:c}))} onPhone={v=>setRf(p=>({...p,phone:v}))} placeholder={rf.country==="SG"?"91234567":"0123456789"}/></div>
                <Inp label={t.email} placeholder="email@..." value={rf.email} onChange={e=>setRf(p=>({...p,email:e.target.value}))}/>
                <Inp label={t.pwLabel} type="password" placeholder="••••••" value={rf.password} onChange={e=>setRf(p=>({...p,password:e.target.value}))}/>
                <Inp label={t.refPhone} placeholder="..." value={rf.ref} onChange={e=>setRf(p=>({...p,ref:e.target.value}))}/>
                <div>
                  <Lbl>{t.bday} <span style={{fontWeight:400,color:"#9ca3af"}}>— {t.bdaySub}</span></Lbl>
                  <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
                    <select value={rf.bm} onChange={e=>setRf(p=>({...p,bm:e.target.value}))} style={{border:"1.5px solid #d1d5db",borderRadius:12,padding:"11px 14px",fontSize:13,color:rf.bm?"#111":"#9ca3af",background:"#fff",outline:"none",cursor:"pointer"}}>
                      <option value="">{t.mon}</option>
                      {t.months.map((m,i) => (<option key={i+1} value={i+1}>{m}</option>))}
                    </select>
                    <select value={rf.by} onChange={e=>setRf(p=>({...p,by:e.target.value}))} style={{border:"1.5px solid #d1d5db",borderRadius:12,padding:"11px 14px",fontSize:13,color:rf.by?"#111":"#9ca3af",background:"#fff",outline:"none",cursor:"pointer"}}>
                      <option value="">{t.yr}</option>
                      {Array.from({length:60},(_,i) => new Date().getFullYear()-18-i).map(y => (<option key={y} value={y}>{y}</option>))}
                    </select>
                  </div>
                </div>
                <div>
                  <Lbl>{t.secQ} <span style={{fontWeight:400,color:"#9ca3af"}}>— {t.secQsub}</span></Lbl>
                  <select value={rf.secQ} onChange={e=>setRf(p=>({...p,secQ:e.target.value}))} style={{width:"100%",border:"1.5px solid #d1d5db",borderRadius:12,padding:"11px 14px",fontSize:13,color:rf.secQ?"#111":"#9ca3af",background:"#fff",outline:"none",cursor:"pointer",marginBottom:8}}>
                    <option value="">—</option>
                    {t.secQOpts.map((q,i) => (<option key={i} value={i}>{q}</option>))}
                  </select>
                  {rf.secQ!=="" && <Inp placeholder={t.secA} value={rf.secA} onChange={e=>setRf(p=>({...p,secA:e.target.value}))}/>}
                </div>
                <Btn onClick={doReg} disabled={loading}>{loading?t.reging:t.doReg}</Btn>
              </Card>
            </div>
          )}

          {/* FORGOT PW */}
          {screen==="forgotPw" && (
            <div style={{flex:1,padding:"24px 20px"}}>
              <button onClick={()=>setScreen("login")} style={{fontSize:13,color:"#6b7280",background:"none",border:"none",cursor:"pointer",marginBottom:20}}>←</button>
              <div style={{textAlign:"center",marginBottom:20}}>
                <div style={{fontSize:36,marginBottom:8}}>🔐</div>
                <div style={{fontSize:20,fontWeight:900}}>{t.fpTitle}</div>
                <div style={{fontSize:12,color:"#6b7280",marginTop:4}}>{t.fpSteps[fpStep-1]}</div>
              </div>
              <div style={{display:"flex",justifyContent:"center",gap:8,marginBottom:20}}>
                {[1,2,3].map(s => (
                  <div key={s} style={{display:"flex",alignItems:"center",gap:8}}>
                    <div style={{width:26,height:26,borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,fontWeight:700,background:fpStep>=s?"#ec4899":"#f3f4f6",color:fpStep>=s?"#fff":"#9ca3af"}}>{s}</div>
                    {s<3 && <div style={{width:24,height:2,background:fpStep>s?"#ec4899":"#f3f4f6",borderRadius:99}}/>}
                  </div>
                ))}
              </div>
              <Card style={{display:"flex",flexDirection:"column",gap:12}}>
                {fpStep===1 && (
                  <>
                    <div><Lbl>{t.phone}</Lbl><PhoneInp val={fpData.phone} country={fpData.country} onCountry={c=>setFpData(d=>({...d,country:c}))} onPhone={v=>setFpData(d=>({...d,phone:v}))} placeholder="..."/></div>
                    <Btn onClick={fpCheck} disabled={loading}>{loading?"...":t.fpNext}</Btn>
                  </>
                )}
                {fpStep===2 && fpData.found && (
                  <>
                    <div style={{background:"#f9fafb",borderRadius:12,padding:12}}><div style={{fontSize:11,color:"#6b7280",marginBottom:3}}>{t.fpSecQLabel}</div><div style={{fontWeight:700,fontSize:13}}>{t.secQOpts[parseInt(fpData.found.secQ)]}</div></div>
                    <Inp label={t.secA} placeholder="..." value={fpData.answer} onChange={e=>setFpData(d=>({...d,answer:e.target.value}))}/>
                    <Btn onClick={fpVerify}>{t.fpVerify}</Btn>
                  </>
                )}
                {fpStep===3 && (
                  <>
                    <Inp label={t.fpNewPw} type="password" placeholder="••••••" value={fpData.newPw} onChange={e=>setFpData(d=>({...d,newPw:e.target.value}))}/>
                    <Inp label={t.fpConfirmPw} type="password" placeholder="••••••" value={fpData.confirmPw} onChange={e=>setFpData(d=>({...d,confirmPw:e.target.value}))}/>
                    <Btn onClick={fpReset} disabled={loading}>{loading?t.fpResetting:t.fpReset}</Btn>
                  </>
                )}
              </Card>
            </div>
          )}

          {/* DASHBOARD */}
          {screen==="dash" && uData && tier && (
            <div style={{flex:1,padding:"20px 16px"}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:16}}>
                <div style={{display:"flex",alignItems:"center",gap:10}}>
                  <div style={{fontSize:30}}>{uData.avatar||"🐱"}</div>
                  <div><div style={{fontSize:12,color:"#6b7280"}}>{t.hello}</div><div style={{fontSize:18,fontWeight:900}}>{uData.displayName||uData.name}</div></div>
                </div>
                <button onClick={doLogout} style={{fontSize:11,color:"#6b7280",border:"1.5px solid #e5e7eb",borderRadius:10,padding:"5px 12px",background:"#fff",cursor:"pointer"}}>{t.logout}</button>
              </div>
              <div style={{background:"linear-gradient(135deg,"+tier.color+"22,"+tier.color+"11)",border:"2px solid "+tier.color+"33",borderRadius:22,padding:18,marginBottom:12,position:"relative",overflow:"hidden"}}>
                <div style={{position:"absolute",top:-20,right:-20,width:90,height:90,background:tier.color+"18",borderRadius:"50%"}}/>
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:10}}>
                  <span style={{fontSize:11,fontWeight:700,padding:"3px 12px",borderRadius:99,background:tier.color+"22",color:tier.color,border:"1px solid "+tier.color+"44"}}>{t.tierIcons[tier.key]} {t.tiers[tier.key]}</span>
                  <span style={{fontSize:11,color:"#6b7280",fontFamily:"monospace"}}>{uData.address}</span>
                </div>
                <div style={{fontSize:30,fontWeight:900,color:tier.color}}>{uData.points.toLocaleString()}</div>
                <div style={{fontSize:11,color:"#6b7280",marginTop:2}}>{t.ptsBal} · {tier.mult}x</div>
              </div>
              {nextTier && (
                <div style={{background:"#fff",borderRadius:14,padding:"10px 14px",marginBottom:12,border:"1px solid #f3f4f6"}}>
                  <div style={{display:"flex",justifyContent:"space-between",fontSize:11,marginBottom:5}}>
                    <span style={{fontWeight:700,color:"#374151"}}>{t.upgTo} {t.tiers[nextTier.key]}</span>
                    <span style={{color:"#9ca3af"}}>{t.more} {nextTier.pl}{t.items}</span>
                  </div>
                  <div style={{height:5,background:"#f3f4f6",borderRadius:99,overflow:"hidden"}}><div style={{height:"100%",background:"linear-gradient(90deg,#ec4899,#f97316)",borderRadius:99,width:progress+"%"}}/></div>
                </div>
              )}
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:12}}>
                {[[t.stats[0],uData.totalParcels+(lang==="bm"?" item":"件"),"📦"],[t.stats[1],sym+uData.totalSpend.toFixed(0),"💰"],[t.stats[2],parcels.filter(p=>p.status!=="delivered").length+(lang==="bm"?" item":"件"),"🕐"],[t.stats[3],tier.mult+"x","⚡"]].map(([l,v,i]) => (
                  <Card key={l}><div style={{fontSize:20,marginBottom:2}}>{i}</div><div style={{fontSize:16,fontWeight:900}}>{v}</div><div style={{fontSize:11,color:"#6b7280"}}>{l}</div></Card>
                ))}
              </div>
              {parcels.filter(p=>p.status==="quoted").length > 0 && (
                <div style={{background:"#f5f3ff",border:"2px solid #8b5cf6",borderRadius:14,padding:12,marginBottom:12,cursor:"pointer"}} onClick={()=>setScreen("parcels")}>
                  <div style={{fontWeight:900,fontSize:13,color:"#7c3aed",marginBottom:2}}>💰 {t.newQuote}</div>
                  <div style={{fontSize:11,color:"#6b7280"}}>{parcels.filter(p=>p.status==="quoted").length}{t.newQuoteSub}</div>
                </div>
              )}
              <div style={{display:"flex",flexDirection:"column",gap:8}}>
                {t.actions.map(([s,icon,title,sub,pink]) => (
                  <button key={s} onClick={()=>setScreen(s)} style={{background:pink?"linear-gradient(135deg,#fdf2f8,#fff7ed)":"#fff",border:"1.5px solid "+(pink?"#fbcfe8":"#f3f4f6"),borderRadius:16,padding:"13px 16px",textAlign:"left",display:"flex",alignItems:"center",gap:12,cursor:"pointer",boxShadow:"0 1px 6px rgba(0,0,0,0.03)"}}>
                    <span style={{fontSize:22}}>{icon}</span>
                    <div><div style={{fontWeight:900,fontSize:13,color:"#111"}}>{title}</div><div style={{fontSize:11,color:"#6b7280",marginTop:1}}>{sub}</div></div>
                    <span style={{marginLeft:"auto",color:"#d1d5db"}}>→</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* PARCELS */}
          {screen==="parcels" && (
            <div style={{flex:1,padding:"20px 16px"}}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:14}}>
                <button onClick={()=>setScreen("dash")} style={{fontSize:13,color:"#6b7280",background:"none",border:"none",cursor:"pointer"}}>←</button>
                <div style={{fontSize:17,fontWeight:900}}>{t.parcelsTitle}</div>
                <button onClick={()=>setScreen("addParcel")} style={{fontSize:12,color:"#ec4899",fontWeight:700,background:"none",border:"none",cursor:"pointer"}}>{t.addBtn}</button>
              </div>
              {parcels.length===0 ? (
                <div style={{textAlign:"center",padding:"60px 0",color:"#9ca3af"}}>
                  <div style={{fontSize:48,marginBottom:8}}>📭</div>
                  <div style={{fontWeight:700}}>{t.emptyParcels}</div>
                  <button onClick={()=>setScreen("addParcel")} style={{marginTop:12,color:"#ec4899",fontWeight:700,background:"none",border:"none",cursor:"pointer",fontSize:13}}>{t.firstParcel}</button>
                </div>
              ) : parcels.map(p => {
                const st = ST[p.status] || ST.pending;
                const stLabel = t.statuses[p.status] || p.status;
                return (
                  <Card key={p.id} style={{marginBottom:10}}>
                    <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:8}}>
                      <div>
                        <div style={{fontWeight:900,fontSize:14,color:"#111"}}>{p.description}</div>
                        <div style={{fontSize:11,color:"#6b7280",fontFamily:"monospace",marginTop:2}}>{p.tracking}</div>
                      </div>
                      <span style={{fontSize:11,fontWeight:700,padding:"3px 10px",borderRadius:20,background:st.bg,color:st.color,border:"1px solid "+st.border,whiteSpace:"nowrap",marginLeft:8}}>{stLabel}</span>
                    </div>
                    {p.status==="quoted" && p.fee && (
                      <div style={{background:"#f5f3ff",border:"2px solid #8b5cf6",borderRadius:10,padding:10,marginBottom:8}}>
                        <div style={{fontWeight:900,fontSize:12,color:"#7c3aed",marginBottom:4}}>💰 {t.quoteLabel}</div>
                        <div style={{fontSize:18,fontWeight:900,color:"#111",marginBottom:6}}>{p.deliveryType==="pickup"?"RM ":"SGD "}{p.fee}</div>
                        <button onClick={()=>toast2(t.contactMsg)} style={{width:"100%",padding:"8px",background:"#7c3aed",color:"#fff",border:"none",borderRadius:8,fontWeight:700,fontSize:11,cursor:"pointer"}}>{t.contactPay}</button>
                      </div>
                    )}
                    <div style={{display:"flex",gap:6,flexWrap:"wrap",fontSize:11,color:"#6b7280"}}>
                      <span style={{background:"#f9fafb",border:"1px solid #f3f4f6",borderRadius:6,padding:"2px 7px"}}>{p.platform||"—"}</span>
                      <span>{p.deliveryType==="pickup"?"🏃":"🚚"} {p.zone?.toUpperCase()||""}</span>
                      {p.weight>0 && <span>{p.weight}kg</span>}
                      {p.fee && <span style={{color:"#ec4899",fontWeight:700}}>{p.deliveryType==="pickup"?"RM ":"SGD "}{p.fee}</span>}
                    </div>
                    <div style={{fontSize:10,color:"#9ca3af",marginTop:4}}>{new Date(p.createdAt).toLocaleDateString()}</div>
                  </Card>
                );
              })}
            </div>
          )}

          {/* ADD PARCEL */}
          {screen==="addParcel" && uData && (
            <div style={{flex:1,padding:"20px 16px"}}>
              <button onClick={()=>setScreen("parcels")} style={{fontSize:13,color:"#6b7280",background:"none",border:"none",cursor:"pointer",marginBottom:14}}>←</button>
              <div style={{fontSize:18,fontWeight:900,marginBottom:4}}>📬 {lang==="en"?"Register Parcel":"登记新包裹"}</div>
              <div style={{fontSize:12,color:"#6b7280",marginBottom:16}}>{t.submitNote}</div>
              <Card style={{display:"flex",flexDirection:"column",gap:12}}>
                <div>
                  <Lbl>{t.platform}</Lbl>
                  <div style={{display:"grid",gridTemplateColumns:"repeat(5,1fr)",gap:5}}>
                    {PLATFORMS.map(p => (
                      <button key={p} onClick={()=>setPf(f=>({...f,platform:p}))} style={{padding:"7px 2px",borderRadius:8,fontSize:10,fontWeight:700,border:"1.5px solid",borderColor:pf.platform===p?"#ec4899":"#e5e7eb",background:pf.platform===p?"#fdf2f8":"#fff",color:pf.platform===p?"#ec4899":"#6b7280",cursor:"pointer"}}>{p}</button>
                    ))}
                  </div>
                </div>
                <Inp label={t.tracking} placeholder="MY123456789" value={pf.tracking} onChange={e=>setPf(f=>({...f,tracking:e.target.value.toUpperCase()}))}/>
                <Inp label={t.desc} placeholder="..." value={pf.desc} onChange={e=>setPf(f=>({...f,desc:e.target.value}))}/>
                <Inp label={t.weight} placeholder="1.5" value={pf.weight} onChange={e=>setPf(f=>({...f,weight:e.target.value}))}/>
                <div>
                  <Lbl>{t.svcType}</Lbl>
                  <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
                    {[["pickup",t.pickup],["delivery",t.delivery]].map(([v,l]) => (
                      <button key={v} onClick={()=>setPf(f=>({...f,type:v,zone:"",addr:""}))} style={{padding:"11px 6px",borderRadius:12,fontSize:12,fontWeight:700,border:"2px solid",borderColor:pf.type===v?"#ec4899":"#e5e7eb",background:pf.type===v?"#fdf2f8":"#fff",cursor:"pointer",color:pf.type===v?"#ec4899":"#374151"}}>{l}</button>
                    ))}
                  </div>
                </div>
                {pf.type==="delivery" && (
                  <>
                    <div>
                      <Lbl>{t.zone}</Lbl>
                      <div style={{display:"flex",flexDirection:"column",gap:6}}>
                        {Object.entries(pricing.delivery).map(([k,z]) => (
                          <button key={k} onClick={()=>setPf(f=>({...f,zone:k}))} style={{padding:"10px 12px",borderRadius:10,fontSize:11,fontWeight:700,border:"2px solid",borderColor:pf.zone===k?"#ec4899":"#e5e7eb",background:pf.zone===k?"#fdf2f8":"#fff",cursor:"pointer",textAlign:"left",display:"flex",justifyContent:"space-between"}}>
                            <span style={{color:pf.zone===k?"#ec4899":"#374151"}}>{z.label}</span>
                            <span style={{color:"#9ca3af",fontWeight:400}}>{z.area}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                    <Inp label={t.delivAddr} placeholder="123 Woodlands Ave..." value={pf.addr} onChange={e=>setPf(f=>({...f,addr:e.target.value}))}/>
                  </>
                )}
                <div style={{background:"#f0fdf4",border:"1px solid #bbf7d0",borderRadius:10,padding:10}}>
                  <div style={{fontSize:11,color:"#166534"}}>🔍 {t.inspectNote}</div>
                </div>
                <Btn onClick={doSubmit} disabled={loading}>{loading?t.submitting:t.submit}</Btn>
              </Card>
            </div>
          )}

          {/* POINTS */}
          {screen==="points" && uData && tier && (
            <div style={{flex:1,padding:"20px 16px"}}>
              <button onClick={()=>setScreen("dash")} style={{fontSize:13,color:"#6b7280",background:"none",border:"none",cursor:"pointer",marginBottom:14}}>←</button>
              <div style={{fontSize:18,fontWeight:900,marginBottom:14}}>{t.ptsTitle}</div>
              <div style={{background:"linear-gradient(135deg,"+tier.color+"22,"+tier.color+"11)",border:"2px solid "+tier.color+"44",borderRadius:20,padding:20,marginBottom:14}}>
                <div style={{fontSize:34,fontWeight:900,color:tier.color}}>{uData.points.toLocaleString()}</div>
                <div style={{fontSize:12,color:"#6b7280",marginTop:3}}>{t.tierIcons[tier.key]} {t.tiers[tier.key]} · {tier.mult}x</div>
              </div>
              <div style={{fontWeight:900,fontSize:15,marginBottom:10}}>{t.redeemTitle}</div>
              {(rewards||[]).length===0 ? (
                <Card style={{textAlign:"center",color:"#9ca3af",padding:24,marginBottom:12}}>{t.noRewards}</Card>
              ) : (rewards||[]).map(r => {
                const tierOk   = r.tier==="all" || (r.tier==="gold"&&tier.mult>=1.5) || (r.tier==="platinum"&&tier.mult>=2);
                const canAfford = uData.points >= r.points;
                const inStock   = r.stock===-1 || r.redeemed < r.stock;
                const canRedeem = tierOk && canAfford && inStock;
                return (
                  <Card key={r.id} style={{marginBottom:8,opacity:canRedeem?1:0.65}}>
                    <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",gap:10}}>
                      <div style={{flex:1}}>
                        <div style={{fontWeight:700,fontSize:13,color:"#111"}}>{r.title}</div>
                        {r.desc && <div style={{fontSize:11,color:"#6b7280",marginTop:2}}>{r.desc}</div>}
                        <div style={{display:"flex",gap:5,marginTop:5,flexWrap:"wrap"}}>
                          <span style={{fontSize:10,fontWeight:700,color:"#ec4899",background:"#fdf2f8",border:"1px solid #fbcfe8",borderRadius:99,padding:"2px 7px"}}>🪙 {r.points}</span>
                          {r.tier!=="all" && <span style={{fontSize:10,background:"#fffbeb",color:"#d97706",border:"1px solid #fde68a",borderRadius:99,padding:"2px 7px"}}>{r.tier==="gold"?"🥇+":"💎"}</span>}
                          {r.stock!==-1 && <span style={{fontSize:10,background:"#f9fafb",color:"#6b7280",border:"1px solid #f3f4f6",borderRadius:99,padding:"2px 7px"}}>{lang==="en"?"Left: ":"剩 "}{r.stock-r.redeemed}</span>}
                        </div>
                      </div>
                      <button onClick={()=>setRedeemTarget(r)} disabled={!canRedeem} style={{padding:"7px 12px",borderRadius:10,border:"none",fontWeight:700,fontSize:11,cursor:canRedeem?"pointer":"not-allowed",background:canRedeem?"#ec4899":"#f3f4f6",color:canRedeem?"#fff":"#9ca3af",flexShrink:0}}>
                        {!tierOk?t.tierReq:!inStock?t.soldOut:!canAfford?t.notEnough:t.redeemBtn}
                      </button>
                    </div>
                  </Card>
                );
              })}
              <Card style={{marginTop:8}}>
                <div style={{fontWeight:900,fontSize:13,marginBottom:10}}>{t.earnTitle}</div>
                {t.earnRows.map(([i,l,v]) => (
                  <div key={l} style={{display:"flex",justifyContent:"space-between",padding:"7px 0",borderBottom:"1px solid #f3f4f6",fontSize:12}}>
                    <span style={{color:"#374151"}}>{i} {l}</span>
                    <span style={{fontWeight:700,color:"#ec4899"}}>{v}</span>
                  </div>
                ))}
              </Card>
            </div>
          )}

          {/* GUIDE */}
          {screen==="guide" && (
            <div style={{flex:1,padding:"20px 16px"}}>
              <button onClick={()=>setScreen("dash")} style={{fontSize:13,color:"#6b7280",background:"none",border:"none",cursor:"pointer",marginBottom:14}}>←</button>
              <div style={{fontSize:18,fontWeight:900,marginBottom:4}}>{t.guideTitle}</div>
              <div style={{fontSize:12,color:"#6b7280",marginBottom:14}}>{t.guideSub}</div>
              {t.steps.map((s,i) => (
                <Card key={i} style={{marginBottom:10,display:"flex",gap:12}}>
                  <div style={{width:36,height:36,borderRadius:12,background:"linear-gradient(135deg,#ec4899,#f97316)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:18,flexShrink:0}}>{s.i}</div>
                  <div>
                    <div style={{fontSize:10,fontWeight:700,color:"#ec4899",background:"#fdf2f8",border:"1px solid #fbcfe8",borderRadius:99,padding:"1px 8px",display:"inline-block",marginBottom:4}}>{lang==="en"?"Step":"步骤"} {i+1}</div>
                    <div style={{fontWeight:700,fontSize:13,marginBottom:3}}>{s.t}</div>
                    <div style={{fontSize:11,color:"#6b7280",lineHeight:1.6}}>{s.d}</div>
                  </div>
                </Card>
              ))}
              <div style={{fontSize:16,fontWeight:900,marginTop:18,marginBottom:10}}>{t.pricing}</div>
              <Card style={{marginBottom:10}}>
                <div style={{fontWeight:700,fontSize:12,color:"#ec4899",marginBottom:8}}>{t.pickupLabel}</div>
                {[[pricing.pickup.tier1.qty, "RM "+pricing.pickup.tier1.price+(lang==="en"?" / item":" / 件")],[pricing.pickup.tier2.qty, "RM "+pricing.pickup.tier2.price+(lang==="en"?" / item":" / 件")],[t.overstayLabel, "RM "+pricing.pickup.overstay+(lang==="en"?" / item / day":" / 件 / 天")]].map(([l,v]) => (
                  <div key={l} style={{display:"flex",justifyContent:"space-between",padding:"6px 0",borderBottom:"1px solid #f3f4f6",fontSize:12}}>
                    <span style={{color:"#374151"}}>{l}</span><span style={{fontWeight:700}}>{v}</span>
                  </div>
                ))}
              </Card>
              <Card style={{marginBottom:10}}>
                <div style={{fontWeight:700,fontSize:12,color:"#f97316",marginBottom:8}}>{t.deliveryLabel}</div>
                <div style={{overflowX:"auto"}}>
                  <table style={{width:"100%",fontSize:11,borderCollapse:"collapse"}}>
                    <thead>
                      <tr style={{background:"#fff7ed"}}>
                        <th style={{padding:"6px 8px",textAlign:"left",color:"#6b7280",fontWeight:700}}>{lang==="en"?"Zone":"区域"}</th>
                        <th style={{padding:"6px 8px",textAlign:"center",color:"#f97316",fontWeight:700}}>{"<1kg"}</th>
                        <th style={{padding:"6px 8px",textAlign:"center",color:"#f97316",fontWeight:700}}>1–5kg</th>
                        <th style={{padding:"6px 8px",textAlign:"center",color:"#f97316",fontWeight:700}}>5kg+</th>
                      </tr>
                    </thead>
                    <tbody>
                      {["z1","z2","z3"].map((zk,idx) => {
                        const z = pricing.delivery[zk];
                        const em = ["🟢","🟡","🟠"][idx];
                        return (
                          <tr key={zk} style={{borderBottom:"1px solid #f3f4f6"}}>
                            <td style={{padding:"6px 8px"}}><div style={{fontWeight:700,fontSize:10}}>{em} {z.label}</div><div style={{fontSize:9,color:"#9ca3af"}}>{z.area}</div></td>
                            <td style={{padding:"6px 8px",textAlign:"center",fontWeight:600}}>SGD {z.s}</td>
                            <td style={{padding:"6px 8px",textAlign:"center",fontWeight:600}}>SGD {z.m}</td>
                            <td style={{padding:"6px 8px",textAlign:"center",fontWeight:600}}>SGD {z.h}/kg</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
                <div style={{marginTop:8,padding:"8px 10px",background:"#fff7ed",borderRadius:8,fontSize:10,color:"#92400e"}}>⏰ {t.cutoffLabel}: {pricing.cutoff.normal} / 🥇 {pricing.cutoff.gold} / 💎 {pricing.cutoff.platinum}</div>
              </Card>
            </div>
          )}

          {/* SETTINGS */}
          {screen==="settings" && uData && (
            <div style={{flex:1,padding:"20px 16px"}}>
              <button onClick={()=>setScreen("dash")} style={{fontSize:13,color:"#6b7280",background:"none",border:"none",cursor:"pointer",marginBottom:14}}>←</button>
              <div style={{fontSize:18,fontWeight:900,marginBottom:18}}>{t.settingsTitle}</div>
              <Card style={{marginBottom:12}}>
                <div style={{textAlign:"center",marginBottom:14}}>
                  <div style={{fontSize:54,marginBottom:6,cursor:"pointer"}} onClick={()=>setShowAvatars(!showAvatars)}>{settingsEdit.avatar||uData.avatar||"🐱"}</div>
                  <button onClick={()=>setShowAvatars(!showAvatars)} style={{fontSize:11,color:"#ec4899",background:"#fdf2f8",border:"1px solid #fbcfe8",borderRadius:99,padding:"4px 12px",cursor:"pointer",fontWeight:700}}>{t.editAvatar}</button>
                </div>
                {showAvatars && (
                  <div style={{display:"grid",gridTemplateColumns:"repeat(8,1fr)",gap:6,marginBottom:12,padding:"10px",background:"#f9fafb",borderRadius:12}}>
                    {AVATARS.map(a => (
                      <button key={a} onClick={()=>setSettingsEdit(s=>({...s,avatar:a}))} style={{fontSize:20,padding:4,borderRadius:8,border:"2px solid",borderColor:(settingsEdit.avatar||uData.avatar)===a?"#ec4899":"transparent",background:"#fff",cursor:"pointer"}}>{a}</button>
                    ))}
                  </div>
                )}
                <Inp label={t.editName} placeholder={uData.displayName||uData.name} value={settingsEdit.name} onChange={e=>setSettingsEdit(s=>({...s,name:e.target.value}))}/>
                <div style={{marginTop:10}}><Btn onClick={saveSettings}>{t.save}</Btn></div>
              </Card>
              <Card style={{marginBottom:12}}>
                <div style={{fontWeight:700,fontSize:13,marginBottom:10}}>🌐 {t.langLabel}</div>
                <div style={{display:"flex",gap:8}}>
                  {[["zh","中文"],["en","English"],["bm","BM"]].map(([l,label]) => (
                    <button key={l} onClick={()=>setLang(l)} style={{flex:1,padding:"9px 4px",borderRadius:10,fontSize:11,fontWeight:700,border:"1.5px solid",borderColor:lang===l?"#ec4899":"#e5e7eb",background:lang===l?"#fdf2f8":"#fff",color:lang===l?"#ec4899":"#374151",cursor:"pointer"}}>{label}</button>
                  ))}
                </div>
              </Card>
              <Card style={{marginBottom:12}}>
                <div style={{fontWeight:700,fontSize:13,marginBottom:10}}>💱 {t.currLabel}</div>
                <div style={{display:"flex",gap:8}}>
                  {["SGD","MYR","USD"].map(c => (
                    <button key={c} onClick={()=>setCurr(c)} style={{flex:1,padding:"9px 4px",borderRadius:10,fontSize:11,fontWeight:700,border:"1.5px solid",borderColor:curr===c?"#ec4899":"#e5e7eb",background:curr===c?"#fdf2f8":"#fff",color:curr===c?"#ec4899":"#374151",cursor:"pointer"}}>{SYM[c]}{c}</button>
                  ))}
                </div>
              </Card>
              <Btn ghost onClick={doLogout}>{t.doLogout}</Btn>
            </div>
          )}

          {/* REDEEM MODAL */}
          {redeemTarget && (
            <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.5)",zIndex:200,display:"flex",alignItems:"flex-end",justifyContent:"center"}}>
              <div style={{background:"#fff",borderRadius:"24px 24px 0 0",padding:"20px 20px 32px",width:"100%",maxWidth:480}}>
                <div style={{fontWeight:900,fontSize:16,marginBottom:4}}>{t.confirmRedeem}</div>
                <div style={{fontSize:12,color:"#6b7280",marginBottom:14}}>{t.confirmSub}</div>
                <Card style={{marginBottom:14,background:"#fdf2f8",border:"1px solid #fbcfe8"}}>
                  <div style={{fontWeight:700,fontSize:14,marginBottom:4}}>{redeemTarget.title}</div>
                  <div style={{fontSize:18,fontWeight:900,color:"#ec4899"}}>🪙 {redeemTarget.points}</div>
                  <div style={{fontSize:11,color:"#9ca3af",marginTop:4}}>{t.afterBal}{uData.points-redeemTarget.points}</div>
                </Card>
                <Btn onClick={()=>doRedeem(redeemTarget)}>{t.doRedeem}</Btn>
                <button onClick={()=>setRedeemTarget(null)} style={{width:"100%",marginTop:8,padding:"11px",background:"none",border:"1.5px solid #e5e7eb",borderRadius:12,fontWeight:700,fontSize:13,color:"#374151",cursor:"pointer"}}>{t.cancelBtn}</button>
              </div>
            </div>
          )}

          {/* BOTTOM NAV */}
          {navScreens.includes(screen) && (
            <div style={{position:"fixed",bottom:0,left:0,right:0,background:"#fff",borderTop:"1px solid #f3f4f6",boxShadow:"0 -4px 20px rgba(0,0,0,0.06)",zIndex:50}}>
              <div style={{maxWidth:480,margin:"0 auto",display:"flex"}}>
                {[["dash","🏠",t.nav.home],["parcels","📋",t.nav.parcels],["points","🪙",t.nav.points],["guide","📖",t.nav.guide],["settings","⚙️",t.nav.settings]].map(([s,i,l]) => (
                  <button key={s} onClick={()=>setScreen(s)} style={{flex:1,padding:"9px 4px",display:"flex",flexDirection:"column",alignItems:"center",gap:2,fontSize:9,fontWeight:700,background:"none",border:"none",cursor:"pointer",color:screen===s?"#ec4899":"#9ca3af",borderTop:"2px solid "+(screen===s?"#ec4899":"transparent")}}>
                    <span style={{fontSize:18}}>{i}</span>{l}
                  </button>
                ))}
              </div>
            </div>
          )}
          {navScreens.includes(screen) && <div style={{height:72}}/>}
        </div>
      )}
    </div>
  );
}
