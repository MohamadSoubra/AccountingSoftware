using ASDataManager.Library.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AccountingSoftwareApi.Models
{
    public class ApplicationUserModel
    {
        public string Id { get; set; }
        public string Username { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string EmailAddress { get; set; }
        public string CreatedDate { get; set; } = DateTime.Now.ToString();
        public RoleModel[] Roles { get; set; } = new RoleModel[]{};
    }
}
