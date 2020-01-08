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
    public class InventoryData
    {
        private readonly IConfiguration _config;

        public InventoryData(IConfiguration config)
        {
            _config = config;
        }

        public List<InventoryModel> GetInventory()
        {
            SQLDataAccess sql = new SQLDataAccess(_config);
            var output = sql.LoadData<InventoryModel, dynamic>("dbo.spInventory_GetAll", new { }, "ASDatabase");
            return output;
        }

        public void SaveInventoryRecord(InventoryModel item)
        {
            SQLDataAccess sql = new SQLDataAccess(_config);
            sql.SaveData("dbo.spInventory_Insert", item, "ASDatabase");
        }
    }
}
