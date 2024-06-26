/* eslint-disable no-unused-vars */
import EditProduct from './EditProduct';
import { useContext } from 'react'
import { Context } from "../../context/AppContext";
import { useSelector } from 'react-redux';
import { selectProducts } from '../../toolkit/Slices/ProductsSlice'
import { selectCategories, setCategories } from '../../toolkit/Slices/CategoriesSlice'
import Swal from "sweetalert2";

// import AnimateWrapper from '../WebScrapper/AnimateWrapper';
// <AnimateWrapper key={category._id} transition={{ duration: 1, delay: i * .1 }} >
// </AnimateWrapper>
const BodyTableCategory = () => {
    const { isHiddenEdit, setisHiddenEdit } = useContext(Context);

    const isHiddenEditFunction = () => {
        setisHiddenEdit(true);
    };

    const categories = useSelector(selectCategories);
    const products = useSelector(selectProducts);


    const deleteCategory = (categoryId, categoryName) => {
        if (window.confirm(`Are you sure you want to delete the category "${categoryName}"?`)) {
            fetch("http://localhost:5000/api/deleteCategory", {
                method: "POST",
                crossDomain: true,
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json", "Access-Control-Allow-Origin": "*",
                },
                body: JSON.stringify({
                    categoryId: categoryId,
                }),
            })
                .then((res) => {
                    if (res.ok) {
                        return res.json();
                    } else {
                        throw new Error(`Failed to delete category: ${res.status}`);
                    }
                })
                .then((data) => {
                    if (data.status === "Ok") {
                        Swal.fire("Category Successfully Deleted");
                        setCategories((categories) => categories.filter(Categories => Categories._id !== categoryId));
                        // Handle UI updates or any other actions here
                    } else {
                        Swal.fire("Deletion Failed", "error");
                    }
                })
                .catch((error) => {
                    console.error("Error deleting category:", error);
                });
        }
    };




    return (
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                   
                    <th scope="col" className="p-4">

                    </th>
                    <th scope="col" className="p-4">
                        Category
                    </th>
                    <th scope="col" className="p-4">
                        Products
                    </th>

                    <th scope="col" className="p-4">
                        Actions
                    </th>
                </tr>
            </thead>
            <tbody>
                {[...categories]?.reverse()?.map((category) => (


                    <tr key={category._id} className="border-b dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700">

                      
                        <td scope="row" className="px-4  w-[10%] py-3 font-medium text-gray-900 dark:text-white ">
                            <div className="flex items-center    ">
                                <img
                                    src={`https://ucarecdn.com/${category?.image}/`}
                                    alt="iMac Front Image"
                                    className="w-[70%]  mix-blend-multiply "
                                    style={{ filter: ' contrast(1.1) ' }}
                                />
                            </div>
                        </td>
                        <td className="px-4 py-3 w-1/5  ">
                            <span className="bg-primary-100   text-md text-primary-800   px-2 py-1  whitespace-nowrap font-bold   rounded-full dark:bg-primary-900 dark:text-primary-300">
                                {category.name}
                            </span>
                        </td>
                        <td scope="row" className="px-4 py-3  w-1/5  font-medium text-gray-900 dark:text-white ">
                            <div className="flex items-center mr-3 line-clamp-1  ">
                                <p className='flex text-sm justify-center text-center text-gray-400'>{products.filter(product => product?.category === category._id).length} • Products</p>

                            </div>
                        </td>

                        <td className="px-4 py-3 font-medium  w-full text-gray-900 whitespace-nowrap dark:text-white">
                            {isHiddenEdit && <EditProduct />}

                            <div className="flex items-center space-x-4 " >
                                {/* <button
                                    onClick={isHiddenEditFunction}
                                    type="button"
                                    data-drawer-target="drawer-update-product"
                                    data-drawer-show="drawer-update-product"
                                    aria-controls="drawer-update-product"
                                    className="py-2 px-3 flex items-center w-full justify-center  transition-all ease-in text-sm font-medium text-center text-white bg-primary-700 rounded-lg hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-4 w-4 mr-2 -ml-0.5"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                        aria-hidden="true"
                                    >
                                        <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
                                        <path
                                            fillRule="evenodd"
                                            d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                    Edit

                                </button> */}

                                <button
                                    onClick={() => deleteCategory(category._id, category.name)}
                                    type="button"
                                    data-modal-target="delete-modal"
                                    data-modal-toggle="delete-modal"
                                    className="flex items-center transition-all w-full justify-center ease-in text-red-700 hover:text-white border border-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-3 py-3 text-center dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-4 w-4 mr-2 -ml-0.5"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                        aria-hidden="true"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                    Delete
                                </button>

                            </div>

                        </td>

                    </tr>
                ))}


            </tbody>
        </table>


    )
}

export default BodyTableCategory