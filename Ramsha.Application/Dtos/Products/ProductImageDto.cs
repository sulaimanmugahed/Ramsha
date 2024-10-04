

namespace Ramsha.Application.Dtos.Products;

public record ProductImageDto(
    string Url,
    bool IsHome
);

public record VariantImageRequest(
    string Url,
    string Path,
    bool IsHome
);

