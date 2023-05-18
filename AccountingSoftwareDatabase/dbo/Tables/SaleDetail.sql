CREATE TABLE [dbo].[SaleDetail]
(
	[Id] INT NOT NULL PRIMARY KEY IDENTITY, 
    [InvoiceId] INT NOT NULL, 
    [ProductId] INT NOT NULL, 
    [Description] NVARCHAR(250) NULL, 
    [Quantity] INT NOT NULL DEFAULT 1,
    [UnitPrice] MONEY NOT NULL, 
    [Tax] MONEY NOT NULL DEFAULT 0, 
    [Total] MONEY NULL DEFAULT 0, 
    [Active] BIT NULL DEFAULT 1, 
    --CONSTRAINT [FK_SaleDetail_ToSale] FOREIGN KEY (SaleId) REFERENCES Sale(Id), 
    CONSTRAINT [FK_SaleDetail_ToProduct] FOREIGN KEY (ProductId) REFERENCES Product(Id), 
    CONSTRAINT [FK_SaleDetail_ToInvoice] FOREIGN KEY (InvoiceId) REFERENCES Invoice(Id),
)


