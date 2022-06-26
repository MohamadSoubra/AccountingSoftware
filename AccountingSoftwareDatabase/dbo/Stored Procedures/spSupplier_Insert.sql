CREATE PROCEDURE dbo.spSupplier_Insert

    @SupplierName NVARCHAR(50)  ,
    @FirstName NVARCHAR(50)  , 
    @LastName NVARCHAR(50)  , 
    @EmailAddress NVARCHAR(256)  , 
    @Address NVARCHAR(MAX)  , 
    @PhoneNumber NVARCHAR(50)  , 
    @Country NVARCHAR(50)  , 
    @City NVARCHAR(50)  
AS
BEGIN
	INSERT INTO Supplier(SupplierName, FirstName, LastName, EmailAddress, [Address], PhoneNumber, Country, City) 
    VALUES (@SupplierName, @FirstName, @LastName, @EmailAddress, @Address, @PhoneNumber, @Country, @City)
END
