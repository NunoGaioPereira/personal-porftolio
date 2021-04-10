npm init
npm install express bcrypt
npm install --save-dev nodemon
"start": "nodemon server.js"


const express = require('express');
const app = express();
const port = process.env.port || 3000;

app.get('/', function (req, res) {
	res.send('Hello!');
})

app.get('/about', function (req, res) {
	res.send('About!');
})

app.listen(port, () => {
	console.log('Baaam');
})



// Middleware
function logger(res, req, next) {

	next();
}




app.get('/admin', authUser, function (req, res) {
	res.send('About!');
})

fuction (authUser(req, res, next) {
	if (req.user == null) {
		res.status(403); // Not found
		return res.send('SIng in!');
	}

	next();
})




const things = require("./routes/things")
app.use(things)


// Router
let router = express.Router();
router


module.exports = router;
