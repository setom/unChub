angular.module('unChub.activitiesDB', ['ionic'])

.factory("DB", function() {
    
    var db; 
    
    //open the DB
    function openDB() {
        db = window.openDatabase("activityDB", "1.0", "Activities", 10000000);  
        db.transaction(createTable, errorCB, successCB);
    }; 
    
    // Populate the database
    //
    function createTable(tx) {
        tx.executeSql('CREATE TABLE IF NOT EXISTS ACTIVITIES (id unique, name, date, points)');
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
            console.log("eraseTable");
            tx.executeSql("DELETE FROM ACTIVITIES");
        };
        db.transaction(drop, errorCB, successCB);
    }
    
    function logActivity(name, points) {
        var log = function(tx){
            tx.executeSql("INSERT INTO ACTIVITIES (id, name, date, points) VALUES (3, '"+name+"','May14', "+points+")");
        };
        db.transaction(log, errorCB, successCB);
    }
    
    return {
        openDB: function() {
            openDB();
            return true;
        },
        logActivity: function(name, value){
            logActivity(name, value);
        }, 
        eraseTable: function() {
            eraseTable();
        }
    };
});

