using Application.Photos.Dto;
using Application.Photos.Options;
using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Options;

namespace Application.Photos.Services;

public class PhotoService : IPhotoService
{
    private readonly Cloudinary _cloudinary;

    public PhotoService(IOptions<CloudinaryOptions> config)
    {
        var account = new Account(
            config.Value.CloudName,
            config.Value.ApiKey,
            config.Value.ApiSecret
        );
        _cloudinary = new Cloudinary(account);
    }

    public async Task<PhotoUploadResultDto?> AddPhoto(IFormFile file)
    {
        if (file.Length <= 0) return null;

        await using var stream = file.OpenReadStream();
        var uploadParams = new ImageUploadParams
        {
            File = new FileDescription(file.FileName, stream),
            Transformation = new Transformation().Height(200).Width(200).Crop("fill")
        };

        var result = await _cloudinary.UploadAsync(uploadParams);
        if (result.Error != null)
        {
            throw new InvalidOperationException(result.Error.Message);
        }

        return new PhotoUploadResultDto
        {
            PublicId = result.PublicId,
            Url = result.SecureUrl.ToString()
        };
    }

    public async Task<string?> DeletePhoto(string publicId)
    {
        var deleteParams = new DeletionParams(publicId);
        var result = await _cloudinary.DestroyAsync(deleteParams);
        return result.Result == "ok" ? result.Result : null;
    }
}