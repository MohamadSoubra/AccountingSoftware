using System;
using System.Collections.Generic;
using System.Text;

namespace ASDataManager.Library.Models
{
    public class InvoiceModel
    {
        public int Id { get; set; }
        public string InvoiceNumber { get; set; }
        public ClientModel Client { get; set; }
        public SaleDBModel Sale { get; set; }
        public List<SaleDetailModel> SaleDetails { get; set; }
        public string Description { get; set; }
        public DateTime? InvoiceDate { get; set; }
        public DateTime? PaymentDueDate { get; set; }
        public decimal AmountDue { get; set; }
        public string Status { get; set; }
    }
}
