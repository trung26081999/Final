import { Menu } from 'antd';
import "./navbar.scss";
export const category = [
  {
    title: "KidsClothing",
    path: "/kidsclothing",
  },
  {
    title: "Womenshoes",
    path: "/womenshoes",
  },
  {
    title: "Mensclothing",
    path: "/menclothing",
  },
];
const MenuBar = () => {
    return (<>
        <Menu mode="horizontal" items={category} 
        />
    </>);
};

export default MenuBar;