const express = require("express");
const app = express();
const programmingLanguagesRouter = require("./routes/programmingLanguages");
var helmet = require('helmet');

app.use(helmet());

app.use(express.json());

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.get('/', (req, res) => {
  res.send('Ok');
});

app.use("/programming-languages", programmingLanguagesRouter);

/* Error handler middleware */
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  console.error(err.message, err.stack);
  res.status(statusCode).json({ message: err.message });
  return;
});



const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(`server running on port ${port}`);
});


