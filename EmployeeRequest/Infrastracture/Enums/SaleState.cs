using System.ComponentModel;

namespace EmployeeRequest.Infrastracture.Enums
{
    public enum SaleState
    {
        [Description("مذاکره اولیه")]
        FirstNegotiation = 1,

        [Description("دموی نرم افزار")]
        SoftwareDemo = 2,

        [Description("ارسال پیش فاکتور")]
        PreFactorSending = 3,

        [Description("ارسال قرارداد")]
        ContractSending = 4,

        [Description("امضا قرارداد")]
        ContractSign = 5,

        [Description("ارسال فاکتور")]
        FactorSending = 6,

        [Description("پرداخت مبلغ")]
        PaymentAmount = 7,

        [Description("متوقف شده")]
        Suspended = 8,
    }
}