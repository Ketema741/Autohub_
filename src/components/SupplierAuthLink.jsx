// import React, { Fragment, useContext } from "react";
// import { Link } from "react-router-dom";

// import { CgProfile } from "react-icons/cg";
// import { RiLogoutCircleLine } from "react-icons/ri";
// import { MdDashboard } from "react-icons/md";
// import { BiUserCircle } from "react-icons/bi";
// import { MdFavoriteBorder } from "react-icons/md";

// import AuthContext from "../../context/supplierAuth/authContext";
// import SupplierContext from "../../context/supplier/supplierContext";


// const AuthLink = () => {
//   const authContext = useContext(AuthContext);
//   const supplierContext = useContext(SupplierContext);

//   const { isSupplierAuthenticated, supplier, logout } = authContext;

//   const { favourites } = supplierContext



//   const onLogout = () => {
//     logout();
//   };

//   const authLinks = (
//     <Fragment>
//       <div className="user-nav__user">
//         <div className="dropdown ">
//           <div className="drodbtn">
//             <BiUserCircle className="nav__profile-icon" />
//           </div>
//           <div className="dropdown-content">
//             <div className="user-nav__user-email ">
//               {" "}
//               {supplier && supplier.email}
//             </div>
//             <Link to="/edit-profile" className="nav__profile">
//               <CgProfile className="nav__profile-icon" />
//               Profile
//             </Link>
//             {supplier && supplier.type === "supplier" && (
//               <Link to="/supplierdashboard" className="nav__profile">
//                 {/* <MdDashboard className="nav__profile-icon" /> */}
//                 Dashboard
//               </Link>
//             )}
//             <Link to="/" className="nav__profile" onClick={onLogout}>
//               <RiLogoutCircleLine className="nav__profile-icon" />
//               Logout
//             </Link>
//           </div>
//         </div>
//       </div>
//     </Fragment>
//   );

//   const guestLinks = (
//     <Fragment>
//       <Link className="nav__link" to="/supplierregister">
//         Register
//       </Link>
//       <Link className="nav__link" to="/supplierlogin">
//         Login
//       </Link>
//     </Fragment>
//   );

//   const userChart = (
//     <div className="user-nav__icon-box">
//       {supplier && (
//         <Fragment>
//           {favourites && (
//             <span className="user-nav__notification">
//               {favourites.length}
//             </span>
//           )}
//         </Fragment>
//       )}
//       <div className="dropdown ">
//         <div className="drodbtn">
//           <MdFavoriteBorder className="nav__profile-icon" />
//         </div>
//         <div className="dropdown-content">
//           <div className="user-nav__user-email ">
//             {" "}
//             {favourites && (
//               <div>
//                 You Have {favourites.length} Item In Your chart
//               </div>
//             )}
//           </div>
//           <Link to="/chart" className="nav__profile">
//             <MdFavoriteBorder className="nav__profile-icon" />
//             Chart
//           </Link>
//         </div>
//       </div>
//     </div>
//   );

//   return (
//     <div className="header__nav">
//       <nav className="user-nav">
//         {
//           isSupplierAuthenticated && userChart}

//         {
//           isSupplierAuthenticated ? authLinks : guestLinks}
//       </nav>
//     </div>
//   );
// };

// export default AuthLink;
