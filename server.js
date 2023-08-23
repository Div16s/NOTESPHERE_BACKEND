const express =  require('express');
const notes = require('./data/notes.js');
const dotenv = require('dotenv');
const cors = require('cors');
const DBConnection = require('./database/db.js');
const userRoutes = require('./routes/userRoutes.js');
const noteRoutes = require('./routes/noteRoutes.js');
const bodyParser = require('body-parser');
const { notFound, errorHandler } = require('./middleWares/errorMiddleWares.js');
const path = require('path');

const app = express();

app.use(cors());
app.use(express.urlencoded({extended:true}));
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.json());


dotenv.config();
app.get('/', (req,res)=>{
    res.send("Backend working fine!");
})

// app.get('/notes',(req,res)=>{
//     res.send(notes);
// })

app.use('/user', userRoutes);
app.use('/notes',noteRoutes);


app.get('/notes/:id',(req,res)=>{
    const note = notes.find((n)=> n._id === req.params.id)
    res.send(note);
})

// // ----------------DEPLOYMENT---------------------

// const __dirname1 = path.resolve();

// if(process.env.NODE_ENV==='production'){
//     app.use(express.static(path.join(__dirname1,"/client/build")));

//     app.get('*',(req,res)=>{
//         res.sendFile(path.resolve(__dirname1,"client","build","index.html"));
//     });
// }
// else{
//     app.get('/', (req,res)=>{
//         res.send("Backend working fine!");
//     })
// }

// // ----------------DEPLOYMENT---------------------

DBConnection();

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 8000;
app.listen(PORT, ()=>{
    console.log(`Server started on port ${PORT}!`);
});