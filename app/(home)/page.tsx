import { HomeCarousel } from '@/components/shared/home/home-carousel'
import data from '@/lib/data'

// This is the main landing page of the application
export default async function Page() {
  return <HomeCarousel items={data.carousels} />
}
