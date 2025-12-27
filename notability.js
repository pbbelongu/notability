 let obj = JSON.parse($response.body);

// 處理第一包：associateAppStoreTransactions (等級與 AI)
if (obj.data && obj.data.associateAppStoreTransactions) {
    obj.data.associateAppStoreTransactions = {
        "__typename": "SubscriptionOverview",
        "tier": "pro",
        "current": {
            "productId": "com.gingerlabs.Notability.pro_subscription",
            "expirationDate": "2099-09-09T09:09:09.000Z",
            "__typename": "AppStoreSubscription"
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

// 處理第二包：processAppleReceipt (收據驗證)
if (obj.data && obj.data.processAppleReceipt) {
    obj.data.processAppleReceipt = {
        "__typename": "SubscriptionResult",
        "error": 0,
        "isClassic": true,
        "subscription": {
            "productId": "com.gingerlabs.Notability.pro_subscription",
            "originalTransactionId": "570001184068302",
            "tier": "pro",
            "refundedDate": null,
            "status": "active",
            "expirationDate": "2099-09-09T09:09:09.000Z",
            "__typename": "AppStoreSubscription"
        }
    };
}

$done({ body: JSON.stringify(obj) });
