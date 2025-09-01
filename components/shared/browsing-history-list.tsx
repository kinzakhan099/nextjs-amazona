'use client'
import useBrowsingHistory from '@/hooks/use-browsing-history'
import React, { useEffect } from 'react'
import ProductSlider from './product/product-slider'
import { Separator } from '../ui/separator'
import { cn } from '@/lib/utils'

export default function BrowsingHistoryList({
  className,
}: {
  className?: string
}) {
  const { products } = useBrowsingHistory() //t("Related to items that you've viewed")
  return (
    products.length !== 0 && ( //if there is no products in browsing history, do not render the component
      <div className='bg-background'>
        <Separator className={cn('mb-4', className)} />
        {/*concatenate classnames*/}
        <ProductList //related products
          title={"Related to items that you've viewed"}
          type='related'
        />
        <Separator className='mb-4' />
        <ProductList //browsing history products
          title={'Your browsing history'}
          hideDetails
          type='history'
        />
      </div>
    )
  )
}

function ProductList({
  //list of products
  title,
  type = 'history',
  hideDetails = false,
  excludeId = '',
}: {
  title: string
  type: 'history' | 'related'
  excludeId?: string
  hideDetails?: boolean
}) {
  const { products } = useBrowsingHistory() //get products from browsing history
  //fetch products from api
  const [data, setData] = React.useState([])
  useEffect(() => {
    //fetch products when component mounts or when excludeId, products, or type changes
    const fetchProducts = async () => {
      //fetch products from api
      const res = await fetch(
        `/api/products/browsing-history?type=${type}&excludeId=${excludeId}&categories=${products
          .map((product) => product.category) //get categories of products by mapping through products
          .join(',')}&ids=${products.map((product) => product.id).join(',')}` //get ids of products by joining them with comma
      )
      const data = await res.json() //parse json response
      setData(data) //set data to state
    }
    fetchProducts()
  }, [excludeId, products, type]) //dependencies

  return (
    data.length > 0 && ( //if there is no products, do not render the component
      <ProductSlider title={title} products={data} hideDetails={hideDetails} />
    )
  )
}
