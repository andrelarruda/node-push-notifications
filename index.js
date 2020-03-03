const express = require('express');
const webPush = require('web-push');
const bodyParser = require('body-parser');
const path = require('path');

const PORT = 5000;

const app = express();

// Set static path
app.use(express.static(path.join(__dirname, 'client')));

app.use(bodyParser.json());

const publicVapidKey = 'BCghL7iNsZuaP81gjhwDTXnaR4UjoykcDMwg8EsuZNgrGU6i4hXuqU3WBHOZ7HhG9lkd7qr_YVRJVEfOWEgfYY0';
const privateVapidKey = 'J3Sh5IvaA_H0ETwDlhK911AThvoejx4LGxDkQzV6guw';

webPush.setVapidDetails('mailto:test@test.com', publicVapidKey, privateVapidKey);

// subscribe route
app.post('/subscribe', (req, res) => {
   // Get pushSubscription object
   const subscription = req.body;

   // Send 201 - resource created
   res.status(201).json({});

   // Create payload
   const payload = JSON.stringify({ title: 'Push test'});

   //Pass object into sendNotification
   webPush.sendNotification(subscription, payload)
      .catch(err => console.error(err)); 
});


app.listen(PORT, () => console.log(`Server started on port ${PORT}...`));