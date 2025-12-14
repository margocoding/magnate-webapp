import React from "react";
import SideBar from "./components/shared/SideBar";
import ProfilePage from "./pages/ProfilePage";

const App: React.FC = () => {
  return (
    <div className="h-full w-full flex items-center">
      <div className="w-[400px] w-full overflow-y-auto">
        <div className="pb-20 pt-5">
          <ProfilePage />
        </div>

        <SideBar />
      </div>
    </div>
  );
};

export default App;
