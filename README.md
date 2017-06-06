# README #

Boilerplate server that uses Google OAuth 2.0 to authenticate user. Provides a token to client-side application.

# Setup #

Requires config folder with three config files setup in this way:

config/

//google oauth credentials
authConfig.json: {
	"clientID": "",
	"clientSecret": "",
	"callbackURL": ""
}

//jwt secret for encoding/decoding
jwtConfig.json: {
	"secret": ""
}

//mongoDB user information
mongoConfig.json {
	"user": "",
	"pass": ""
}