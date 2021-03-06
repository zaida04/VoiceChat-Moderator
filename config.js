require("dotenv").config();
let env_variables = ["token", "database_uri"];
let env_variables_object = {};
env_variables.forEach(x => {
	if (!process.env[x.toUpperCase()]) throw new Error(`Sorry, but ${x} is not present in the .env file. You can add it like this: ${x.toUpperCase()}=EXPECTEDVALUE`);
	env_variables_object[x] = process.env[x.toUpperCase()];
});

export default env_variables_object;