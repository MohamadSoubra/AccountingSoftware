CREATE PROCEDURE [dbo].[spInvoice_Delete]
	@Id nvarchar(max)

AS
begin
	set nocount on;
	update Invoice set Active = 0 WHERE Id = @Id
end
GO