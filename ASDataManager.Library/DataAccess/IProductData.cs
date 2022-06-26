using ASDataManager.Library.Models;
using System.Collections.Generic;

namespace ASDataManager.Library.DataAccess
{
    public interface IProductData
    {
        ProductModel GetProductById(int productId);
        List<ProductModel> GetProducts();
        void PostProducts(List<ProductModel> products);

        void DeleteProducts(int[] Ids);
    }
}