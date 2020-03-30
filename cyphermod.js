const fs = require('fs');
const crypto = require('crypto');

const _ = {};
const alp = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z',];
const alpPos = {'a':1,'b':2,'c':3,'d':4,'e':5,'f':6,'g':7,'h':8,'i':9,'j':10,'k':11,'l':12,'m':13,'n':14,'o':15,'p':16,'q':17,'r':18,'s':19,'t':20,'u':21,'v':22,'w':23,'x':24,'y':25,'z':26};


/**
 * Creates a file with the api response data
 * @param {object} res 
 * @return {function} with the response data
 */
function createFile(res, cb) {
  const { data } = res;
  
  fs.writeFile('answer.json', JSON.stringify(data), function(err) {
    if(err) throw err;
    cb();
  })
  
  return function() {
    return data;
  }
}

function decriptCypher(data){
  data.decifrado = findChar(data.numero_casas, data.cifrado);
  return data;
}

function setSummary(data) {
  data.resumo_criptografico = sha1Hash(data.decifrado);
}

function sha1Hash(string) {
  const hash = crypto.createHash('sha1');
  return hash.update(string).digest('hex');
}

function findChar(n, str) {
  let len = str.length;
  let newStr = '';

  for(let i = 0; i < len; i++) {
    
    let cpos = alpPos[str[i]] - 1;
    let dpos = alpPos[str[i]] - n;

    if(dpos > 26) {
      dpos = dpos - 26;
    }

    if(dpos < 1) {
      dpos = dpos + 26;
    }
   
    if(str[i] == alp[cpos] ) {
      newStr = newStr + alp[dpos - 1];
    } else {
      newStr = newStr + str[i];
    }
  }
  return newStr;
}

_.createFile = createFile;
_.decriptCypher = decriptCypher;
_.setSummary = setSummary;


module.exports = _;