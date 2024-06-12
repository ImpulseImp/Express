import { Request, Response } from 'express';
import { Product } from '../models/product';
import { queryObjectType } from '../types/queryObject';

// import jsonProducts from '../products.json';

export const getAllProductsStatic = async function (
  req: Request,
  res: Response
) {
  const products = await Product.find({ price: { $gt: 1 } })
    .sort('price')
    .select('name price');

  res.status(200).json({ products, nbHits: products.length });
};

export const getAllProducts = async (req: Request, res: Response) => {
  const { featured, company, name, sort, fields, numericFilters } = req.query;
  const queryObject: queryObjectType = {};

  if (featured) {
    queryObject.featured = featured === 'true' ? true : false;
  }
  if (company) {
    queryObject.company = company as string;
  }
  if (name) {
    queryObject.name = { $regex: name as string, $options: 'i' };
  }
  if (numericFilters) {
    const operatorMap: Record<string, string> = {
      '>': '$gt',
      '>=': '$gte',
      '=': '$eq',
      '<': '$lt',
      '<=': '$lte',
    };
    const regEx = /\b(<|>|>=|=|<|<=)\b/g;
    let filters = (numericFilters as string).replace(
      regEx,
      (match) => `-${operatorMap[match]}-`
    );
    const options = ['price', 'rating'];
    const filtersArray = filters.split(',').map((item) => {
      const [field, operator, value] = item.split('-');
      if (options.includes(field)) {
        queryObject[field] = { [operator]: Number(value) };
      }
      return item;
    });
    filters = filtersArray.join(',');
  }

  let result = Product.find(queryObject);
  // sort
  if (sort) {
    const sortList = (sort as string).split(',').join(' ');
    result = result.sort(sortList);
  } else {
    result = result.sort('createdAt');
  }

  if (fields) {
    const fieldsList = (fields as string).split(',').join(' ');
    result = result.select(fieldsList);
  }
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  result = result.skip(skip).limit(limit);

  const products = await result;
  res.status(200).json({ products, nbHits: products.length });
};

export const createProduct = async function (req: Request, res: Response) {};
