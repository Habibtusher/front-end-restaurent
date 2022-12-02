import {
  Button,
  Card,
  Carousel,
  Col,
  Image,
  Input,
  Row,
  Spin,
  Typography,
} from "antd";
import React, { useEffect, useState } from "react";
import Footer from "../Footer/Footer";
import Sidenav from "../Layout/Sidenav";
import image1 from "../../../../image/pic1.jpg";
import image2 from "../../../../image/pic2.jpg";
import image3 from "../../../../image/pic3.jpg";
import Slider from "react-slick";
import "./Home.css";
import { getAllData } from "../../../../Api/CommonService";
import { get_all_food } from "../../../../Api/ApiConstant";
import { AiFillPlusCircle, AiOutlineMinusCircle, AiOutlinePlusCircle } from "react-icons/ai";
import StripeCheckout from "react-stripe-checkout";
import { resolveOnChange } from "antd/lib/input/Input";
import { useDispatch, useSelector } from "react-redux";
import { decrement, increment, quantityDecrement, quantityIncrement } from "../../../../redux/Cart/actions";
const { Meta } = Card;
const { Search } = Input;
const Home = ({ setShow, show }) => {
  const [allFoods, setAllFoods] = useState([]);
  const [filterCategory, setFilterCategory] = useState();
  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState({
    name: "T-shirt",
    price: 100,
    productBy: "yellow",
  });
  const cartItem = useSelector((state) => state.cart);
  // const cart = useSelector((state) => state.conter.value);
  const dispatch = useDispatch();

  console.log(cartItem);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const onChange = (currentSlide) => {
    console.log(currentSlide);
  };

  const onSearch = async (e) => {
    console.log(e);
    setLoading(true);
    const searchValue = {
      name: e,
    };
    const { data } = await getAllData(get_all_food, searchValue);
    setAllFoods(data.data);
    setLoading(false);
  };
  const getAllFood = async () => {
    setLoading(true);

    const { data } = await getAllData(get_all_food, {
      category: filterCategory ? filterCategory : "",
    });
    setAllFoods(data.data);
    setLoading(false);
  };

  useEffect(() => {
    getAllFood();
  }, [filterCategory]);

  const handleAddToCart = (item) => {
    const cartItemCheck = cartItem.Carts?.find((e) => e._id === item._id);
    if (cartItemCheck) {
      dispatch(quantityIncrement(item));
    } else {
      dispatch(increment(item));
    }
  };
  const decrementCartItem=(item)=>{
    dispatch(quantityDecrement(item));
    // const cartItemCheck = cartItem.Carts.find((e) => e._id === item._id);
    // if(cartItemCheck.quantity > 1){
    //   dispatch(quantityDecrement(item));
    // }
    // else{
    //   dispatch(decrement(item))
    // }
  }
  const incrementCartItem=(item)=>{
    dispatch(quantityIncrement(item));
  }
  return (
    <div>
      <div className="carusel">
        <div className="search-bar">
          <div className="search-container">
            <Search
              className="search"
              placeholder="input search text"
              allowClear
              enterButton="Search"
              size="large"
              onSearch={onSearch}
            />
          </div>
        </div>
        <div className="image1"></div>
        {/* <div style={{maxWidth:"100%"}}>
          <Slider {...settings}>
            <div className="image1">
         
                
         
            </div>
            <div className="image2">
         
              
            
            </div>
            <div className="image3">
          
              
        
            </div>
          </Slider>
        </div> */}
      </div>

      <Typography
        className="mt-3 mb-3"
        style={{ fontSize: "20px", textAlign: "center" }}
      >
        Foods
      </Typography>
      <Spin spinning={loading} tip="Loading...">
        <Row className="mt-2">
          <Col sm={0} lg={3}>
            <Sidenav
              setFilterCategory={setFilterCategory}
              setShow={setShow}
              show={show}
            />
          </Col>
          <Col className="food-item pb-3" sm={23} lg={20}>
            <Row gutter={[10, 10]}>
              {allFoods.length ? (
                <>
                  {allFoods?.map((e) => (
                    <Col sm={12} md={8} lg={6} xxl={4}>
                      <Card

                        className="card-style"
                        hoverable
                        style={{
                          width: 240,
                          
                        }}
                        cover={
                          <div style={{ height: "180px", paddingTop: "10px" }}>
                            <img
                              style={{
                                height: "100%",
                                width: "100%",
                                objectFit: "contain",
                                objectPosition: "center",
                                padding: "2px",
                              }}
                              alt="example"
                              src={e.image}
                            />
                          </div>
                        }
                      >
                        <div className="text-center">
                          <Typography style={{ height: "40px" }}>
                            {e.name} ৳{e.price}
                          </Typography>
                          {cartItem.Carts?.find((item) => item._id === e._id) ? (
                            <div className="text-center incre-decre">
                              <div className="d-flex align-items-center justify-content-around incre-decre-div">
                               <AiOutlineMinusCircle  onClick={() => decrementCartItem(e)} className="minus" />
                              {cartItem.Carts?.find((item) => item._id === e._id).quantity}
                              <AiOutlinePlusCircle onClick={() => incrementCartItem(e)} className="plus" />
                              </div>
                            </div>
                          ) : (
                            <Button
                              onClick={() => handleAddToCart(e)}
                              className="mt-2"
                            >
                              <AiOutlinePlusCircle
                                style={{
                                  marginRight: "10px",
                                  marginTop: "-5px",
                                }}
                              />{" "}
                              Add to cart
                            </Button>
                          )}
                        </div>
                      </Card>
                    </Col>
                  ))}
                </>
              ) : (
                <Col className=" no-item-text ">
                  {/* <Image
                    className="img"
                    preview={false}
                    src="https://i.pinimg.com/originals/e2/78/13/e27813e577548baadaa53ad737b6a5cd.gif"
                  /> */}
                  <Typography className="text">No Item Available</Typography>
                </Col>
              )}
            </Row>
          </Col>
        </Row>
      </Spin>
    </div>
  );
};

export default Home;
