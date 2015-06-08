angular.module('unChub.healthIndexDB', ['ionic'])

.factory("healthIndexDB", function($q) {
    
    var db; 
    
    //open the DB 
    //1MB size
    function openDB() {
        var deferred = $q.defer();
        db = window.openDatabase("activityDB", "1.0", "Activities", 1000000);  
        deferred.resolve(db.transaction(createTable, errorCB, successCB));
        return deferred.promise;
    }; 
    
    // Populate the database
    function createTable(tx) {
        tx.executeSql('CREATE TABLE IF NOT EXISTS healthIdx (id UNIQUE, day, points)');
    }

    // Transaction error callback
    function errorCB(tx, err) {
        console.log("Error processing SQL: "+err);
        console.log(err);
    }

    // Transaction success callback
    function successCB() {
        console.log("success!");
    }
    
    //drop the table
    function eraseTable() {
        var drop = function(tx) {
            console.log("erase healthIdx Table");
            tx.executeSql("DELETE FROM healthIdx");
        };
        db.transaction(drop, errorCB, successCB);
    }
    
    //get rows in table
    //NB: promisified, we should implement promises everywhere
    function getRows(){
        var deferred = $q.defer();
        db.transaction(function (tx){
            tx.executeSql('SELECT id FROM healthIdx', [], function (tx, results) {
                var len = results.rows.length;
                deferred.resolve(len);
            });
        });
        return deferred.promise;
    }
    
    function logActivity(day, points) {
        var id;
        getRows().then(function(rows){
            id = rows+1;
            var log = function(tx){
                 tx.executeSql("INSERT INTO healthIdx (id, day, points) VALUES (?,?,?)", 
                [
                    id,
                    day,
                    points
                ]);
            };
            db.transaction(log, errorCB, successCB);
        });        
    }
    
    //get the current point value
    function getPoints(){
        var deferred = $q.defer();
            db.transaction(function (tx){
                tx.executeSql("SELECT SUM(points) AS pts FROM healthIdx", [], function (tx, results) {
                    var points = results.rows.item(0).pts;
                    console.log("points: " + points);
                    deferred.resolve(points);
                });
            });
        return deferred.promise;
    }
    
    //get the point value for a specified day 
    //param: requires int value for days, (0-6, sun-0 mon-1 etc...)
    function getDailyPoints(day) {
        var deferred = $q.defer();
         db.transaction(function (tx){
            tx.executeSql("SELECT SUM(points) AS pts FROM healthIdx WHERE day = ?", [day], function(tx, results) {
                var points = results.rows.item(0).pts;
                if(points === null){
                    points = 0;
                }
                deferred.resolve(points);
            });
        });
        return deferred.promise;
    }
    
    function getWeeklyPoints() {
        var deferred = $q.defer();
        var weekPts = [];
        for (i = 0; i < 7; i++){
            weekPts[i] = getDailyPoints(i);
        }
        deferred.resolve($q.all(weekPts));
        return deferred.promise;
    }
    
    
    return {
        openDB: function() {
            openDB();
        },
        logActivity: function(day, points){
            logActivity(day, points);
        }, 
        eraseTable: function() {
            eraseTable();
        },
        getPoints: function() {
            return getPoints();
        },
        //not a public call for now
//        getDailyPoints: function(day) {
//            return getDailyPoints(day);
//        }
        getWeeklyPoints: function() {
            return getWeeklyPoints();
        }
    };
});

