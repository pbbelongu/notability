// 解鎖 Notability Premium
// 取得原始數據
var obj = JSON.parse($response.body);

// 1. 處理你剛才找到的新的數據結構 (SubscriptionOverview)
if (obj.data && obj.data.associateAppStoreTransactions) {
  obj.data.associateAppStoreTransactions = {
    "__typename": "SubscriptionOverview",
    "tier": "pro",
    "current": {
        "__typename": "AppStoreSubscription",
        "status": "active",
        "expirationDate": "2099-09-09T09:09:09.000Z",
        "productId": "com.gingerlabs.Notability.premium_subscription"
    },
    "prior": null,
    "quotas": {
      "__typename": "SubscriptionFeatureQuotaView",
      "learnQuestions": { "__typename": "SubscriptionFeatureQuota", "isUsageExceeded": false, "usagePercentage": 0 },
      "learnSummaries": { "__typename": "SubscriptionFeatureQuota", "isUsageExceeded": false, "usagePercentage": 0 },
      "liveTranscription": { "__typename": "SubscriptionFeatureQuota", "isUsageExceeded": false, "usagePercentage": 0 }
    }
  };
}

// 2. 保留原有的訂閱驗證邏輯 (processAppleReceipt)
if (obj.data && obj.data.processAppleReceipt) {
  obj.data.processAppleReceipt.subscription = {
    "productId": "com.gingerlabs.Notability.premium_subscription",
    "originalTransactionId": "570001184068302",
    "tier": "pro",
    "status": "active",
    "expirationDate": "2099-09-09T09:09:09.000Z",
    "__typename": "AppStoreSubscription",
    "user": null
  };
}

// 寫回結果
$done({ body: JSON.stringify(obj) });
