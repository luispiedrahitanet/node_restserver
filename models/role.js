const { Schema, model  } = require('mongoose');

const RoleSchema = Schema({
    rol: {
        type: String,
        required: [true, 'El rol es obligatorio']
    }
});


// Los dos argumentos son: 
//      1. El nombre que le queremos dar al schema
//      2. La función
module.exports = model( 'Role', RoleSchema );
