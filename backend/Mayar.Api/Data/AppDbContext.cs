using Mayar.Api.Entities;
using Microsoft.EntityFrameworkCore;

namespace Mayar.Api.Data
{
    public class AppDbContext(DbContextOptions<AppDbContext> options) : DbContext(options)
    {
        public DbSet<User> Users { get; set; }
        public DbSet<HeroSlide> HeroSlides { get; set; }
        
        public DbSet<TopCategory> TopCategories { get; set; }
        public DbSet<MiddleCategory> MiddleCategories { get; set; }
        public DbSet<BottomCategory> BottomCategories { get; set; }

        public DbSet<Product> Products { get; set; }
        public DbSet<ProductImage> ProductImages { get; set; }
        public DbSet<ProductColor> ProductColors { get; set; }
        public DbSet<ProductSize> ProductSizes { get; set; }
        public DbSet<ProductCareInstruction> ProductCareInstructions { get; set; }
        public DbSet<ProductFeature> ProductFeatures { get; set; }
        public DbSet<ProductSpecification> ProductSpecifications { get; set; }

        public DbSet<Wishlist> Wishlists { get; set; }
    }
}
