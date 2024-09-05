CREATE PROCEDURE [dbo].[spSupplier_GetAll]
AS
BEGIN
	SELECT [Id], [AccountNumber], [CompanyName], [ContactName], [EmailAddress], [Address], [PhoneNumber], [Country], [City]
    FROM Supplier 
    where Active = 1
    ORDER BY CompanyName;
END
