import express, { Response, Request } from 'express';
import { data } from './data/ProductData/index.js';
import cors from 'cors';

function init() {
  const app = express();
  app.use(
    cors({
      origin: '*',
      credentials: true,
    }),
  );
  app.use(express.json());

  app.get('/', (req: Request, res: Response) => {
    return res.json({ message: 'Hello1 World' });
  });
  //product route
  app.get('/api/v1/products', (req: Request, res: Response) => {
    try {
      return res
        .status(200)
        .json({ data: data, succes: true, message: 'Products' });
    } catch (error) {
      return res
        .status(500)
        .json({ success: false, message: 'Internal server error' });
    }
  });

  // Buy route
  app.post('/api/v1/buy', (req: Request, res: Response) => {
    try {
      const { firstName, lastName, address, product } = req.body;

      if (!firstName || !lastName || !address || !product) {
        return res
          .status(400)
          .json({ success: false, message: 'all filed required' });
      }

      return res.status(200).json({
        data: req.body,
        succes: true,
        message: 'product buy successfully',
      });
    } catch (error) {
      return res
        .status(500)
        .json({ success: false, message: 'Internal server error' });
    }
  });
  app.listen(8000, () => console.log('Server is running'));
}

init();
