import { useContext, useEffect, useState } from "react";
import SideBar from "../pages/admin/global/Sidebar";
import { Outlet } from "react-router-dom";
import "./../../public/css/admin-panel.css";
import { AdminContext, AdminContextType } from "../context/AdminContext";



const AdminLayout = () => {
  const { isAdmin } = useContext(AdminContext) as AdminContextType;

  const [show, setShow] = useState(false);

  const checkIsAdmin = async () => {
    if (show === false) {
      await isAdmin();
      setShow(true);
    }
  };

  useEffect(() => {
    checkIsAdmin();
  }, []);
  return (
    <>
      {show === true ? (
        <div
          style={{
            backgroundColor: "#141b2d",
            height: "fit-content",
            minWidth: "fit-content",
          }}
          className="app"
        >
          <SideBar />
          <main className="content">
            <Outlet />
          </main>
        </div>
      ) : null}
    </>
  );
};

export default AdminLayout;
