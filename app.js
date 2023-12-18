import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));

const PORT = 5200;
const app = new express();

app.use(express.static(join(__dirname,'public')));
app.use(express.static(join(__dirname,'lib/frontend')));
app.use('/three/',   express.static(join(__dirname,'node_modules/three')));
//app.use('/examples/',express.static(join(__dirname,'node_modules/three/examples')));

app.get('/', (req,res) => { res.sendFile("./index.html") });

// Run server

app.listen(PORT, () => {

    console.log('The server is listening at port', PORT)    

});