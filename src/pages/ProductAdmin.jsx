import React, { useEffect, useState } from 'react'
import SummaryApi from '../common/SummaryApi'
import AxiosToastError from '../utils/AxiosToastError'
import Axios from '../utils/Axios'
import Loading from '../components/Loading'
import ProductCardAdmin from '../components/ProductCardAdmin'
import { IoSearchOutline } from "react-icons/io5";

const ProductAdmin = () => {

    const [productData, setProductData] = useState([])
    const [page, setPage] = useState(1)
    const [loading, setLoading] = useState(false)
    const [totalPageCount, setTotalPageCount] = useState(1)
    const [search, setSearch] = useState("")

    const fetchProductData = async () => {
        try {

            setLoading(true)

            const response = await Axios({
                ...SummaryApi.getProduct,
                data: {
                    page: page,
                    limit: 12,
                    search: search
                }
            })

            const { data: responseData } = response

            console.log("API Response:", responseData)

            if (responseData.success) {

                setProductData(responseData.data || [])

                setTotalPageCount(
                    responseData.totalNoPage ||
                    responseData.totalPage ||
                    responseData.totalPages ||
                    1
                )
            }

        } catch (error) {
            AxiosToastError(error)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {

        const timer = setTimeout(() => {
            fetchProductData()
        }, 500)

        return () => clearTimeout(timer)

    }, [page, search])

    const handleNext = () => {
        if (page < totalPageCount) {
            setPage(prev => prev + 1)
        }
    }

    const handlePrevious = () => {
        if (page > 1) {
            setPage(prev => prev - 1)
        }
    }

    const handleOnChange = (e) => {
        setSearch(e.target.value)
        setPage(1)
    }

    return (
        <section>

            {/* Header */}

            <div className='p-3 bg-white shadow-md flex items-center justify-between gap-4'>

                <h2 className='font-semibold text-lg'>
                    Product Management
                </h2>

                <div className='h-full min-w-24 max-w-72 w-full ml-auto bg-blue-50 px-4 flex items-center gap-3 py-2 rounded border focus-within:border-blue-500'>

                    <IoSearchOutline size={22} />

                    <input
                        type='text'
                        placeholder='Search product here...'
                        className='h-full w-full outline-none bg-transparent'
                        value={search}
                        onChange={handleOnChange}
                    />

                </div>

            </div>

            {loading && <Loading />}

            <div className='p-4 bg-blue-50'>

                {/* Products */}

                <div className='min-h-[55vh]'>

                    <div className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4'>

                        {
                            productData.map((product) => (
                                <ProductCardAdmin
                                    key={product._id}
                                    data={product}
                                    fetchProductData={fetchProductData}
                                />
                            ))
                        }

                    </div>

                    {
                        !loading &&
                        productData.length === 0 && (
                            <div className='text-center py-20 text-gray-500'>
                                No Products Found
                            </div>
                        )
                    }

                </div>

                {/* Pagination */}

                <div className='flex items-center justify-center gap-4 mt-8'>

                    <button
                        onClick={handlePrevious}
                        disabled={page === 1}
                        className='
                            px-5
                            py-2
                            border
                            rounded-lg
                            bg-white
                            hover:bg-primary-200
                            disabled:opacity-50
                            disabled:cursor-not-allowed
                        '
                    >
                        Previous
                    </button>

                    <div className='px-6 py-2 bg-white rounded-lg shadow font-medium'>

                         {page} / {totalPageCount}

                    </div>

                    <button
                        onClick={handleNext}
                        disabled={page >= totalPageCount}
                        className='
                            px-5
                            py-2
                            border
                            rounded-lg
                            bg-white
                            hover:bg-primary-200
                            disabled:opacity-50
                            disabled:cursor-not-allowed
                        '
                    >
                        Next
                    </button>

                </div>

            </div>

        </section>
    )
}

export default ProductAdmin