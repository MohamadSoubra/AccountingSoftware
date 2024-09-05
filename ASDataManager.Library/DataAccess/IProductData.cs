using ASDataManager.Library.Models;
using System.Collections.Generic;

namespace ASDataManager.Library.DataAccess
{
    public interface IProductData
    {
        ProductModel GetProductById(int productId);
        List<ProductModel> GetProducts();
        void PostProduct(ProductModel product, bool Update = false);

        void DeleteProducts(int[] Ids);
    }
}