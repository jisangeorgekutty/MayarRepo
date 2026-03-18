using Mayar.Api.DTOs;

namespace Mayar.Api.Interfaces;

public interface IProductFeatureService
{
    Task<List<ProductFeatureDto>> GetAllAsync();
    Task<ProductFeatureDto?> GetByIdAsync(Guid id);
    Task<List<ProductFeatureDto>> GetByProductIdAsync(Guid productId);
    Task<ProductFeatureDto> CreateAsync(ProductFeatureDto dto);
    Task<ProductFeatureDto?> UpdateAsync(Guid id, ProductFeatureDto dto);
    Task<bool> DeleteAsync(Guid id);
}
