const DateController = require('../controller/date.controller');


module.exports =  app => {
    app.post('/api/date', DateController.createDate);
    app.get('/api/date', DateController.findDate);
    app.delete('/api/date/:id', DateController.deleteDate);
    app.put('/api/date/:id', DateController.updateDate);
}
