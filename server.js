const express = require('express');
const axios = require('axios');
const app = express();
const port = 4000; // You can choose a different port if needed

app.use(express.json());

app.get('/proxy', async (req, res) => {
  try {
    const url = req.query.url;
    console.log('URL:', url);

    // Make a request to the external website
    const response = await axios.get(url, {
      responseType: 'stream', // Stream the response to the client
    });

    // Set the appropriate headers
    res.setHeader('Content-Type', response.headers['content-type']);
    
    // Set the 'Content-Disposition' header with a valid file name
    // res.setHeader('Content-Disposition', 'attachment; filename="document.pdf"');
    
    // Pipe the response data to the client
    response.data.pipe(res);
  } catch (error) {
    console.error(error);
    res.status(500).send('Proxy Error');
  }
});

app.listen(port, () => {
  console.log(`Proxy server is running on port ${port}`);
});
