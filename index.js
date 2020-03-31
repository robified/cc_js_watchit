#!/usr/bin/env node

const debounce = require('lodash.debounce');
const chokidar = require('chokidar');

const start = debounce(() => {
    console.log('STARTING USER\'S PROGRAM')
}, 100);

chokidar.watch('.')
    .on('all', start)
    .on('change', () => console.log('FILE CHANGED'))
    .on('unlink', () => console.log('FILE UNLINKED'));