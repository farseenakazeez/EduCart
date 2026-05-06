import React, { useState, useEffect } from "react";
import { Form, Button, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import FormContainer from "../components/FormContainer";
import CheckoutSteps from "../components/CheckoutSteps";
import { savePaymentMethod } from "../slices/cartSlice";

const PaymentScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const [paymentMethod, setPaymentMethod] = useState("PayPal");

  // 🔴 VERY IMPORTANT: protect route
  useEffect(() => {
    if (!shippingAddress?.address) {
      navigate("/shipping");
    }
  }, [shippingAddress, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();

    dispatch(savePaymentMethod(paymentMethod));

    navigate("/placeorder");
  };

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 step3 />

      <h1>Payment Method</h1>

      <Form onSubmit={submitHandler}>
        <Form.Group>
          <Form.Label as="legend">Select Method</Form.Label>

          <Col>
            <Form.Check
              type="radio"
              label="PayPal or Credit Card"
              id="PayPal"
              name="paymentMethod"
              value="PayPal"
              checked={paymentMethod === "PayPal"}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="my-2"
            />

            {/* Optional second method */}
            <Form.Check
              type="radio"
              label="Cash on Delivery"
              id="COD"
              name="paymentMethod"
              value="COD"
              checked={paymentMethod === "COD"}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="my-2"
            />
          </Col>
        </Form.Group>

        <Button type="submit" variant="primary" className="mt-3">
          Continue
        </Button>
      </Form>
    </FormContainer>
  );
};

export default PaymentScreen;