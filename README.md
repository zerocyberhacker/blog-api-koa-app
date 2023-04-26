# Need add the config file to config the database
```html
<h3>https://elephantsql.com/</h3>
```
```
let config = {
    host: "satao.db.elephantsql.com",
    port: xxxx,
    user: "xxxx",
    password: "xxxx",
    database: "xxxx",
    connection_limit: 100
}

export default config;
```

# Install the package
```
npm i
```

# Start the Koa Server
```
ts-node index.ts
```