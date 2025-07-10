module.exports = {
    apps: [
        {
            name: "garssete",
            script: "npm",
            args: "start",
            env: {
                NODE_ENV: "production",
                PORT: $APP_PORT
            },
            watch: false,
            max_memory_restart: "500M"
        }
    ]
};