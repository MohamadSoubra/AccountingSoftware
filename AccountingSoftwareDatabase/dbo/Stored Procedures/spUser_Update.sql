CREATE PROCEDURE [dbo].[spUser_Update]
	@Id varchar(250) = '',
	@UserName varchar(50) = '',
	@FirstName varchar(50) = '',
	@LastName varchar(50) = '',
	@EmailAddress varchar(256) = ''

AS

BEGIN
	set nocount on;
	--INSERT INTO [dbo].[User] (Id, Username,FirstName,LastName,EmailAddress) 
	--VALUES (@Id, @UserName, @FirstName, @LastName, @EmailAddress);
	update dbo.[User] set 
		Username = ISNULL(@UserName, Username), 
		FirstName = ISNULL(@FirstName, FirstName),
		LastName = ISNULL(@LastName, LastName),
		EmailAddress = ISNULL(@EmailAddress, EmailAddress)
	where Id = @Id
END
