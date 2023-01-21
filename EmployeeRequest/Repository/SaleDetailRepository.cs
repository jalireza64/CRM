using EmployeeRequest.Infrastracture.Enums;
using EmployeeRequest.Infrastracture.Helpers;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace EmployeeRequest.Repository
{
    public class SaleDetailRepository
    {
        public class NotFollowUpType
        {
            public String CONSISTENCE_USER { get; set; }
            public String DESC1 { get; set; }
            public Int32 DATE_DIFF { get; set; }
        }

        public static List<NotFollowUpType> GetNotFollowUpCompany()
        {
            using (var context = new RaadeenSiteEntities())
            {
                var result = context.Database.SqlQuery<NotFollowUpType>("select t3.NAME +' '+t3.SURNAME CONSISTENCE_USER,t2.DESC1,t2.COMP_CODE,DATEDIFF(day, dbo.f_date_s2m(MAX(f_date)), GETDATE()) DATE_DIFF from SALE_DETAIL t1 left join COMPANY t2 on t1.COMP_CODE = t2.COMP_CODE left join SALE_USERS t3 on t2.CONSISTENCE_USER = t3.USER_ID group by t3.NAME + ' ' + t3.SURNAME, t2.DESC1, t2.COMP_CODE having DATEDIFF(day, dbo.f_date_s2m(MAX(f_date)), GETDATE()) > 3 and t2.COMP_CODE not in (select COMP_CODE from SALE_DETAIL where state in (8, 7) group by COMP_CODE, STATE)");

                return result.ToList();
            }
        }



        public static List<SALE_DETAIL> GetAllSaleDetails()
        {
            using (var context = new RaadeenSiteEntities())
            {
                var result = context.SALE_DETAIL.Include(t=>t.SALE_USERS).ToList();
                return result;
            }
        }

        public static bool AddSaleDetail(SALE_DETAIL saleDetail)
        {
            // insert
            using (var db = new RaadeenSiteEntities())
            {
                var saleDetailDbSet = db.Set<SALE_DETAIL>();
                saleDetailDbSet.Add(saleDetail);
                var result = db.SaveChanges();
                if (result > 0)
                {
                    return true;
                }
                else
                {
                    return false;
                }
            }
        }

        public static bool RemoveSaleDetail(SALE_DETAIL saleDetail)
        {
            // remove
            using (var db = new RaadeenSiteEntities())
            {
                //var customers = db.Set<USER>();
                db.Configuration.ValidateOnSaveEnabled = false;
                db.SALE_DETAIL.Attach(saleDetail);
                db.Entry(saleDetail).State = EntityState.Deleted;
                var result = db.SaveChanges();
                if (result > 0)
                {
                    return true;
                }
                else
                {
                    return false;
                }
            }
        }

        public static Dictionary<int, string> GetAllSaleStates()
        {
            var dict = new Dictionary<int, string>();
            foreach (var name in Enum.GetNames(typeof(SaleState)))
            {
                dict.Add((int)Enum.Parse(typeof(SaleState), name), ((SaleState)(int)Enum.Parse(typeof(SaleState), name)).GetDescription());
            }
            return dict;
        }
    }
}