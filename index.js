#!/usr/bin/env node

const debounce = require('lodash.debounce');
const chokidar = require('chokidar');
const program = require('caporal');
const fs = require('fs');
const { spawn } = require('child_process');

program
    .version('0.0.1')
    .argument('[filename]', 'Name of a file to execute')
    // destructure filename out of the args object
    .action(async ({ filename }) => {
        // if there is a filename, then use it. If not, then default to index.js
        const name = filename || 'index.js';

        // gotta put the promise in a try/catch block
        try {
            await fs.promises.access(name);
        } catch (err) {
            throw new Error(`Could not find the file ${name}`);
        }
        
        const start = debounce(() => {
            spawn('node', [name], { stdio: 'inherit' });
        }, 100);
        
        chokidar.watch('.')
            .on('all', start)
            .on('change', start)
            .on('unlink', start);
    });

program.parse(process.argv);

