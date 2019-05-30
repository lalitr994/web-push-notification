const publicVapidKey = 'BIo4YteaBJBLAtXNUrdke0tBeyzdUQ1r08ehU1Xinigqvgn1t_vkYe8bq-GzdvI52QYK8fdWeZRj8y0zdQ9_jMc'


// check for server worker

if ('serviceWorker' in navigator) {
    console.log('navigator'+JSON.stringify(navigator));
    
    send().catch(err => console.error(err))

}

//register SW, register push, send push
async function send() {
    console.log('Registering service worker....');
    const register = await navigator.serviceWorker.register('./worker.js', {
        scope: '/'
    })

    console.log('Service worker registered');

    // register push
    console.log('Registering Push ....');
    const subsciption = await register.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: this.urlBase64ToUint8Array(publicVapidKey)
    })

    console.log('Push Registered ....');

    // send push notification

    console.log('sending push notification');

    await fetch('/subscribe', {
        method: 'POST',
        body: JSON.stringify(subsciption),
        headers: {
            'content-type': 'application/json'
        }
    })

    console.log('push sent....');

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
