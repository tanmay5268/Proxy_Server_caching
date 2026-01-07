const {Server_init} = require('./index.js')
const { Command } = require('commander');
const program = new Command()
program
    .name('CLI for proxy arguments')
    .requiredOption('-p, --port <number>','port for proxy server')
    .requiredOption('-b, --url <url>','backend_url')
    .option('--ttl <number>','time for caching','60')

program.parse(process.argv);

const options = program.opts();

Server_init({ proxy_port:Number(options.port), backend_url:options.url, ttl:Number(options.ttl) })
