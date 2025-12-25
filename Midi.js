// 取得原始回傳數據
let body = $response.body;
if (!body) $done({}); // 如果沒有 body 則直接跳過

let obj = JSON.parse(body);

// 針對 md.studio 域名常見的數據結構進行修改
// 假設權限在 data 或 user 欄位中
const modify = (item) => {
    if (typeof item !== 'object' || item === null) return;

    // 修改常見的會員開關
    if (item.hasOwnProperty('is_vip')) item.is_vip = true;
    if (item.hasOwnProperty('vip_type')) item.vip_type = 1;
    if (item.hasOwnProperty('is_premium')) item.is_premium = true;
    
    // 修改過期時間 (2099-12-31)
    if (item.hasOwnProperty('expire_time')) item.expire_time = 4070880000;
    if (item.hasOwnProperty('expires_at')) item.expires_at = 4070880000;
};

// 執行修改
modify(obj);
if (obj.data) modify(obj.data);
if (obj.user) modify(obj.user);

// 回傳修改後的結果
$done({ body: JSON.stringify(obj) });
