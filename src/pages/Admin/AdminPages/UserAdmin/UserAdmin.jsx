import React, { useEffect, useState } from "react";
import './UserAdmin.css'
import { useDispatch, useSelector } from "react-redux";
import { deleteUserAction, fetchUserAction, USER_LIMIT, } from "../../../../stores/slices/user.slice";
import NavAdmin from "../../../../components/layouts/NabarAdmin-Layout/components/NabarAdmin";
import { FaUserAlt, FaUserCheck, FaUserTimes } from "react-icons/fa";
import { message, Pagination, Popconfirm, Table } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";



function UserAdmin() {
    const listUser = useSelector(state => state.user.userInfoState)
    const [searchParam, setSearchParam] = useSearchParams();
    const [deleteItem, setDeleteItem] = useState(false)
    const a = useLocation()
    const navigate = useNavigate()
    const data = listUser.dataUser;
    const activeUser = data.filter((item) => item.status === 'active');
    const loading = listUser.loading;
    const total = listUser.pagination.total;

    const defaultPage = 1;
    const page_ = searchParam.get("page") ?? `${defaultPage}`;
    const limit_ = searchParam.get("limit") ?? `${USER_LIMIT}`
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchUserAction({ page: page_, limit: limit_ }))
    }, [dispatch, page_, limit_, data.length])

    const gotoDetailProfile = (item) => {
        navigate(`/admin/profile/${item.id}`, { state: { ...item } })
    }
    const confirm = (e) => {
        console.log(e);
        dispatch(deleteUserAction(e))
        message.success('Click on Yes');
    };

    const cancel = (e) => {
        console.log(e);
        message.error('Click on No');
    };
    
    const columns = [
        {
            title: 'Id',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: (_, image) => {
                return <div style={{ color: "blue" }}><img style={{ width: '40px', height: '40px', borderRadius: '50%' }} src={image.image} /> {image.name}</div>
            }
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            render: (email) => <div >{email}</div>
        },
        {
            title: 'Phone',
            dataIndex: 'phone',
            key: 'phone',
            render: (phone) => <div >{phone}</div>
        },
        {
            title: 'Address',
            dataIndex: 'address',
            key: 'address',
        },


        {
            title: 'Decentralization',
            key: 'decentralization',
            dataIndex: 'decentralization',
            render: (decentralization) => <div style={decentralization === 'admin' ? { color: "blue" } : {}}>{decentralization}</div>

        },
        {
            title: 'Status',
            key: 'status',
            dataIndex: 'status',
            render: (status) => <div style={status === 'active' ? { color: "green" } : { color: 'red' }}>{status}</div>
        },
        {
            title: 'Action',
            key: 'id',
            dataIndex: 'id',
            render: (_, id) => {
                return (
                    <div className="button-handle">
                        <button className="button-view"
                            onClick={() => { gotoDetailProfile(id) }}
                        >View</button>

                        <div className="delete-user">
                            <Popconfirm
                                title={`Are you sure to delete ${id.name}`}
                                onConfirm={() => confirm(id.id)}
                                onCancel={cancel}
                                okText="Yes"
                                cancelText="No"
                            >
                                <button> 
                                    Delete</button>
                            </Popconfirm>
                        </div>

                    </div>
                )
            }

            ,
        },
    ];

    const onchangePagination = (page, limit) => {
        setSearchParam({ page, limit });
    };
    return (
        <div className="user-admin">
            <NavAdmin></NavAdmin>
            <div className="user-content" >
                <div className="list-user">
                    <div className="user-title">
                        <h2>Manager User</h2>
                        <div className="icon-users">
                            <p style={{ color: 'blue' }}><FaUserAlt className="icon-user" />{data.length}</p>
                            <p style={{ color: 'green' }}><FaUserCheck className="icon-user"/>{activeUser.length}</p>
                            <p style={{ color: 'rgb(182, 80, 80)' }}><FaUserTimes className="icon-user"/>{data.length - activeUser.length}</p>
                        </div>
                    </div>
                    <div className="user-table">
                        {loading && <div style={{ textAlign: 'center' }}><LoadingOutlined /></div>}
                        <Table bordered columns={columns} dataSource={data} pagination={false} />
                    </div>
                    <div className="pagination" style={{ width: '100%', marginTop: '0px', textAlign: 'center' }}>
                        <Pagination
                            pageSize={+ limit_}
                            total={total}
                            current={+ page_}
                            onChange={onchangePagination}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserAdmin;