const api = require('./api');
const _ = require('./cyphermod');
const fs = require('fs');
const FormData = require('form-data');

const promObj = api.instance.get(`/generate-data?token=${api.token}`);

promObj.then(function(res){
  
  _.decriptCypher(res.data);
  _.setSummary(res.data);
  _.createFile(res, sendFile)();

});

function sendFile(){
  const fd = new FormData();
  const stream = fs.createReadStream(__dirname + '/answer.json');

  fd.append('answer', stream, {filename: 'answer'});

  let formHeaders = fd.getHeaders();

  api.instance.post(`/submit-solution?token=${api.token}`, fd,  {
    headers: { ...formHeaders }
  }).then(function() { console.log('OK'); })
}