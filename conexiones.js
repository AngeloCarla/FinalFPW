const mongoose = require('mongoose');
mongoose.connect
('mongodb+srv://AngeloCarla:<db_password>@FundamentoProgramacionWeb.shqp8.mongodb.net/FPW?retryWrites=true&w=majority&appName=FinalBD');

const objeto = mongoose.connection;

objeto.on('connected', () => {
    console.log("conectado a MongoDB");
});

objeto.on('error', () => {
    console.log("error al conectar a MongoDB");
});

module.exports = mongoose;

//AngeloCarla => OneMissKk_087