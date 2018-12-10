const fs = require("fs");
const path = require("path");

const execSync = require("child_process").execSync;

const gqlfilesPath = path.join(__dirname, "../src/", "gqlfiles");
const schemafilePath = path.join(__dirname, "../", "schema.gql");

fs.writeFileSync(schemafilePath, "");
fs.readdirSync(gqlfilesPath).forEach(fileName => {
	const content = fs.readFileSync(path.join(gqlfilesPath, fileName), {
		encoding: "utf8"
	});
	if (content) {
		fs.appendFileSync(schemafilePath, content, {
			encoding: "utf8"
		});
	}
});

execSync("graphql-to-typescript schema.gql src/schemadef.ts");
execSync("apollo-codegen introspect-schema schema.gql --output schema.json");
