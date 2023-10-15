using ASDataManager.Library.Models;
using System.Collections.Generic;

namespace ASDataManager.Library.DataAccess
{
    public interface IInvoiceData
    {
        List<InvoiceModel> GetAllInvoices();
        InvoiceModel GetInvoiceById(int id);
        List<SaleDetailModel> GetInvoiceSaleDetails(int id);
        void SaveInvoiceRecord(InvoiceModel invoice, string cashierId, bool update = false);
        void DeleteInvoiceRecord(int id);
        void DeleteSaleDetails(List<string> Ids);
        
    }
}