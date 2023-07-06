/**
 * @author Funny002
 * @email 2048412928@qq.com
 * @url  http://www.github.com/Funny002
 */

const command = 'reg query "HKEY_LOCAL_MACHINE\\SOFTWARE\\WOW6432Node\\Microsoft\\Windows\\CurrentVersion\\App Paths" /s | findstr "Adobe *"';

function handleStdout(stdout) {
  const reg = /\s+REG_SZ\s+"?(.+\\(.+)\.exe)"?$/;
  const target = {};
  for (const item of stdout.split('\r\n')) {
    const [_, paths, name] = item.match(reg) || [];
    if (paths && name) {
      const [_, newName] = name.match(/Adobe\s(.+)/) || [];
      target[(newName ? newName : name).toLowerCase()] = paths;
    }
  }
  return target;
}

module.exports = {command, handleStdout};
