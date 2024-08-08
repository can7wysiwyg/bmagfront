import { bmagtoken } from "./Bmag";
import { logoutAdmin } from "./Logout"

export function AuthComp() {
  const checkAuth = () => {
    

    
    if (bmagtoken === null) {
      return ""
    }

    
    return (
      <>
        <a href="#c" className="nav-link" style={{ cursor: "pointer" }} onClick={logoutAdmin}>
          LOGOUT
        </a>
      </>
    );
  }

  return (
    <>
      {checkAuth()}
    </>
  );
}
