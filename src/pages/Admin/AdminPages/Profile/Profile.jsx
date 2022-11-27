import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import Instagram from '../../../../assets/instagram.jpg'
import Facebook from '../../../../assets/facebook.jpg'
import Zalo from '../../../../assets/zalo.jpg'
import './Profile.css';
import { Modal, Table } from "antd";
import NavAdmin from "../../../../components/layouts/NabarAdmin-Layout/components/NabarAdmin";
import { fetchOrderAdminAction } from "../../../../stores/slices/admin.cart.slice";
import { deleteUserAction, fetchUserAction, searchUserAction, updateUserInfoAction } from "../../../../stores/slices/user.slice";
import { IoPencilOutline } from "react-icons/io5";
import { BsSearch } from "react-icons/bs";

function Profile() {
    const list_user = useSelector(state => state.user.userInfoState);
    const orderState = useSelector((state) => state.adminCart.cartState);
    const [valueSearch, setValueSearch] = useState()
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isModalVisible2, setIsModalVisible2] = useState(false);
    const location = useLocation()
    const [newValue, setNewValue] = useState();
    const [showListUsers, setShowListUsers] = useState(false)
    const [newValueUser, setNewValueUser] = useState(location.state)
    const [showEditUser, setShowEditUser] = useState(false);
    const [title, setTitle] = useState({
        titleName: '',
        titleValue: ''
    });
    const [profileUser, setProfileUser] = useState(location.state);
    const dispatch = useDispatch();
    // const userUpdate_ = list_user.userUpdate
    const data = orderState.data.filter(item => {
        return item.userId === profileUser.id
    })
    console.log("🚀 ~ file: Profile.jsx ~ line 36 ~ data ~ data", data)


    useEffect(() => {
        dispatch(fetchUserAction({ page: 1, limit: 200 }))
    }, [dispatch, profileUser])
    useEffect(() => {
        dispatch(fetchOrderAdminAction())
    }, [dispatch]);
    const showUser = (item) => {
        setProfileUser(item)
        setNewValueUser(item)
        setShowListUsers(false)
    }

    const onChangeShowUser = (e) => {
        const value = e.target.value;
        setValueSearch(value);
        dispatch(searchUserAction(value));

    }

    const onChangeNewValue = (e) => {
        setNewValue(e.target.value)
    }


    const showModal = (name, value) => {
        setIsModalVisible(true);

        setNewValue(null)
        setTitle({
            titleName: name,
            titleValue: value
        })
    };
    const showModal2 = (name, value) => {
        setIsModalVisible2(true);
        setTitle({
            titleName: name,
            titleValue: value
        })
    };

    const handleOk = () => {
        setIsModalVisible(false);
        setIsModalVisible2(false);
        dispatch(updateUserInfoAction({ id: profileUser.id, data: { [title.titleName.toLowerCase()]: newValue } }))
        setProfileUser({ ...profileUser, [title.titleName.toLowerCase()]: newValue })
        setNewValue(null)
    };

    const handleCancel = () => {
        setIsModalVisible(false);
        setIsModalVisible2(false);
    };
    const handleOnchangeFile = (e) => {
        const file = e.target.files[0];
        // file.urlImage = URL.createObjectURL(file);
        function getBase64(file, onLoadCallback) {
            return new Promise(function (resolve, reject) {
                var reader = new FileReader();
                reader.onload = function () { resolve(reader.result); };
                reader.onerror = reject;
                reader.readAsDataURL(file);
            });
        }

        var promise = getBase64(file);
        promise.then(function (result) {
            if (result !== '') {
                setNewValue(result)
            }
            else {
                setNewValue(profileUser.image)
            }
        });
    };
    const handleDelete = (e) => {
        const index = list_user.dataUser.findIndex(item => item.id === e)
        dispatch(deleteUserAction(e))
        setProfileUser(list_user.dataUser[index - 1])
    }
    const handleOnchangeEdit = (e) => {
        const value = e.target.value;
        setNewValueUser({ ...newValueUser, [e.target.name]: value })
    }
    const hanldeReset = () => {
        setNewValueUser({
            name: '',
            email: '',
            address: '',
            phone: '',
            decentralization: '',
        })
    }
    const hanldeSubmitUserValue = () => {
        dispatch(updateUserInfoAction({id:newValueUser.id,data:{...newValueUser}}));
        setProfileUser(newValueUser);
        setNewValueUser({
            name: '',
            email: '',
            address: '',
            phone: '',
            decentralization: '',
        })
        setShowEditUser(!showEditUser)
    }
    const columns = [
        {
            title: 'Date',
            dataIndex: 'date',
            key: 'date',
        },
        {
            title: 'ListProductOrder',
            dataIndex: 'listProductOrder',
            key: 'listProductOrder',
            render: (listProductOrder) => {
                return (
                    <>
                        {listProductOrder?.map(element => {
                            return (
                                <p style={{ transform: 'translateY(7px)', }}>
                                    {element.productName}
                                </p>
                            )
                        })}
                    </>
                )
            }
        },
        {
            title: 'Size',
            dataIndex: 'listProductOrder',
            key: 'size',
            render: (listProductOrder) => {
                return (
                    <>
                        {listProductOrder?.map(element => {
                            const size = element.size.label
                            return (
                                <p style={{ transform: 'translateY(7px)', }}>
                                    {size}
                                </p>
                            )
                        })}
                    </>
                )
            }
        },
        {
            title: 'Count',
            dataIndex: 'listProductOrder',
            key: 'count',
            render: (listProductOrder) => {
                return (
                    <>
                        {listProductOrder?.map(element => {
                            return (
                                <p style={{ transform: 'translateY(7px)', }}>
                                    {element.count}
                                </p>
                            )
                        })}
                    </>
                )
            }
        },
        {
            title: 'Status',
            key: 'status',
            dataIndex: 'status',
            render: (status) => <div style={status === 'Đã nhận' ? { color: "green" } : { color: 'red' }}>{status}</div>
        },
        {
            title: 'TotalBill',
            key: 'totalBill',
            dataIndex: 'totalBill',
            render: (totalBill) => <div >{totalBill} 000đ</div>
        },
    ];
    return (
        <div className="user-profile">
            <NavAdmin />
            <div className="profile-user">
                <div className="profile">
                    <div className="info">
                        <div className="search-click">
                            <p onClick={() => setShowListUsers(true)}><span>Search...</span><BsSearch /></p>
                        </div>
                        <div className="info_">
                            <div className="info-avatar"><img className="" src={profileUser.image} alt="" onClick={() => showModal2('Image',)} /></div>
                            <div className="info1">
                                <p>Name: {profileUser.name}
                                    <span onClick={() => showModal('Name', profileUser.name)}><IoPencilOutline />
                                    </span>
                                </p>
                                <p>Email: {profileUser.email}</p>
                                <p>Phone: {profileUser.phone} <span onClick={() => showModal('Phone', profileUser.phone)}>
                                    <IoPencilOutline /></span></p>
                                <p>Address: {profileUser.address}
                                    <span onClick={() => showModal('Address', profileUser.address)}><IoPencilOutline /></span>
                                </p>
                            </div>
                            <div className="info1">
                                <p>Decentralization: {profileUser.decentralization} <span
                                    onClick={() => showModal('Decentralization', profileUser.decentralization)}>
                                    <IoPencilOutline /></span>
                                </p>
                                <p>Status: {profileUser.status}</p>
                                <p className="link-app">
                                    <img className="fb" src={Facebook} />
                                    <img className="zl" src={Zalo} />
                                    <img className="in" src={Instagram} />
                                </p>
                                <p>
                                    <button onClick={() => handleDelete(profileUser.id)} className='delete-user' >delete</button>
                                    <button className="edit-user" onClick={() => {setShowEditUser(!showEditUser)}}>Edit Users</button>
                                </p>
                            </div>

                            <Modal title="Edit Information" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                                <p>{title.titleName}: {title.titleValue}</p>
                                <input className="new-value" placeholder="Enter new value"
                                    style={{ outline: 'none', border: 'none' }}
                                    value={newValue ?? ''} onChange={onChangeNewValue}
                                ></input>
                            </Modal>
                            <Modal title="Edit Information" visible={isModalVisible2} onOk={handleOk} onCancel={handleCancel}>
                                <div className="edit-avatar-user"> 
                                    <label>Avatar:  </label><br/>
                                    <img src={profileUser.image} width={'100px'}></img>
                                </div>
                                <div className="edit-avatar-user">
                                    <label className="choose-avatar" for="new-avatar" style={{cursor:'pointer'}}>Chose new Avatar:  </label><br/>
                                    <input id="new-avatar" type='file' hidden onChange={handleOnchangeFile}></input>
                                    {newValue && <img width={'100px'} className="image-profile" src={newValue} />}
                                </div>
                            </Modal>
                        </div>
                    </div>
                    <div className="history">
                        <Table bordered columns={columns} dataSource={data} pagination={false} />
                    </div>
                </div>
                <div className={`search-user ${showListUsers ? 'show-list-user' : ''}`} >
                    <div className="input-search">
                        <span onClick={() => setShowListUsers(false)}></span>
                        <input placeholder="Search..." onChange={onChangeShowUser}></input>
                    </div>
                    <div className='list-user'>
                        {(valueSearch ? list_user?.search : list_user.dataUser).map((item) => {
                            return (
                                <div className={`item-user ${(item.id === profileUser.id) ? 'active' : ''}`} onClick={() => showUser(item)}
                                >
                                    <img src={item.image} alt="" />
                                    <div className="name-user">
                                        <p>{item.name}</p>
                                        <p>{item.address}</p>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>
                {showEditUser && <div className="edits-user">
                    <div className="edit-user-position">
                        <p className="label-input1">
                            <label>Name:</label>
                            <input type="text" name="name" value={newValueUser.name}
                                onChange={handleOnchangeEdit} placeholder="Name" />
                        </p>
                        <span className="close-edit" onClick={() => setShowEditUser(!showEditUser)}>X</span>
                        <p className="label-input1">
                            <label>Email:</label>
                            <input type="text" name="email" value={newValueUser.email}
                                onChange={handleOnchangeEdit} placeholder="Email" />
                        </p>
                        <p className="label-input1">
                            <label>Phone:</label>
                            <input type="text" name="phone" value={newValueUser.phone}
                                onChange={handleOnchangeEdit} placeholder="Phone" />
                        </p>
                        <p className="label-input1">
                            <label>Address:</label>
                            <input type="text" name="address" value={newValueUser.address}
                                onChange={handleOnchangeEdit} placeholder="Address" />
                        </p>
                        <p className="label-input1">
                            <label>Decentralization:</label>
                            <input type="text" name="decentralization" value={newValueUser.decentralization}
                                onChange={handleOnchangeEdit} placeholder="Decentralization" />
                        </p>
                        <div className="on-button">
                            <button className="reset" onClick={hanldeReset}>Reset</button>
                            <button className="save-add" onClick={hanldeSubmitUserValue}>Save</button>
                        </div>
                    </div>
                </div>}
            </div>
        </div>
    );
}

export default Profile;