import { HomeCard } from '@/components/shared/home/home-card'
import { HomeCarousel } from '@/components/shared/home/home-carousel'
import {
  getAllCategories,
  getProductsForCard,
} from '@/lib/actions/product.actions'
import data from '@/lib/data'
import { toSlug } from '@/lib/utils'

// This is the main landing page of the application
export default async function Page() {
  // Fetch categories and products for different sections of the home page
  const categories = (await getAllCategories()).slice(0, 4)
  const newArrivals = await getProductsForCard({
    tag: 'new-arrival',
    limit: 4,
  })
  // prepare featured and best-seller products
  const featureds = await getProductsForCard({
    tag: 'featured',
    limit: 4,
  })
  const bestSellers = await getProductsForCard({
    tag: 'best-seller',
    limit: 4,
  })
  // prepare cards data
  const cards = [
    {
      title: 'Categories to explore',
      link: {
        text: 'See all categories',
        href: '/search',
      },
      items: categories.map((category) => ({
        name: category,
        image: `/images/${toSlug(category)}.jpg`, // Replace with actual image URL for each category
        href: `/search?category=${category}`,
      })),
    },
    {
      title: 'Explore New Arrivals',
      items: newArrivals,
      link: {
        text: 'See all New Arrivals',
        href: '/search?tag=new-arrival',
      },
    },
    {
      title: 'Discover Best Sellers',
      items: bestSellers,
      link: {
        text: 'View all',
        href: '/search?tag=best-seller',
      },
    },
    {
      title: 'Featured Products',
      items: featureds,
      link: {
        text: 'Shop now',
        href: '/search?tag=featured',
      },
    },
  ]
  return (
    <>
      <HomeCarousel items={data.carousels} />
      <div className='md:p-4 md:space-y-4 bg-border'>
        <HomeCard cards={cards} />
      </div>
    </>
  )
}
