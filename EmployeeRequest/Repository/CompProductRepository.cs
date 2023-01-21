using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace EmployeeRequest.Repository
{
    public class CompProductRepository
    {
        public static bool ModifyCompProduct(string compCode, List<string> prdIdList)
        {
            using (var db = new RaadeenSiteEntities())
            {
                db.Configuration.ValidateOnSaveEnabled = false;

                //delete

                var deletedCompProducts = db.COMP_PRODUCT.Where(t => t.COMP_CODE == compCode).ToList();
                foreach (COMP_PRODUCT compProduct in deletedCompProducts)
                {
                    var saleDetailList = db.SALE_DETAIL.Where(t => t.COMP_CODE == compProduct.COMP_CODE && t.PRD_ID == compProduct.PRD_ID).ToList();
                    if(saleDetailList.Count == 0)
                    {
                        db.COMP_PRODUCT.Attach(compProduct);
                        db.Entry(compProduct).State = EntityState.Deleted;
                    }
                }
                var deletedCompProductResult = db.SaveChanges();
                db.Dispose();
            }
            if (prdIdList != null)
            {
                using (var db = new RaadeenSiteEntities())
                {
                    //add
                    foreach (string prdId in prdIdList)
                    {
                        var availableCompProducts = db.COMP_PRODUCT.Where(t => t.COMP_CODE == compCode && t.PRD_ID == prdId).ToList();

                        if (!availableCompProducts.Any())
                        {
                            var compProductObject = new COMP_PRODUCT
                            {
                                COMP_CODE = compCode,
                                PRD_ID = prdId
                            };

                            db.COMP_PRODUCT.Attach(compProductObject);
                            db.Entry(compProductObject).State = EntityState.Added;
                        }
                    }

                    var compProductResult = db.SaveChanges();
                    db.Dispose();
                    if (compProductResult > 0)
                    {
                        return true;
                    }
                    else
                    {
                        return false;
                    }
                }
            }
            else
            {
                return true;
            }
        }
    }
}