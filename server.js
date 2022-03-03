// Require Express.js
const express = require('express')
const app = express()
const args = require('minimist')(process.argv.slice(2))
args['port']
const call = args.call
const port = args.port || process.env.PORT || 5000

// Start an app server
const server = app.listen(port, () => {
    console.log('App listening on port %PORT%'.replace('%PORT%',HTTP_PORT))
});

function coinFlip() {
    if(Math.random() < 0.5) {
      return "heads";
    }
    
    return "tails";
}

function coinFlips(flips) {
    let results = [];
  
    for(let i=0; i<flips; i++) {
      results.push(coinFlip());
    }
  
    return results;
}

function countFlips(array) {
    let tails = 0;
    let heads = 0;
  
    array.forEach(element => {
      if(element == "heads") {
        heads++;
      } else if(element == "tails") {
        tails++;
      }
    });

    if(heads == 0 && tails != 0) {
      return { tails: tails };
    } else if(heads != 0 && tails == 0) {
      return { heads: heads};
    } else if(heads != 0 && tails != 0) {
      return { heads: heads, tails: tails}
    } else {
      return {};
    }
    
    return flipcount;
}

function flipACoin(call) {
    let flip = coinFlip();
    let result = "lose";
  
    if(flip == call) {
      result = "win";
    }
  
    const summary = {
      call: call,
      flip: flip,
      result: result
    }
  
    return summary
}

app.get('/app/', (req,res) => {
    // Respond with status 200
    res.statusCode = 200;
    // Respond with status message "OK"
    res.statusMessage = 'OK';
    res.writeHead(res.statusCode, {'Content-Type' : 'text/plain'});
    res.end(res.statusCode + ' ' + res.statusMessage)
});

app.get('/app/flip', (req,res) => {
    res.send({flip: coinFlip()})
});

app.get('/app/flips/:number', (req,res) => {
    res.send(coinFlips(req.params.number))
});

app.get('/app/flips/call/heads', (req,res) => {
    res.status(200).json(flipACoin("heads"))
});

app.get('/app/flips/call/tails', (req,res) => {
    res.status(200).json(flipACoin("tails"))
});

// Default response for any other request
app.use(function(req,res) {
    res.status(404).send('404 NOT FOUND')
});