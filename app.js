const http = require('http');

const PORT = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
    if (req.url === '/health') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
            status: 'healthy',
            message: 'Application is running'
        }));
    } else {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(`
            <h1>Welcome to Jenkins CI/CD Pipeline!</h1>
            <p>Application deployed successfully using Docker.</p>
            <p>DevOps Internship Task 2</p>
        `);
    }
});

server.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
});