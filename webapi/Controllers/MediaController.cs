using Microsoft.AspNetCore.Mvc;
using System.Reflection.Metadata.Ecma335;
using webapi.Models.ViewsModels;
using webapi.Services;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace webapi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MediaController : ControllerBase
    {
        private readonly IMediaServices _mediaServices;
        public MediaController(IMediaServices mediaServices)
        {
            _mediaServices = mediaServices;
        }

        // GET: api/<MediaController>
        [HttpGet]
        public IEnumerable<MediaViewModel> Get()
        {
            return _mediaServices.GetMedias();
        }

        // GET api/<MediaController>/5
        [HttpGet("{id}")]
        public MediaViewModel Get(int id)
        {
            return _mediaServices.GetMediaById(id);
        }

        // POST api/<MediaController>
        [HttpPost]
        public void Post([FromBody] MediaViewModel media)
        {
            _mediaServices.CreateMedia(media);
        }

        // PUT api/<MediaController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] MediaViewModel media)
        {
            _mediaServices.UpdateMedia(id, media);
        }

        // DELETE api/<MediaController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            _mediaServices.DeleteMedia(id);
        }
    }
}
