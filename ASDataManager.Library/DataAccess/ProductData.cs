using ASDataManager.Library.Internal.DataAccess;
using ASDataManager.Library.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ASDataManager.Library.DataAccess
{
    public class ProductData
    {
        public List<ProductModel> GetProducts()
        {
            SQLDataAccess sql = new SQLDataAccess();

            var output = sql.LoadData<ProductModel, dynamic>("dbo.spProduct_GetAll", new { }, "ASDatabase");

            return output;
        }

        public ProductModel GetProductById(int productId)
        {
            SQLDataAccess sql = new SQLDataAccess();

            var output = sql.LoadData<ProductModel, dynamic>("dbo.spProduct_GetById", new { Id = productId }, "ASDatabase").FirstOrDefault();

            return output;
        }
    }
}
