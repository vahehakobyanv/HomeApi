module.exports = function(app) {
  app.get('/users/', (req, res) => {
    app.dbs.users.find({})
        .skip(req.query.offset)
        .limit(req.query.limit)
        .exec ((err, data) => {
            if (err) {
                return res.send('Something went wrong..');
            }

        return res.send(data);
    });
});

app.post('/users/', (req, res) => {
  if (!req.body.username) {
      return res.send('empty');
  }
  app.dbs.users.create({
      username: req.body.username,
      age: req.body.age
  }, (err, data) => {
      if (err) {
          return res.send('error');
      }
      return res.send(data);
  })
});


app.put('/users/', (req, res) => {
  app.dbs.users.update({},{
      username: req.body.username
  }, (err, data) => {
      if (err) {
          return res.send('error');
      }
      return res.send(data);
  })
});


app.delete('/users/', (req, res) => {
  app.dbs.users.remove({
      username: req.body.username
  }, (err, data) => {
      if (err) {
          return res.send('error');
      }
      return res.send(data);
  })
});
}
