

const app = require('express')();
app.use(require('cors')());
app.use(require('/routes'));

const server = require('http').createServer(app);
require('./socket')(server)
server.listen(4000);