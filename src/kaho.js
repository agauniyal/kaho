const util = require('util');
const chalk = require('chalk');

const kaho = (_level, _msg, ..._payload) => {
  if (typeof _level !== 'string' || typeof _msg !== 'string') {
    return;
  }
  const level = _level.toUpperCase();

  const env = process.env.NODE_ENV;
  if (env === 'production') {
    if (level !== 'ERROR') {
      return;
    }
  }

  let markLabel;

  switch (level) {
    case 'INFO':
      markLabel = chalk.bgBlue.white.bold;
      break;

    case 'ERROR':
      markLabel = chalk.bgRed.white.bold;
      break;

    case 'DEBUG':
      markLabel = chalk.bgYellow.white.bold;
      break;

    case 'WARNING':
      markLabel = chalk.bgMagenta.white.bold;
      break;

    case 'SUCCESS':
      markLabel = chalk.bgGreen.white.bold;
      break;

    default:
      markLabel = chalk.bgCyan.white.bold;
      break;
  }

  const label = markLabel(' ' + level + ' ');
  const time = chalk.gray.bold(new Date().toLocaleString() + ' - ');

  const logMessage = time + label + ' ' + _msg + '\n';

  if (level === 'ERROR') {
    process.stderr.write(logMessage);
    _payload.forEach(p =>
      process.stderr.write(
        '• ' + util.inspect(p, { colors: chalk.supportsColor }) + '\n'
      )
    );
  } else {
    process.stdout.write(logMessage);
    _payload.forEach(p =>
      process.stdout.write(
        '• ' + util.inspect(p, { colors: chalk.supportsColor }) + '\n'
      )
    );
  }
};

module.exports = kaho;
