CREATE PROCEDURE [dbo].[spClient_GetAll]
AS
begin
	set nocount on;

	select Id, FirstName, LastName, [Address], EmailAddress, PhoneNumber
	from dbo.Client where Active = 1
	order by FirstName;
end
