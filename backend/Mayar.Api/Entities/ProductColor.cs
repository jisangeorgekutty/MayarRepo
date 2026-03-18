using System;

namespace Mayar.Api.Entities;

public class ProductColor
{
    public Guid Id { get; set; }
    public Guid ProductId { get; set; }
    public Product Product { get; set; } = null!;
    public string? NameEnglish { get; set; }
    public string? NameArabic { get; set; }
    public string? Hex { get; set; }
    public bool IsActive { get; set; } = true;
}
