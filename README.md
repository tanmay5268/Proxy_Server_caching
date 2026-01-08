# Proxy Server with Caching

This project is a simple **Proxy Server** built with Node.js. It sits between a client (like your browser) and a backend server. Its main job is to forward requests to the backend server and **cache** (save) the responses to make future requests faster.

##  How it Works

1.  **Client Request**: You send a request to this proxy server.
2.  **Cache Check**: The server checks if it has seen this request before and if the saved answer is still fresh (valid).
    *   **Cache HIT**: If the data is in the cache, the server sends it back immediately. This is very fast!
    *   **Cache MISS**: If the data is not in the cache (or has expired), the server forwards the request to the real backend URL.
3.  **Forwarding**: The server gets the data from the backend.
4.  **Saving (Caching)**: It saves this data in memory for a specific amount of time (TTL).
5.  **Response**: It sends the data back to you.


##  Installation

1.  Open your terminal in the project folder.
2.  Install the required dependencies:

```bash
npm install
```

## 🏃‍♂️ How to Run

You can start the proxy server using the Command Line Interface (CLI).

**Command Syntax:**

```bash
node cli.js --port <number> --url <backend_url> --ttl <seconds>
```

*   `--port` (or `-p`): The port where this proxy server will run.
*   `--url` (or `-b`): The URL of the backend server you want to forward requests to.
*   `--ttl`: (Optional) Time To Live. How long (in seconds) the data should stay in the cache. Default is 60 seconds.

**Example:**

If you have a backend server running at `http://localhost:4000`, you can start the proxy on port `3000` like this:

```bash
node cli.js -p 3000 -b http://localhost:4000 --ttl 120
```

> **Note:** There is also a simple test server included (`server.js`) that runs on port 4000. You can start it in a separate terminal with `node server.js` to test your proxy.

##  Understanding Caching

**Caching** is like memorizing an answer.

*   Imagine you ask a math teacher "What is 123 * 456?".
*   The teacher calculates it (takes time) and tells you.
*   If you ask the same question again immediately, the teacher remembers the answer and tells you instantly without calculating again.

In this project:
*   **TTL (Time To Live)**: This is how long the "memory" lasts. If TTL is 60 seconds, the server will remember the answer for 1 minute. After that, it "forgets" and has to ask the backend server again.
*   **Headers**: The server adds a header to the response to tell you if it used the cache:
    *   `proxy_status: HIT` (Came from memory - Fast)
    *   `proxy_status: MISS` (Fetched from backend - Slower)

##  Project Diagram

Here is an architecture diagram of how the proxy server handles requests:

![Architecture Diagram](./flow.png)
