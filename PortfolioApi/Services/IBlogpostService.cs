using PortfolioApi.DTOs;

namespace PortfolioApi.Services;

public interface IBlogpostService
{
    Task<List<BlogpostReadDto>> GetAllAsync();

    Task<BlogpostReadDto?> GetByIdAsync(int id);

    Task<BlogpostReadDto> CreateAsync(BlogpostCreateDto dto);

    Task<bool> UpdateAsync(int id, BlogpostUpdateDto dto);

    Task<bool> DeleteAsync(int id);
}