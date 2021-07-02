CREATE TABLE [dbo].[Invoice]
(
	[Id] INT NOT NULL PRIMARY KEY IDENTITY, 
    [InvoiceDate] DATETIME2 NOT NULL, 
    [PaymentDueDate] DATETIME2 NOT NULL, 
    [Description] VARCHAR(MAX) NULL, 
    [SaleDetailId] INT NOT NULL, 
    [ClientId] INT NOT NULL, 
    CONSTRAINT [FK_Invoice_ToSaleDetail] FOREIGN KEY (SaleDetailId) REFERENCES SaleDetail(Id) ,
    CONSTRAINT [FK_Invoice_ToClient] FOREIGN KEY (ClientId) REFERENCES Client(Id) 
)
