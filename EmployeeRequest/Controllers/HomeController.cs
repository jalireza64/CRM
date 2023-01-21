using System;
using System.Web.Mvc;
using App_Resources;
using EmployeeRequest.Infrastracture.BaseClasses;
using EmployeeRequest.Infrastracture.Enums;
using EmployeeRequest.Infrastracture.Helpers;
using System.Linq;
using EmployeeRequest.Repository;

namespace EmployeeRequest.Controllers
{

    public partial class HomeController : BaseController
    {
        #region HttpGet Methods
        public virtual ActionResult Index()
        {
            return View();
        }

        #endregion

        [HttpPost]
        public virtual ActionResult GetCurrentDate()
        {
            var currentDate = DateTimeHelper.ToPersianDateString(DateTime.Now);
            var beginOfMonthDate = DateTimeHelper.ToBeginOfMonth(DateTime.Now);
            var beginOfYearDate = DateTimeHelper.ToBeginOfYear(DateTime.Now);
            var result = new
            {
                currentDate,
                beginOfMonthDate,
                beginOfYearDate
            };

            if (result == null)
                return Json(ResponseType.Failed, MessagesLibrary.OperationFailed);
            return Json(result);
        }


        [HttpPost]
        public virtual ActionResult GetLoginResult()
        {
            var loginResult = Session["LoginResult"];         
            return Json(loginResult);
        }

        [HttpPost]
        public virtual ActionResult GetNotFollowUpCompanyCount()
        {
            var items = SaleDetailRepository.GetNotFollowUpCompany().Count();
            return Json(items);
        }

        [HttpPost]
        public virtual ActionResult GetNotFollowUpCompany()
        {
            var items = SaleDetailRepository.GetNotFollowUpCompany();
            return Json(items);
        }
    }
}

