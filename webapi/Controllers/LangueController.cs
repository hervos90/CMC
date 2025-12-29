using Microsoft.AspNetCore.Mvc;
using webapi.Models;
using webapi.Models.ViewsModels;
using webapi.Services;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace webapi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LangueController : ControllerBase
    {
        private readonly ILangueServices _langueServices;
        public LangueController(ILangueServices langueServices)
        {
            _langueServices = langueServices;
        }

        // GET: api/<LangueController>
        [HttpGet]
        public IEnumerable<LangueViewModel> Get()
        {
            return _langueServices.GetLangues();
        }

        // GET api/<LangueController>/5
        [HttpGet("{id}")]
        public LangueViewModel Get(int id)
        {
            return _langueServices.GetLangueById(id);
        }

        // POST api/<LangueController>
        [HttpPost]
        public void Post([FromBody] LangueViewModel langue)
        {
            _langueServices.CreateLangue(langue);
        }

        // PUT api/<LangueController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] LangueViewModel langue)
        {
            _langueServices.UpdateLangue(id, langue);
        }

        // DELETE api/<LangueController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            _langueServices.DeleteLangue(id);
        }
    }
}
