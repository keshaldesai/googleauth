# README #

Boilerplate Google OAuth 2.0 authentication server

# Setup #

Requires config folder with three config files setup in this way:

config/

authConfig.json: {
	"clientID": "",
	"clientSecret": "",
	"callbackURL": ""
}

jwtConfig.json: {
	"secret": ""
}

mongoConfig.json {
	"user": "",
	"pass": ""
}
