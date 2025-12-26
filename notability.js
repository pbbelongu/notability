// 確保數據存在
if (!$response.body) $done({});

let obj = JSON.parse($response.body);

// 統一的訂閱內容模板
const premiumInfo = {
    "__typename": "AppStoreSubscription",
    "productId": "com.gingerlabs.Notability.premium_subscription",
    "originalTransactionId": "570001184068302",
    "tier": "pro", // 建議使用 pro
    "status": "active", // 必須是 active
    "expirationDate": "2099-09-09T09:09:09.000Z",
    "originalPurchaseDate": "2023-04-19T03:11:16.000Z",
    "refundedDate": null,
    "refundedReason": null,
    "isInBillingRetryPeriod": false,
    "gracePeriodExpiresAt": null,
    "overDeviceLimit": false,
    "expirationIntent": null,
    "user": null
};

// 處理收據驗證 (針對你之前的 null 響應)
if (obj.data && obj.data.processAppleReceipt) {
    obj.data.processAppleReceipt = {
        "__typename": "SubscriptionResult",
        "error": 0,
        "subscription": premiumInfo,
        "isClassic": true
    };
}

// 處理配額與新交易 (針對你之前的 starter 響應)
if (obj.data && obj.data.associateAppStoreTransactions) {
    obj.data.associateAppStoreTransactions = {
        "__typename": "SubscriptionOverview",
        "tier": "pro",
        "current": premiumInfo,
        "prior": null,
        "quotas": {
            "__typename": "SubscriptionFeatureQuotaView",
            "learnQuestions": { "__typename": "SubscriptionFeatureQuota", "isUsageExceeded": false, "usagePercentage": 0 },
            "learnSummaries": { "__typename": "SubscriptionFeatureQuota", "isUsageExceeded": false, "usagePercentage": 0 },
            "liveTranscription": { "__typename": "SubscriptionFeatureQuota", "isUsageExceeded": false, "usagePercentage": 0 }
        }
    };
}

$done({ body: JSON.stringify(obj) });
