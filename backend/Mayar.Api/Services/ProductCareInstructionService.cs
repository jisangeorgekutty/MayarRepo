using Mayar.Api.Data;
using Mayar.Api.DTOs;
using Mayar.Api.Entities;
using Mayar.Api.Interfaces;
using Mayar.Api.Mappings;
using Microsoft.EntityFrameworkCore;

namespace Mayar.Api.Services;

public class ProductCareInstructionService(AppDbContext context) : IProductCareInstructionService
{
    public async Task<List<ProductCareInstructionDto>> GetAllAsync()
    {
        var instructions = await context.ProductCareInstructions.ToListAsync();
        return instructions.Select(i => i.ToProductCareInstructionDto()).ToList();
    }

    public async Task<ProductCareInstructionDto?> GetByIdAsync(Guid id)
    {
        var instruction = await context.ProductCareInstructions.FindAsync(id);
        return instruction?.ToProductCareInstructionDto();
    }

    public async Task<List<ProductCareInstructionDto>> GetByProductIdAsync(Guid productId)
    {
        var instructions = await context.ProductCareInstructions
            .Where(i => i.ProductId == productId)
            .ToListAsync();
        return instructions.Select(i => i.ToProductCareInstructionDto()).ToList();
    }

    public async Task<ProductCareInstructionDto> CreateAsync(ProductCareInstructionDto dto)
    {
        var entity = new ProductCareInstruction
        {
            Id = Guid.NewGuid(),
            ProductId = dto.ProductId,
            InstructionEnglish = dto.InstructionEnglish,
            InstructionArabic = dto.InstructionArabic
        };

        context.ProductCareInstructions.Add(entity);
        await context.SaveChangesAsync();

        return entity.ToProductCareInstructionDto();
    }

    public async Task<ProductCareInstructionDto?> UpdateAsync(Guid id, ProductCareInstructionDto dto)
    {
        var entity = await context.ProductCareInstructions.FindAsync(id);
        if (entity == null)
        {
            return null;
        }

        entity.InstructionEnglish = dto.InstructionEnglish;
        entity.InstructionArabic = dto.InstructionArabic;

        await context.SaveChangesAsync();

        return entity.ToProductCareInstructionDto();
    }

    public async Task<bool> DeleteAsync(Guid id)
    {
        var entity = await context.ProductCareInstructions.FindAsync(id);
        if (entity == null)
        {
            return false;
        }

        context.ProductCareInstructions.Remove(entity);
        await context.SaveChangesAsync();

        return true;
    }
}
