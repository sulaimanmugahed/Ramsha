using Ramsha.Application.Contracts;
using Ramsha.FileStorage.Settings;
using Google.Apis.Auth.OAuth2;
using Google.Cloud.Storage.V1;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Options;

namespace Ramsha.FileStorage.Services;

public class FirebaseStorageService(IOptions<FirebaseStorageSettings> settings) : IStorageService
{
	private readonly StorageClient _storageClient = StorageClient
	.Create(GoogleCredential.FromJson(settings.Value.Credentials.GoogleCredentialsAsJson()));
	private readonly string _bucketName = settings.Value.BucketName;

	public async Task<string?> UploadFile(IFormFile file, string folderPath = null)
	{
		using var stream = new MemoryStream();
		await file.CopyToAsync(stream);
		stream.Position = 0;

		var objectPath = string.IsNullOrEmpty(folderPath)
		? $"{Guid.NewGuid()}-{file.FileName}"
		: $"{folderPath}/{Guid.NewGuid()}-{file.FileName}";

		var blob = await _storageClient.UploadObjectAsync(
			_bucketName,
			objectPath,
			file.ContentType,
			stream);

		return blob is not null ? objectPath : null;
	}

	public async Task<bool> DeleteFile(string objectPath)
	{
		try
		{
			await _storageClient.DeleteObjectAsync(_bucketName, objectPath);
			return true;


		}
		catch (Exception ex)
		{
			return false;
		}

	}

	public string GetImageUrl(string objectPath)
	{
		return $"https://firebasestorage.googleapis.com/v0/b/{_bucketName}/o/{Uri.EscapeDataString(objectPath)}?alt=media";
	}

}