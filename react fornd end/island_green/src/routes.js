import React from "react";
import DefaultLayout from "./containers/DefaultLayout";

const Dashboard = React.lazy(() => import("./views/Dashboard"));
const MerchantComponent = React.lazy(() => import("./views/MerchantComponent"));
const ProductComponent = React.lazy(() => import("./views/ProductComponent"));
const BatchComponent = React.lazy(() => import("./views/BatchComponent"));
// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config
const routes = [
  { path: "/", exact: true, name: "Home", component: DefaultLayout },
  { path: "/dashboard", name: "Dashboard", component: Dashboard },
  { path: "/merchant", name: "Merchant", component: MerchantComponent },
  { path: "/product", name: "Product", component: ProductComponent },
  { path: "/batch", name: "Batch", component: BatchComponent }
];

export default routes;
