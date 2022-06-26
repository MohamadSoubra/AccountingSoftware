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
    public class ProductData : IProductData
    {
        private readonly ISQLDataAccess _sql;

        public ProductData(ISQLDataAccess sql)
        {
            _sql = sql;
        }

        public List<ProductModel> GetProducts()
        {
            var output = _sql.LoadData<ProductModel, dynamic>("dbo.spProduct_GetAll", new { }, "ASDatabase");

            return output;
        }

        public ProductModel GetProductById(int productId)
        {
            var output = _sql.LoadData<ProductModel, dynamic>("dbo.spProduct_GetById", new { Id = productId }, "ASDatabase").FirstOrDefault();

            return output;
        }

        //TODO: Check if that method is made by me or by IAMTIMCOREY
        public void PostProducts(List<ProductModel> products)
        {

            //foreach (var product in products)
            //{
            //    //_sql.SaveData<ProductModel>("dbo.spProduct_Insert", new {ProductName = product.ProductName, Description = product.Description, RetailPrice= product.RetailPrice, QuantityInStock = product.QuantityInStock}, "ASDatabase");
            //    _sql.SaveData<object>("dbo.spProduct_Insert", new {product.ProductName, product.Description, product.RetailPrice, product.QuantityInStock, product.IsTaxable}, "ASDatabase");

            //}
            _sql.SaveData<object>("dbo.spProduct_Insert", products, "ASDatabase");
        }

        public void DeleteProducts(int[] IDs)
        {
            _sql.SaveData<object>("dbo.spProduct_Delete", new { Ids = String.Join(",", IDs) }, "ASDatabase");

        }
    }
}
