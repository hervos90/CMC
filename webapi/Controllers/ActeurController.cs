using Microsoft.AspNetCore.Mvc;
using webapi.Models.ViewsModels;
using webapi.Services;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace webapi.Controllers
{
    //tester git
    [Route("api/[controller]")]
    [ApiController]
    public class ActeurController : ControllerBase
    {
        private readonly IActeurServices _acteurServices;
        public ActeurController(IActeurServices acteurServices)
        {
            _acteurServices = acteurServices;
        }








        // GET: api/<ActeurController>
        [HttpGet]
        public IEnumerable<ActeurViewModel> Get()
        {
            return _acteurServices.GetActeurs();
        }




        // GET api/<ActeurController>/5
        [HttpGet("{id}")]
        public ActeurViewModel Get(int id)
        {
            return _acteurServices.GetActeurById(id);
        }

        // POST api/<ActeurController>
        [HttpPost]
        public void Post([FromBody] ActeurViewModel acteur)
        {
            _acteurServices.CreateActeur(acteur);
        }

        // PUT api/<ActeurController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] ActeurViewModel acteur)
        {
            _acteurServices.UpdateActeur(id, acteur);
        }

        // DELETE api/<ActeurController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            _acteurServices.DeleteActeur(id);
        }
    }
}
