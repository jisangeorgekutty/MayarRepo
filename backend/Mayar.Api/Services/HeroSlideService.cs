using Mayar.Api.Data;
using Mayar.Api.DTOs;
using Mayar.Api.Interfaces;
using Mayar.Api.Mappings;
using Microsoft.EntityFrameworkCore;

namespace Mayar.Api.Services;

public class HeroSlideService(AppDbContext context, ICloudinaryService cloudinaryService) : IHeroSlideService
{
    public async Task<List<HeroSlideDto>> GetAllAsync()
    {
        var heroSlides = await context.HeroSlides.ToListAsync();
        return heroSlides.Select(h => h.ToHeroSlideDto()).ToList();
    }

    public async Task<HeroSlideDto?> GetByIdAsync(Guid id)
    {
        var heroSlides = await context.HeroSlides.FindAsync(id);
        if (heroSlides == null)
        {
            return null;
        }
        return heroSlides.ToHeroSlideDto();
    }

    public async Task<HeroSlideDto> CreateAsync(HeroSlideDto heroSlideDto)
    {
        if (heroSlideDto.ImageFile != null)
        {
            var imageUrl = await cloudinaryService.UploadImageAsync(heroSlideDto.ImageFile, "mayar-hero-slides");
            if (!string.IsNullOrEmpty(imageUrl))
            {
                heroSlideDto.ImageUrl = imageUrl;
            }
        }

        var heroSlide = heroSlideDto.ToHeroSlideEntity();
        context.HeroSlides.Add(heroSlide);
        await context.SaveChangesAsync();
        return heroSlide.ToHeroSlideDto();
    }

    public async Task<HeroSlideDto?> UpdateAsync(Guid id, HeroSlideDto heroSlideDto)
    {
        var existingHeroSlide = await context.HeroSlides.FindAsync(id);
        if (existingHeroSlide == null)
        {
            return null;
        }

        if (heroSlideDto.ImageFile != null)
        {
            var imageUrl = await cloudinaryService.UploadImageAsync(heroSlideDto.ImageFile, "mayar-hero-slides");
            if (!string.IsNullOrEmpty(imageUrl))
            {
                heroSlideDto.ImageUrl = imageUrl;
            }
        }

        existingHeroSlide.TitleEnglish = string.IsNullOrWhiteSpace(heroSlideDto.TitleEnglish) ? string.Empty : heroSlideDto.TitleEnglish;
        existingHeroSlide.TitleArabic = string.IsNullOrWhiteSpace(heroSlideDto.TitleArabic) ? string.Empty : heroSlideDto.TitleArabic;
        existingHeroSlide.SubtitleEnglish = string.IsNullOrWhiteSpace(heroSlideDto.SubtitleEnglish) ? string.Empty : heroSlideDto.SubtitleEnglish;
        existingHeroSlide.SubtitleArabic = string.IsNullOrWhiteSpace(heroSlideDto.SubtitleArabic) ? string.Empty : heroSlideDto.SubtitleArabic;
        existingHeroSlide.OldPrice = heroSlideDto.OldPrice == 0 ? 0 : heroSlideDto.OldPrice;
        existingHeroSlide.NewPrice = heroSlideDto.NewPrice == 0 ? 0 : heroSlideDto.NewPrice;
        existingHeroSlide.ButtonTextEnglish = string.IsNullOrWhiteSpace(heroSlideDto.ButtonTextEnglish) ? string.Empty : heroSlideDto.ButtonTextEnglish;
        existingHeroSlide.ButtonTextArabic = string.IsNullOrWhiteSpace(heroSlideDto.ButtonTextArabic) ? string.Empty : heroSlideDto.ButtonTextArabic;
        existingHeroSlide.ButtonLink = string.IsNullOrWhiteSpace(heroSlideDto.ButtonLink) ? string.Empty : heroSlideDto.ButtonLink;
        existingHeroSlide.IsActive = heroSlideDto.IsActive;

        if (!string.IsNullOrEmpty(heroSlideDto.ImageUrl))
        {
            existingHeroSlide.ImageUrl = heroSlideDto.ImageUrl;
        }

        await context.SaveChangesAsync();

        return existingHeroSlide.ToHeroSlideDto();
    }

    public async Task<bool> DeleteAsync(Guid id)
    {
        var existingHeroSlide = await context.HeroSlides.FindAsync(id);
        if (existingHeroSlide == null)
        {
            return false;
        }

        context.HeroSlides.Remove(existingHeroSlide);
        await context.SaveChangesAsync();

        return true;
    }
}
