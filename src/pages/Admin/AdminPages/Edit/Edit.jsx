import { notification } from "antd";
import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams, } from "react-router-dom";
import NavBarAdmin from "../../../../components/layouts/NabarAdmin-Layout/components/NabarAdmin";
import { updateProductAction } from "../../../../stores/slices/admin.product.slice";


export const LIST_ITEM = 'ITEM-PRODUCT';


function Edit() {
    const location = useLocation();
    const [newValueEdit, setNewValueEdit] = useState(location.state);
    const [urlImage, setUrlImage] = useState(null);
    const [showImg, setShowImg] = useState(null);

    const listProduct = useSelector(state => state.adminProduct.productState);
    const page_ = listProduct.pagination.page;
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const param = useParams();

    const typelocation = newValueEdit.type;
    const handleOnchangeEdit = (e) => {
        const valueEdit = e.target.value;
        setNewValueEdit({ ...newValueEdit, [e.target.name]: valueEdit })
    }

    // useEffect(() =>{ return () =>{ urlImage && URL.revokeObjectURL(urlImage.urlImage)} },[urlImage]);

    // const handleOnchangeEditFile = (e) => {
    //     const file = e.target.files[0];
    //     file.urlImage = URL.createObjectURL(file);
    //     setUrlImage(file);
    // }
    const handleOnchangeEditFile = (e) => {
        const file = e.target.files[0];
        // file.urlImage = URL.createObjectURL(file);
        function getBase64(file) {
            return new Promise(function (resolve, reject) {
                var reader = new FileReader();
                reader.onload = function () { resolve(reader.result); };
                reader.onerror = reject;
                reader.readAsDataURL(file);
            });
        }

        var promise = getBase64(file);
        promise.then(function (result) {
            setUrlImage(result)
        });

    };
    const hanldeSubmitEditValue = (e) => {
        const list = { ...newValueEdit, id: param.id, image: urlImage ? urlImage : location.state.image }
        dispatch(updateProductAction(list));
        navigate(`/admin/product`)
        notification.success({ message: `Chỉnh sửa ${newValueEdit.productName}` })
    }

    const hanldeReset = () => {
        setNewValueEdit({
            productName: '',
            type: '',
            price: '',
            image: '',
            description: '',
        })
    }
    const backProducts = () => navigate(`/admin/product`);
    const toggleImg = () => setShowImg(true);
    return (
        <div className="admin-edit">
            <NavBarAdmin />
            <div className="edit">
                <div className="edit-position">
                    <div className="edit-product">
                        <p className="label-input1">
                            <label>Title:</label>
                            <input type="text" name="productName" value={newValueEdit.productName}
                                onChange={handleOnchangeEdit} placeholder="Title" />
                        </p>
                        <span className="close-edit" onClick={backProducts}>X</span>
                        <p className="label-input1">
                            <label>Type:</label>
                            <input type="text" name="type" value={newValueEdit.type}
                                onChange={handleOnchangeEdit} placeholder="Type" />
                        </p>
                        <p className="label-input1">
                            <label>Price:</label>
                            <input type="text" name="price" value={newValueEdit.price}
                                onChange={handleOnchangeEdit} placeholder="Price" />
                        </p>
                        <p className="label-input1">
                            <label>Description:</label>
                            <textarea type="text" name="description" value={newValueEdit.description}
                                onChange={handleOnchangeEdit} placeholder="Description" cols={70} rows={4} />
                        </p>
                        <p className="label-input1">
                            <label className="select-img" for="input-img" onClick={toggleImg}>Select File:</label>
                            {showImg ?? <span><img width={'56%'} style={{ border:'1px solid wheat', float:'right', margin:'0 10%' }} src={location.state.image} /></span>}
                            <input id="input-img" hidden type="file" name="myImage"
                                onChange={handleOnchangeEditFile} placeholder="" />
                            {urlImage && <img width={'56%'} style={{ border:'1px solid wheat', float:'right',margin:'0 10%' }} className="image" src={urlImage} />}
                        </p>
                        <div className="on-button">
                            <button className="reset" onClick={hanldeReset}>Reset</button>
                            <button className="save-add" onClick={hanldeSubmitEditValue}>Save</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Edit;