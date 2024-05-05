/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import '../../../assets/styles/AdminCategoryProducts.scss';
import { VscHeart } from 'react-icons/vsc';
import { AiOutlineStar, AiFillStar } from 'react-icons/ai';
import { BsCart2 } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectbestSelling } from '../../../toolkit/Slices/BestSellingSlice'
import BackgroundRemoval from '../../../pages/BackgroundRemoval';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../../toolkit/Slices/CartSlice';
import { addToWishlist } from '../../../toolkit/Slices/WishlistSlice';
import { useState, useEffect } from 'react';
import { HiOutlineCheck } from "react-icons/hi";
import { FaFire } from "react-icons/fa";
import { IoMdArrowForward } from "react-icons/io";
import toast from 'react-hot-toast';
import { MdOutlineErrorOutline } from "react-icons/md";
import StarRatingAvg from '../../SingleProductContainer/StarRatingAvg'
import { selectReviews } from '../../../toolkit/Slices/ReviewSlice';
import fire from '../../../assets/images/fire.svg'
import { selectExchangeRate } from '../../../toolkit/Slices/CompareSlice';


const BestSellingNestedSection = ({ sliceProducts, grid }) => {
    const reviews = useSelector(selectReviews);
    const ExchangeRate = useSelector(selectExchangeRate);

    const Navigate = useNavigate();
    const dispatch = useDispatch();
    const bestSelling = useSelector(selectbestSelling);
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


    const displayedProducts = Array.isArray(bestSelling)
        ? (sliceProducts ? [...bestSelling.slice(-8)] : [...bestSelling]).reverse()
        : [];

    return (
        <>

            {displayedProducts?.length !== 0 ? (
                <div className={`my-7 grid  gap-7 ${grid}`}>
                    {displayedProducts.map((product) => (
                        <article key={product?.id} className="cursor-pointer  select-none flex flex-col justify-between  Parent-Col-Hover relative">
                            <main>
                                <div>
                                    <div className='md:top-[-1rem]  top-[0.20rem]    md:right-[-10px]   absolute z-10'>
                                        <img src="   https://cdn-icons-png.flaticon.com/512/4715/4715576.png " className=' w-[36px]' alt="" />
                                    </div>


                                    <div onClick={() => {
                                        handleAddToWishList(
                                            product.id,
                                            product.name,
                                            product.desc,
                                            product.price,
                                            product.imageurl,
                                            1
                                        );
                                        setwishlistTragetid(product.id);
                                    }} className='md:top-[14.5rem] top-[10.80rem] md:right-[10px] right-[10px]    bg-gray-300 hover:bg-gray-200 rounded-full  p-[0.40rem] absolute  cursor-pointer z-10'>
                                        {wishlistloading && wishlistTragetid == product.id ? (
                                            <HiOutlineCheck size={20} />
                                        ) : (
                                            <VscHeart size={20} />
                                        )}
                                    </div>

                                </div>







                                <section className={` rounded-2xl  relative    Parent-product-Image-Hover  `} onClick={() => Navigate(`/viewsingleproduct/${product?.id}/${true}/${false}/bestSell`)}>
                                    <img className='mix-blend-multiply flex rounded-xl w-full ' src={`https://ucarecdn.com/${product?.imageurl[0]}/-/scale_crop/500x500/`} alt="" />
                                </section>


                            </main>
                            <main  >
                                <div className='upper  mt-4  ' onClick={() => Navigate(`/viewsingleproduct/${product?.id}/${true}/${false}/bestSell`)}>
                                    <span className=' md:leading-5 mb-3  text-lg leading-5 line-clamp-2 font-bold     hover:cursor-pointer hover:underline   Parent-product-text-Hover  capitalize  '>{product.name}</span>
                                    <p className=' md:leading-5  leading-5 mb-3  line-clamp-3  hover:cursor-pointer  text-gray-400  '>{product.desc}</p>
                                </div>


                                <span className='flex items-center gap-1  mt-2'>
                                    <StarRatingAvg reviews={reviews.flat().filter(review => review.productid === product?.id)} />
                                </span>
                                <div className='flex justify-between items-center '>
                                    <div className='md:flex justify-center items-center gap-2 '>
                                        <p className=' text-gray-800 font-extrabold font-price'><span className=' text-sm'>{ExchangeRate ? ExchangeRate.code : 'USD'}</span> <span className=' text-xl'> {ExchangeRate ? (ExchangeRate.value * product.price).toFixed(0) : product.price}</span>   </p>

                                        {/* <p className=' text-lg text-gray-800 font-extrabold font-price leading-5'>${product.price}</p> */}
                                    </div>

                                    <div onClick={() => {
                                        handleAddToCart(
                                            product?.id,
                                            product?.name,
                                            product?.desc,
                                            product?.price,
                                            product?.imageurl,
                                            1
                                        );
                                        setcartTragetid(product._id);
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
                        <span className=' font-bold  ' >No Product In Bestselling  </span>
                        <p className=" cursor-pointer text-indigo-700 flex items-center  font-bold   bg-indigo-100 gap-2  transition-all ease-in px-4 py-2 rounded-full"
                            onClick={() => Navigate('/shop')}  >go back <IoMdArrowForward className=' opacity-100' size={16} /></p>
                    </div>
                </div>
            )}
        </>
    );
};

export default BestSellingNestedSection
