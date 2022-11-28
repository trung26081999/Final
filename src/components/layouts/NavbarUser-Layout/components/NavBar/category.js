import { Menu } from 'antd';
import "./navbar.scss";
export const category = [
  {
    title: "AllProducts",
    path: "/allproducts",
  },
 
];
const MenuBar = () => {
    return (<>
        <Menu mode="horizontal" items={category} 
        />
    </>);
};

export default MenuBar;