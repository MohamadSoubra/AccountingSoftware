using System;
using System.Collections.Generic;
using System.Text;

namespace ASDataManager.Library.Models
{
    public class InvoiceDBModel
    {
        public int Id { get; set; }
        public string InvoiceNumber { get; set; }
        public int ClientId { get; set; }
        public string Description { get; set; }
        public DateTime InvoiceDate { get; set; }
        public DateTime PaymentDueDate { get; set; }
        public decimal AmountDue { get; set; }
        public string Status { get; set; }
    }
}
