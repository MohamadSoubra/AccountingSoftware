using ASDataManager.Library.Internal.DataAccess;
using ASDataManager.Library.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ASDataManager.Library.DataAccess
{
    public class InventoryData
    {
        public List<InventoryModel> GetInventory()
        {
            SQLDataAccess sql = new SQLDataAccess();
            var output = sql.LoadData<InventoryModel, dynamic>("dbo.spInventory_GetAll", new { }, "ASDatabase");
            return output;
        }

        public void SaveInventoryRecord(InventoryModel item)
        {
            SQLDataAccess sql = new SQLDataAccess();
            sql.SaveData("dbo.spInventory_Insert", item, "ASDatabase");
        }
    }
}
