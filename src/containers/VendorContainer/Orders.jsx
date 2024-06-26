/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useEffect, useState, useRef } from "react";
import { BiEditAlt } from "react-icons/bi";
import Swal from "sweetalert2";
import "datatables.net-dt";
import "datatables.net-dt/css/jquery.dataTables.css";
import $ from "jquery";
// import pdfMake from "pdfmake/build/pdfmake";
// import pdfFonts from "pdfmake/build/vfs_fonts";
import "datatables.net-buttons-dt/css/buttons.dataTables.css";
import "datatables.net-buttons/js/dataTables.buttons.min.js";
import "datatables.net-buttons/js/buttons.html5.min.js";
import "datatables.net-buttons/js/buttons.print.min.js";
import "datatables.net-buttons/js/buttons.colVis.min.js";
import { BiTrash } from "react-icons/bi";
import OrderDetailsContainer from './OrderDetailsContainer';
// pdfMake.vfs = pdfFonts.pdfMake.vfs;
import { GrView } from "react-icons/gr";

export default function Order() {
  const [orderData, setOrderData] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isOrderDetailsContainer, setOrderDetailsContainer] = useState(false);
  const tableRef = useRef(null);
  const fetchOrderDetails = async (orderId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/orders/${orderId}`);
      if (!response.ok) {
        throw new Error(`Error fetching order details: ${response.statusText}`);
      }
      const orderJson = await response.text();
      console.log("Order details response:", orderJson); // Add this line
      const order = JSON.parse(orderJson);
      return order;
    } catch (error) {
      console.error(error);
      // Handle error as needed
    }
  };

  useEffect(() => {
    // Fetch order data from the server
    fetchOrders();
  }, []);

  useEffect(() => {
    if (!tableRef.current) return;

    if ($.fn.DataTable.isDataTable(tableRef.current)) {
      $(tableRef.current).DataTable().destroy();
    }

    $(tableRef.current).DataTable({
      paging: true,
      searching: true,
      dom: "lBfrtip",
      buttons: ["print"],
    });
  }, [orderData]);

  const fetchOrders = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/orders`);
      const orders = await response.json();
      setOrderData(orders);
    } catch (error) {
      console.error("Error fetching order data:", error);
    }
  };

  const logOut = () => {
    window.localStorage.clear();
    window.location.href = "/account";
  };
  const handleDeleteOrder = (orderId) => {
    // Send a DELETE request to the server
    fetch(`http://localhost:5000/api/orders/${orderId}`, {
      method: 'DELETE',
    })
      .then((res) => res.json())
      .then((data) => {
        // Update the state to reflect the deleted order
        setOrderData(orderData.filter((order) => order._id !== orderId));
        alert('Order deleted successfully:');
        console.log('Order deleted successfully:', data);

      })
      .catch((error) => {
        console.error('Error deleting order:', error);
      });
  };
  const handleViewClick = (orderId) => {
    console.log("View button clicked for order ID:", orderId);
    fetchOrderDetails(orderId)
      .then((orderDetails) => {
        console.log('Order Details:', orderDetails);
        if (orderDetails) {
          setSelectedOrder(orderDetails);
        } else {
          console.error("Order details not available");
          // Handle as needed, e.g., show an error message
        }
      })
      .catch((error) => {
        console.error('Error fetching order details:', error);
      });
  };
  const handleCloseOrderDetails = () => {
    setSelectedOrder(null);
  };

  function initializeDataTable() {
    if (tableRef.current) {
      if ($.fn.DataTable.isDataTable(tableRef.current)) {
        $(tableRef.current).DataTable().destroy();
      }
      $(tableRef.current).DataTable({
        paging: true,
        searching: true,
        // ... other options
      });
    }
  }

  return (
    <div className="relative overflow-x-auto ">
      <div className="auth-inner" style={{ width: "auto" }}>
        <div className=" my-16 text-center">
          {/* <p className=" text-4xl    font-extrabold ">Order Details</p> */}
          <p className=' font-bold   text-6xl  text-center my-12'>Order Details</p>

          {/* <button
            onClick={logOut}
            className="font-small bg-red-500 rounded-full py-1 px-2"
          >
            Logout
          </button> */}
        </div>
        {Array.isArray(orderData) && orderData.length === 0 ? (
          <p>Loading Orders ....</p>
        ) : (
          <table ref={tableRef} className="w-full text-sm text-left">
            <thead>
              <tr>
                <th className="px-6 py-4">Order ID</th>
                <th className="px-6 py-4">Total Cost</th>
                <th className="px-6 py-4">Payment Method</th>
                <th className="px-6 py-4">Product Names</th>
                <th className="px-6 py-4">Status</th>
                <th scope="col" className="px-6 py-3">
                  ACTION
                </th>
              </tr>
            </thead>
            <tbody>
              {orderData.map((order, index) => (
                <tr
                  key={order._id}
                  className={`${index % 2 === 0 ? "bg-gray-200" : ""
                    } border-b border-gray-300`}
                >
                  <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                    {order._id}
                  </td>
                  <td className="px-6 py-4">${order.totalCost}</td>
                  <td className="px-6 py-4">{order.paymentMethod}</td>
                  <td className="px-6 py-4">
                    {order.products.map((product) => product.name).join(", ")}
                  </td>
                  <td className="px-6 py-4">{order.status}</td>
                  <td className=" flex px-6 py-3 gap-2">
                    <button
                      href="#"
                      className="font-medium  rounded-full "
                      onClick={() => handleViewClick(order._id)}

                    >
                      <span className="flex justify-between items-center gap-2  p-3 bg-blue-200 rounded-md">
                        {/* {" "} */}
                        <GrView size={16} />
                      </span>
                    </button>
                    <button
                      href="#"
                      className="   hover:underline"
                      onClick={() => handleDeleteOrder(order._id)} // Assuming you have a function to handle delete
                    >
                      <span className="flex justify-between items-center gap-1 p-3 bg-red-200 rounded-md">
                        <BiTrash size={16} />
                      </span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      {selectedOrder && (
        <OrderDetailsContainer
          orderDetails={selectedOrder}
          onClose={handleCloseOrderDetails}
        />
      )}
    </div>
  );
}
