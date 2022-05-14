import Profile from '../Components/Customer/profile'
import Orders from '../Components/Customer/orders'

const routes = [
    {
        path : '/customer',
        name : 'customer',
        component : Profile,
        meta : {
            layout : 'CustomerLayout'
        }
    },
    {
        path : 'customer/:id(\\d+)/orders',
        name : 'customer.orders',
        component : Orders,
        meta : {
            layout  : 'CustomerLayout'
        }
    }
]

export default routes
