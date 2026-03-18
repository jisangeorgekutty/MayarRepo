using Mayar.Api.Common;
using Mayar.Api.Data;
using Mayar.Api.DTOs;
using Mayar.Api.Interfaces;
using Mayar.Api.Mappings;
using Microsoft.EntityFrameworkCore;

namespace Mayar.Api.Services;

public class CategoryService(AppDbContext context, ICloudinaryService cloudinaryService) : ICategoryService
{
    //Top Category
    public async Task<List<TopCategoryDto>> GetAllTopCategoriesAsync()
    {
        var categories = await context.TopCategories.ToListAsync();
        return categories.Select(c => c.ToTopCategoryDto()).ToList();
    }

    public async Task<TopCategoryDto?> GetTopCategoryByIdAsync(Guid id)
    {
        var category = await context.TopCategories.FindAsync(id);
        return category?.ToTopCategoryDto();
    }
    public async Task<TopCategoryDto?> GetTopCategoryBySlugAsync(string slug)
    {
        var category = await context.TopCategories.FirstOrDefaultAsync(c => c.Slug == slug);
        return category?.ToTopCategoryDto();
    }

    public async Task<TopCategoryDto> CreateTopCategoryAsync(TopCategoryDto dto)
    {
        if (dto.ImageFile != null)
        {
            var imageUrl = await cloudinaryService.UploadImageAsync(dto.ImageFile, "mayar-categories");
            if (!string.IsNullOrEmpty(imageUrl))
            {
                dto.ImageUrl = imageUrl;
            }
        }

        var entity = dto.ToTopCategoryEntity();
        entity.Slug = SlugGenerator.GenerateSlug(dto.TitleEnglish ?? string.Empty);
        context.TopCategories.Add(entity);
        await context.SaveChangesAsync();
        return entity.ToTopCategoryDto();
    }
    public async Task<bool> UpdateTopCategoryAsync(Guid id, TopCategoryDto dto)
    {
        var entity = await context.TopCategories.FindAsync(id);
        if (entity == null)
        {
            return false;
        }

        if (dto.ImageFile != null)
        {
            var imageUrl = await cloudinaryService.UploadImageAsync(dto.ImageFile, "mayar-categories");
            if (!string.IsNullOrEmpty(imageUrl))
            {
                dto.ImageUrl = imageUrl;
            }
        }

        entity.TitleEnglish = string.IsNullOrWhiteSpace(dto.TitleEnglish) ? string.Empty : dto.TitleEnglish;
        entity.TitleArabic = string.IsNullOrWhiteSpace(dto.TitleArabic) ? string.Empty : dto.TitleArabic;
        entity.ImageAlt = string.IsNullOrWhiteSpace(dto.ImageAlt) ? string.Empty : dto.ImageAlt;
        entity.IsActive = dto.IsActive;

        if (!string.IsNullOrEmpty(dto.ImageUrl))
        {
            entity.ImageUrl = dto.ImageUrl;
        }
        await context.SaveChangesAsync();
        return true;
    }

    public async Task<bool> DeleteTopCategoryAsync(Guid id)
    {
        var entity = await context.TopCategories.FindAsync(id);
        if (entity == null)
        {
            return false;
        }

        context.TopCategories.Remove(entity);
        await context.SaveChangesAsync();
        return true;
    }

    //Middle Category
    public async Task<List<MiddleCategoryDto>> GetAllMiddleCategoriesAsync()
    {
        var categories = await context.MiddleCategories.ToListAsync();
        return categories.Select(c => c.ToMiddleCategoryDto()).ToList();
    }

    public async Task<MiddleCategoryDto?> GetMiddleCategoryByIdAsync(Guid id)
    {
        var category = await context.MiddleCategories.FindAsync(id);
        return category?.ToMiddleCategoryDto();
    }
    public async Task<MiddleCategoryDto?> GetMiddleCategoryBySlugAsync(string slug)
    {
        var category = await context.MiddleCategories.FirstOrDefaultAsync(c => c.Slug == slug);
        return category?.ToMiddleCategoryDto();
    }

    public async Task<MiddleCategoryDto> CreateMiddleCategoryAsync(MiddleCategoryDto dto)
    {
        if (dto.ImageFile != null)
        {
            var imageUrl = await cloudinaryService.UploadImageAsync(dto.ImageFile, "mayar-categories");
            if (!string.IsNullOrEmpty(imageUrl))
            {
                dto.ImageUrl = imageUrl;
            }
        }

        var entity = dto.ToMiddleCategoryEntity();
        entity.Slug = SlugGenerator.GenerateSlug(dto.TitleEnglish ?? string.Empty);

        context.MiddleCategories.Add(entity);
        await context.SaveChangesAsync();
        return entity.ToMiddleCategoryDto();
    }
    public async Task<bool> UpdateMiddleCategoryAsync(Guid id, MiddleCategoryDto dto)
    {
        var entity = await context.MiddleCategories.FindAsync(id);
        if (entity == null)
        {
            return false;
        }

        if (dto.ImageFile != null)
        {
            var imageUrl = await cloudinaryService.UploadImageAsync(dto.ImageFile, "mayar-categories");
            if (!string.IsNullOrEmpty(imageUrl))
            {
                dto.ImageUrl = imageUrl;
            }
        }

        entity.TopCategoryId = string.IsNullOrWhiteSpace(dto.TopCategoryId.ToString()) ? Guid.Empty : dto.TopCategoryId;
        entity.TitleEnglish = string.IsNullOrWhiteSpace(dto.TitleEnglish) ? string.Empty : dto.TitleEnglish;
        entity.TitleArabic = string.IsNullOrWhiteSpace(dto.TitleArabic) ? string.Empty : dto.TitleArabic;
        entity.SubtitleEnglish = string.IsNullOrWhiteSpace(dto.SubtitleEnglish) ? string.Empty : dto.SubtitleEnglish;
        entity.SubtitleArabic = string.IsNullOrWhiteSpace(dto.SubtitleArabic) ? string.Empty : dto.SubtitleArabic;
        entity.ImageAlt = string.IsNullOrWhiteSpace(dto.ImageAlt) ? string.Empty : dto.ImageAlt;
        entity.ButtonTextEnglish = string.IsNullOrWhiteSpace(dto.ButtonTextEnglish) ? string.Empty : dto.ButtonTextEnglish;
        entity.ButtonTextArabic = string.IsNullOrWhiteSpace(dto.ButtonTextArabic) ? string.Empty : dto.ButtonTextArabic;
        entity.ButtonLink = string.IsNullOrWhiteSpace(dto.ButtonLink) ? string.Empty : dto.ButtonLink;
        entity.IsActive = dto.IsActive;

        if (!string.IsNullOrEmpty(dto.ImageUrl))
        {
            entity.ImageUrl = dto.ImageUrl;
        }

        await context.SaveChangesAsync();
        return true;
    }

    public async Task<bool> DeleteMiddleCategoryAsync(Guid id)
    {
        var entity = await context.MiddleCategories.FindAsync(id);
        if (entity == null)
        {
            return false;
        }

        context.MiddleCategories.Remove(entity);
        await context.SaveChangesAsync();
        return true;
    }

    //Bottom Category
    public async Task<List<BottomCategoryDto>> GetAllBottomCategoriesAsync()
    {
        var categories = await context.BottomCategories.ToListAsync();
        return categories.Select(c => c.ToBottomCategoryDto()).ToList();
    }

    public async Task<BottomCategoryDto?> GetBottomCategoryByIdAsync(Guid id)
    {
        var category = await context.BottomCategories.FindAsync(id);
        return category?.ToBottomCategoryDto();
    }
    public async Task<BottomCategoryDto?> GetBottomCategoryBySlugAsync(string slug)
    {
        var category = await context.BottomCategories.FirstOrDefaultAsync(c => c.Slug == slug);
        return category?.ToBottomCategoryDto();
    }

    public async Task<BottomCategoryDto> CreateBottomCategoryAsync(BottomCategoryDto dto)
    {

        var entity = dto.ToBottomCategoryEntity();
        entity.Slug = SlugGenerator.GenerateSlug(dto.TitleEnglish ?? string.Empty);
        context.BottomCategories.Add(entity);
        await context.SaveChangesAsync();
        return entity.ToBottomCategoryDto();
    }
    public async Task<bool> UpdateBottomCategoryAsync(Guid id, BottomCategoryDto dto)
    {
        var entity = await context.BottomCategories.FindAsync(id);
        if (entity == null)
        {
            return false;
        }

        entity.TopCategoryId = string.IsNullOrWhiteSpace(dto.TopCategoryId.ToString()) ? Guid.Empty : dto.TopCategoryId;
        entity.MiddleCategoryId = string.IsNullOrWhiteSpace(dto.MiddleCategoryId.ToString()) ? Guid.Empty : dto.MiddleCategoryId;
        entity.TitleEnglish = string.IsNullOrWhiteSpace(dto.TitleEnglish) ? string.Empty : dto.TitleEnglish;
        entity.TitleArabic = string.IsNullOrWhiteSpace(dto.TitleArabic) ? string.Empty : dto.TitleArabic;
        entity.IsActive = dto.IsActive;

        await context.SaveChangesAsync();
        return true;
    }

    public async Task<bool> DeleteBottomCategoryAsync(Guid id)
    {
        var entity = await context.BottomCategories.FindAsync(id);
        if (entity == null)
        {
            return false;
        }

        context.BottomCategories.Remove(entity);
        await context.SaveChangesAsync();
        return true;
    }
}
