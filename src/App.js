import { Outlet } from "react-router-dom"

import NavBar from "./NavBar"
import SideBar from "./SideBar"
import SearchBar from "./SearchBar"

const styles = {
    border: {
        border: "solid",
    }
}


function App() {
    return (
        <div className="container">
            <div className="row" style={styles.border}>
                <NavBar />
            </div>
            <div className="row">
                <div className="col-lg-3" style={styles.border}>
                    <SideBar />
                </div>
                <div className="col-lg-9" style={styles.border}>
                    <Outlet />
                    <SearchBar />
                </div>
            </div>
        </div>
    );
}

export default App;
