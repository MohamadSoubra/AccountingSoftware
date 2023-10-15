using ASDataManager.Library.Models;
using System.Collections.Generic;

namespace ASDataManager.Library.DataAccess
{
    public interface ISaleData
    {
        List<SaleReportModel> GetSaleReport();
        void SaveSale(List<SaleDetailModel> saleInfo, string cashierId);
        void DeleteSaleDetails(List<string> Ids);
        void UpdateSaleDetails(List<SaleDetailModel> saleDetails, string cashierId, int InvoiceID);
    }

}