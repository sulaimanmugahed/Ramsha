
using System.Text.Json;
using Ramsha.Application.Contracts.Caching;
using Ramsha.Application.Wrappers;
using StackExchange.Redis;

namespace Ramsha.CacheService.Services;

public class RedisCacheService : IRedisCacheService
{
    private readonly IDatabase _database;

    public RedisCacheService(IConnectionMultiplexer redis)
    {
        _database = redis.GetDatabase();
    }

    public async Task<BaseResult> SetValue(string key, string value, TimeSpan? expiration = null)
    {
        try
        {
            var setResult = await _database.StringSetAsync(key, value, expiration);
            return setResult ? BaseResult.Ok() : BaseResult.Failure();
        }
        catch
        {
            return new Error(ErrorCode.Exception, "Failed to set value in Redis.");
        }
    }

    public async Task<BaseResult<string>> GetValue(string key)
    {
        try
        {
            var value = await _database.StringGetAsync(key);
            return value.HasValue ? value.ToString() : new Error(ErrorCode.EmptyData, "Key not found.");
        }
        catch
        {
            return new Error(ErrorCode.Exception, "Failed to get value from Redis.");
        }
    }

    public async Task<BaseResult> SetObject<T>(string key, T value, TimeSpan? expiration = null)
    {
        try
        {
            var serializedValue = JsonSerializer.Serialize(value);
            var setResult = await _database.StringSetAsync(key, serializedValue, expiration);
            return setResult ? BaseResult.Ok() : BaseResult.Failure();
        }
        catch
        {
            return new Error(ErrorCode.Exception, "Failed to set object in Redis.");
        }
    }

    public async Task<T?> GetObject<T>(string key)
    {
        try
        {
            var value = await _database.StringGetAsync(key);
            if (!value.HasValue)
                return default;

            var deserialized = JsonSerializer.Deserialize<T>(value);
            return deserialized;
        }
        catch
        {
            throw new Exception("Failed to get object from Redis.");
        }
    }

    public async Task<BaseResult> SetToHash<T>(string hashKey, T data, string entryKey)
    {
        try
        {
            var exist = await _database.KeyExistsAsync(hashKey);
            if (!exist)
                return new Error(ErrorCode.EmptyData, "Hash key does not exist.");

            await _database.HashSetAsync(hashKey, new[]
            {
                new HashEntry(entryKey, JsonSerializer.Serialize(data)),
            });
            return BaseResult.Ok();
        }
        catch
        {
            return new Error(ErrorCode.Exception, "Failed to set data to hash in Redis.");
        }
    }

    public async Task<BaseResult<IEnumerable<T>>> GetHash<T>(string hashKey)
    {
        try
        {
            var completeHash = await _database.HashGetAllAsync(hashKey);
            if (completeHash.Length == 0)
                return new Error(ErrorCode.EmptyData, "Hash key not found.");

            var results = completeHash
                .Where(e => e.Value.HasValue)
                .Select(e =>
                {
                    try { return JsonSerializer.Deserialize<T>(e.Value!); }
                    catch { return default; }
                })
                .Where(item => item != null)
                .ToList();

            return results!;
        }
        catch
        {
            return new Error(ErrorCode.Exception, "Failed to retrieve hash from Redis.");
        }
    }

    public async Task<BaseResult> RemoveFromHash(string hashKey, string entryKey)
    {
        try
        {
            var exist = await _database.HashExistsAsync(hashKey, entryKey);
            if (!exist)
                return new Error(ErrorCode.EmptyData, "Entry does not exist in hash.");

            var result = await _database.HashDeleteAsync(hashKey, entryKey);
            return result ? BaseResult.Ok() : BaseResult.Failure();
        }
        catch
        {
            return new Error(ErrorCode.Exception, "Failed to remove entry from hash.");
        }
    }

    public async Task<BaseResult> RemoveKey(string key)
    {
        try
        {
            var exist = await _database.KeyExistsAsync(key);
            if (!exist)
                return new Error(ErrorCode.EmptyData, "key does not exist.");

            var result = await _database.KeyDeleteAsync(key);
            return result ? BaseResult.Ok() : BaseResult.Failure();
        }
        catch
        {
            return new Error(ErrorCode.Exception, "Failed to remove key.");
        }
    }

    public async Task<BaseResult> SetHash<T>(string hashKey, IEnumerable<T> rows, Func<T, object> entryKeySelector, TimeSpan expireTime)
    {
        if (rows == null || !rows.Any())
            return new Error(ErrorCode.EmptyData, "null or empty data");

        var hashEntries = rows
            .Select(row => new HashEntry(entryKeySelector(row).ToString(), JsonSerializer.Serialize(row)))
            .ToArray();

        await _database.HashSetAsync(hashKey, hashEntries);

        var result = _database.KeyExpire(hashKey, expireTime);
        return result ? BaseResult.Ok() : BaseResult.Failure();
    }

    public async Task<BaseResult<T?>> GetFromHash<T>(string hashKey, string entryKey)
    {
        var value = await _database.HashGetAsync(hashKey, entryKey);
        if (value.IsNull)
            return new Error(ErrorCode.EmptyData, "null or empty data");

        return JsonSerializer.Deserialize<T>(value!);
    }
}