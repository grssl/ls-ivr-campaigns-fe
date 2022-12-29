import AdminRoute from "../modual/admin/AdminRoute";
import SuperAdminRoute from "../modual/SuperAdmin/SuperAdminRoute";
import AgentRoute from "../modual/agent/AgentRoute";
import AdminORGRoute from "../modual/AdminOrg/AdminORGRoute";
import SuperAdminMenuList from '../components/menu-list/SuperAdminMenuList';
import ORGAdminMenuList from '../components/menu-list/ORGAdminMenuList';
import AdminMenuList from "../components/menu-list/AdminMenuList";
import AgentMenuList from '../components/menu-list/AgentMenuList';

const Auths = [
  {
    key: 1,
    role: "SUPERADMIN",
    name: "SUPER ADMIN",
    access: [1, 2, 3, 4],
    filePath: <SuperAdminRoute />,
    menuList: SuperAdminMenuList
  },
  {
    key: 2,
    role: "ORGADMIN",
    name: "ORG ADMIN",
    access: [2, 3, 4],
    filePath: <AdminORGRoute />,
    menuList: ORGAdminMenuList
  },
  {
    key: 3,
    role: "ADMIN",
    name: "ADMIN",
    access: [3, 4],
    filePath: <AdminRoute />,
    menuList: AdminMenuList
  },
  {
    key: 4,
    role: "AGENT",
    name: "AGENT",
    access: [4],
    filePath: <AgentRoute />,
    menuList: AgentMenuList
  },
];
export default Auths;
