require('dotenv').config();

const cors = require('cors');
const express = require('express');
const path = require('path');

const routerUsers = require('./routers/users');

const app = express();
const PORT = process.env.PORT || 8000;

const log = (req, res, next) => {
    console.table({
        time: new Date().toUTCString(),
        url: `${req.protocol}://${req.get('host')}${req.url}`,
        method: req.method,
    });
    next();
};

app.listen(PORT, () => console.log('\x1b[35m%s\x1b[0m', `Server listening on PORT ${PORT}.`));

app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(log);

app.use('/users', routerUsers);
