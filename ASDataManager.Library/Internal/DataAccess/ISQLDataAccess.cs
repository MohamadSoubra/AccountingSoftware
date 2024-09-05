using System.Collections.Generic;

namespace ASDataManager.Library.Internal.DataAccess
{
    public interface ISQLDataAccess
    {
        void CommitTransaction();
        void Dispose();
        string GetConnectionString(string name);
        List<T> LoadData<T, U>(string StoredProcedure, U parameters, string connectionStringName);
        List<T> LoadDataInTransaction<T, U>(string StoredProcedure, U parameters);
        void RollbackTransaction();
        int SaveData<T>(string StoredProcedure, T parameters, string connectionStringName);
        int SaveDataInTransaction<T>(string StoredProcedure, T parameters);
        void StartTransaction(string connectionStringName);
    }
}