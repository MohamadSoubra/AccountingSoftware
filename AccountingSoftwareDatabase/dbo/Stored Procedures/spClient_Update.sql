CREATE PROCEDURE [dbo].[spClient_Update]
	@Id int,
	@FirstName nvarchar(100),
	@LastName nvarchar(100),
	@Address nvarchar(max),
	@EmailAddress nvarchar(100),
    @PhoneNumber nvarchar(100)

AS
begin
	set nocount on;
	set IDENTITY_INSERT [dbo].[Client] OFF ;
	update dbo.Client set 
	FirstName = ISNULL(@FirstName, FirstName), 
	LastName = ISNULL(@LastName, LastName),
	[Address] = ISNULL(@Address, [Address]),
	EmailAddress = ISNULL(@EmailAddress, EmailAddress),
	PhoneNumber = ISNULL(@PhoneNumber, PhoneNumber)
	where Id = @Id
end
