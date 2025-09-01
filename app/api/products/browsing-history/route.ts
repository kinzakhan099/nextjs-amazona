import { NextRequest, NextResponse } from 'next/server'

import Product from '@/lib/db/models/product.model'
import { connectToDatabase } from '@/lib/db'

// Get products from browsing history or related products based on type
export const GET = async (request: NextRequest) => {
  //get products from browsing history
  const listType = request.nextUrl.searchParams.get('type') || 'history'
  const productIdsParam = request.nextUrl.searchParams.get('ids')
  const categoriesParam = request.nextUrl.searchParams.get('categories')

  if (!productIdsParam || !categoriesParam) {
    return NextResponse.json([])
  }

  const productIds = productIdsParam.split(',') //split ids by comma
  const categories = categoriesParam.split(',')
  const filter = //filter based on type
    listType === 'history'
      ? {
          _id: { $in: productIds },
        }
      : { category: { $in: categories }, _id: { $nin: productIds } } //filter based on type

  await connectToDatabase()
  const products = await Product.find(filter)
  if (listType === 'history')
    return NextResponse.json(
      products.sort(
        (a, b) =>
          productIds.indexOf(a._id.toString()) -
          productIds.indexOf(b._id.toString())
      )
    )
  return NextResponse.json(products)
}
