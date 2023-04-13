CREATE PROCEDURE [dbo].[spSale_GetById]
	@Id int
AS
begin
	set nocount on;

	select Id, CashierId, SaleDate, SubTotal, Tax, Total
	from dbo.Sale
	Where Id = @Id;
end

