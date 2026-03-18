using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using Mayar.Api.Interfaces;

namespace Mayar.Api.Services;

public class CloudinaryService(Cloudinary cloudinary, ILogger<CloudinaryService> logger) : ICloudinaryService
{
    public async Task<string?> UploadImageAsync(IFormFile imageFile, string folder)
    {
        try
        {
            await using var stream = imageFile.OpenReadStream();

            var uploadParams = new ImageUploadParams()
            {
                File = new FileDescription(imageFile.FileName, stream),
                Folder = folder
            };

            var uploadResult = await cloudinary.UploadAsync(uploadParams);

            if (uploadResult.Error != null)
            {
                logger.LogError("Cloudinary upload failed: {Error}", uploadResult.Error.Message);
                return null;
            }

            if (!string.IsNullOrEmpty(uploadResult.SecureUrl?.ToString()))
            {
                logger.LogInformation("Image uploaded successfully: {ImageUrl}", uploadResult.SecureUrl.ToString());
                return uploadResult.SecureUrl.ToString();
            }

            return null;
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "Error uploading image to Cloudinary");
            return null;
        }
    }

    public async Task<List<string>> UploadMultipleImagesAsync(List<IFormFile> imageFiles, string folder)
    {
        var uploadedUrls = new List<string>();

        foreach (var imageFile in imageFiles)
        {
            var url = await UploadImageAsync(imageFile, folder);
            if (!string.IsNullOrEmpty(url))
            {
                uploadedUrls.Add(url);
            }
        }

        return uploadedUrls;
    }

    public async Task<bool> DeleteImageAsync(string publicId)
    {
        try
        {
            var deleteParams = new DeletionParams(publicId);
            var result = await cloudinary.DestroyAsync(deleteParams);

            if (result.Result == "ok")
            {
                logger.LogInformation("Image deleted successfully: {PublicId}", publicId);
                return true;
            }

            logger.LogWarning("Failed to delete image: {PublicId}", publicId);
            return false;
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "Error deleting image from Cloudinary: {PublicId}", publicId);
            return false;
        }
    }
}
