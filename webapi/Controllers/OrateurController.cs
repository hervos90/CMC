using Microsoft.AspNetCore.Mvc;
using webapi.Models.ViewsModels;
using webapi.Services;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace webapi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrateurController : ControllerBase
    {
        private IOrateurServices _orateurServices;
        public OrateurController(IOrateurServices orateurServices)
        {
            _orateurServices = orateurServices;
        }

        // GET: api/<OrateurController>
        [HttpGet]
        public IEnumerable<OrateurViewModel> Get()
        {
            return _orateurServices.GetOrateurs();
        }

        // GET api/<OrateurController>/5
        [HttpGet("{id}")]
        public OrateurViewModel Get(int id)
        {
            return _orateurServices.GetOrateurById(id);
        }

        // POST api/<OrateurController>
        [HttpPost]
        public void Post([FromBody] OrateurViewModel orateur)
        {
            _orateurServices.CreateOrateur(orateur);
        }

        // PUT api/<OrateurController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] OrateurViewModel orateur)
        {
            _orateurServices.UpdateOrateur(id, orateur);
        }

        // DELETE api/<OrateurController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            _orateurServices.DeleteOrateur(id);
        }
    }
}
