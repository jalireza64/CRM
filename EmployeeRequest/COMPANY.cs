//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace EmployeeRequest
{
    using System;
    using System.Collections.Generic;
    
    public partial class COMPANY
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public COMPANY()
        {
            this.COMP_PRODUCT = new HashSet<COMP_PRODUCT>();
        }
    
        public string COMP_CODE { get; set; }
        public string DESC1 { get; set; }
        public string CEO { get; set; }
        public string TEL_NO_1 { get; set; }
        public string TEL_NO_2 { get; set; }
        public string FAX_NO { get; set; }
        public string CELL_PHONE { get; set; }
        public string RESP_NAME { get; set; }
        public string E_MAIL { get; set; }
        public string WEBSITE { get; set; }
        public string ADDRESS { get; set; }
        public string CONSISTENCE_USER { get; set; }
        public string USER_ID { get; set; }
        public System.DateTime UPDATE_DATE { get; set; }
    
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<COMP_PRODUCT> COMP_PRODUCT { get; set; }
        public virtual SALE_USERS SALE_USERS { get; set; }
        public virtual SALE_USERS SALE_USERS1 { get; set; }
    }
}