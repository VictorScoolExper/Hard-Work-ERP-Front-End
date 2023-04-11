import { Outlet, useNavigation } from "react-router-dom";

import SidebarMenu from "../components/SideBar";

function RootLayout() {
  const navigation = useNavigation();

  return (
    // <>
    //     <MainNavigation />
    //     <main>
    //         {/* notifies user content is loading */}
    //         {navigation.state === 'loading' && <p>Loading..</p>}
    //         <Outlet/>
    //     </main>
    // </>
    <>
      <div style={{ height: "100vh", display: "flex", flexDirection: "row" }}>
        <div className="p-0" style={{ maxWidth: "20%" }}>
          <SidebarMenu />
        </div>
        <div className="p-0" style={{ flex: "1" }}>
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default RootLayout;
