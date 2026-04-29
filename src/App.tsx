import {Navigate, Route, Routes} from "react-router";
import {Layout} from "./pages/Layout.tsx";
import {HomePage} from "./pages/HomePage.tsx";
import {CategoriesPage} from "./pages/CategoryPage.tsx";
import "./features/adapters/categoryAdapter.ts"
import {AuthenticationPage} from "./pages/AuthenticationPage.tsx";
import {RequireAuthentication} from "./components/RequireAuthentication.tsx";
import {RequireAuthorization} from "./components/RequireAuthorization.tsx";
import {AdminPage} from "./pages/AdminPage.tsx";
import {AdminProductPage} from "./pages/AdminProductPage.tsx";
import {AdminCategoryPage} from "./pages/AdminCategoryPage.tsx";
import {AdminBrandPage} from "./pages/AdminBrandPage.tsx";
import {AdminImagePage} from "./pages/AdminImagePage.tsx";
import {ProductPage} from "./pages/ProductPage.tsx";
import {CartPage} from "./pages/CartPage.tsx";
import {CheckoutPage} from "./pages/CheckoutPage.tsx";
import {OrdersPage} from "./pages/OrdersPage.tsx";
import {AdminAccountPage} from "./pages/AdminAccountPage.tsx";
import {ConfirmEmailPage} from "./pages/ConfirmEmailPage.tsx";
import {ForgotPasswordPage} from "./pages/ForgotPasswordPage.tsx";
import {ResetPasswordPage} from "./pages/ResetPasswordPage.tsx";
import {AdminOrdersPage} from "./pages/AdminOrdersPage.tsx";
function App() {
  return (
        <>
          <Routes>
            <Route path="/" element={<Layout />}>
                {/*public routes*/}
                <Route path={"auth"} element={<AuthenticationPage/>}/>
                    <Route element={<RequireAuthentication/>}>
                        <Route index element={<Navigate to="/home" replace />} />

                        <Route path="/home" element={<HomePage/>}/>
                        <Route path="/category/:categoryId" element={<CategoriesPage />}/>
                        <Route path="/products/:productId" element={<ProductPage />}/>
                        <Route path="/cart" element={<CartPage />}/>
                        <Route path="/checkout" element={<CheckoutPage />}/>
                        <Route path="/orders" element={<OrdersPage />}/>
                        <Route path="/confirm-email" element={<ConfirmEmailPage />}/>
                        <Route path="/forgot-password" element={<ForgotPasswordPage />}/>
                        <Route path="/reset-password" element={<ResetPasswordPage />}/>


                        {/*private routes*/}

                        <Route element={<RequireAuthorization allowedRoles={["Admin", "SuperAdmin"]}/>}>
                            <Route path={"/admin"} element={<AdminPage />}>
                                <Route index  element={<Navigate to={"product"} replace />}/>
                                <Route path={"product"} element={<AdminProductPage />} />
                                <Route path={"category"} element={<AdminCategoryPage />} />
                                <Route path={"brand"} element={<AdminBrandPage />} />
                                <Route path={"image"} element={<AdminImagePage />} />
                                <Route path={"users"} element={<AdminAccountPage />} />
                                <Route path={"orders"} element={<AdminOrdersPage />} />
                            </Route>
                        </Route>
                </Route>
            </Route>

          </Routes>
        </>
  )
}

export default App
