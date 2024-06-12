import { Router } from 'express';
import {
  createProduct,
  getAllProductsStatic,
  getAllProducts,
} from '../handlers/products';

const router = Router();

router.route('/').get(getAllProducts).post(createProduct);
router.route('/static').get(getAllProductsStatic);

export default router;
