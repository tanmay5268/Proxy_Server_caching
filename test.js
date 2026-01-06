const express = require('express');
const app = express();
const PORT = 4000;

// Define a route for GET requests to the root URL
app.get('/', (req, res) => {
    res.send('Hello World!');
});

// Start the server and listen for incoming requests
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
