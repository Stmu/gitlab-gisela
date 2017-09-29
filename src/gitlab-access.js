import Service from './service';
import rp from 'request-promise'
import color from 'color'
import blinker from './blink-driver'

class Gitlab extends Service {
    constructor(config) {
        super(config.interval);
        this.config = config.gitlab;
        this.colors = config.colors;
    }

    getJobStatus(job, options) {
        //fetchstate = new Promise((resolve,reject)=>{
        var gitlab_api_call = {
            uri: `https://${this.config.server}/api/v4/projects/${this.config.project_id}/pipelines`,
            headers: {
                'PRIVATE-TOKEN': this.config.access_token
            },
            json: true
        };
        return rp(gitlab_api_call)
            .then(pipelines => {
                return pipelines
                    .sort((a, b) => {
                        if (a.id < b.id) return -1;
                        if (a.id > b.id) { return 1 }
                        else { return 0 }
                    })
                    .reverse()
                    .slice(0, 1)[0]
            })
            .catch(err => {
                console.error('Error: ' + err);
            });
    }

    getColor(state) {
        return new Promise((resolve, reject) => {
            switch (state) {
                case "success": {
                    resolve(new color(this.colors.success));
                }
                case "failed": {
                    resolve(new color(this.colors.failed));
                }
                case "running": {
                    resolve(new color(this.colors.running));
                }
                case "canceled": {
                    resolve(new color(this.colors.aborted));
                }
                case "pending": {
                    resolve(new color(this.colors.pending));
                }
            }
        });
    }

    loopMethod() {
        this.getJobStatus()
            .then(pipeline => {
                // console.dir(pipeline);
                return this.getColor(pipeline.status);
            })
            .then(color => {
                return new blinker().blink(color);
            })
            .delay(2000);
    }
}



export default Gitlab;