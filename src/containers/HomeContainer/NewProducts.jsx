/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { BsArrowRightShort } from 'react-icons/bs';
import '../../assets/styles/NewProducts.scss';
import NewProductsNestedSection from './HomeNestedContainer/NewProductsNestedSection';
import CategoryProductsNestedSection from './HomeNestedContainer/CategoryProductsNestedSection';
import { ChevronLeft } from 'lucide-react';
import { useNavigate } from "react-router-dom";
import { ArrowUpRight } from 'lucide-react';
import BestSellingNestedSection from './HomeNestedContainer/BestSellingNestedSection';
import DiscountedNestedSection from './HomeNestedContainer/DiscountedNestedSection';
import ShopNestedSection from './HomeNestedContainer/ShopProductsNestedSection';
const NewProducts = ({ title, NewProductBanner, grid, filteredProducts, viewmore, Related, sliceProducts, url, bestselling, sectionClasses, imageClasses, TextClasses }) => {
    const Navigate = useNavigate();
    const URL = url === 'bestselling' ? '/bestselling' : url === 'discount' ? '/discount' : '/shop';
    // const sectionToRender = viewmore === 'newProducts' ? <NewProductsNestedSection sliceProducts={sliceProducts === false ? false : true} />
    //     : viewmore === 'discount' ? <DiscountedNestedSection sliceProducts={sliceProducts === false ? false : true} />
    //         : viewmore === 'newProducts' ? <NewProductsNestedSection sliceProducts={sliceProducts === false ? false : true} />
    //             : viewmore === 'discount' ? <DiscountedNestedSection sliceProducts={sliceProducts === false ? false : true} />  


    // if (viewmore === 'newProducts') {
    //     sectionToRender = <NewProductsNestedSection sliceProducts={sliceProducts === false ? false : true} />;
    // } else if (viewmore === 'discount') {
    //     sectionToRender = <DiscountedNestedSection sliceProducts={sliceProducts === false ? false : true} />;
    // } else if (viewmore === 'bestselling') {
    //     sectionToRender = <BestSellingNestedSection sliceProducts={sliceProducts === false ? false : true} />;
    // } else {
    //     sectionToRender = <CategoryProductsNestedSection filteredProducts={filteredProducts} />;
    // }
    return (
        <>
            <main className=' md:mt-0 mt-6 flex flex-col justify-between  '>
                <main >
                    {filteredProducts?.length !== 0 && title &&
                        <>
                            <section className="flex justify-between items-center mb-3">
                                <div className='flex  justify-center items-center gap-4'>
                                    {!Related && !viewmore &&
                                        <div onClick={() => Navigate(`/`)} className=' p-2  rounded-full bg-gray-200 hover:bg-gray-300 cursor-pointer transition-all ease-in flex justify-center items-center '>
                                            {<ChevronLeft size={20} />}
                                        </div>

                                    }
                                    <p className="text-2xl   font-extrabold whitespace-nowrap ">{title}</p>

                                </div>
                                {viewmore && <p className="text-sm cursor-pointer  text-blue-600 flex gap-1 items-center whitespace-nowrap hover:bg-blue-100  transition-all ease-in px-2 py-1 rounded-full" onClick={() => Navigate(URL)}> View more <BsArrowRightShort size={20} /> </p>}

                            </section>
                            <hr />
                        </>

                    }

                    {url === 'newProducts' 
                        ? <NewProductsNestedSection   grid={grid} sliceProducts={sliceProducts === false ? false : true} />
                        : url === 'discount'
                            ? <DiscountedNestedSection grid={grid} sliceProducts={sliceProducts === false ? false : true} />
                            : url === 'shop'
                                ? <ShopNestedSection filteredProducts={filteredProducts} grid={grid} sectionClasses={sectionClasses} imageClasses={imageClasses} TextClasses={TextClasses}  />
                            : url === 'bestselling'
                                ? <BestSellingNestedSection grid={grid}  sliceProducts={sliceProducts === false ? false : true} />
                                : <CategoryProductsNestedSection grid={grid} name={'category'} filteredProducts={filteredProducts} />
                    }

                    {/* {url === 'shop' &&
                        <section >
                            <NewProductsNestedSection grid={grid} sliceProducts={sliceProducts === false ? false : true} />
                        </section>
                    } */}

                </main>

                <main>
                    {NewProductBanner &&
                        <section className='relative '>
                            <div className='text-black absolute md:top-6 top-4 md:left-10  z-10  p-2'>

                                <div className='mt-5'>
                                    <h1 className='md:text-2xl   text-lg leading-6 md:block hidden tracking-tight text-gray-500'>Immerse yourself in pure sound</h1>
                                    <h1 className='md:text-4xl text-2xl   font-extrabold leading-6 tracking-tight'>Discover Premium Headphones</h1>
                                </div>
                                <button className='px-5 py-2  text-sm font-semibold   bg-blue-500 rounded-full text-white  transition-all ease-in  mt-4'>
                                    <b>Shop now</b>
                                </button>
                            </div>
                            <div className='h-full w-full border'>
                                <img src="https://res.cloudinary.com/denajbnh4/image/upload/v1694938129/banner-4_uoyebo.jpg" className='object-cover w-full h-full' alt="" />
                            </div>
                        </section>
                    }
                </main>
            </main>




        </>
    )
}

export default NewProducts

{/* <div className=' border border-gray rounded-full p-[0.35rem] absolute top-3 left-18 cursor-pointer z-10'>
                            <TbGitCompare size={18} />
                        </div>
                        <div className=' border border-black rounded-full p-1 absolute top-3   left-44  cursor-pointer z-10'>
                            <AiOutlineEye size={20} />
                        </div> */}

{/* 
                    {viewmore ?
                        <section className={`my-7 grid  ${grid} gap-7 `}>
                            <NewProductsNestedSection sliceProducts={sliceProducts === false ? false : true} />
                        </section>
                        :
                        <section className={`my-7 grid ${grid} gap-7`}>
                            <CategoryProductsNestedSection filteredProducts={filteredProducts} />
                        </section>


                        <section className={`my-7 grid  ${grid} gap-7 `}>
                            <BestSellingNestedSection />
                        </section> :
                        <section className={`my-7 grid  ${grid} gap-7 `}>
                            <DiscountedNestedSection />
                        </section>
                    } */}
