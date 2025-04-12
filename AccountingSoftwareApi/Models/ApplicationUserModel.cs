using ASDataManager.Library.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AccountingSoftwareApi.Models
{
    public class ApplicationUserModel : UserModel
    {
        public Dictionary<string, string> Roles { get; set; } = new Dictionary<string, string>();
    }
}
