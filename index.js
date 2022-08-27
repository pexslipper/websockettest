const express = require('express')
const cors = require('cors')
const app = express()
const server = require('http').createServer(app);
const WebSocket = require('ws');
let cars = '';
const res = [];

function messageDetail(name,message) 
{
  this.Name = name;
  this.Message = message;
}
const message = new messageDetail(res,"hello")
console.log(message)
app.use(cors())
const mysql = require('mysql2');
const { type } = require('os');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'baanpolhuay'
  });

  // setInterval(() => {  
    connection.query(
    'SELECT * FROM `project` ORDER BY `project`.`d_dayActive` DESC LIMIT 1 ',
    function(err, results, fields) {
    //  console.log(results); // results contains rows returned by server
      // console.log(fields); // fields contains extra meta data about results, if available
      cars = results;
      console.log(JSON.stringify(cars));
      // console.log(cars[0].d_five);
      res.push
      (
        cars[0].d_five,
        cars[0].d_four,
        cars[0].d_three,
        cars[0].d_twoTop,
        cars[0].d_twoBot,
        cars[0].d_dayActive
      )
      // console.log(res);
    

      
  }
);
  // },3000);


const wss = new WebSocket.Server({ server:server });

wss.on('connection', function connection(ws) {
  
  console.log('A new client Connected!');
  // ws.send('Welcome New Client!');
  ws.send(JSON.stringify(message));
  // ws.send(JSON.stringify(cars));

  

  ws.on('message', function incoming(message) {
    console.log('received: %s', message);
    ws.send('got ur message');

    wss.clients.forEach(function each(client) {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
    
  });

  
});



app.get('/test', function(req,res ,next){
    connection.query(
          'SELECT * FROM `viet`',
          function(err, results, fields) {
              res.json(results)
           console.log(results); // results contains rows returned by server
            console.log(fields); // fields contains extra meta data about results, if available
        }
      );
    })

server.listen(5000, () => console.log(`Lisening on port :3000`))