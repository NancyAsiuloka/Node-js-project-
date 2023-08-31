const logEvents = require('./logEvents');
const EventEmitter = require('events');
class Emitter extends EventEmitter {};
// Initialize Object
const myEmitter = new Emitter();
// add listener for the log event
myEmitter.on('log', (msg) => logEvents(msg));
// Emit event
myEmitter.emit('log', 'Log event emitted');