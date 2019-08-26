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
    internal class SQLDataAccess : IDisposable
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

        private IDbConnection _connection;
        private IDbTransaction _transaction;
        
        public void StartTransaction(string connectionStringName)
        {
            string connectionstring = GetConnectionString(connectionStringName);

            _connection = new SqlConnection(connectionstring);
            _connection.Open();

            _transaction = _connection.BeginTransaction();
        }

        public List<T> LoadDataInTransaction<T, U>(string StoredProcedure, U parameters)
        {
            List<T> rows = _connection.Query<T>(StoredProcedure, parameters,
                commandType: CommandType.StoredProcedure, transaction: _transaction).ToList();

            return rows;
            
        }

        public void SaveDataInTransaction<T>(string StoredProcedure, T parameters)
        {
            _connection.Execute(StoredProcedure, parameters, 
                                commandType: CommandType.StoredProcedure, 
                                transaction: _transaction);
        }


        public void CommitTransaction()
        {
            _transaction?.Commit();
            _connection?.Close();
        }

        public void RollbackTransaction()
        {
            _transaction?.Rollback();
            _connection?.Close();
        }

        public void Dispose()
        {
            CommitTransaction();
        }
        // Open Connection/Strat transaction method
        // load using the transaction
        // save using the transaction
        // Close Connection/stop trasnaction
        // Dispose

    }
}
