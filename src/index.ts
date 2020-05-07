import * as core from '@actions/core';
import * as glob from '@actions/glob';
import { readFileSync, writeFile, createReadStream } from 'fs';
import * as readline from 'readline';

async function run() {
    try {
        const version = core.getInput('version');
        let globPattern = core.getInput('glob');
        const skipFile = core.getInput('skipFile');
        const includeSolutionInfo = core.getInput('includeSolutionInfo').toUpperCase() === "TRUE";
        console.log("skipFile provided: ", skipFile);

        // Generate the glob if skipFile is provided
        if (skipFile !== null && skipFile.length > 0) {
            globPattern = "**/*.dnn";
            const fileStream = createReadStream(skipFile);
            const rl = readline.createInterface({
                input: fileStream,
                crlfDelay: Infinity
            });
            for await (const line of rl) {
                globPattern += "\n!" + line;
                console.log("Adding " + line + " to ignored globs.");
            }
            console.log("Using glob: ", globPattern);
            core.debug("Using glob: " + globPattern);
        }

        // Get the files
        const globber = await glob.create(globPattern);
        const files = await globber.glob();
        files.forEach(file => {
            // Read the manifest
            const manifestContent = readFileSync(file).toString();
            const manifestRegex = new RegExp(/<package.*name.*version="(.*)"/gm)
            manifestContent.replace(manifestRegex, `$1${version}$3`);
        });

        // Handle the solutionInfo.cs file
        if (includeSolutionInfo) {
            const solutionInfoGlob = await glob.create('./**/SolutionInfo.cs', { followSymbolicLinks: false });
            const solutionInfos = await solutionInfoGlob.glob();
            solutionInfos.forEach(solutionInfo => {
                const versionInfo = getVersion(version);
                const formatedVersion = formatVersionForSolutionInfo(versionInfo);
                let solutionInfoContent = readFileSync(solutionInfo).toString();
                solutionInfoContent = solutionInfoContent.replace(
                    /\[assembly: AssemblyVersion\(".*"\)\]/gm, 
                    `[assembly: AssemblyVersion("${formatedVersion}")]`);
                solutionInfoContent = solutionInfoContent.replace(
                    /\[assembly: AssemblyFileVersion\(".*"\)\]/gm, 
                    `[assembly: AssemblyFileVersion("${formatedVersion}")]`);
                solutionInfoContent = solutionInfoContent.replace(
                    /\[assembly: AssemblyInformationalVersion\(".*"\)\]/gm, 
                    `[assembly: AssemblyInformationalVersion("${formatedVersion} Release Candidate")]`);
                writeFile(solutionInfo, solutionInfoContent, err => {
                    if (err){
                        core.setFailed(err.message);
                    }
                    else{
                        console.log(solutionInfo + ' saved.');
                    }
                });
            });
        }
    } catch (error) {
        core.setFailed(error.message);
    }
}

const getVersion = (versionString: string): Version => {
    const parts = versionString.split('.');
    return {
        major: parseInt(parts[0]),
        minor: parseInt(parts[1]),
        patch: parseInt(parts[2])
    };
}

const formatVersionForSolutionInfo = (version: Version): string => {
    return `${version.major}.${version.minor}.${version.patch}.0`;
}

interface Version {
    major: number,
    minor: number,
    patch: number
}

run()

export default run;