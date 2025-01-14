import { createBrowserRouter } from "react-router-dom";
import AboutPage from "../../features/about/AboutPage";
import EmailVerificationPage from "../../features/account/confirm/EmailVerificationPage";
import { SendConfirmEmailPage } from "../../features/account/confirm/SendConfirmEmailPage";
import LoginPage from "../../features/account/login/LoginPage";
import RegisterPage from "../../features/account/register/RegisterPage";
import ResetPasswordPage from "../../features/account/ResetPasswordPage";
import SendResetPasswordEmail from "../../features/account/SendResetPasswordEmail";
import AdminDashboard from "../../features/admin/AdminDashboard";
import FulfillmentRequestsPage from "../../features/admin/fulfillmentRequests/FulfillmentRequestsPage";
import InventoryPage from "../../features/admin/inventory/InventoryPage";
import AdminOrdersPage from "../../features/admin/orders/AdminOrdersPage";
import AdminProductPage from "../../features/admin/products/AdminProductPage";
import ProductVariantsPage from "../../features/admin/products/ProductVariantsPage";
import AdminSuppliesPage from "../../features/admin/suppplies/AdminSuppliesPage";
import BasketDetailPage from "../../features/basket/BasketDetailPage";
import CatalogPage from "../../features/catalog/CatalogPage";
import CatalogProductDetailsModal from "../../features/catalog/CatalogProductDetailsModal";
import CheckoutPage from "../../features/checkout/CheckoutPage";
import ContactPage from "../../features/contact/ContactPage";
import DeliveryAgentDashboard from "../../features/deliveryAgents/DeliveryAgentDashboard";
import DeliveryAgentFulfillmentsPage from "../../features/deliveryAgents/fulfillments/DeliveryAgentFulfillmentsPage";
import MyOrdersPage from "../../features/orders/MyOrdersPage";
import OrderDetailPage from "../../features/orders/OrderDetailPage";
import CreateProductPage from "../../features/products/CreateProductPage";
import ProductDetailsPage from "../../features/products/ProductDetailsPage";
import ProductEditModal from "../../features/products/ProductEditModal";
import CreateVariantPage from "../../features/products/variants/CreateVariantPage";
import EditVariantPage from "../../features/products/variants/EditVariantPage";
import OrderHistory from '../../features/profile/OrderHistory';
import ProfilePage, { SavedItems } from "../../features/profile/ProfilePage";
import AccountSettings from "../../features/profile/settings/AccountSettings";
import ChangePasswordModal from "../../features/profile/settings/ChangePasswordModal";
import ManageAddressPage from "../../features/profile/settings/ManageAddressPage";
import SearchPage from "../../features/search/SearchPage";
import FulfillmentRequestDetailPage from "../../features/suppliers/FulfillmentRequests/FulfillmentRequestDetailPage";
import MyFulfillmentRequestsPage from "../../features/suppliers/FulfillmentRequests/MyFulfillmentRequestsPage";
import SupplierInventoryPage from "../../features/suppliers/inventory/SupplierInventoryPage";
import SupplierProductsPage from "../../features/suppliers/Products/SupplierProductsPage";
import AddSupplierVariantPage from "../../features/suppliers/Products/Variants/AddSupplierVariantPage";
import EditSupplierVariantPage from "../../features/suppliers/Products/Variants/EditSupplierVariantPage";
import SupplierProductVariantsPage from "../../features/suppliers/Products/Variants/SupplierProductVariantsPage";
import SupplierDashboard from "../../features/suppliers/SupplierDashboard";
import AddSupplyRequestItemPage from "../../features/suppliers/supplies/AddSupplyRequestItemPage";
import EditSupplyItemPage from "../../features/suppliers/supplies/EditSupplyItemPage";
import SuppliesPage from "../../features/suppliers/supplies/SuppliesPage";
import SupplyRequestPage from "../../features/suppliers/supplies/SupplyRequestPage";
import SupplyDetailsPage from "../../features/supplies/SupplyDetailsPage";
import PersistAuth from "../components/PersistAuth";
import DashboardLayout from "../layout/dashboard/DashboardLayout";
import MainLayout from "../layout/home/MainLayout";
import { PrivateRoutes } from "./PrivateRoutes";


//import AdminProductPage from "../../features/admin/products/AdminProductPage";

export const router = createBrowserRouter([
    {
        element: <PersistAuth />,
        children: [
            {
                element: <MainLayout />,
                path: '/',
                children: [
                    {
                        element: <PrivateRoutes allowedRoles={['Supplier', 'Admin', 'SuperAdmin', 'Customer']} />,
                        children: [
                            {
                                element: <ProfilePage />,
                                path: 'profile',
                                children: [
                                    { index: true, element: <OrderHistory /> },
                                    {
                                        path: 'orders',
                                        element: <OrderHistory />,
                                        children: [
                                            {
                                                element: <OrderDetailPage />,
                                                path: ':orderId'
                                            }
                                        ]
                                    },
                                    { path: 'saved-items', element: <SavedItems /> },
                                    {
                                        path: 'settings',
                                        element: <AccountSettings />,
                                        children: [
                                            {
                                                element: <ManageAddressPage />,
                                                path: 'manage-address'
                                            },
                                            {
                                                element: <ChangePasswordModal />,
                                                path: 'change-password'
                                            }
                                        ]
                                    },
                                ],
                            },
                            {
                                element: <CheckoutPage />,
                                path: 'checkout'
                            },
                            {
                                element: <MyOrdersPage />,
                                path: 'my-orders',
                                children: [
                                    {
                                        element: <OrderDetailPage />,
                                        path: ':orderId'
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        element: <LoginPage />,
                        path: 'login'
                    },
                    {
                        element: <SendResetPasswordEmail />,
                        path: 'send-reset-password-email'
                    },
                    {
                        element: <ResetPasswordPage />,
                        path: 'reset-password'
                    },
                    {
                        element: <RegisterPage />,
                        path: 'register'
                    },
                    {
                        element: <ContactPage />,
                        path: 'contact'
                    },
                    {
                        element: <AboutPage />,
                        path: 'about'
                    },
                    {
                        path: 'confirm/:userEmail',
                        element: <SendConfirmEmailPage />
                    },
                    {
                        path: 'verifyEmail',
                        element: <EmailVerificationPage />
                    },
                    {
                        element: <CatalogPage />,
                        path: 'catalog',
                        children: [

                        ]
                    },
                    {
                        element: <CatalogProductDetailsModal />,
                        path: 'catalog/:productId'
                    },
                    {
                        element: <BasketDetailPage />,
                        path: 'basket/detail'
                    },
                    {
                        element: <SearchPage />,
                        path: 'search'
                    },
                ]
            },
            {
                element: <DashboardLayout />,
                children: [
                    {
                        element: <PrivateRoutes allowedRoles={['DeliveryAgent']} />,
                        path: '/delivery-agent',
                        children: [
                            {
                                element: <DeliveryAgentDashboard />,
                                path: 'dashboard'
                            },
                            {
                                element: <DeliveryAgentFulfillmentsPage />,
                                path: 'fulfillments'
                            }
                        ]
                    },
                    {
                        element: <PrivateRoutes allowedRoles={['SuperAdmin', 'Admin']} />,
                        path: '/admin',
                        children: [
                            {
                                element: <AdminDashboard />,
                                path: 'dashboard'
                            },
                            {
                                element: <AdminOrdersPage />,
                                path: 'orders',
                                children: [
                                    {
                                        path: ':orderId',
                                        element: <OrderDetailPage />
                                    }
                                ]
                            },
                            {
                                element: <FulfillmentRequestsPage />,
                                path: 'fulfillments'
                            },

                            {
                                element: <AdminSuppliesPage />,
                                path: 'supplies',
                                children: [
                                    {
                                        path: ':supplyId',
                                        element: <SupplyDetailsPage />
                                    }
                                ]
                            },
                            {
                                element: <InventoryPage />,
                                path: 'inventory'
                            },
                            {
                                element: <AdminProductPage />,
                                path: 'products',
                                children: [
                                    {
                                        path: ':productId',
                                        element: <ProductDetailsPage />,
                                        children: [
                                            {
                                                element: <ProductEditModal />,
                                                path: 'edit/:section'
                                            },
                                        ]
                                    },
                                    {
                                        path: 'create',
                                        element: <CreateProductPage />
                                    },
                                    {
                                        path: ':productId/variants',
                                        element: <ProductVariantsPage />,
                                        children: [
                                            {
                                                path: 'create',
                                                element: <CreateVariantPage />
                                            },
                                            {

                                                path: 'edit/:variantId',
                                                element: <EditVariantPage />
                                            }
                                        ]
                                    },
                                    {
                                        path: 'edit/:productId',
                                        element: null
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        element: <PrivateRoutes allowedRoles={['Supplier']} />,
                        path: '/supplier',
                        children: [
                            {
                                element: <SupplierDashboard />,
                                path: 'dashboard'
                            },
                            {
                                element: <MyFulfillmentRequestsPage />,
                                path: 'fulfillment-requests',
                                children: [
                                    {
                                        element: <FulfillmentRequestDetailPage />,
                                        path: ':fulfillmentRequestId'
                                    }
                                ]
                            },
                            {
                                element: <SuppliesPage />,
                                path: 'supplies'
                            },
                            {
                                element: <SupplierProductsPage />,
                                path: 'products',
                                children: [
                                    {
                                        element: <AddSupplierVariantPage depth={2} />,
                                        path: ":productId/add-variant"
                                    },
                                    {
                                        element: <SupplierProductVariantsPage />,
                                        path: ":productId/variants",
                                        children: [
                                            {
                                                element: <EditSupplierVariantPage />,
                                                path: ':variantId/edit'
                                            },
                                            {
                                                element: <AddSupplierVariantPage />,
                                                path: "add"
                                            },
                                        ]
                                    }


                                ]
                            },
                            {
                                element: <SupplyRequestPage />,
                                path: 'supply-request',
                                children: [
                                    {
                                        element: <AddSupplyRequestItemPage />,
                                        path: 'add-item/:productId',
                                    },
                                    {
                                        element: <EditSupplyItemPage />,
                                        path: 'edit-item/:itemId',
                                    }
                                ]
                            },
                            {
                                element: <SupplierInventoryPage />,
                                path: 'inventory'
                            }
                        ]
                    },
                ]
            },






        ]
    }]
)