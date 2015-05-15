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
        tx.executeSql('CREATE TABLE IF NOT EXISTS ACTIVITIES (id unique, name, date, value)');
//        tx.executeSql('INSERT INTO DEMO (id, data, cats) VALUES (1, "First row", "Cheese")');
//        tx.executeSql('INSERT INTO DEMO (id, data, cats) VALUES (2, "Second row", "Mac")');
    }

    // Transaction error callback
    //
    function errorCB(tx, err) {
        console.log("Error processing SQL: "+err);
    }

    // Transaction success callback
    //
    function successCB() {
        console.log("success!");
    }
    
    function logActivity(name, value) {
        var log = function(tx){
            tx.executeSql("INSERT INTO ACTIVITIES (id, name, date, value) VALUES (3, '"+name+"','May14', "+value+")");
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
        }
    };
});

