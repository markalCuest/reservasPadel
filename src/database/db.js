const mysql = require('mysql');

//Establecemos los parametros de conexion a la base de datos
var conexion = mysql.createConnection({
	host: 'mysql-marcoscuesta.alwaysdata.net',
	user: '271383',
	password: 'CursoDaw.9',
	database: 'marcoscuesta_reservas_padel'
});

module.exports = conexion;
