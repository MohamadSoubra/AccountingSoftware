using ASDataManager.Library.Models;
using System.Collections.Generic;

namespace ASDataManager.Library.DataAccess
{
    public interface IInvoiceData
    {
        List<InvoiceDBModel> GetAllInvoices();
        InvoiceDBModel GetInvoiceById(int id);
        void SaveInvoiceRecord(InvoiceModel invoice, string cashierId);
    }
}