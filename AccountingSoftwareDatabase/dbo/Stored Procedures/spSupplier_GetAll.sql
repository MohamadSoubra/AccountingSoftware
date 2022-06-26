CREATE PROCEDURE [dbo].[spSupplier_GetAll]
AS
BEGIN
	SELECT Id, SupplierName, FirstName, LastName, EmailAddress, [Address], PhoneNumber, Country, City
    FROM Supplier
    ORDER BY SupplierName;
END
