import gitlab from './gitlab-access'
import config from './config';

new gitlab(config).run();