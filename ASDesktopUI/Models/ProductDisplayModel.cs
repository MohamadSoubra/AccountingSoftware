using System.ComponentModel;

namespace ASDesktopUI.Models
{
    public class ProductDisplayModel : INotifyPropertyChanged
    {
        public int Id { get; set; }
        public string ProductName { get; set; }
        public string Description { get; set; }
        public decimal RetailPrice { get; set; }

        private int _quantityInStock;

        public int QuantityInStock
        {
            get { return _quantityInStock; }
            set 
            { 
                _quantityInStock = value;
                CallProperyChanged(nameof(QuantityInStock));
            }
        }

        public bool IsTaxable { get; set; }

        public event PropertyChangedEventHandler PropertyChanged;
        public void CallProperyChanged(string propertyName)
        {
            PropertyChanged?.Invoke(this, new PropertyChangedEventArgs(propertyName));
        }
    }
}