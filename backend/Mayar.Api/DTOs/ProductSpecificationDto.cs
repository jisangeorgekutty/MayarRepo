using System;

namespace Mayar.Api.DTOs;

public class ProductSpecificationDto
{
    public Guid Id { get; set; }
    public Guid ProductId { get; set; }
    public string? LabelEnglish { get; set; }
    public string? LabelArabic { get; set; }
    public string? ValueEnglish { get; set; }
    public string? ValueArabic { get; set; }
    public bool IsActive { get; set; }
}
