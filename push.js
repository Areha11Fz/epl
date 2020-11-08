var webPush = require('web-push');
 
const vapidKeys = {
   "publicKey": "BNESGawIA9fuZ3KIALifAZ8Kw38k9hO91-yxlbKIazs0IKp56DG9ypn-bU7nVa2udJwdn5IJTd0CIH94ttNrLMA",
   "privateKey": "i40cSDeCNUbzedPXVFMtMkTNTZO3ArkP08yh3zUf5-4"
};
 
 
webPush.setVapidDetails(
   'mailto:example@yourdomain.org',
   vapidKeys.publicKey,
   vapidKeys.privateKey
)
var pushSubscription = {
   "endpoint": "https://fcm.googleapis.com/fcm/send/erjpkwgm1lY:APA91bEl_qrn00Riif76HKH4jYd2cPU-SZpfNEUlmwYZRuBRoXtnXv6PI_Q244YPeUd735hM6B79IBNkhKwG_sZbqXZlgqu5k2PoCdWAnYiWfRPvAIvKhQD0AZ3HFjYfc2wgola0RRUz",
   "keys": {
       "p256dh": "BO7Uv0tZEgsEda4tL6lLC6ETtovxs0Fv+Rhr1WeNtwpAdP834HCqUJuC6l5nbM0KtK2nqf60ndDIOGAD/LnqZFE=",
       "auth": "3eMJaQ0BYvfvyYeIzoL4Hw=="
   }
};
var payload = 'Selamat! Aplikasi Anda sudah dapat menerima push notifikasi!';
 
var options = {
   gcmAPIKey: '832291674921',
   TTL: 60
};
webPush.sendNotification(
   pushSubscription,
   payload,
   options
);
