﻿using System;
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
        private ILoggedInUserModel _user;
        private IAPIHelper _apiHelper;
        public ShellViewModel(IEventAggregator events,
                              ILoggedInUserModel user,
                              IAPIHelper apiHelper)
        {
            _events = events;
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
                    UserStatus = $"Welcome {_user.EmailAddress}";
                }
                return output;
            }
        }

        public bool IsLoggedOut
        {
            get 
            {
                bool output = false;
                if (string.IsNullOrWhiteSpace(_user.Token) == true)
                {
                    output = true;
                    UserStatus = "Logged Out";
                }
                return output;
            }
        }

        private string _userStatus;

        public string UserStatus
        {
            get { return _userStatus; }
            set 
            {
                _userStatus = value;
                NotifyOfPropertyChange(() => UserStatus);
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
            NotifyOfPropertyChange(() => IsLoggedOut);
        }

        public async Task LogIn()
        {
            _user.LogOffUser();
            _apiHelper.ResetUserModel();
            await ActivateItemAsync(IoC.Get<LoginViewModel>(), new CancellationToken());
            NotifyOfPropertyChange(() => IsLoggedOut);
            NotifyOfPropertyChange(() => IsLoggedIn);
        }

        public async Task UserManagement()
        {
            await ActivateItemAsync(IoC.Get<UserDisplayViewModel>(), new CancellationToken());
        }

        public async Task HandleAsync(LogOnEvent message, CancellationToken cancellationToken)
        {
            await ActivateItemAsync(IoC.Get<SalesViewModel>(), cancellationToken);
            NotifyOfPropertyChange(() => IsLoggedIn);
            NotifyOfPropertyChange(() => IsLoggedOut);
        }
    }
}
