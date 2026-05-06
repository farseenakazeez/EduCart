
import {
  Row,
  Col,
  ListGroup,
  Image,
  Card,
} from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { useGetOrderDetailsQuery } from "../slices/orderApiSlice";
import Loader from "../components/Loader";
import Message from "../components/Message";

const OrderScreen = () => {
  const { id: orderId } = useParams();

  const {
    data: order,
    isLoading,
    error,
  } = useGetOrderDetailsQuery(orderId);

  return isLoading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">
      {error?.data?.message || error.error}
    </Message>
  ) : (
    <div className="container mt-4">
      <h2>Order {order._id}</h2>

      <Row className="g-4">
        {/* LEFT SIDE */}
        <Col md={8}>
          <ListGroup variant="flush">

            {/* SHIPPING */}
            <ListGroup.Item className="mb-3 p-3 shadow-sm">
              <h4>Shipping</h4>
              <p><strong>Name:</strong> {order.user?.name}</p>
              <p>
                <strong>Email:</strong>{" "}
                <a href={`mailto:${order.user?.email}`}>
                  {order.user?.email}
                </a>
              </p>
              <p>
                <strong>Address:</strong>{" "}
                {order.shippingAddress.address},{" "}
                {order.shippingAddress.city},{" "}
                {order.shippingAddress.postalCode},{" "}
                {order.shippingAddress.country}
              </p>

              {order.isDelivered ? (
                <Message variant="success">Delivered</Message>
              ) : (
                <Message variant="danger">Not Delivered</Message>
              )}
            </ListGroup.Item>

            {/* PAYMENT */}
            <ListGroup.Item className="mb-3 p-3 shadow-sm">
              <h4>Payment Method</h4>
              <p><strong>Method:</strong> {order.paymentMethod}</p>

              {order.isPaid ? (
                <Message variant="success">Paid</Message>
              ) : (
                <Message variant="danger">Not Paid</Message>
              )}
            </ListGroup.Item>

            {/* ORDER ITEMS */}
            <ListGroup.Item className="mb-3 p-3 shadow-sm">
              <h4>Order Items</h4>

              {order.orderItems.length === 0 ? (
                <Message>No order items</Message>
              ) : (
                order.orderItems.map((item) => (
                  <Row key={item._id} className="align-items-center mb-2">
                    <Col md={2}>
                      <Image
                        src={item.image}
                        alt={item.name}
                        fluid
                        rounded
                      />
                    </Col>
                    <Link to = {`/product/${item.product}`}> {item.name}</Link>

                   

                    <Col md={4}>
                      {item.qty} × ${item.price} = $
                      {item.qty * item.price}
                    </Col>
                  </Row>
                ))
              )}
            </ListGroup.Item>

          </ListGroup>
        </Col>

        {/* RIGHT SIDE */}
        <Col md={4}>
          <Card className="p-3 shadow-sm">
            <h4>Order Summary</h4>

            <Row className="mb-2">
              <Col>Items</Col>
              <Col>${order.itemsPrice}</Col>
            </Row>

            <Row className="mb-2">
              <Col>Shipping</Col>
              <Col>${order.shippingPrice}</Col>
            </Row>

            <Row className="mb-2">
              <Col>Tax</Col>
              <Col>${order.taxPrice}</Col>
            </Row>

            <Row className="mb-3">
              <Col><strong>Total</strong></Col>
              <Col><strong>${order.totalPrice}</strong></Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default OrderScreen;