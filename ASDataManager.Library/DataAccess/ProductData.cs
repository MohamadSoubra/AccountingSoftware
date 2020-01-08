using ASDataManager.Library.Internal.DataAccess;
using ASDataManager.Library.Models;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ASDataManager.Library.DataAccess
{
    public class ProductData
    {
        private readonly IConfiguration _config;

        public ProductData(IConfiguration config)
        {
            _config = config;
        }

        public List<ProductModel> GetProducts()
        {
            SQLDataAccess sql = new SQLDataAccess(_config);

            var output = sql.LoadData<ProductModel, dynamic>("dbo.spProduct_GetAll", new { }, "ASDatabase");

            return output;
        }

        public ProductModel GetProductById(int productId)
        {
            SQLDataAccess sql = new SQLDataAccess(_config);

            var output = sql.LoadData<ProductModel, dynamic>("dbo.spProduct_GetById", new { Id = productId }, "ASDatabase").FirstOrDefault();

            return output;
        }
    }
}
