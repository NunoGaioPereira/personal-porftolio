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
	res.render('index', { pageTitle: 'Home' });
})

app.get('/services', (req, res) => {
	res.render('services', { pageTitle: 'Services' });
})

app.get('/portfolio', (req, res) => {
	res.render('portfolio', { pageTitle: 'Portfolio' });
})

app.get('/about', (req, res) => {
	res.render('about', { pageTitle: 'About' });
})

app.get('/contact', (req, res) => {
	res.render('contact', { pageTitle: 'Contact' });
})

app.get('/policies', (req, res) => {
	res.render('policies', { pageTitle: 'Policies' });
})

app.get('/projects/:slug', (req, res, next)=>{
	res.render('projects/' + req.params.slug, { pageTitle: 'Project Page' })

	// Handle page not found
});


app.get('/pt', (req, res) => {
	res.render('/pt/index', { pageTitle: 'Home' });
})

app.get('/pt/services', (req, res) => {
	res.render('services', { pageTitle: 'Services' });
})

app.get('/pt/portfolio', (req, res) => {
	res.render('portfolio', { pageTitle: 'Portfolio' });
})

app.get('//ptabout', (req, res) => {
	res.render('about', { pageTitle: 'About' });
})

app.get('/pt/contato', (req, res) => {
	res.render('pt/contato', { pageTitle: 'Contact' });
})

app.get('/pt/policies', (req, res) => {
	res.render('policies', { pageTitle: 'Policies' });
})

app.get('/pt/projetos/:slug', (req, res, next)=>{
	res.render('projetos/' + req.params.slug, { pageTitle: 'Project Page' })

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

	response = {
		errors: [],
		success: false,
	};

	var ers = validationResult(req);
	
	ers.array().forEach((er) => {
		response.errors.push(er.msg);
	})

	if (response.errors.length > 0) {
		res.send(response);
		return;
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

app.post(
	'/pt/contact',  
	body('email')
		.isEmail()
		.withMessage('Email inválido'),
	body('name')
		.isLength({
			min: 2,
			max: 30
		})
		.withMessage('O Nome dever ter entre 2-30 caracteres'),
	body('message')
		.isLength({
			min: 5,
			max: 500
		})
		.withMessage('A Mensagem dever ter entre 5-500 caracteres'),
	(req, res) => {

	response = {
		errors: [],
		success: false,
	};

	var ers = validationResult(req);
	
	ers.array().forEach((er) => {
		response.errors.push(er.msg);
	})

	if (response.errors.length > 0) {
		res.send(response);
		return;
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
			response.errors.push('Não foi possível enviar a mensagem. Por favor tente novamente.');
			res.send(response);
			// res.send('Could not send email. Please try again');
		}
		else {
			response.success = true;
			console.log('Email enviado: ' + info.response);
			res.send(response);
		}
	})
})

// @TODO Optimise and config file
const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`));
