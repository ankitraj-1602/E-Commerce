import { Navigate, useLocation } from "react-router-dom";

function CheckAuth({ isAuthenticated, user, children }) {
  const location = useLocation();

  console.log(location.pathname, isAuthenticated);

  // Default route - redirect to the shop home page if not authenticated
  if (location.pathname === "/") {
    return <Navigate to="/shop/home" />;
  }

  // Handle shop routes
  if (location.pathname.startsWith("/shop")) {
    // Unprotected routes: home, listing, and search pages
    if (
      location.pathname === "/shop/home" ||
      location.pathname === "/shop/listing" ||
      location.pathname === "/shop/search"
    ) {
      return <>{children}</>;
    }

    // Protected routes: checkout, account, payment-related pages
    if (
      !isAuthenticated &&
      (location.pathname.includes("checkout") ||
        location.pathname.includes("account") ||
        location.pathname.includes("paypal-return") ||
        location.pathname.includes("payment-success"))
    ) {
      return <Navigate to="/auth/login" />;
    }
  }

  // Auth pages access control
  if (
    !isAuthenticated &&
    !(location.pathname.includes("/login") || location.pathname.includes("/register"))
  ) {
    return <Navigate to="/auth/login" />;
  }

  if (
    isAuthenticated &&
    (location.pathname.includes("/login") || location.pathname.includes("/register"))
  ) {
    if (user?.role === "admin") {
      return <Navigate to="/admin/dashboard" />;
    } else {
      return <Navigate to="/shop/home" />;
    }
  }

  // Restrict admin-only areas for non-admin users
  if (isAuthenticated && user?.role !== "admin" && location.pathname.includes("admin")) {
    return <Navigate to="/unauth-page" />;
  }

  // Restrict shop-only areas for admin users
  if (isAuthenticated && user?.role === "admin" && location.pathname.includes("shop")) {
    return <Navigate to="/admin/dashboard" />;
  }

  return <>{children}</>;
}

export default CheckAuth;
