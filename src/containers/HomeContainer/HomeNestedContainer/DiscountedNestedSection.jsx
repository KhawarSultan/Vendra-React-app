/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */

/* eslint-disable react/prop-types */
import '../../../assets/styles/AdminCategoryProducts.scss';
import { VscHeart } from 'react-icons/vsc';
import { AiOutlineStar, AiFillStar } from 'react-icons/ai';
import { BsCart2 } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectdiscount } from '../../../toolkit/Slices/DicountSlice'
import BackgroundRemoval from '../../../pages/BackgroundRemoval';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../../toolkit/Slices/CartSlice';
import { addToWishlist } from '../../../toolkit/Slices/WishlistSlice';
import { useState, useEffect } from 'react';
import { HiOutlineCheck } from "react-icons/hi";
import { FaFire } from "react-icons/fa";
import { selectRemovedProductIds } from '../../../toolkit/Slices/BestSellingSlice';
import { IoMdArrowForward } from "react-icons/io";
import { MdOutlineErrorOutline } from "react-icons/md";
import toast from 'react-hot-toast';


import StarRatingAvg from '../../SingleProductContainer/StarRatingAvg'
import { selectReviews } from '../../../toolkit/Slices/ReviewSlice';

import { selectExchangeRate } from '../../../toolkit/Slices/CompareSlice';


const DiscountedNestedSection = ({ sliceProducts, grid }) => {

    const reviews = useSelector(selectReviews);
    const ExchangeRate = useSelector(selectExchangeRate);
    const Navigate = useNavigate();
    const dispatch = useDispatch();
    const discount = useSelector(selectdiscount);
    const RemovedProductIds = useSelector(selectRemovedProductIds);


    const [wishlistTragetid, setwishlistTragetid] = useState();
    const [cartTragetid, setcartTragetid] = useState();
    const [wishlistloading, setwishlistloading] = useState(false);
    const [cartloading, setcartloading] = useState(false);

    const handleAddToWishList = (id, name, desc, price, imageurl, quantity) => {
        toast.success(<span style={{ fontWeight: 'bold' }}>Added to wishlist</span>);

        dispatch(addToWishlist({ id: id, name: name, desc: desc, price: price, imageurl: imageurl, quantity: quantity }));
        setwishlistloading(true);
    };
    const handleAddToCart = (id, name, desc, price, imageurl, quantity) => {
        toast.success(<span style={{ fontWeight: 'bold' }}>Added to cart</span>);

        dispatch(addToCart({ id: id, name: name, desc: desc, price: price, imageurl: imageurl, quantity: quantity }));
        setcartloading(true);
    };


    useEffect(() => {

        if (wishlistloading == true) {
            const timeoutId = setTimeout(() => {
                setwishlistloading(false);
            }, 1000);
            return () => clearTimeout(timeoutId);
        }
        if (cartloading == true) {
            const timeoutId = setTimeout(() => {
                setcartloading(false);
            }, 1000);
            return () => clearTimeout(timeoutId);
        }
    }, [wishlistloading, cartloading]);


    const displayedProducts = Array.isArray(discount)
        ? (sliceProducts ? [...discount.slice(-8)] : [...discount]).reverse()
        : [];

    const calculateDiscountPercentage = (discountedProductsprice, discountedPriceInput) => {
        const originalPrice = discountedProductsprice || 0;
        const discountedPrice = parseFloat(discountedPriceInput) || 0;
        if (originalPrice === 0) {
            return 'N/A';
        }
        const discountPercentage = ((originalPrice - discountedPrice) / originalPrice) * 100;
        return discountPercentage.toFixed(0);
    };


    return (
        <>
            {displayedProducts?.length !== 0 ? (
                <div className={`my-7 grid  gap-7 ${grid}`}>
                    {displayedProducts.map((product) => (
                        <article key={product.id} className="cursor-pointer  select-none flex flex-col justify-between  Parent-Col-Hover relative">
                            <main>
                                <div>

                                    <div className='md:top-[-0.40rem]  top-[0.40rem] py-1   md:right-[-10px]   rounded-full    text-green-800 font-bold    bg-green-300 md:px-3 px-2 absolute z-10'>
                                        {calculateDiscountPercentage(product.price, product?.inputDescount)}%
                                    </div>
                                    <div onClick={() => {
                                        handleAddToWishList(
                                            product.id,
                                            product.name,
                                            product.desc,
                                            product.inputDescount,
                                            product.imageurl,
                                            1
                                        );
                                        setwishlistTragetid(product._id);
                                    }} className='md:top-[14.5rem]  top-[10.80rem] md:right-[10px] right-[10px]  bg-gray-300 hover:bg-gray-200 rounded-full  p-[0.40rem] absolute  cursor-pointer z-10'>
                                        {wishlistloading && wishlistTragetid == product._id ? (
                                            <HiOutlineCheck size={20} />
                                        ) : (
                                            <VscHeart size={20} />
                                        )}
                                        {RemovedProductIds.includes(product.id) && (
                                            <div className='md:top-[-0.1rem] top-[0.40rem] p-[4px] md:left-[-40px]    rounded-full    text-orange-700 bg-orange-300  absolute z-10'>
                                                <img src="   https://cdn-icons-png.flaticon.com/512/4715/4715576.png " className=' w-[26px]' alt="" />

                                            </div>
                                        )}
                                    </div>

                                    {/* md:top-[10.80rem] top-[10.80rem] */}
                                    {/* md:top-[0.80rem] top-[0.30rem] */}

                                </div>
                                <section className={`  relative    Parent-product-Image-Hover  `} onClick={() => Navigate(`/viewsingleproduct/${product?.id}/${RemovedProductIds.includes(product.id) ? true : false}/${true}/${product?.inputDescount}`)}>
                                    <img className='mix-blend-multiply flex w-full ' src={`https://ucarecdn.com/${product?.imageurl[0]}/-/scale_crop/500x500/`} alt="" />
                                </section>



                            </main>
                            <main  >
                                <div className='upper  mt-4  ' onClick={() => Navigate(`/viewsingleproduct/${product?.id}/${RemovedProductIds.includes(product.id) ? true : false}/${true}/${product?.inputDescount}`)}>
                                    <span className=' md:leading-5 mb-3  text-lg leading-5 line-clamp-2 font-bold     hover:cursor-pointer hover:underline   Parent-product-text-Hover  capitalize  '>{product.name}</span>
                                    <p className=' md:leading-5  leading-5 mb-3  line-clamp-3  hover:cursor-pointer  text-gray-400  '>{product.desc}</p>
                                </div>
                                <span className='flex items-center gap-1  mt-2'>
                                    <StarRatingAvg reviews={reviews.flat().filter(review => review.productid === product?.id)} />

                                </span>
                                <div className='flex justify-between items-center '>
                                    <div className='md:flex justify-center items-center gap-2 '>
                                        <p className=' text-lg text-gray-800 font-extrabold font-price leading-5'><span className=' text-sm'>{ExchangeRate ? ExchangeRate.code : 'USD'}</span > <span className=' text-xl'>{product?.inputDescount}</span></p>
                                        <p className='  text-sm  font-bold  line-through  text-red-500 ' >{ExchangeRate ? ExchangeRate.code : 'USD'} {ExchangeRate ? (ExchangeRate.value * product.price).toFixed(0) : product.price}</p>
                                    </div>

                                    <div onClick={() => {
                                        handleAddToCart(
                                            product?.id,
                                            product?.name,
                                            product?.desc,
                                            product?.inputDescount,
                                            product?.imageurl,
                                            1
                                        );
                                        setcartTragetid(product.id);
                                    }} className='p-2 rounded-lg border hover:bg-gray-100 cursor-pointer'>

                                        {cartloading && cartTragetid == product.id ? (
                                            < HiOutlineCheck size={20} />
                                        ) : (
                                            <BsCart2 size={20} />
                                        )}
                                    </div>
                                </div>

                            </main>
                        </article>
                    ))}

                </div>
            ) : (
                <div >
                    <div className='  pb-28 pt-24 justify-center items-center flex flex-col gap-3'>
                        <MdOutlineErrorOutline size={130} className=' mb-3  opacity-10' />
                        <span className=' font-bold  ' >No Product In Discount  </span>
                        <p className=" cursor-pointer text-indigo-700 flex items-center  font-bold   bg-indigo-100 gap-2  transition-all ease-in px-4 py-2 rounded-full"
                            onClick={() => Navigate('/shop')}  >go back <IoMdArrowForward className=' opacity-100' size={16} /></p>
                    </div>
                </div>
            )}



        </>
    );
};

export default DiscountedNestedSection
