import EditProduct from './EditProduct';
import { useContext } from 'react'
import { Context } from "../../context/AppContext";
import PreviewProduct from './PreviewProduct';
const BodyTableProduct = () => {
    const { isHiddenEdit, setisHiddenEdit } = useContext(Context);
    const { isHiddenPreview, setisHiddenPreview } = useContext(Context);

    const isHiddenEditFunction = () => {
        setisHiddenEdit(true);
    };
    const isHiddenPreviewFunction = () => {
        setisHiddenPreview(true);
    };

    return (
        <tbody>

            <tr className="border-b dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700">
                <td className="p-4 w-4">
                    <div className="flex items-center">
                        <input
                            id="checkbox-table-search-1"
                            type="checkbox"
                            onClick="event.stopPropagation()"
                            className="w-4 h-4 text-primary-600 bg-gray-100 rounded border-gray-300 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        />
                        <label
                            htmlFor="checkbox-table-search-1"
                            className="sr-only"
                        >
                            checkbox
                        </label>
                    </div>
                </td>
                <th
                    scope="row"
                    className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                >
                    <div className="flex items-center mr-3">
                        <img
                            src="https://flowbite.s3.amazonaws.com/blocks/application-ui/products/imac-front-image.png"
                            alt="iMac Front Image"
                            className="h-8 w-auto mr-3"
                        />
                        Apple iMac 27
                    </div>
                </th>
                <td className="px-4 py-3  ">
                    <span className="bg-primary-100   text-primary-800 text-xs font-medium px-2 py-0.5 rounded dark:bg-primary-900 dark:text-primary-300">
                        Desktop
                    </span>
                </td>
                <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    <div className="flex items-center">
                        <div className="h-4 w-4 rounded-full inline-block mr-2 bg-red-700" />
                        95
                    </div>
                </td>
                <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    <div className="flex items-center">
                        <span className="bg-green-100 mr-1  text-green-800 text-xs font-medium flex justify-center items-center  h-4 w-4   rounded-full dark:bg-green-900 dark:text-green-300">
                            $
                        </span>
                        15
                    </div>

                </td>



                <td className="px-4 py-3  "><div className=' line-clamp-1'>Standard glass, 3.8GHz 8-core 10ation 8-core 10th-generation 8-core 10th-generation 8-core 10th-generation 8-core 10th-generation 8-core 10th-generation 8-core 10th-generation Intth-generation Intth-generation Intth-generation Intel Core i7 processor, Turbo</div></td>
                <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {isHiddenEdit && <EditProduct />}
                    {isHiddenPreview && <PreviewProduct />}

                    <div className="flex items-center space-x-4">
                        <button
                            onClick={isHiddenEditFunction}
                            type="button"
                            data-drawer-target="drawer-update-product"
                            data-drawer-show="drawer-update-product"
                            aria-controls="drawer-update-product"
                            className="py-2 px-3 flex items-center text-sm font-medium text-center text-white bg-primary-700 rounded-lg hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
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

                        </button>


                        <button
                            onClick={isHiddenPreviewFunction}
                            type="button"
                            data-drawer-target="drawer-read-product-advanced"
                            data-drawer-show="drawer-read-product-advanced"
                            aria-controls="drawer-read-product-advanced"
                            className="py-2 px-3 flex items-center text-sm font-medium text-center text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                className="w-4 h-4 mr-2 -ml-0.5"
                            >
                                <path d="M12 15a3 3 0 100-6 3 3 0 000 6z" />
                                <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 010-1.113zM17.25 12a5.25 5.25 0 11-10.5 0 5.25 5.25 0 0110.5 0z"
                                />
                            </svg>
                            Preview
                        </button>

                        <button

                            type="button"
                            data-modal-target="delete-modal"
                            data-modal-toggle="delete-modal"
                            className="flex items-center text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-3 py-2 text-center dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
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

        </tbody>


    )
}

export default BodyTableProduct