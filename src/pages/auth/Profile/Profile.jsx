import React, { useState } from 'react'
import { Button, Form, Input } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { logoutAction, updateUserInfoAction1,  } from '../../../stores/slices/user.slice';
import { useNavigate } from 'react-router-dom';

const layout = {
   labelCol: {
      span: 8,
   },
   wrapperCol: {
      span: 16,
   },
};

export default function Profile() {
   const userInfo = useSelector(state => state.user.userInfoState);
   // console.log("🚀 ~ file: Profile.jsx ~ line 18 ~ Profile ~ userInfo", userInfo)
   const dispatch = useDispatch();
   const navigate = useNavigate();
   const userName = userInfo?.data.name
   const email = userInfo?.data.email
   const phone = userInfo?.data.phone
   const address = userInfo?.data.address
   const [newTodoValue, setNewTodoValue] = useState({
      name: userName,
      phone: phone,
      address: address,
   });



   const handleOnchange = (e) => {
      const value = e.target.value;
      setNewTodoValue({ ...newTodoValue, [e.target.name]: value });
   }
   const handleLogout = () => {
      dispatch(logoutAction())
      navigate(`/`)
   }

   const onFinish = (values) => {
      dispatch(updateUserInfoAction1({ id: userInfo?.data.id, data: { ...values, email: email } }))
      setNewTodoValue(
         {
            name: '',
            phone: '',
            address: '',
         }
      )
      navigate(`/profile`)
   };

   return (
      <>
         <div className="profile__member">
            <div className="info__member">
               <h1>Thông tin cá nhân</h1>
               <div className="form__profile">
                  <Form {...layout}
                     name="nest-messages"
                     onFinish={onFinish}
                     onFinishFailed={() => { }}
                  >
                     <Form.Item
                        name={['name']}
                        label="Name"
                        rules={[
                           {
                              type: 'name'
                           },
                        ]}

                     >
                        <Input style={{ width: '400px' }}
                           name="name"
                           placeholder={userName}
                           value={newTodoValue.name}
                           onChange={handleOnchange}
                        />
                     </Form.Item>
                     <Form.Item
                        name="email"
                        label="Email"
                        rules={[
                           {
                              type: 'email'
                           },
                        ]}
                     >
                        <Input style={{ width: '400px' }}
                           disabled placeholder={email}

                        />
                     </Form.Item>
                     <Form.Item
                        name={['phone']}
                        label="Số Điện Thoại"
                        rules={[
                           {
                              type: 'text'
                           },
                        ]}
                     >
                        <Input type='number' style={{ width: '400px' }} placeholder={phone}
                           name="phone"
                           value={newTodoValue.phone}
                           onChange={handleOnchange}
                        />
                     </Form.Item>
                     <Form.Item name={['address']} label="Địa chỉ">
                        <Input style={{ width: '400px' }} placeholder={address}
                           name="address"
                           value={newTodoValue.address}
                           onChange={handleOnchange}
                        />
                     </Form.Item>
                     <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                        <Button type="primary" htmlType="submit">
                           Cập nhật
                        </Button>
                        <button onClick={handleLogout} className='btn__logout' type="primary" htmlType="submit">
                           Thoát
                        </button>
                     </Form.Item>
                  </Form>
               </div>
            </div>
         </div>
      </>
   )
}