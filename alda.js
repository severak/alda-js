var parseArgs = require('minimist');
var JZZ = require('jzz');
var alda = require('./js/index');
var fs = require('fs');

var argv = parseArgs(process.argv.slice(2));

if (argv['test-midi']) {
    console.log('testing MIDI out...');
    JZZ().or('Cannot start MIDI engine!')
        .openMidiOut().or('Cannot open MIDI Out port!')
        .wait(500).send([0x90,60,127]) // note on
        .wait(500).send([0x80,60,0]).and('OK');  // note off
}

if (argv['test-parser']) {
    var filename = argv['test-parser'];
    var source = fs.readFileSync(filename, 'utf8');
    try {
        var parsed = alda.parser.parse(source);
        console.log(JSON.stringify(parsed, null, 3));
    } catch (error) {
        console.error(error.message);
    }
}
