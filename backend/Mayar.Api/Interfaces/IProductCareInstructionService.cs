using Mayar.Api.DTOs;

namespace Mayar.Api.Interfaces;

public interface IProductCareInstructionService
{
    Task<List<ProductCareInstructionDto>> GetAllAsync();
    Task<ProductCareInstructionDto?> GetByIdAsync(Guid id);
    Task<List<ProductCareInstructionDto>> GetByProductIdAsync(Guid productId);
    Task<ProductCareInstructionDto> CreateAsync(ProductCareInstructionDto dto);
    Task<ProductCareInstructionDto?> UpdateAsync(Guid id, ProductCareInstructionDto dto);
    Task<bool> DeleteAsync(Guid id);
}
