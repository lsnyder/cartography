#! /usr/bin/env node

var fs = require('fs');
var elasticsearch = require('elasticsearch');
var flags = require('optimist')
  .usage('Usage: ./index.js -e localhost -p ~/mappings.json')
  .demand(['p'])
  .options('e', {
    alias: 'environment',
    default: 'localhost'
  })
  .describe('e', 'Elastic environment')

.options('p', {
    alias: 'path'
  })
  .describe('p', 'Path to mapping object')
  .argv;

var indexOpts = JSON.parse(fs.readFileSync(flags.path, 'utf8'));
var client = new elasticsearch.Client({
  host: "localhost:9200",
  log: 'error',
  requestTimeout: '3600000',
  maxSockets: 5
});
client.indices.create(indexOpts, function(err){
  if (err) { return console.log('Could not initialize logger!!!', err); }
});
