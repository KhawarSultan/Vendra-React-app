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
// pdfMake.vfs = pdfFonts.pdfMake.vfs;

export default function Contact() {
  const [contactData, setContactData] = useState([]);

  const tableRef = useRef(null);
  const fetchContact = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/contact/all`);
      const contact = await response.json();
      setContactData(contact);
    } catch (error) {
      console.error("Error fetching Contact data:", error);
    }
  };

  useEffect(() => {
    // Fetch contact data from the server
    fetchContact();
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
      buttons: [""],
    });
  }, [contactData]);


  const logOut = () => {
    window.localStorage.clear();
    window.location.href = "/account";
  };


  function initializeDataTable() {
    if (tableRef.current) {
      if ($.fn.DataTable.isDataTable(tableRef.current)) {
        $(tableRef.current).DataTable().destroy();
      }
      $(tableRef.current).DataTable({
        // paging: true,
        searching: true,
        // ... other options
      });
    }
  }

  return (
    <div className="relative overflow-x-auto ">
      <div className="auth-inner" style={{ width: "auto" }}>
        <div className=" my-16 text-center">
          {/* <p className=" text-4xl    font-extrabold ">Contact Details</p> */}
          <p className=' font-bold   text-6xl  text-center my-12'>Contact Details</p>

          {/* <button
            onClick={logOut}
            className="font-small bg-red-500 rounded py-1 px-2"
          >
            Logout
          </button> */}
        </div>
        {Array.isArray(contactData) && contactData.length === 0 ? (
          <p>Loading Contacts...</p>
        ) : (
          <table ref={tableRef} className="w-full text-sm text-left">
            <thead>
              <tr>
                <th className="px-6 py-4">Customer ID</th>
                <th className="px-6 py-4">Customer Name</th>
                <th className="px-6 py-4">Customer Email</th>
                <th className="px-6 py-4">Subject</th>
                <th className="px-6 py-4">Message</th>
              </tr>
            </thead>
            <tbody>
              {contactData.map((contact, index) => (
                <tr
                  key={contact._id}
                  className={`${index % 2 === 0 ? "bg-gray-200" : ""
                    } border-b border-gray-300`}
                >
                  <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                    {contact._id}
                  </td>
                  <td className="px-6 py-4">{contact.name}</td>
                  <td className="px-6 py-4">{contact.email}</td>
                  <td className="px-6 py-4">{contact.subject}</td>
                  <td className="px-6 py-4">{contact.message}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
