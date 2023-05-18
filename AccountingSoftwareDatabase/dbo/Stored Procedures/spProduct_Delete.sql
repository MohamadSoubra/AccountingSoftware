CREATE PROCEDURE [dbo].[spProduct_Delete]
	@Ids nvarchar(max)

AS
begin
	set nocount on;
	update SaleDetail set Active = 0 where ProductId IN (SELECT DATA FROM dbo.Split( @Ids,','));
	update Product set Active = 0 WHERE Id IN (SELECT DATA FROM dbo.Split( @Ids,','));
end
GO
