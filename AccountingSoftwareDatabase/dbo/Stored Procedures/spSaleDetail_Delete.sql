CREATE PROCEDURE [dbo].[spSaleDetail_Delete]
	@Ids nvarchar(max)

AS
begin
	set nocount on;
	update SaleDetail set Active = 0 where Id IN (SELECT DATA FROM dbo.Split( @Ids,','));
end
GO

