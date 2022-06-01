const bcrypt = require('bcrypt');
const conexion = require('../database/db');

function login(req, res) {
  if (req.session.loggedin != true) {
    res.render('login/login');

  } else {
    res.redirect('/');
  }
}

function auth(req, res) {
  const data = req.body;

  conexion.connect((err, conn) => {
    conexion.query('SELECT * FROM user WHERE email = ?', [data.email], (err, userdata) => {
      if (userdata.length > 0) {
        userdata.forEach(element => {
          bcrypt.compare(data.password, element.password, (err, isMatch) => {
            if (!isMatch) {
              res.render('login/login', {
                error: 'Error: Contraseña incorrecta'
              });

            } else {
              req.session.loggedin = true;
              req.session.name = element.name;
              res.redirect('/');
            }
          });
        });

      } else {
        res.render('login/login', {
          error: 'Error: El usuario no existe'
        });
      }
    });
  });
}

function register(req, res) {
  if (req.session.loggedin != true) {
    res.render('login/register');

  } else {
    res.redirect('/');
  }
}

//Insertamos los registros en nuestra base de datos de los nuevos usuarios
function storeUser(req, res) {
  const data = req.body;

  conexion.connect((err, conn) => {
    conexion.query('SELECT * FROM user WHERE email = ?', [data.email], (err, userdata) => {
      if (userdata.length > 0) {
        res.render('login/register', {
          error: 'Error: El usuario ya existe'
        });

      } else {
        bcrypt.hash(data.password, 12).then(hash => {
          data.password = hash;
          conexion.connect((err, conn) => {
            conexion.query('INSERT INTO user SET ?', [data], (err, rows) => {
              req.session.loggedin = true;
              req.session.name = data.name;
              res.redirect('/');
            });
          });
        });
      }
    });
  });
}

function reserva(req, res) {
  if (req.session.loggedin != true) {
    res.render('/home');

  } else {
    res.redirect('/');
  }
}

function resPista(req, res) {
  const data = req.body;

  conexion.connect((err, conn) => {
    conexion.query('INSERT INTO reserva SET ?', [data], (err, rows) => {
      req.session.loggedin = true;
      req.session.name = data.name;
    });
  });
  res.redirect("/");
}

//logout
function logout(req, res) {
  if (req.session.loggedin == true) {
    req.session.destroy();
  }
  res.redirect('/login');
}

module.exports = {
  login,
  register,
  storeUser,
  auth,
  reserva,
  resPista,
  logout,
}