import { Router } from 'express';

import ReportController from './app/controllers/ReportController';

const routes = new Router();

routes.post('/', ReportController.store);
routes.get('/', ReportController.index);

export default routes;
