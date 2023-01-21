using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace EmployeeRequest.Repository
{
    public class CompanyRepository
    {
        public static List<COMPANY> GetAllCompanies()
        {
            using (var context = new RaadeenSiteEntities())
            {
                var result = context.COMPANies.Include(t=>t.COMP_PRODUCT).ToList();
                return result;
            }
        }

        public static COMPANY GetCompany(string CompCode)
        {
            using (var context = new RaadeenSiteEntities())
            {
                var result = context.COMPANies.Where(t => t.COMP_CODE == CompCode).FirstOrDefault();
                return result;
            }
        }

        public static bool AddCompany(COMPANY company)
        {
            // insert
            using (var db = new RaadeenSiteEntities())
            {
                var companyDbSet = db.Set<COMPANY>();
                companyDbSet.Add(company);
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

        public static bool ModifyCompany(COMPANY company)
        {
            // modify
            using (var db = new RaadeenSiteEntities())
            {
                db.COMPANies.Attach(company);
                db.Entry(company).State = EntityState.Modified;
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

        public static bool RemoveCompany(COMPANY company)
        {
            // remove
            using (var db = new RaadeenSiteEntities())
            {
                //var customers = db.Set<USER>();
                db.Configuration.ValidateOnSaveEnabled = false;
                db.COMPANies.Attach(company);
                db.Entry(company).State = EntityState.Deleted;
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
    }
}