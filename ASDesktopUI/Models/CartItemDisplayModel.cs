using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ASDesktopUI.Models
{
    public class CartItemDisplayModel : INotifyPropertyChanged
    {
        public ProductDisplayModel Product { get; set; }
        private int _quantityInCart;

        public int QuantityInCart
        {
            get { return _quantityInCart; }
            set 
            {
                _quantityInCart = value;
                CallProperyChanged(nameof(QuantityInCart));
                CallProperyChanged(nameof(DisplayText));
            }
        }


        public string DisplayText
        {
            get
            {
                if (QuantityInCart == 1)
                {
                    return $" {Product.ProductName} ";
                }
                else
                {
                    return $"{ Product.ProductName } ({ QuantityInCart }) ";
                }
            }
        }

        public event PropertyChangedEventHandler PropertyChanged;
        public void CallProperyChanged(string propertyName)
        {
            PropertyChanged?.Invoke(this, new PropertyChangedEventArgs(propertyName));
        }
    }
}
