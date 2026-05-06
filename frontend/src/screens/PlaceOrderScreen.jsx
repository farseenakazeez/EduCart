import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, ListGroup, Image, Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import FormContainer from "../components/FormContainer";
import CheckoutSteps from "../components/CheckoutSteps";
import Message from "../components/Message";
import { Container } from "react-bootstrap"
import { useCreateOrderMutation } from "../slices/orderApiSlice";
import { clearCartItems } from "../slices/cartSlice";
import Loader from "../components/Loader";

const PlaceOrderScreen = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const cart = useSelector((state) => state.cart);

    const [createOrder, { isLoading, error }] = useCreateOrderMutation();

    // 🔢 Calculate prices
    const addDecimals = (num) => {
        return (Math.round(num * 100) / 100).toFixed(2);
    };

    const itemsPrice = addDecimals(
        cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
    );

    const shippingPrice = addDecimals(cart.itemsPrice > 100 ? 0 : 100);

    const taxPrice = addDecimals(Number(0.15 * cart.itemsPrice));

    const totalPrice = (
        Number(itemsPrice) +
        Number(shippingPrice) +
        Number(taxPrice)
    ).toFixed(2);

    // 🟢 Place order handler
    const placeOrderHandler = async () => {
        try {
            const res = await createOrder({
                orderItems: cart.cartItems.map((item) => ({
                    name: item.name,
                    qty: item.qty,
                    image: item.image,
                    price: item.price,
                    product: item._id,
                })),
                shippingAddress: cart.shippingAddress,
                paymentMethod: cart.paymentMethod,
                itemsPrice,
                shippingPrice,
                taxPrice,
                totalPrice,
            }).unwrap();

            dispatch(clearCartItems()); // clear cart after order
            navigate(`/order/${res._id}`);
        } catch (err) {
            alert(err?.data?.message || err.message);
            console.log(err);
        }
    };



    return (
        <Container className="mt-4">
            <CheckoutSteps step1 step2 step3 step4 />

            <Row className="g-4">
                {/* LEFT SIDE */}
                <Col md={8}>
                    <ListGroup variant="flush">

                        <ListGroup.Item className="mb-3 p-3 shadow-sm">
                            <h4>Shipping</h4>
                            <p>
                                {cart.shippingAddress.address}, {cart.shippingAddress.city},{" "}
                                {cart.shippingAddress.postalCode},{" "}
                                {cart.shippingAddress.country}
                            </p>
                        </ListGroup.Item>

                        <ListGroup.Item className="mb-3 p-3 shadow-sm">
                            <h4>Payment Method</h4>
                            <p>{cart.paymentMethod}</p>
                        </ListGroup.Item>

                        <ListGroup.Item className="mb-3 p-3 shadow-sm">
                            <h4>Order Items</h4>

                            {cart.cartItems.map((item) => (
                                <Row key={item._id} className="align-items-center mb-2">
                                    <Col md={2}>
                                        <Image src={item.image} alt={item.name} fluid rounded />

                                    </Col>


                                    <Col>{item.name}</Col>

                                    <Col md={4}>
                                        {item.qty} × ${item.price} = ${item.qty * item.price}
                                    </Col>
                                </Row>
                            ))}
                        </ListGroup.Item>

                    </ListGroup>
                </Col>

                {/* RIGHT SIDE */}
                <Col md={4}>
                    <Card className="p-3 shadow-sm">
                        <h4>Order Summary</h4>

                        <Row className="mb-2">
                            <Col>Items</Col>
                            <Col>${itemsPrice}</Col>
                        </Row>

                        <Row className="mb-2">
                            <Col>Shipping</Col>
                            <Col>${shippingPrice}</Col>
                        </Row>

                        <Row className="mb-2">
                            <Col>Tax</Col>
                            <Col>${taxPrice}</Col>
                        </Row>

                        <Row className="mb-3">
                            <Col><strong>Total</strong></Col>
                            <Col><strong>${totalPrice}</strong></Col>
                        </Row>
                        <Row className="mb-3">
                            {error && (<Message variant="danger">{error?.data?.message || error.error}
                            </Message>
                            )}
                        </Row>

                        <Button
                            className="w-100"
                            disabled={cart.cartItems.length === 0}
                            onClick={placeOrderHandler}
                        >
                            Place Order
                        </Button>
                        {isLoading && <Loader />}
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default PlaceOrderScreen;