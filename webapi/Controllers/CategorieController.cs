using Microsoft.AspNetCore.Mvc;
using webapi.Models;
using webapi.Models.ViewsModels;
using webapi.Services;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace webapi.Controllers
{



    [Route("api/[controller]")]
    [ApiController]
    public class CategorieController : ControllerBase
    {
        private readonly ICategorieServices _categorieServices;
        public CategorieController(ICategorieServices categorieServices)
        {
            _categorieServices = categorieServices;
        }
        // GET: api/<CategorieController>
        [HttpGet]
        public IEnumerable<CategoryViewModel> Get()
        {
            return _categorieServices.GetCategories();
        }

        // GET api/<CategorieController>/5
        [HttpGet("{id}")]
        public CategoryViewModel Get(int id)
        {
            return _categorieServices.GetCategorieById(id);
        }

        // POST api/<CategorieController>
        [HttpPost]
        public void Post([FromBody] CategoryViewModel categorie)
        {
            _categorieServices.CreateCategorie(categorie);
        }

        // PUT api/<CategorieController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] CategoryViewModel categorie)
        {
            _categorieServices.UpdateCategorie(id, categorie);
        }

        // DELETE api/<CategorieController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            _categorieServices.DeleteCategorie(id);
        }
    }
}
