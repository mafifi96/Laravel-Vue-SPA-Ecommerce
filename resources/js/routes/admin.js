import Dashboard  from '../Components/Admin/pages/Dashboard'
import Categories from '../Components/Admin/pages/category/categories'
import Category from '../Components/Admin/pages/category/category'
import CategoryCreate from '../Components/Admin/pages/category/create'
import CategoryEdit from '../Components/Admin/pages/category/edit'
import Products from '../Components/Admin/pages/product/products'
import Product from '../Components/Admin/pages/product/product'
import ProductCreate from '../Components/Admin/pages/product/create'
import ProductEdit from '../Components/Admin/pages/product/edit'
import Orders from '../Components/Admin/pages/order/orders'
import Order from '../Components/Admin/pages/order/order'
import Customers from '../Components/Admin/pages/customer/customers'
import Customer from '../Components/Admin/pages/customer/customer'

const routes = [
    {
        path: '/dashboard',
        name: 'dashboard',
        component: Dashboard,
        meta : {
            middleware : "admin",
            layout : "AdminLayout"
        }
    },
    {
        path: '/admin/categories',
        name: 'admin.categories',
        component: Categories,
        meta : {
            middleware : "admin",
            layout : "AdminLayout"
        }
    },
    {
        path: '/admin/category/:id(\\d+)',
        name: 'admin.category',
        component: Category,
        meta : {
            middleware : "admin",
            layout : "AdminLayout"
        }
    },
    {
        path: '/admin/category/create',
        name: 'admin.category.create',
        component: CategoryCreate,
        meta : {
            middleware : "admin",
            layout : "AdminLayout"
        }
    },
    {
        path: '/admin/category/:id(\\d+)/edit',
        name: 'admin.category.edit',
        component: CategoryEdit,
        meta : {
            middleware : "admin",
            layout : "AdminLayout"
        }
    },
    {
        path: '/admin/products',
        name: 'admin.products',
        component: Products,
        meta : {
            middleware : "admin",
            layout : "AdminLayout"
        }
    },
    {
        path: '/admin/products/:id(\\d+)',
        name: 'admin.product',
        component: Product,
        meta : {
            middleware : "admin",
            layout : "AdminLayout"
        }
    },
    {
        path: '/admin/products/create',
        name: 'admin.products.create',
        component: ProductCreate,
        meta : {
            middleware : "admin",
            layout : "AdminLayout"
        }
    },
    {
        path: '/admin/products/:id(\\id+)/edit',
        name: 'admin.products.edit',
        component: ProductEdit,
        meta : {
            middleware : "admin",
            layout : "AdminLayout"
        }
    },
    {
        path: '/admin/orders',
        name: 'admin.orders',
        component: Orders,
        meta : {
            middleware : "admin",
            layout : "AdminLayout"
        }
    },
    {
        path: '/admin/orders',
        name: 'admin.orders',
        component: Orders,
        meta : {
            middleware : "admin",
            layout : "AdminLayout"
        }
    },
    {
        path: '/admin/orders/:id(\\d+)',
        name: 'admin.orders.order',
        component: Order,
        meta : {
            middleware : "admin",
            layout : "AdminLayout"
        }
    },
    {
        path: '/admin/customers',
        name: 'admin.customers',
        component: Customers,
        meta : {
            middleware : "admin",
            layout : "AdminLayout"
        }
    },
    {
        path: '/admin/customers/:id(\\d+)',
        name: 'admin.customers.customer',
        component: Customer,
        meta : {
            middleware : "admin",
            layout : "AdminLayout"
        }
    }



];

export default routes
