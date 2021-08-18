
importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.6.3/workbox-sw.js');
 
if (workbox)
  console.log(`Workbox Berhasil Dimuat`);
else
  console.log(`Workbox Gagal Dimuat`);

workbox.precaching.precacheAndRoute([
  { url: '/', revision: '1' },
  { url: '/index.html', revision: '1' },
  { url: '/nav.html', revision: '1' },  
  { url: '/manifest.json', revision: '1' },
  { url: '/js/api.js', revision: '1' },
  { url: '/js/date-convert.js', revision: '1' },
  { url: '/js/db.js', revision: '1' },
  { url: '/js/detail_team_breakdown.js', revision: '1' },
  { url: '/js/idb.js', revision: '1' },
  { url: '/js/latest_match.js', revision: '1' },
  { url: '/js/materialize.min.js', revision: '1' },
  { url: '/js/nav.js', revision: '1' },
  { url: '/js/standings_league.js', revision: '1' },
  { url: '/js/sw-register.js', revision: '1' },
  { url: '/js/upcoming_match.js', revision: '1' },
  { url: '/css/costum-style.css', revision: '1' },
  { url: '/css/materialize.min.css', revision: '1' },
  { url: '/css/fontawesome/all.min.css', revision: '1' },
  { url: '/css/fontawesome/fontawesome.min.css', revision: '1' },
  { url: '/img/bg-web-ul.png', revision: '1' },
  { url: '/img/icon2.png', revision: '1' },
  { url: '/img/icon2-ios.png', revision: '1' },
  { url: '/img/league-icon.png', revision: '1' },

  { url: '/detail-team.html', revision: '1' },
  
  { url: '/css/webfonts/fa-brands-400.eot', revision: '1' },
  { url: '/css/webfonts/fa-brands-400.svg', revision: '1' },
  { url: '/css/webfonts/fa-brands-400.ttf', revision: '1' },
  { url: '/css/webfonts/fa-brands-400.woff', revision: '1' },
  { url: '/css/webfonts/fa-brands-400.woff2', revision: '1' },
  { url: '/css/webfonts/fa-regular-400.eot', revision: '1' },
  { url: '/css/webfonts/fa-regular-400.svg', revision: '1' },
  { url: '/css/webfonts/fa-regular-400.ttf', revision: '1' },
  { url: '/css/webfonts/fa-regular-400.woff', revision: '1' },
  { url: '/css/webfonts/fa-regular-400.woff2', revision: '1' },
  { url: '/css/webfonts/fa-solid-900.eot', revision: '1' },
  { url: '/css/webfonts/fa-solid-900.svg', revision: '1' },
  { url: '/css/webfonts/fa-solid-900.ttf', revision: '1' },
  { url: '/css/webfonts/fa-solid-900.woff', revision: '1' },
  { url: '/css/webfonts/fa-solid-900.woff2', revision: '1' },

  { url: '/pages/about.html', revision: '1' },
  { url: '/pages/favorite.html', revision: '1' },
  { url: '/pages/home.html', revision: '1' },
  { url: '/pages/standings.html', revision: '1' },
],{
    ignoreUrlParametersMatching: [/.*/]
});

workbox.routing.registerRoute(
  /https:\/\/api\.football-data\.org\/v2/,
  new workbox.strategies.NetworkFirst({
    cacheName: "api-football",
    plugins: [
      new workbox.expiration.Plugin({
        maxAgeSeconds: 10 * 60 // 10 minutes
      })
    ]
  })
);


workbox.routing.registerRoute(
  new RegExp('/pages/'),
    workbox.strategies.staleWhileRevalidate({
        cacheName: 'pages'
    })
);

workbox.routing.registerRoute(
  new RegExp('/detail-team.html'),
    workbox.strategies.staleWhileRevalidate({
        cacheName: 'detail-team'
    })
);

workbox.routing.registerRoute(
  new RegExp('/css/webfonts/'),
    workbox.strategies.staleWhileRevalidate({
        cacheName: 'webfonts'
    })
);

self.addEventListener('push', function(event) {
  let body;
  if (event.data) {
    body = event.data.text();
  } else {
    body = 'Push Message No Payload';
  }
  let options = {
    body: body,
    icon: 'img/notification.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    }
  };
  event.waitUntil(
    self.registration.showNotification('Push Notification', options)
  );
});