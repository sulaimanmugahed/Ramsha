using Ramsha.Domain.Common;
using Ramsha.Domain.Products;
using Ramsha.Domain.Products.Entities;


namespace Ramsha.Domain.Suppliers.Entities;
public class Supplier : BaseEntity, IAuditable, ISoftDeletable, IUser
{
	private Supplier(SupplierId id, string username, string firstName, string lastName)
	{
		Id = id;
		Username = username;
		FirstName = firstName;
		LastName = lastName;

	}


	public static Supplier Create(string username, string firstName, string lastName)
	{
		return new(
			new SupplierId(Guid.NewGuid()), username, firstName, lastName);
	}

	public SupplierId Id { get; set; }
	public string FirstName { get; set; }
	public string LastName { get; set; }
	public Guid CreatedBy { get; set; }
	public DateTime Created { get; set; }
	public Guid? LastModifiedBy { get; set; }
	public DateTime? LastModified { get; set; }
	public bool IsDeleted { get; set; }
	public DateTime? Deleted { get; set; }
	public Guid? DeletedBy { get; set; }
	public string Username { get; set; }
	public List<Supply> Supplies { get; set; }

	// public List<SupplierProduct> SupplierProducts { get; set; }

	// public void AddProduct(ProductId productId, ProductVariantId? productVariantId = null)
	// {
	// 	var newProduct = SupplierProduct.Create(productId, Id);
	// 	if (productVariantId is not null)
	// 		newProduct.AddVariant(productVariantId);
	// }


}
