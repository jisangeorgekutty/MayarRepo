using Mayar.Api.Data;
using Mayar.Api.DTOs;
using Mayar.Api.Entities;
using Mayar.Api.Interfaces;
using Mayar.Api.Mappings;
using Microsoft.EntityFrameworkCore;

namespace Mayar.Api.Services;

public class WishlistService(AppDbContext context) : IWishlistService
{
    public async Task<List<WishlistDto>> GetAllByUserAsync(Guid userId)
    {
        var wishlists = await context.Wishlists
            .Where(w => w.UserId == userId)
            .OrderByDescending(w => w.CreatedAt)
            .ToListAsync();

        return wishlists.Select(w => w.ToWishlistDto()).ToList();
    }

    public async Task<WishlistDto?> GetByIdAsync(Guid id)
    {
        var wishlist = await context.Wishlists.FindAsync(id);
        return wishlist?.ToWishlistDto();
    }

    public async Task<WishlistDto> CreateAsync(Guid userId, Guid productId)
    {
        var existing = await context.Wishlists
            .FirstOrDefaultAsync(w => w.UserId == userId && w.ProductId == productId);

        if (existing != null)
        {
            return existing.ToWishlistDto();
        }

        var wishlist = new Wishlist
        {
            Id = Guid.NewGuid(),
            UserId = userId,
            ProductId = productId,
        };

        context.Wishlists.Add(wishlist);
        await context.SaveChangesAsync();

        return wishlist.ToWishlistDto();
    }

    public async Task<bool> RemoveAsync(Guid id)
    {
        var wishlist = await context.Wishlists.FindAsync(id);
        if (wishlist == null)
        {
            return false;
        }

        context.Wishlists.Remove(wishlist);
        await context.SaveChangesAsync();
        return true;
    }

    public async Task<bool> RemoveByUserAndProductAsync(Guid userId, Guid productId)
    {
        var wishlist = await context.Wishlists
            .FirstOrDefaultAsync(w => w.UserId == userId && w.ProductId == productId);

        if (wishlist == null)
        {
            return false;
        }

        context.Wishlists.Remove(wishlist);
        await context.SaveChangesAsync();
        return true;
    }

    public async Task<bool> IsInWishlistAsync(Guid userId, Guid productId)
    {
        return await context.Wishlists
            .AnyAsync(w => w.UserId == userId && w.ProductId == productId);
    }
}
