CREATE PROCEDURE [dbo].[spUser_GetAll]
AS
begin
	set nocount on;

	SELECT Id, Username, FirstName, LastName, EmailAddress, CreatedDate
	from [dbo].[User]
end