angular.module('unChub.activitiesDB', ['ionic', 'unChub.healthIndexDB'])

.factory("activitiesDB", function($q, healthIndexDB) {
    
    var db; 
    
    //open the DB
    function openDB() {
        var deferred = $q.defer();
        db = window.openDatabase("activityDB", "1.0", "Activities", 10000000);  
        deferred.resolve(db.transaction(createTable, errorCB, successCB));
        return deferred.promise;
    }; 
    
    // Populate the database
    function createTable(tx) {
        tx.executeSql('CREATE TABLE IF NOT EXISTS activities (id UNIQUE, name, date, points)');
    }

    // Transaction error callback
    function errorCB(tx, err) {
        console.log("Error processing SQL: "+err);
    }

    // Transaction success callback
    function successCB() {
        console.log("success!");
    }
    
    //drop the table
    function eraseTable() {
        var drop = function(tx) {
            console.log("erase activities Table");
            tx.executeSql("DELETE FROM activities");
        };
        db.transaction(drop, errorCB, successCB);
    }
    
    //get rows in table
    function getRows(rows){
        db.transaction(function (tx){
            tx.executeSql('SELECT id FROM activities', [], function (tx, results) {
                var len = results.rows.length;
                rows = len;
                return rows;
            });
        });
    }
    
    //get sum of points column
    //NB: uses Q.defer as this is an async call, eventually we should implement it everywhere
    function getPointSum(){
        var deferred = $q.defer();
        db.transaction(function(tx){
            tx.executeSql('SELECT sum(points) AS sumPoints FROM activities', [], function(tx,results){
                var tot = results.rows.item(0).sumPoints;
                deferred.resolve(tot);
            });
        });
        return deferred.promise;
    }
    
    //add an activity to the activity table
    //Param: name, points
    function logActivity(name, points) {
        var date = new Date();
        var id = getRows()+1;
        var log = function(tx){
            tx.executeSql("INSERT INTO activities (id, name, date, points) VALUES (?,?,?,?)", 
            [
                id,
                name,
                date,
                points
            ]);
        };
        //add the activity to the activities table
        db.transaction(log, errorCB, successCB);
        
        //add the new points sum to the health DB
        getPointSum().then(function(pointSum){
            healthIndexDB.logActivity(date, pointSum);
        });


    }
    
    return {
        openDB: function() {
            openDB();
        },
        logActivity: function(name, value){
            logActivity(name, value);
        }, 
        eraseTable: function() {
            eraseTable();
        }
    };
});

