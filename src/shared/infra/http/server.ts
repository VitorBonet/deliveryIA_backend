import 'reflect-metadata';
import 'dotenv/config';

import cors from 'cors';
import express, {
  Request,
  Response,
  NextFunction,
} from '../../../modules/delivery/infra/http/controllers/node_modules/express';
import { errors } from '../../../modules/delivery/infra/http/routes/node_modules/celebrate';
import 'express-async-errors';
import uploadConfig from '../../../modules/delivery/infra/typeorm/entities/node_modules/@config/upload';
import AppError from '../../../modules/delivery/infra/http/middlewares/node_modules/@shared/errors/AppError';
import routes from '@shared/infra/http/routes';
import rateLimiter from './middlewares/rateLimiter';

const app = express();

app.use(cors());
app.use(express.json());
app.use('/files', express.static(uploadConfig.tmpFolder));
app.use(rateLimiter);
app.use(routes);

app.use(errors());

app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  console.log(err);
  return response.status(500).json({
    status: 'error',
    message: 'Internal Server Error',
  });
});

app.listen(3333, () => {
  console.log('🚀 Server started on port 3333!');
});
