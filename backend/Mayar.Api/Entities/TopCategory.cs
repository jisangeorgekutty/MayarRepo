using System;

namespace Mayar.Api.Entities;

public class TopCategory
{
    public Guid Id { get; set; }
    public string? Slug { get; set; }
    public string? ImageUrl { get; set; }
    public string? ImageAlt { get; set; }
    public string? TitleEnglish { get; set; }
    public string? TitleArabic { get; set; }
    public bool IsActive { get; set; } = true;
}
