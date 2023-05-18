CREATE PROCEDURE [dbo].[spSupplier_GetAll]
AS
BEGIN
	SELECT Id, SupplierName, FirstName, LastName, EmailAddress, [Address], PhoneNumber, Country, City
    FROM Supplier 
    where Active = 1
    ORDER BY SupplierName;
END
