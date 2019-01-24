const express = require('express');
const Joi =require('joi');
const app = express();

app.use(express.json());

const courses = [
        {id: 1, name: 'Android' },
        {id: 2, name: 'C++' },
        {id: 3, name: 'Java' }
    ];

app.get('/', (req, res) => {
    res.send('Hello Hritik ');
});
app.get('/api/courses', (req, res) => {
res.send(courses);
});
app.get('/api/courses/:id', (req, res)=> {
    res.send(courses.find( c => c.id == parseInt(req.params.id)));
});


// Add  to databse
app.post('/api/courses', (req, res) => {

    const schema = {
        id: Joi.number().min(1).required(),
        name: Joi.string().min(3).required()
    };

    const result = Joi.validate(req.body, schema);

    if(result.error){
        // 404 bad request
        res.status(400).send(result.error);
        return;
    }
    const course = {
            id: courses.length + 1,
            name: req.body.name
    };
    courses.push(course);
    res.send(course);

});

// Update to database

app.put('/api/courses/:id', (req, res) => {

    const course = courses.find(c => c.id == parseInt(req.params.id));
    if(!course) res.status(404).semd('Course not found');

    // const schema = {
    //     id: Joi.number().min(1).required(),
    //     name: Joi.string().min(3).required()
    // };

    // const result = Joi.validate(req.body, schema);

    // if(result.error){
    //     // 404 bad request
    //     res.status(400).send(result.error);
    //     return;
    // }

    course.name = req.body.name;
    res.send(course);
});

app.delete('/api/courses/:id', (req, res) =>{

    const course = courses.find(c => c.id == parseInt(req.params.id));
    if(!course) res.status(404).semd('Course not found');

    const index = courses.indexOf(course);

    courses.splice(index, 1);
    res.send(course);


});

app.listen(3000, () => {
 console.log('Listening on port 3000...')
});
