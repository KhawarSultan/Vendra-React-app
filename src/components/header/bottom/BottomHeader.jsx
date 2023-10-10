import { HiOutlineChevronDown } from 'react-icons/hi2';
import { CiDiscount1 } from 'react-icons/ci';
import { BiCategory } from 'react-icons/bi';
import { useNavigate } from "react-router-dom";

const BottomHeader = () => {
  const Navigate = useNavigate();
  
  return (
    <div>
      
      <main className='  items-center justify-between list-none lg:flex hidden '>
        <main className='flex justify-center items-center gap-12 bg-gray-100 cursor-pointer py-4 px-6 rounded-tr-lg  rounded-tl-lg'>
          <section className='flex justify-center items-center gap-2'>
            <BiCategory className="stroke-custom" size={24} />
            <p >All Departments</p>
          </section>
          <HiOutlineChevronDown />
        </main>
        <main>
          <li className=' flex  items-center gap-5'>
            <ul className='flex justify-center items-center gap-2 cursor-pointer bg-gray-200 rounded-full px-4 py-1'>Home </ul>
            <ul className='flex justify-center items-center gap-1 cursor-pointer'>Shop  <HiOutlineChevronDown size={12} /></ul>
            <ul className='flex justify-center items-center gap-2 cursor-pointer'>About</ul>
            <ul className='flex justify-center items-center gap-2 cursor-pointer'>Blog</ul>
            <ul className='flex justify-center items-center gap-2 cursor-pointer' onClick={() => Navigate("/contact")}>Contact</ul>
          </li>
        </main>
        <main className='flex items-center justify-center gap-3 leading-4'>
          <CiDiscount1 size={28} />
          <section>
            <span className='text-xs text-gray-500'>Only this weekend </span> <br />
            Super Discount
          </section>
          <HiOutlineChevronDown />
        </main>
      </main>


    </div>
  )
}

export default BottomHeader