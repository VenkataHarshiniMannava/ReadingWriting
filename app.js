const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 5000;
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.get('/', (req, res) => {
    fs.readFile('messages.txt', 'utf8', (err, data) => {
        if (err) {
            return res.render('index', { messages: [] });
        }
        const messages = data.split('\n').filter(message => message.trim() !== '').reverse();
        res.render('index', { messages });
    });
});

// ...

app.post('/add', (req, res) => {
    const newMessage = req.body.message;
    if (newMessage) {
        fs.writeFile('messages.txt', newMessage.replace(/ /g, '+'), (err) => {
            if (err) {
                console.error(err);
            }
        });
    }
    res.redirect('/');
});

// ...

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
