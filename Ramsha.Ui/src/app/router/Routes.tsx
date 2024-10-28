import LoginPage from "../../features/account/login/LoginPage";
import CatalogPage from "../../features/catalog/CatalogPage";
import ContactPage from "../../features/contact/ContactPage";
import PersistAuth from "../components/PersistAuth";
import { createBrowserRouter } from "react-router-dom";
import { PrivateRoutes } from "./PrivateRoutes";
import AdminDashboard from "../../features/admin/AdminDashboard";
import SupplierDashboard from "../../features/suppliers/SupplierDashboard";
import CheckoutPage from "../../features/checkout/CheckoutPage";
import RegisterPage from "../../features/account/register/RegisterPage";
import BasketPage from "../../features/basket/BasketPage";
import ProfilePage from "../../features/profile/ProfilePage";
import SearchPage from "../../features/search/SearchPage";
import DashboardLayout from "../layout/dashboard/DashboardLayout";
import MainLayout from "../layout/home/MainLayout";
import InventoryPage from "../../features/admin/inventory/InventoryPage";
import AdminProductPage from "../../features/admin/products/AdminProductPage";
import CreateProductPage from "../../features/products/CreateProductPage";
import ProductVariantsPage from "../../features/admin/products/ProductVariantsPage";
import CreateVariantPage from "../../features/products/variants/CreateVariantPage";
import EditVariantPage from "../../features/products/variants/EditVariantPage";
import ProductDetailsPage from "../../features/products/ProductDetailsPage";
import ProductEditModal from "../../features/products/ProductEditModal";
import CatalogProductDetailPage from "../../features/catalog/CatalogProductDetailPage";
import AboutPage from "../../features/about/AboutPage";
import SuppliesPage from "../../features/suppliers/supplies/SuppliesPage";
import SupplyRequestPage from "../../features/suppliers/supplies/SupplyRequestPage";
import AddSupplyRequestItemPage from "../../features/suppliers/supplies/AddSupplyRequestItemPage";
import EditSupplyItemPage from "../../features/suppliers/supplies/EditSupplyItemPage";
import SupplierInventoryPage from "../../features/suppliers/inventory/SupplierInventoryPage";
import SupplierProductsPage from "../../features/suppliers/Products/SupplierProductsPage";
import AddSupplierVariantPage from "../../features/suppliers/Products/Variants/AddSupplierVariantPage";
import SupplierProductVariantsPage from "../../features/suppliers/Products/Variants/SupplierProductVariantsPage";
import EditSupplierVariantPage from "../../features/suppliers/Products/Variants/EditSupplierVariantPage";
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
                                element: <CheckoutPage />,
                                path: 'checkout'
                            }
                        ]
                    },
                    {
                        element: <LoginPage />,
                        path: 'login'
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
                        element: <CatalogPage />,
                        path: 'catalog',
                        children: [
                            {
                                element: <CatalogProductDetailPage />,
                                path: ':productId'
                            }
                        ]

                    },
                    {
                        element: <BasketPage />,
                        path: 'basket'
                    }, {
                        element: <ProfilePage />,
                        path: 'profile'
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
                        // element: <PrivateRoutes allowedRoles={['SuperAdmin', 'Admin']} />,
                        path: '/admin',
                        children: [
                            {
                                element: <AdminDashboard />,
                                path: 'dashboard'
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