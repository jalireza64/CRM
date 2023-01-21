using EmployeeRequest.Infrastracture.Config;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace EmployeeRequest.Areas.RM.Controllers.Shared
{
    public class SharedController : Controller
    {
        [HttpPost]
        public virtual ActionResult GetCompanyName()
        {
            var result = "شرکت رادین انفورماتیک";
            return Json(result);
        }

        [HttpPost]
        public virtual ActionResult GetFinalCustomerName()
        {
            string result = AppSetting.GetFinalCustomerName();
            return Json(result);
        }

        [HttpPost]
        public virtual ActionResult GetVersion()
        {
            System.Reflection.Assembly assembly = System.Reflection.Assembly.GetExecutingAssembly();
            FileVersionInfo fvi = FileVersionInfo.GetVersionInfo(assembly.Location);
            string result = fvi.FileVersion;
            return Json(result);
        }
    }
}