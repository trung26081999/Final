import React, { useEffect, useState } from "react";
import "./Products.css";
import { LoadingOutlined } from "@ant-design/icons";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  addProductAction,
  deleteProductAction,
  fetchProductActionAdmin,
  searchProductActionAdmin,
} from "../../../../stores/slices/admin.product.slice";
import { notification, Button, Drawer } from "antd";
import { v4 } from "uuid";
import { BsSearch } from "react-icons/bs";
import { RiArrowDropUpLine } from "react-icons/ri";
import NavAdmin from "../../../../components/layouts/NabarAdmin-Layout/components/NabarAdmin";

const tabs = ["all", "kidsclothing","kidshoes", "womenshoes","womensclothing", "mensclothing","menshoes"];
function Products() {
  const [addProduct, setAddProduct] = useState(false);
  const [showDetail, setShowDetail] = useState(false);
  const [selectImg, setSelectImg] = useState(null);
  const [type, setType] = useState("all");
  const [detailItem, setDetailItem] = useState(null);
  const [searchValue, setSearchValue] = useState("");
  const [newTodoValue, setNewTodoValue] = useState({
    productName: "",
    type: "",
    price: "",
    image: "",
    description: "",
  });
  const listProduct = useSelector((state) => state.adminProduct.productState);
  console.log(
    "🚀 ~ file: Products.jsx ~ line 32 ~ Products ~ listProduct",
    listProduct.data.length
  );
  const total = listProduct.pagination.total;
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  const loading = listProduct.loading;

  const [scrollPosition, setScrollPosition] = useState(0);
  const handleScroll = () => {
    const position = window.pageYOffset;
    setScrollPosition(position);
  };

  useEffect(() => {
    dispatch(fetchProductActionAdmin());
  }, [dispatch, total]);
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  const navigate = useNavigate();
  const gotoDetail = (item) => {
    navigate(`/admin/edit/${item.id}`, { state: { ...item } });
    setDetailItem({});
  };
  // handle product detail
  const handleDetailItem = (product) => {
    setDetailItem(product);
    setShowDetail(true);
  };

  const handleDeleteDetailItem = () => {
    setShowDetail(!showDetail);
  };

  const handleDeleteProduct = () => {
    dispatch(deleteProductAction(detailItem.id));
    setShowDetail(!showDetail);
    notification.success({ message: `Đã xóa ${detailItem.productName}` });
  };

  // handle add product
  // handle change value
  const handleOnchange = (e) => {
    const value = e.target.value;
    setNewTodoValue({ ...newTodoValue, [e.target.name]: value });
  };

  //delete old url image and create new url image
  // useEffect(() => {
  //     return () => {
  //         selectImg && URL.revokeObjectURL(selectImg.urlImage)
  //         console.log('test')
  //     }
  // },[selectImg])

  // handle onchange file image
  const handleOnchangeFile = (e) => {
    const file = e.target.files[0];
    // file.urlImage = URL.createObjectURL(file);
    function getBase64(file, onLoadCallback) {
      return new Promise(function (resolve, reject) {
        var reader = new FileReader();
        reader.onload = function () {
          resolve(reader.result);
        };
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });
    }

    var promise = getBase64(file);
    promise.then(function (result) {
      setSelectImg(result);
    });
    console.log(selectImg);
  };
  // handle submit the task of adding products
  const addTodoProduct = (container) => {
    if (
      container.productName === "" ||
      container.type === "" ||
      container.price === "" ||
      container.description === "" ||
      container.image === ""
    )
      return;
    const newTodoList = {
      id: v4(),
      productName: container.productName,
      type: container.type,
      price: container.price,
      image: container.image,
      description: container.description,
    };
    dispatch(addProductAction(newTodoList));
  };
  const hanldeSubmitTodoValue = () => {
    addTodoProduct({ ...newTodoValue, image: selectImg });
    notification.success({
      message: `Thêm thành công ${newTodoValue.productName}`,
    });
    setNewTodoValue({
      productName: "",
      type: "",
      price: "",
      image: "",
      description: "",
    });
    setSelectImg("");
  };
  const handleSearchChange = (keyword) => {
    const values = keyword.target.value;
    setSearchValue(keyword.target.value);
    dispatch(searchProductActionAdmin(values));
  };

  // const toggleDetail = () => setDetailProduct(!detailProduct);
  const toggle = () => setAddProduct(!addProduct);

  const onTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    <div className="products">
      <NavAdmin />
      <div className="product">
        <div className="tille-product">
          {/* <FontAwesomeIcon icon="fa-brands fa-twitter" /> */}
          {/* <FontAwesomeIcon icon="fa-solid fa-check-square" /> */}
          <h3 onClick={toggle} className="name-title">
            <span>Add Products</span>
          </h3>
          {tabs.map((item) => (
            <button
              className={`${type === item ? "title-active" : "name-title"}`}
              key={item}
              style={
                type === item
                  ? {
                      borderBottom: "1px solid rgb(236, 109, 4)",
                      color: "rgb(236, 109, 4)",
                      fontWeight: "500",
                    }
                  : { fontWeight: "500" }
              }
              onClick={() => setType(item)}
            >
              {item.charAt(0).toUpperCase() + item.slice(1)}
            </button>
          ))}
          <>
            <Button
              style={{
                fontSize: "28px",
                background: "none",
                border: "none",
                color: "black",
                marginTop: "-7px",
              }}
              type="primary"
              onClick={showDrawer}
            >
              <BsSearch className="title-search" />
            </Button>
            <Drawer
              title="Search Products"
              placement="right"
              onClose={onClose}
              visible={visible}
            >
              <input
                type="Search"
                onChange={handleSearchChange}
                placeholder="Nhập tên sản phẩm"
                className="search__input"
              />
              {searchValue &&
                (listProduct?.search ?? []).map?.((item, index) => {
                  return (
                    <div
                      onClick={() => handleDetailItem(item)}
                      key={index}
                      className="product__listing"
                    >
                      <img src={item.image} alt="" />
                      <p>{item.productName}</p>
                      <span>{item.price}.000đ</span>
                    </div>
                  );
                })}
            </Drawer>
          </>
        </div>
        {addProduct && (
          <div className="add-product-item">
            <div className="add-products">
              <h2>
                {" "}
                Add Products{" "}
                <span className="close-add" onClick={toggle}>
                  X
                </span>
              </h2>
              <p className="label-input">
                <label>Product Name:</label>
                <input
                  className="input-product"
                  type="text"
                  name="productName"
                  value={newTodoValue.productName}
                  onChange={handleOnchange}
                  placeholder="Title"
                />
              </p>
              <p className="label-input">
                <label>Type:</label>
                <input
                  className="input-product"
                  type="text"
                  name="type"
                  value={newTodoValue.type}
                  onChange={handleOnchange}
                  placeholder="Type"
                />
              </p>
              <p className="label-input">
                <label>Price:</label>
                <input
                  className="input-product"
                  type="text"
                  name="price"
                  value={newTodoValue.price}
                  onChange={handleOnchange}
                  placeholder="Price"
                />
              </p>
              <p className="label-input">
                <label>Description:</label>
                <textarea
                  className="text-des"
                  type="text"
                  name="description"
                  value={newTodoValue.description}
                  onChange={handleOnchange}
                  placeholder="Description"
                  cols={50}
                  rows={3}
                />
              </p>
              <p className="label-input">
                <label className="select-img" for="input-img">
                  Select File: 
                </label>
                <input
                  id="input-img"
                  // hidden
                  className="input-product"
                  type="file"
                  name="myImage"

                  onChange={handleOnchangeFile}
                  placeholder="Choose img"
                />
                {selectImg && <img className="image" src={selectImg} />}
              </p>
              <button
                className="save-add"
                disabled={newTodoValue.length < 5}
                onClick={hanldeSubmitTodoValue}
              >
                {" "}
                ADD
              </button>
            </div>
          </div>
        )}
        <div className="list-product">
          {loading && (
            <div style={{ textAlign: "center" }}>
              <LoadingOutlined />
            </div>
          )}
          {listProduct.data.map((item, index) => {
            if (type === "all" || item.type === type)
              return (
                <div
                  className="product-item"
                  key={index}
                  onClick={() => handleDetailItem(item)}
                >
                  <img
                    className="pro-img"
                    src={item.image}
                    alt={item.productName}
                  />
                  <br />
                  <p style={{ marginTop: "20px" }}>{item.productName}</p>
                  <p className="price-pro">{item.price}000đ</p>
                </div>
              );
          })}
        </div>
        {showDetail && (
          <div className="show-item">
            <div
              className={`  ${
                showDetail === true ? "detail-item" : "hidden-item"
              }`}
            >
              <div style={{ display: "block" }}>
                <img src={detailItem?.image} alt="" />
              </div>
              <div className="detail-infor">
                <p className="back" onClick={handleDeleteDetailItem}>
                  X
                </p>
                <h3 className="name-detail">{detailItem?.productName}</h3>
                <h3 className="price-detail">{detailItem?.price} 000đ</h3>
                <p className="des-detail">{detailItem?.description}</p>
                <button
                  className="button1"
                  onClick={() => gotoDetail(detailItem)}
                >
                  Edit
                </button>
                <br />
                <button className="button2" onClick={handleDeleteProduct}>
                  Delete
                </button>
                <br></br>
              </div>
            </div>
          </div>
        )}
        {scrollPosition > 200 && (
          <p className="scroll-top" onClick={onTop}>
            <RiArrowDropUpLine className="on-top" />
            <span></span>
          </p>
        )}
      </div>
    </div>
  );
}
export default Products;
