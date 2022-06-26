CREATE TABLE [dbo].[Statement]
(
	[Id] INT NOT NULL PRIMARY KEY, 
    [InvoiceId] INT NOT NULL, 
    [FromDate] DATETIME2 NOT NULL, 
    [ToDate] DATETIME2 NOT NULL, 
    [Amount] MONEY NOT NULL, 
    [Paid] MONEY NOT NULL, 
    [Refunded] MONEY NOT NULL, 
    CONSTRAINT [FK_Statement_ToInvoice] FOREIGN KEY ([InvoiceId]) REFERENCES [Invoice]([Id])
)
