using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace EmployeeRequest.Repository
{
    public class ProductsRepository
    {
        public static List<PRODUCT> GetAllProducts()
        {
            using (var context = new RaadeenSiteEntities())
            {
                var result = context.PRODUCTS.ToList();
                return result;
            }
        }
    }
}