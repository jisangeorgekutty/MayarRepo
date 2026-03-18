using Mayar.Api.Data;
using Mayar.Api.DTOs;
using Mayar.Api.Entities;
using Mayar.Api.Interfaces;
using Mayar.Api.Mappings;
using Microsoft.EntityFrameworkCore;

namespace Mayar.Api.Services;

public class ProductColorService(AppDbContext context) : IProductColorService
{
    public async Task<List<ProductColorDto>> GetAllAsync()
    {
        var colors = await context.ProductColors.ToListAsync();
        return colors.Select(c => c.ToProductColorDto()).ToList();
    }

    public async Task<ProductColorDto?> GetByIdAsync(Guid id)
    {
        var color = await context.ProductColors.FindAsync(id);
        return color?.ToProductColorDto();
    }

    public async Task<List<ProductColorDto>> GetByProductIdAsync(Guid productId)
    {
        var colors = await context.ProductColors
            .Where(c => c.ProductId == productId)
            .ToListAsync();
        return colors.Select(c => c.ToProductColorDto()).ToList();
    }

    public async Task<ProductColorDto> CreateAsync(ProductColorDto dto)
    {
        var entity = new ProductColor
        {
            Id = Guid.NewGuid(),
            ProductId = dto.ProductId,
            NameEnglish = dto.NameEnglish,
            NameArabic = dto.NameArabic,
            Hex = dto.Hex
        };

        context.ProductColors.Add(entity);
        await context.SaveChangesAsync();

        return entity.ToProductColorDto();
    }

    public async Task<ProductColorDto?> UpdateAsync(Guid id, ProductColorDto dto)
    {
        var entity = await context.ProductColors.FindAsync(id);
        if (entity == null)
        {
            return null;
        }

        entity.NameEnglish = dto.NameEnglish;
        entity.NameArabic = dto.NameArabic;
        entity.Hex = dto.Hex;

        await context.SaveChangesAsync();

        return entity.ToProductColorDto();
    }

    public async Task<bool> DeleteAsync(Guid id)
    {
        var entity = await context.ProductColors.FindAsync(id);
        if (entity == null)
        {
            return false;
        }

        context.ProductColors.Remove(entity);
        await context.SaveChangesAsync();

        return true;
    }
}
