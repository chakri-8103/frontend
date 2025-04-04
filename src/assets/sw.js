self.addEventListener("notificationclick", event => {
    event.notification.close();
    clients.openWindow("https://your-website.com"); // Change to your website
});
