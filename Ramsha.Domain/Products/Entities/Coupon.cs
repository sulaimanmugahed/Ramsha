
using Ramsha.Domain.Common;
using Ramsha.Domain.Products.Enums;

namespace Ramsha.Domain.Products.Entities
{
    public class Coupon : BaseEntity
    {
        public Coupon(CouponId id, string code, decimal discountValue, bool stackingAllowed, int usageLimit, DateTime startDate, DateTime endDate, DiscountType discountType)
        {
            Id = id;
            Code = code;
            DiscountValue = discountValue;
            DiscountType = discountType;
            StackingAllowed = stackingAllowed;
            UsageLimit = usageLimit;
            UsageCount = 0;
            StartDate = startDate;
            EndDate = endDate;
        }

        public static Coupon Create(string code, decimal discountValue, bool stackingAllowed, int usageLimit, DateTime startDate, DateTime endDate, DiscountType discountType = DiscountType.Percentage)
        {
            return new Coupon(new CouponId(Guid.NewGuid()), code, discountValue, stackingAllowed, usageLimit, startDate, endDate, discountType);
        }

        public CouponId Id { get; private set; }
        public string Code { get; private set; }
        public decimal DiscountValue { get; private set; }
        public DiscountType DiscountType { get; private set; }
        public bool StackingAllowed { get; private set; }
        public int UsageLimit { get; private set; }
        public int UsageCount { get; private set; }
        public DateTime StartDate { get; private set; }
        public DateTime EndDate { get; private set; }

        public void IncrementUsageCount()
        {
            UsageCount++;
        }

        public bool IsValid()
        {
            var now = DateTime.UtcNow;
            return now >= StartDate && now <= EndDate && UsageCount < UsageLimit;
        }
    }
}