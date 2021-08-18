if (!('serviceWorker' in navigator)) {
    console.log("Service Worker Tidak Didukung Browser Ini.");
  } else {
    registerServiceWorker();
    requestPermission();
  }

  function registerServiceWorker() {
    return navigator.serviceWorker.register('sw.js')
      .then(function (registration) {
        console.log('Registrasi Service Worker Berhasil.');
        return registration;
      })
      .catch(function (err) {
        console.error('Registrasi Service Worker Gagal.', err);
      });
  }
      
  function requestPermission() {
    if ('Notification' in window) {
      Notification.requestPermission().then(function (result) {
        if (result === "denied") {
          console.log("Fitur Notifikasi Tidak Di Ijinkan.");
          return;
        } else if (result === "default") {
          console.error("Pengguna Menutup Kotak Dialog Permintaan Ijin.");
          return;
        }
        
        navigator.serviceWorker.ready.then(() => {
            if (('PushManager' in window)) {
              navigator.serviceWorker.getRegistration().then(function(registration) {
                  registration.pushManager.subscribe({
                            userVisibleOnly: true,
                            applicationServerKey: urlBase64ToUint8Array("BOSnGG5c9MuIA_ieTgK32tngPVoBEgoo0OUFLY89FvKLPiXdyFU3ysgfhMr-NARgeQSBalKTlW-MXxkGJVH-mME")
                        }).then(function(subscribe) {
                            console.log('Berhasil Melakukan Subscribe Dengan Endpoint: ', subscribe.endpoint);
                            console.log('Berhasil Melakukan Subscribe Dengan p256dh Key: ', btoa(String.fromCharCode.apply(
                                null, new Uint8Array(subscribe.getKey('p256dh')))));
                            console.log('Berhasil Melakukan Subscribe Dengan Auth Key: ', btoa(String.fromCharCode.apply(
                                null, new Uint8Array(subscribe.getKey('auth')))));
                        }).catch(function(e) {
                      console.error('Tidak Dapat Melakukan Subscribe ', e.message);
                  });
              });
          }
        })
      });
    }
  }

  function urlBase64ToUint8Array(base64String) {
      const padding = '='.repeat((4 - base64String.length % 4) % 4);
      const base64 = (base64String + padding)
          .replace(/-/g, '+')
          .replace(/_/g, '/');
      const rawData = window.atob(base64);
      const outputArray = new Uint8Array(rawData.length);
      for (let i = 0; i < rawData.length; ++i) {
          outputArray[i] = rawData.charCodeAt(i);
      }
      return outputArray;
  }        