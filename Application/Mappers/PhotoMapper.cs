using Application.Photos.Dto;
using Domain;
using Riok.Mapperly.Abstractions;

namespace Application.Mappers;

[Mapper]
internal static partial class PhotoMapper
{
    public static partial PhotoDto MapToPhotoDto(Photo photo);
}