using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using ASDesktopUI.EventModels;
using ASDesktopUI.Library.Api;
using ASDesktopUI.Library.Models;
using Caliburn.Micro;

namespace ASDesktopUI.ViewModels
{
    public class ShellViewModel : Conductor<object>, IHandle<LogOnEvent>
    {
        private IEventAggregator _events;
        private SalesViewModel _salesVM;
        private ILoggedInUserModel _user;
        private IAPIHelper _apiHelper;
        public ShellViewModel(IEventAggregator events, SalesViewModel salesVM, 
                              ILoggedInUserModel user, IAPIHelper apiHelper)
        {
            _events = events;
            _salesVM = salesVM;
            _user = user;
            _apiHelper = apiHelper;

            _events.SubscribeOnPublishedThread(this);

            ActivateItemAsync(IoC.Get<LoginViewModel>(), new CancellationToken());
        }

        public bool IsLoggedIn
        {
            get 
            {
                bool output = false;
                if (string.IsNullOrWhiteSpace(_user.Token) == false)
                {
                    output = true;
                }
                return output;
            }
        }

        public void ExitApplication()
        {
            TryCloseAsync();
        }

        public async Task LogOut()
        {
            _user.LogOffUser();
            _apiHelper.ResetUserModel();
            await ActivateItemAsync(IoC.Get<LoginViewModel>(), new CancellationToken());
            NotifyOfPropertyChange(() => IsLoggedIn);
        }

        //public void Handle(LogOnEvent message)
        //{
        //    ActivateItem(_salesVM);
        //    NotifyOfPropertyChange(() => IsLoggedIn);
        //}
        public async Task UserManagement()
        {
            await ActivateItemAsync(IoC.Get<UserDisplayViewModel>(), new CancellationToken());
        }

        public async Task HandleAsync(LogOnEvent message, CancellationToken cancellationToken)
        {
            await ActivateItemAsync(_salesVM, cancellationToken);
            NotifyOfPropertyChange(() => IsLoggedIn);
        }
    }
}
