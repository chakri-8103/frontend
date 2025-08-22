importScripts('https://www.gstatic.com/firebasejs/9.22.2/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.22.2/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyDNn6mTQSSziK0euwazJYp7vQPZoT3ZEPo",
  authDomain: "callwebview-61c3a.firebaseapp.com",
  projectId: "callwebview-61c3a",
  messagingSenderId: "440935657909",
  appId: "1:440935657909:web:86f4e12e35802f8d91a9fc"
});

const messaging = firebase.messaging();
const defaultImage = "https://callwebview-61c3a.web.app/aditya_emblome_120x120.png";

messaging.onBackgroundMessage((payload) => {
  console.log("[SW] 📩 Background message received:", payload);

  const title = payload.notification?.title || "New Notification";
  const body = payload.notification?.body || "";
  const img = payload.notification?.image || defaultImage;

  console.log("[SW] Title:", title);
  console.log("[SW] Body:", body);
  console.log("[SW] Image:", img);

  const notificationOptions = {
    body: body,
    icon: img,
    badge: img,
    image: img,
    data: {
      url: payload.data?.click_action || "/index.html"
    }
  };

  self.registration.showNotification(title, notificationOptions)
    .then(() => console.log("[SW] ✅ Notification displayed"))
    .catch(err => console.error("[SW] ❌ Notification display error:", err));
});

self.addEventListener('notificationclick', (event) => {
  console.log("[SW] Notification clicked:", event.notification);
  event.notification.close();
  const url = event.notification.data?.url || "/index.html";
  event.waitUntil(clients.openWindow(url));
});
