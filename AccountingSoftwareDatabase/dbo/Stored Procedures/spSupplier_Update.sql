CREATE PROCEDURE [dbo].[spSupplier_Update]
	@Id int,
    @AccountNumber NVARCHAR(50),
    @CompanyName NVARCHAR(50), 
	@ContactName NVARCHAR(50), 
    @EmailAddress NVARCHAR(256), 
    @Address NVARCHAR(MAX), 
    @PhoneNumber NVARCHAR(50), 
    @Country NVARCHAR(50), 
    @City NVARCHAR(50)  

AS
begin
	set nocount on;
	set IDENTITY_INSERT [dbo].[Supplier] OFF ;
	update dbo.Supplier set 
	AccountNumber = ISNULL(@AccountNumber, AccountNumber), 
	CompanyName = ISNULL(@CompanyName, CompanyName),
	EmailAddress = ISNULL(@EmailAddress, EmailAddress),
	[Address] = ISNULL(@Address, [Address]),
	PhoneNumber = ISNULL(@PhoneNumber, PhoneNumber),
	Country = ISNULL(@Country, Country),
	City = ISNULL(@City, City),
	ContactName = ISNULL(@ContactName, ContactName)
	where Id = @Id
end

