using Dapper;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace ASDataManager.Library.Internal.DataAccess
{
    public class SQLDataAccess : IDisposable, ISQLDataAccess
    {
        public SQLDataAccess(IConfiguration config, ILogger<SQLDataAccess> logger)
        {
            _config = config;
            _logger = logger;
        }
        public string GetConnectionString(string name)
        {
            return _config.GetConnectionString(name);
        }

        public List<T> LoadData<T, U>(string StoredProcedure, U parameters, string connectionStringName)
        {
            string connectionString = GetConnectionString(connectionStringName);
            using (IDbConnection connection = new SqlConnection(connectionString))
            {
                List<T> rows = connection.Query<T>(StoredProcedure, parameters,
                    commandType: CommandType.StoredProcedure).ToList();

                return rows;
            }

        }

        public int SaveData<T>(string StoredProcedure, T parameters, string connectionStringName)
        {
            string connectionString = GetConnectionString(connectionStringName);

            using (IDbConnection connection = new SqlConnection(connectionString))
            {
                return connection.ExecuteScalar<int>(StoredProcedure, parameters, commandType: CommandType.StoredProcedure);
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

            isClosed = false;
        }

        public List<T> LoadDataInTransaction<T, U>(string StoredProcedure, U parameters)
        {
            List<T> rows = _connection.Query<T>(StoredProcedure, parameters,
                commandType: CommandType.StoredProcedure, transaction: _transaction).ToList();

            return rows;

        }

        public int SaveDataInTransaction<T>(string StoredProcedure, T parameters)
        {
            return _connection.ExecuteScalar<int>(StoredProcedure, parameters,
                                commandType: CommandType.StoredProcedure,
                                transaction: _transaction);
        }

        private bool isClosed = false;
        private readonly IConfiguration _config;
        private readonly ILogger<SQLDataAccess> _logger;

        public void CommitTransaction()
        {
            _transaction?.Commit();
            _connection?.Close();

            isClosed = true;
        }

        public void RollbackTransaction()
        {
            _transaction?.Rollback();
            _connection?.Close();

            isClosed = true;
        }

        public void Dispose()
        {
            if (isClosed == false)
            {
                try
                {
                    CommitTransaction();
                }
                catch (Exception ex)
                {
                    _logger.LogError(ex, "Commit transaction failed in the dispose method.");
                }
            }
            _transaction = null;
            _connection = null;
        }

     
    }
}
