using System;
using Mayar.Api.DTOs;
using Mayar.Api.Entities;

namespace Mayar.Api.Mappings;

public static class WishlistMapper
{
    public static WishlistDto ToWishlistDto(this Wishlist wishlist)
    {
        return new WishlistDto
        {
            Id = wishlist.Id,
            ProductId = wishlist.ProductId,
            UserId = wishlist.UserId,
            CreatedAt = wishlist.CreatedAt
        };
    }

    public static Wishlist ToWishlistEntity(this WishlistDto dto)
    {
        return new Wishlist
        {
            Id = dto.Id,
            ProductId = dto.ProductId,
            UserId = dto.UserId,
        };
    }
}
