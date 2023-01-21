using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Configuration;

namespace EmployeeRequest.Infrastracture.Config
{
    public class AppSetting
    {
        public static string GetFinalCustomerName()
        {
            string result = WebConfigurationManager.AppSettings["FinalCustomerName"];
            return result;
        }
    }
}