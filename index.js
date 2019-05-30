const express = require('express')
const webpush = require('web-push')
const bodyParser = require('body-parser')
const path = require('path')

const app = express()

//Set Static Path
app.use(express.static(path.join(__dirname,'client')))

app.use(bodyParser.json())

const publicVapidKey = 'BIo4YteaBJBLAtXNUrdke0tBeyzdUQ1r08ehU1Xinigqvgn1t_vkYe8bq-GzdvI52QYK8fdWeZRj8y0zdQ9_jMc'
const privateVapidKey ='1XyEjVmjmTDVj5lwhYtDmvIyFHm8FPRMWSpU__v-S4o'

webpush.setVapidDetails('mailto:lalitr994@gmail.com', publicVapidKey, privateVapidKey)

// creating subscribe route


app.post('/subscribe',(req,res)=>{
    // get pushnotification object

    const subscription = req.body;
    
    // send 201 as success
    res.status(201).json({})

    //create paylaod

    const paylaod = JSON.stringify({Title : 'Test Push'})

    //pass object into send notification

    webpush.sendNotification(subscription, paylaod).catch(err=>{console.log('err'+err)})

})

const port = 5000

app.listen(port, () => console.log(`Server started on port ${port}`))