const fs = require('fs');

// Get environment name from argument
const environment = process.argv[2];

// read the content of the json file
const envFileContent = fs.readFileSync(
    `${__dirname}/../../envs/${environment}`,
    'utf8'
);

// copy the json inside the env.json file
fs.writeFileSync('.env', envFileContent);
