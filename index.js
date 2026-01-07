const axios = require('axios');
const http = require('http');
const { stringify } = require('querystring');

function Server_init ({proxy_port, backend_url,ttl}){
            const cache = new Map();
            const server = http.createServer(async(req,res)=>{
                        const key = `${req.method}:${req.url}`;
                        const now = Date.now();
                        //cache hit
                        if (req.method === "GET" && cache.has(key)){
                            const cached_data = cache.get(key);
                            if(now < cached_data.expire_time){
                                const body = JSON.stringify(cached_data);
                                res.writeHead(200,{
                                    "proxy_status":"HIT"
                                })
                                console.log(body);
                                return res.end(body);
                            }
                            else{
                                cache.delete(key);
                            }
                            
                        }
                        //cache miss
                        try {
                            const response = await axios({
                                method : req.method,
                                url: `${backend_url}`
                            })
                            //2things
                            let body;
                            if(typeof response.data === 'string'){
                                body = response.data;
                            }
                            else {
                                body = stringify(response.data);
                            }
                            if(req.method === "GET"){
                                cache.set(key, {
                                    data: response.data,
                                    expire_time: now + ttl * 1000,
                                });
                                res.writeHead(response.status,{
                                    "proxy_status":"MISS"
                                });
                                console.log(body);
                            }
                            res.end(body);
                            
                        } catch (error) {
                            console.error("Proxy Error:", error.message);
                            res.writeHead(500);
                            res.end("Internal Server Error"); 
                        }
                
            });
            server.listen(proxy_port,()=>{
                console.log(`forward on ${backend_url}, proxy running on port ${proxy_port},TTL: ${ttl}`)
            });
} 
module.exports ={Server_init};
