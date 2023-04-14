using API.Requests;
using API.Responses;
using Application.Photos.Commands;
using Application.Photos.Dto;
using Riok.Mapperly.Abstractions;

namespace API.Mappers;

[Mapper]
internal static partial class PhotoMapper
{
    public static partial PhotoResponse MapToPhotoResponse(PhotoDto photo);

    public static partial AddPhotoCommand MapToAddPhotoCommand(AddPhotoRequest request);
}