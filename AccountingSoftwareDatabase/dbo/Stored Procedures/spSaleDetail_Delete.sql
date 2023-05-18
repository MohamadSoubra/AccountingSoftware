CREATE PROCEDURE [dbo].[spSaleDetail_Delete]
	@Id nvarchar(max)

AS
begin
	set nocount on;
	update SaleDetail set Active = 0 WHERE Id = @Id
end
GO

