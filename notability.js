// 解鎖 Notability Premium
var obj = JSON.parse($response.body);

obj = {
  "data": {
    "processAppleReceipt": {
      "error": 0,
      "subscription": {
        "productId": "com.gingerlabs.Notability.premium_subscription",
        "originalTransactionId": "570001184068302",
        "tier": "pro",
        "refundedDate": null,
        "refundedReason": null,
        "isInBillingRetryPeriod": false,
        "expirationDate": "2099-09-09T09:09:09.000Z",
        "gracePeriodExpiresAt": null,
        "overDeviceLimit": false,
        "expirationIntent": null,
        "__typename": "AppStoreSubscription",
        "user": null,
        "status": "active",
        "originalPurchaseDate": "2022-09-09T09:09:09.000Z"
      },
      "__typename": "SubscriptionResult"
    }
  }
};

$done({ body: JSON.stringify(obj) });

