import * as superagent from 'superagent';
import * as http from 'http';

const port = process.env.my_port || 3000;
const BIN_URL=process.env.bin_url || 'http://httpbin.org'

const server = http.createServer((req, res) => {
    console.log(`REQUEST URI: ${req.url}`);
    superagent.get(`${BIN_URL}${req.url}`)
        .then((binResponse) => {
            res.statusCode = binResponse.statusCode;
            res.setHeader('x-served-by', BIN_URL);
            res.end(JSON.stringify(binResponse.body));
        })
        .catch((error) => {
            console.log(error && error.stack);
            res.statusCode = 500;
            res.end('No bin for you!');
        });
});

server.listen(port, () => {
    console.log(`Server running at ${port}/`);
});
