// using Ramsha.Application.DTOs.Common;

// namespace Ramsha.Application.Wrappers;


// public class PagedResponse<T> : BaseResult<List<T>>
// {
//     public PagedMetaData? MetaData { get; set; }

//     public static PagedResponse<T> Ok(PaginationResponseDto<T> model)
//     {
//         return new PagedResponse<T>
//         {
//             Success = true,
//             Data = model.Data,
//             MetaData = model.MetaData
//         };
//     }

//     public new static PagedResponse<T> Failure(Error error)
//         => new() { Success = false, Errors = [error] };

//     public new static PagedResponse<T> Failure(IEnumerable<Error> errors)
//         => new() { Success = false, Errors = errors.ToList() };

//     public static implicit operator PagedResponse<T>(PaginationResponseDto<T> model)
//         => Ok(model);

//     public static implicit operator PagedResponse<T>(Error error)
//         => new() { Success = false, Errors = [error] };

//     public static implicit operator PagedResponse<T>(List<Error> errors)
//         => new() { Success = false, Errors = errors };
// }

