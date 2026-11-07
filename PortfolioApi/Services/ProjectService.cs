using Microsoft.EntityFrameworkCore;
using PortfolioApi.Data;
using PortfolioApi.DTOs;
using PortfolioApi.Models;

namespace PortfolioApi.Services;

public class ProjectService : IProjectService
{
    private readonly PortfolioDbContext _context;

    public ProjectService(PortfolioDbContext context)
    {
        _context = context;
    }

    public async Task<List<ProjectReadDto>> GetAllAsync()
    {
        var projects = await _context.Projects.ToListAsync();

        return projects.Select(project => new ProjectReadDto
        {
            Id = project.Id,
            Titel = project.Titel,
            Beschrijving = project.Beschrijving,
            Categorie = project.Categorie,
            GitHubUrl = project.GitHubUrl,
            Datum = project.Datum
        }).ToList();
    }

    public async Task<ProjectReadDto?> GetByIdAsync(int id)
    {
        var project = await _context.Projects.FindAsync(id);

        if (project == null)
            return null;

        return new ProjectReadDto
        {
            Id = project.Id,
            Titel = project.Titel,
            Beschrijving = project.Beschrijving,
            Categorie = project.Categorie,
            GitHubUrl = project.GitHubUrl,
            Datum = project.Datum
        };
    }

    public async Task<ProjectReadDto> CreateAsync(ProjectCreateDto dto)
    {
        var project = new Project
        {
            Titel = dto.Titel,
            Beschrijving = dto.Beschrijving,
            Categorie = dto.Categorie,
            GitHubUrl = dto.GitHubUrl,
            Datum = dto.Datum
        };

        _context.Projects.Add(project);
        await _context.SaveChangesAsync();

        return new ProjectReadDto
        {
            Id = project.Id,
            Titel = project.Titel,
            Beschrijving = project.Beschrijving,
            Categorie = project.Categorie,
            GitHubUrl = project.GitHubUrl,
            Datum = project.Datum
        };
    }

    public async Task<bool> UpdateAsync(int id, ProjectUpdateDto dto)
    {
        var project = await _context.Projects.FindAsync(id);

        if (project == null)
            return false;

        project.Titel = dto.Titel;
        project.Beschrijving = dto.Beschrijving;
        project.Categorie = dto.Categorie;
        project.GitHubUrl = dto.GitHubUrl;
        project.Datum = dto.Datum;

        await _context.SaveChangesAsync();

        return true;
    }

    public async Task<bool> DeleteAsync(int id)
    {
        var project = await _context.Projects.FindAsync(id);

        if (project == null)
            return false;

        _context.Projects.Remove(project);
        await _context.SaveChangesAsync();

        return true;
    }
}