import React from 'react';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { useSelector } from 'react-redux';
import './Featured.css'

export const Featured = () => {
  const listOrder = useSelector(state => state.adminCart.cartState);

  const currentDate = new Date();
  let smallMonth = currentDate.getMonth()
    if(smallMonth < 10) { smallMonth = `0${smallMonth}`};

  let largeMonth = currentDate.getMonth() +1
    if(largeMonth < 10) { largeMonth = `0${largeMonth}`};

  let lastMonth = currentDate.getMonth() +2
    if(lastMonth < 10) { lastMonth = `0${lastMonth}`};
  
  const smallDate = `${currentDate.getFullYear()}-${smallMonth}-01`
  const largeDate = `${currentDate.getFullYear()}-${largeMonth}-01`;
  const lastDate = `${currentDate.getFullYear()}-${lastMonth}-01`;

  let totalLastMonth = 0;
  const totalOrderLastMonth =() => { listOrder.data.filter(item => {
    if(item.status === 'Đã nhận' && new Date(item.date) >= new Date(smallDate) && new Date(item.date) < new Date(largeDate)) {
      totalLastMonth += item.totalBill;
      return totalLastMonth;
    }
  })};
  totalOrderLastMonth();

  let totalCurentMonth = 0;
  const totalOrderCurentMonth =() => { listOrder.data.filter(item => {
    if(item.status === 'Đã nhận' && new Date(item.date) >= new Date(largeDate) && new Date(item.date) < new Date(lastDate)) {
      totalCurentMonth += item.totalBill;
      return totalCurentMonth;
    }
  })};
  totalOrderCurentMonth();
    const target = 1000;
    return (
      <div className="featured">
        <div className="top">
          <h1 className="title-name">Total Revenue</h1>
        </div>
        <div className="bottom">
          <div className="featuredChart">
            <CircularProgressbar value={(totalCurentMonth/target)} maxValue={1} text={`${Math.round((totalCurentMonth/target) * 100)}%`} />
          </div>
          <p className="title-name">Total sales made today</p>
          <p className="amount" style={totalCurentMonth>=1000? {color:'green'}:{color:'red'}}>{totalCurentMonth} 000</p>
          <p className="desc">
            Previous transactions processing. Last payments may not be included.
          </p>
          <div className="summary">
            <div className="item">
              <div className="itemTitle">Target</div>
              <div className="itemResult negative">               
                <div className="resultAmount" style={{color:'green'}}>{target} 000</div>
              </div>
            </div>
            <div className="item">
              <div className="itemTitle">Last Month</div>
              <div className="itemResult positive">              
                <div className="resultAmount" style={totalLastMonth>=1000? {color:'green'}:{color:'red'}}>{totalLastMonth} 000</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };
  