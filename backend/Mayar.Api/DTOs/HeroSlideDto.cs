using System;

namespace Mayar.Api.DTOs;

public class HeroSlideDto
{
    public Guid Id { get; set; }
    public IFormFile? ImageFile { get; set; }
    public string? ImageUrl { get; set; }
    public string? TitleEnglish { get; set; }
    public string? TitleArabic { get; set; }
    public string? SubtitleEnglish { get; set; }
    public string? SubtitleArabic { get; set; }
    public decimal? OldPrice { get; set; }
    public decimal? NewPrice { get; set; }
    public string? ButtonTextEnglish { get; set; }
    public string? ButtonTextArabic { get; set; }
    public string? ButtonLink { get; set; }
    public bool IsActive { get; set; }
}
