import React, { useEffect, useState, useRef } from "react";
import { MdOutlineDeleteSweep } from "react-icons/md";
import { BiEditAlt } from "react-icons/bi";
import Swal from "sweetalert2";
import "datatables.net-dt";
import "datatables.net-dt/css/jquery.dataTables.css";
import $ from "jquery";
import jszip from "jszip";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";
import 'datatables.net-buttons-dt/css/buttons.dataTables.css';
import 'datatables.net-buttons/js/dataTables.buttons.min.js';
import 'datatables.net-buttons/js/buttons.html5.min.js';
import 'datatables.net-buttons/js/buttons.print.min.js';
import 'datatables.net-buttons/js/buttons.colVis.min.js'; // For Excel button
 // For PDF butto
pdfMake.vfs = pdfFonts.pdfMake.vfs;

export default function Rightbar({ userData }) {
  //setting state
  const [data, setData] = useState([]);
  const tableRef = useRef(null);

  // Initialize data tables in the useEffect hook

  //   //fetching all user
  //   const getAllUser = () => {

  //   };

  const getAllUser = () => {
    fetch("http://localhost:5000/getAllUser", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "userData");
        setData(data.data);
      });
  };

  // Fetch data
  useEffect(() => {
    fetch("http://localhost:5000/getAllUser", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((response) => {
        console.log(response, "userData");

        // Assuming your API response contains an 'Objectdata' property
        const userArray = response.data || [];
        console.log("userArray:", userArray);

        setData(userArray); // Set the data to the array of users

        // Initialize DataTable when data is available
        initializeDataTable();
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);
  useEffect(() => {
    if (!tableRef.current) return;

    // Destroy DataTable if already initialized
    if ($.fn.DataTable.isDataTable(tableRef.current)) {
      $(tableRef.current).DataTable().destroy();
    }

    // Initialize DataTable
    $(tableRef.current).DataTable({
      paging: true,
      searching: true,
      dom: "lBfrtip", // Add 'B' to enable buttons
      buttons: [
        "copy",
        "excel",
        "pdf",
        "print", // Specify which buttons to display
      ],
      
      // Other DataTable options
    });
  }, [data]);

  // Initialize DataTable when data changes

  //deleting user
  const deleteUser = (id, name) => {
    console.log("Button CLicked");

    if (window.confirm(`Are you sure you want to delete ${name}`)) {
      console.log("Entering");
      fetch("http://localhost:5000/deleteUser", {
        method: "POST",
        crossDomain: true,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          userid: id,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          Swal.fire("Successfully Deleted ", "success");
          getAllUser();
        });
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
        footer: '<a href="">Why do I have this issue?</a>',
      });
    }
  };

  const logOut = () => {
    window.localStorage.clear();
    
    window.location.href = "/account";
  };
  return (
    <div className="relative overflow-x-auto bg-gray-100 rounded-2xl p-8">
      <div className="auth-inner" style={{ width: "auto" }}> 
        <p className="my-4 text-2xl font-extrabold ml-1"> Registered Users <span><button onClick={logOut} className="font-small bg-green-500 rounded py-1 px-2"  >Logout</button></span> </p>
       <button></button>
        {data.length === 0 ? (
          <p>No data available in table</p>
        ) : (
          <table ref={tableRef} className="w-full text-sm text-left">
            <thead>
              <tr>
                <th className="px-6 py-4">ID</th>
                <th className="px-6 py-4">USERNAME</th>
                <th className="px-6 py-4">EMAIL</th>
                <th className="px-6 py-4">PASSWORD</th>
                <th scope="col" className="px-6 py-3">
                  ACTION
                </th>
              </tr>
            </thead>
            <tfoot>
              <tr>
                <th className="px-6 py-4">id</th>
                <th className="px-6 py-4">username</th>
                <th className="px-6 py-4">email</th>
                <th className="px-6 py-4">password</th>
                <th scope="col" className="px-6 py-3">
                  ACTION
                </th>
              
              </tr>
            </tfoot>
            <tbody>
              {data.map((i, index) => (
                <tr
                  key={i._id}
                  className={index % 2 === 0 ? "bg-gray-200" : ""}
                >
                  <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                    {i._id}
                  </td>
                  <td className="px-6 py-4">{i.username}</td>
                  <td className="px-6 py-4">{i.email}</td>
                  <td className="px-6 py-4">{i.password}</td>
                  <td className="text-white flex px-6 py-3 gap-2">
                    <button
                      href="#"
                      className="font-medium bg-blue-500 rounded py-1 px-3"
                      onClick={() => console.log(`Edit user with ID ${i._id}`)}
                    >
                      <span className="flex justify-between items-center gap-2">
                        {" "}
                        <BiEditAlt size={16} /> Edit
                      </span>
                    </button>
                    <button
                      href="#"
                      className="font-medium bg-red-500 rounded py-1 px-3"
                      onClick={() => deleteUser(i._id, i.username)}
                    >
                      <span className="flex justify-between items-center gap-1">
                        {" "}
                        <MdOutlineDeleteSweep size={18} /> Delete
                      </span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
