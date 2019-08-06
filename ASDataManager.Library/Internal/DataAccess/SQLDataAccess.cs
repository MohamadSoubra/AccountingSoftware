using Dapper;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ASDataManager.Library.Internal.DataAccess
{
    internal class SQLDataAccess
    {
        public string GetConnectionString(string name)
        {
            return ConfigurationManager.ConnectionStrings[name].ConnectionString;
        }

        public List<T> LoadData<T,U>(string StoredProcedure, U parameters, string connectionStringName)
        {
            string connectionString = GetConnectionString(connectionStringName);
            using (IDbConnection connection = new SqlConnection(connectionString))
            {
                List<T> rows = connection.Query<T>(StoredProcedure, parameters, 
                    commandType: CommandType.StoredProcedure).ToList();

                return rows;
            }

        }

        public void SaveData<T>(string StoredProcedure, T parameters, string connectionStringName)
        {
            string connectionString = GetConnectionString(connectionStringName);

            using (IDbConnection connection = new SqlConnection(connectionString))
            {
                connection.Execute(StoredProcedure, parameters, commandType: CommandType.StoredProcedure);
            }
        }
    }
}
