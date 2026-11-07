
using System.ComponentModel.DataAnnotations;

namespace PortfolioApi.DTOs;

public class BlogpostUpdateDto
{
    [Required]
    [MaxLength(100)]
    public string Titel { get; set; } = string.Empty;

    [Required]
    [MaxLength(5000)]
    public string Inhoud { get; set; } = string.Empty;

    public DateTime Publicatiedatum { get; set; }
}
