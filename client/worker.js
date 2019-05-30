console.log('Service worker loader.....');

self.addEventListener('push',e =>{
    const data = e.data.json();
    console.log('push recieved....');

    self.registration.showNotification(data.title, {
        body: 'Notification by lalit',
        icon:'https://image.ibb.co/frYOFd/tmlogo.png'
    })
    
})
