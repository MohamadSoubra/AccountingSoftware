using ASDataManager.Library.Models;
using System.Collections.Generic;

namespace ASDataManager.Library.DataAccess
{
    public interface ISupplierData
    {
        SupplierModel GetSupplierById(int SupplierId);
        List<SupplierModel> GetSuppliers();
        void PostSuppliers(SupplierModel Supplier, bool Update = false);
    }
}