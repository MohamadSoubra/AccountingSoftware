CREATE PROCEDURE [dbo].[spSupplier_Delete]
	@Id nvarchar(max)

AS
begin
	set nocount on;
	update Supplier set Active = 0 WHERE Id = @Id
end
GO
