import adminRoutes from '../routes/admin'
import publicRoutes from '../routes/public'
import customeRoutes from '../routes/customer'

const routes = [...adminRoutes,...publicRoutes,...customeRoutes]

export default routes
