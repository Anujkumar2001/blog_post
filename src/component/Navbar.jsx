import { useState } from "react";
import NavLink from "./NavLink";
import { IoReorderThreeOutline } from "react-icons/io5";
import { IoMdClose } from "react-icons/io";

function Navbar() {
  const [isClick, setIsClick] = useState(false);
  const toogleClick = () => {
    setIsClick(!isClick);
  };
  return (
    <>
      <div className="navbarContainer">
        <div className="desktopNavbar">
          <NavLink toogleClick={toogleClick} />
        </div>
        <div className="mobileNavbar">
          {!isClick ? (
            <IoReorderThreeOutline
              className="threeOutline"
              onClick={toogleClick}
            />
          ) : (
            <IoMdClose onClick={toogleClick} className="threeOutline" />
          )}
          {isClick ? <NavLink toogleClick={toogleClick} /> : ""}
          {/* <Navbar/> */}
        </div>
      </div>
    </>
  );
}

export default Navbar;
