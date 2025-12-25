// Midi.js
if ($response.body) {
    let obj = JSON.parse($response.body);
    
    // 修改用戶狀態
    if (obj.user) {
        obj.user.vip_type = 1; 
        obj.user.is_vip = true;
        obj.user.expire_time = 4070880000; // 2099年
    }
    
    // 有些版本數據在 data 層
    if (obj.data) {
        obj.data.is_premium = true;
        obj.data.vip_status = 1;
        obj.data.expiration_date = "2099-12-31T23:59:59Z";
    }

    $done({body: JSON.stringify(obj)});
} else {
    $done({});
}
