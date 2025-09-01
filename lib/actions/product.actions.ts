'use server'
// ACTIONS TO FETCH PRODUCTS FROM DATABASE
import { connectToDatabase } from '@/lib/db'
import Product, { IProduct } from '@/lib/db/models/product.model' // Adjust the import path as necessary
import { PAGE_SIZE } from '../constants'

// function to get categories
export async function getAllCategories() {
  await connectToDatabase()
  const categories = await Product.find({ isPublished: true }).distinct(
    'category'
  )
  return categories
}

//get products for card component
export async function getProductsForCard({
  tag,
  limit = 4,
}: {
  tag: string
  limit?: number
}) {
  await connectToDatabase()
  const products = await Product.find(
    { tags: { $in: [tag] }, isPublished: true },
    {
      name: 1,
      href: { $concat: ['/product/', '$slug'] },
      image: { $arrayElemAt: ['$images', 0] },
    }
  )
    // only get name, href and image
    .sort({ createdAt: 'desc' })
    .limit(limit)
  return JSON.parse(JSON.stringify(products)) as {
    name: string
    href: string
    image: string
  }[]
}

// GET PRODUCTS BY TAG
export async function getProductsByTag({
  tag,
  limit = 10,
}: {
  tag: string
  limit?: number
}) {
  await connectToDatabase()
  const products = await Product.find({
    tags: { $in: [tag] },
    isPublished: true,
  })
    .sort({ createdAt: 'desc' })
    .limit(limit)
  return JSON.parse(JSON.stringify(products)) as IProduct[] // return as array of products
}

// GET ONE PRODUCT BY SLUG
export async function getProductBySlug(slug: string) {
  await connectToDatabase()
  const product = await Product.findOne({ slug, isPublished: true })
  if (!product) throw new Error('Product not found')
  return JSON.parse(JSON.stringify(product)) as IProduct // return as product object
}

// GET RELATED PRODUCTS: PRODUCTS WITH SAME CATEGORY
export async function getRelatedProductsByCategory({
  category,
  productId,
  limit = PAGE_SIZE,
  page = 1,
}: {
  category: string
  productId: string
  limit?: number
  page: number
}) {
  // get products with same category but not the same product
  await connectToDatabase()
  // calculate how many products to skip based on the page number
  const skipAmount = (Number(page) - 1) * limit
  const conditions = {
    // filter conditions
    isPublished: true,
    category,
    _id: { $ne: productId }, // exclude the current product
  }
  const products = await Product.find(conditions) // find products based on conditions
    .sort({ numSales: 'desc' }) // sort by number of sales in descending order
    .skip(skipAmount) // skip products for pagination
    .limit(limit) // limit the number of products returned
  // get total count of products for pagination
  const productsCount = await Product.countDocuments(conditions)
  return {
    data: JSON.parse(JSON.stringify(products)) as IProduct[], // return as array of products
    totalPages: Math.ceil(productsCount / limit), // calculate total pages
  }
}
