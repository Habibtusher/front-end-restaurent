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
const { Meta } = Card;
const { Search } = Input;
const Home = ({ setShow, show }) => {
  const [allFoods, setAllFoods] = useState([]);
  const [filterCategory, setFilterCategory] = useState();
  const [loading, setLoading] = useState(false);
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  const burger = [
    {
      id: 1,
      name: "Chicken Regular",
      price: 70,
      image:
        "https://s3-ap-southeast-1.amazonaws.com/sb-singleserver-prod-bucket/7716b2a6dc519006aec3264cbc050f82/o_1501478548.jpg",
    },
    {
      id: 2,
      name: "Tandoori Chicken Burger",
      price: 120,
      image: "https://img.rasset.ie/0015cf21-800.jpg",
    },
    {
      id: 3,
      name: "Crispy Chicken Burger",
      price: 100,
      image:
        "https://www.dontgobaconmyheart.co.uk/wp-content/uploads/2020/04/crispy-chicken-burger-744x897.jpg",
    },
    {
      id: 4,
      name: "Beef Burger",
      price: 150,
      image:
        "https://static.onecms.io/wp-content/uploads/sites/52/2020/05/17/jamaican-beef-patty-burger-f79e5df1b-1.jpg",
    },
    ,
    {
      id: 5,
      name: "Tandoori Chicken Burger",
      price: 120,
      image: "https://img.rasset.ie/0015cf21-800.jpg",
    },
    {
      id: 5,
      name: "Tandoori Chicken Burger",
      price: 120,
      image: "https://img.rasset.ie/0015cf21-800.jpg",
    },
    {
      id: 5,
      name: "Tandoori Chicken Burger",
      price: 120,
      image: "https://img.rasset.ie/0015cf21-800.jpg",
    },
  ];
  const onChange = (currentSlide) => {
    console.log(currentSlide);
  };
  console.log("object", filterCategory);
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
          <Col className="food-item" sm={23} lg={20}>
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
                          <img
                            style={{ height: "170px" }}
                            alt="example"
                            src={e.image}
                          />
                        }
                      >
                        <div className="text-center">
                          <Typography>
                            {e.name} ৳{e.price}
                          </Typography>
                          <Button className="mt-2">Add to Cart</Button>
                        </div>
                      </Card>
                    </Col>
                  ))}
                </>
              ) : (
                <Col className=" no-item-text ">
                  <Image className="img" preview={false} src="https://i.pinimg.com/originals/e2/78/13/e27813e577548baadaa53ad737b6a5cd.gif"/>
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
