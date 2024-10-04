
using Asp.Versioning;
using Ramsha.Application.Contracts;
using Ramsha.Application.Dtos.Storage;
using Ramsha.Application.Wrappers;
using Microsoft.AspNetCore.Mvc;

namespace Ramsha.Api.Controllers.v1;

[ApiVersion("1.0")]
public class StorageController(IStorageService storageService) : BaseApiController
{
    [HttpPost(nameof(Upload))]
    public async Task<BaseResult<UploadFileResponse?>> Upload([FromForm] UploadFileRequest request)
    {
        var fullPath = await storageService.UploadFile(request.File, request.Path);
        if (fullPath is null)
            return new Error(ErrorCode.Exception, "We couldn't upload the file");

        return new UploadFileResponse(storageService.GetImageUrl(fullPath), fullPath);
    }

    [HttpPost(nameof(UploadRange))]
    public async Task<BaseResult<List<UploadFileResponse>>> UploadRange([FromForm] UploadFileRangeRequest request)
    {
        List<UploadFileResponse> responses = [];

        foreach (var file in request.Files)
        {
            var fullPath = await storageService.UploadFile(file, request.Path);
            if (fullPath is null)
                return new Error(ErrorCode.Exception, "We couldn't upload the file");

            responses.Add(new UploadFileResponse(storageService.GetImageUrl(fullPath), fullPath));
        }

        return responses;
    }
}
