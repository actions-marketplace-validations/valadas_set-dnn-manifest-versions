import * as core from '@actions/core';
import * as glob from '@actions/glob';
import { readFileSync, writeFile, createReadStream } from 'fs';
import * as readline from 'readline';
import * as xml2js from 'xml2js';

async function run() {
    try {
        const version = core.getInput('version');
        let globPattern = core.getInput('glob');
        const skipFile = core.getInput('skipFile');

        // Generate the glob if skipFile is provided
        if (skipFile !== null && skipFile.length > 0) {
            globPattern = "./**/*.dnn ";
            const fileStream = createReadStream(skipFile);
            const rl = readline.createInterface({
                input: fileStream,
                crlfDelay: Infinity
            });
            for await (const line of rl) {
                globPattern += " !" + line;
            }
        }

        // Get the files
        const globber = await glob.create(globPattern);
        const files = await globber.glob();
        files.forEach(file => {
            // Read the manifest
            const manifestFile = readFileSync(file);
            const parser = new xml2js.Parser();
            parser.parseStringPromise(manifestFile.toString())
                .then(result => {
                    // Update manifest version
                    const packages = result.dotnetnuke.packages;
                    for (let i = 0; i < packages[0].package.length; i++) {
                        const dnnPackage = packages[0].package[i];
                        dnnPackage.$.version = version;
                        console.log(`Set ${dnnPackage.$.name} to version ${version}`)
                    }

                    // Write back the manifest
                    const builder = new xml2js.Builder({
                        headless: true,
                        cdata: true
                    });
                    const newManifestXml = builder.buildObject(result);
                    writeFile(file, newManifestXml, err => {
                        if (err){
                            core.setFailed(err.message);
                        }
                        else{
                            console.log(file + ' saved.');
                        }
                    })
                });
        });
    } catch (error) {
        core.setFailed(error.message);
    }
}

run()

export default run;