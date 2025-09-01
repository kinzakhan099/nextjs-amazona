'use client'

import { useState } from 'react'
import Image from 'next/image'
import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'

// PRODUCT GALLERY COMPONENT
export default function ProductGallery({ images }: { images: string[] }) {
  // array of image URLs
  const [selectedImage, setSelectedImage] = useState(0) // index of the currently selected image
  return (
    <div className='flex gap-2'>
      <div className='flex flex-col gap-2 mt-8'>
        {images.map(
          (
            image,
            index // thumbnails
          ) => (
            <button // thumbnail button
              key={index}
              onClick={() => {
                setSelectedImage(index)
              }}
              onMouseOver={() => {
                setSelectedImage(index)
              }}
              className={`bg-white rounded-lg overflow-hidden ${
                // highlight border for selected image
                selectedImage === index
                  ? 'ring-2 ring-blue-500'
                  : 'ring-1 ring-gray-300'
              }`}
            >
              <Image src={image} alt={'product image'} width={48} height={48} />
            </button>
          )
        )}
      </div>

      <div className='w-full'>
        <Zoom>
          <div className='relative h-[500px]'>
            <Image
              src={images[selectedImage]}
              alt={'product image'}
              fill
              sizes='90vw'
              className='object-contain'
              priority
            />
          </div>
        </Zoom>
      </div>
    </div>
  )
}
