namespace Ramsha.Application.Contracts;


public interface ICodeGenerator
{
    string GenerateProductCode(string categoryCode, Guid productId);
    string GenerateCategoryCode(Guid categoryId);
    string GenerateVariantCode(string productSku, List<string> variantAttributes);
    string GenerateSupplierVariantCode(string supplierUsername, string variantSku);
    string GenerateSupplierProductCode(string supplierUsername, string productSku);

}




