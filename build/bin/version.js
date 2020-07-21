var fs = require('fs');
var path = require('path');
var version = process.env.VERSION || require('../../package.json').version;
var sd = require('silly-datetime');
var time = sd.format(new Date(), 'YYYY-MM-DD HH:mm');
var content = { '0.1.0': '0.1.0'};

content['time'] = time;
if (!content[version]) content[version] = '0.1.0';
fs.writeFileSync(path.resolve(__dirname, '../../examples/versions.json'), JSON.stringify(content));
