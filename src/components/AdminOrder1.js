import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';

export default function AdminOrder1() {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        fetchAllOrders();
    }, []);

    const fetchAllOrders = async () => {
        try {
        //     const response = await fetch("http://localhost:5000/api/adminOrders", {
        //         method: 'POST', // Ensure the method matches your backend route
        //         headers: {
        //             'Content-Type': 'application/json'
        //         }
        //     });
        //     if (response.ok) {
        //         const data = await response.json();
        //         setOrders(data.orders);
        //     } else {
        //         console.error('Failed to fetch orders');
        //     }
        // } catch (error) {
        //     console.error('Error fetching order data:', error.message);
        // }
        const response = await fetch("http://localhost:5000/api/adminOrders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        const data = await response.json();
        setOrders(
          Array.isArray(data.orders) ? data.orders : [data.orders]
        );
      } else {
        console.error("Failed to fetch order data");
      }
    } catch (error) {
      console.error("Error fetching order data:", error.message);
    }
    };

//     const response = await fetch("http://localhost:5000/api/myOrderData", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ email: userEmail }),
//       });
//       if (response.ok) {
//         const data = await response.json();
//         setOrderData(
//           Array.isArray(data.orderData) ? data.orderData : [data.orderData]
//         );
//       } else {
//         console.error("Failed to fetch order data");
//       }
//     } catch (error) {
//       console.error("Error fetching order data:", error.message);
//     }
//   };
    const updateOrderStatus = async (email, orderId, status) => {
        try {
            const response = await fetch("http://localhost:5000/api/updateStatus", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, orderId, status })
            });
            if (response.ok) {
                fetchAllOrders();
            } else {
                console.error('Failed to update status');
            }
        } catch (error) {
            console.error('Error updating status:', error.message);
        }
    };

    return (
        <div>
            <Navbar />
            <div className='container'>
                {orders.length > 0 ? (
                    orders.map((order, orderIndex) => (
                        <div key={orderIndex} className="mb-5">
                            <h4>Email: {order.email}</h4>
                            <h4>Order Date: {new Date(order.order_date).toLocaleDateString()}</h4>
                            {order.order_data.map((itemArray, index) => (
                                <div key={index}>
                                    <p>Status: {itemArray.status}</p>
                                    <select
                                        value={itemArray.status}
                                        onChange={(e) => updateOrderStatus(order.email, itemArray._id, e.target.value)}
                                    >
                                        <option value="Pending">Pending</option>
                                        <option value="Delivered">Delivered</option>
                                        <option value="Canceled">Canceled</option>
                                    </select>
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
        </div>
    );
}


