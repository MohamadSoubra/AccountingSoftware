CREATE PROCEDURE dbo.spSupplier_Insert

    @AccountNumber NVARCHAR(50),
    @CompanyName NVARCHAR(50), 
    @ContactName NVARCHAR(50), 
    @EmailAddress NVARCHAR(256), 
    @Address NVARCHAR(MAX), 
    @PhoneNumber NVARCHAR(50), 
    @Country NVARCHAR(50), 
    @City NVARCHAR(50)  
AS
BEGIN
	INSERT INTO Supplier([AccountNumber],[CompanyName],[ContactName],[EmailAddress],[Address],[PhoneNumber],[Country],[City]) 
    VALUES (@AccountNumber, @CompanyName, @ContactName, @EmailAddress, @Address, @PhoneNumber, @Country, @City)
END
