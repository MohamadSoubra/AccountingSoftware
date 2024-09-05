using ASDataManager.Library.Internal.DataAccess;
using ASDataManager.Library.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace ASDataManager.Library.DataAccess
{
    public class SupplierData : ISupplierData
    {
        private readonly ISQLDataAccess _sql;

        public SupplierData(ISQLDataAccess sql)
        {
            _sql = sql;
        }

        public List<SupplierModel> GetSuppliers()
        {
            var output = _sql.LoadData<SupplierModel, dynamic>("dbo.spSupplier_GetAll", new { }, "ASDatabase");

            return output;
        }

        public SupplierModel GetSupplierById(int SupplierId)
        {
            var output = _sql.LoadData<SupplierModel, dynamic>("dbo.spSupplier_GetById", new { Id = SupplierId }, "ASDatabase").FirstOrDefault();

            return output;
        }

        public void PostSuppliers(SupplierModel Supplier, bool Update)
        {

            if (Update == false)
            {
                _sql.SaveData<object>("dbo.spSupplier_Insert", new { Supplier.AccountNumber, Supplier.CompanyName, Supplier.ContactName, Supplier.EmailAddress, Supplier.Address, Supplier.PhoneNumber, Supplier.Country, Supplier.City }, "ASDatabase");
            }
            else
            {
                _sql.SaveData<object>("dbo.spSupplier_Update", new { Supplier.Id, Supplier.AccountNumber, Supplier.CompanyName, Supplier.ContactName, Supplier.EmailAddress, Supplier.Address, Supplier.PhoneNumber, Supplier.Country, Supplier.City }, "ASDatabase");
            }
        }
    }
}
