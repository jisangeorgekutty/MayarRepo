using Mayar.Api.Common;
using Mayar.Api.DTOs;
using Mayar.Api.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace Mayar.Api.Controllers;

[Route("api/[controller]")]
[ApiController]
public class ProductSpecificationController(IProductSpecificationService service) : ControllerBase
{
    [HttpGet("get-all")]
    public async Task<IActionResult> GetAll()
    {
        var items = await service.GetAllAsync();
        return Ok(new ApiResponse<List<ProductSpecificationDto>> { Success = true, Message = "Specifications retrieved successfully.", Data = items });
    }

    [HttpGet("get/{id}")]
    public async Task<IActionResult> GetById(Guid id)
    {
        var item = await service.GetByIdAsync(id);
        if (item == null)
        {
            return NotFound(new ApiResponse<object> { Success = false, Message = "Specification not found." });
        }
        return Ok(new ApiResponse<ProductSpecificationDto> { Success = true, Message = "Specification retrieved successfully.", Data = item });
    }

    [HttpGet("get-by-product/{productId}")]
    public async Task<IActionResult> GetByProductId(Guid productId)
    {
        var items = await service.GetByProductIdAsync(productId);
        return Ok(new ApiResponse<List<ProductSpecificationDto>> { Success = true, Message = "Specifications retrieved successfully.", Data = items });
    }

    [HttpPost("create")]
    public async Task<IActionResult> Create([FromForm] ProductSpecificationDto dto)
    {
        var item = await service.CreateAsync(dto);
        return CreatedAtAction(nameof(GetById), new { id = item.Id },
            new ApiResponse<ProductSpecificationDto> { Success = true, Message = "Specification created successfully.", Data = item });
    }

    [HttpPut("update/{id}")]
    public async Task<IActionResult> Update(Guid id, [FromForm] ProductSpecificationDto dto)
    {
        var item = await service.UpdateAsync(id, dto);
        if (item == null)
        {
            return NotFound(new ApiResponse<object> { Success = false, Message = "Specification not found." });
        }
        return Ok(new ApiResponse<ProductSpecificationDto> { Success = true, Message = "Specification updated successfully.", Data = item });
    }

    [HttpDelete("delete/{id}")]
    public async Task<IActionResult> Delete(Guid id)
    {
        var result = await service.DeleteAsync(id);
        if (!result)
        {
            return NotFound(new ApiResponse<object> { Success = false, Message = "Specification not found." });
        }
        return Ok(new ApiResponse<object> { Success = true, Message = "Specification deleted successfully." });
    }
}
