const config = {
    interval: 10, gitlab: {
        server: 'gitlab.example.com',
        access_token: 'any-access-token',
        project_id: 1
    }, colors: {
        success: 'green',
        failed: 'red',
        pending: 'blue',
        canceled: 'yellow',
        running: 'purple',
    }
};
exports.default = config;
