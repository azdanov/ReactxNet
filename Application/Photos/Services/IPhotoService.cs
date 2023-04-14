using Application.Photos.Dto;
using Microsoft.AspNetCore.Http;

namespace Application.Photos.Services;

public interface IPhotoService
{
    Task<PhotoUploadResultDto?> AddPhoto(IFormFile file);
    Task<string?> DeletePhoto(string publicId);
}