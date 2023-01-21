using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace EmployeeRequest.Repository
{
    public class SaleUserRepository
    {
        public static List<SALE_USERS> GetAllSaleUsers()
        {
            using (var context = new RaadeenSiteEntities())
            {
                var result = context.SALE_USERS.ToList();
                return result;
            }
        }
    }
}