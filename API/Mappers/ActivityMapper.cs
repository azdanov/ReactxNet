﻿using API.Requests;
using API.Responses;
using Application.Activities.Commands;
using Application.Activities.Dtos;
using Riok.Mapperly.Abstractions;

namespace API.Mappers;

[Mapper]
internal static partial class ActivityMapper
{
    public static partial ActivityResponse MapToActivityResponse(ActivityDto activity);

    public static partial List<ActivityResponse> MapToActivityResponseList(List<ActivityDto> activities);

    public static partial CreateActivityCommand MapToCreateActivityCommand(CreateActivityRequest request);

    public static partial EditActivityCommand MapToEditActivityCommand(EditActivityRequest request);
}