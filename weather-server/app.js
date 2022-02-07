const express = require('express');

const recordRequest = require('./middleware/recordRequest');

const indexRouter = require('./routes/index');
const weatherRouter = require('./routes/weather');

const cors=require('cors')

const app = express();
const port = 5000



app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors())
app.use(recordRequest)

app.use('/', indexRouter);
app.use('/weather', weatherRouter);



app.listen(port, (err) => {
    if (err) { console.log(err); };
    console.log('Listening on port ' + port);
});