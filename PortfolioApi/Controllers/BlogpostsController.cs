using Microsoft.AspNetCore.Mvc;
using PortfolioApi.DTOs;
using PortfolioApi.Services;

namespace PortfolioApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class BlogpostsController : ControllerBase
{
    private readonly IBlogpostService _blogpostService;

    public BlogpostsController(IBlogpostService blogpostService)
    {
        _blogpostService = blogpostService;
    }

    // GET: api/blogposts
    [HttpGet]
    public async Task<ActionResult<List<BlogpostReadDto>>> GetAll()
    {
        var blogposts = await _blogpostService.GetAllAsync();
        return Ok(blogposts);
    }

    // GET: api/blogposts/5
    [HttpGet("{id}")]
    public async Task<ActionResult<BlogpostReadDto>> GetById(int id)
    {
        var blogpost = await _blogpostService.GetByIdAsync(id);

        if (blogpost == null)
            return NotFound();

        return Ok(blogpost);
    }
    // POST: api/blogposts
    [HttpPost]
    public async Task<ActionResult<BlogpostReadDto>> Create(BlogpostCreateDto dto)
    {
        var blogpost = await _blogpostService.CreateAsync(dto);

        return CreatedAtAction(
            nameof(GetById),
            new { id = blogpost.Id },
            blogpost);
    }

    // PUT: api/blogposts/5
    [HttpPut("{id}")]
    public async Task<IActionResult> Update(int id, BlogpostUpdateDto dto)
    {
        var updated = await _blogpostService.UpdateAsync(id, dto);

        if (!updated)
            return NotFound();

        return NoContent();
    }

    // DELETE: api/blogposts/5
    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var deleted = await _blogpostService.DeleteAsync(id);

        if (!deleted)
            return NotFound();

        return NoContent();
    }
}