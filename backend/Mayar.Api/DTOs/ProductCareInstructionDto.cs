using System;

namespace Mayar.Api.DTOs;

public class ProductCareInstructionDto
{
    public Guid Id { get; set; }
    public Guid ProductId { get; set; }
    public string? InstructionEnglish { get; set; }
    public string? InstructionArabic { get; set; }
    public bool IsActive { get; set; }
}
