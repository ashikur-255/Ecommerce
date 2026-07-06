import React, { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import SummaryApi from '../common/SummaryApi'
import Axios from '../utils/Axios'
import AxiosToastError from '../utils/AxiosToastError'
import { FaAngleRight, FaAngleLeft } from "react-icons/fa6"
import { DisplayPriceInRupees } from '../utils/DisplayPriceInRupees'
import Divider from '../components/Divider'
import image1 from '../assets/minute_delivery.jpg'
import image2 from '../assets/Best_Price_Offers.jpg'
import image3 from '../assets/Wide_Assortment.jpg'
import { pricewithDiscount } from '../utils/PriceWithDiscount'
import AddToCartButton from '../components/AddToCartButton'

const ProductDisplayPage = () => {
  const params = useParams()
  const productId = params?.product?.split("-")?.pop()

  const [data, setData] = useState({
    name: "",
    image: [],
    description: "",
    more_details: {}
  })

  const [imageIndex, setImageIndex] = useState(0)
  const [loading, setLoading] = useState(false)

  const imageContainer = useRef(null)

  const fetchProductDetails = async () => {
    try {
      setLoading(true)

      const response = await Axios({
        ...SummaryApi.getProductDetails,
        data: { productId }
      })

      const { data: res } = response

      if (res.success) {
        setData({
          ...res.data,
          image: res.data.image || [],
          more_details: res.data.more_details || {}
        })
        setImageIndex(0)
      }

    } catch (error) {
      AxiosToastError(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (productId) fetchProductDetails()
  }, [productId])

  const handleScrollRight = () => {
    imageContainer.current.scrollLeft += 120
  }

  const handleScrollLeft = () => {
    imageContainer.current.scrollLeft -= 120
  }

  const images = data.image || []

  return (
    <section className='container mx-auto p-4 grid lg:grid-cols-2 gap-6'>

      {/* LEFT SIDE */}
      <div>

        {/* MAIN IMAGE */}
        <div className='bg-white rounded min-h-56 lg:h-[65vh] flex items-center justify-center'>
          {
            images[imageIndex] ? (
              <img
                src={images[imageIndex]}
                className='w-full h-full object-contain'
                alt="product"
              />
            ) : (
              <p className="text-gray-400">No Image</p>
            )
          }
        </div>

        {/* DOTS */}
        <div className='flex justify-center gap-2 my-2'>
          {images.map((_, index) => (
            <div
              key={index}
              className={`w-3 h-3 rounded-full ${index === imageIndex ? 'bg-gray-600' : 'bg-gray-300'}`}
            />
          ))}
        </div>

        {/* THUMBNAILS */}
        <div className='relative'>
          <div
            ref={imageContainer}
            className='flex gap-3 overflow-x-auto scrollbar-none scroll-smooth'
          >
            {images.map((img, index) => (
              <div
                key={img + index}
                className='w-20 h-20 min-w-20 cursor-pointer border rounded'
                onClick={() => setImageIndex(index)}
              >
                <img
                  src={img}
                  className='w-full h-full object-contain'
                  alt="thumb"
                />
              </div>
            ))}
          </div>

          <button onClick={handleScrollLeft} className='absolute left-0 top-1/2 bg-white p-1 shadow rounded-full'>
            <FaAngleLeft />
          </button>

          <button onClick={handleScrollRight} className='absolute right-0 top-1/2 bg-white p-1 shadow rounded-full'>
            <FaAngleRight />
          </button>
        </div>

        {/* DETAILS (DESKTOP ONLY) */}
        <div className='hidden lg:block mt-6 space-y-3'>
          <p><b>Description:</b> {data.description}</p>
          <p><b>Unit:</b> {data.unit}</p>

          {data?.more_details &&
            Object.keys(data.more_details).map((key) => (
              <p key={key}>
                <b>{key}:</b> {data.more_details[key]}
              </p>
            ))
          }
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className='p-4 lg:pl-6'>

        <p className='bg-green-200 w-fit px-2 rounded-full text-sm'>Fast Delivery</p>

        <h2 className='text-xl lg:text-3xl font-semibold'>{data.name}</h2>

        <Divider />

        <div className='my-3'>
          <p className='font-semibold'>Price</p>

          <div className='flex items-center gap-3 flex-wrap'>
            <p className='bg-green-100 px-3 py-1 rounded border border-green-500'>
              {DisplayPriceInRupees(pricewithDiscount(data.price, data.discount))}
            </p>

            {data.discount && (
              <>
                <p className='line-through text-gray-500'>
                  {DisplayPriceInRupees(data.price)}
                </p>

                <p className='text-green-600 font-bold'>
                  {data.discount}% OFF
                </p>
              </>
            )}
          </div>
        </div>

        {data.stock === 0 ? (
          <p className='text-red-500 font-semibold'>Out of Stock</p>
        ) : (
          <div className='my-4'>
            <AddToCartButton data={data} />
          </div>
        )}

        {/* WHY SHOP */}
        <h3 className='font-semibold mt-6'>Why shop from us?</h3>

        {[image1, image2, image3].map((img, i) => (
          <div key={i} className='flex items-center gap-3 my-4'>
            <img src={img} className='w-16 h-16' />
            <p className='text-sm'>
              {i === 0 && "Superfast Delivery"}
              {i === 1 && "Best Prices & Offers"}
              {i === 2 && "Wide Assortment"}
            </p>
          </div>
        ))}

        {/* MOBILE DETAILS */}
        <div className='lg:hidden mt-6 space-y-2'>
          <p><b>Description:</b> {data.description}</p>
          <p><b>Unit:</b> {data.unit}</p>

          {data?.more_details &&
            Object.keys(data.more_details).map((key) => (
              <p key={key}>
                <b>{key}:</b> {data.more_details[key]}
              </p>
            ))
          }
        </div>

      </div>

    </section>
  )
}

export default ProductDisplayPage