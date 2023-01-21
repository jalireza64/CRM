using App_Resources;
using EmployeeRequest.Infrastracture.BaseClasses;
using EmployeeRequest.Infrastracture.Enums;
using EmployeeRequest.Repository;
using EmployeeRequest.ViewModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace EmployeeRequest.Areas.RM.Controllers.Pages.Company
{
    public class CompanyController : BaseController
    {
        public virtual ActionResult getAllCompanies()
        {
            var result = CompanyRepository.GetAllCompanies();
            if (result == null)
                return Json(ResponseType.Failed, MessagesLibrary.OperationFailed);
            var output = new JsonResult();
            output.Data = result.Select(t=>new {t.COMP_CODE,t.DESC1,t.CEO,t.TEL_NO_1,t.TEL_NO_2,t.FAX_NO,t.CELL_PHONE,t.RESP_NAME,t.E_MAIL,t.WEBSITE,t.ADDRESS,t.CONSISTENCE_USER, ProductIds = t.COMP_PRODUCT.Select(c => c.PRD_ID).ToList() });
            output.MaxJsonLength = int.MaxValue;
            return output;
        }

        [HttpPost]
        public virtual ActionResult addCompany(COMPANY Company)
        {
            var loginResult = Session["LoginResult"] as LoginResultModel;
            Company.USER_ID = loginResult.UserId;
            //Company.CONSISTENCE_USER = loginResult.UserId;
            Company.UPDATE_DATE = DateTime.Now;
            var result = CompanyRepository.AddCompany(Company);
            if (!result)
                return Json(ResponseType.Failed, MessagesLibrary.OperationFailed);
            return Json(ResponseType.Ok, MessagesLibrary.OperationSuccessed);
        }

        [HttpPost]
        public virtual ActionResult modifyCompany(COMPANY Company)
        {
            var loginResult = Session["LoginResult"] as LoginResultModel;
            Company.USER_ID = loginResult.UserId;
            //Company.CONSISTENCE_USER = loginResult.UserId;
            Company.UPDATE_DATE = DateTime.Now;
            var result = CompanyRepository.ModifyCompany(Company);
            if (!result)
                return Json(ResponseType.Failed, MessagesLibrary.OperationFailed);
            return Json(ResponseType.Ok, MessagesLibrary.OperationSuccessed);
        }

        [HttpPost]
        public virtual ActionResult removeCompany(string CompCode)
        {
            var company = new COMPANY
            {
                COMP_CODE = CompCode
            };
            var result = CompanyRepository.RemoveCompany(company);
            if (!result)
                return Json(ResponseType.Failed, MessagesLibrary.OperationFailed);
            return Json(ResponseType.Ok, MessagesLibrary.OperationSuccessed);
        }

        [HttpPost]
        public virtual ActionResult getAllProducts()
        {
            var result = ProductsRepository.GetAllProducts();
            if (result == null)
                return Json(ResponseType.Failed, MessagesLibrary.OperationFailed);
            var output = new JsonResult();
            output.Data = result.Select(t => new { t.PRD_ID, t.SOFT_NAME });
            output.MaxJsonLength = int.MaxValue;
            return output;
        }

        [HttpPost]
        public virtual ActionResult modifyCompProduct(string compCode, List<string> prdIdList)
        {
            var result = CompProductRepository.ModifyCompProduct(compCode, prdIdList);
            if (!result)
                return Json(ResponseType.Failed, MessagesLibrary.OperationFailed);
            return Json(ResponseType.Ok, MessagesLibrary.OperationSuccessed);
        }

        [HttpPost]
        public virtual ActionResult getAllSaleusers()
        {
            var result = SaleUserRepository.GetAllSaleUsers();
            if (result == null)
                return Json(ResponseType.Failed, MessagesLibrary.OperationFailed);
            var output = new JsonResult();
            output.Data = result.Select(t => new { t.USER_ID, FULLNAME = t.NAME +" "+t.SURNAME });
            output.MaxJsonLength = int.MaxValue;
            return output;
        }

    }
}