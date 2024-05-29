<<<<<<< HEAD
import Search from "./Search";

const Header = () => {

    return (
        <div className="header">
            <Search />
        </div>
    )
=======
import BreadCrumb from "./BreadCrumbs";
import Search from "./Search";

const Header = () => {
    return (
        <>
            <BreadCrumb />
            <Search />
        </>
    );
>>>>>>> bba38fe336bd6cf36ffe7475a3f09b80da9b954f
}
export default Header;