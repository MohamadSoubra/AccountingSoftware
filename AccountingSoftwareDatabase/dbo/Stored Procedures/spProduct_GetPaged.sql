CREATE PROCEDURE [dbo].[spProduct_GetPaged]
       @PageIndex INT = 1
      ,@PageSize INT = 10
      ,@RecordCount INT OUTPUT
AS
begin
	set nocount on;

	SELECT ROW_NUMBER() OVER
      (ORDER BY id ASC)AS RowNumber,
      Id, ProductName, [Description], RetailPrice, QuantityInStock, IsTaxable
     INTO #Results
      FROM dbo.Product
     
      SELECT @RecordCount = COUNT(*)
      FROM #Results
           
      SELECT * FROM #Results
      WHERE RowNumber BETWEEN(@PageIndex -1) * @PageSize + 1 AND(((@PageIndex -1) * @PageSize + 1) + @PageSize) - 1
     
      DROP TABLE #Results

end