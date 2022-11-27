import { DatePicker, Space, Table } from "antd";
import { useEffect, useState } from "react";
import NavAdmin from "../../../../components/layouts/NabarAdmin-Layout/components/NabarAdmin";
import { LoadingOutlined } from "@ant-design/icons";
import "./Statistics.css";
import { fetchOrderAdminAction } from "../../../../stores/slices/admin.cart.slice";
import { useDispatch, useSelector } from "react-redux";
import React from "react";
function Statistics() {
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [status, setStatus] = useState();
  const [cfSmall, setCfSmall] = useState();
  const [cfMedium, setCfMedium] = useState();
  const [cfLarge, setCfLarge] = useState();
  const [otSmall, setOtSmall] = useState();
  const [otMedium, setOtMedium] = useState();
  const [otLarge, setOtLarge] = useState();
  const [totalCf, setTotalCf] = useState();
  const [totalOt, setTotalOt] = useState();
  const [showRevenue, setShowRevenue] = useState(false);
  const dispatch = useDispatch();
  const orderState = useSelector((state) => state.adminCart.cartState);
  const loading = orderState.loading;
  const data = orderState.data.filter(
    (item) =>
      item.status === status &&
      new Date(startDate) < new Date(item.date) &&
      new Date(item.date) < new Date(endDate)
  );
  const start = new Date(startDate);
  const end = new Date(endDate);
  useEffect(() => {
    dispatch(fetchOrderAdminAction());
  }, [dispatch]);
  const onChange = (date, dateString) => {
    setStartDate(date);
  };
  const onChange1 = (date, dateString) => {
    setEndDate(date);
  };
  const onChangeStatus = (e) => {
    setStatus(e.target.value);
  };
  const showRevenueTotal = () => {
    setShowRevenue(true);
    calculator();
  };
  const calculator = () => {
    let count1 = 0;
    let count2 = 0;
    let count3 = 0;
    let count4 = 0;
    let count5 = 0;
    let count6 = 0;
    let count7 = 0;
    let count8 = 0;
    let count9 = 0;
    data.map((item, index) => {
      count9 += item.totalBill;
      if (item.status === "Đã nhận") {
        item.listProductOrder.map((element) => {
          if (element.type === "kidsclothing" && element.size.label === "S") {
            count1 += element.count;
            setCfSmall(count1);
            count7 += element.total;
            setTotalCf(count7);
          }
          if (element.type === "kidsclothing" && element.size.label === "M") {
            count2 += element.count;
            setCfMedium(count2);
            count7 += element.total;
            setTotalCf(count7);
          }
          if (element.type === "kidsclothing" && element.size.label === "L") {
            count3 += element.count;
            setCfLarge(count3);
            count7 += element.total;
            setTotalCf(count7);
          }
          if (element.type === "kidsclothing" && element.size.label === "XL") {
            count4 += element.count;
            setOtSmall(count4);
            count8 += element.total;
            setTotalOt(count8);
          }
          if (element.type === "kidsclothing" && element.size.label === "XXL") {
            count5 += element.count;
            setOtMedium(count5);
            count8 += element.total;
            setTotalOt(count8);
          }
          if (element.type === "other" && element.size.label === "Lớn") {
            count6 += element.count;
            setOtLarge(count6);
            count8 += element.total;
            setTotalOt(count8);
          }
        });
      }
    });
  };
  const columns = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "UserName",
      dataIndex: "userName",
      key: "userName",
      render: (userName) => <div style={{ color: "blue" }}>{userName}</div>,
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
      render: (phone) => <div>{phone}</div>,
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: (date) => <div style={{ color: "blue" }}>{date}</div>,
    },
    {
      title: "Order",
      dataIndex: "listProductOrder",
      key: "listProductOrder",
      render: (listProductOrder) => {
        return (
          <>
            {listProductOrder?.map((element) => {
              return (
                <p style={{ transform: "translateY(7px)" }}>
                  - {element.productName}
                </p>
              );
            })}
          </>
        );
      },
    },
    {
      title: "Size",
      dataIndex: "listProductOrder",
      key: "size",
      render: (listProductOrder) => {
        return (
          <>
            {listProductOrder?.map((element) => {
              const size = element.size.label;
              return <p style={{ transform: "translateY(7px)" }}>{size}</p>;
            })}
          </>
        );
      },
    },
    {
      title: "Count",
      dataIndex: "listProductOrder",
      key: "count",
      render: (listProductOrder) => {
        return (
          <>
            {listProductOrder?.map((element) => {
              return (
                <p style={{ transform: "translateY(7px)" }}>{element.count}</p>
              );
            })}
          </>
        );
      },
    },

    {
      title: "Status",
      key: "status",
      dataIndex: "status",
      render: (status) => (
        <div
          style={
            status === "Đã nhận"
              ? { color: "rgb(3, 145, 3)" }
              : { color: "red" }
          }
        >
          {status}
        </div>
      ),
    },
    {
      title: "TotalBill",
      key: "totalBill",
      dataIndex: "totalBill",
      render: (total) => `${total} .000đ`,
    },
  ];
  return (
    <div className="statistics-page">
      <NavAdmin />
      <div className="statistics">
        <div className="search">
          <Space direction="vertical">
            <DatePicker onChange={onChange} />
          </Space>
          <Space direction="vertical">
            <DatePicker onChange={onChange1} />
          </Space>
          <select className="select" onChange={onChangeStatus} value={status}>
            <option disabled selected>
              -- Choose an option --
            </option>
            <option value="Đã nhận">Delivered</option>
            <option value="Đã hủy">Cancel</option>
          </select>
          {data && status === "Đã nhận" && (
            <button onClick={showRevenueTotal}>Revenue</button>
          )}
        </div>
        <div className="statistics_">
          <div className="statstics-table">
            {loading && (
              <div style={{ textAlign: "center" }}>
                <LoadingOutlined />
              </div>
            )}
            <Table bordered columns={columns} dataSource={data} />
          </div>
        </div>
        <div>
          {status === "Đã nhận" && showRevenue && (
            <div className="statistic-revenue">
              <div className="revenue" onClick={() => setShowRevenue(false)}>
                <p className="hide-revenue">X</p>
                <h2>{`The Revenue From Day ${start.getDate()}-${
                  start.getMonth() + 1
                }-${start.getFullYear()}
                         To ${end.getDate()}-${
                  end.getMonth() + 1
                }-${end.getFullYear()}`}</h2>
                <table>
                  <tr className="revenue-title">
                    <th>Name Type</th>
                    <th>Size</th>
                    <th>Amount</th>
                    <th>Total</th>
                    <th>Ratio</th>
                  </tr>
                  <tr>
                    <th rowSpan={3}>kidsclothing</th>
                    <th>Small</th>
                    <th>{cfSmall}</th>
                    <th rowSpan={3}>
                      {totalCf}
                      {`${totalCf ? " 000đ" : ""}`}
                    </th>
                    <th rowSpan={3}>
                      {Math.round((totalCf / (totalCf + totalOt)) * 100) ?? ""}%
                    </th>
                  </tr>
                  <tr>
                    <th>Medium</th>
                    <th>{cfMedium}</th>
                  </tr>
                  <tr>
                    <th>Large</th>
                    <th>{cfLarge}</th>
                  </tr>
                  <tr>
                    <th rowSpan={3}>Other</th>
                    <th>Small</th>
                    <th>{otSmall}</th>
                    <th rowSpan={3}>
                      {totalOt}
                      {`${totalOt ? " 000đ" : ""}`}
                    </th>
                    <th rowSpan={3}>
                      {Math.round((totalOt / (totalCf + totalOt)) * 100) ?? ""}%
                    </th>
                  </tr>
                  <tr>
                    <th>Medium</th>
                    <th>{otMedium}</th>
                  </tr>
                  <tr>
                    <th>Large</th>
                    <th>{otLarge}</th>
                  </tr>
                  <tr>
                    <th>Totaly</th>
                    <th></th>
                    <th></th>
                    <th>
                      {totalCf + totalOt}
                      {totalCf + totalOt > 0 ? " 000đ" : ""}
                    </th>
                    <th></th>
                  </tr>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
export default Statistics;
