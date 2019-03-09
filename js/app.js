// replace these values with those generated in your TokBox Account
var apiKey = "46283672";
var sessionId = "2_MX40NjI4MzY3Mn5-MTU1MjA5NDI4ODA5M35PN3kxcmMxVnlIYnd0aE5jNGpaSHR4ald-fg";
var token = "T1==cGFydG5lcl9pZD00NjI4MzY3MiZzaWc9YTY4NGQ3MzA0YTVjNjY1MDM3YzE2OWE2Yjg3NDU4YTUyNTkxNTRmMDpzZXNzaW9uX2lkPTJfTVg0ME5qSTRNelkzTW41LU1UVTFNakE1TkRJNE9EQTVNMzVQTjNreGNtTXhWbmxJWW5kMGFFNWpOR3BhU0hSNGFsZC1mZyZjcmVhdGVfdGltZT0xNTUyMDk0MzcyJm5vbmNlPTAuMTg1MDMzNjY2NDgyNjg4ODImcm9sZT1wdWJsaXNoZXImZXhwaXJlX3RpbWU9MTU1MjA5Nzk3MSZpbml0aWFsX2xheW91dF9jbGFzc19saXN0PQ==";

// (optional) add server code here
    var SERVER_BASE_URL = 'https://wink-smile.herokuapp.com/';
    fetch(SERVER_BASE_URL + '/session').then(function(res) {
      return res.json()
    }).then(function(res) {
      apiKey = res.apiKey;
      sessionId = res.sessionId;
      token = res.token;
      initializeSession();
    }).catch(handleError);

// Handling all of our errors here by alerting them
function handleError(error) {
  if (error) {
    alert(error.message);
  }
}

function initializeSession() {
  var session = OT.initSession(apiKey, sessionId);

  // Subscribe to a newly created stream
  session.on('streamCreated', function(event) {
  session.subscribe(event.stream, 'subscriber', {
    insertMode: 'append',
    width: '100%',
    height: '100%'
  }, handleError);
});

  // Create a publisher
  var publisher = OT.initPublisher('publisher', {
    insertMode: 'append',
    width: '100%',
    height: '100%'
  }, handleError);

  // Connect to the session
  session.connect(token, function(error) {
    // If the connection is successful, publish to the session
    if (error) {
      handleError(error);
    } else {
      session.publish(publisher, handleError);
    }
  });
}
