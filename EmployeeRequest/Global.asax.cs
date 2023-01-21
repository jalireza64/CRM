using System;
using System.Configuration;
using System.Globalization;
using System.Linq;
using System.Threading;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;
using EmployeeRequest.Infrastracture.BootStrapper;

namespace EmployeeRequest
{
    public class MvcApplication : HttpApplication
    {
        #region Application Methods

        protected void Application_PreSendRequestHeaders()
        {
            Response.Headers.Remove("Server");
            Response.Headers.Remove("X-AspNet-Version");
            Response.Headers.Remove("X-AspNetMvc-Version");
        }

        protected void Application_Start()
        {
            
            MvcHandler.DisableMvcResponseHeader = true;

            AreaRegistration.RegisterAllAreas();
            FilterConfig.RegisterGlobalFilters(GlobalFilters.Filters);
            RouteConfig.RegisterRoutes(RouteTable.Routes);

            // Disable Asp.Net Mvc Handler On Response Header
            MvcHandler.DisableMvcResponseHeader = true;
        }

        //protected void Application_PreSendRequestHeaders()
        //{
        //    Response.Headers.Remove("Server");
        //    Response.Headers.Remove("X-AspNet-Version"); 
        //}


        public void Session_OnStart()
        {
                if (Request.IsSecureConnection)
                {
                    var httpCookie = Response.Cookies["ASP.NET_SessionId"];
                    if (httpCookie != null)
                        httpCookie.Secure = true;
                }

            Session["appCulture"] = 0;
        }

        private void Session_End()
        {
            Session["appCulture"] = null;
        }

        protected void Application_AcquireRequestState(object sender, EventArgs e)
        {
                var cultureInfo = new CultureInfo("fa-IR");
                Thread.CurrentThread.CurrentUICulture = cultureInfo;
                Thread.CurrentThread.CurrentCulture = CultureInfo.CreateSpecificCulture(cultureInfo.Name);
                Thread.CurrentThread.CurrentCulture.NumberFormat.NumberDecimalSeparator = ".";
                CheckSessionHijacking();
        }

        private void CheckSessionHijacking()
        {

            var sessionIpAddress = string.Empty;

            if (HttpContext.Current.Session == null)
                return;

            var encryptedString = Convert.ToString(Session["encryptedSession"]);
            var encodedAsBytes = Convert.FromBase64String(encryptedString);
            var decryptedString = System.Text.Encoding.ASCII.GetString(encodedAsBytes);
            var separator = new[] { '^' };

            if (!string.IsNullOrEmpty(decryptedString))
            {
                var splitStrings = decryptedString.Split(separator);
                if (splitStrings.Any())
                {
                    if (splitStrings[2].Any())
                    {
                        var userBrowserInfo = splitStrings[2].Split('~');
                        if (userBrowserInfo.Any())
                            sessionIpAddress = userBrowserInfo[1];
                    }
                }
            }

            var currentUseripAddress = string.IsNullOrEmpty(Request.ServerVariables["HTTP_X_FORWARDED_FOR"]) ?
                Request.ServerVariables["REMOTE_ADDR"] :
                Request.ServerVariables["HTTP_X_FORWARDED_FOR"].Split(",".ToCharArray(), StringSplitOptions.RemoveEmptyEntries).FirstOrDefault();


            //System.Net.IPAddress result;
            //if (currentUseripAddress != null && !System.Net.IPAddress.TryParse(currentUseripAddress, out result))
            //    result = System.Net.IPAddress.None;


            if (string.IsNullOrEmpty(sessionIpAddress))
                return;

            if (sessionIpAddress == currentUseripAddress)
                return;

            //Same way we can validate browser info also...
            //string currentBrowserInfo = Request.Browser.Browser + Request.Browser.Version + Request.UserAgent;
            Session.RemoveAll();
            Session.Clear();
            Session.Abandon();

            var httpCookie = Response.Cookies["ASP.NET_SessionId"];
            if (httpCookie != null)
                httpCookie.Expires = DateTime.Now.AddSeconds(-30);

            Response.Cookies.Add(new HttpCookie("ASP.NET_SessionId", ""));
            Response.Redirect(@"~/home/index");
        }


        #endregion
    }
}