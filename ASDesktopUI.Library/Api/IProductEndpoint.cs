using System.Collections.Generic;
using System.Threading.Tasks;
using ASDesktopUI.Library.Models;

namespace ASDesktopUI.Library.Api
{
    public interface IProductEndpoint
    {
        Task<List<ProductModel>> GetAll();
    }
}