const express = require('express');
const {
	engine
} = require('express-handlebars');
const myconnection = require('express-myconnection');
const session = require('express-session');
const bodyParser = require('body-parser')
const loginRoutes = require('./routes/login');
const {
	redirect
} = require('express/lib/response');
const conexion = require('./database/db');
const cors = require('cors');
const app = express();
app.set('port', 3000);

app.set('views', __dirname + '/views');
app.engine('.hbs', engine({
	extname: '.hbs',
}));
app.set('view engine', 'hbs');

app.use((req, res, next) => {	
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
	res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
	res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
	next();
});

app.use(cors());

//static files
app.use(express.static(__dirname + '/public'));

//middlewares
app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(bodyParser.json());

//Mostrar todos las reservas
app.get('/api/reserva', (req, res) => {
	conexion.query('SELECT * FROM reserva', (err, rows) => {
		if (err) {
			throw err;

		} else {
			res.send(rows);
		}
	});
});

//Insertar reserva
app.post('/api/reserva', (req, res) => {
	let data = {
		pista: req.body.pista,
		dia: req.body.dia,
		hora: req.body.hora,
	};
	let sql = 'INSERT INTO reserva SET ?';
	conexion.query(sql, data, function(error, results) {
		if (error) {
			throw error;

		} else {
			res.send(results);
		}
	});
});

//Editar reserva
app.put('/api/reserva/:id', (req, res) => {
	let id = req.params.id;
	let pista = req.body.pista;
	let dia = req.body.dia;
	let hora = req.body.hora;

	let sql = 'UPDATE reserva SET pista = ?, dia = ?, hora = ? WHERE id = ?';
	conexion.query(sql, [pista, dia, hora, id], function(error, results) {
		if (error) {
			throw error;

		} else {
			res.send(results);
		}
	});
});

//Eliminar reserva
app.delete('/api/reserva/:id', (req, res) => {
	conexion.query ('DELETE FROM reserva WHERE id = ?', [req.params.id], function(error, filas) {
		if (error) {
			throw error;

		} else {
			res.send(filas);
		}
	});
});

//Creamos las sesiones para el login del usuario
app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));

//Creamos la conexion con el puerto
const server = app.listen(app.get('port'), () => {
	console.log('listening on port ', app.get('port'));
});

const io = require('socket.io')(server);

io.on('connection', (socket) => {
	socket.on('stream', (image) => {
		//emitir evento a los socket
		socket.broadcast.emit('stream', image);
	});
});

app.use('/', loginRoutes);

app.get('/', (req, res) => {
	if (req.session.loggedin == true) {
		res.render('home', {
			name: req.session.name
		});

	} else {
		res.redirect('/login');
	}
});

app.get('/pago', (req, res) => {
	if (req.session.loggedin == true) {
		res.render('pago', {
			name: req.session.name
		});

	} else {
		res.redirect('/login');
	}
});

app.get('/reserva', (req, res) => {
	if (req.session.loggedin == true) {
		res.render('reserva', {
			name: req.session.name
		});

	} else {
		res.redirect('/login');
	}
});

app.get('/resultados', (req, res) => {
	if (req.session.loggedin == true) {
		res.render('resultados', {
			name: req.session.name
		});

	} else {
		res.redirect('/login');
	}
});

app.get('/emision', (req, res) => {
	if (req.session.loggedin == true) {
		res.render('emision', {
			name: req.session.name
		});

	} else {
		res.redirect('/login');
	}
});

