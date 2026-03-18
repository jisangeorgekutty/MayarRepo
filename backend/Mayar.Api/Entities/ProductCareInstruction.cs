using System;

namespace Mayar.Api.Entities;

public class ProductCareInstruction
{
    public Guid Id { get; set; }
    public Guid ProductId { get; set; }
    public Product Product { get; set; } = null!;
    public string? InstructionEnglish { get; set; }
    public string? InstructionArabic { get; set; }
    public bool IsActive { get; set; } = true;
}