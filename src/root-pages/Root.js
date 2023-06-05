import { useEffect } from "react";
import { Outlet, useNavigation } from "react-router-dom";

import SidebarMenu from "../components/SideBar";

import {getAppSettings} from "../features/settings/settingSlice";
import { useDispatch } from "react-redux";

function RootLayout() {
  const navigation = useNavigation();

  const dispatch = useDispatch();
  // we call all the redux state that we will use
  useEffect(() => {
    (async () => {
      try {
        await dispatch(getAppSettings());
      } catch (error) {
        console.log(error);
      }
    })();
  }, [dispatch]);

  return (
      <div style={{ height: "100vh", display: "flex", flexDirection: "row", overflow: 'hidden' }}>
        <div className="p-0" style={{ maxWidth: "20%"}}>
          <SidebarMenu />
        </div>
        <div className="p-0" style={{ flex: "1" }}>
          <Outlet />
        </div>
      </div>
  );
}

export default RootLayout;
