import React from "react";
import { useCart, useDispatchCart } from '../components/ContextReducer';
import "./MyCart.css";
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

const stripePromise = loadStripe('pk_test_51PJ716SGbvgP0eTKnkFIdrXauIfP1WB9dUkBhe7OaVYRRsVPjmDH3QJVOSQiytIsXaAKeRyeQNBiFThfyr0E75GR00kKDD3tHL');

const CheckoutForm = ({ orderData, handleBuy }) => {
    const stripe = useStripe();
    const elements = useElements();

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log('Form submitted');

        if (!stripe || !elements) {
            console.error('Stripe or elements not loaded');
            return;
        }

        const cardElement = elements.getElement(CardElement);

        let userEmail = localStorage.getItem("userEmailID");

        try {
            const response = await fetch("http://localhost:5000/api/create-payment-intent", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    order_data: orderData,
                    email: userEmail,
                    order_date: new Date().toDateString()
                })
            });

            const { clientSecret } = await response.json();
            console.log('Client secret received:', clientSecret);

            const result = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: cardElement,
                    billing_details: {
                        email: userEmail,
                    },
                },
            });

            if (result.error) {
                console.error('Payment error:', result.error.message);
            } else {
                if (result.paymentIntent.status === 'succeeded') {
                    console.log('Payment successful!');
                    handleBuy();
                }
            }
        } catch (error) {
            console.error('Error during payment:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <CardElement />
            <button type="submit" disabled={!stripe}>Pay</button>
        </form>
    );
};

const MyCart = () => {
    let data = useCart();
    let dispatch = useDispatchCart();

    const handleRemoveFromCart = (id, size) => {
        try {
            dispatch({ type: "REMOVE", id, size });
        } catch (error) {
            console.error("Error removing item from cart:", error.message);
        }
    };

    const handleBuy = async () => {
        let userEmail = localStorage.getItem("userEmailID");
        let response = await fetch("http://localhost:5000/api/orderData", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                order_data: data,
                email: userEmail,
                order_date: new Date().toDateString()
            })
        });
        if (response.ok) {
            dispatch({ type: "DROP" });
        } else {
            console.error('Failed to place order');
        }
    };

    if (data.length === 0) {
        return (
            <div className="container">
                <div className="text-center mt-5">
                    <h1>My Cart is empty</h1>
                </div>
            </div>
        );
    }

    let totalPrice = data.reduce((total, item) => total + item.price, 0);

    return (
        <div className="my-cart">
            <h2>My Cart</h2>
            <div className="cart-items">
                {data.map((item, index) => (
                    <div key={index} className="cart-item card">
                        <img src={item.img} alt={item.name} className="card-img-top" />
                        <div className="card-body">
                            <h5 className="card-title">{item.name}</h5>
                            <p className="card-text">Size: {item.size}</p>
                            <p className="card-text">Quantity: {item.quantity}</p>
                            <p className="card-text">Total Price: ₹{item.price}</p>
                            <button className="btn btn-danger" onClick={() => handleRemoveFromCart(item.id, item.size)}>Remove from Cart</button>
                        </div>
                    </div>
                ))}
            </div>
            <h5>Total Price: ₹{totalPrice} Rupees Only</h5>
            <hr />
            <Elements stripe={stripePromise}>
                <CheckoutForm orderData={data} handleBuy={handleBuy} />
            </Elements>
        </div>
    );
};

export default MyCart;

