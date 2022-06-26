CREATE PROCEDURE [dbo].[spClient_GetById]
	@Id int
AS
begin
	set nocount on;

	SELECT Id, FirstName, LastName, [Address], EmailAddress, PhoneNumber
	FROM dbo.Client
	WHERE Id = @Id;
end
