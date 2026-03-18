using System;
using Mayar.Api.DTOs;
using Mayar.Api.Entities;

namespace Mayar.Api.Mappings;

public static class HeroSlideMapper
{
    public static HeroSlideDto ToHeroSlideDto(this HeroSlide entity)
    {
        return new HeroSlideDto
        {
            Id = entity.Id,
            ImageUrl = entity.ImageUrl ?? string.Empty,
            TitleEnglish = entity.TitleEnglish,
            TitleArabic = entity.TitleArabic,
            SubtitleEnglish = entity.SubtitleEnglish,
            SubtitleArabic = entity.SubtitleArabic,
            OldPrice = entity.OldPrice,
            NewPrice = entity.NewPrice,
            ButtonTextEnglish = entity.ButtonTextEnglish,
            ButtonTextArabic = entity.ButtonTextArabic,
            ButtonLink = entity.ButtonLink,
            IsActive = entity.IsActive
        };
    }
    public static HeroSlide ToHeroSlideEntity(this HeroSlideDto dto)
    {
        return new HeroSlide
        {
            Id = dto.Id,
            ImageUrl = dto.ImageUrl,
            TitleEnglish = dto.TitleEnglish,
            TitleArabic = dto.TitleArabic,
            SubtitleEnglish = dto.SubtitleEnglish,
            SubtitleArabic = dto.SubtitleArabic,
            OldPrice = dto.OldPrice,
            NewPrice = dto.NewPrice,
            ButtonTextEnglish = dto.ButtonTextEnglish,
            ButtonTextArabic = dto.ButtonTextArabic,
            ButtonLink = dto.ButtonLink,
        };
    }
}
