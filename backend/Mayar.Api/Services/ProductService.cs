using Mayar.Api.Common;
using Mayar.Api.Data;
using Mayar.Api.DTOs;
using Mayar.Api.Interfaces;
using Mayar.Api.Mappings;
using Microsoft.EntityFrameworkCore;

namespace Mayar.Api.Services;

public class ProductService(AppDbContext context) : IProductService
{
    public async Task<List<ProductDto>> GetAllAsync()
    {
        var products = await context.Products
            .Include(p => p.Images)
            .Include(p => p.Colors)
            .Include(p => p.Sizes)
            .Include(p => p.Features)
            .Include(p => p.Specifications)
            .Include(p => p.CareInstructions)
            .ToListAsync();

        return products.Select(p => p.ToProductDto()).ToList();
    }

    public async Task<ProductDto?> GetByIdAsync(Guid id)
    {
        var product = await context.Products
            .Include(p => p.Images)
            .Include(p => p.Colors)
            .Include(p => p.Sizes)
            .Include(p => p.Features)
            .Include(p => p.Specifications)
            .Include(p => p.CareInstructions)
            .FirstOrDefaultAsync(p => p.Id == id);

        return product?.ToProductDto();
    }

    public async Task<ProductDto?> GetBySlugAsync(string slug)
    {
        var product = await context.Products
            .Include(p => p.Images)
            .Include(p => p.Colors)
            .Include(p => p.Sizes)
            .Include(p => p.Features)
            .Include(p => p.Specifications)
            .Include(p => p.CareInstructions)
            .FirstOrDefaultAsync(p => p.Slug == slug);

        return product?.ToProductDto();
    }

    public async Task<ProductDto> CreateAsync(ProductDto productDto)
    {
        var product = productDto.ToProductEntity();
        product.Id = Guid.NewGuid();

        // Generate slug from English name
        if (string.IsNullOrEmpty(product.Slug) && !string.IsNullOrEmpty(productDto.NameEnglish))
        {
            product.Slug = SlugGenerator.GenerateSlug(productDto.NameEnglish);
        }

        context.Products.Add(product);
        await context.SaveChangesAsync();

        return product.ToProductDto();
    }

    public async Task<ProductDto?> UpdateAsync(Guid id, ProductDto productDto)
    {
        var existingProduct = await context.Products.FindAsync(id);

        if (existingProduct == null)
        {
            return null;
        }

        existingProduct.TopCategoryId = productDto.TopCategoryId;
        existingProduct.MiddleCategoryId = productDto.MiddleCategoryId;
        existingProduct.BottomCategoryId = productDto.BottomCategoryId;
        existingProduct.BrandEnglish = productDto.BrandEnglish;
        existingProduct.BrandArabic = productDto.BrandArabic;
        existingProduct.NameEnglish = productDto.NameEnglish;
        existingProduct.NameArabic = productDto.NameArabic;
        existingProduct.ShortDescriptionEnglish = productDto.ShortDescriptionEnglish;
        existingProduct.ShortDescriptionArabic = productDto.ShortDescriptionArabic;
        existingProduct.FullDescriptionEnglish = productDto.FullDescriptionEnglish;
        existingProduct.FullDescriptionArabic = productDto.FullDescriptionArabic;
        existingProduct.BasePrice = productDto.BasePrice;
        existingProduct.CompareAtPrice = productDto.CompareAtPrice;
        existingProduct.Rating = productDto.Rating;
        existingProduct.ReviewCount = productDto.ReviewCount;
        existingProduct.IsNew = productDto.IsNew;
        existingProduct.IsBestSeller = productDto.IsBestSeller;
        existingProduct.IsFeatured = productDto.IsFeatured;
        existingProduct.IsOnSale = productDto.IsOnSale;
        existingProduct.InStock = productDto.InStock;
        existingProduct.ShippingInfoEnglish = productDto.ShippingInfoEnglish;
        existingProduct.ShippingInfoArabic = productDto.ShippingInfoArabic;
        existingProduct.ReturnInfoEnglish = productDto.ReturnInfoEnglish;
        existingProduct.ReturnInfoArabic = productDto.ReturnInfoArabic;
        existingProduct.IsActive = productDto.IsActive;

        // Update slug if name changed
        if (!string.IsNullOrEmpty(productDto.NameEnglish))
        {
            existingProduct.Slug = SlugGenerator.GenerateSlug(productDto.NameEnglish);
        }

        await context.SaveChangesAsync();

        return existingProduct.ToProductDto();
    }

    public async Task<bool> DeleteAsync(Guid id)
    {
        var existingProduct = await context.Products
            .Include(p => p.Images)
            .Include(p => p.Colors)
            .Include(p => p.Sizes)
            .Include(p => p.Features)
            .Include(p => p.Specifications)
            .Include(p => p.CareInstructions)
            .FirstOrDefaultAsync(p => p.Id == id);

        if (existingProduct == null)
        {
            return false;
        }

        context.Products.Remove(existingProduct);
        await context.SaveChangesAsync();

        return true;
    }
}
