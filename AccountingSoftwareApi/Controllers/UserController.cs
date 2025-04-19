using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using AccountingSoftwareApi.Data;
using AccountingSoftwareApi.Identity;
using AccountingSoftwareApi.Models;
using ASDataManager.Library.DataAccess;
using ASDataManager.Library.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;

namespace AccountingSoftwareApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class UserController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly UserManager<IdentityUser> _userManager;
        private readonly IUserData _userData;
        private readonly ILogger _logger;
        private readonly IIdentityService _identityService;

        public UserController(ApplicationDbContext context, 
                             UserManager<IdentityUser> userManager,
                             IUserData userData,
                             ILogger<UserController> logger,
                             IIdentityService identityService)
        {
            _context = context;
            _userManager = userManager;
            _userData = userData;
            _logger = logger;
            _identityService = identityService;
        }

        [HttpGet]
        public ApplicationUserModel GetById(string userId)
        {
            //string userId = User.FindFirstValue(ClaimTypes.Sid);
            var user = _userData.GetUserById(userId).FirstOrDefault();

            ApplicationUserModel AppUser = new ApplicationUserModel
            {
                Id = user.Id,
                EmailAddress = user.EmailAddress,
                UserName = user.UserName,
                FirstName = user.FirstName,
                LastName = user.LastName,
                CreatedDate = user.CreatedDate
            };
            AppUser.Roles = _context.Users
                .Where(x => x.Id == userId)
                .SelectMany(x => _context.UserRoles
                .Where(ur => ur.UserId == x.Id)
                .Join(_context.Roles, ur => ur.RoleId, r => r.Id, (ur, r) => new RoleModel { Id = ur.RoleId, Name = r.Name }))
                .ToArray();

            return AppUser;
        }

        [Authorize(Roles = "Admin")]
        [HttpGet]
        [Route("Admin/GetAllUsers")]
        public List<ApplicationUserModel> GetAllUsers()
        {

            List<ApplicationUserModel> output = new List<ApplicationUserModel>();

            var users = _userData.GetAllUsers();

            var UserRoles = from ur in _context.UserRoles
                            join r in _context.Roles on ur.RoleId equals r.Id
                            select new { ur.RoleId, r.Name };

            foreach (var user in users)
            {
                ApplicationUserModel u = new ApplicationUserModel
                {
                    Id = user.Id,
                    EmailAddress = user.EmailAddress,
                    UserName = user.UserName,
                    FirstName = user.FirstName,
                    LastName = user.LastName,
                    CreatedDate = user.CreatedDate

                };

                u.Roles = _context.Users
                .Where(x => x.Id == u.Id)
                .SelectMany(x => _context.UserRoles
                .Where(ur => ur.UserId == x.Id)
                .Join(_context.Roles, ur => ur.RoleId, r => r.Id, (ur, r) => new RoleModel { Id = ur.RoleId, Name = r.Name }))
                .ToArray();

                output.Add(u);
            }

            return output;
        }

        [AllowAnonymous]
        [Authorize(Roles = "Admin")]
        [HttpGet]
        [Route("Admin/GetAllRoles")]
        public List<RoleModel> GetAllRoles()
        {
            var roles = _context.Roles.Select(r => new RoleModel { Id = r.Id, Name = r.Name}).ToList();

            return roles;

        }

        [AllowAnonymous]
        [Authorize(Roles = "Admin")]
        [HttpGet]
        [Route("Admin/GetUserRoles")]
        public List<string> GetUserRoles(string ID)
        {
            var roles = _context.UserRoles.Join(_context.Roles,
                ur => ur.RoleId,
                r => r.Id,
                (ur, r) => new { ur.UserId, r.Name })
                .Where(x => x.UserId == ID)
                .Select(x => x.Name)
                .ToList();



            return roles;

        }

        [Authorize(Roles = "Admin")]
        [HttpPost]
        [Route("Admin/AddRole")]
        public async Task AddARole(UserRolePairModel pairing)
        {
            string looggedInUserId = User.FindFirstValue(ClaimTypes.NameIdentifier);

            var user = await _userManager.FindByIdAsync(pairing.UserId);

            _logger.LogInformation("Admin {Admin} added user {User} to role {Role}",
                looggedInUserId, user.Id, pairing.RoleName);

           await _userManager.AddToRoleAsync(user, pairing.RoleName);
            
        }

        [Authorize(Roles = "Admin")]
        [HttpPost]
        [Route("Admin/RemoveRole")]
        public async Task RemoveARole(UserRolePairModel pairing)
        {
            string looggedInUserId = User.FindFirstValue(ClaimTypes.NameIdentifier);

            var user = await _userManager.FindByIdAsync(pairing.UserId);

            _logger.LogInformation("Admin {Admin} removed user {User} from role {Role}",
                looggedInUserId, user.Id, pairing.RoleName);

            await _userManager.RemoveFromRoleAsync(user, pairing.RoleName);

        }

        [AllowAnonymous]
        [Route("Admin/Register")]
        [HttpPost]
        public async Task<ActionResult> RegisterUser([FromBody] RegisterUserModel registerUser)
        {

            if (registerUser == null)
            {
                return BadRequest();
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var result = await _identityService.RegisterAsync(registerUser);

            if (result.Errors != null)
            {
                return BadRequest(result.Errors);
            }
            else
            {
                return Ok(result);
            }
        }
    }
}