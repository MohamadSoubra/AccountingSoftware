using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ASDataManager.Library.Models
{
    public class SaleDetailDBModel
    {
        //public int SaleId { get; set; }
        public int ProductId { get; set; }
        public int? InvoiceId { get; set; }
        public int Quantity { get; set; }
        public string Description { get; set; }
        public decimal UnitPrice { get; set; }
        public decimal Tax { get; set; }
        public decimal Total { get; set; }

    }
}
