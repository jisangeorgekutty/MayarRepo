using Mayar.Api.Data;
using Mayar.Api.DTOs;
using Mayar.Api.Entities;
using Mayar.Api.Interfaces;
using Mayar.Api.Mappings;
using Microsoft.EntityFrameworkCore;

namespace Mayar.Api.Services;

public class ProductSpecificationService(AppDbContext context) : IProductSpecificationService
{
    public async Task<List<ProductSpecificationDto>> GetAllAsync()
    {
        var specs = await context.ProductSpecifications.ToListAsync();
        return specs.Select(s => s.ToProductSpecificationDto()).ToList();
    }

    public async Task<ProductSpecificationDto?> GetByIdAsync(Guid id)
    {
        var spec = await context.ProductSpecifications.FindAsync(id);
        return spec?.ToProductSpecificationDto();
    }

    public async Task<List<ProductSpecificationDto>> GetByProductIdAsync(Guid productId)
    {
        var specs = await context.ProductSpecifications
            .Where(s => s.ProductId == productId)
            .ToListAsync();
        return specs.Select(s => s.ToProductSpecificationDto()).ToList();
    }

    public async Task<ProductSpecificationDto> CreateAsync(ProductSpecificationDto dto)
    {
        var entity = new ProductSpecification
        {
            Id = Guid.NewGuid(),
            ProductId = dto.ProductId,
            LabelEnglish = dto.LabelEnglish,
            LabelArabic = dto.LabelArabic,
            ValueEnglish = dto.ValueEnglish,
            ValueArabic = dto.ValueArabic
        };

        context.ProductSpecifications.Add(entity);
        await context.SaveChangesAsync();

        return entity.ToProductSpecificationDto();
    }

    public async Task<ProductSpecificationDto?> UpdateAsync(Guid id, ProductSpecificationDto dto)
    {
        var entity = await context.ProductSpecifications.FindAsync(id);
        if (entity == null)
        {
            return null;
        }

        entity.LabelEnglish = dto.LabelEnglish;
        entity.LabelArabic = dto.LabelArabic;
        entity.ValueEnglish = dto.ValueEnglish;
        entity.ValueArabic = dto.ValueArabic;

        await context.SaveChangesAsync();

        return entity.ToProductSpecificationDto();
    }

    public async Task<bool> DeleteAsync(Guid id)
    {
        var entity = await context.ProductSpecifications.FindAsync(id);
        if (entity == null)
        {
            return false;
        }

        context.ProductSpecifications.Remove(entity);
        await context.SaveChangesAsync();

        return true;
    }
}
