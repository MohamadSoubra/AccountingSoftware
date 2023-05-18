CREATE PROCEDURE [dbo].[spSale_Delete]
	@Id nvarchar(max)

AS
begin
	set nocount on;
	update Sale set Active = 0 WHERE Id = @Id
end
GO