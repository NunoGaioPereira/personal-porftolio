const path = require('path');
const express = require('express');
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');

dotenv.config({ path:'./config/config.env' });

const app = express();
app.use(express.json());
app.use(express.static(__dirname + '/public'));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/public'));


app.get('/', (req, res) => {
	res.render('index');
})

app.get('/services', (req, res) => {
	res.render('services');
})

app.get('/portfolio', (req, res) => {
	res.render('portfolio');
})

app.get('/about', (req, res) => {
	res.render('about');
})

app.get('/contact', (req, res) => {
	res.render('contact');
})

app.post('/contact', (req, res) => {
	console.log(req.body);

	const transporter = nodemailer.createTransport({
		service: 'gmail',
		auth: {
			user: 'nunogaiopereira@gmail.com',
			pass: process.env.PASS
		}
	});

	const mailOptions = {
		from: req.body.email,
		to: 'nunogaiopereira@gmail.com',
		subject: `Message from ${req.body.name} - `,
		text: `From: ${req.body.email}
Name: ${req.body.name}
Message: ${req.body.message}`
	}

	transporter.sendMail(mailOptions, (error, info) => {
		if(error) {
			console.log(error);res.send('error');
		}
		else {
			console.log('Email sent: ' + info.response);
			res.send('success');
		}
	})
})

// @TODO Optimise and config file
const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`));
