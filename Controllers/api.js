const crypto = require('crypto');
const AppConstants = require('./../settings/constants');
const Utility = require('./../services/utility')

module.exports = function(app) {
 app.get('/users/', (req, res) => {
    app.dbs.users.find({}, (err, data) => {
        if (err) {
            return res.send('Something went wrong..');
        }

        return res.send(data.map(d => {
            return {
                username: d.username,
                id: d._id,
                age: d.age
            }
        }));
    })
});

app.post('/users/', (req, res) => {
  let username = req.body.username;
  let password = req.body.password;
  let name = req.body.name;
  let email = req.body.email;
  let age = req.body.age;
  if (!username || !password) {
      return res.send(Utility.GenerateErrorMessage(
        Utility.ErrorTypes.USERNAME_PASS_MISSING));
  }
  if(username.length < AppConstants.USERNAME_MIN_LENGTH || username.length > AppConstants.USERNAME_MAX_LENGTH)
  {
      return res.send(Utility.GenerateErrorMessage(Utility.ErrorTypes.USERNAME_INVALID_RANGE,{more: username.length}));
  }
  if(password.length < AppConstants.PASSWORD_MIN_LENGTH || password.length > AppConstants.PASSWORD_MAX_LENGTH)
  {
      return res.send(Utility.GenerateErrorMessage(Utility.ErrorTypes.PASSWORD_INVALID_RANGE));
  }
  if(name.length < AppConstants.NAME_MIN_LENGTH || name.length > AppConstants.NAME_MAX_LENGTH) {
      return res.send(Utility.GenerateErrorMessage(Utility.ErrorTypes.INVALID_NAME_RANGE));
  }
  if(age < AppConstants.AGE_MIN_LENGTH || age > AppConstants.AGE_MAX_LENGTH) {
      return res.send(Utility.GenerateErrorMessage(Utility.ErrorTypes.INVALID_AGE_RANGE));
  }
  password = crypto.createHash('md5').update(password+username).digest('hex');
  app.dbs.users.findOne({username: username}, (err,data)=>{
    if(data) {
        return res.send('user already exists');
    }
    app.dbs.users.create({
        username: username,
        password: password,
        age: age,
        email: email,
        name: name
    }, (err, data) => {
        if (err) {
            return res.send(Utility.GenerateErrorMessage(Utility.ErrorTypes.ERROR_CREATION_USER));
        }
        return res.send(data);
    })
  });

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
