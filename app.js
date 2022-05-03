const Joi = require('joi')
const express = require("express");
const func = require('joi/lib/types/func');
const app = express();

app.use(express.json());

const courses = [
  { id: 1, name: 'Python' },
  { id: 2, name: 'Javascript' },
  { id: 3, name: 'Node' },
  { id: 4, name: "Java" }
]

function validateCourse(course) {
  const schema = Joi.object({
    name: Joi.string().min(3).required()
  });

  return Joi.validate(course, schema);
}

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.get('/api/courses', (req, res) => {
  res.send(courses);
});

app.get('/api/courses/:id', (req, res) => {
  const course = courses.find(c => c.id === parseInt(req.params.id));
  if (!course) {
    return res.status(404).send('Course not found');
  } else {
    res.send(course);
  }
});

app.post('/api/courses', (req, res) => {

  const { error } = validateCourse(req.body);
  if (error) {
    // 400 Bad Request
    return res.status(400).send(error.details[0].message);
  }

  const course = {
    id: courses.length + 1,
    name: req.body.name
  };
  courses.push(course);
  res.send(course)
})

app.put('/api/courses/:id', (req, res) => {
  // Look up the course
  // If not existing, return 404

  const course = courses.find(c => c.id === parseInt(req.params.id));
  if (!course) {
    return res.status(404).send('Course not found');
  }
  // Validate
  // If invalid, return 400 - Bad request

  // const result = validateCourse(req.body);
  const { error } = validateCourse(req.body);
  if (error) {
    // 400 Bad Request
    return res.status(400).send(error.details[0].message);
  }
  // Update course
  course.name = req.body.name
  //Return the updated course
  res.send(course);
});

app.delete('/api/courses/:id', (req, res) => {
  const course = courses.find(c => c.id === parseInt(req.params.id));
  if (!course) {
    return res.status(404).send('Course not found');
  }

  //Delete
  const index = courses.indexOf(course);
  courses.splice(index, 1);

  res.send(course);
})

const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(`server running on port ${port}`);
});


