import * as core from '@actions/core';

async function run() {
    try {
        core.info("Testing");
    } catch (error) {
        core.setFailed(error.message);
    }
}