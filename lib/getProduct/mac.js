/**
 * @author Funny002
 * @email 2048412928@qq.com
 * @url  http://www.github.com/Funny002
 */

const command = 'mdfind "kMDItemCFBundleIdentifier==com.adobe.*"';

function handleStdout(stdout) {
  const reg = /\/Adobe\s(.+?(?=\s\d{4}))/;
  const target = {};
  for (const paths of stdout.split('\n')) {
    const [_, name] = paths.match(reg) || [];
    if (name) target[name.toLowerCase()] = paths;
  }
  return target;
}

module.exports = {command, handleStdout};
