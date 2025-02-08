import 'dotenv/config';
import express from 'express';
const app = express();
const port = process.env.PORT || 3000;

// app.get("/", (req, res) => {
//     res.send("Hello World!");
// });

// app.get("/ice-tea", (req, res) => {
//     res.send("What a ice tea!");
// });


// app.get("/twitter", (req, res) => {
//     res.send("sumitdotcom");
// });


app.use(express.json());
 
let teaData = []
let nextId = 1;

// add a new tea
app.post('/teas', (req, res) => {

    const {name , price} = req.body;

    const newTea = {
        id : nextId++,
        name,
        price
        
    }
    teaData.push(newTea);
    res.status(201).send(newTea);
})

// get all tea 
app.get('/teas', (req, res) => {
    res.status(200).send(teaData);
})

// get all tea id 
app.get('/teas/:id', (req, res) => {
    // const {id} = req.params;
    // const tea = teaData.find(tea => tea.id == id);

    const tea = teaData.find(t => t.id === parseInt(req.params.id));
    if (!tea) {
        return res.status(404).send("Tea not found");
    }
    res.status(200).send(tea);
})

// update tea
app.put('/teas/:id', (req, res) => {
    const teaId = parseInt(req.params.id);
    const tea = teaData.find(t => t.id === teaId);
    if (!tea) { 
        return res.status(404).send("Tea not found");
    }
    tea.name = req.body.name;
    tea.price = req.body.price;
    res.status(200).send(tea);
})


// delete tea

app.delete('/teas/:id', (req, res) => {
    const index = teaData.findIndex(tea => tea.id === parseInt(req.params.id));
    if (index === -1) {
        return res.status(404).send("Tea not found");
    }
    teaData.splice(index, 1);
    return res.status(204).send('deleted');
})
app.listen(port, () => {
    console.log("Server started on port 3000");
});


