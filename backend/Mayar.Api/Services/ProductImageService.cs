using Mayar.Api.Data;
using Mayar.Api.DTOs;
using Mayar.Api.Entities;
using Mayar.Api.Interfaces;
using Mayar.Api.Mappings;
using Microsoft.EntityFrameworkCore;

namespace Mayar.Api.Services;

public class ProductImageService(AppDbContext context, ICloudinaryService cloudinaryService) : IProductImageService
{
    public async Task<List<ProductImageDto>> GetAllAsync()
    {
        var images = await context.ProductImages.ToListAsync();
        return images.Select(i => i.ToProductImageDto()).ToList();
    }

    public async Task<ProductImageDto?> GetByIdAsync(Guid id)
    {
        var image = await context.ProductImages.FindAsync(id);
        return image?.ToProductImageDto();
    }

    public async Task<List<ProductImageDto>> GetByProductIdAsync(Guid productId)
    {
        var images = await context.ProductImages
            .Where(i => i.ProductId == productId)
            .ToListAsync();
        return images.Select(i => i.ToProductImageDto()).ToList();
    }

    public async Task<ProductImageDto> CreateAsync(ProductImageDto dto)
    {
        var entity = new ProductImage
        {
            Id = Guid.NewGuid(),
            ProductId = dto.ProductId,
            ImageAlt = dto.ImageAlt
        };

        if (dto.ImageFile != null)
        {
            var imageUrl = await cloudinaryService.UploadImageAsync(dto.ImageFile, "mayar-products");
            entity.ImageUrl = imageUrl;
        }

        context.ProductImages.Add(entity);
        await context.SaveChangesAsync();

        return entity.ToProductImageDto();
    }

    public async Task<ProductImageDto?> UpdateAsync(Guid id, ProductImageDto dto)
    {
        var entity = await context.ProductImages.FindAsync(id);
        if (entity == null)
        {
            return null;
        }

        entity.ImageAlt = dto.ImageAlt;

        if (dto.ImageFile != null)
        {
            var imageUrl = await cloudinaryService.UploadImageAsync(dto.ImageFile, "mayar-products");
            entity.ImageUrl = imageUrl;
        }

        await context.SaveChangesAsync();

        return entity.ToProductImageDto();
    }

    public async Task<bool> DeleteAsync(Guid id)
    {
        var entity = await context.ProductImages.FindAsync(id);
        if (entity == null)
        {
            return false;
        }

        context.ProductImages.Remove(entity);
        await context.SaveChangesAsync();

        return true;
    }
}
