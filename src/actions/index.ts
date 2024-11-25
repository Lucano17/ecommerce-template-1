import { paypalCheckPayment } from "./payment/paypal-check-payment"
import { changeUserRole } from "./users/change-user-role"


export {setUserAddress} from "./address/set-user-address"
export {deleteUserAddress} from "./address/delete-user-address"
export {getUserAddress} from "./address/get-user-address"

export {authenticate} from "./auth/login"
export {login} from "./auth/login"
export {logout} from "./auth/logout"
export {onLogout} from "./auth/onLogout"
export {registerUser} from "./auth/register"

export {getCountries} from "./country/get-countries"

export {placeOrder} from "./order/place-order"
export {getOrderById} from "./order/get-order-by-id"
export {getOrdersByUser} from "./order/get-order-by-user"
export {getPaginatedOrders} from "./order/get-paginated-orders"

export {getPaginatedProductsWithImages} from "./product/product-pagination"
export {getProductBySlug} from "./product/get-product-slug"
export {getStockBySlug} from "./product/get-stock-by-slug"
export {createUpdateProduct} from "./product/create-update-product"

export * from "./payment/mercado-pago-preference"
export {paypalCheckPayment} from "./payment/paypal-check-payment"

export {updateOrderStatus} from "./order/update-order-status"

export {getPaginatedUsers} from "./users/get-paginated-users"
export {changeUserRole} from "./users/change-user-role"

export {getCategories} from "./product/category/get-categories"
