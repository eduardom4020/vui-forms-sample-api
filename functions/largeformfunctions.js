var { CreateLargeForm, largeFormListCommand } = require('../entities/largeform');

function listAllForms({db, onFailure, onSuccess, onEmptyList}) {
    var [query, values] = largeFormListCommand();

    db.all(query, values, function(err, rows) {
        if (err) return onFailure(err);
        
        if(rows && rows.length > 0) {
            var result = rows.map(row => CreateLargeForm(row));
            return onSuccess(result);
        }
        else {
            return onEmptyList('Entries not found');
        }
        
    });
}

module.exports = { listAllForms };