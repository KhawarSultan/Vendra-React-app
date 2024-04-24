import { useState, useEffect } from 'react';
import StarsRating from './StarsRating';
import { IoClose } from 'react-icons/io5';
import { CiCirclePlus } from 'react-icons/ci';

const Modal = ({ isOpen, onClose, productid }) => {
    const [name, setName] = useState('');
    const [review, setReview] = useState('');
    const [rating, setRating] = useState(0);
    const [currentDate, setCurrentDate] = useState('')

    useEffect(() => {
        const formatDate = () => {
            const date = new Date();
            const options = { month: 'long', day: 'numeric', year: 'numeric' };
            const formattedDate = date.toLocaleDateString('en-US', options);
            setCurrentDate(formattedDate);
        };

        formatDate();
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = {
            productid: productid,
            name: name,
            review: review,
            rating: rating,
            currentDate: currentDate,
        };
        console.log(productid);

        try {
            const response = await fetch(`${window.location.origin}/api/reviews`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error('Failed to submit review');
            }

            setName('');
            setReview('');
            setRating(0);
            onClose(); // Close the form
        } catch (error) {
            console.error('Error submitting review:', error);
        }
    };

    return (
        <div className={`fixed inset-0  z-50 flex items-center  justify-center ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
            <div className="fixed inset-0   z-50 bg-black opacity-60 transition-opacity"></div>
            <div className="bg-white p-8 w-[80%] rounded-md z-50 transition-opacity">
                <div className='flex justify-end items-end'>
                    <button className=" px-4 py-3 bg-gray-100 hover:bg-gray-200  rounded-md" onClick={onClose}><IoClose size={20} /></button>
                </div>
                <p className='text-center text-3xl font-bold'>Add a Review</p>
                <div className='flex gap-10 my-3 justify-center items-center'>
                    <p>Assessment</p>
                    <StarsRating onChange={(newRating) => setRating(newRating)} />
                    <p>{rating} out of 5 stars</p>
                </div>
                <form onSubmit={handleSubmit}>
                <input type="hidden" value={productid} name="productId" /> {/* Include a hidden input field for productId */}
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">Name*</label>
                        <input
                            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="name"
                            type="text"
                            placeholder="Name"
                            value={name}
                            required
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="review">Review*</label>
                        <textarea
                            className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="review"
                            cols="30"
                            rows="10"
                            placeholder="Review"
                            value={review}
                            required
                            onChange={(e) => setReview(e.target.value)}
                        ></textarea>
                    </div>
                    <button type='submit' className="px-4 py-2 bg-blue-800 hover:bg-blue-900 font-bold  transition-all ease-in text-white rounded-md">Submit</button>
                </form>
            </div>
        </div>
    );
};


const ReviewsModal = ({ productid }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div>
            <p className=" cursor-pointer text-indigo-700 flex items-center  font-bold   bg-indigo-100 gap-2  transition-all ease-in px-4 py-2 rounded-full" onClick={handleOpenModal}>
                Add Review <CiCirclePlus strokeWidth={1.5} className=' opacity-100' size={16} />
            </p>
            
            <input type="hidden" value={productid} name="productId" /> {/* Include a hidden input field for productId */}
            <Modal productid={productid} isOpen={isModalOpen} onClose={handleCloseModal} />
        </div>
    );
};

export default ReviewsModal;
