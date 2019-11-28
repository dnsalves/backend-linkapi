import { Router } from 'express';

import ReportController from './app/controllers/ReportController';
import PipedriveController from './app/controllers/PipedriveController';

const routes = new Router();

routes.post('/GetData', PipedriveController.index);
routes.get('/Report', ReportController.index);

export default routes;
