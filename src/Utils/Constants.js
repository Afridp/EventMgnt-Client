
import CustomerRoutes from "../Routes/Customer/CustomerRoutes";
import EmployeeRoutes from "../Routes/Employee/EmployeeRoutes";
import ManagerRoute from "../Routes/Manager/ManagerRoutes";
import TenantCommonRoutes from "../Routes/TenantCommon/TenantCommonRoutes";

export const APPS = [
    {
        subdomain: "www",
        app: TenantCommonRoutes,
        main: true
    },
    {
        subdomain: "manager",
        app: ManagerRoute,
        main: false
    },
    {
        subdomain: "customer",
        app: CustomerRoutes,
        main: false
    },
    {
        subdomain: "employee",
        app: EmployeeRoutes,
        main: false
    }
]