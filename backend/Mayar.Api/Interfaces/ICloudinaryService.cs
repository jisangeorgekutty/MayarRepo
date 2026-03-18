using Microsoft.AspNetCore.Http;

namespace Mayar.Api.Interfaces;

public interface ICloudinaryService
{
    Task<string?> UploadImageAsync(IFormFile imageFile, string folder);
    Task<List<string>> UploadMultipleImagesAsync(List<IFormFile> imageFiles, string folder);
    Task<bool> DeleteImageAsync(string publicId);
}
