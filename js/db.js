var dbPromised = idb.open("epl", 1, function(upgradeDb) {
    var teamsObjectStore = upgradeDb.createObjectStore("teams", {
      keyPath: "ID"
    });
    teamsObjectStore.createIndex("team_name", "team_name", {
      unique: false
    });
  });
  
  function saveForLater(team) {
    dbPromised
      .then(function(db) {
        var tx = db.transaction("teams", "readwrite");
        var store = tx.objectStore("teams");
        console.log(team);
        store.add(team.result);
        return tx.complete;
      })
      .then(function() {
        console.log("Detail Team berhasil di simpan.");
      });
  }
  
  function getAll() {
    return new Promise(function(resolve, reject) {
      dbPromised
        .then(function(db) {
          var tx = db.transaction("teams", "readonly");
          var store = tx.objectStore("teams");
          return store.getAll();
        })
        .then(function(teams) {
          resolve(teams);
        });
    });
  }
  
  function getAllByTitle(title) {
    dbPromised
      .then(function(db) {
        var tx = db.transaction("teams", "readonly");
        var store = tx.objectStore("teams");
        var titleIndex = store.index("team_name");
        var range = IDBKeyRange.bound(title, title + "\uffff");
        return titleIndex.getAll(range);
      })
      .then(function(teams) {
        console.log(teams);
      });
  }
  
  function getById(id) {
    return new Promise(function(resolve, reject) {
      dbPromised
        .then(function(db) {
          var tx = db.transaction("teams", "readonly");
          var store = tx.objectStore("teams");
          return store.get(id);
        })
        .then(function(team) {
          resolve(team);
        });
    });
  }
  