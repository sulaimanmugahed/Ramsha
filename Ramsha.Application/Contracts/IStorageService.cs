using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Ramsha.Application.Contracts;
public interface IStorageService
{
	Task<string?> UploadFile(IFormFile file, string folderPath = null);
	Task<bool> DeleteFile(string path);
	string GetImageUrl(string objectPath);
}
