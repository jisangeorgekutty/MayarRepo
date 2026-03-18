using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace Mayar.Api.Entities;

public class HeroSlide
{
    public Guid Id { get; set; }
    public string? ImageUrl { get; set; }
    public string? TitleEnglish { get; set; }
    public string? TitleArabic { get; set; }
    public string? SubtitleEnglish { get; set; }
    public string? SubtitleArabic { get; set; }
    [Column(TypeName = "decimal(18,3)")]
    public decimal? OldPrice { get; set; }
    [Column(TypeName = "decimal(18,3)")]
    public decimal? NewPrice { get; set; }
    public string? ButtonTextEnglish { get; set; }
    public string? ButtonTextArabic { get; set; }
    public string? ButtonLink { get; set; }
    public bool IsActive { get; set; } = true;
}
