CREATE PROCEDURE [dbo].[spClient_Insert]

	@FirstName nvarchar(100),
	@LastName nvarchar(100),
	@Address nvarchar(max),
	@EmailAddress nvarchar(100),
    @PhoneNumber nvarchar(100)

AS
begin
	set nocount on;
	set IDENTITY_INSERT [dbo].[Client] OFF ;
	insert into dbo.Client(FirstName, LastName, [Address], EmailAddress, PhoneNumber)
	values(@FirstName ,@LastName, @Address, @EmailAddress, @PhoneNumber);
end
