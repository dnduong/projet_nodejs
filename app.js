//http.Server(requestListener);
var express = require('express');
var app = express();
var session =  require('express-session');
var publicDir = require('path').join(__dirname,'/public');
app.use(express.static(publicDir));

app.listen(8080);
app.set('view engine','ejs');

//fileupload "Formidable"
var formidable = require('formidable');
var mv = require('mv');

//sha1
var sha1 = require('sha1');

//Session
app.use(session({
	secret: '2C44-4D44-WppQ38S',
    resave: true,
    saveUninitialized: true
}));

//bodyParser
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

//mysql
var mysql = require('mysql');

var con = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "tiengamo",
	database: "DM_web"
});

con.connect(function(err) {
	if (err) throw err;
	console.log("Connected!");
	var sql = "CREATE TABLE users (nom VARCHAR(255), prenom VARCHAR(255), sexe VARCHAR(10), login VARCHAR(255), password VARCHAR(255), avatar VARCHAR(255), text VARCHAR(255))";
 	con.query(sql, function (err, result) {
    	if (err) console.log("error while creating table");
    	else console.log("Table created");
	});
	var sql2 = "CREATE TABLE relationships (like_first VARCHAR(255), like_after VARCHAR(255), status VARCHAR(255))"; 
	con.query(sql2, function (err, result) {
    	if (err) console.log("error while creating table");
    	else console.log("Table created");
	});
});


//request
app.post('/register',function (req,res) {
	con.query("SELECT login FROM users", function (err,result) {
		if(err) throw err;
		var check = true;
		for(var i = 0; i < result.length; i++){
			if (result[i].login == req.body.log) {
				check = false;
			};
		}
		if(check){
			var insert = "INSERT INTO users (nom, prenom, sexe, login, password, avatar) VALUES ?"
			var value = [[req.body.nom, req.body.prenom, req.body.sexe, req.body.log, sha1(req.body.pass),'defaut.jpg']]
			con.query(insert, [value], function (err,result) {
				if(err) console.log("error while creating account");			
			});
			var create = "CREATE TABLE " + req.body.log + "_images (images VARCHAR(255))";
			con.query(create, function (err, result) {
    			if (err) console.log("error while creating table");
    			else console.log("Table created");
			});
			res.render('result.ejs',{path :'.',message : 'L\'inscription'});
		}else{
			res.render('register.ejs',{message : 'Login déjà utilisé'});
		}
	});
});

app.use('/register',function (req,res) {
	res.render('register.ejs',{message : ''});
});
app.use('/home',function (req,res) {
	if(req.session.user){
		var select = "SELECT like_first FROM relationships WHERE status = \'1_side\' and like_after = \'"+req.session.user+"\'";
		con.query(select,function (err,result) {
			if(err) throw err;
			if(result.length == 0){
				res.render('home.ejs');
			}else{
				var array = "(";
				for(var i = 0; i < result.length; i++){
					if(i != result.length - 1){
						array = array + "\'" + result[i].like_first + "\'" + ",";
					}else{
						array = array + "\'" + result[i].like_first + "\'";
					}
				}
				array += ")";
				var select_1 = "SELECT login,text,avatar FROM users WHERE login IN"+ array;
				con.query(select_1,function (err,result) {
					if(err) throw err;
					res.render('all_user.ejs',{user : result, title : 'Home', message :'Les personnes suivantes vous ont aimé, aimez-les en retour :'});
				});
			}
		})
	}else{
		res.render('home.ejs');
	}
});

app.post('/login', function (req, res) {
	var select = "SELECT login,password FROM users";
	con.query(select, function (err,result) {
		if(err) throw err;
		if(result.length == 0) 	res.render('login.ejs',{message : 'Login n\'existe pas'});
		for(var i = 0; i < result.length; i++){
			if(req.body.log != result[i].login){
				if(i == result.length - 1)
					res.render('login.ejs',{message : 'Login n\'existe pas'});
				else continue;
			}else{ 
				if(sha1(req.body.pw) != result[i].password){
					res.render('login.ejs',{message : 'Mot de passe incorrect'});
					break;
				}else{
					req.session.user = req.body.log;
					res.render('result.ejs',{path :'.',message : 'L\'authentification'});
					break;
				}
			}
		}
	});
});

app.use('/login',function (req,res) {
	res.render('login.ejs',{message : ''});
});

app.use('/friends',function (req,res) {
	if(req.session.user){
		var select = "SELECT like_first,like_after FROM relationships WHERE status=\'matched\' and (like_first=\'"+req.session.user+"\' or like_after=\'"+req.session.user+"\')";
		con.query(select,function (err,result) {
			if(err) throw err;
			if(result.length == 0) 	res.render('friend.ejs',{message : 'Vous n\'avez  pas encore d\'amis'});
			else{
				var tab = [];
				for(var i = 0; i < result.length; i++){
					if(result[i].like_first == req.session.user){
						tab.push(result[i].like_after);
					}else{
						tab.push(result[i].like_first);
					}
				}
				var array = "(";
				for(var i = 0; i < tab.length; i++){
					if(i != tab.length - 1){
						array = array + "\'" + tab[i] + "\'" + ",";
					}else{
						array = array + "\'" + tab[i] + "\'";
					}
				}
				array += ")";
				var select_1 = "SELECT login,text,avatar FROM users WHERE login IN"+ array;
				con.query(select_1,function (err,result) {
					if(err) throw err;
					res.render('all_user.ejs',{user : result, title : 'Liste d\'amis', message :'Vos amis : '});
				});
			}
		});
	}else{
		res.render('need_connection.ejs',{path : '.'});
	}
})

app.use('/upload_image',function (req,res) {
	if(req.session.user){
		res.render('upload_image.ejs',{message :'Ajouter une image',
										action : 'image'});
	}else{
		res.render('need_connection.ejs',{path : '.'});
	}
});

app.post('/search',function (req, res) {
	if(req.session.user){
		var select;
		if(req.body.nom == ""){
			select = "SELECT login,text,avatar FROM users WHERE sexe = \'"+req.body.sexe+"\'";
		}else{
			select = "SELECT login,text,avatar FROM users WHERE sexe = \'"+req.body.sexe +"\' and login = \'"+req.body.nom+"\'";
		}
		con.query(select, function (err,result) {
			if (err) throw err;
			if(result.length == 0){
				res.render('failure.ejs');
			}else{
				res.render('all_user.ejs',{user : result, title : 'Recherche', message :'Voici le résultat de votre recherche :'});				
			}
		});
	}else{
		res.render('need_connection.ejs',{path : '.'});
	}
});

app.use('/search',function (req, res) {
	if(req.session.user){
		res.render('search.ejs');
	}else{
		res.render('need_connection.ejs',{path : '.'});
	}
});

app.post('/like/:id',function (req, res) {
	var select = "SELECT * FROM relationships WHERE like_after = \'"+req.session.user+"\' and like_first = \'"+req.params.id+"\'";
	con.query(select, function (err,result) {
		if(err) console.log('error select');
		if(result.length == 0){
			var insert = "INSERT INTO relationships (like_first, like_after, status) VALUES ?"
			var value = [[req.session.user, req.params.id, '1_side']]
			con.query(insert, [value], function (err,result) {
				if(err) console.log("error while creating account");			
			});
		}else{
			var update = "UPDATE relationships SET status = \'matched\' WHERE like_after = \'"+req.session.user+"\' and like_first = \'"+req.params.id+"\'";
			con.query(update, function (err,result) {
				if(err) throw err;			
			});
		}
		res.render('result.ejs',{path :'..',message :'L\'action'});
	})
})

app.use('/all_users/:id',function (req, res) {
	if(req.session.user){
		var select_0 = "SELECT like_first,like_after,status FROM relationships";
		con.query(select_0, function (err,result) {
			if(err) console.log("error : select");
			var check = true;
			for(var i=0; i<result.length; i++){
				if(result[i].status == '1_side'){
					if(result[i].like_first == req.session.user &&
						result[i].like_after == req.params.id){
						check = false;
					}
				}else{
					if ((result[i].like_first == req.session.user &&
						result[i].like_after == req.params.id) || 
						(result[i].like_after == req.session.user &&
						result[i].like_first == req.params.id)){
						check = false;
					}
				}
			}
			var select = "SELECT * FROM " + req.params.id +"_images";
			con.query(select,function (err,result) {
				if(err) console.log("error : select");
				res.render('images.ejs',{user : result,username : req.params.id, path : '..', print : check});
			});
		})
	}else{
		res.render('need_connection.ejs',{path : '..'});
	}
});

app.use('/all_users',function (req,res) {
	if(req.session.user){
		var select = "SELECT login,text,avatar FROM users WHERE login != \'"+req.session.user+"\'";
		con.query(select, function (err,result) {
			if (err) throw err;
			res.render('all_user.ejs',{user : result, title : 'Utilisateurs', message : ''});
		});
	}else{
		res.render('need_connection.ejs',{path : '.'});
	}
});

app.use('/change_image',function (req,res) {
	if(req.session.user){
		res.render('upload_image.ejs',{message :'Changer l\'image de profil',
										action : 'avatar'});
	}else{
		res.render('need_connection.ejs',{path : '.'});
	}
});

app.post('/change_pass',function (req,res) {
	var update = "UPDATE users SET password = \'"+sha1(req.body.pass)+"\' WHERE login = \'"+req.session.user+"\'";
    con.query(update, function (err,result) {
			if(err) throw err;			
		});
	res.render('result.ejs',{path :'.',message : 'Modification'});
});

app.post('/change_text',function (req,res) {
	var update = "UPDATE users SET text = \'"+req.body.new_text+"\' WHERE login = \'"+req.session.user+"\'";
    con.query(update, function (err,result) {
			if(err) throw err;			
		});
	res.render('result.ejs',{path :'.',message : 'Modification'});
});

app.use('/change_pass',function (req,res) {
	if(req.session.user){
		res.render('change_profile.ejs',{action : 'pass'});
	}else{
		res.render('need_connection.ejs',{path : '.'});
	}
});

app.use('/change_text',function (req,res) {
	if(req.session.user){
		res.render('change_profile.ejs',{action : 'text'});
	}else{
		res.render('need_connection.ejs',{path : '.'});
	}
});

app.use('/change',function (req,res) {
	if(req.session.user){
		con.query("SELECT * FROM users WHERE login = \'" + req.session.user + "\'", function (err,result) {
			if(err) throw err;
			else{

				res.render('profile.ejs',{user : 'Bonjour, '+ result[0].nom + ' ' + result[0].prenom,
												text : result[0].text,
												image : result[0].avatar,
												login : result[0].login});
			}
		});

	}else{
		res.render('need_connection.ejs',{path : '.'});
	}
});

app.use('/image',function (req,res) {
	if(req.session.user){
		var select = "SELECT images FROM " + req.session.user + "_images";
		con.query(select, function (err,result) {
			if(err) console.log('error while taking images from database');
			else res.render('images.ejs',{user : result,username : req.session.user, path : '.', print : false});		
		});
	}else{
		res.render('need_connection.ejs',{path : '.'});
	}
});

app.post('/fileupload',function (req,res) {
	var form = new formidable.IncomingForm();
	form.parse(req, function (err, fields, files) {
    	var oldpath = files.filetoupload.path;
    	//repertoire qui stocke les images
    	var newpath = 'public/images/' + req.session.user + '/' + files.filetoupload.name;
    	mv(oldpath, newpath, {mkdirp: true}, function (err) {
    		if (err) throw err;
    		var insert = "INSERT INTO " + req.session.user + "_images (images) VALUES ?";
    		var value =[[files.filetoupload.name]];
    		con.query(insert, [value], function (err,result) {
				if(err) throw err;			
			});
    		res.render('result.ejs',{path :'.',message : 'L\'ajout'});
		});
	})
});

app.post('/avatarupload',function (req,res) {
	var form = new formidable.IncomingForm();
	form.parse(req, function (err, fields, files) {
    	var oldpath = files.filetoupload.path;
    	//repertoire qui stocke les images
    	//oh lala
	var newpath = 'public/images/' + req.session.user + '/' + files.filetoupload.name;
    	mv(oldpath, newpath, {mkdirp: true}, function (err) {
    		if (err) throw err;
    		var update = "UPDATE users SET avatar = \'"+files.filetoupload.name+"\' WHERE login = \'"+req.session.user+"\'";
    		con.query(update, function (err,result) {
				if(err) throw err;			
			});
    		res.render('result.ejs',{path :'.',message : 'L\'ajout'});
		});
	})
});


app.get('/logout',function (req, res) {
	req.session.destroy();
	res.render('result.ejs',{message : 'Déconnection',path : '.'});
});

