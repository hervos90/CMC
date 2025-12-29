using Microsoft.AspNetCore.Mvc;
using webapi.Models;
using webapi.Models.ViewsModels;
using webapi.Services;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace webapi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EgliseController : ControllerBase
    {
        private readonly IEgliseServices _egliseServices;
        public EgliseController( IEgliseServices egliseServices)
        {
            _egliseServices = egliseServices;
        }

        // GET: api/<EgliseController>
        [HttpGet]
        public IEnumerable<EgliseViewModel> Get()
        {
            return _egliseServices.GetEglises();
        }

        // GET api/<EgliseController>/5
        [HttpGet("{id}")]
        public EgliseViewModel Get(int id)
        {
            return _egliseServices.GetEgliseById(id);
        }

        // POST api/<EgliseController>
        [HttpPost]
        public void Post([FromBody] EgliseViewModel eglise)
        {
            _egliseServices.CreateEglise(eglise);
        }

        // PUT api/<EgliseController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] EgliseViewModel eglise)
        {
            _egliseServices.UpdateEglise(id, eglise);
        }

        // DELETE api/<EgliseController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            _egliseServices.DeleteEglise(id);
        }
    }
}
