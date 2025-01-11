
using Ramsha.Application.Wrappers;

namespace Ramsha.Application.Contracts.Caching;

public interface ICacheService
{
	Task<BaseResult> SetValue(string key, string value, TimeSpan? expiration = null);
	Task<BaseResult<string>> GetValue(string key);
	Task<BaseResult> SetObject<T>(string key, T value, TimeSpan? expiration = null);
	Task<T?> GetObject<T>(string key);
	Task<BaseResult<T?>> GetFromHash<T>(string hashKey, string entryKey);
	Task<BaseResult<IEnumerable<T>>> GetHash<T>(string hashKey);
	Task<BaseResult> RemoveFromHash(string hashKey, string entryKey);
	Task<BaseResult> RemoveByKey(string key);
	Task<BaseResult> RemoveAllByPrefix(string prefix);

	Task<BaseResult> SetHash<T>(string hashKey, IEnumerable<T> rows, Func<T, object> entryKeySelector, TimeSpan expireTime);
	Task<BaseResult> SetToHash<T>(string hashKey, T data, string entryKey);
}