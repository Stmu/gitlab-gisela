var env = process.env.NODE_CONFIG || 'template'
const template = require('../config.' + env).default;

const config = {
    interval: 10, gitlab: {
        server: template.gitlab.server,
        access_token: template.gitlab.access_token,
        project_id: template.gitlab.project_id
    }, colors: {
        success: template.colors.success,
        failed: template.colors.failed,
        pending: template.colors.pending,
        canceled: template.colors.canceled,
        running: template.colors.running,
    }
};


export default config;