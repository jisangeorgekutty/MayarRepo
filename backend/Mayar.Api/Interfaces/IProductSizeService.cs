using Mayar.Api.DTOs;

namespace Mayar.Api.Interfaces;

public interface IProductSizeService
{
    Task<List<ProductSizeDto>> GetAllAsync();
    Task<ProductSizeDto?> GetByIdAsync(Guid id);
    Task<List<ProductSizeDto>> GetByProductIdAsync(Guid productId);
    Task<ProductSizeDto> CreateAsync(ProductSizeDto dto);
    Task<ProductSizeDto?> UpdateAsync(Guid id, ProductSizeDto dto);
    Task<bool> DeleteAsync(Guid id);
}
