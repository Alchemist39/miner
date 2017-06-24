// берём Express
var express = require('express');
var bodyParser = require('body-parser');

// создаём Express-приложение
var app = express();

app.use(express.static('client'));
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(bodyParser.json()); // for parsing application/json
// создаём маршрут для главной страницы
// http://localhost:8080/

// сохраняем в базу количество полученной от курьера руды
app.post('/app/addOre/:value', function(req, res) {
  	res.json(req.body);
  	var oreValue = parseInt(req.params.value);

	MongoClient.connect(url, function(err, db) {
		db.collection('ore').update({
			name: 'ore'
		}, {
			$inc: {
				amount: oreValue
			}
		}, {
			upsert: true
		});
	});
});
// удаляем всю руду из базы
app.post('/app/removeOre', function(req, res) {
	MongoClient.connect(url, function(err, db) {
		removeDocument(db, function() {
			db.close();
		})
	});
});


app.post('/save', function(req, res) {
	console.log(req.body);
	let data = req.body;

	MongoClient.connect(url, function(err, db) {
		db.collection('player').update({
			name: 'Andrey'
		}, {
			$set: data
		}, {
			upsert: true
		}, function() {
			res.json({
				status: 'ok'
			})
		});
	});
});

app.get('/load', function(req, res) {

	MongoClient.connect(url, function(err, db) {
		db.collection('player').findOne({
			name: 'Andrey'
		}, function(err, player) {
			res.json(player);
		});
	})
})

// передаем в базу текущий тип корабля
app.post('/app/equipShip/:value', function(req, res) {
	res.json(req.body);
	var newShip = req.params.value;

	MongoClient.connect(url, function(err, db) {
		db.collection('ship').update({
			name: 'ship'
		}, {
			$set: {
				shipType: newShip
			}
		}, {
			upsert: true
		});
	});
})

app.get('/app/currentShip/', function(req, res) {

	MongoClient.connect(url, function(err, db) {
		db.collection('ship').findOne({}, function(err, ship) {
			res.json(ship);
			console.log(ship);
		});
	})

})

// запускаем сервер на порту 3030
app.listen(3030);
// отправляем сообщение
console.log('Сервер стартовал!');


var MongoClient = require('mongodb').MongoClient
  , assert = require('assert');

// Connection URL
var url = 'mongodb://localhost:27017/miner';

// Use connect method to connect to the server
/*
MongoClient.connect(url, function(err, db) {
	console.log("Connected successfully to server");
	findDocuments(db, function() {
		db.close();
	})
});
*/
var removeDocument = function(db, callback) {
  var collection = db.collection('ore');
  collection.deleteOne({}, function(err, result) {
    callback(result);
  });    
}
var insertDocuments = function(db, callback) {
	var collection = db.collection('documents');
	collection.insertMany([
		{login : 1}
	], function(err, result) {
		assert.equal(err, null);
		assert.equal(3, result.result.n);
		assert.equal(3, result.ops.length);
		console.log("Inserted 3 documents into the collection");
		callback(result);
	});
}
var setShipType = function(db, callback) {
  var collection = db.collection('ship');
  collection.find({}).toArray(function(err, docs) {
    console.log("Found the following records");
    console.log(docs)
    callback(docs);
  });
}
var findDocuments = function(db, callback) {
  var collection = db.collection('ore');
  collection.find({}).toArray(function(err, docs) {
    console.log("Found the following records");
    console.log(docs)
    callback(docs);
  });
}

var updateDocument = function(db, callback) {
  var collection = db.collection('documents');
  collection.updateOne({ a : 2 }
    , { $set: { b : 1 } }, function(err, result) {
    console.log("Updated the document with the field a equal to 2");
    callback(result);
  });  
}


var indexCollection = function(db, callback) {
  db.collection('documents').createIndex(
    { "a": 1 },
      null,
      function(err, results) {
        console.log(results);
        callback();
    }
  );
};
app.get('/|/station|/market|/field/{id}', function(req, res) {
  res.sendFile( __dirname + '/client/index.html');

  // подключаемся к базе
  // в коллекции статистики обновляем запись с именем логикКаунт
  // увеличиваем поле каунт на 1
  // если этой коллекци или записи не существует, создаем ее.
	/*MongoClient.connect(url, function(err, db) {

		db.collection('statistics').update({
			name: 'loginCount'
		}, {
			$inc: {
				count: 1
			}
		}, {
			upsert: true
		});
	});*/
});