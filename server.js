const path = require('path');
const express = require('express');
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
const { body, validationResult } = require('express-validator');


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

app.get('/projects/:slug', (req, res, next)=>{
	res.render('projects/' + req.params.slug)

	// Handle page not found
});

app.post(
	'/contact',  
	body('email')
		.isEmail()
		.withMessage('Invalid email'),
	body('name')
		.isLength({
			min: 2,
			max: 30
		})
		.withMessage('Name must be between 2-30 characters'),
	body('message')
		.isLength({
			min: 5,
			max: 500
		})
		.withMessage('Message must be between 5-500 characters'),
	(req, res) => {
	console.log(req.body);

	response = {
		errors: [],
		success: false,
	};

	var ers = validationResult(req);
	
	ers.array().forEach((er) => {
		console.log(er.msg);
		response.errors.push(er.msg);
	})

	if (response.errors.length > 0) {
		res.send(response);
	}

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
			// console.log(error);
			response.success = true;
			response.errors.push('Could not send message. Please try again.');
			res.send(response);
			// res.send('Could not send email. Please try again');
		}
		else {
			response.success = true;
			console.log('Email sent: ' + info.response);
			res.send(response);
		}
	})
})

// @TODO Optimise and config file
const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`));
