using System;

namespace Mayar.Api.DTOs;

public class ProductColorDto
{
    public Guid Id { get; set; }
    public Guid ProductId { get; set; }
    public string? NameEnglish { get; set; }
    public string? NameArabic { get; set; }
    public string? Hex { get; set; }
    public bool IsActive { get; set; }
}
