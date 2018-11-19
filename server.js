 
var express = require('express');
var app = express();
app.use(express.static(__dirname + '/build'));
 
 
 
app.get('/registeruser', function (req, res) {
  res.json({
	  user: {
		  userName: "newUser!"
	  }
  })
})
app.post('/restoreusermail ', function (req, res) {
  res.json({
	  user: {
		  userName: "userPassRestoring!"
	  }
  })
})
 
app.post('/signinuser', function (req, res) {
  res.json({
	  user: {
		  userName: "newUser!",
		  entered: true
	  } 
  })
})
 
 
 app.post('/resetusermail', function (req, res) {
  res.json({
	  mail: "reseted", 
  })
})


 app.post('/getnewpassword', function (req, res) {
  res.json({
	  mail: "reseted", 
  })
})
 

app.get('/logoutuser', function (req, res) {
  res.json({
	  loggedOut: "true", 
  })
})

app.get('/setpass', function (req, res) {
  res.json({
	  passWasReset: "true", 
  })
})

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

console.log("server is running")
 
app.listen(8080)