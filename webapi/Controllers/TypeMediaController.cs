using Microsoft.AspNetCore.Mvc;
using webapi.Models;
using webapi.Models.ViewsModels;
using webapi.Services;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace webapi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TypeMediaController : ControllerBase
    {
        private readonly ITypeMediaServices _typeMediaServices;
        public TypeMediaController(ITypeMediaServices typeMediaServices)
        {
            _typeMediaServices = typeMediaServices;
        }
        // GET: api/<TypeMedia>
        [HttpGet]
        public IEnumerable<TypeMediaViewModel> Get()
        {
            return _typeMediaServices.GetTypeMedias();
        }

        // GET api/<TypeMedia>/5
        [HttpGet("{id}")]
        public TypeMediaViewModel Get(int id)
        {
            return _typeMediaServices.GetTypeMediaById(id);
        }

        // POST api/<TypeMedia>
        [HttpPost]
        public void Post([FromBody] TypeMediaViewModel typeMedia)
        {
            _typeMediaServices.CreateTypeMedia(typeMedia);
        }

        // PUT api/<TypeMedia>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] TypeMediaViewModel typeMedia)
        {
            _typeMediaServices.UpdateTypeMedia(id, typeMedia);
        }

        // DELETE api/<TypeMedia>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            _typeMediaServices.DeleteTypeMedia(id);
        }
    }
}
