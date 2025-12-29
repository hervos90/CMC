using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using webapi.Models.ViewsModels;
using webapi.Services;

namespace webapi.Controllers
{
    [Route("api/auth")]
    [AllowAnonymous]
    [ApiController]
    public class UtilisateurController : ControllerBase
    {
        private readonly UserManager<IdentityUser> _userManager;
        private readonly SignInManager<IdentityUser> _signInManager;
        private readonly IConfiguration _configuration;


        private IUtilisateurServices _utilisateurServices;
        /// <summary>
        /// ctor
        /// </summary>
        /// <param name="userManager"></param>
        /// <param name="signInManager"></param>
        /// <param name="configuration"></param>
        /// <param name="iUtilisateurServices"></param>
        public UtilisateurController(UserManager<IdentityUser> userManager,
                                     SignInManager<IdentityUser> signInManager,
                                     IConfiguration configuration, IUtilisateurServices iUtilisateurServices)
        {

            _utilisateurServices = iUtilisateurServices;
            _userManager = userManager;
            _signInManager = signInManager;
            _configuration = configuration;

        }

        /// <summary>
        /// Inscription d'un nouvel utilisateur.
        /// </summary>
        /// <param name="model"></param>
        /// <returns></returns>
        [AllowAnonymous]
        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterModel model)
        {
        
            var user = new IdentityUser { UserName = model.UserName, Email = model.Email };

            var result = await _userManager.CreateAsync(user, model.Password);

            if (result.Succeeded)
            {
                await _signInManager.SignInAsync(user, isPersistent: false, authenticationMethod: IdentityConstants.ApplicationScheme); ;

                var token = JwtTokenGenerator.GenerateToken(user, _configuration);
                return Ok(new { Token = token });
            }

            return BadRequest(result.Errors);
        }
    }


    //// GET: api/<UtilisateurController>
    //[HttpGet]
    //    public IEnumerable<UtilisateurViewModel> Get()
    //    {
    //        return _utilisateurServices.GetUtilisateurs();
    //    }

    //    // GET api/<UtilisateurController>/5
    //    [HttpGet("{id}")]
    //    public string Get(int id)
    //    {
    //        return "value";
    //    }

    //    // POST api/<UtilisateurController>
    //    [HttpPost]
    //    public void Post([FromBody] UtilisateurViewModel utilisateur)
    //    {
    //        _utilisateurServices.CreateUtilisateur(utilisateur);
    //    }

    //    // PUT api/<UtilisateurController>/5
    //    [HttpPut("{id}")]
    //    public void Put(int id, [FromBody] string value)
    //    {
    //    }

    //    // DELETE api/<UtilisateurController>/5
    //    [HttpDelete("{id}")]
    //    public void Delete(int id)
    //    {
    //    }
}
