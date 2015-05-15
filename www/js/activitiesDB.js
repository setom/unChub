angular.module('unChub.activitiesDB', ['ionic'])

.factory("activitiesDB", function() {
    
    var db; 
    
    //open the DB
    function openDB() {
        db = window.openDatabase("activityDB", "1.0", "Activities", 10000000);  
        db.transaction(createTable, errorCB, successCB);
    }; 
    
    // Populate the database
    //
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
                console.log(len);
                rows = len;
                return rows;
            });
        });
    }
    
    //add an activity to the activity table
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
        db.transaction(log, errorCB, successCB);
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

