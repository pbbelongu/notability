var obj = JSON.parse($response.body);

// 1. 定義公用的訂閱資訊
const subscriptionData = {
  "__typename": "AppStoreSubscription",
  "productId": "com.gingerlabs.Notability.premium_subscription",
  "originalTransactionId": "570001184068302",
  "tier": "pro",
  "status": "active",
  "expirationDate": "2099-09-09T09:09:09.000Z",
  "originalPurchaseDate": "2022-09-09T09:09:09.000Z",
  "refundedDate": null,
  "refundedReason": null,
  "isInBillingRetryPeriod": false,
  "gracePeriodExpiresAt": null,
  "overDeviceLimit": false,
  "expirationIntent": null,
  "user": null
};

// 2. 修復你剛發現的 processAppleReceipt (subscription 為 null 的問題)
if (obj.data && obj.data.processAppleReceipt) {
  obj.data.processAppleReceipt = {
    "__typename": "SubscriptionResult",
    "error": 0,
    "subscription": subscriptionData,
    "isClassic": true // 設為 true 可以增加權限穩定性
  };
}

// 3. 修復 associateAppStoreTransactions (配額限制問題)
if (obj.data && obj.data.associateAppStoreTransactions) {
  obj.data.associateAppStoreTransactions = {
    "__typename": "SubscriptionOverview",
    "tier": "pro",
    "current": subscriptionData,
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
