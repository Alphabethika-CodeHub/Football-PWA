let webPush = require('web-push');
 
const vapidKeys = {
   "publicKey": "BOSnGG5c9MuIA_ieTgK32tngPVoBEgoo0OUFLY89FvKLPiXdyFU3ysgfhMr-NARgeQSBalKTlW-MXxkGJVH-mME",
   "privateKey": "XEIWdFo9LdluiKRCO2wL20DmZ5Tc_rEKqEuVbavHMCE"
};
 
 
webPush.setVapidDetails(
   'mailto:example@yourdomain.org',
   vapidKeys.publicKey,
   vapidKeys.privateKey
)
let pushSubscription = {
   "endpoint": "https://fcm.googleapis.com/fcm/send/cjonMiX9yeA:APA91bFtfugBGGjxaIzW6OwQZ6B6gN-ZT367nS2Z4Yml4xelXQpQkM2hfuDEtmPdAQ4H-J0RGpmGMjdoakCGjv8Hg2HqzNBsy2rq0XiF_BNwqwXCl1xo1asPJ5GTUNix7ADt-kAalwDo",
   "keys": {
       "p256dh": "BJfwForxd6lFp0Z18jyNN9BVPKkVMocwgPOSpODVKr+jlj882qqqbe6WmDjms0JmCmrV7pTLdzKeVR6KISCYG4Y=",
       "auth": "zmpg0/uHOSJnOWw+JReRIw=="
   }
};

let payload = 'Welcome Aboard To Football League';
 
let options = {
   gcmAPIKey: '397765342815',
   TTL: 60
};

webPush.sendNotification(
   pushSubscription,
   payload,
   options
);