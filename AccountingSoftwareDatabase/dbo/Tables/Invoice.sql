CREATE TABLE [dbo].[Invoice]
(
	[Id] INT NOT NULL PRIMARY KEY, 
    [InvoiceDate] DATETIME2 NOT NULL, 
    [PaymentDueDate] DATETIME2 NOT NULL, 
    [Description] VARCHAR(MAX) NULL, 
    [SaleDetailId] INT NOT NULL, 
    CONSTRAINT [FK_Invoice_ToTable] FOREIGN KEY (SaleDetailId) REFERENCES SaleDetail(Id) 
)
