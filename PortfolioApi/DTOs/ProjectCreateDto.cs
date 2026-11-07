
using System.ComponentModel.DataAnnotations;

namespace PortfolioApi.DTOs;

public class ProjectCreateDto
{
    [Required]
    [MaxLength(100)]
    public string Titel { get; set; } = string.Empty;

    [Required]
    [MaxLength(1000)]
    public string Beschrijving { get; set; } = string.Empty;

    [Required]
    [MaxLength(50)]
    public string Categorie { get; set; } = string.Empty;

    [Url]
    public string? GitHubUrl { get; set; }

    public DateTime Datum { get; set; }
}
