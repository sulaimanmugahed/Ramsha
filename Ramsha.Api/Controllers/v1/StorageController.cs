using Asp.Versioning;
using Ramsha.Application.Contracts;
using Ramsha.Application.Dtos.Storage;
using Ramsha.Application.Wrappers;
using Microsoft.AspNetCore.Mvc;

namespace Ramsha.Api.Controllers.v1;

/// <summary>
/// Manages file storage-related operations.
/// </summary>
[ApiVersion("1.0")]
public class StorageController(IStorageService storageService) : BaseApiController
{
    /// <summary>
    /// Uploads a single file to the storage.
    /// </summary>
    /// <remarks>
    /// This endpoint uploads a single file to the specified path in the storage system.
    /// Returns the URL and full path of the uploaded file.
    /// </remarks>
    [HttpPost(nameof(Upload))]
    public async Task<BaseResult<UploadFileResponse?>> Upload([FromForm] UploadFileRequest request)
    {
        var fullPath = await storageService.UploadFile(request.File, request.Path);
        if (fullPath is null)
            return new Error(ErrorCode.Exception, "We couldn't upload the file");

        return new UploadFileResponse(storageService.GetImageUrl(fullPath), fullPath);
    }

    /// <summary>
    /// Uploads multiple files to the storage.
    /// </summary>
    /// <remarks>
    /// This endpoint uploads multiple files to the specified path in the storage system.
    /// Returns a list of URLs and full paths for the uploaded files.
    /// </remarks>
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