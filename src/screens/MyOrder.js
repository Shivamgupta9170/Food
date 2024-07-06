import React, { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

export default function MyOrder() {
  const [orderData, setOrderData] = useState([]);

  useEffect(() => {
    fetchMyOrder();
  }, []);

  const fetchMyOrder = async () => {
    try {
      const userEmail = localStorage.getItem("userEmailID");
      const response = await fetch("http://localhost:5000/api/myOrderData", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: userEmail }),
      });
      if (response.ok) {
        const data = await response.json();
        setOrderData(
          Array.isArray(data.orderData) ? data.orderData : [data.orderData]
        );
      } else {
        console.error("Failed to fetch order data");
      }
    } catch (error) {
      console.error("Error fetching order data:", error.message);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="container">
        {orderData.length > 0 ? (
          orderData.map((order, orderIndex) => (
            <div key={orderIndex} className="mb-5">
              {order.order_data.map((itemArray, index) => (
                <div key={index}>
                  <h4>
                    Order Date:{" "}
                    {new Date(itemArray[0].Order_date).toLocaleDateString()}
                  </h4>
                  <p>Status: {order.status}</p>
                  <table className="table table-bordered">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Price (₹)</th>
                        <th>Quantity</th>
                        <th>Size</th>
                      </tr>
                    </thead>
                    <tbody>
                      {itemArray.slice(1).map((item, j) => (
                        <tr key={j}>
                          <td>{item.name}</td>
                          <td>{item.price}</td>
                          <td>{item.quantity}</td>
                          <td>{item.size}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ))}
            </div>
          ))
        ) : (
          <p>No orders found.</p>
        )}
      </div>
      <Footer />
    </div>
  );
}
