using System.Threading.Tasks;
using ASDesktopUI.Library.Models;

namespace ASDesktopUI.Library.Api
{
    public interface ISaleEndpoint
    {
        Task postSale(SaleModel sale);
    }
}