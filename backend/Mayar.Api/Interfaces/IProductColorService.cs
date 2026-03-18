using Mayar.Api.DTOs;

namespace Mayar.Api.Interfaces;

public interface IProductColorService
{
    Task<List<ProductColorDto>> GetAllAsync();
    Task<ProductColorDto?> GetByIdAsync(Guid id);
    Task<List<ProductColorDto>> GetByProductIdAsync(Guid productId);
    Task<ProductColorDto> CreateAsync(ProductColorDto dto);
    Task<ProductColorDto?> UpdateAsync(Guid id, ProductColorDto dto);
    Task<bool> DeleteAsync(Guid id);
}
