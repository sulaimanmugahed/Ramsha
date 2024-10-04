
using Microsoft.AspNetCore.Http;

namespace Ramsha.Application.Dtos.Storage;

public record UploadFileRequest(
    IFormFile File,
    string Path
);

public record UploadFileRangeRequest(
    List<IFormFile> Files,
    string Path
);

