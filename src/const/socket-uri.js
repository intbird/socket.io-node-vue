const remote = 'remote';
const client = 'client';
const remoteUri = {
  clipboardGet: 'socketio://' + remote + '/clipboardGet',
  clipboardSet: 'socketio://' + remote + '/clipboardSet',

  screenshot: 'socketio://' + remote + '/screenshot',
};

const clientUri = {
  clipboardGet: 'socketio://' + client + '/clipboardGet',

  screenshot: 'socketio://' + client + '/screenshot',
};

export {remoteUri, clientUri};
