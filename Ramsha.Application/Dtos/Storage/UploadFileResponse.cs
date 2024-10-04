using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Ramsha.Application.Dtos.Storage;

public record UploadFileResponse(
    string Url,
    string FullPath
);

