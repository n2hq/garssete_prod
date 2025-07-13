module.exports = {
    apps: [
        {
            name: "garssete",
            script: "npm",
            args: "start",
            env: {
                NODE_ENV: "production",
                PORT: 3393
            },
            watch: false,
            max_memory_restart: "500M"
        }
    ]
};