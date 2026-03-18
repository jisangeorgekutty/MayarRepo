using Mayar.Api.DTOs;

namespace Mayar.Api.Interfaces;

public interface IProductSpecificationService
{
    Task<List<ProductSpecificationDto>> GetAllAsync();
    Task<ProductSpecificationDto?> GetByIdAsync(Guid id);
    Task<List<ProductSpecificationDto>> GetByProductIdAsync(Guid productId);
    Task<ProductSpecificationDto> CreateAsync(ProductSpecificationDto dto);
    Task<ProductSpecificationDto?> UpdateAsync(Guid id, ProductSpecificationDto dto);
    Task<bool> DeleteAsync(Guid id);
}
