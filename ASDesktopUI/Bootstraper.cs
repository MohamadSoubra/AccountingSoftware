using ASDesktopUI.Helpers;
using ASDesktopUI.Library.Api;
using ASDesktopUI.Library.Helpers;
using ASDesktopUI.Library.Models;
using ASDesktopUI.Models;
using ASDesktopUI.ViewModels;
using AutoMapper;
using Caliburn.Micro;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Controls;

namespace ASDesktopUI
{
    class Bootstraper : BootstrapperBase
    {
        private SimpleContainer _container = new SimpleContainer();

        public Bootstraper()
        {
            Initialize();

            ConventionManager.AddElementConvention<PasswordBox>(
           PasswordBoxHelper.BoundPasswordProperty,
           "Password",
           "PasswordChanged");
        }

        private IMapper ConfigureAutomapper()
        {
            var config = new MapperConfiguration(cfg =>
            {
                cfg.CreateMap<ProductModel, ProductDisplayModel>();
                cfg.CreateMap<CartItemModel, CartItemDisplayModel>();
            });

            var output = config.CreateMapper();
            return output;
        }

        protected override void Configure()
        {
            
            _container.Instance(ConfigureAutomapper());

            _container.Instance(_container)
                .PerRequest<IProductEndpoint, ProductEndpoint>()
                .PerRequest<IUserEndpoint, UserEndpoint>()
                .PerRequest<ISaleEndpoint, SaleEndpoint>();

            _container
                .Singleton<IWindowManager, WindowManager>()
                .Singleton<IEventAggregator, EventAggregator>()
                .Singleton<ILoggedInUserModel, LoggedInUserModel>()
                .Singleton<IConfigHelper, ConfigHelper>()
                .Singleton<IAPIHelper, APIHelper>();

            GetType().Assembly.GetTypes()
                .Where(type => type.IsClass)
                .Where(type => type.Name.EndsWith("ViewModel"))
                .ToList()
                .ForEach(ViewModelType =>
                _container.RegisterPerRequest(
                    ViewModelType, ViewModelType.ToString(), ViewModelType));
        }

        protected override void OnStartup(object sender, StartupEventArgs e)
        {
            DisplayRootViewFor<ShellViewModel>();
        }

        protected override object GetInstance(Type service, string key)
        {
            return _container.GetInstance(service, key);
        }

        protected override IEnumerable<object> GetAllInstances(Type service)
        {
            return _container.GetAllInstances(service);
        }

        protected override void BuildUp(object instance)
        {
            _container.BuildUp(instance);
        }
    }
}
