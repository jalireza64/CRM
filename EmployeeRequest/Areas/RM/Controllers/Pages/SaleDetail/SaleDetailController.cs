using App_Resources;
using EmployeeRequest.Infrastracture.BaseClasses;
using EmployeeRequest.Infrastracture.Enums;
using EmployeeRequest.Infrastracture.Helpers;
using EmployeeRequest.Repository;
using EmployeeRequest.ViewModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace EmployeeRequest.Areas.RM.Controllers.Pages.SaleDetail
{
    public class SaleDetailController : BaseController
    {
        [HttpPost]
        public virtual ActionResult getAllSaleDetails(string COMP_CODE, string PRD_ID)
        {
            var result = SaleDetailRepository.GetAllSaleDetails().Where(t => t.COMP_CODE == COMP_CODE && t.PRD_ID == PRD_ID);
            if (result == null)
                return Json(ResponseType.Failed, MessagesLibrary.OperationFailed);
            var output = new JsonResult();
            output.Data = result.Select(t => new { t.DET_ID, t.DESC1, F_DATE = DateTimeHelper.ToPersianDateFormat(t.F_DATE),FOLLOW_DATE = t.FOLLOW_DATE == null ? null : DateTimeHelper.ToPersianDateFormat(t.FOLLOW_DATE), STATE = GetSaleStateEnumName(Convert.ToInt32(t.STATE)), t.FEE,FULLNAME = t.SALE_USERS.NAME +" "+ t.SALE_USERS.SURNAME });
            output.MaxJsonLength = int.MaxValue;
            return output;
        }

        [HttpPost]
        public virtual ActionResult addSaleDetail(SALE_DETAIL saleDetail)
        {
            var loginResult = Session["LoginResult"] as LoginResultModel;
            saleDetail.F_DATE = saleDetail.F_DATE.Replace("/", "");
            saleDetail.FOLLOW_DATE = saleDetail.FOLLOW_DATE != null ? saleDetail.FOLLOW_DATE.Replace("/", "") : null;
            saleDetail.USER_ID = loginResult.UserId;
            saleDetail.UPDATE_DATE = DateTime.Now;


            var result = SaleDetailRepository.AddSaleDetail(saleDetail);
            if (!result)
                return Json(ResponseType.Failed, MessagesLibrary.OperationFailed);
            return Json(ResponseType.Ok, MessagesLibrary.OperationSuccessed);
        }

        [HttpPost]
        public virtual ActionResult removeSaleDetail(decimal DetId)
        {
            var saleDetail = new SALE_DETAIL
            {
                DET_ID = DetId
            };
            var result = SaleDetailRepository.RemoveSaleDetail(saleDetail);
            if (!result)
                return Json(ResponseType.Failed, MessagesLibrary.OperationFailed);
            return Json(ResponseType.Ok, MessagesLibrary.OperationSuccessed);
        }

        [HttpPost]
        public virtual ActionResult GetAllSaleStates()
        {
            var result = SaleDetailRepository.GetAllSaleStates();
            if (result == null)
                return Json(ResponseType.Failed, MessagesLibrary.OperationFailed);
            return Json(result.Select(t => new { t.Key, t.Value }));
        }

        public static string GetSaleStateEnumName(int? id)
        {
            if (id.HasValue)
            {
                var dict = new Dictionary<int, string>();
                foreach (var name in Enum.GetNames(typeof(SaleState)))
                {
                    dict.Add((int)Enum.Parse(typeof(SaleState), name), ((SaleState)(int)Enum.Parse(typeof(SaleState), name)).GetDescription());
                }
                var description = dict.Where(t => t.Key == id).Select(t => t.Value).FirstOrDefault();
                return description;
            }
            else
            {
                return "";
            }

        }

        [HttpPost]
        public virtual ActionResult getCompanyInfo(string COMP_CODE)
        {
            var compObject = CompanyRepository.GetCompany(COMP_CODE);
            if (compObject == null)
                return Json(ResponseType.Failed, MessagesLibrary.OperationFailed);
            var output = new JsonResult();
            var result = new
            {
                compObject.ADDRESS,
                compObject.CELL_PHONE,
                compObject.CEO,
                compObject.DESC1,
                compObject.E_MAIL,
                compObject.FAX_NO,
                compObject.RESP_NAME,
                compObject.TEL_NO_1,
                compObject.TEL_NO_2,
                compObject.WEBSITE,
            };
            output.Data = result;
            output.MaxJsonLength = int.MaxValue;
            return output;
        }
    }
}