using System;
using System.Security.Cryptography;
using System.Text;
using Ramsha.Application.Contracts;

namespace Ramsha.Application.Services
{
    public class CodeGenerator : ICodeGenerator
    {

        public string GenerateCategoryCode(Guid categoryId)
        {
            using (var sha256 = SHA256.Create())
            {
                var hash = sha256.ComputeHash(Encoding.UTF8.GetBytes(categoryId.ToString()));
                string hashCode = BitConverter.ToString(hash).Replace("-", "").Substring(0, 5);

                return hashCode;
            }
        }
        public string GenerateProductCode(string categoryCode, Guid productId)
        {
            ValidateCategoryCode(categoryCode);


            using (var sha256 = SHA256.Create())
            {
                var hash = sha256.ComputeHash(Encoding.UTF8.GetBytes(productId.ToString()));
                string hashCode = BitConverter.ToString(hash).Replace("-", "").Substring(0, 5);
                return $"{categoryCode}-{hashCode}";
            }
        }

        public string GenerateVariantCode(string productSku, List<string> optionValuesNames)
        {
            var sku = new StringBuilder(productSku);

            foreach (var valueName in optionValuesNames)
            {
                char letter = valueName.First();
                sku.Append($"-{letter}");
            }

            return sku.ToString().ToUpper();
        }

        public string GenerateSupplierVariantCode(string supplierUsername, string variantSku)
        {
            string normalizedSupplier = NormalizeSupplierUsername(supplierUsername);
            return $"{normalizedSupplier}-{variantSku}";
        }

        public string GenerateSupplierProductCode(string supplierUsername, string productSku)
        {
            string normalizedSupplier = NormalizeSupplierUsername(supplierUsername);
            return $"{normalizedSupplier}-{productSku}";
        }

        private string NormalizeSupplierUsername(string supplierUsername)
        {
            string baseSupplierCode = supplierUsername.ToUpper().Substring(0, 3);

            using (var sha256 = SHA256.Create())
            {
                var hash = sha256.ComputeHash(Encoding.UTF8.GetBytes(supplierUsername));
                string hashCode = BitConverter.ToString(hash).Replace("-", "").Substring(0, 3);
                return $"{baseSupplierCode}{hashCode}";
            }
        }

        private void ValidateCategoryCode(string categoryCode)
        {
            if (string.IsNullOrWhiteSpace(categoryCode) || categoryCode.Length < 3)
                throw new ArgumentException("Category code must be at least 3 characters long.");
        }
    }
}
