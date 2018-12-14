var express = require('express');
var router = express.Router();
var session = require('express-session');

router.use(session(
{
	secret: "secret",
	proxy: true,
	resave: false,
	saveUninitialized: true

}));

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.get('/messages', function(req, res) {
  
  var messages = req.session.messages;
  
  res.send(messages);
  
});

router.post('/messages', function(req, res){
	
	if(req.session.messages){
		req.session.messages.push({
			name: req.body.name,
			message: req.body.message,
			time: new Date() 
		});
	}
	else{
		
		var messages = [];
		
		messages.push({
			name: req.body.name,
			message: req.body.message,
			time: new Date() 
		});
		
		req.session.messages = messages;
	}
	
	res.send(req.session.messages);
	
});

function newMessages(time, messages){
	
	var result = [];
	
	for(i=0; i < messages.length; i++)
		if(messages[i].time != time)
			result.push(messages[i]);
			
	return result;
			
}

router.delete('/messages', function(req, res) {
  
	var time = req.query.time;
  
	var messages = newMessages(time, req.session.messages);
  
	req.session.messages = messages;
  
	res.send(req.session.messages);
  
});

module.exports = router;
