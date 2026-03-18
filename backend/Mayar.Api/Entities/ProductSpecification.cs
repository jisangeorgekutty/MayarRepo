using System;

namespace Mayar.Api.Entities;

public class ProductSpecification
{
    public Guid Id { get; set; }
    public Guid ProductId { get; set; }
    public Product Product { get; set; } = null!;
    public string? LabelEnglish { get; set; } 
    public string? LabelArabic { get; set; }
    public string? ValueEnglish { get; set; }
    public string? ValueArabic { get; set; }
    public bool IsActive { get; set; } = true;
}