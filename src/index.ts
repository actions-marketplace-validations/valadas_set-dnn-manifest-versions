import * as core from '@actions/core';
import * as glob from '@actions/glob';
import { readFileSync, writeFile } from 'fs';
import * as xml2js from 'xml2js';

async function run() {
    console.log("in run method");
    try {
        const version = core.getInput('version');
        const globPattern = core.getInput('glob');

        // Get the files
        const globber = await glob.create(globPattern);
        const files = await globber.glob();
        console.log('got files', files);
        files.forEach(file => {
            console.log('processing file', file)
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
                        console.log(`Set ${file} to version ${version}`)
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