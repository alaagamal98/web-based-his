const mongoose = require('mongoose');
const nurses = require('./routes/nurses');
const equipments = require('./routes/equipments');
const mangers = require('./routes/mangers');
const engs = require('./routes/engs');
const express = require('express');
const app = express();

// Connect to database
mongoose.connect('mongodb://localhost/icu')
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...'));

app.use(express.json());
app.use('/api/mangers', mangers);
app.use('/api/engs', engs);
app.use('/api/nurses', nurses);
app.use('/api/equipments', equipments);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening on port ${port}...`));
