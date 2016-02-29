
;(function() {
	var DBHelper = function(name,version) {
		this.name = name,
		this.version = version || 1,
		this.db = null,
		this.dataItems = [],
		self = this;//  防止this指针乱指
	}
	DBHelper.prototype = {
		setDBName: function(name) {
			self.name = name;
		},
		getDBName: function() {
			return self.name;
		},
		getDB: function() {
			return self.db;
		},
		setDB:function(db) {
			self.db = db;
		},
		getDataItems: function() {
			return self.dataItems;
		},
		openDB: function(callback) {
			var request = window.indexedDB.open(self.name,self.version);
			request.onerror = function(e) {
				console.log(e.currentTarget.error.message);
			};
			request.onsuccess = function(e) {
				console.log(e.target.result);
				self.db = e.target.result;
				callback();
			};
			request.onupgradeneeded = function(e) {
				self.db = e.target.result;
				if(!self.db.objectStoreNames.contains('webProject')) {
					var store = self.db.createObjectStore('webProject',{keyPath: 'id'});
					store.createIndex('idIndex','id',{unique: true});
					store.createIndex('nameIndex','username',{unique: false});
					store.createIndex('isNewIndex','isNew',{unique: false});
				}
				callback();
				/*if(self.db.objectStoreNames.contains('webProject')) {
					self.db.deleteObjectStore('webProject');
					console.log('delete ' + 'webProject' + ' success !');
				}*/
				console.log('DB version changed to ' + self.version);
			};
		},
		closeDB: function() {
			self.db.close();
		},
		deleteDB: function(name) {
			indexedDB.deleteDatabase(name);
		},
		addData: function(storeName,data,callback) {
			var transaction = this.db.transaction(storeName,'readwrite');
			var store = transaction.objectStore(storeName);

			for(s in data) {
				store.add(data[s]);
				console.log(data[s]);
			}
			callback();
			console.log(data);
			console.log('add success !');
		},
		getDataByKey: function(storeName,vals,callback) {
			var transaction = self.db.transaction(storeName,'readwrite');
			var store = transaction.objectStore(storeName);
			var request;
			for(s in vals) {
				var val = vals[s];
				var _key = val.key;
				var _value = val.value;
				console.log(_key + ' => ' + _value);
				request = store.get(_value);
				request.onsuccess = function(e) {
					var item = e.target.result;
					self.dataItems.push(item);
				}
			}
			callback();
		},
		getMultipleData: function(storeName,searchIndex,callback) {
			var transaction = self.db.transaction(storeName);
			var store = transaction.objectStore(storeName);
			var index = store.index(searchIndex);
			var request = index.openCursor();
			var projects = [];
			request.onsuccess = function(e) {
				var cursor = e.target.result;
				if(cursor) {
					var project = cursor.value;
					projects.push(project);
					cursor.continue();
				}
				if(cursor == null) {
					callback(projects);
				}
				
			};

		},
		updateDataByKey: function(storeName,val,callback) {
			var transaction = self.db.transaction(storeName,'readwrite');
			var store = transaction.objectStore(storeName);

			var id = val.id;
			var index = store.index('idIndex');
			var request = index.get(id);
			request.onsuccess = function(e) {
				var item = e.target.result;
				console.log('item: ' + item);
				item.username = val.username;
				item.projectName = val.projectName;
				item.projectDetail = val.projectDetail;
				item.startTime = val.startTime;
				item.finishedTime = val.finishedTime;
				//item.isFinished = val.isFinished;
				item.projectProcess = val.projectProcess;
				store.put(item);
				callback();
			}
		},
		deleteDataByKey: function(storeName,val,callback) {
			var transaction = self.db.transaction(storeName,'readwrite');
			var store = transaction.objectStore(storeName);

			var id = val.value;
			var request = store.delete(id);
			request.onsuccess = function(e) {
				callback();
			};
		},
		finishedProject: function(storeName,val,callback) {
			var transaction = self.db.transaction(storeName,'readwrite');
			var store = transaction.objectStore(storeName);

			var id = val.value;
			var index = store.index('idIndex');
			var request = index.get(id);
			request.onsuccess = function(e) {
				var item = e.target.result;
				item.isFinished = 1;
				store.put(item);
				callback();
			};
		},
		clearData: function(storeName,callback) {
			var transaction = self.db.transaction(storeName,'readwrite');
			var store = transaction.objectStore(storeName);
			store.clear();
			callback();
		},
		startOpt: function(callback) {
			setTimeout(function() {
				callback();
			},700);
		}
	};
	window.DBHelper = DBHelper;
})();

/*var dbHelper = new DBHelper('yy_webProject',6);
var tableName = ['webProject'];
var addData = [
	{
		id: 1,
		username: '陈万芳',
		projectName: '日程管理插件',
		projectDetail: '基于jQuery的插件',
		startTime: 1444102489,
		finishedTime: 1445312089,
		isFinished: 0,
		projectProcess: 55
	},
	{
		id: 3,
		username: '陈万芳',
		projectName: 'chrome分享插件',
		projectDetail: '前端专享，基于chrome的分享插件',
		startTime: 1442978584,
		finishedTime: 1444274584,
		isFinished: 1,
		projectProcess: 100
	},
	{
		id: 6,
		username: '陈万芳',
		projectName: '看完H5',
		projectDetail: '把借的这本H5看完，并完成几个有趣的小应用。',
		startTime: 1444965587,
		finishedTime: 1446175187,
		isFinished: 0,
		projectProcess: 10
	}
];
dbHelper.openDB();

setTimeout(function() {
	console.log(dbHelper.getDB());
},500);*/
//setTimeout(function() {
//	console.log('----------------------------------------------------');
	//select By Id
	/*dbHelper.getDataByKey(tableName,[ 
		{
			'key': 'id',
			'value': 1
		},
		{
			'key': 'id',
			'value': 3
		},
		{
			'key': 'id',
			'value': 6
		}
	],function() {
		setTimeout(function() {
			console.log(dbHelper.getDataItems());
		},100);
		
	});*/

	//update
	/*dbHelper.updateDataByKey(tableName,  
	{
		'id': 1,
		'username': '陈万芳',
		'projectName': '日程管理插件',
		'projectDetail': '基于jQuery的插件,啦啦啦',
		'startTime': 1444102489,
		'finishedTime': 1445312089,
		'isFinished': 0,
		'projectProcess': 55
	},function() {
		console.log('update success!');
	});*/

	//delete
	/*dbHelper.deleteDataByKey(tableName,
		{
			'key': 'id',
			'value': 2
		},
		function() {
			console.log('delete success');
		}
	);*/
//},1000);
/*setTimeout(function() {
	console.log(dbHelper.getDB());
},1000);

setTimeout(function() {
	dbHelper.addData(tableName,addData);
},1000);*/