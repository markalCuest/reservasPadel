const mysql = require('mysql');

//Establecemos los parametros de conexion a la base de datos
var conexion = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: '',
	database: 'reservas_padel'
});

module.exports = conexion;
