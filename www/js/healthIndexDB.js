angular.module('unChub.healthIndexDB', ['ionic'])

.factory("healthIndexDB", function() {
    
    var db; 
    
    //open the DB
    function openDB() {
        db = window.openDatabase("activityDB", "1.0", "Activities", 10000000);  
        db.transaction(createTable, errorCB, successCB);
    }; 
    
    // Populate the database
    //
    function createTable(tx) {
        tx.executeSql('CREATE TABLE IF NOT EXISTS healthIndex (id unique, day, healthIndex)');
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
            console.log("erase healthIndex Table");
            tx.executeSql("DELETE FROM healthIndex");
        };
        db.transaction(drop, errorCB, successCB);
    }
    
    function logActivity() {
        var day = 1;
        var index = 1;
        var log = function(tx){
            tx.executeSql("INSERT INTO healthIndex (id, day, healthIndex) VALUES (1, '"+day+", "+index+")");
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

